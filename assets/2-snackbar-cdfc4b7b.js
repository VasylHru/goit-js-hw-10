import{i as r}from"./vendor-77e16229.js";document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".form");e.addEventListener("submit",t=>{t.preventDefault();const s=Number(e.elements.delay.value),i=e.elements.state.value;n(s,i).then(o=>{r.success({title:"Success",message:o,position:"topRight"})}).catch(o=>{r.error({title:"Error",message:o,position:"topRight"})}).finally(()=>{e.reset()})})});function n(e,t){return new Promise((s,i)=>{setTimeout(()=>{t==="fulfilled"?s(`✅ Fulfilled promise in ${e}ms`):t==="rejected"&&i(`❌ Rejected promise in ${e}ms`)},e)})}
//# sourceMappingURL=2-snackbar-cdfc4b7b.js.map
