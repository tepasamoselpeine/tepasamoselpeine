// Datos demo (sustituye por tus coches reales)
const INVENTORY = [
  {id:1, title:"SEAT Ibiza 1.0 TSI", year:2019, km:78000, fuel:"Gasolina", price:10990, tag:"Etiqueta C"},
  {id:2, title:"Volkswagen Golf 1.6 TDI", year:2017, km:112000, fuel:"Diésel", price:12990, tag:"Etiqueta C"},
  {id:3, title:"Toyota Yaris Hybrid", year:2020, km:61000, fuel:"Híbrido", price:15990, tag:"ECO"},
  {id:4, title:"Peugeot 3008 1.5 BlueHDi", year:2019, km:98000, fuel:"Diésel", price:18990, tag:"Etiqueta C"},
  {id:5, title:"BMW Serie 1 118i", year:2018, km:89000, fuel:"Gasolina", price:16990, tag:"Etiqueta C"},
  {id:6, title:"Renault Clio 0.9 TCe", year:2016, km:105000, fuel:"Gasolina", price:8990, tag:"Etiqueta C"},
];

function euros(n){
  return new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
}

function renderCars(list){
  const grid = document.querySelector('[data-cars]');
  if(!grid) return;
  grid.innerHTML = list.map(c=>`
    <article class="car">
      <div class="thumb"><span>FOTO AQUÍ</span></div>
      <div class="body">
        <div class="title">
          <h3>${c.title}</h3>
          <div class="price">${euros(c.price)}</div>
        </div>
        <div class="meta">
          <span class="pill">${c.year}</span>
          <span class="pill">${c.km.toLocaleString('es-ES')} km</span>
          <span class="pill">${c.fuel}</span>
          <span class="pill">${c.tag}</span>
        </div>
        <div class="actions">
          <a class="btn btn-ghost" href="contacto.html?car=${encodeURIComponent(c.title)}">Preguntar</a>
          <a class="btn btn-primary" href="contacto.html?car=${encodeURIComponent(c.title)}#whatsapp">WhatsApp</a>
        </div>
      </div>
    </article>
  `).join('');
}

function applyFilters(){
  const q = (document.querySelector('[data-q]')?.value || '').toLowerCase();
  const fuel = document.querySelector('[data-fuel]')?.value || 'all';
  const max = parseInt(document.querySelector('[data-max]')?.value || '0',10);

  let out = INVENTORY.filter(c => c.title.toLowerCase().includes(q));
  if(fuel !== 'all') out = out.filter(c => c.fuel === fuel);
  if(max > 0) out = out.filter(c => c.price <= max);
  renderCars(out);

  const count = document.querySelector('[data-count]');
  if(count) count.textContent = `${out.length} vehículo(s)`;
}

function initInventory(){
  if(!document.querySelector('[data-cars]')) return;
  renderCars(INVENTORY);

  const inputs = document.querySelectorAll('[data-q],[data-fuel],[data-max]');
  inputs.forEach(el => el.addEventListener('input', applyFilters));
  applyFilters();
}

function initContactPrefill(){
  const params = new URLSearchParams(window.location.search);
  const car = params.get('car');
  if(car){
    const ta = document.querySelector('textarea[name="mensaje"]');
    if(ta){
      ta.value = `Hola, me interesa: ${car}. ¿Sigue disponible?`;
    }
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  initInventory();
  initContactPrefill();
});
