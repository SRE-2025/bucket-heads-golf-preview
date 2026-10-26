(function(){
  const page=document.querySelector('.sponsor-page');
  if(!page)return;
  const buttons=[...document.querySelectorAll('[data-sponsor-path]')];
  const panels=[...document.querySelectorAll('[data-sponsor-panel]')];
  const track=(event,detail={})=>window.BHTrack?.(event,{event_name:'Onion Creek Club Scramble',...detail});

  function showStatus(form,message){let n=form.querySelector('.form-status');if(!n){n=document.createElement('p');n.className='form-status';n.setAttribute('role','status');form.append(n)}n.textContent=message}
  if(!isShopify){document.querySelector('.sponsor-purchase-form button[type="submit"]').textContent='Preview sponsor checkout';document.querySelector('.sponsor-inquiry-form button[type="submit"]').textContent='Preview inquiry';document.querySelectorAll('.sponsor-form>small').forEach(n=>n.textContent='Design preview only. No message, payment or signup is submitted.');}
  function choosePath(path,scroll=false){
    const selected=path==='inquire'?'inquire':'purchase';
    buttons.forEach(button=>{
      const active=button.dataset.sponsorPath===selected;
      button.classList.toggle('is-active',active);
      button.setAttribute('aria-selected',String(active));
      button.tabIndex=active?0:-1;
    });
    panels.forEach(panel=>panel.hidden=panel.dataset.sponsorPanel!==selected);
    const url=new URL(location.href);
    url.searchParams.set('path',selected);
    history.replaceState({},'',url);
    track('select_sponsor_path',{sponsor_path:selected});
    if(scroll)document.querySelector('#sponsor-options')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  buttons.forEach((button,index)=>{button.addEventListener('click',()=>choosePath(button.dataset.sponsorPath));button.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?buttons.length-1:(index+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;choosePath(buttons[n].dataset.sponsorPath);buttons[n].focus()})});
  document.querySelectorAll('[data-sponsor-jump]').forEach(link=>link.addEventListener('click',()=>choosePath(link.dataset.sponsorJump)));
  document.querySelector('[data-open-inquiry]')?.addEventListener('click',()=>choosePath('inquire',true));

  document.querySelector('.sponsor-purchase-form')?.addEventListener('submit',event=>{
    if(!event.currentTarget.reportValidity()){event.preventDefault();return}
    if(!isShopify||!runtime.eventConfirmed){event.preventDefault();showStatus(event.currentTarget,isShopify?'Sponsorship checkout is not enabled yet. Please contact Bucket Heads. No payment was created.':'Sponsorship checkout preview complete. No payment was taken and no live order was placed.');return}
    const product=catalog.find(p=>p.handle==='scramble-hole-sponsor'),variant=product?.variants.find(v=>v.available);if(!variant){event.preventDefault();showStatus(event.currentTarget,'Sponsorship is unavailable. Please contact Bucket Heads.');return}event.currentTarget.elements.id.value=variant.id;
    track('begin_sponsor_checkout',{registration_type:'hole-sponsor',value:400,currency:'USD',shopify_variant:'52511999492327'});
  });

  document.querySelector('.sponsor-inquiry-form')?.addEventListener('submit',event=>{
    const form=event.currentTarget;
    if(!form.reportValidity()){event.preventDefault();return}
    const data=new FormData(form);
    const summary=[
      'Tournament: Onion Creek Club Scramble',
      'Event date: Monday, December 28, 2026 at 10 AM Central',
      `Company: ${data.get('contact[Company]')||''}`,
      `Contact: ${data.get('contact[First Name]')||''}`,
      `Email: ${data.get('contact[email]')||''}`,
      `Phone: ${data.get('contact[Phone]')||''}`,
      `Website / social: ${data.get('contact[Website]')||''}`,
      `Interest: ${data.get('sponsor_interest')||''}`,
      `Estimated budget: ${data.get('sponsor_budget')||''}`,
      '',
      'Message:',
      data.get('sponsor_message')||''
    ].join('\n');
    form.querySelector('[data-inquiry-summary]').value=summary;
    if(!isShopify){event.preventDefault();showStatus(form,'Sponsorship inquiry preview complete. Nothing was sent or saved.');return}
    track('submit_sponsor_inquiry',{sponsor_interest:data.get('sponsor_interest'),sponsor_budget:data.get('sponsor_budget')});
  });

  choosePath(new URLSearchParams(location.search).get('path')||'purchase');
})();
