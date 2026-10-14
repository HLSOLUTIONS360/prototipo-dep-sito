'use strict';
const WHATSAPP='5518991244739';
// Catálogo demonstrativo: confirme disponibilidade, especificações e valores com a loja.
const products=[
{id:1,name:'Cimento Votoran',category:'Cimentos',unit:'saco de 50 kg',emoji:'🏗️'},
{id:2,name:'Cimento Cauê',category:'Cimentos',unit:'saco de 50 kg',emoji:'🏗️'},
{id:3,name:'Cal liga concentrado',category:'Cal',unit:'saco de 20 kg',emoji:'⚪'},
{id:4,name:'Ferro 5/16” (8 mm)',category:'Ferro',unit:'barra de 12 m',emoji:'🔩'},
{id:5,name:'Ferro 3/8” (10 mm)',category:'Ferro',unit:'barra de 12 m',emoji:'🔩'},
{id:6,name:'Ferro 1/2” (12,5 mm)',category:'Ferro',unit:'barra de 12 m',emoji:'🔩'},
{id:7,name:'Treliça H8',category:'Treliças',unit:'consultar medidas',emoji:'🏗️'},
{id:8,name:'Treliça H12',category:'Treliças',unit:'consultar medidas',emoji:'🏗️'},
{id:9,name:'Tubos e conexões PVC',category:'Hidráulica',unit:'diversos modelos',emoji:'🧰'},
{id:10,name:'Caixas d’água',category:'Hidráulica',unit:'diversas capacidades',emoji:'💧'},
{id:11,name:'Torneiras e registros',category:'Hidráulica',unit:'diversos modelos',emoji:'🚰'},
{id:12,name:'Fios e cabos elétricos',category:'Elétrica',unit:'diversas bitolas',emoji:'🔌'},
{id:13,name:'Tomadas e interruptores',category:'Elétrica',unit:'diversos modelos',emoji:'💡'},
{id:14,name:'Disjuntores',category:'Elétrica',unit:'diversos modelos',emoji:'⚡'},
{id:15,name:'Tintas',category:'Tintas',unit:'cores e tamanhos sob consulta',emoji:'🎨'},
{id:16,name:'Ferramentas',category:'Ferramentas',unit:'diversos modelos',emoji:'🛠️'},
{id:17,name:'Tijolos',category:'Alvenaria',unit:'modelos sob consulta',emoji:'🧱'},
{id:18,name:'Areia',category:'Agregados',unit:'quantidade sob consulta',emoji:'🏖️'},
{id:19,name:'Pedra',category:'Agregados',unit:'quantidade sob consulta',emoji:'🪨'},
{id:20,name:'Pias',category:'Acabamento',unit:'modelos sob consulta',emoji:'🚰'}
];
const $=s=>document.querySelector(s);const cart=new Map();const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderProducts(){const q=$('#search').value.toLocaleLowerCase('pt-BR').trim(),cat=$('#category').value;const matches=products.filter(p=>(!cat||p.category===cat)&&(`${p.name} ${p.category}`).toLocaleLowerCase('pt-BR').includes(q));$('#products').innerHTML=matches.map(p=>`<article class="product"><div class="visual" aria-hidden="true">${p.emoji}</div><div class="info"><small>${esc(p.category)}</small><h3>${esc(p.name)}</h3><p>${esc(p.unit)} · Preço sob consulta</p><button data-add="${p.id}">+ Adicionar à lista</button></div></article>`).join('');$('#empty').hidden=matches.length>0}
function renderCart(){let total=0;$('#cartItems').innerHTML=[...cart.entries()].map(([id,qty])=>{const p=products.find(x=>x.id===id);total+=qty;return `<div class="cartItem"><div><b>${esc(p.name)}</b><small>${esc(p.unit)}</small></div><div class="qty"><button data-qty="${id}" data-delta="-1" aria-label="Diminuir quantidade de ${esc(p.name)}">−</button><b>${qty}</b><button data-qty="${id}" data-delta="1" aria-label="Aumentar quantidade de ${esc(p.name)}">+</button></div></div>`}).join('')||'<p>Sua lista está vazia. Adicione produtos do catálogo.</p>';$('#count').textContent=total}
function showCart(open){$('#drawer').classList.toggle('open',open);$('#drawer').setAttribute('aria-hidden',String(!open));$('#overlay').hidden=!open;document.body.style.overflow=open?'hidden':'';if(open)$('#closeBtn').focus();else $('#cartBtn').focus()}
function toast(msg){const el=$('#toast');el.textContent=msg;el.style.display='block';clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.style.display='none',2300)}
$('#category').innerHTML+=[...new Set(products.map(p=>p.category))].sort().map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('');
$('#search').addEventListener('input',renderProducts);$('#category').addEventListener('change',renderProducts);
$('#products').addEventListener('click',e=>{const btn=e.target.closest('[data-add]');if(!btn)return;const id=Number(btn.dataset.add);cart.set(id,(cart.get(id)||0)+1);renderCart();toast('Produto adicionado ao orçamento!')});
$('#cartItems').addEventListener('click',e=>{const btn=e.target.closest('[data-qty]');if(!btn)return;const id=Number(btn.dataset.qty),next=(cart.get(id)||0)+Number(btn.dataset.delta);if(next<=0)cart.delete(id);else cart.set(id,next);renderCart()});
$('#cartBtn').addEventListener('click',()=>showCart(true));$('#closeBtn').addEventListener('click',()=>showCart(false));$('#overlay').addEventListener('click',()=>showCart(false));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#drawer').classList.contains('open'))showCart(false)});
$('#menuBtn').addEventListener('click',()=>$('#nav').classList.toggle('open'));$('#nav').addEventListener('click',e=>{if(e.target.closest('a'))$('#nav').classList.remove('open')});
$('#sendBtn').addEventListener('click',()=>{if(!cart.size){toast('Adicione pelo menos um produto.');return}const name=$('#clientName').value.trim(),notes=$('#notes').value.trim();const lines=[`Olá! Gostaria de solicitar um orçamento na Minganti.`,name?`Nome: ${name}`:'', '', 'Produtos:',...[...cart.entries()].map(([id,qty])=>{const p=products.find(x=>x.id===id);return `• ${p.name} — ${qty} × ${p.unit}`}),notes?`\nObservações: ${notes}`:'','\nPor favor, informem disponibilidade, preços, frete e formas de pagamento.'].filter(Boolean);window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer')});
$('#year').textContent=new Date().getFullYear();renderProducts();renderCart();
