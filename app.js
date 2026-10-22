const products=[
{title:'Game Day Purple & Yellow Hat',handle:'game-day-purple-yellow-hat',file:'game-day-purple-yellow-hat-uniform-ai.png',category:'game-day',price:29.99,badge:'Featured'},
{title:'Black & White Classic BH 6-Panel Hat',handle:'black-white-classic-bh-6-panel-hat',file:'black-white-classic-bh-6-panel-hat-uniform-ai.png',category:'classic-bh',price:29.99,badge:'Featured'},
{title:'Camo Classic Script 6-Panel Hat',handle:'camo-classic-script-6-panel-hat',file:'camo-classic-script-6-panel-hat-uniform-ai.png',category:'classic-script',price:29.99,badge:'Featured'},
{title:'Classic Mascot 6-Panel Red/White/Blue Hat',handle:'classic-mascot-6-panel-red-white-blue-hat',file:'classic-mascot-6-panel-red-white-blue-hat-uniform-ai.png',category:'mascot',price:29.99},
{title:'Classic Mascot 6-Panel White Hat',handle:'classic-mascot-6-panel-white-hat',file:'classic-mascot-6-panel-white-hat-uniform-ai.png',category:'mascot',price:29.99},
{title:'Classic Script 6-Panel Black Hat',handle:'classic-script-6-panel-black-hat',file:'classic-script-6-panel-black-hat-uniform-ai.png',category:'classic-script',price:29.99},
{title:'Classic Script 6-Panel Green Hat',handle:'classic-script-6-panel-green-hat',file:'classic-script-6-panel-green-hat-uniform-ai.png',category:'classic-script',price:29.99},
{title:'Miami Vice Classic Script 6-Panel Hat',handle:'classic-script-6-panel-miami-vice-hat',file:'classic-script-6-panel-miami-vice-hat-uniform-ai-v2.png',category:'classic-script',price:29.99,badge:'Sold out'},
{title:'Classic Script 6-Panel Navy Hat',handle:'classic-script-6-panel-navy-hat',file:'classic-script-6-panel-navy-hat-uniform-ai.png',category:'classic-script',price:29.99},
{title:'Neon Orange Classic Script 6-Panel Hat',handle:'neon-orange-classic-script-6-panel-hat',file:'neon-orange-classic-script-6-panel-hat-uniform-ai-v2.png',category:'classic-script',price:29.99},
{title:'Neon Verde Classic Script 6-Panel Hat',handle:'neon-verde-classic-script-6-panel-hat',file:'neon-verde-classic-script-6-panel-hat-uniform-ai-v2.png',category:'classic-script',price:29.99},
{title:'Neon Yellow Classic Script 6-Panel Hat',handle:'classic-script-6-panel-neon-yellow-hat',file:'classic-script-6-panel-neon-yellow-hat-uniform-ai-v2.png',category:'classic-script',price:29.99},
{title:'Classic Script 6-Panel Pink Hat',handle:'classic-script-6-panel-pink-hat',file:'classic-script-6-panel-pink-hat-uniform-ai.png',category:'classic-script',price:29.99},
{title:'Classic Script 6-Panel Red Hat',handle:'classic-script-6-panel-red-hat',file:'classic-script-6-panel-red-hat-uniform-ai.png',category:'classic-script',price:29.99},
{title:'Classic Script 6-Panel White Hat',handle:'classic-script-6-panel-white-hat',file:'classic-script-6-panel-white-hat-uniform-ai.png',category:'classic-script',price:29.99},
{title:'Classic Script Reversible Bucket Hat',handle:'classic-script-reversible-bucket-hat',file:'classic-script-reversible-bucket-hat-uniform-ai.png',category:'bucket',price:29.99,badge:'Sold out'},
{title:'Crimson & White Classic BH 6-Panel Hat',handle:'crimson-white-classic-bh-6-panel-hat',file:'crimson-white-classic-bh-6-panel-hat-uniform-ai.png',category:'classic-bh',price:29.99},
{title:'Dark Green & White Classic BH 6-Panel Hat',handle:'dark-green-white-classic-bh-6-panel-hat',file:'dark-green-white-classic-bh-6-panel-hat-uniform-ai.png',category:'classic-bh',price:29.99},
{title:'Navy & White Classic BH 6-Panel Hat',handle:'navy-white-classic-bh-6-panel-hat',file:'navy-white-classic-bh-6-panel-hat-uniform-ai-v2.png',category:'classic-bh',price:29.99},
{title:'Royal & White Classic BH 6-Panel Hat',handle:'royal-white-classic-bh-6-panel-hat-1',file:'royal-white-classic-bh-6-panel-hat-1-uniform-ai-v2.png',category:'classic-bh',price:29.99},
{title:'Royal, White & Black Classic BH 6-Panel Hat',handle:'royal-white-classic-bh-6-panel-hat',file:'royal-white-black-classic-bh-6-panel-hat-uniform-ai-v2.png',category:'classic-bh',price:29.99},
{title:'Game Day Black & Orange Hat',handle:'game-day-black-orange-hat',file:'game-day-black-orange-hat-uniform-ai.png',category:'game-day',price:29.99},
{title:'Game Day Black & Red Hat',handle:'game-day-black-red-hat',file:'game-day-black-red-hat-uniform-ai.png',category:'game-day',price:29.99},
{title:'Game Day Black & Yellow Hat',handle:'game-day-black-yellow-hat',file:'game-day-black-yellow-hat-uniform-ai.png',category:'game-day',price:29.99},
{title:'Game Day Gray & Baby Blue Hat',handle:'game-day-grey-baby-blue-hat',file:'game-day-grey-baby-blue-hat-uniform-ai.png',category:'game-day',price:29.99},
{title:'Game Day Navy & Lime Green Hat',handle:'game-day-navy-lime-green-hat',file:'game-day-navy-lime-green-hat-uniform-ai.png',category:'game-day',price:29.99},
{title:'Game Day Navy & Orange Hat',handle:'game-day-navy-orange-hat',file:'game-day-navy-orange-hat-uniform-ai.png',category:'game-day',price:29.99},
{title:'Game Day Navy & Red Hat',handle:'game-day-navy-red-hat',file:'game-day-navy-red-hat-uniform-ai.png',category:'game-day',price:29.99},
{title:'Game Day Orange & Black Hat',handle:'game-day-burnt-orange-black-hat',file:'game-day-burnt-orange-black-hat-uniform-ai.png',category:'game-day',price:29.99},
{title:'Game Day White & Crimson Hat',handle:'game-day-white-crimson-hat',file:'game-day-white-crimson-hat-uniform-ai.png',category:'game-day',price:29.99},
{title:'Game Day White & Maroon Hat',handle:'game-day-white-maroon-hat',file:'game-day-white-maroon-hat-uniform-ai.png',category:'game-day',price:29.99},
{title:'Game Day White & Orange Hat',handle:'game-day-white-burnt-orange-hat',file:'game-day-white-burnt-orange-hat-uniform-ai.png',category:'game-day',price:29.99},
{title:'Game Day White/Black/Red Hat',handle:'game-day-white-black-red-hat',file:'game-day-white-black-red-hat-uniform-ai.png',category:'game-day',price:29.99},
{title:'Kids Mascot Bucket Hat',handle:'mascot-logo-kids-bucket-hat',file:'mascot-logo-kids-bucket-hat-uniform-ai.png',category:'bucket mascot',price:25}
];
const labels={'game-day':'Game Day','classic-bh':'Classic BH','classic-script':'Classic Script','mascot':'Mascot','bucket':'Bucket Hat'};
let activeFilter='all',searchTerm='',sortMode='featured',activeProduct=null,bag=[],lastFocus=null;
try{bag=JSON.parse(sessionStorage.getItem('bh-preview-bag')||'[]')}catch{bag=[]}
bag=Array.isArray(bag)?bag.map(item=>({...item,quantity:Math.max(1,Math.min(9,Number(item.quantity)||1))})):[];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function money(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n)}
function categoryLabel(p){return p.category.split(' ').map(c=>labels[c]).filter(Boolean)[0]||'Bucket Heads'}
function galleryView(handle,view='front'){return `assets/product-gallery/${handle}/${view}.webp?v=19`}
function webp(file){const product=products.find(item=>item.file===file);return product?galleryView(product.handle):`assets/hats-webp/${file.replace(/\.png$/i,'.webp')}`}
const track=(event,detail)=>window.BHTrack?.(event,detail);
const trackingItem=p=>({item_id:p.handle,item_name:p.title,item_category:categoryLabel(p),price:p.price,quantity:1});
const trackingBagItems=()=>bag.map(p=>({...trackingItem(p),quantity:p.quantity}));
const bagValue=()=>bag.reduce((sum,p)=>sum+(p.price*p.quantity),0);
function bindProductCardPreviews(root=document){
  if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  root.querySelectorAll('.product-card').forEach(card=>{
    const image=card.querySelector('img[data-angle-src]');
    if(!image||card.dataset.previewBound)return;
    card.dataset.previewBound='true';
    const showAngle=()=>{image.src=image.dataset.angleSrc;card.classList.add('is-angle')};
    const showFront=()=>{image.src=image.dataset.frontSrc;card.classList.remove('is-angle')};
    card.addEventListener('pointerenter',showAngle);
    card.addEventListener('pointerleave',showFront);
    card.addEventListener('focusin',showAngle);
    card.addEventListener('focusout',showFront);
    image.addEventListener('error',showFront,{once:true});
  });
}
window.bindProductCardPreviews=bindProductCardPreviews;
function quickAddButton(p){return p.badge==='Sold out'?'':`<button class="product-quick-add" type="button" data-quick-add="${p.handle}" aria-label="Quick add ${p.title} to bag"><span aria-hidden="true">+</span></button>`}
function renderProducts(){const grid=$('.product-grid');if(!grid)return;let visible=products.filter(p=>{const searchable=`${p.title} ${categoryLabel(p)} ${p.category}`.toLowerCase();return(activeFilter==='all'||p.category.split(' ').includes(activeFilter))&&searchable.includes(searchTerm)});if(sortMode==='az')visible=[...visible].sort((a,b)=>a.title.localeCompare(b.title));grid.dataset.count=String(visible.length);grid.innerHTML=visible.map((p,i)=>`<article class="product-card"><a href="product.html?handle=${encodeURIComponent(p.handle)}" data-product-handle="${p.handle}" aria-label="View ${p.title}"><div class="product-visual">${p.badge?`<span class="product-badge ${p.badge==='Sold out'?'sold':''}">${p.badge==='Featured'?'New drop':p.badge}</span>`:''}<img src="${galleryView(p.handle)}" data-front-src="${galleryView(p.handle)}" data-angle-src="${galleryView(p.handle,'three-quarter')}" alt="${p.title}" loading="${i<5?'eager':'lazy'}" decoding="async"><span class="product-angle-cue" aria-hidden="true">Front&nbsp; / &nbsp;Angle</span></div><div class="product-details"><p class="product-kicker">${categoryLabel(p)}</p><div class="product-title-row"><h3>${p.title}</h3><p class="product-price">${money(p.price)}</p></div><span>VIEW HAT<b>→</b></span></div></a>${quickAddButton(p)}</article>`).join('');$('.empty-state').hidden=visible.length!==0;bindProductCardPreviews(grid)}
function openProduct(handle){activeProduct=products.find(p=>p.handle===handle);if(!activeProduct)return;lastFocus=document.activeElement;const modal=$('.product-modal');$('.modal-image img').src=webp(activeProduct.file);$('.modal-image img').alt=activeProduct.title;$('.modal-category').textContent=categoryLabel(activeProduct);$('#modal-title').textContent=activeProduct.title;$('.modal-price').textContent=money(activeProduct.price);$('.modal-live').href=`https://bucketheadsgolf.com/products/${activeProduct.handle}`;$('.modal-add').disabled=activeProduct.badge==='Sold out';$('.modal-add').textContent=activeProduct.badge==='Sold out'?'Currently sold out':'Add to preview bag';$('.modal-backdrop').hidden=false;modal.showModal();document.body.classList.add('is-locked')}
function closeProduct(){const modal=$('.product-modal');if(modal?.open)modal.close();const back=$('.modal-backdrop');if(back)back.hidden=true;document.body.classList.remove('is-locked');lastFocus?.focus?.();lastFocus=null}
function saveBag(){sessionStorage.setItem('bh-preview-bag',JSON.stringify(bag))}
function addProductToBag(product,quantity=1){
  if(!product||product.badge==='Sold out')return false;
  const existing=bag.find(item=>item.handle===product.handle);
  if(existing)existing.quantity=Math.min(9,existing.quantity+quantity);else bag.push({...product,quantity});
  saveBag();renderBag();
  track('add_to_cart',{currency:'USD',value:product.price*quantity,items:[{...trackingItem(product),quantity}]});
  return true;
}
window.addProductToBag=addProductToBag;
function renderBag(){
  const wrap=$('.bag-items');if(!wrap)return;
  wrap.innerHTML=bag.length?bag.map(p=>`<div class="bag-item" data-bag-item="${p.handle}"><a class="bag-item-image" href="product.html?handle=${encodeURIComponent(p.handle)}"><img src="${webp(p.file)}" alt="${p.title}"></a><div class="bag-item-copy"><a href="product.html?handle=${encodeURIComponent(p.handle)}"><h3>${p.title}</h3></a><p>${money(p.price)}</p><div class="bag-item-controls" aria-label="Quantity for ${p.title}"><button type="button" data-quantity="${p.handle}" data-delta="-1" aria-label="Decrease quantity">−</button><span aria-live="polite">${p.quantity}</span><button type="button" data-quantity="${p.handle}" data-delta="1" aria-label="Increase quantity">+</button></div></div><button class="bag-remove" type="button" data-remove="${p.handle}">Remove</button></div>`).join(''):'<div class="bag-empty"><span>0</span><h3>YOUR BAG IS READY FOR A HAT.</h3><p>Explore all 34 styles and add the one that feels like you.</p><a class="button button-dark bag-shop" href="index.html#hats">Shop all hats</a></div>';
  const count=bag.reduce((sum,p)=>sum+p.quantity,0);
  $('.bag-count').textContent=count;
  $('.bag-total').textContent=money(bagValue());
  const countText=$('.bag-item-count-text');if(countText)countText.textContent=`${count} ${count===1?'item':'items'}`;
  const checkout=$('.mock-checkout');if(checkout){checkout.disabled=!bag.length;checkout.textContent=bag.length?'Review checkout':'Add a hat to continue'}
  $$('[data-quantity]').forEach(button=>button.addEventListener('click',()=>{
    const item=bag.find(p=>p.handle===button.dataset.quantity);if(!item)return;
    const delta=Number(button.dataset.delta);const before=item.quantity;
    item.quantity=Math.max(1,Math.min(9,item.quantity+delta));
    if(item.quantity===before)return;
    saveBag();renderBag();
    track(delta>0?'add_to_cart':'remove_from_cart',{currency:'USD',value:item.price,items:[{...trackingItem(item),quantity:1}],quantity_after:item.quantity});
  }));
  $$('[data-remove]').forEach(button=>button.addEventListener('click',()=>{
    const removed=bag.find(p=>p.handle===button.dataset.remove);bag=bag.filter(p=>p.handle!==button.dataset.remove);saveBag();renderBag();
    if(removed)track('remove_from_cart',{currency:'USD',value:removed.price*removed.quantity,items:[{...trackingItem(removed),quantity:removed.quantity}],remove_all:true});
  }));
}
let bagTrigger=null;
function toggleBag(open=true){
  const drawer=$('.bag-drawer');if(!drawer)return;
  if(open)bagTrigger=document.activeElement;
  drawer.classList.toggle('is-open',open);drawer.setAttribute('aria-hidden',String(!open));
  const backdrop=$('.bag-backdrop');if(backdrop)backdrop.hidden=!open;
  document.body.classList.toggle('is-locked',open);
  if(open){track('view_cart',{currency:'USD',value:bagValue(),items:trackingBagItems(),item_count:bag.reduce((sum,p)=>sum+p.quantity,0)});requestAnimationFrame(()=>$('.bag-close')?.focus())}
  else{bagTrigger?.focus?.();bagTrigger=null}
}
function toast(msg){const t=$('.toast');if(!t)return;t.textContent=msg;t.classList.add('is-visible');setTimeout(()=>t.classList.remove('is-visible'),2200)}
$$('.filter').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;$$('.filter').forEach(x=>{const selected=x===b;x.classList.toggle('is-active',selected);x.setAttribute('aria-pressed',String(selected))});renderProducts();track('view_item_list',{item_list_id:activeFilter,item_list_name:b.textContent.trim(),item_count:Number($('.product-grid')?.dataset.count||0)})}));
$('.sort-button')?.addEventListener('click',e=>{sortMode=sortMode==='featured'?'az':'featured';e.currentTarget.dataset.sort=sortMode;e.currentTarget.textContent=sortMode==='featured'?'Featured order':'A–Z order';renderProducts();track('sort_catalog',{sort_mode:sortMode,item_count:Number($('.product-grid')?.dataset.count||0)})});
$('.search-toggle')?.addEventListener('click',()=>{const p=$('.search-panel');p.classList.add('is-open');p.setAttribute('aria-hidden','false');setTimeout(()=>$('#site-search').focus(),200)});
$('.search-close')?.addEventListener('click',()=>{$('.search-panel').classList.remove('is-open');$('.search-panel').setAttribute('aria-hidden','true')});
let searchTrackTimer;
$('#site-search')?.addEventListener('input',e=>{searchTerm=e.target.value.toLowerCase().trim();renderProducts();if(searchTerm)location.hash='hats';clearTimeout(searchTrackTimer);searchTrackTimer=setTimeout(()=>{if(searchTerm)track('search',{search_term:searchTerm,results_count:Number($('.product-grid')?.dataset.count||0)})},500)});
$('.mobile-menu')?.addEventListener('click',e=>{const d=$('.mobile-drawer');const open=!d.classList.contains('is-open');d.classList.toggle('is-open',open);e.currentTarget.setAttribute('aria-expanded',String(open))});
$$('.mobile-drawer a').forEach(a=>a.addEventListener('click',()=>{$('.mobile-drawer').classList.remove('is-open');$('.mobile-menu')?.setAttribute('aria-expanded','false')}));
$('.modal-close')?.addEventListener('click',closeProduct);$('.modal-backdrop')?.addEventListener('click',()=>{closeProduct();toggleBag(false)});$('.product-modal')?.addEventListener('cancel',e=>{e.preventDefault();closeProduct()});
$('.modal-add')?.addEventListener('click',()=>{if(activeProduct)addProductToBag(activeProduct);closeProduct();toggleBag(true)});
$('.bag-button')?.addEventListener('click',()=>toggleBag(true));$('.bag-close')?.addEventListener('click',()=>toggleBag(false));
$('.bag-backdrop')?.addEventListener('click',()=>toggleBag(false));$('.bag-continue')?.addEventListener('click',()=>toggleBag(false));
$('.mock-checkout')?.addEventListener('click',()=>{if(!bag.length){toast('Add a hat before continuing.');return}track('begin_checkout',{currency:'USD',value:bagValue(),items:trackingBagItems(),preview_only:true});location.href='checkout.html'});
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;$('.search-panel')?.classList.remove('is-open');$('.search-panel')?.setAttribute('aria-hidden','true');toggleBag(false)});
$$('.filter').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===0)));
$('.product-grid')?.addEventListener('click',e=>{const quickAdd=e.target.closest('[data-quick-add]');if(quickAdd){const selected=products.find(p=>p.handle===quickAdd.dataset.quickAdd);if(selected){addProductToBag(selected);track('quick_add',{item_id:selected.handle,item_name:selected.title,item_list_id:activeFilter});toggleBag(true)}return}const link=e.target.closest('[data-product-handle]');if(!link)return;const selected=products.find(p=>p.handle===link.dataset.productHandle);if(selected)track('select_item',{item_list_id:activeFilter,item_list_name:'Hat catalog',items:[trackingItem(selected)]})});
document.addEventListener('click',e=>{const link=e.target.closest('a[href^="https://bucketheadsgolf.com/products/"]');if(!link)return;track('outbound_product_click',{destination:new URL(link.href).pathname,link_text:link.textContent.trim().slice(0,120)})});
renderProducts();renderBag();
