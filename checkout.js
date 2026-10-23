(function(){
 const total=bagValue(),count=bag.reduce((n,p)=>n+p.quantity,0);
 document.querySelector('.checkout-items').innerHTML=bag.map(p=>'<a class="checkout-item" href="'+productURL(p.handle)+'"><span class="checkout-item-image"><img src="'+escapeHTML(p.isHat?galleryView(p.handle):p.image)+'" alt="'+escapeHTML(p.title)+'"><b>'+p.quantity+'</b></span><span><strong>'+escapeHTML(p.title)+'</strong><small>'+escapeHTML(p.variantTitle==='Default Title'?'One size':p.variantTitle||categoryLabel(p))+'</small></span><em>'+money(p.price*p.quantity)+'</em></a>').join('');
 document.querySelector('.checkout-empty').hidden=!!count;
 document.querySelector('.checkout-totals').innerHTML='<div><span>Subtotal · '+count+' '+(count===1?'item':'items')+'</span><strong>'+money(total)+'</strong></div><div><span>Shipping & tax</span><strong>Confirmed in Shopify</strong></div>';
 const button=document.querySelector('.checkout-demo');button.disabled=!count;
 button.addEventListener('click',()=>{document.querySelector('.form-status').textContent='Handoff preview complete. No payment was taken and no order was placed. On the approved store, this button opens Shopify checkout with these exact products and sizes.';window.BHTrack?.('checkout_handoff_preview',{})});
})();
