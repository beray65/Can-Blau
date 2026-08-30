// ============================================================
// LÓGICA DEL SITIO — no hace falta tocar este archivo para
// cambiar productos o datos de contacto (eso se edita en
// config.js y products.js).
// ============================================================

const SANDAL_ICON = `
  <svg class="sandal-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="50" cy="62" rx="36" ry="21" fill="currentColor" opacity="0.95"/>
    <path d="M50 17 L27 50 M50 17 L73 50" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
    <circle cx="50" cy="17" r="6" fill="currentColor"/>
  </svg>
`;

const WHATSAPP_ICON = `
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M16.02 2.67C8.65 2.67 2.67 8.65 2.67 16.02c0 2.52.7 4.87 1.9 6.88L2.67 29.33l6.6-1.85a13.3 13.3 0 0 0 6.75 1.84c7.37 0 13.35-5.98 13.35-13.3S23.39 2.67 16.02 2.67Zm0 24.2c-2.13 0-4.13-.6-5.83-1.64l-.42-.25-4.05 1.14 1.1-3.98-.27-.42a10.87 10.87 0 0 1-1.7-5.7c0-6.03 4.91-10.94 10.97-10.94 6.05 0 10.97 4.91 10.97 10.94 0 6.04-4.92 10.85-10.77 10.85Zm5.97-8.18c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.26-.19.22-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.6-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.11-.22.05-.4-.03-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.54-.73-.55-.19-.01-.4-.01-.62-.01-.21 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.7 0 1.6 1.16 3.14 1.32 3.36.16.22 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.24 1.48.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z"/>
  </svg>
`;

function formatPrice(n) {
  return `${n.toLocaleString("es-ES")} ${CONFIG.currencySymbol}`;
}

function conditionLabel(condition) {
  return condition === "poco-uso" ? "Poco uso" : "Nuevo";
}

function buildWhatsAppLink(message) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function productMessage(product) {
  return `Hola! Te escribo por las ${product.name} (${product.color}) talle __ que vi en ${CONFIG.storeName}. ¿Siguen disponibles?`;
}

function genericMessage() {
  return `Hola! Quiero consultar por las chanclas Nike disponibles en ${CONFIG.storeName}.`;
}

function promoMessage() {
  return `Hola! Quiero aprovechar la oferta de 2 pares (10% de descuento en el segundo) en ${CONFIG.storeName}.`;
}

function productImagesHTML(product) {
  const images = product.images || [];
  if (!images.length) {
    return `${SANDAL_ICON}<span class="badge-sample">Imagen de muestra</span>`;
  }
  const dots =
    images.length > 1
      ? `<div class="image-dots">${images
          .map((_, i) => `<button type="button" class="image-dot${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Ver foto ${i + 1}"></button>`)
          .join("")}</div>`
      : "";
  return `<img src="${images[0]}" alt="${product.name}" loading="lazy">${dots}`;
}

