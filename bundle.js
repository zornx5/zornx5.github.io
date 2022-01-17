window.NexT||(window.NexT={}),function(){const e={};let n={};const t=t=>{const o=document.querySelector(`.next-config[data-name="${t}"]`);if(!o)return;const c=(i=o.text,JSON.parse(i||"{}"));var i;"main"===t?Object.assign(e,c):n[t]=c};t("main"),window.CONFIG=new Proxy({},{get(o,c){let i;if(c in e?i=e[c]:(c in n||t(c),i=n[c]),
// For unset override and mixable existing
c in o||"object"!=typeof i||(
// Get ready to mix.
o[c]={}),c in o){const e=o[c];
// When mixable
return"object"==typeof e&&"object"==typeof i?new Proxy({...i,...e},{set:(n,t,o)=>(n[t]=o,e[t]=o,!0)}):e}
// Only when not mixable and override hasn't been set.
return i}}),document.addEventListener("pjax:success",()=>{n={}})}();;
// Fireworks
window.addEventListener('load', () => {
  const canvasEl = document.createElement("canvas");
  canvasEl.classList.add("fireworks");
  document.body.append(canvasEl);
  const ctx = canvasEl.getContext("2d");
  const numberOfParticules = 30;
  let pointerX = 0;
  let pointerY = 0;
  const tap = "mousedown";
  const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];

  const setCanvasSize = debounce(() => {
    canvasEl.width = 2 * window.innerWidth,
    canvasEl.height = 2 * window.innerHeight,
    canvasEl.style.width = window.innerWidth + "px",
    canvasEl.style.height = window.innerHeight + "px",
    canvasEl.getContext("2d").scale(2, 2);
  }, 500);

  const render = anime({
    duration: 1 / 0,
    update: function() {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    }
  });

  document.addEventListener(tap, e => {
    "sidebar" !== e.target.id && "toggle-sidebar" !== e.target.id && "A" !== e.target.nodeName && "IMG" !== e.target.nodeName && (render.play(), updateCoords(e), animateParticules(pointerX, pointerY));
  }, !1),
    setCanvasSize(),
    window.addEventListener("resize", setCanvasSize, !1);

  function updateCoords(e) {
    pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left,
    pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top;
  }

  function setParticuleDirection(e) {
    const t = anime.random(0, 360) * Math.PI / 180, a = anime.random(50, 180), n = [-1, 1][anime.random(0, 1)] * a;
    return {
      x: e.x + n * Math.cos(t),
      y: e.y + n * Math.sin(t)
    };
  }

  function createParticule(e, t) {
    const a = {};
    return a.x = e,
      a.y = t,
      a.color = colors[anime.random(0, colors.length - 1)],
      a.radius = anime.random(16, 32),
      a.endPos = setParticuleDirection(a),
      a.draw = function() {
        ctx.beginPath(),
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
        ctx.fillStyle = a.color,
        ctx.fill()
      },
      a;
  }

  function createCircle(e, t) {
    const a = {};
    return a.x = e,
      a.y = t,
      a.color = "#F00",
      a.radius = .1,
      a.alpha = .5,
      a.lineWidth = 6,
      a.draw = function() {
        ctx.globalAlpha = a.alpha,
        ctx.beginPath(),
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
        ctx.lineWidth = a.lineWidth,
        ctx.strokeStyle = a.color,
        ctx.stroke(),
        ctx.globalAlpha = 1
      },
      a;
  }

  function renderParticule(e) {
    for (let t = 0; t < e.animatables.length; t++) {
      e.animatables[t].target.draw();
    }
  }

  function animateParticules(e, t) {
    for (var a = createCircle(e, t), n = [], i = 0; i < numberOfParticules; i++) {
      n.push(createParticule(e, t));
    }
    anime.timeline().add({
      targets: n,
      x: function(e) {
        return e.endPos.x;
      },
      y: function(e) {
        return e.endPos.y;
      },
      radius: .1,
      duration: anime.random(1200, 1800),
      easing: "easeOutExpo",
      update: renderParticule
    }).add({
      targets: a,
      radius: anime.random(80, 160),
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: "linear",
        duration: anime.random(600, 800)
      },
      duration: anime.random(1200, 1800),
      easing: "easeOutExpo",
      update: renderParticule
    }, 0);
  }

  function debounce(fn, delay) {
    let timer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay);
    };
  }
});
;
/* global CONFIG */
window.addEventListener("tabs:register",()=>{let{activeClass:t}=CONFIG.comments;if(CONFIG.comments.storage&&(t=localStorage.getItem("comments_active")||t),t){const e=document.querySelector(`a[href="#comment-${t}"]`);e&&e.click()}}),CONFIG.comments.storage&&window.addEventListener("tabs:click",t=>{if(!t.target.matches(".tabs-comment .tab-content .tab-pane"))return;const e=t.target.classList[1];localStorage.setItem("comments_active",e)});;
/* global NexT, CONFIG */
HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},function(){const e=()=>document.dispatchEvent(new Event("page:loaded",{bubbles:!0}));"loading"===document.readyState?document.addEventListener("readystatechange",e,{once:!0}):e(),document.addEventListener("pjax:success",e)}(),NexT.utils={registerExtURL:function(){document.querySelectorAll("span.exturl").forEach(e=>{const t=document.createElement("a");
// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
t.href=decodeURIComponent(atob(e.dataset.url).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.title=e.title,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)})},
/**
   * One-click copy code support.
   */
registerCopyCode:function(){let e=document.querySelectorAll("figure.highlight");0===e.length&&(e=document.querySelectorAll("pre:not(.mermaid)")),e.forEach(e=>{if(e.querySelectorAll(".code .line span").forEach(e=>{e.classList.forEach(t=>{e.classList.replace(t,"hljs-"+t)})}),!CONFIG.copycode)return;e.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');const t=e.querySelector(".copy-btn");t.addEventListener("click",()=>{const n=(e.querySelector(".code")||e.querySelector("code")).innerText;if(navigator.clipboard)
// https://caniuse.com/mdn-api_clipboard_writetext
navigator.clipboard.writeText(n).then(()=>{t.querySelector("i").className="fa fa-check-circle fa-fw"},()=>{t.querySelector("i").className="fa fa-times-circle fa-fw"});else{const e=document.createElement("textarea");e.style.top=window.scrollY+"px",// Prevent page scrolling
e.style.position="absolute",e.style.opacity="0",e.readOnly=!0,e.value=n,document.body.append(e),e.select(),e.setSelectionRange(0,n.length),e.readOnly=!1;const o=document.execCommand("copy");t.querySelector("i").className=o?"fa fa-check-circle fa-fw":"fa fa-times-circle fa-fw",e.blur(),// For iOS
t.blur(),document.body.removeChild(e)}}),e.addEventListener("mouseleave",()=>{setTimeout(()=>{t.querySelector("i").className="fa fa-copy fa-fw"},300)})})},wrapTableWithBox:function(){document.querySelectorAll("table").forEach(e=>{const t=document.createElement("div");t.className="table-container",e.wrap(t)})},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach(e=>{if(["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some(t=>e.src.includes(t))&&!e.parentNode.matches(".video-container")){const t=document.createElement("div");t.className="video-container",e.wrap(t);const n=Number(e.width),o=Number(e.height);n&&o&&(t.style.paddingTop=o/n*100+"%")}})},registerScrollPercent:function(){const e=document.querySelector(".back-to-top"),t=document.querySelector(".reading-progress-bar");
// For init back to top in sidebar if page was scrolled after page refresh.
window.addEventListener("scroll",()=>{if(e||t){const n=document.body.scrollHeight-window.innerHeight,o=n>0?Math.min(100*window.scrollY/n,100):0;e&&(e.classList.toggle("back-to-top-on",Math.round(o)>=5),e.querySelector("span").innerText=Math.round(o)+"%"),t&&t.style.setProperty("--progress",o.toFixed(2)+"%")}if(!Array.isArray(NexT.utils.sections))return;let n=NexT.utils.sections.findIndex(e=>e&&e.getBoundingClientRect().top>10);-1===n?n=NexT.utils.sections.length-1:n>0&&n--,this.activateNavByIndex(n)},{passive:!0}),e&&e.addEventListener("click",()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})})},
/**
   * Tabs tag listener (without twitter bootstrap).
   */
