(function(){
const handle=window.BHCurrentHandle||new URLSearchParams(location.search).get('handle');
const product=allProducts.find(p=>p.handle===handle);
if(!product){document.querySelector('main').innerHTML='<section class="not-found"><h1>HAT NOT FOUND.</h1><p>This link does not match a product. We will never substitute a different hat.</p><a class="button button-dark" href="'+(isShopify?'/collections/all':'index.html#hats')+'">Browse the collection</a></section>';document.querySelector('.mobile-buybar')?.remove();return}
const image=$('#product-page-image'),visual=$('.product-page-visual'),thumbs=$('.product-gallery-thumbs'),caption=$('.product-view-caption'),count=$('.gallery-count'),add=$('.product-page-add'),mobileAdd=$('.mobile-buybar-add');
document.title=product.title+' — Bucket Heads Golf'+(isShopify?'':' Preview');
$('.product-page-title').textContent=product.title;$('.product-page-category').textContent=categoryLabel(product);$('.mobile-buybar-title').textContent=product.title;
$('.product-page-description').textContent=product.description||'Contact Bucket Heads for sizing and product details before ordering.';
$('.product-page-description').classList.add('catalog-description');
$('.product-page-live').href='https://bucketheadsgolf.com/products/'+encodeURIComponent(product.handle);
$('.product-page-live').textContent='View original product listing ↗';
$('.product-fit-list').innerHTML='<details open><summary>Fit & product details</summary><p>'+escapeHTML(product.description||'Ask the team for product specifications.').replace(/\n/g,'<br>')+'</p></details><details><summary>Shipping & returns</summary><p>Shipping options and taxes are confirmed in Shopify checkout. Read the <a href="https://bucketheadsgolf.com/pages/return-policy" target="_blank" rel="noopener">current return policy</a> or <a href="mailto:admin@bucketheadsgolf.com">ask the team</a> before ordering. No unverified delivery promise is made here.</p></details>';
// Keep the short introduction distinct from the complete specifications.
$('.product-page-description').textContent=product.isHat?'Find your color. Make it part of your everyday rotation.': 'Bucket Heads apparel for the course and everything after.';
let selectedVariant=product.variants.find(v=>v.available)||product.variants[0];
const picker=document.createElement('label');picker.className='variant-picker';picker.innerHTML='<span>'+(product.variants.length>1?'Choose your option':'Availability')+'</span><select aria-label="Product option">'+product.variants.map(v=>'<option value="'+v.id+'" '+(!v.available?'disabled':'')+'>'+escapeHTML(v.title==='Default Title'?'One size':v.title)+(v.available?'':' — sold out')+'</option>').join('')+'</select>';
$('.product-buy-actions').before(picker);picker.querySelector('select').value=selectedVariant?.id||'';
function updateVariant(){const available=!!selectedVariant?.available;add.disabled=!available;mobileAdd.disabled=!available;add.textContent=available?(isShopify?'Add to bag':'Add to preview bag'):'Currently sold out';mobileAdd.textContent=available?'Add to bag':'Sold out';$('.product-page-price').textContent=money(selectedVariant?.price||product.price);$('.mobile-buybar-price').textContent=money(selectedVariant?.price||product.price)}
picker.querySelector('select').addEventListener('change',e=>{selectedVariant=product.variants.find(v=>String(v.id)===e.target.value);updateVariant()});updateVariant();
const views=[{file:'front',kind:'Front',caption:'Front view'},{file:'three-quarter',kind:'Three-quarter',caption:'Three-quarter view'},{file:'side',kind:'Side',caption:'Side profile'},{file:'rear',kind:'Back',caption:'Rear view'}];
let media=product.isHat?views.map(v=>({...v,src:galleryView(product.handle,v.file)})):product.images.map((i,n)=>({kind:'Photo '+(n+1),caption:'Original product photo',src:i.src}));
let index=0;
function show(n,focus=false){if(!media.length)return;index=(n+media.length)%media.length;image.src=media[index].src;image.alt=product.title+' — '+media[index].kind;caption.textContent=media[index].caption;count.textContent=(index+1)+' / '+media.length;[...thumbs.children].forEach((b,i)=>{b.classList.toggle('is-active',i===index);b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1});if(focus)thumbs.children[index]?.focus()}
function renderGallery(){thumbs.innerHTML=media.map((m,i)=>'<button class="product-gallery-thumb" type="button" role="tab" aria-controls="product-page-image" aria-label="Show '+escapeHTML(m.kind)+'"><img src="'+escapeHTML(m.src)+'" alt="" loading="lazy" width="96" height="96"><span>'+escapeHTML(m.kind)+'</span></button>').join('');[...thumbs.children].forEach((b,i)=>b.addEventListener('click',()=>show(i)));show(0)}
$('.product-view-label').textContent=product.isHat?'STUDIO GALLERY':'PRODUCT GALLERY';
$('.gallery-source-note').textContent=product.isHat?'Studio-rendered views. Original product photos are available below for a closer look at the real details.':'Original Bucket Heads product photography.';
if(product.isHat&&product.images.length){const originals=document.createElement('button');originals.type='button';originals.className='original-photos-button';originals.textContent='View original product photos';$('.gallery-source-note').after(originals);let original=false;originals.addEventListener('click',()=>{original=!original;media=original?product.images.map((i,n)=>({kind:'Original '+(n+1),caption:'Original product photograph',src:i.src})):views.map(v=>({...v,src:galleryView(product.handle,v.file)}));originals.textContent=original?'Return to studio gallery':'View original product photos';renderGallery()})}
renderGallery();
$('.gallery-prev').addEventListener('click',()=>show(index-1));$('.gallery-next').addEventListener('click',()=>show(index+1));
thumbs.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();show(e.key==='Home'?0:e.key==='End'?media.length-1:index+(e.key==='ArrowRight'?1:-1),true)});
visual.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();show(index+(e.key==='ArrowRight'?1:-1))}});
let start=0;visual.addEventListener('touchstart',e=>start=e.changedTouches[0].clientX,{passive:true});visual.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-start;if(Math.abs(delta)>45)show(index+(delta<0?1:-1))},{passive:true});
image.addEventListener('error',()=>{if(product.image&&image.src!==product.image){image.src=product.image;caption.textContent='Original product photograph'}},{once:true});
async function buy(){if(await addProductToBag(product,1,selectedVariant?.id))toggleBag(true)}add.addEventListener('click',buy);mobileAdd.addEventListener('click',buy);
if('IntersectionObserver'in window)new IntersectionObserver(entries=>$('.mobile-buybar').classList.toggle('is-hidden',entries[0].isIntersecting),{threshold:.35}).observe(add);
const related=allProducts.filter(p=>p.handle!==product.handle&&p.isHat===product.isHat).sort((a,b)=>Number(b.category===product.category)-Number(a.category===product.category)).slice(0,4);
$('.related-grid').innerHTML=related.map(p=>productCard(p)).join('');bindProductCardPreviews($('.related-grid'));
track('view_item',{currency:runtime.currency||'USD',value:product.price,items:[trackingItem(product)]});
})();
