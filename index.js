import{a as S,S as q,i as m}from"./assets/vendor-DvfmeZXB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();const $="50736279-c1f88b0db9e0d00ad72cdf14a",M="https://pixabay.com/api/";async function v(e,t=1){const s={key:$,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:40};try{return(await S.get(M,{params:s})).data}catch(r){throw console.error("Error fetching images:",r.message),new Error(r.message)}}let n=null;function I(){n&&n.destroy(),n=new q(".gallery a",{captionsData:"alt",captionDelay:250})}function b(){n&&n.refresh()}function P(e){const t=document.querySelector(".gallery");if(!t){console.error("Gallery element not found");return}if(!Array.isArray(e)||e.length===0){t.innerHTML=`
      <p class="no-results">
        Sorry, there are no images matching your search query. Please try again!
      </p>
    `;return}const s=e.map(r=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${r.largeImageURL}">
        <img 
          class="gallery-image" 
          src="${r.webformatURL}" 
          alt="${r.tags}" 
          loading="lazy" 
          width="360"
          height="200"
        />
        <div class="image-info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${r.likes}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${r.views}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${r.comments}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${r.downloads}</span>
          </div>
        </div>
      </a>
    </li>
  `).join("");t.innerHTML=s,I()}function k(e){const t=document.querySelector(".gallery");if(!t){console.error("Gallery element not found");return}if(!Array.isArray(e)||e.length===0)return;const s=e.map(r=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${r.largeImageURL}">
        <img 
          class="gallery-image" 
          src="${r.webformatURL}" 
          alt="${r.tags}" 
          loading="lazy" 
          width="360"
          height="200"
        />
        <div class="image-info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${r.likes}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${r.views}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${r.comments}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${r.downloads}</span>
          </div>
        </div>
      </a>
    </li>
  `).join("");t.insertAdjacentHTML("beforeend",s),b()}function E(){const e=document.querySelector(".gallery");e&&(e.innerHTML=""),n&&(n.destroy(),n=null)}function w(){const e=document.querySelector(".loader-container");e&&(e.style.display="flex")}function y(){const e=document.querySelector(".loader-container");e&&(e.style.display="none")}function A(){const e=document.querySelector(".load-more-container");e&&(e.style.display="flex")}function u(){const e=document.querySelector(".load-more-container");e&&(e.style.display="none")}function C(){const e=document.querySelector(".gallery");e&&(e.innerHTML=`
      <p class="no-results">
        Sorry, there are no images matching your search query. Please try again!
      </p>
    `)}function x(e){const t=document.querySelector(".gallery");t&&(t.innerHTML=`<p class="no-results">${e}</p>`)}const g=document.querySelector(".form"),F=document.querySelector(".load-more-btn");let i=1,L="",l=!1,f=0,c=0;u();g.addEventListener("submit",async e=>{e.preventDefault();const s=g.elements["search-text"].value.trim();if(!s){H("Please enter a search term");return}if(!l){L=s,i=1,l=!0,w(),u(),E();try{const r=await v(s,i);if(y(),l=!1,!r.hits||r.hits.length===0){p("Sorry, there are no images matching your search query. Please try again!"),C();return}f=r.totalHits,c=r.hits.length,P(r.hits),c<f&&A()}catch{y(),l=!1,p("An error occurred while fetching images. Please try again."),x("Error loading images. Please try again.")}}});F.addEventListener("click",async()=>{if(!(l||c>=f)){l=!0,w();try{i++;const e=await v(L,i);if(!e.hits||e.hits.length===0){u(),h("No more images to load.");return}k(e.hits),c+=e.hits.length,b();const t=document.querySelectorAll(".gallery-item");t.length>0&&t[t.length-1].scrollIntoView({behavior:"smooth",block:"start"}),c>=f&&(u(),h("We're sorry, but you've reached the end of search results."))}catch{i--,p("Failed to load more images. Please try again.")}finally{y(),l=!1}}});function p(e){m.error({title:"Error",message:e,position:"topRight",timeout:5e3,backgroundColor:"#EF4040",theme:"dark",progressBarColor:"#D32F2F"})}function H(e){m.warning({title:"Warning",message:e,position:"topRight",timeout:3e3,backgroundColor:"#FFC107",theme:"dark",progressBarColor:"#FFA000"})}function h(e){m.info({title:"Info",message:e,position:"topRight",timeout:3e3,backgroundColor:"#4e75ff",theme:"dark",progressBarColor:"#6c8cff"})}
//# sourceMappingURL=index.js.map