function productCardHTML(product) {
  return `
    <article class="card">
      <div class="card-image accent-${product.accent % 4}" data-product-id="${product.id}">
        <span class="badge-condition ${product.condition}">${conditionLabel(product.condition)}</span>
        ${productImagesHTML(product)}
      </div>
      <div class="card-body">
        <h3>${product.name}</h3>
        <p class="card-color">${product.color}</p>
        <div class="card-sizes">
          ${product.sizes.map((s) => `<span class="chip">${s}</span>`).join("")}
        </div>
        <div class="card-footer">
          <span class="price">${formatPrice(product.price)}</span>
          <div class="card-actions">
            ${product.paymentUrl ? `<a class="btn-pay" target="_blank" rel="noopener" href="${product.paymentUrl}">Pagar online</a>` : ""}
            <a class="btn-whatsapp" target="_blank" rel="noopener" href="${buildWhatsAppLink(productMessage(product))}">
              Consultar
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderProducts(list) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  if (!list.length) {
    grid.innerHTML = `<p class="empty-state">No encontramos chanclas con esos filtros. Prueba cambiar la búsqueda.</p>`;
    return;
  }
  grid.innerHTML = list.map(productCardHTML).join("");
}

function populateSizeFilter() {
  const sizeSelect = document.getElementById("filter-size");
  if (!sizeSelect) return;

  const allSizes = new Set();
  PRODUCTS.forEach((p) => p.sizes.forEach((s) => allSizes.add(s)));
  const sorted = Array.from(allSizes).sort((a, b) => a - b);

  sorted.forEach((size) => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    sizeSelect.appendChild(option);
  });
}

function applyFilters() {
  const query = (document.getElementById("filter-search")?.value || "").trim().toLowerCase();
  const size = document.getElementById("filter-size")?.value || "";
  const condition = document.getElementById("filter-condition")?.value || "";

  const filtered = PRODUCTS.filter((p) => {
    const matchesQuery =
      !query || p.name.toLowerCase().includes(query) || p.color.toLowerCase().includes(query);
    const matchesSize = !size || p.sizes.includes(Number(size));
    const matchesCondition = !condition || p.condition === condition;
    return matchesQuery && matchesSize && matchesCondition;
  });

  renderProducts(filtered);
}

function setupFilters() {
  populateSizeFilter();
  ["filter-search", "filter-size", "filter-condition"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", applyFilters);
  });
}

function setupWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp-generic]").forEach((el) => {
    el.setAttribute("href", buildWhatsAppLink(genericMessage()));
  });
  document.querySelectorAll("[data-whatsapp-promo]").forEach((el) => {
    el.setAttribute("href", buildWhatsAppLink(promoMessage()));
  });
}

function setupMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupNavUnderline() {
  const navLinks = document.getElementById("nav-links");
  const underline = document.getElementById("nav-underline");
  if (!navLinks || !underline) return;

  const links = Array.from(navLinks.querySelectorAll("a[data-nav-link]"));
  if (!links.length) return;

  const path = underline.querySelector("path");
  let activeLink = links.find((link) => link.classList.contains("is-active")) || links[0];

  function moveUnderlineTo(link) {
    underline.style.left = `${link.offsetLeft}px`;
    underline.style.width = `${link.offsetWidth}px`;
  }

  function replayDraw() {
    if (!path) return;
    path.style.animation = "none";
    void path.getBoundingClientRect();
    path.style.animation = "";
  }

  function setActive(link) {
    links.forEach((l) => l.classList.remove("is-active"));
    link.classList.add("is-active");
    activeLink = link;
    moveUnderlineTo(link);
    replayDraw();
  }

  links.forEach((link) => link.addEventListener("click", () => setActive(link)));

  moveUnderlineTo(activeLink);
  window.addEventListener("load", () => moveUnderlineTo(activeLink));
  window.addEventListener("resize", () => moveUnderlineTo(activeLink));
}

function setupStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  });
}

function setupImageSwitcher() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.addEventListener("click", (event) => {
    const dot = event.target.closest(".image-dot");
    if (!dot) return;

    const cardImage = dot.closest(".card-image");
    const product = PRODUCTS.find((p) => p.id === Number(cardImage?.dataset.productId));
    if (!product || !product.images) return;

    const index = Number(dot.dataset.index);
    const img = cardImage.querySelector("img");
    if (img) img.src = product.images[index];

    cardImage.querySelectorAll(".image-dot").forEach((d, i) => {
      d.classList.toggle("is-active", i === index);
    });
  });
}

function setupWhatsAppIcons() {
  document.querySelectorAll("[data-whatsapp-icon]").forEach((el) => {
    el.innerHTML = WHATSAPP_ICON;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  renderProducts(PRODUCTS);
  setupFilters();
  setupWhatsAppLinks();
  setupWhatsAppIcons();
  setupImageSwitcher();
  setupMobileNav();
  setupStickyHeader();
  setupNavUnderline();
});
