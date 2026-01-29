import{a as S,S as q,i as m}from"./assets/vendor-DvfmeZXB.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();const $="50736279-c1f88b0db9e0d00ad72cdf14a",I="https://pixabay.com/api/";async function h(e,r=1){const s={key:$,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40};try{return(await S.get(I,{params:s})).data}catch(o){throw console.error("Error fetching images:",o.message),new Error(o.message)}}let a=null;function M(){a&&a.destroy(),a=new q(".gallery a",{captionsData:"alt",captionDelay:250})}function g(){a&&a.refresh()}function k(e){const r=document.querySelector(".gallery");if(!r){console.error("Gallery element not found");return}if(!Array.isArray(e)||e.length===0){r.innerHTML='<p class="no-results">No images found. Try another search.</p>';return}const s=e.map(o=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${o.largeImageURL}">
        <img 
          class="gallery-image" 
          src="${o.webformatURL}" 
          alt="${o.tags}" 
          loading="lazy" 
          width="360"
          height="200"
        />
        <div class="image-info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${o.likes}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${o.views}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${o.comments}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${o.downloads}</span>
          </div>
        </div>
      </a>
    </li>
  `).join("");r.innerHTML=s,M()}function A(e){const r=document.querySelector(".gallery");if(!r){console.error("Gallery element not found");return}if(!Array.isArray(e)||e.length===0)return;const s=e.map(o=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${o.largeImageURL}">
        <img 
          class="gallery-image" 
          src="${o.webformatURL}" 
          alt="${o.tags}" 
          loading="lazy" 
          width="360"
          height="200"
        />
        <div class="image-info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${o.likes}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${o.views}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${o.comments}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${o.downloads}</span>
          </div>
        </div>
      </a>
    </li>
  `).join("");r.insertAdjacentHTML("beforeend",s),g()}function C(){const e=document.querySelector(".gallery");e&&(e.innerHTML=""),a&&(a.destroy(),a=null)}function v(){const e=document.querySelector(".loader-container");e&&(e.style.display="flex")}function p(){const e=document.querySelector(".loader-container");e&&(e.style.display="none")}function E(){const e=document.querySelector(".load-more-container");e&&(e.style.display="flex")}function f(){const e=document.querySelector(".load-more-container");e&&(e.style.display="none")}const b=document.querySelector(".form"),F=document.querySelector(".load-more-btn");let i=1,L="",l=!1,d=0,c=0;f();b.addEventListener("submit",P);F.addEventListener("click",x);async function P(e){e.preventDefault();const s=b.elements["search-text"].value.trim();if(!s){H("Please enter a search term");return}if(!l){L=s,i=1,l=!0,v(),f(),C();try{const o=await h(s,i);if(p(),l=!1,!o.hits||o.hits.length===0){B();return}d=o.totalHits,c=o.hits.length,k(o.hits),c<d&&E()}catch(o){p(),l=!1,w("An error occurred while fetching images. Please try again."),console.error("Search error:",o)}}}async function x(){if(!(l||c>=d)){l=!0,v();try{i++;const e=await h(L,i);if(!e.hits||e.hits.length===0){f(),y("No more images to load.");return}A(e.hits),c+=e.hits.length,g(),R(),c>=d&&(f(),y("We're sorry, but you've reached the end of search results."))}catch(e){i--,w("Failed to load more images. Please try again."),console.error("Load more error:",e)}finally{p(),l=!1}}}function R(){const e=document.querySelectorAll(".gallery-item");if(e.length>0){const r=e[e.length-2];r&&r.scrollIntoView({behavior:"smooth",block:"start"})}}function B(){const e=document.querySelector(".gallery");e&&(e.innerHTML=`
      <p class="no-results">
        Sorry, there are no images matching your search query. Please try again!
      </p>
    `)}function w(e){m.error({title:"Error",message:e,position:"topRight",timeout:5e3,backgroundColor:"#EF4040",theme:"dark",progressBarColor:"#D32F2F"})}function H(e){m.warning({title:"Warning",message:e,position:"topRight",timeout:3e3,backgroundColor:"#FFC107",theme:"dark",progressBarColor:"#FFA000"})}function y(e){m.info({title:"Info",message:e,position:"topRight",timeout:3e3,backgroundColor:"#4e75ff",theme:"dark",progressBarColor:"#6c8cff"})}
//# sourceMappingURL=index.js.map
