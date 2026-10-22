(function(){
  const EVENT_NAME='Onion Creek Club Scramble';
  const SINGLE_VARIANT='52158742954215';
  const TEAM_VARIANT='52158875074791';
  const builder=document.querySelector('[data-team-builder]');
  if(!builder)return;

  const captainForm=builder.querySelector('#captain-team-form');
  const ready=builder.querySelector('.team-ready');
  const joinForm=builder.querySelector('#team-join-form');
  const covered=builder.querySelector('.team-covered');
  const intro=builder.querySelector('.team-builder-intro');
  const roster=builder.querySelector('.covered-roster');
  const params=new URLSearchParams(location.search);
  const clean=value=>(value||'').trim().replace(/\s+/g,' ');
  const setText=(selector,value,root=builder)=>{const node=root.querySelector(selector);if(node)node.textContent=value};
  const track=(event,detail)=>window.BHTrack?.(event,{event_name:EVENT_NAME,...detail});

  function makeCode(){
    const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const values=new Uint8Array(6);
    if(window.crypto?.getRandomValues)window.crypto.getRandomValues(values);
    else values.forEach((_,index)=>values[index]=Math.floor(Math.random()*256));
    return `BH-OC-${[...values].map(value=>alphabet[value%alphabet.length]).join('')}`;
  }

  function makeTeamLink(team){
    const url=new URL(location.href);
    url.search='';
    url.hash='team-signup';
    url.searchParams.set(team.plan==='split'?'join':'covered','1');
    url.searchParams.set('team',team.code);
    url.searchParams.set('captain',team.captainName);
    return url.toString();
  }

  function addProperty(container,name,value){
    const input=document.createElement('input');
    input.type='hidden';
    input.name=`properties[${name}]`;
    input.value=value;
    container.appendChild(input);
  }

  function showCaptainResult(team){
    captainForm.hidden=true;
    ready.hidden=false;
    const link=makeTeamLink(team);
    const properties=ready.querySelector('[data-line-properties]');
    properties.replaceChildren();
    setText('[data-ready-captain]',team.captainName,ready);
    setText('[data-team-code]',team.code,ready);
    ready.querySelector('[data-team-link]').value=link;
    ready.querySelector('[data-checkout-variant]').value=team.plan==='split'?SINGLE_VARIANT:TEAM_VARIANT;
    setText('[data-checkout-label]',team.plan==='split'?'Pay my $175 entry ↗':'Pay $1,050 for all six ↗',ready);
    setText('[data-ready-copy]',team.plan==='split'
      ?'Your spot is ready. Share this link with the other five players so each person can register and pay under your captain code.'
      :'All six spots will be covered in one checkout. Share the link so the group knows the team is registered.',ready);
    const values={
      'Event':EVENT_NAME,
      'Team Code':team.code,
      'Registration Role':'Captain',
      'Captain Name':team.captainName,
      'Captain Email':team.captainEmail,
      'Captain Phone':team.captainPhone,
      'Payment Plan':team.plan==='split'?'Separate player payments':'Captain pays for all six',
      'Player 1':team.captainName
    };
    team.players.forEach((player,index)=>{if(player)values[`Player ${index+2}`]=player});
    Object.entries(values).forEach(([name,value])=>addProperty(properties,name,value));
    try{localStorage.setItem(`bh-team-${team.code}`,JSON.stringify(team))}catch{}
    track('create_tournament_team',{team_code:team.code,payment_plan:team.plan,team_size:6});
    ready.scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  captainForm.querySelectorAll('input[name="payment_plan"]').forEach(input=>input.addEventListener('change',()=>{
    const full=input.value==='full'&&input.checked;
    roster.hidden=!full;
    captainForm.querySelectorAll('.payment-option').forEach(option=>option.classList.toggle('is-selected',option.contains(captainForm.querySelector('input[name="payment_plan"]:checked'))));
    track('select_team_payment_plan',{payment_plan:captainForm.elements.payment_plan.value});
  }));

  captainForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(!captainForm.reportValidity())return;
    const data=new FormData(captainForm);
    showCaptainResult({
      code:makeCode(),
      captainName:clean(data.get('captain_name')),
      captainEmail:clean(data.get('captain_email')),
      captainPhone:clean(data.get('captain_phone')),
      plan:data.get('payment_plan'),
      players:[2,3,4,5,6].map(number=>clean(data.get(`player_${number}`)))
    });
  });

  ready.querySelector('[data-share-team]').addEventListener('click',async()=>{
    const captainName=ready.querySelector('[data-ready-captain]').textContent;
    const link=ready.querySelector('[data-team-link]').value;
    const split=ready.querySelector('[data-checkout-variant]').value===SINGLE_VARIANT;
    const text=split
      ?`${captainName} is captain for the ${EVENT_NAME}. Use this link to join the team and pay your $175 entry:`
      :`${captainName} is captain for the ${EVENT_NAME} and is covering all six entries. Team details:`;
    try{
      if(navigator.share)await navigator.share({title:`${captainName}'s tournament team`,text,url:link});
      else{await navigator.clipboard.writeText(`${text} ${link}`);setText('[data-share-team]','Message copied ✓',ready)}
      track('share_tournament_team',{team_code:ready.querySelector('[data-team-code]').textContent,share_method:navigator.share?'native_share':'clipboard'});
    }catch(error){if(error?.name!=='AbortError')setText('[data-share-team]','Copy the link below',ready)}
  });

  ready.querySelector('[data-copy-team]').addEventListener('click',async event=>{
    const input=ready.querySelector('[data-team-link]');
    try{await navigator.clipboard.writeText(input.value)}catch{input.select();document.execCommand('copy')}
    event.currentTarget.textContent='Copied ✓';
    track('copy_tournament_team_link',{team_code:ready.querySelector('[data-team-code]').textContent});
  });

  ready.querySelector('[data-reset-team]').addEventListener('click',()=>{
    ready.hidden=true;
    captainForm.hidden=false;
    captainForm.reset();
    roster.hidden=true;
    captainForm.querySelectorAll('.payment-option').forEach((option,index)=>option.classList.toggle('is-selected',index===0));
    captainForm.querySelector('input').focus();
  });

  ready.querySelector('.shopify-team-checkout').addEventListener('submit',()=>{
    track('begin_tournament_checkout',{
      team_code:ready.querySelector('[data-team-code]').textContent,
      registration_role:'captain',
      payment_plan:ready.querySelector('[data-checkout-variant]').value===SINGLE_VARIANT?'split':'full',
      value:ready.querySelector('[data-checkout-variant]').value===SINGLE_VARIANT?175:1050,
      currency:'USD'
    });
  });

  joinForm.addEventListener('submit',()=>track('begin_tournament_checkout',{
    team_code:joinForm.querySelector('[data-join-code-input]').value,
    registration_role:'teammate',
    payment_plan:'split',
    value:175,
    currency:'USD'
  }));

  function loadSharedTeam(){
    const code=clean(params.get('team')).toUpperCase();
    const captainName=clean(params.get('captain')||params.get('teamName'))||'Your captain';
    if(!/^BH-OC-[A-Z2-9]{6}$/.test(code))return;
    captainForm.hidden=true;
    intro.hidden=true;
    if(params.get('covered')==='1'){
      covered.hidden=false;
      setText('[data-covered-captain]',captainName);
      setText('[data-covered-team-code]',code);
      track('view_covered_team_invite',{team_code:code});
      return;
    }
    joinForm.hidden=false;
    setText('[data-join-captain]',`${captainName}'S TEAM`);
    setText('[data-join-team-code]',code);
    joinForm.querySelector('[data-join-code-input]').value=code;
    joinForm.querySelector('[data-join-captain-input]').value=captainName;
    track('view_team_invite',{team_code:code,payment_plan:'split'});
  }

  loadSharedTeam();
})();
