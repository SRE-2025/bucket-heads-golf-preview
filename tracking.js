(function(){
 const preview=(window.BHRuntime?.mode||'preview')!=='shopify',events=[];
 const consent=()=>!preview&&window.Shopify?.customerPrivacy?.analyticsProcessingAllowed?.()===true;
 const safe=value=>String(value||'').slice(0,100).replace(/[^a-zA-Z0-9_. /()-]/g,'').trim();
 const read=(key)=>{try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}};
 const remove=()=>{try{localStorage.removeItem('bh-attribution-v2')}catch{}};
 const params=new URLSearchParams(location.search);
 const cleanCampaign=value=>!value||/[@]|%40/i.test(value)?undefined:safe(value);
 const touch={source:cleanCampaign(params.get('utm_source'))||'direct',medium:cleanCampaign(params.get('utm_medium'))||'none',campaign:cleanCampaign(params.get('utm_campaign'))||'(not set)'};
 if(!params.get('utm_source')&&document.referrer)try{const ref=new URL(document.referrer);if(ref.origin!==location.origin){touch.source=ref.hostname;touch.medium='referral'}}catch{}
 function attribution(){
  if(!consent())return null;const now=Date.now();let saved=read('bh-attribution-v2');
  if(!saved||now-saved.created>90*86400000)saved={created:now,first:touch,last:touch};
  else if(params.has('utm_source'))saved.last=touch;
  try{localStorage.setItem('bh-attribution-v2',JSON.stringify(saved))}catch{}
  return saved;
 }
 const strings=['item_list_id','item_list_name','program','quantity_tier','timing','registration_role','payment_plan','lead_type','photo_type','state'];
 const numbers=['value','item_count','step_number','from_step','interest_count','photo_index','photo_count','results_count'];
 function track(event,detail={}){
  const payload={event:preview?'preview_'+safe(event):safe(event),preview_only:preview,page_path:location.pathname,event_time:new Date().toISOString()};
  for(const key of strings)if(typeof detail[key]==='string')payload[key]=safe(detail[key]);
  for(const key of numbers)if(Number.isFinite(detail[key]))payload[key]=detail[key];
  if(detail.currency)payload.currency=safe(detail.currency);
  if(Array.isArray(detail.items))payload.items=detail.items.slice(0,100).map(i=>({item_id:safe(i.item_id),item_variant:safe(i.item_variant),item_name:safe(i.item_name),item_category:safe(i.item_category),price:Number(i.price)||0,quantity:Number(i.quantity)||1}));
  // Preview QA stays in memory: no cookies, stored event history, emails, names or search text.
  events.push(payload);if(events.length>100)events.shift();
  if(!preview&&consent()){const a=attribution();window.dataLayer=window.dataLayer||[];window.dataLayer.push({...payload,first_touch_source:a?.first.source,last_touch_source:a?.last.source,last_touch_medium:a?.last.medium,last_touch_campaign:a?.last.campaign});}
  document.documentElement.dataset.trackingLastEvent=payload.event;return payload;
 }
 document.addEventListener('visitorConsentCollected',()=>{if(!consent())remove();else attribution()});
 window.BHTrack=track;window.BHTracking={events,track,preview,consent};
 track('page_view');
})();
