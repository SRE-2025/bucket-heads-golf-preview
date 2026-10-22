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
pageImage.alt=`${product.title} AI studio front view`;
pageTitle.textContent=product.title;
pagePrice.textContent=money(product.price);
pageCategory.textContent=categoryLabel(product);
pageLive.href=`https://bucketheadsgolf.com/products/${product.handle}`;
if(product.badge==='Sold out'){
  pageAdd.disabled=true;
  pageAdd.textContent='Currently sold out';
}
const productTrackingItem={item_id:product.handle,item_name:product.title,item_category:categoryLabel(product),price:product.price,quantity:1};
window.BHTrack?.('view_item',{currency:'USD',value:product.price,items:[productTrackingItem],availability:product.badge==='Sold out'?'sold_out':'available'});

const galleryViews=[
  {file:'front.webp',kind:'AI front',caption:'Straight-on studio view · recreated from this exact product'},
  {file:'three-quarter.webp',kind:'Three-quarter',caption:'Three-quarter studio view · matched to the same hat'},
  {file:'side.webp',kind:'Side',caption:'Side profile · logo, rope, and panel details preserved'},
  {file:'rear.webp',kind:'Rear detail',caption:'Rear construction · closure and embroidery shown clearly'}
];

function showMedia(index,moveFocus=false,trackView=false){
  if(!galleryMedia.length)return;
  activeMediaIndex=(index+galleryMedia.length)%galleryMedia.length;
  const media=galleryMedia[activeMediaIndex];
  const kind=media.kind;
  pageImage.src=media.src;
  pageImage.alt=`${product.title} — ${kind.toLowerCase()} view`;
  pageVisual.classList.remove('is-lifestyle');
  galleryCaption.textContent=media.caption;
  galleryCount.textContent=`${activeMediaIndex+1} / ${galleryMedia.length}`;
  [...galleryThumbs.children].forEach((button,buttonIndex)=>{
    const selected=buttonIndex===activeMediaIndex;
    button.classList.toggle('is-active',selected);
    button.setAttribute('aria-selected',String(selected));
    button.tabIndex=selected?0:-1;
  });
  if(moveFocus)galleryThumbs.children[activeMediaIndex]?.focus();
  if(trackView)window.BHTrack?.('view_item_photo',{item_id:product.handle,item_name:product.title,photo_index:activeMediaIndex+1,photo_type:kind.toLowerCase(),photo_count:galleryMedia.length});
}

function renderGallery(media){
  galleryMedia=media;
  galleryThumbs.innerHTML=galleryMedia.map((media,index)=>{
    return `<button class="product-gallery-thumb${index===0?' is-active':''}" type="button" role="tab" aria-selected="${index===0}" aria-label="Show ${media.kind.toLowerCase()} view"><img src="${media.src}" alt="" loading="lazy" decoding="async"><span>${media.kind}</span></button>`;
  }).join('');
  [...galleryThumbs.children].forEach((button,index)=>button.addEventListener('click',()=>showMedia(index,false,true)));
  showMedia(0);
}

function loadVerifiedGallery(){
  renderGallery(galleryViews.map(view=>({...view,src:`assets/product-gallery/${product.handle}/${view.file}?v=18`})));
}

galleryPrev.addEventListener('click',()=>showMedia(activeMediaIndex-1,false,true));
galleryNext.addEventListener('click',()=>showMedia(activeMediaIndex+1,false,true));
pageVisual.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showMedia(activeMediaIndex-1,false,true)}if(event.key==='ArrowRight'){event.preventDefault();showMedia(activeMediaIndex+1,false,true)}});
let touchStartX=0;
pageVisual.addEventListener('touchstart',event=>{touchStartX=event.changedTouches[0]?.clientX||0},{passive:true});
pageVisual.addEventListener('touchend',event=>{const distance=(event.changedTouches[0]?.clientX||0)-touchStartX;if(Math.abs(distance)>45)showMedia(activeMediaIndex+(distance<0?1:-1),false,true)},{passive:true});
pageImage.addEventListener('error',()=>{
  const fallback=new URL(webp(product.file),location.href).href;
  if(pageImage.src!==fallback){pageImage.src=fallback;galleryCaption.textContent='AI studio front · preview fallback';}
});
loadVerifiedGallery();

pageAdd.addEventListener('click',()=>{
  if(!bag.some(item=>item.handle===product.handle)){
    bag.push(product);
    saveBag();
    renderBag();
    window.BHTrack?.('add_to_cart',{currency:'USD',value:product.price,items:[productTrackingItem]});
  }
  toggleBag(true);
});

const sameCollection=products.filter(item=>item.handle!==product.handle&&item.category.split(' ').some(category=>product.category.split(' ').includes(category)));
const otherCollections=products.filter(item=>item.handle!==product.handle&&!sameCollection.includes(item));
const related=[...sameCollection,...otherCollections].slice(0,5);
const relatedGrid=document.querySelector('.related-grid');
relatedGrid.innerHTML=related.map(item=>`<article class="product-card"><a href="product.html?handle=${encodeURIComponent(item.handle)}" data-related-handle="${item.handle}"><div class="product-visual">${item.badge?`<span class="product-badge ${item.badge==='Sold out'?'sold':''}">${item.badge==='Featured'?'New drop':item.badge}</span>`:''}<img src="${webp(item.file)}" alt="${item.title}" loading="lazy" decoding="async"></div><div class="product-details"><p class="product-kicker">${categoryLabel(item)}</p><div class="product-title-row"><h3>${item.title}</h3><p class="product-price">${money(item.price)}</p></div><span>VIEW HAT<b>→</b></span></div></a></article>`).join('');
relatedGrid.addEventListener('click',event=>{const link=event.target.closest('[data-related-handle]');if(!link)return;const selected=products.find(item=>item.handle===link.dataset.relatedHandle);if(selected)window.BHTrack?.('select_item',{item_list_id:'related_products',item_list_name:'More from the drop',items:[{item_id:selected.handle,item_name:selected.title,item_category:categoryLabel(selected),price:selected.price,quantity:1}]})});
