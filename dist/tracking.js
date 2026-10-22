(function(){
  const STORAGE_KEY='bh-attribution-v1';
  const SESSION_KEY='bh-session-v1';
  const EVENT_KEY='bh-preview-events-v1';
  const params=new URLSearchParams(location.search);
  const safeRead=(storage,key)=>{try{return JSON.parse(storage.getItem(key)||'null')}catch{return null}};
  const safeWrite=(storage,key,value)=>{try{storage.setItem(key,JSON.stringify(value))}catch{}}
  const referrerHost=(()=>{try{return document.referrer?new URL(document.referrer).hostname:''}catch{return ''}})();
  const campaignTouch={
    source:params.get('utm_source')||referrerHost||'direct',
    medium:params.get('utm_medium')||(referrerHost?'referral':'none'),
    campaign:params.get('utm_campaign')||'(not set)',
    term:params.get('utm_term')||'(not set)',
    content:params.get('utm_content')||'(not set)',
    landing_path:location.pathname
  };
  const hasCampaign=['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].some(key=>params.has(key));
  let firstTouch=safeRead(localStorage,STORAGE_KEY);
  if(!firstTouch){firstTouch=campaignTouch;safeWrite(localStorage,STORAGE_KEY,firstTouch)}
  let lastTouch=safeRead(sessionStorage,`${STORAGE_KEY}-last`);
  if(!lastTouch||hasCampaign){lastTouch=campaignTouch;safeWrite(sessionStorage,`${STORAGE_KEY}-last`,lastTouch)}
  let sessionId=sessionStorage.getItem(SESSION_KEY);
  if(!sessionId){sessionId=crypto.randomUUID?.()||`bh-${Date.now()}-${Math.random().toString(16).slice(2)}`;try{sessionStorage.setItem(SESSION_KEY,sessionId)}catch{}}
  const pageType=document.body.classList.contains('product-page')?'product':document.body.classList.contains('wholesale-page')?'wholesale':document.body.classList.contains('checkout-page')?'checkout':'home';
  const events=[];
  let recentEvents=safeRead(localStorage,EVENT_KEY)||[];
  if(!Array.isArray(recentEvents))recentEvents=[];
  window.dataLayer=window.dataLayer||[];
  function track(event,detail={}){
    const payload={
      event,
      event_id:crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`,
      event_time:new Date().toISOString(),
      page_type:pageType,
      page_path:location.pathname,
      session_id:sessionId,
      first_touch_source:firstTouch.source,
      first_touch_medium:firstTouch.medium,
      first_touch_campaign:firstTouch.campaign,
      last_touch_source:lastTouch.source,
      last_touch_medium:lastTouch.medium,
      last_touch_campaign:lastTouch.campaign,
      ...detail
    };
    events.push(payload);
    if(events.length>100)events.shift();
    recentEvents.push(payload);
    if(recentEvents.length>250)recentEvents=recentEvents.slice(-250);
    safeWrite(localStorage,EVENT_KEY,recentEvents);
    window.dataLayer.push(payload);
    document.documentElement.dataset.trackingLastEvent=event;
    window.dispatchEvent(new CustomEvent('bh:track',{detail:payload}));
    return payload;
  }
  window.BHTrack=track;
  window.BHTracking={track,events,recentEvents,sessionId,attribution:{first:firstTouch,last:lastTouch}};
  document.documentElement.dataset.trackingReady='true';
  document.documentElement.dataset.trackingSource=lastTouch.source;
  document.documentElement.dataset.trackingMedium=lastTouch.medium;
  document.documentElement.dataset.trackingCampaign=lastTouch.campaign;
  track('page_view',{page_title:document.title});
})();
