// Used by the standalone dummy and disabled-commerce Shopify preview templates.
// Fail closed: no preview form can submit to the live store, including with Enter.
window.BHRuntime=Object.freeze({...window.BHRuntime,mode:'preview'});
document.addEventListener('submit',event=>{event.preventDefault()},true);
document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('form[inert]').forEach(form=>form.inert=false));
