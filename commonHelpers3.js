/* empty css                      */import{f as C,i as d}from"./assets/vendor-77e16229.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const l=document.getElementById("datetime-picker"),a=document.querySelector("button[data-start]"),m=document.querySelector("[data-days]"),f=document.querySelector("[data-hours]"),p=document.querySelector("[data-minutes]"),h=document.querySelector("[data-seconds]");let c=null,g=null;C(l,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(o){c=o[0],c&&c>new Date?a.disabled=!1:(a.disabled=!0,d.error({title:"Error",message:"Please choose a date in the future",position:"topCenter"}))}});function u(o){return String(o).padStart(2,"0")}function E(o){const t=Math.floor(o/864e5),i=Math.floor(o%864e5/36e5),b=Math.floor(o%864e5%36e5/6e4),v=Math.floor(o%864e5%36e5%6e4/1e3);return{days:t,hours:i,minutes:b,seconds:v}}function y(){const r=c-new Date;if(r<=0){clearInterval(g),m.textContent="00",f.textContent="00",p.textContent="00",h.textContent="00",a.disabled=!1,l.disabled=!1;return}const{days:n,hours:s,minutes:e,seconds:t}=E(r);m.textContent=u(n),f.textContent=u(s),p.textContent=u(e),h.textContent=u(t)}a.addEventListener("click",()=>{!c||c<=new Date||(a.disabled=!0,l.disabled=!0,y(),g=setInterval(y,1e3))});document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".form");o.addEventListener("submit",n=>{n.preventDefault();const s=parseInt(o.elements.delay.value,10),e=o.elements.state.value;r(s,e)});function r(n,s){new Promise((t,i)=>{setTimeout(()=>{s==="fulfilled"?t(`Promise fulfilled in ${n}ms`):i(`Promise rejected in ${n}ms`)},n)}).then(t=>{d.success({title:"Success",message:t,position:"topRight"})}).catch(t=>{d.error({title:"Error",message:t,position:"topRight"})})}});
//# sourceMappingURL=commonHelpers3.js.map
