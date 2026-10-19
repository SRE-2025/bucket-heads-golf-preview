const params=new URLSearchParams(location.search);
const requested=params.get('handle');
const product=products.find(item=>item.handle===requested)||products[0];
const pageImage=document.querySelector('#product-page-image');
const pageTitle=document.querySelector('.product-page-title');
const pagePrice=document.querySelector('.product-page-price');
const pageCategory=document.querySelector('.product-page-category');
const pageLive=document.querySelector('.product-page-live');
const pageAdd=document.querySelector('.product-page-add');

document.title=`${product.title} — Bucket Heads Golf Preview`;
pageImage.src=webp(product.file);
pageImage.alt=product.title;
pageTitle.textContent=product.title;
pagePrice.textContent=money(product.price);
pageCategory.textContent=categoryLabel(product);
pageLive.href=`https://bucketheadsgolf.com/products/${product.handle}`;
if(product.badge==='Sold out'){
  pageAdd.disabled=true;
  pageAdd.textContent='Currently sold out';
}

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
