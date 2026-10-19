const params=new URLSearchParams(location.search);
const requested=params.get('handle');
const product=products.find(item=>item.handle===requested)||products[0];
const pageImage=document.querySelector('#product-page-image');
const pageTitle=document.querySelector('.product-page-title');
const pagePrice=document.querySelector('.product-page-price');
const pageCategory=document.querySelector('.product-page-category');
const pageLive=document.querySelector('.product-page-live');
const pageAdd=document.querySelector('.product-page-add');
const pageVisual=document.querySelector('.product-page-visual');
const galleryThumbs=document.querySelector('.product-gallery-thumbs');
const galleryCaption=document.querySelector('.product-view-caption');
const galleryCount=document.querySelector('.gallery-count');
const galleryPrev=document.querySelector('.gallery-prev');
const galleryNext=document.querySelector('.gallery-next');
let galleryMedia=[];
let activeMediaIndex=0;

document.title=`${product.title} — Bucket Heads Golf Preview`;
pageImage.src=webp(product.file);
pageImage.alt=`${product.title} clean front view`;
pageTitle.textContent=product.title;
pagePrice.textContent=money(product.price);
pageCategory.textContent=categoryLabel(product);
pageLive.href=`https://bucketheadsgolf.com/products/${product.handle}`;
if(product.badge==='Sold out'){
  pageAdd.disabled=true;
  pageAdd.textContent='Currently sold out';
}

function normalizeMediaSource(source){
  if(!source)return '';
  return source.startsWith('//')?`https:${source}`:source;
}

function mediaKind(source,index){
  if(index===0)return 'Clean front';
  if(/\.(jpe?g)(\?|$)/i.test(source))return 'On-person';
  if(index===1)return 'Official front';
  if(index===2)return 'Side';
  if(index===3)return 'Alternate';
  return 'Detail';
}

function showMedia(index,moveFocus=false){
  if(!galleryMedia.length)return;
  activeMediaIndex=(index+galleryMedia.length)%galleryMedia.length;
  const media=galleryMedia[activeMediaIndex];
  const kind=mediaKind(media.src,activeMediaIndex);
  pageImage.src=media.src;
  pageImage.alt=`${product.title} — ${kind.toLowerCase()} view`;
  pageVisual.classList.toggle('is-lifestyle',kind==='On-person');
  galleryCaption.textContent=kind==='Clean front'?'Polished AI front view · matched to this product':kind==='On-person'?'Real-world fit · official Bucket Heads photo':`${kind} view · official Bucket Heads photo`;
  galleryCount.textContent=`${activeMediaIndex+1} / ${galleryMedia.length}`;
  [...galleryThumbs.children].forEach((button,buttonIndex)=>{
    const selected=buttonIndex===activeMediaIndex;
    button.classList.toggle('is-active',selected);
    button.setAttribute('aria-selected',String(selected));
    button.tabIndex=selected?0:-1;
  });
  if(moveFocus)galleryThumbs.children[activeMediaIndex]?.focus();
}

function renderGallery(sources){
  galleryMedia=[...new Set(sources.map(normalizeMediaSource).filter(Boolean))].map(src=>({src}));
  if(!galleryMedia.length)galleryMedia=[{src:webp(product.file)}];
  galleryThumbs.innerHTML=galleryMedia.map((media,index)=>{
    const kind=mediaKind(media.src,index);
    return `<button class="product-gallery-thumb${index===0?' is-active':''}" type="button" role="tab" aria-selected="${index===0}" aria-label="Show ${kind.toLowerCase()} view"><img src="${media.src}" alt="" loading="lazy"><span>${kind}</span></button>`;
  }).join('');
  [...galleryThumbs.children].forEach((button,index)=>button.addEventListener('click',()=>showMedia(index)));
  showMedia(0);
}

async function loadVerifiedGallery(){
  const cleanFront=webp(product.file);
  renderGallery([cleanFront]);
  try{
    const response=await fetch(`https://bucketheadsgolf.com/products/${encodeURIComponent(product.handle)}.js`,{mode:'cors'});
    if(!response.ok)throw new Error(`Catalog request failed: ${response.status}`);
    const catalogProduct=await response.json();
    const officialImages=(catalogProduct.images||[]).map(normalizeMediaSource);
    renderGallery([cleanFront,...officialImages]);
  }catch(error){
    galleryCaption.textContent='Polished front view · official gallery temporarily unavailable';
  }
}

galleryPrev.addEventListener('click',()=>showMedia(activeMediaIndex-1));
galleryNext.addEventListener('click',()=>showMedia(activeMediaIndex+1));
pageImage.addEventListener('error',()=>{
  const fallback=new URL(webp(product.file),location.href).href;
  if(pageImage.src!==fallback)pageImage.src=fallback;
});
loadVerifiedGallery();

pageAdd.addEventListener('click',()=>{
  if(!bag.some(item=>item.handle===product.handle)){
    bag.push(product);
    saveBag();
    renderBag();
  }
  toggleBag(true);
});

const related=products.filter(item=>item.handle!==product.handle).slice(0,5);
document.querySelector('.related-grid').innerHTML=related.map(item=>`<article class="product-card"><a href="product.html?handle=${encodeURIComponent(item.handle)}"><div class="product-visual"><img src="${webp(item.file)}" alt="${item.title}" loading="lazy"></div><div class="product-details"><p class="product-kicker">${categoryLabel(item)}</p><div class="product-title-row"><h3>${item.title}</h3><p class="product-price">${money(item.price)}</p></div><span>VIEW HAT<b>→</b></span></div></a></article>`).join('');