registerTabsTag:function(){
// Binding `nav-tabs` & `tab-content` by real time permalink changing.
document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach(e=>{e.addEventListener("click",t=>{
// Prevent selected tab to select again.
if(t.preventDefault(),e.classList.contains("active"))return;const n=e.parentNode;
// Add & Remove active class on `nav-tabs` & `tab-content`.
[...n.children].forEach(t=>{t.classList.toggle("active",t===e)});
// https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
const o=document.getElementById(e.querySelector("a").getAttribute("href").replace("#",""));if([...o.parentNode.children].forEach(e=>{e.classList.toggle("active",e===o)}),
// Trigger event
o.dispatchEvent(new Event("tabs:click",{bubbles:!0})),!CONFIG.stickytabs)return;const r=n.parentNode.getBoundingClientRect().top+window.scrollY+10;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:r})})}),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){
// Get responsive height passed from iframe.
window.addEventListener("message",({data:e})=>{if("string"==typeof e&&e.includes("ciu_embed")){const t=e.split(":")[1],n=e.split(":")[2];document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(n,10)+5+"px"}},!1)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item a[href]").forEach(e=>{const t=e.pathname===location.pathname||e.pathname===location.pathname.replace("index.html",""),n=!CONFIG.root.startsWith(e.pathname)&&location.pathname.startsWith(e.pathname);e.classList.toggle("menu-item-active",e.hostname===location.hostname&&(t||n))})},registerLangSelect:function(){document.querySelectorAll(".lang-select").forEach(e=>{e.value=CONFIG.page.lang,e.addEventListener("change",()=>{const t=e.options[e.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach(e=>{e.innerText=t.text}),
// Disable Pjax to force refresh translation of menu item
window.location.href=t.dataset.href})})},registerSidebarTOC:function(){this.sections=[...document.querySelectorAll(".post-toc li a.nav-link")].map(e=>{const t=document.getElementById(decodeURI(e.getAttribute("href")).replace("#",""));
// TOC item animation navigate.
return e.addEventListener("click",n=>{n.preventDefault();const o=t.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:o,complete:()=>{history.pushState(null,document.title,e.href)}})}),t})},registerPostReward:function(){const e=document.querySelector(".reward-container button");e&&e.addEventListener("click",()=>{document.querySelector(".post-reward").classList.toggle("active")})},activateNavByIndex:function(e){const t=document.querySelectorAll(".post-toc li a.nav-link")[e];if(!t||t.classList.contains("active-current"))return;document.querySelectorAll(".post-toc .active").forEach(e=>{e.classList.remove("active","active-current")}),t.classList.add("active","active-current");let n=t.parentNode;for(;!n.matches(".post-toc");)n.matches("li")&&n.classList.add("active"),n=n.parentNode;
// Scrolling to center active TOC element if TOC content is taller then viewport.
const o=document.querySelector(".sidebar-panel-container");o.parentNode.classList.contains("sidebar-toc-active")&&window.anime({targets:o,duration:200,easing:"linear",scrollTop:o.scrollTop-o.offsetHeight/2+t.getBoundingClientRect().top-o.getBoundingClientRect().top})},updateSidebarPosition:function(){if(window.innerWidth<992||"Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)return;
// Expand sidebar on post detail page by default, when post has a toc.
const e=document.querySelector(".post-toc");let t=CONFIG.page.sidebar;"boolean"!=typeof t&&(
// There's no definition sidebar in the page front-matter.
t="always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&e),t&&window.dispatchEvent(new Event("sidebar:show"))},activateSidebarPanel:function(e){const t=document.querySelector(".sidebar-inner"),n=document.querySelector(".sidebar-panel-container"),o=["sidebar-toc-active","sidebar-overview-active"];t.classList.contains(o[e])||window.anime({duration:200,targets:n,easing:"linear",opacity:0,translateY:[0,-20],complete:()=>{
// Prevent adding TOC to Overview if Overview was selected when close & open sidebar.
t.classList.replace(o[1-e],o[e]),window.anime({duration:200,targets:n,easing:"linear",opacity:[0,1],translateY:[-20,0]})}})},getScript:function(e,t={},n){if("function"==typeof t)return this.getScript(e,{condition:n}).then(t);const{condition:o=!1,attributes:{id:r="",async:a=!1,defer:c=!1,crossOrigin:i="",dataset:s={},...l}={},parentNode:d=null}=t;return new Promise((t,n)=>{if(o)t();else{const o=document.createElement("script");if(r&&(o.id=r),i&&(o.crossOrigin=i),o.async=a,o.defer=c,Object.assign(o.dataset,s),Object.entries(l).forEach(([e,t])=>{o.setAttribute(e,String(t))}),o.onload=t,o.onerror=n,"object"==typeof e){const{url:t,integrity:n}=e;o.src=t,n&&(o.integrity=n,o.crossOrigin="anonymous")}else o.src=e;(d||document.head).appendChild(o)}})},loadComments:function(e,t){return t?this.loadComments(e).then(t):new Promise(t=>{const n=document.querySelector(e);if(!CONFIG.comments.lazyload||!n)return void t();new IntersectionObserver((e,n)=>{e[0].isIntersecting&&(t(),n.disconnect())}).observe(n)})}};;
/* global NexT, CONFIG */
NexT.motion={},NexT.motion.integrator={queue:[],init:function(){return this.queue=[],this},add:function(e){const t=e();return CONFIG.motion.async?this.queue.push(t):this.queue=this.queue.concat(t),this},bootstrap:function(){CONFIG.motion.async||(this.queue=[this.queue]),this.queue.forEach(e=>{const t=window.anime.timeline({duration:200,easing:"linear"});e.forEach(e=>{e.deltaT?t.add(e,e.deltaT):t.add(e)})})}},NexT.motion.middleWares={header:function(){const e=[];function t(t,o=!1){e.push({targets:t,opacity:1,top:0,deltaT:o?"-=200":"-=0"})}var o;return t(".header"),"Mist"===CONFIG.scheme&&(o=".logo-line",e.push({targets:o,scaleX:[0,1],duration:500,deltaT:"-=200"})),"Muse"===CONFIG.scheme&&t(".custom-logo-image"),t(".site-title"),t(".site-brand-container .toggle",!0),t(".site-subtitle"),("Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)&&t(".custom-logo-image"),document.querySelectorAll(".menu-item").forEach(t=>{e.push({targets:t,complete:()=>t.classList.add("animated","fadeInDown"),deltaT:"-=200"})}),e},subMenu:function(){const e=document.querySelectorAll(".sub-menu .menu-item");return e.length>0&&e.forEach(e=>{e.classList.add("animated")}),[]},postList:function(){const e=[],{post_block:t,post_header:o,post_body:n,coll_header:s}=CONFIG.motion.transition;function i(t,o){t&&document.querySelectorAll(o).forEach(o=>{e.push({targets:o,complete:()=>o.classList.add("animated",t),deltaT:"-=100"})})}return i(t,".post-block, .pagination, .comments"),i(s,".collection-header"),i(o,".post-header"),i(n,".post-body"),e},sidebar:function(){const e=document.querySelector(".sidebar"),t=CONFIG.motion.transition.sidebar;
// Only for Pisces | Gemini.
return!t||"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme?[]:[{targets:e,complete:()=>e.classList.add("animated",t)}]},footer:function(){return[{targets:document.querySelector(".footer"),opacity:1}]}};;
/* global NexT, CONFIG */
NexT.boot={},NexT.boot.registerEvents=function(){NexT.utils.registerScrollPercent(),NexT.utils.registerCanIUseTag(),
// Mobile top menu bar.
document.querySelector(".site-nav-toggle .toggle").addEventListener("click",e=>{e.currentTarget.classList.toggle("toggle-close");const t=document.querySelector(".site-nav");t&&(t.style.setProperty("--scroll-height",t.scrollHeight+"px"),document.body.classList.toggle("site-nav-on"))}),document.querySelectorAll(".sidebar-nav li").forEach((e,t)=>{e.addEventListener("click",()=>{NexT.utils.activateSidebarPanel(t)})}),window.addEventListener("hashchange",()=>{const e=location.hash;if(""!==e&&!e.match(/%\S{2}/)){const t=document.querySelector(`.tabs ul.nav-tabs li a[href="${e}"]`);t&&t.click()}})},NexT.boot.refresh=function(){
/**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'scripts/helpers/next-config.js' file.
   */
CONFIG.prism&&window.Prism.highlightAll(),CONFIG.mediumzoom&&window.mediumZoom(".post-body :not(a) > img, .post-body > img",{background:"var(--content-bg-color)"}),CONFIG.lazyload&&window.lozad(".post-body img").observe(),CONFIG.pangu&&window.pangu.spacingPage(),CONFIG.exturl&&NexT.utils.registerExtURL(),NexT.utils.registerCopyCode(),NexT.utils.registerTabsTag(),NexT.utils.registerActiveMenuItem(),NexT.utils.registerLangSelect(),NexT.utils.registerSidebarTOC(),NexT.utils.registerPostReward(),NexT.utils.wrapTableWithBox(),NexT.utils.registerVideoIframe()},NexT.boot.motion=function(){
// Define Motion Sequence & Bootstrap Motion.
CONFIG.motion.enable&&NexT.motion.integrator.add(NexT.motion.middleWares.header).add(NexT.motion.middleWares.postList).add(NexT.motion.middleWares.sidebar).add(NexT.motion.middleWares.footer).bootstrap(),NexT.utils.updateSidebarPosition()},document.addEventListener("DOMContentLoaded",()=>{NexT.boot.registerEvents(),NexT.boot.refresh(),NexT.boot.motion()});;
/* global CONFIG */
document.addEventListener("DOMContentLoaded",()=>{"use strict";const e=()=>{localStorage.setItem("bookmark"+location.pathname,window.scrollY)},t=()=>{let e=localStorage.getItem("bookmark"+location.pathname);e=parseInt(e,10),
// If the page opens with a specific hash, just jump out
isNaN(e)||""!==location.hash||
// Auto scroll to the position
window.anime({targets:document.scrollingElement,duration:200,easing:"linear",scrollTop:e})};!function(o){
// Create a link element
const n=document.querySelector(".book-mark-link");
// Scroll event
window.addEventListener("scroll",()=>n.classList.toggle("book-mark-link-fixed",0===window.scrollY),{passive:!0}),
// Register beforeunload event when the trigger is auto
"auto"===o&&(
// Register beforeunload event
window.addEventListener("beforeunload",e),document.addEventListener("pjax:send",e)),
// Save the position by clicking the icon
n.addEventListener("click",()=>{e(),window.anime({targets:n,duration:200,easing:"linear",top:-30,complete:()=>{setTimeout(()=>{n.style.top=""},400)}})}),t(),document.addEventListener("pjax:success",t)}(CONFIG.bookmark.save)});;
/* global NexT, CONFIG, Pjax */
const pjax=new Pjax({selectors:["head title",'script[type="application/json"]',".main-inner",".post-toc-wrap",".languages",".pjax"],analytics:!1,cacheBust:!1,scrollTo:!CONFIG.bookmark.enable});document.addEventListener("pjax:success",()=>{if(pjax.executeScripts(document.querySelectorAll("script[data-pjax]")),NexT.boot.refresh(),
// Define Motion Sequence & Bootstrap Motion.
CONFIG.motion.enable&&NexT.motion.integrator.init().add(NexT.motion.middleWares.subMenu).add(NexT.motion.middleWares.postList).bootstrap(),"remove"!==CONFIG.sidebar.display){const e=document.querySelector(".post-toc");document.querySelector(".sidebar-inner").classList.toggle("sidebar-nav-active",e),NexT.utils.activateSidebarPanel(e?0:1),NexT.utils.updateSidebarPosition()}});;
/* global CONFIG, pjax, LocalSearch */
document.addEventListener("DOMContentLoaded",()=>{if(!CONFIG.path)
// Search DB path
return void console.warn("`hexo-generator-searchdb` plugin is not installed!");const e=new LocalSearch({path:CONFIG.path,top_n_per_article:CONFIG.localsearch.top_n_per_article,unescape:CONFIG.localsearch.unescape}),t=document.querySelector(".search-input"),s=()=>{if(!e.isfetched)return;const s=t.value.trim().toLowerCase(),c=s.split(/[-\s]+/),r=document.querySelector(".search-result-container");let n=[];if(s.length>0&&(
// Perform local searching
n=e.getResultItems(c)),1===c.length&&""===c[0])r.classList.add("no-result"),r.innerHTML='<div class="search-result-icon"><i class="fa fa-search fa-5x"></i></div>';else if(0===n.length)r.classList.add("no-result"),r.innerHTML='<div class="search-result-icon"><i class="far fa-frown fa-5x"></i></div>';else{n.sort((e,t)=>e.includedCount!==t.includedCount?t.includedCount-e.includedCount:e.hitCount!==t.hitCount?t.hitCount-e.hitCount:t.id-e.id);const e=CONFIG.i18n.hits.replace(/\$\{hits}/,n.length);r.classList.remove("no-result"),r.innerHTML=`<div class="search-stats">${e}</div>\n        <hr>\n        <ul class="search-result-list">${n.map(e=>e.item).join("")}</ul>`,"object"==typeof pjax&&pjax.refresh(r)}};e.highlightSearchWords(document.querySelector(".post-body")),CONFIG.localsearch.preload&&e.fetchData(),"auto"===CONFIG.localsearch.trigger?t.addEventListener("input",s):(document.querySelector(".search-icon").addEventListener("click",s),t.addEventListener("keypress",e=>{"Enter"===e.key&&s()})),window.addEventListener("search:loaded",s),
// Handle and trigger popup window
document.querySelectorAll(".popup-trigger").forEach(s=>{s.addEventListener("click",()=>{document.body.classList.add("search-active"),
// Wait for search-popup animation to complete
setTimeout(()=>t.focus(),500),e.isfetched||e.fetchData()})});
// Monitor main search box
const c=()=>{document.body.classList.remove("search-active")};document.querySelector(".search-pop-overlay").addEventListener("click",e=>{e.target===document.querySelector(".search-pop-overlay")&&c()}),document.querySelector(".popup-btn-close").addEventListener("click",c),document.addEventListener("pjax:success",()=>{e.highlightSearchWords(document.querySelector(".post-body")),c()}),window.addEventListener("keyup",e=>{"Escape"===e.key&&c()})});;
/* global NexT, CONFIG, PDFObject */
document.addEventListener("page:loaded",()=>{document.querySelectorAll(".pdf-container").length&&NexT.utils.getScript(CONFIG.pdf.object_url,{condition:window.PDFObject}).then(()=>{document.querySelectorAll(".pdf-container").forEach(e=>{PDFObject.embed(e.dataset.target,e,{pdfOpenParams:{navpanes:0,toolbar:0,statusbar:0,pagemode:"thumbs",view:"FitH"},PDFJS_URL:CONFIG.pdf.url,height:e.dataset.height})})})});;
document.addEventListener("page:loaded",()=>{
/**
   * Wrap images with fancybox.
   */
document.querySelectorAll(".post-body :not(a) > img, .post-body > img").forEach(t=>{const a=$(t),e=a.attr("data-src")||a.attr("src"),r=a.wrap(`<a class="fancybox fancybox.image" href="${e}" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`).parent("a");a.is(".post-gallery img")?r.attr("data-fancybox","gallery").attr("rel","gallery"):a.is(".group-picture img")?r.attr("data-fancybox","group").attr("rel","group"):r.attr("data-fancybox","default").attr("rel","default");const o=a.attr("title")||a.attr("alt");o&&(
// Do not append image-caption if pandoc has already created a figcaption
r.next("figcaption").length||r.append(`<p class="image-caption">${o}</p>`),
// Make sure img title tag will show correctly in fancybox
r.attr("title",o).attr("data-caption",o))}),$.fancybox.defaults.hash=!1,$(".fancybox").fancybox({loop:!0,helpers:{overlay:{locked:!1}}})});;
/* global Pace */
Pace.options.restartOnPushState=!1,document.addEventListener("pjax:send",()=>{Pace.restart()});;
/* global CONFIG, quicklink */
!function(){if("string"==typeof CONFIG.quicklink.ignores){const i=`[${CONFIG.quicklink.ignores}]`;CONFIG.quicklink.ignores=JSON.parse(i)}let i=null;const n=()=>{if(i&&i(),!CONFIG.quicklink.enable)return;let n=CONFIG.quicklink.ignores||[];Array.isArray(n)||(n=[n]),i=quicklink.listen({timeout:CONFIG.quicklink.timeout,priority:CONFIG.quicklink.priority,ignores:[i=>i.includes("#"),i=>i===CONFIG.quicklink.url,...n]})};CONFIG.quicklink.delay?(window.addEventListener("load",n),document.addEventListener("pjax:success",n)):document.addEventListener("page:loaded",n)}();