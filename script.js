/* ===== EDIT HERE ===== */
const CONFIG = {
  phone: "919049101210",      // WhatsApp number (country code, no +). All enquiries go here.
  googleReviewsUrl: "",       // add Google Business Profile link
  instagramUrl: ""            // add Instagram link
};
const REVIEWS = [];           // e.g. [{name:"Customer name", text:"Real review text"}]
// Gallery photos: put files in /images and change src. "Replace with real photo" shows if a file is missing.
const GALLERY = [
  {cat:"Birthday",sub:"Birthday celebration setup",src:"images/birthday decoration.webp",alt:"Birthday balloon decoration in Panchgani"},
  {cat:"Baby Shower",sub:"Baby shower balloon arrangement",src:"images/baby-shower.jpg",alt:"Baby shower balloon decoration"},
  {cat:"Engagement",sub:"Engagement celebration backdrop",src:"images/engagement1.jpg",alt:"Engagement balloon decoration"},
  {cat:"Haldi",sub:"Bright haldi event balloons",src:"images/haldi.jpg",alt:"Haldi balloon decoration in Mahabaleshwar"},
  {cat:"Anniversary",sub:"Romantic balloon garland",src:"images/anniversary.jpg",alt:"Anniversary balloon decoration"},
  {cat:"Room Decoration",sub:"Room surprise decoration",src:"images/room.jpg",alt:"Hotel room balloon decoration"},
  {cat:"Shop Opening",sub:"Grand opening entrance",src:"images/shop-opening.jpg",alt:"Shop opening balloon entrance"},
  {cat:"Custom Balloon Decoration",sub:"Your theme, your colours",src:"images/custom.jpg",alt:"Custom balloon theme decoration"}
];
/* ===================== */
const SERVICES=[
["🎂","Birthday Balloon Decoration","Celebrate their special day with a setup made just for them.",["Kids birthdays","first birthdays","surprises","arches","backdrops","themes","name decoration"]],
["🍼","Baby Shower Decoration","Soft, joyful details for a beautiful welcome to baby.",["Baby shower backdrops","garlands","photo areas","welcome baby decor"]],
["🌼","Haldi Balloon Decoration","A bright, joyful setting for rituals, laughter and photographs.",["Haldi backdrops","floral setups","seating decor","custom themes"]],
["💍","Engagement Decoration","Frame the beginning of your forever with an elegant backdrop.",["Ring ceremony backdrops","floral setups","couple photo areas"]],
["💗","Anniversary Decoration","Turn a meaningful milestone into an unforgettable surprise.",["Romantic decor","balloon & candle setups","room decor","photo corners"]],
["✂️","Shop Opening Decoration","Make your first impression feel festive, welcoming and memorable.",["Grand entrances","arches","ribbon-cutting areas","shop names"]],
["🏨","Hotel & Room Decoration","A thoughtful room reveal for birthdays, honeymoons and surprises.",["Birthday rooms","anniversary surprises","honeymoon","romantic setups"]],
["✨","Custom Event Decoration","Bring your colours, mood and ideas. We'll shape the celebration around them.",["Custom themes","photo booths","entrances","backdrops","colour palettes"]]
];
const SIMG=["birthday","baby-shower","haldi","engagement","anniversary","shop-opening","room","custom"];
const SCOL=[["#f58cae","#d9457a"],["#9ed8f0","#6aa8e0"],["#ffd36e","#f09a3a"],["#f7b6d0","#b8559a"],["#ff9db5","#c2306b"],["#c9a0ee","#7b3f98"],["#f6c9a0","#c9733a"],["#8fe0c8","#3aa88c"]];
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const wa=t=>`https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(t)}`;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

$$("[data-wa]").forEach(a=>a.href=wa(a.dataset.wa));

// Mobile menu
const nav=$("#nav"),bg=$(".burger");
bg.onclick=()=>{const o=nav.classList.toggle("open");bg.setAttribute("aria-expanded",o)};
$$("#nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");bg.setAttribute("aria-expanded",false)}));

// Services
$("#serviceGrid").innerHTML=SERVICES.map(([ic,t,d,l],i)=>`
<article class="scard"><div class="simg" style="--c1:${SCOL[i][0]};--c2:${SCOL[i][1]}"><img src="images/svc-${SIMG[i]}.jpg" alt="${esc(t)} in Panchgani and Mahabaleshwar" width="640" height="400" loading="lazy" onerror="this.remove()"><span class="fe">${ic}</span><small>Photo coming soon</small></div><div class="sb"><div class="top"><span class="n">0${i+1}</span><span class="ic">${ic}</span></div>
<h3>${esc(t)}</h3><p>${esc(d)}</p><p class="inc">${l.map(esc).join(", ")}</p>
<a class="btn pill wa" href="${wa(`Hello, I want a quote for ${t}. My event is in Panchgani/Mahabaleshwar.`)}" target="_blank" rel="noopener">💬 Get Quote →</a></div></article>`).join("");

