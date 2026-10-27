(function(){
const builder=document.querySelector('[data-team-builder]');if(!builder)return;
if(!isShopify){builder.querySelectorAll('form>small,.team-ready>small').forEach(n=>n.textContent='Demonstration only. No signup, reservation or payment is sent to the live store.');builder.querySelector('.payment-option small').textContent='Preview paying your own entry, then sharing the team link with the other five players.';}
const captainForm=builder.querySelector('#captain-team-form'),ready=builder.querySelector('.team-ready'),join=builder.querySelector('#team-join-form'),covered=builder.querySelector('.team-covered'),roster=builder.querySelector('.covered-roster'),params=new URLSearchParams(location.search),fragment=new URLSearchParams(location.hash.slice(1));
let team=null,busy=false,reservationKey=crypto.randomUUID();
const set=(selector,value,root=builder)=>{const n=root.querySelector(selector);if(n)n.textContent=value};
function status(form,message){let node=form.querySelector('.form-status');if(!node){node=document.createElement('p');node.className='form-status';node.setAttribute('role','status');form.append(node)}node.textContent=message}
function focusStep(root){const heading=root.querySelector('h3')||root.querySelector('h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true})}root.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}
function syncPaymentChoice(){roster.hidden=captainForm.elements.payment_plan.value!=='full';captainForm.querySelectorAll('.payment-option').forEach(option=>option.classList.toggle('is-selected',!!option.querySelector('input:checked')))}
async function api(path,body){
 if(!isShopify||!runtime.teamApi||!runtime.eventConfirmed)throw Error('Tournament registration is awaiting organizer approval. No payment was created.');
 const url=new URL(runtime.teamApi+path,location.origin);if(url.origin!==location.origin)throw Error('Registration endpoint must be the approved same-origin Shopify app proxy.');
 const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),result=await r.json();if(!r.ok)throw Error(result.error||'Please try again.');return result;
}
function shareLink(){const url=new URL(location.href);url.search='';url.hash='';if(runtime.shopifyTheme&&!isShopify)url.searchParams.set('view','bh-tournament');url.searchParams.set('team',team.code);if(!isShopify){url.searchParams.set('demo','1');url.searchParams.set('plan',team.plan)}else url.hash='invite='+encodeURIComponent(team.token);return url.toString()}
function showTeam(){
 captainForm.hidden=true;ready.hidden=false;covered.hidden=true;join.hidden=true;
 set('[data-ready-captain]',team.captainFirstName,ready);set('[data-team-code]',team.code,ready);
 ready.querySelector('[data-team-link]').value=shareLink();
 set('[data-ready-copy]',isShopify?'Share your team link. Only a completed Shopify payment confirms a place.':'Demo team created. No place is reserved and nobody has paid. Share this link to preview the teammate experience.',ready);
 set('[data-checkout-label]',isShopify?(team.plan==='full'?'Continue to team checkout':'Continue to my checkout'):'Preview checkout — no payment',ready);
 set('h3',isShopify?'Your team link is ready.':'Your demo link is ready.',ready);
 focusStep(ready);
}
captainForm.querySelectorAll('[name="payment_plan"]').forEach(input=>input.addEventListener('change',syncPaymentChoice));
captainForm.addEventListener('submit',async event=>{
 event.preventDefault();if(busy||!captainForm.reportValidity())return;busy=true;
 const data=new FormData(captainForm),captain=String(data.get('captain_name')).trim(),plan=data.get('payment_plan');
 try{if(isShopify)team=await api('/api/team/create',{captain,plan});else team={code:(captain.split(' ')[0].replace(/[^a-z0-9]/gi,'').toUpperCase().slice(0,8)||'CAPTAIN')+'-'+(1000+crypto.getRandomValues(new Uint32Array(1))[0]%9000),captainFirstName:captain.split(' ')[0],plan,paid:0,remaining:6};showTeam()}catch(e){status(captainForm,e.message)}finally{busy=false}
});
ready.querySelector('[data-copy-team]').addEventListener('click',async event=>{try{await navigator.clipboard.writeText(shareLink());event.currentTarget.textContent='Copied ✓'}catch{ready.querySelector('[data-team-link]').select();status(ready,'Select and copy the team link above.')}});
ready.querySelector('[data-share-team]').addEventListener('click',async()=>{try{const text=(isShopify?'Join our Bucket Heads team. Pay only for your own entry if the captain selected split payments.':'Preview our Bucket Heads team signup. Demo only—no registrations or payments.')+' '+shareLink();if(navigator.share)await navigator.share({title:'Bucket Heads team '+team.code,text});else{await navigator.clipboard.writeText(text);status(ready,'Group-chat message copied.')}}catch(e){if(e.name!=='AbortError')status(ready,'Please copy the link above.')}});
ready.querySelector('[data-reset-team]').addEventListener('click',()=>{team=null;reservationKey=crypto.randomUUID();ready.hidden=true;captainForm.hidden=false;captainForm.reset();syncPaymentChoice();builder.querySelectorAll('.form-status').forEach(n=>n.remove());ready.querySelector('[data-copy-team]').textContent='Copy link';captainForm.querySelector('input').focus()});
async function pay(form,player){
 if(!form.reportValidity()||busy)return;
 if(!isShopify){status(form,'Checkout demonstration complete. No place was reserved, no payment was taken and no live order was created.');return}
 busy=true;const button=form.querySelector('button[type="submit"]');button.disabled=true;
 try{const result=await api('/api/team/reserve',{code:team.code,token:team.token,name:player.name,email:player.email,players:player.players,phone:player.phone,requestKey:reservationKey});const url=new URL(result.checkoutUrl);if(url.protocol!=='https:'||![runtime.shopDomain,runtime.shopPermanentDomain,'checkout.shopify.com'].includes(url.hostname))throw Error('Unexpected checkout address. Contact Bucket Heads before paying.');location.assign(url.href)}catch(e){status(form,e.message)}finally{busy=false;button.disabled=false}
}
ready.querySelector('.shopify-team-checkout').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(captainForm);pay(event.currentTarget,{name:data.get('captain_name'),email:data.get('captain_email'),phone:data.get('captain_phone'),players:[2,3,4,5,6].map(n=>data.get('player_'+n)||'')})});
join.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(join);pay(join,{name:data.get('properties[Player Name]'),email:data.get('properties[Player Email]'),phone:data.get('properties[Player Phone]')})});
async function loadTeam(){
 const code=params.get('team');if(!code)return;
 captainForm.hidden=true;builder.querySelector('.team-builder-intro').hidden=true;
 if(!/^[A-Z0-9]{1,8}-\d{4}$/.test(code)){status(builder,'Invalid team code. Ask the captain for the complete team link. No signup or payment was created.');builder.scrollIntoView({block:'start'});return}
 try{
  if(isShopify){const accessToken=fragment.get('invite');team={...await api('/api/team/status',{code,token:accessToken}),token:accessToken}}
  else team={code,captainFirstName:code.split('-')[0],plan:params.get('plan')==='full'?'full':'split',paid:0,remaining:6};
  if(team.plan==='full'){
   covered.hidden=false;set('[data-covered-captain]',team.captainFirstName,covered);set('[data-covered-team-code]',team.code,covered);
   set('h3',team.paymentConfirmed?'Team payment confirmed.':'Captain selected full-team payment.',covered);
   set('p:not(.eyebrow)',team.paymentConfirmed?'Shopify has confirmed the team payment. Contact your captain to confirm your place on the roster.':isShopify?'Payment has not been confirmed. Do not assume your place is paid until the captain receives the order confirmation.':'Demo only. This link cannot prove payment or reserve places. No live signup was created.',covered);
   focusStep(covered);
  }else{
   join.hidden=false;set('[data-join-captain]',team.captainFirstName.toUpperCase()+'’S TEAM',join);set('[data-join-team-code]',team.code,join);
   const button=join.querySelector('button[type="submit"]');button.textContent=isShopify?'Continue to my checkout':'Preview my checkout — no payment';
   if(isShopify&&team.remaining<1){button.disabled=true;status(join,'This team is full or all places are currently reserved. Contact the captain.')}
   focusStep(join);
  }
 }catch(e){status(builder,e.message)}
}
loadTeam();
})();
