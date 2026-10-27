(function(){
 const form=document.querySelector('.sponsor-inquiry-form');if(!form)return;
 if(!isShopify){form.querySelector('button[type="submit"]').textContent='Preview inquiry';form.querySelector('small').textContent='Design preview only. No message, payment or signup is submitted.';}
 function showStatus(message){let node=form.querySelector('.form-status');if(!node){node=document.createElement('p');node.className='form-status';node.setAttribute('role','status');form.append(node)}node.textContent=message}
 function openInquiry(event){event?.preventDefault();document.querySelector('#sponsor-inquiry').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});form.querySelector('input:not([type="hidden"])')?.focus({preventScroll:true})}
 document.querySelectorAll('[data-sponsor-jump],[data-open-inquiry]').forEach(button=>button.addEventListener('click',openInquiry));
 form.addEventListener('submit',event=>{
  if(!form.reportValidity()){event.preventDefault();return}
  const data=new FormData(form);
  const summary=['Tournament: Onion Creek Club Scramble','Event date: Monday, December 28, 2026 at 10 AM Central','Sponsorship pricing: To be confirmed by Tim and Travis',
   'Company: '+(data.get('contact[Company]')||''),'Contact: '+(data.get('contact[First Name]')||''),'Email: '+(data.get('contact[email]')||''),'Phone: '+(data.get('contact[Phone]')||''),'Website / social: '+(data.get('contact[Website]')||''),'Interest: '+(data.get('sponsor_interest')||''),'','Message:',data.get('sponsor_message')||''].join('\n');
  form.querySelector('[data-inquiry-summary]').value=summary;
  if(!isShopify){event.preventDefault();showStatus('Sponsorship inquiry preview complete. Nothing was sent or saved.');return}
  track('submit_sponsor_inquiry',{event_name:'Onion Creek Club Scramble',sponsor_interest:data.get('sponsor_interest')});
 });
})();