// Gallery
const cats=["All",...new Set(GALLERY.map(g=>g.cat))];
$("#filters").innerHTML=cats.map((c,i)=>`<button class="${i?"":"on"}" data-c="${esc(c)}">${esc(c)}</button>`).join("");
const G=$("#galleryGrid");
function drawGallery(f="All"){
  G.classList.toggle("filtered",f!=="All");
  G.innerHTML=GALLERY.map((g,i)=>({g,i})).filter(({g})=>f==="All"||g.cat===f).map(({g,i})=>
  `<button class="tile t${i}" data-i="${i}" aria-label="Open photo: ${esc(g.alt)}"><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" onerror="this.remove()"><em class="rp">Replace with real photo</em><span class="cap"><b>${esc(g.cat)}</b><small>${esc(g.sub)}</small></span></button>`).join("");
}
drawGallery();
$("#filters").onclick=e=>{const b=e.target.closest("button");if(!b)return;$$("#filters button").forEach(x=>x.classList.remove("on"));b.classList.add("on");drawGallery(b.dataset.c)};
const lb=$("#lb");
G.onclick=e=>{const t=e.target.closest(".tile");if(!t)return;const g=GALLERY[t.dataset.i];
  const im=$("img",t);
  $("#lbc").innerHTML=im?`<img src="${esc(g.src)}" alt="${esc(g.alt)}">`:`<div class="ph2">${esc(g.cat)}<br>Your real photo will appear here</div>`;
  lb.showModal()};
$("#lbx").onclick=()=>lb.close();
lb.addEventListener("click",e=>{if(e.target===lb)lb.close()});

// Reviews, links
if(REVIEWS.length)$("#reviews").outerHTML=REVIEWS.map(r=>`<div class="ph"><p>${esc(r.text)}</p><b>${esc(r.name)}</b></div>`).join("");
const gl=$("#gLink");
if(CONFIG.googleReviewsUrl){gl.href=CONFIG.googleReviewsUrl;gl.target="_blank";gl.rel="noopener"}else gl.hidden=true;
if(CONFIG.instagramUrl){const i=$("#insta");i.href=CONFIG.instagramUrl;i.hidden=false;i.target="_blank";i.rel="noopener"}

// Enquiry form -> WhatsApp (message goes to the business number)
$("#enq").addEventListener("submit",e=>{
  e.preventDefault();
  const f=e.target,v=n=>f.elements[n].value.trim(),err=$("#err");
  if(!v("name")||!/^[0-9+ ()-]{10,16}$/.test(v("mobile"))||!v("loc")){
    err.textContent="Please enter your name, a valid mobile number and the event location.";return}
  err.textContent="";
  const url=wa(`Hello Shree Krishna Balloon Decorators, I would like a decoration quote.\n\nName: ${v("name")}\nMobile: ${v("mobile")}\nEvent Type: ${v("type")}\nEvent Date: ${v("date")||"Not decided"}\nEvent Location: ${v("loc")}\nRequirements: ${v("req")||"-"}\nMessage: ${v("msg")||"-"}`);
  $("#waCont").href=url;
  if(!window.open(url,"_blank","noopener"))location.href=url;
  $("#done").hidden=false;
});

// FAQ structured data from the visible FAQ
const faq={"@context":"https://schema.org","@type":"FAQPage",mainEntity:$$("#faqList details").map(d=>({"@type":"Question",name:$("summary",d).textContent,acceptedAnswer:{"@type":"Answer",text:$("p",d).textContent}}))};
const s=document.createElement("script");s.type="application/ld+json";s.textContent=JSON.stringify(faq);document.head.appendChild(s);

// Motion: header shadow, scroll reveal, active nav link
const hdr=$(".hdr");addEventListener("scroll",()=>hdr.classList.toggle("sc",scrollY>20),{passive:true});
document.documentElement.classList.add("js");
const rv=$$(".head,.scard,.feat>div,.whyimg,.why>div:last-child>*,.tile,.gcta,.steps li,.chips,.amap,.atext,.cta .wrap>*,.two>*,details,.strip .wrap>div");
rv.forEach((el,i)=>{el.classList.add("reveal");el.style.setProperty("--d",(i%4)*.07+"s")});
if("IntersectionObserver" in window){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});
 rv.forEach(el=>io.observe(el));
 const links=$$("#nav a[href^='#']");
 const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("act",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
 ["home","services","gallery","about","areas","contact"].forEach(id=>{const x=document.getElementById(id);x&&so.observe(x)});
}else rv.forEach(el=>el.classList.add("in"));
