const products=[
{title:'Game Day Purple & Yellow Hat',handle:'game-day-purple-yellow-hat',file:'game-day-purple-yellow-hat-uniform-ai.png',category:'game-day',price:29.99,badge:'Featured'},
{title:'Black & White Classic BH 6-Panel Hat',handle:'black-white-classic-bh-6-panel-hat',file:'black-white-classic-bh-6-panel-hat-uniform-ai.png',category:'classic-bh',price:29.99,badge:'Featured'},
{title:'Camo Classic Script 6-Panel Hat',handle:'camo-classic-script-6-panel-hat',file:'camo-classic-script-6-panel-hat-uniform-ai.png',category:'classic-script',price:29.99,badge:'Featured'},
{title:'Classic Mascot 6-Panel Red/White/Blue Hat',handle:'classic-mascot-6-panel-red-white-blue-hat',file:'classic-mascot-6-panel-red-white-blue-hat-uniform-ai.png',category:'mascot',price:29.99},
{title:'Classic Mascot 6-Panel White Hat',handle:'classic-mascot-6-panel-white-hat',file:'classic-mascot-6-panel-white-hat-uniform-ai.png',category:'mascot',price:29.99},
{title:'Classic Script 6-Panel Black Hat',handle:'classic-script-6-panel-black-hat',file:'classic-script-6-panel-black-hat-uniform-ai.png',category:'classic-script',price:29.99},
{title:'Classic Script 6-Panel Green Hat',handle:'classic-script-6-panel-green-hat',file:'classic-script-6-panel-green-hat-uniform-ai.png',category:'classic-script',price:29.99},
{title:'Classic Script 6-Panel Navy Hat',handle:'classic-script-6-panel-navy-hat',file:'classic-script-6-panel-navy-hat-uniform-ai.png',category:'classic-script',price:29.99},
{title:'Classic Script 6-Panel Pink Hat',handle:'classic-script-6-panel-pink-hat',file:'classic-script-6-panel-pink-hat-uniform-ai.png',category:'classic-script',price:29.99},
{title:'Classic Script 6-Panel Red Hat',handle:'classic-script-6-panel-red-hat',file:'classic-script-6-panel-red-hat-uniform-ai.png',category:'classic-script',price:29.99},
{title:'Classic Script 6-Panel White Hat',handle:'classic-script-6-panel-white-hat',file:'classic-script-6-panel-white-hat-uniform-ai.png',category:'classic-script',price:29.99},
{title:'Classic Script Reversible Bucket Hat',handle:'classic-script-reversible-bucket-hat',file:'classic-script-reversible-bucket-hat-uniform-ai.png',category:'bucket',price:29.99,badge:'Sold out'},
{title:'Crimson & White Classic BH 6-Panel Hat',handle:'crimson-white-classic-bh-6-panel-hat',file:'crimson-white-classic-bh-6-panel-hat-uniform-ai.png',category:'classic-bh',price:29.99},
{title:'Dark Green & White Classic BH 6-Panel Hat',handle:'dark-green-white-classic-bh-6-panel-hat',file:'dark-green-white-classic-bh-6-panel-hat-uniform-ai.png',category:'classic-bh',price:29.99},
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
let activeFilter='all',searchTerm='',activeProduct=null,bag=[];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function money(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n)}
function categoryLabel(p){return p.category.split(' ').map(c=>labels[c]).filter(Boolean)[0]||'Bucket Heads'}
function webp(file){return `assets/hats-webp/${file.replace(/\.png$/i,'.webp')}`}
function renderProducts(){const grid=$('.product-grid');if(!grid)return;const visible=products.filter(p=>(activeFilter==='all'||p.category.split(' ').includes(activeFilter))&&p.title.toLowerCase().includes(searchTerm));grid.innerHTML=visible.map((p,i)=>`<article class="product-card" style="--card-bg:${['#edf4e9','#eef0f5','#f6eee2','#f2edf0'][i%4]}"><button type="button" data-handle="${p.handle}" aria-label="Preview ${p.title}"><div class="product-visual">${p.badge?`<span class="product-badge ${p.badge==='Sold out'?'sold':''}">${p.badge}</span>`:''}<img src="${webp(p.file)}" alt="${p.title}" loading="${i<8?'eager':'lazy'}"></div><div class="product-details"><h3>${p.title}</h3><p>${money(p.price)}</p><span>${categoryLabel(p)}<b>↗</b></span></div></button></article>`).join('');$('.empty-state').hidden=visible.length!==0;$$('.product-card button').forEach(b=>b.addEventListener('click',()=>openProduct(b.dataset.handle)))}
function openProduct(handle){activeProduct=products.find(p=>p.handle===handle);if(!activeProduct)return;const modal=$('.product-modal');$('.modal-image img').src=webp(activeProduct.file);$('.modal-image img').alt=activeProduct.title;$('.modal-category').textContent=categoryLabel(activeProduct);$('#modal-title').textContent=activeProduct.title;$('.modal-price').textContent=money(activeProduct.price);$('.modal-live').href=`https://bucketheadsgolf.com/products/${activeProduct.handle}`;$('.modal-add').disabled=activeProduct.badge==='Sold out';$('.modal-add').textContent=activeProduct.badge==='Sold out'?'Currently sold out':'Add to preview bag';$('.modal-backdrop').hidden=false;modal.showModal();document.body.classList.add('is-locked')}
function closeProduct(){const modal=$('.product-modal');if(modal?.open)modal.close();const back=$('.modal-backdrop');if(back)back.hidden=true;document.body.classList.remove('is-locked')}
function renderBag(){const wrap=$('.bag-items');if(!wrap)return;wrap.innerHTML=bag.length?bag.map(p=>`<div class="bag-item"><img src="${webp(p.file)}" alt="${p.title}"><div><h3>${p.title}</h3><p>${money(p.price)}</p></div><button type="button" data-remove="${p.handle}">Remove</button></div>`).join(''):'<p style="padding:40px 0;color:#666">Your preview bag is empty.</p>';$('.bag-count').textContent=bag.length;$('.bag-total').textContent=money(bag.reduce((s,p)=>s+p.price,0));$$('[data-remove]').forEach(b=>b.addEventListener('click',()=>{bag=bag.filter(p=>p.handle!==b.dataset.remove);renderBag()}))}
function toggleBag(open=true){$('.bag-drawer')?.classList.toggle('is-open',open);$('.bag-drawer')?.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('is-locked',open)}
function toast(msg){const t=$('.toast');if(!t)return;t.textContent=msg;t.classList.add('is-visible');setTimeout(()=>t.classList.remove('is-visible'),2200)}
$$('.filter').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;$$('.filter').forEach(x=>x.classList.toggle('is-active',x===b));renderProducts()}));
$('.search-toggle')?.addEventListener('click',()=>{const p=$('.search-panel');p.classList.add('is-open');p.setAttribute('aria-hidden','false');setTimeout(()=>$('#site-search').focus(),200)});
$('.search-close')?.addEventListener('click',()=>{$('.search-panel').classList.remove('is-open');$('.search-panel').setAttribute('aria-hidden','true')});
$('#site-search')?.addEventListener('input',e=>{searchTerm=e.target.value.toLowerCase().trim();renderProducts();if(searchTerm)location.hash='hats'});
$('.mobile-menu')?.addEventListener('click',e=>{const d=$('.mobile-drawer');const open=!d.classList.contains('is-open');d.classList.toggle('is-open',open);e.currentTarget.setAttribute('aria-expanded',String(open))});
$$('.mobile-drawer a').forEach(a=>a.addEventListener('click',()=>$('.mobile-drawer').classList.remove('is-open')));
$('.modal-close')?.addEventListener('click',closeProduct);$('.modal-backdrop')?.addEventListener('click',()=>{closeProduct();toggleBag(false)});$('.product-modal')?.addEventListener('cancel',e=>{e.preventDefault();closeProduct()});
$('.modal-add')?.addEventListener('click',()=>{if(activeProduct&&!bag.some(p=>p.handle===activeProduct.handle)){bag.push(activeProduct);renderBag()}closeProduct();toggleBag(true)});
$('.bag-button')?.addEventListener('click',()=>toggleBag(true));$('.bag-close')?.addEventListener('click',()=>toggleBag(false));
$('.mock-checkout')?.addEventListener('click',()=>toast('Checkout remains disabled in this private preview.'));
renderProducts();renderBag();
