(function(){
 const form=document.querySelector('.builder-form');if(!form)return;
 form.id='WholesaleInquiry';let step=1,confirmedSubmission=false;
 const back=document.querySelector('.builder-back'),next=document.querySelector('.builder-next'),summary=document.querySelector('.inquiry-summary');
 const chosen=name=>[...form.querySelectorAll('[name="'+name+'"]:checked')].map(n=>n.value);
 function show(n){step=n;form.querySelectorAll('.builder-step').forEach(node=>{const active=Number(node.dataset.step)===step;node.classList.toggle('is-current',active);node.inert=!active});document.querySelectorAll('.step-dots i').forEach((n,i)=>n.classList.toggle('is-active',i<step));back.hidden=step===1;next.textContent=step===4?'Review inquiry':'Next step';}
 function valid(){if(step===1&&!chosen('program').length){toast('Choose the kind of custom program you need.');return false}if(step===2&&!chosen('quantity').length){toast('Choose an estimated quantity.');return false}if(step===3&&!chosen('interest').length){toast('Choose at least one use for the hats.');return false}if(step===4){form.elements.name.required=true;form.elements.email.required=true;for(const n of [form.elements.name,form.elements.email]){if(!n.checkValidity()){n.reportValidity();return false}}}return true}
 function hidden(name,value){let n=form.querySelector('input[name="'+name+'"]');if(!n){n=document.createElement('input');n.type='hidden';n.name=name;form.append(n)}n.value=value}
 next.addEventListener('click',()=>{
  if(!valid())return;if(step<4){show(step+1);form.querySelector('.is-current input,.is-current select')?.focus();return}
  const d=new FormData(form);const text=['CUSTOM HAT INQUIRY','Program: '+d.get('program'),'Quantity: '+d.get('quantity'),'Use: '+d.getAll('interest').join(', '),'Timing: '+d.get('timing'),'Name: '+d.get('name'),'Organization: '+(d.get('organization')||''),'Email: '+d.get('email'),'Phone: '+(d.get('phone')||''),'Location: '+(d.get('location')||''),'How they found us: '+(d.get('referral')||''),'Notes: '+(d.get('notes')||'')].join('\n');
  summary.querySelector('pre').textContent=text;hidden('contact[email]',d.get('email'));hidden('contact[name]',d.get('name'));hidden('contact[body]',text);hidden('contact[tags]','custom-hat-inquiry');
  form.hidden=true;summary.hidden=false;summary.scrollIntoView({behavior:'smooth',block:'center'});
  if(!summary.querySelector('.confirm-inquiry')){const b=document.createElement('button');b.type='button';b.className='button button-dark confirm-inquiry';b.textContent=isShopify?'Send inquiry':'Preview sending inquiry';summary.append(b);const status=document.createElement('p');status.className='form-status';status.setAttribute('role','status');summary.append(status);b.addEventListener('click',()=>{if(isShopify){if(confirmedSubmission)return;confirmedSubmission=true;b.disabled=true;b.textContent='Sending inquiry…';form.querySelectorAll('[inert]').forEach(n=>n.inert=false);form.requestSubmit()}else{status.textContent='Inquiry preview complete. Nothing was sent or saved. The approved store will send this brief directly to Bucket Heads.';window.BHTrack?.('wholesale_preview_complete',{})}})}
 });
 form.addEventListener('submit',e=>{if(!isShopify||!confirmedSubmission){e.preventDefault();next.click()}});
 back.addEventListener('click',()=>show(Math.max(1,step-1)));
 document.querySelector('.edit-summary').addEventListener('click',()=>{summary.hidden=true;form.hidden=false;show(4)});
 document.querySelector('.copy-summary').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(summary.querySelector('pre').textContent);toast('Summary copied. Nothing was sent.')}catch{toast('Select and copy the summary text.')}});
 const received=form.querySelector('[data-native-form-sent="true"]');
 if(received){form.before(received);form.hidden=true;summary.hidden=true;received.tabIndex=-1;received.focus();window.BHTrack?.('generate_lead',{lead_type:'wholesale_custom_hat'});return}
 show(1);
})();
