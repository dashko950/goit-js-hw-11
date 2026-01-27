import{a as F,S as v,i as h}from"./assets/vendor-MjawMu3A.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&t(d)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const b="50736279-c1f88b0db9e0d00ad72cdf14a",L="https://pixabay.com/api/";async function y(o,s=1){var t,e;const a={key:b,q:encodeURIComponent(o),image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:40};try{return console.log(`Searching Pixabay for: "${o}", page: ${s}`),(await F.get(L,{params:a})).data}catch(r){throw console.error("Error fetching images from Pixabay:",r.message),((t=r.response)==null?void 0:t.status)===429?new Error("Rate limit exceeded"):((e=r.response)==null?void 0:e.status)===400?new Error("Invalid API request"):new Error("Network error")}}function $(o){const s=document.querySelector(".gallery");if(!o||!o.hits||o.hits.length===0){s.innerHTML='<p class="no-results">No images found. Try another search.</p>';return}const a=o.hits.map(t=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${t.largeImageURL}">
            <div class="gallery-card">
              <img 
                class="gallery-image" 
                src="${t.webformatURL}" 
                alt="${t.tags}" 
                loading="lazy" 
              />
              <div class="image-info">
                <div class="info-item">
                  <span class="info-label">Likes</span>
                  <span class="info-value">${t.likes}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Views</span>
                  <span class="info-value">${t.views}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Comments</span>
                  <span class="info-value">${t.comments}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Downloads</span>
                  <span class="info-value">${t.downloads}</span>
                </div>
              </div>
            </div>
          </a>
        </li>
      `).join("");s.innerHTML=a,window.lightbox?window.lightbox.refresh():window.lightbox=new v(".gallery a",{captionsData:"alt",captionDelay:250})}function k(){const o=document.querySelector(".gallery");o&&(o.innerHTML=""),window.lightbox&&(window.lightbox.destroy(),window.lightbox=null)}function w(){const o=document.querySelector(".loader-container");o&&(o.style.display="flex")}function u(){const o=document.querySelector(".loader-container");o&&(o.style.display="none")}console.log("App loaded successfully!");const p=document.querySelector(".form"),c=document.querySelector("main"),f=document.querySelector(".gallery");document.querySelector(".loader-container");let n=1,m="",l=!1,g=0;c.style.display="none";p.addEventListener("submit",async o=>{if(o.preventDefault(),l){console.log("Already loading, please wait...");return}const s=p.elements["search-text"].value.trim();if(!s){S("Please enter a search term");return}m=s,n=1,l=!0,w(),k();try{console.log(`Starting search for: "${s}"`);const a=await y(s,n);if(console.log("Data received, total hits:",a.totalHits),u(),l=!1,c.style.display="block",c.classList.add("has-results"),!a||!a.hits||a.hits.length===0){console.log("No images found for query:",s),i("Sorry, there are no images matching your search query. Please try again!"),f.innerHTML='<p class="no-results">No images found. Try another search term.</p>';return}g=a.totalHits||a.hits.length,console.log(`Found ${g} total hits, showing ${a.hits.length} images`),$(a),setTimeout(()=>{c.scrollIntoView({behavior:"smooth",block:"start"})},100)}catch(a){console.error("Search error:",a),u(),l=!1,a.message.includes("Rate limit")?i("Rate limit exceeded. Please wait a minute before searching again."):a.message.includes("Network")?i("Network error. Please check your internet connection."):i("An error occurred while fetching images. Please try again later."),f.innerHTML='<p class="no-results">Error loading images. Please try again.</p>'}});window.addEventListener("scroll",()=>{if(l||!m)return;const{scrollTop:o,scrollHeight:s,clientHeight:a}=document.documentElement;o+a>=s-500&&x()});async function x(){if(l)return;if(n*40>=g){console.log("All images loaded");return}l=!0,w();try{n++,console.log(`Loading more images, page ${n}`);const s=await y(m,n);if(s.hits&&s.hits.length>0){const a=s.hits.map(e=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${e.largeImageURL}">
            <div class="gallery-card">
              <img 
                class="gallery-image" 
                src="${e.webformatURL}" 
                alt="${e.tags}" 
                loading="lazy" 
              />
              <div class="image-info">
                <div class="info-item">
                  <span class="info-label">Likes</span>
                  <span class="info-value">${e.likes}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Views</span>
                  <span class="info-value">${e.views}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Comments</span>
                  <span class="info-value">${e.comments}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Downloads</span>
                  <span class="info-value">${e.downloads}</span>
                </div>
              </div>
            </div>
          </a>
        </li>
      `).join("");f.insertAdjacentHTML("beforeend",a),window.lightbox&&window.lightbox.refresh();const t=document.querySelectorAll(".gallery-item");t.length>0&&t[t.length-1].scrollIntoView({behavior:"smooth",block:"end"})}}catch(s){console.error("Load more error:",s),i("Failed to load more images."),n--}finally{u(),l=!1}}function i(o){h.error({title:"",message:o,position:"topRight",timeout:5e3,backgroundColor:"#EF4040",theme:"dark",progressBarColor:"#D32F2F",iconColor:"#FFFFFF",titleColor:"#FFFFFF",messageColor:"#FFFFFF",close:!0,closeOnEscape:!0,closeOnClick:!0,displayMode:"replace"})}function S(o){h.warning({title:"",message:o,position:"topRight",timeout:3e3,backgroundColor:"#FFC107",theme:"dark",progressBarColor:"#FFA000",iconColor:"#FFFFFF",titleColor:"#FFFFFF",messageColor:"#FFFFFF",close:!1,closeOnEscape:!0,closeOnClick:!1})}
//# sourceMappingURL=index.js.map
