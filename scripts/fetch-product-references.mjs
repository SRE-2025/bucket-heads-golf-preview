import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const appSource = await readFile(path.join(root, 'dist', 'app.js'), 'utf8');
const products = [...appSource.matchAll(/\{title:'([^']+)',handle:'([^']+)',file:'([^']+)'/g)].map((match) => ({
  title: match[1],
  handle: match[2],
  file: match[3],
}));

if (products.length !== 34) {
  throw new Error(`Expected 34 products, found ${products.length}`);
}

const outputRoot = path.join(root, '.work', 'gallery-references');
await mkdir(outputRoot, { recursive: true });
const manifest = [];

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchWithRetry(url, label, attempts = 7) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) return response;
    if (response.status !== 429 || attempt === attempts) {
      throw new Error(`${label}: request returned ${response.status}`);
    }
    const retryAfter = Number(response.headers.get('retry-after')) || attempt * 5;
    console.log(`${label}: rate limited, retrying in ${retryAfter}s`);
    await delay(retryAfter * 1000);
  }
}

for (const product of products) {
  const response = await fetchWithRetry(`https://bucketheadsgolf.com/products/${encodeURIComponent(product.handle)}.js`, product.handle);
  const catalog = await response.json();
  const imageUrls = [...new Set((catalog.images || []).map((url) => url.startsWith('//') ? `https:${url}` : url))];
  const productDir = path.join(outputRoot, product.handle);
  await mkdir(productDir, { recursive: true });
  const localReferences = [path.join(root, 'dist', 'assets', 'hats', product.file)];

  for (const [index, imageUrl] of imageUrls.slice(0, 6).entries()) {
    const imageResponse = await fetchWithRetry(imageUrl, `${product.handle} image ${index + 1}`);
    const type = imageResponse.headers.get('content-type') || '';
    const extension = type.includes('png') ? '.png' : type.includes('webp') ? '.webp' : '.jpg';
    const localPath = path.join(productDir, `official-${String(index + 1).padStart(2, '0')}${extension}`);
    await writeFile(localPath, Buffer.from(await imageResponse.arrayBuffer()));
    localReferences.push(localPath);
  }

  manifest.push({ ...product, officialImageCount: imageUrls.length, localReferences });
  console.log(`${String(manifest.length).padStart(2, '0')}/34 ${product.handle}: ${imageUrls.length} official image(s)`);
  await delay(2500);
}

await writeFile(path.join(outputRoot, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Saved ${manifest.length} verified product reference sets to ${outputRoot}`);
