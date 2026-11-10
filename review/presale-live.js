const productLink = document.getElementById('presale');
const destination = new URL(productLink.href);
const incoming = new URLSearchParams(window.location.search);
const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content', 'utm_source_platform', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'ttclid', 'msclkid'];
for (const key of campaignKeys) {
  const value = incoming.get(key);
  if (value) destination.searchParams.set(key, value);
}
const variant = incoming.get('variant');
if (variant && /^\d+$/.test(variant)) destination.searchParams.set('variant', variant);
productLink.href = destination.href;
window.location.replace(destination.href);
