!function(){var e={buttons:document.querySelector(".js-buttons__wrapper"),clock:document.querySelector(".js-clock"),clockItem:document.querySelector(".js-clock-items")},t=(new Date).getTimezoneOffset()/60*-1;function o(e,t){return t[e%100>4&&e%100<20?2:[2,0,1,1,1,2][e%10<5?e%10:5]]}function s(e){return String(e).padStart(2,0)}var r={save:function(e,t){try{var o=JSON.stringify(t);localStorage.setItem(e,o)}catch(e){console.error("Set state error: ",e.message)}},load:function(e){try{var t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}},remove:function(e){try{localStorage.removeItem(e)}catch(e){console.log("Remove item error: ",e.message)}}},c=e.buttons,n=e.clock,l=e.clockItem,a=!1,i=!1,u=null;function d(e){u=setInterval((function(){var r,c=Date.now(),n=(r=c,{hours:Math.floor(r/1e3/60/60%24)+t,minutes:Math.floor(r/1e3/60)%60,seconds:Math.floor(r/1e3)%60}),l=n.hours,u=n.minutes,d=n.seconds,h=l>=12?"PM":"AM";l=i?l%12:l%24,e.querySelector(".js-clock__hours").textContent=s(l),e.querySelector(".js-clock__minutes").textContent=s(u),e.querySelector(".js-clock__seconds").textContent=s(d),e.querySelector(".js-clock__timezone").textContent=a?h:"",e.querySelector(".js-clock__hours").dataset.title=o(l,["година","години","годин"]),e.querySelector(".js-clock__minutes").dataset.title=o(u,["хвилина","хвилини","хвилин"]),e.querySelector(".js-clock__seconds").dataset.title=o(d,["секунда","секунди","секунд"])}),1e3)}function h(){setTimeout((function(){n.classList.remove("is-hidden"),c.querySelector(".js-show").classList.add("is-hidden"),c.querySelector(".js-hide").classList.remove("is-hidden"),c.querySelector(".js-change").classList.remove("is-hidden")}),1e3),d(l),r.save("show-clock",!0)}c.addEventListener("click",(function(e){if(e.target.matches(".js-hide"))return n.classList.add("is-hidden"),c.querySelector(".js-show").classList.remove("is-hidden"),c.querySelector(".js-hide").classList.add("is-hidden"),c.querySelector(".js-change").classList.add("is-hidden"),clearInterval(u),void r.save("show-clock",!1);if(e.target.matches(".js-change"))return void("AM/PM"===c.querySelector(".js-change").textContent.trim()?(a=!0,i=!0,c.querySelector(".js-change").textContent="format 24h"):(a=!1,i=!1,c.querySelector(".js-change").textContent="AM/PM"));h()})),r.load("show-clock")&&(c.querySelector(".js-show").classList.add("is-hidden"),h())}();
//# sourceMappingURL=index.69858dee.js.map