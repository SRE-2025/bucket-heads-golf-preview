// This file is present only in the standalone dummy site, never in the Shopify package.
// Fail closed: no preview form can submit to the live store, including with Enter.
window.BHRuntime=Object.freeze({...window.BHRuntime,mode:'preview'});
document.addEventListener('submit',event=>{event.preventDefault()},true);
document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('form[inert]').forEach(form=>form.inert=false));
