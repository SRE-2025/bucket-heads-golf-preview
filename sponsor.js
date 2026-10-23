(function(){
  const page=document.querySelector('.sponsor-page');
  if(!page)return;
  const buttons=[...document.querySelectorAll('[data-sponsor-path]')];
  const panels=[...document.querySelectorAll('[data-sponsor-panel]')];
  const track=(event,detail={})=>window.BHTrack?.(event,{event_name:'Onion Creek Club Scramble',...detail});

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

  buttons.forEach(button=>button.addEventListener('click',()=>choosePath(button.dataset.sponsorPath)));
  document.querySelectorAll('[data-sponsor-jump]').forEach(link=>link.addEventListener('click',()=>choosePath(link.dataset.sponsorJump)));
  document.querySelector('[data-open-inquiry]')?.addEventListener('click',()=>choosePath('inquire',true));

  document.querySelector('.sponsor-purchase-form')?.addEventListener('submit',event=>{
    if(!event.currentTarget.reportValidity()){event.preventDefault();return}
    track('begin_sponsor_checkout',{registration_type:'hole-sponsor',value:400,currency:'USD',shopify_variant:'52511999492327'});
  });

  document.querySelector('.sponsor-inquiry-form')?.addEventListener('submit',event=>{
    const form=event.currentTarget;
    if(!form.reportValidity()){event.preventDefault();return}
    const data=new FormData(form);
    const summary=[
      'Tournament: Onion Creek Club Scramble',
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
    track('submit_sponsor_inquiry',{sponsor_interest:data.get('sponsor_interest'),sponsor_budget:data.get('sponsor_budget')});
  });

  choosePath(new URLSearchParams(location.search).get('path')||'purchase');
})();
