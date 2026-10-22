const checkoutForm=document.querySelector('.checkout-form');
const checkoutEmpty=document.querySelector('.checkout-empty');
const checkoutComplete=document.querySelector('.checkout-complete');
const checkoutSubmit=document.querySelector('.checkout-submit');
const checkoutTotal=bag.reduce((sum,item)=>sum+(item.price*item.quantity),0);
const checkoutCount=bag.reduce((sum,item)=>sum+item.quantity,0);
const checkoutItems=bag.map(item=>({...trackingItem(item),quantity:item.quantity}));
let checkoutStarted=false;
let checkoutFinished=false;

function renderCheckout(){
  document.querySelectorAll('.checkout-total').forEach(el=>{el.textContent=money(checkoutTotal)});
  document.querySelectorAll('.checkout-items').forEach(wrap=>{
    wrap.innerHTML=bag.length?bag.map(item=>`<a class="checkout-item" href="product.html?handle=${encodeURIComponent(item.handle)}"><span class="checkout-item-image"><img src="${webp(item.file)}" alt="${item.title}"><b>${item.quantity}</b></span><span><strong>${item.title}</strong><small>${categoryLabel(item)}</small></span><em>${money(item.price*item.quantity)}</em></a>`).join(''):'';
  });
  document.querySelectorAll('.checkout-totals').forEach(wrap=>{
    wrap.innerHTML=`<div><span>Subtotal · ${checkoutCount} ${checkoutCount===1?'item':'items'}</span><strong>${money(checkoutTotal)}</strong></div><div><span>Shipping</span><strong>Calculated next</strong></div><div class="checkout-total-row"><span>Estimated total</span><strong>${money(checkoutTotal)}</strong></div>`;
  });
  checkoutForm.hidden=!bag.length;
  checkoutEmpty.hidden=Boolean(bag.length);
}

renderCheckout();
window.BHTrack?.('checkout_view',{currency:'USD',value:checkoutTotal,items:checkoutItems,item_count:checkoutCount,preview_only:true});

checkoutForm?.addEventListener('input',event=>{
  if(!checkoutStarted){checkoutStarted=true;window.BHTrack?.('checkout_contact_started',{field_name:event.target.name||'unknown',preview_only:true})}
});

checkoutForm?.addEventListener('submit',event=>{
  event.preventDefault();
  if(!checkoutForm.checkValidity()){
    checkoutForm.reportValidity();
    window.BHTrack?.('checkout_validation_error',{missing_field_count:[...checkoutForm.querySelectorAll('[required]')].filter(field=>!field.validity.valid).length,preview_only:true});
    return;
  }
  checkoutFinished=true;
  window.BHTrack?.('add_shipping_info',{currency:'USD',value:checkoutTotal,items:checkoutItems,shipping_tier:'standard',preview_only:true});
  window.BHTrack?.('checkout_payment_step_reached',{currency:'USD',value:checkoutTotal,items:checkoutItems,preview_only:true});
  checkoutForm.hidden=true;
  checkoutComplete.hidden=false;
  document.querySelector('.checkout-progress span:nth-child(2)').classList.add('is-complete');
  document.querySelector('.checkout-progress span:nth-child(3)').classList.add('is-active');
  checkoutComplete.scrollIntoView({behavior:'smooth',block:'center'});
});

document.querySelector('.checkout-summary-mobile')?.addEventListener('toggle',event=>{
  window.BHTrack?.('checkout_order_summary_toggle',{state:event.currentTarget.open?'open':'closed'});
});

window.addEventListener('pagehide',()=>{
  if(checkoutStarted&&!checkoutFinished)window.BHTrack?.('checkout_exit_before_payment',{currency:'USD',value:checkoutTotal,item_count:checkoutCount,preview_only:true});
});
