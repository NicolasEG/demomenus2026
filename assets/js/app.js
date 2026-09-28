'use strict';
const money=n=>'$'+n.toLocaleString('es-AR');
const menu=document.querySelector('#menu');
const nav=document.querySelector('.categories');
const dialog=document.querySelector('#cart-dialog');
let currentCategory='pizzas',cart=[],toastTimer;
const selections={};
// No fetch or module imports: the menu also works directly from index.html.
function renderCategories(){nav.innerHTML=CATEGORIES.map(c=>`<button class="category" data-category="${c.id}" aria-pressed="${c.id===currentCategory}">${c.short}<small>${PRODUCTS.filter(p=>p.category===c.id).length}</small></button>`).join('');}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('in-view',e.isIntersecting)),{root:menu,threshold:.2});
function renderMenu(){
 observer.disconnect();
 const category=CATEGORIES.find(c=>c.id===currentCategory),items=PRODUCTS.filter(p=>p.category===currentCategory);
 menu.innerHTML=items.map((p,i)=>{
 const size=selections[p.id]||0;
 return `<article class="product" data-product="${p.id}" aria-labelledby="title-${p.id}"><img src="assets/img/${p.id}.png" alt="Fotografía ilustrativa de ${p.name}" ${i>1?'loading="lazy"':'fetchpriority="high"'} width="1024" height="1024"><div class="card-top"><span>${category.name}</span><span class="ordinal">${String(i+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}</span></div><div class="product-info"><span class="eyebrow">${category.id==='pizzas'?'Una porción de felicidad':category.id==='faina'?'El acompañamiento perfecto':'Tu próximo antojo'}</span><h2 id="title-${p.id}">${p.name}</h2><p class="description">${p.description}</p>${p.prices.length>1?`<div class="sizes" role="group" aria-label="Tamaño de ${p.name}">${p.prices.map((price,j)=>`<button class="size" data-size="${j}" aria-pressed="${size===j}"><span>${PIZZA_SIZES[j]}</span><strong>${money(price)}</strong></button>`).join('')}</div>`:''}<div class="purchase"><div class="price"><span class="selected-price">${money(p.prices[size])}</span><small class="selected-unit">${p.prices.length>1?PIZZA_SIZES[size]:p.category==='faina'?'Por porción':'Por unidad'}</small></div><button class="add" aria-label="Agregar ${p.name} al pedido">+</button></div><span class="photo-note">Imagen ilustrativa · ${i===0?'Deslizá para ver más ↓':'El Chino Empanadas'}</span></div></article>`;
 }).join('');
 menu.scrollTop=0;
 menu.querySelectorAll('.product').forEach(el=>observer.observe(el));
 renderCategories();
}
nav.addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(!button)return;currentCategory=button.dataset.category;renderMenu();nav.querySelector(`[data-category="${currentCategory}"]`).focus({preventScroll:true});});

menu.addEventListener('click',event=>{
 const card=event.target.closest('[data-product]');if(!card)return;
 const p=PRODUCTS.find(p=>p.id===card.dataset.product),sizeButton=event.target.closest('[data-size]');
 if(sizeButton){const size=Number(sizeButton.dataset.size);selections[p.id]=size;card.querySelectorAll('.size').forEach(b=>b.setAttribute('aria-pressed',b===sizeButton));card.querySelector('.selected-price').textContent=money(p.prices[size]);card.querySelector('.selected-unit').textContent=PIZZA_SIZES[size];}
 const add=event.target.closest('.add');if(add){
 const size=selections[p.id]||0,key=p.id+'-'+size,existing=cart.find(item=>item.key===key);
 if(existing)existing.quantity++;else cart.push({key,id:p.id,size,quantity:1});
 document.querySelector('#order-success').hidden=true;updateCart();
 add.textContent='✓';add.classList.add('added');setTimeout(()=>{add.textContent='+';add.classList.remove('added');},650);
 const toast=document.querySelector('#toast');toast.textContent=p.name+' agregado';toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2000);
 }
});
function updateCart(){
 const count=cart.reduce((sum,item)=>sum+item.quantity,0),total=cart.reduce((sum,item)=>sum+PRODUCTS.find(p=>p.id===item.id).prices[item.size]*item.quantity,0);
 document.querySelector('#cart-count').textContent=count;document.querySelector('#cart-count').hidden=count===0;document.querySelector('.cart-open').setAttribute('aria-label',`Abrir mi pedido, ${count} productos, ${money(total)}`);document.querySelector('#cart-total').textContent=money(total);
 document.querySelector('#cart-footer').hidden=count===0;
 document.querySelector('#cart-items').innerHTML=count?cart.map(item=>{const p=PRODUCTS.find(p=>p.id===item.id),category=CATEGORIES.find(c=>c.id===p.category);return `<div class="cart-item"><div><h3>${p.name}</h3><p>${category.name} · ${p.prices.length>1?PIZZA_SIZES[item.size]:p.category==='faina'?'Porción':'Unidad'} · ${money(p.prices[item.size])}</p><div class="quantity"><button data-key="${item.key}" data-delta="-1" aria-label="Quitar una unidad de ${p.name}">−</button><span aria-label="Cantidad">${item.quantity}</span><button data-key="${item.key}" data-delta="1" aria-label="Agregar una unidad de ${p.name}">+</button></div></div><strong class="line-total">${money(p.prices[item.size]*item.quantity)}</strong></div>`;}).join(''):'<div class="empty"><strong>¿Qué te tienta hoy?</strong>Tu pedido todavía está vacío.<br>Elegí un plato y tocá el botón +.</div>';
}
document.querySelectorAll('.cart-open').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#order-success').hidden=true;document.querySelector('#cart-items').hidden=false;updateCart();dialog.showModal();}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
document.querySelector('#cart-items').addEventListener('click',event=>{const button=event.target.closest('[data-delta]');if(!button)return;const item=cart.find(i=>i.key===button.dataset.key);if(!item)return;item.quantity+=Number(button.dataset.delta);cart=cart.filter(i=>i.quantity>0);updateCart();const replacement=Array.from(document.querySelectorAll('[data-delta]')).find(b=>b.dataset.key===button.dataset.key&&b.dataset.delta===button.dataset.delta);(replacement||document.querySelector('.close')).focus();});
document.querySelector('#clear-cart').addEventListener('click',()=>{cart=[];updateCart();document.querySelector('.close').focus();});
document.querySelector('#confirm-order').addEventListener('click',()=>{if(!cart.length)return;cart=[];updateCart();document.querySelector('#cart-items').hidden=true;document.querySelector('#order-success').hidden=false;document.querySelector('#keep-browsing').focus();});
document.querySelector('#keep-browsing').addEventListener('click',()=>dialog.close());
renderMenu();updateCart();
const start=performance.now();
function dismissLoader(){setTimeout(()=>document.querySelector('#loader').classList.add('loaded'),Math.max(0,1200-(performance.now()-start)));}
if(document.readyState==='complete')dismissLoader();else window.addEventListener('load',dismissLoader,{once:true});
setTimeout(()=>document.querySelector('#loader').classList.add('loaded'),3500);
