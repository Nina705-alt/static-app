"use strict";
// All catalog values are illustrative. Replace with verified business data before sale.
const products = [
  { id:'chicken-crunch', name:'Chicken Crunch', type:'Dry food', stage:'Adult', protein:'Chicken', subtitle:'A sample dry-food recipe for the everyday lineup.', sizes:[{label:'2 kg',price:32},{label:'6 kg',price:72}], position:'15% center' },
  { id:'beef-bowls', name:'Beef Bowls', type:'Wet food', stage:'Senior', protein:'Beef', subtitle:'A sample wet-food option for their next bowl.', sizes:[{label:'6 × 400 g',price:26},{label:'12 × 400 g',price:48}], position:'65% center' },
  { id:'salmon-bites', name:'Salmon Bites', type:'Treats', stage:'Adult', protein:'Salmon', subtitle:'A sample little reward for your favorite sidekick.', sizes:[{label:'150 g',price:12},{label:'300 g',price:22}], position:'right center' },
  { id:'turkey-meals', name:'Turkey Mealtimes', type:'Fresh meals', stage:'Puppy', protein:'Turkey', subtitle:'A sample fresh-meal idea for the collection.', sizes:[{label:'4 × 300 g',price:38},{label:'8 × 300 g',price:70}], position:'center' }
];
const money = value => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value);
const storageKey = 'dogfood-demo-cart-v1';
const grid = document.querySelector('#product-grid');
const filters = document.querySelector('#filters');
const cartDialog = document.querySelector('#cart-dialog');
const infoDialog = document.querySelector('#info-dialog');
let cart = [];
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if(Array.isArray(saved)) cart = saved.filter(item => item && Number.isInteger(item.size) && Number.isInteger(item.qty) && item.qty > 0 && item.qty <= 99 && products.some(p => p.id === item.id && p.sizes[item.size]));
} catch { /* Browsing without storage still supports a session cart. */ }
function renderProducts(){
  const values = Object.fromEntries(new FormData(filters));
  const matches = products.filter(p => (!values.stage || p.stage===values.stage) && (!values.type || p.type===values.type) && (!values.protein || p.protein===values.protein) && (!values.price || p.sizes[0].price <= Number(values.price)));
  document.querySelector('#filter-count').textContent = `${matches.length} of ${products.length} sample products`;
  grid.innerHTML = matches.length ? matches.map(p => `<article><a class="product-photo" href="#product/${p.id}" aria-label="View ${p.name}"><img src="dog-products.png" width="1024" height="1024" alt="Illustrative packaging for ${p.name}; not actual product photography" loading="lazy" style="object-position:${p.position}"><span class="tag">${p.type.toUpperCase()} · SAMPLE</span></a><div class="product-info"><div class="meta"><span>${p.sizes[0].label}</span><span>From ${money(p.sizes[0].price)}</span></div><h3><a href="#product/${p.id}">${p.name}</a></h3><p>${p.stage} · ${p.protein}<br>Illustrative attributes</p><button data-add="${p.id}" aria-label="Add ${p.name} to demo cart">Add to Cart <span>+</span></button></div></article>`).join('') : '<div class="empty-state"><h3>No bowls in this mix.</h3><p>Try a different combination of sample filters.</p><button class="button" data-reset>Reset filters ↺</button></div>';
}
filters.addEventListener('change',renderProducts);
filters.addEventListener('submit',e=>e.preventDefault());
filters.addEventListener('reset',()=>setTimeout(renderProducts,0));
function feedingContent(p){
  const treat = p.type==='Treats';
  return `<h3>${p.name}</h3><p class="sample-note">${p.type} · ${p.stage} is a sample category, not verified suitability.</p><table><thead><tr><th scope="col">Information needed</th><th scope="col">Verified value</th></tr></thead><tbody><tr><td>Dog body weight (kg)</td><td>[Add weight bands in kg]</td></tr><tr><td>${treat?'Treat allowance (g/day)':'Daily portion (g/day)'}</td><td>[Add product-specific grams per day]</td></tr><tr><td>${treat?'Piece weight (g)':'Meals per day'}</td><td>[Add verified value]</td></tr><tr><td>Energy (kcal/100 g)</td><td>[Add verified calorie value]</td></tr></tbody></table><p class="guide-warning">Portions are not available for this sample product. [Add preparation, transition, storage, and life-stage instructions from the verified product label.]</p>`;
}
const guideSelect = document.querySelector('#guide-product');
guideSelect.innerHTML = products.map(p=>`<option value="${p.id}">${p.name} — ${p.type}</option>`).join('');
function renderGuide(){document.querySelector('#feeding-details').innerHTML=feedingContent(products.find(p=>p.id===guideSelect.value));}
guideSelect.addEventListener('change',renderGuide);
let toastTimer;
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2600);}
function saveCart(){try{localStorage.setItem(storageKey,JSON.stringify(cart));}catch{}renderCart();}
function add(id,size=0){const p=products.find(p=>p.id===id);if(!p?.sizes[size])return;const existing=cart.find(i=>i.id===id&&i.size===size);if(existing)existing.qty=Math.min(99,existing.qty+1);else cart.push({id,size,qty:1});saveCart();toast(`${p.name} added to your demo cart`);}
function renderCart(){
  document.querySelector('#bag-count').textContent=cart.reduce((sum,i)=>sum+i.qty,0);
  document.querySelector('#cart-items').innerHTML=cart.length?cart.map((item,index)=>{const p=products.find(p=>p.id===item.id);const size=p.sizes[item.size];return `<div class="cart-item"><div><h3>${p.name}</h3><p>${size.label} · ${money(size.price)} each</p><div class="quantity"><button data-qty="${index}" data-step="-1" aria-label="Decrease ${p.name} quantity">−</button><span aria-label="Quantity">${item.qty}</span><button data-qty="${index}" data-step="1" aria-label="Increase ${p.name} quantity">+</button><button class="remove" data-remove="${index}" aria-label="Remove ${p.name}">Remove</button></div></div><strong>${money(size.price*item.qty)}</strong></div>`;}).join(''):'<p>Your cart is waiting for a happy little mealtime.</p><a href="#shop" class="text-link" data-close>Explore the sample collection →</a>';
  document.querySelector('#cart-total').textContent=money(cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).sizes[item.size].price*item.qty,0));
  document.querySelector('#checkout').disabled=!cart.length;
  document.querySelector('#checkout-status').textContent='';
}
function productContent(p){return `<a class="breadcrumb" href="#shop">← Back to the shop</a><div class="product-layout"><div><div class="gallery-frame"><img id="gallery-image" class="gallery-main" src="dog-products.png" width="1024" height="1024" alt="${p.name} illustrative packaging concept" style="object-position:${p.position}"></div><div class="thumbs" role="group" aria-label="Product gallery"><button data-gallery="packaging" aria-pressed="true" aria-label="View packaging concept"><img src="dog-products.png" alt="Packaging concept"></button><button data-gallery="lifestyle" aria-pressed="false" aria-label="View dog lifestyle concept"><img src="dog-hero.png" alt="Dog lifestyle concept"></button></div><p class="gallery-note">AI concept photography. Packaging is illustrative and does not represent actual contents. [Replace with verified product photos.]</p></div><div class="product-detail"><p class="eyebrow">${p.type.toUpperCase()} · SAMPLE PRODUCT</p><h1>${p.name}</h1><p>${p.subtitle}</p><p class="price" id="product-price">${money(p.sizes[0].price)} <small>USD</small></p><p class="stock">Stock status: [Not supplied] · Ordering unavailable</p><p class="sample-note">Prices, sizes, and categories are illustrative. No nutritional suitability is implied.</p><label for="product-size">Pack size</label><select id="product-size">${p.sizes.map((s,i)=>`<option value="${i}">${s.label} — ${money(s.price)}</option>`).join('')}</select><div class="purchase-bar"><button class="button orange" id="product-add">Add to Cart <span>+</span></button></div><div class="facts"><div><strong>Intended life stage</strong>[To be verified]<br>Sample filter: ${p.stage}</div><div><strong>Protein source</strong>[To be verified]<br>Sample filter: ${p.protein}</div></div><details open><summary>Ingredients & recipe details</summary><p>[Add the full ingredient list in label order, confirmed protein sources, additives, and any relevant allergen or handling information.] No ingredients have been verified.</p></details><details><summary>Nutritional information</summary><dl class="nutrition"><dt>Protein (%)</dt><dd>[Verified value]</dd><dt>Fat (%)</dt><dd>[Verified value]</dd><dt>Fiber (%)</dt><dd>[Verified value]</dd><dt>Moisture (%)</dt><dd>[Verified value]</dd><dt>Energy (kcal/100 g)</dt><dd>[Verified value]</dd></dl><p>[Add the applicable labeling basis and complete nutritional panel.] No nutritional adequacy statement has been supplied.</p></details><details><summary>Feeding guidelines</summary><p>[Add ${p.name} portions in g/day by dog weight in kg, meals per day, intended life stages, preparation, and transition instructions.] No feeding portions can be recommended from this sample data.</p><a class="text-link" href="#guide" data-guide="${p.id}">Open this product’s feeding guide →</a></details><details><summary>Delivery & storage</summary><p>[Add delivery regions, estimated dates, costs, and product-specific storage instructions${p.type==='Fresh meals'?', including cold-chain handling and refrigeration':''}.] Shipping is not available in this preview.</p></details><details><summary>Subscriptions & returns</summary><p>Subscriptions are not supported yet. [Add eligible plans, frequencies, verified savings, billing terms, and management/cancellation portal.] [Add verified returns policy.]</p></details></div></div>`;}
function route(){
  const isProduct=location.hash.startsWith('#product/');const p=products.find(p=>p.id===location.hash.slice(9));const page=document.querySelector('#product-view');
  document.querySelector('#home-view').hidden=isProduct;page.hidden=!isProduct;
  if(isProduct){
    if(!p){page.innerHTML='<div class="not-found"><h1>That bowl isn’t here.</h1><p>This product link is no longer available.</p><a class="button" href="#shop">Back to shop →</a></div>';document.title='Product not found — [Brand Name]';}
    else{document.title=`${p.name} — [Brand Name]`;page.innerHTML=productContent(p);document.querySelector('#product-size').addEventListener('change',e=>{document.querySelector('#product-price').innerHTML=`${money(p.sizes[Number(e.target.value)].price)} <small>USD</small>`;});document.querySelector('#product-add').addEventListener('click',()=>add(p.id,Number(document.querySelector('#product-size').value)));}
    window.scrollTo({top:0,behavior:'instant'});
  }else{document.title='[Brand Name] — Happy bowls, happy tails';const target=document.getElementById(location.hash.slice(1)||'home');if(target&&location.hash)requestAnimationFrame(()=>target.scrollIntoView({behavior:'instant'}));}
}
const policyCopy={Contact:'[Add your customer service email, business address, and support hours.]','Shipping & returns':'[Add delivery regions, rates, timelines, fresh-food handling, return eligibility, refund process, and contact information.]',Privacy:'[Add your business privacy policy before collecting customer information.] This preview stores only your demo cart in this browser. Newsletter entries are not stored or sent. Fonts load from Google Fonts.',Terms:'[Add your website terms and terms of sale.] This concept store does not accept purchases or process payments.',Instagram:'[Add your official Instagram profile URL.]',Facebook:'[Add your official Facebook profile URL.]',Subscriptions:'Recurring deliveries are not supported in this preview. [Add your subscription provider, eligible products, delivery frequencies, verified savings, billing terms, and customer portal for managing, skipping, or canceling.] No subscription has been created.'};
document.addEventListener('click',e=>{
  const button=e.target.closest('button,a');if(!button)return;
  if(button.hasAttribute('data-add'))add(button.dataset.add);
  if(button.hasAttribute('data-reset'))filters.reset();
  if(button.hasAttribute('data-cart')){renderCart();cartDialog.showModal();}
  if(button.hasAttribute('data-close')){cartDialog.close();infoDialog.close();}
  if(button.hasAttribute('data-qty')){const item=cart[Number(button.dataset.qty)];if(item){item.qty=Math.min(99,item.qty+Number(button.dataset.step));cart=cart.filter(i=>i.qty>0);saveCart();}}
  if(button.hasAttribute('data-remove')){cart.splice(Number(button.dataset.remove),1);saveCart();}
  if(button.hasAttribute('data-gallery')){const image=document.querySelector('#gallery-image');const lifestyle=button.dataset.gallery==='lifestyle';image.src=lifestyle?'dog-hero.png':'dog-products.png';image.alt=lifestyle?'Illustrative dog lifestyle photograph':'Illustrative dog food packaging';document.querySelectorAll('[data-gallery]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}
  if(button.hasAttribute('data-guide')){guideSelect.value=button.dataset.guide;renderGuide();}
  if(button.hasAttribute('data-policy')){document.querySelector('#info-title').textContent=button.dataset.policy;document.querySelector('#info-copy').textContent=policyCopy[button.dataset.policy];infoDialog.showModal();}
});
document.querySelector('#checkout').addEventListener('click',()=>{document.querySelector('#checkout-status').textContent='Checkout is not connected. [Supply your preferred payment provider and configured checkout service, verified products, prices, stock, and shipping details.] No order has been placed and no payment has been taken.';});
document.querySelector('#newsletter-form').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#newsletter-status').textContent='Thanks for stopping by! This is a preview signup. Your email has not been saved or sent.';e.target.reset();});
for(const dialog of [cartDialog,infoDialog])dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelector('#year').textContent=new Date().getFullYear();
window.addEventListener('hashchange',route);renderProducts();renderGuide();renderCart();route();
