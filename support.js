(function(){
  const form=document.querySelector('.newsletter-form');
  form?.addEventListener('submit',event=>{
    if(isShopify)return;event.preventDefault();
    if(!form.reportValidity())return;
    form.querySelector('.form-status').textContent='Signup preview complete. No email was sent or saved. The production signup will connect to Bucket Heads’ existing customer list.';
    form.reset();window.BHTrack?.('newsletter_preview_complete',{});
  });
  if(!isShopify){
    document.querySelectorAll('.product-purchase-help span,.bag-assurance').forEach(n=>n.textContent='Design preview · no payment collected');
    document.querySelectorAll('.announce span').forEach(n=>{if(!n.textContent.includes('FORM'))n.textContent='DESIGN PREVIEW · NO LIVE ORDERS OR PAYMENTS'});
  }
})();
