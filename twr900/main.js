/*!
 * TWR900 — main.js (IIFE, no ES modules, works on file:// and any host)
 */
(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var escHTML = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); }
  }
  var fmtPrice = function (n) {
    return n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  };
  var qs = function (name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
  };

  // ---------------------------------------------------------------------
  // Storage helpers (defensive — localStorage can throw in private modes)
  // ---------------------------------------------------------------------
  function storeGet(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function storeSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }

  var CART_KEY = "twr900_cart";
  var WISH_KEY = "twr900_wishlist";
  var COMPARE_KEY = "twr900_compare";
  var THEME_KEY = "twr900_theme";

  // ---------------------------------------------------------------------
  // Icons
  // ---------------------------------------------------------------------
  var ICON_PATHS = {
    search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    cart: '<path d="M4 8h16l-1.3 11.2a2 2 0 0 1-2 1.8H7.3a2 2 0 0 1-2-1.8L4 8Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
    heart: '<path d="M12 21s-6.7-4.3-9.3-8.2C.9 9.6 1.6 6 4.6 4.6 7 3.5 9.6 4.3 12 7c2.4-2.7 5-3.5 7.4-2.4 3 1.4 3.7 5 1.9 8.2C18.7 16.7 12 21 12 21z"/>',
    heartFill: '<path fill="currentColor" stroke="none" d="M12 21s-6.7-4.3-9.3-8.2C.9 9.6 1.6 6 4.6 4.6 7 3.5 9.6 4.3 12 7c2.4-2.7 5-3.5 7.4-2.4 3 1.4 3.7 5 1.9 8.2C18.7 16.7 12 21 12 21z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    close: '<line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>',
    chevronLeft: '<polyline points="15 6 9 12 15 18"/>',
    chevronRight: '<polyline points="9 6 15 12 9 18"/>',
    check: '<polyline points="5 12 10 17 19 7"/>',
    truck: '<rect x="1" y="7" width="14" height="10" rx="1.5"/><path d="M15 10h4l3 3.2V17h-7z"/><circle cx="6" cy="19" r="1.6"/><circle cx="17.5" cy="19" r="1.6"/>',
    shield: '<path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z"/><polyline points="9 12 11.3 14.3 15.3 9.7"/>',
    trophy: '<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 5H4v1.5A3.5 3.5 0 0 0 7.3 10"/><path d="M17 5h3v1.5A3.5 3.5 0 0 1 16.7 10"/><line x1="12" y1="13" x2="12" y2="17"/><path d="M8.5 20h7"/><path d="M9.5 20v-1.3a2.5 2.5 0 0 1 5 0V20"/>',
    refresh: '<polyline points="22 4 22 9 17 9"/><polyline points="2 20 2 15 7 15"/><path d="M4 9a8.5 8.5 0 0 1 14.1-3.4L22 9M2 15l3.9 3.4A8.5 8.5 0 0 0 20 12.5"/>',
    trash: '<polyline points="4 6 6 6 20 6"/><path d="M8.5 6V4.3A1.5 1.5 0 0 1 10 2.8h4A1.5 1.5 0 0 1 15.5 4.3V6m3 0-.9 13.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5.5 6"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
    compare: '<path d="M3 21V3"/><path d="M3 21h18"/><rect x="7" y="13" width="3" height="8"/><rect x="12.5" y="9" width="3" height="12"/><rect x="18" y="5" width="3" height="16"/>',
    sun: '<circle cx="12" cy="12" r="4.2"/><g stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/><line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="6.6" y2="6.6"/><line x1="17.4" y1="17.4" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="6.6" y2="17.4"/><line x1="17.4" y1="6.6" x2="19.1" y2="4.9"/></g>',
    moon: '<path d="M21 13.8A9 9 0 1 1 10.2 3 7.2 7.2 0 0 0 21 13.8z"/>',
    mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M21.5 16.9v2.9a2 2 0 0 1-2.2 2 19.6 19.6 0 0 1-8.5-3 19.3 19.3 0 0 1-6-6 19.6 19.6 0 0 1-3-8.6A2 2 0 0 1 3.8 2.2h2.9a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.7a2 2 0 0 1-.5 2.1L7.5 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z"/>',
    pin: '<path d="M20.5 10c0 6.2-8.5 11.5-8.5 11.5S3.5 16.2 3.5 10a8.5 8.5 0 0 1 17 0z"/><circle cx="12" cy="10" r="2.8"/>',
    instagram: '<rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.3"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/>',
    tiktok: '<path d="M13.8 3v10.6a3.4 3.4 0 1 1-2.9-3.36V7a6.3 6.3 0 1 0 5.8 6.3V9.7a6 6 0 0 0 3.9 1.4V8a6 6 0 0 1-3.9-1.4A6 6 0 0 1 15.4 3z"/>',
    youtube: '<rect x="2" y="5.5" width="20" height="13" rx="4"/><polygon points="10 9.2 15.8 12 10 14.8" fill="currentColor" stroke="none"/>',
    star: '<polygon points="12 2 15 8.6 22 9.3 16.8 14 18.2 21 12 17.4 5.8 21 7.2 14 2 9.3 9 8.6"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    filter: '<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="9" cy="6" r="2" fill="var(--surface)"/><circle cx="15" cy="12" r="2" fill="var(--surface)"/><circle cx="7" cy="18" r="2" fill="var(--surface)"/>'
  };
  function icon(name, extra) {
    var body = ICON_PATHS[name] || "";
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra ? " " + extra : "") + ">" + body + "</svg>";
  }

  // ---------------------------------------------------------------------
  // Boot illustration (inline SVG, recolored per colorway via palette)
  // ---------------------------------------------------------------------
  var bootUid = 0;
  function bootSVG(palette, opts) {
    opts = opts || {};
    palette = palette || { upper: "#0A0A0A", sole: "#fff", toe: "#151515", collar: "#161616", tongue: "#f2f2f2", lace: "#fff" };
    bootUid += 1;
    var id = "boot" + bootUid;
    var alt = opts.alt || "Ilustración de bota de lucha TWR900";
    return (
      '<svg class="boot-illustration" viewBox="0 0 320 200" role="img" aria-label="' + escHTML(alt) + '">' +
      '<defs>' +
      '<filter id="sh-' + id + '" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="9" stdDeviation="9" flood-color="#000" flood-opacity="0.3"/></filter>' +
      '<linearGradient id="sheen-' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.16"/><stop offset="0.55" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      "</defs>" +
      '<g filter="url(#sh-' + id + ')">' +
      '<rect x="26" y="156" width="230" height="20" rx="10" fill="' + palette.sole + '"/>' +
      '<path d="M34,160 C25,144 27,119 44,105 C56,95 70,91 86,89 L90,140 C90,151 78,159 60,161 Z" fill="' + palette.toe + '"/>' +
      '<path d="M40,161 C33,146 34,121 49,107 C61,97 73,92 88,90 C132,84 176,80 206,82 C222,83 231,90 234,102 L231,148 C227,156 209,160 189,160 Z" fill="' + palette.upper + '"/>' +
      '<path d="M40,161 C33,146 34,121 49,107 C61,97 73,92 88,90 C132,84 176,80 206,82 C222,83 231,90 234,102 L231,148 C227,156 209,160 189,160 Z" fill="url(#sheen-' + id + ')"/>' +
      '<path d="M200,108 L197,56 C197,42 208,32 223,31 C239,30 251,40 252,55 L247,109 C233,114 213,113 200,108 Z" fill="' + palette.collar + '"/>' +
      '<rect x="215" y="18" width="18" height="16" rx="5" fill="' + palette.collar + '" transform="rotate(-8 224 26)"/>' +
      '<path d="M144,84 C141,66 150,48 168,44 C184,41 193,54 191,71 C190,80 180,84 169,85 C160,86 148,87 144,84 Z" fill="' + palette.tongue + '"/>' +
      '<g stroke="' + palette.lace + '" stroke-width="3.4" stroke-linecap="round">' +
      '<line x1="138" y1="88" x2="181" y2="68"/><line x1="135" y1="77" x2="178" y2="57"/><line x1="132" y1="66" x2="175" y2="46"/>' +
      "</g>" +
      '<g fill="' + palette.upper + '">' +
      '<circle cx="138" cy="88" r="3.4"/><circle cx="181" cy="68" r="3.4"/><circle cx="135" cy="77" r="3.4"/><circle cx="178" cy="57" r="3.4"/><circle cx="132" cy="66" r="3.4"/><circle cx="175" cy="46" r="3.4"/>' +
      "</g>" +
      '<g stroke="#000" stroke-opacity="0.18" stroke-width="2.4">' +
      '<line x1="55" y1="160" x2="55" y2="172"/><line x1="95" y1="161" x2="95" y2="173"/><line x1="135" y1="161" x2="135" y2="173"/><line x1="175" y1="160" x2="175" y2="172"/><line x1="215" y1="158" x2="215" y2="170"/>' +
      "</g>" +
      "</g></svg>"
    );
  }

  function matRingsSVG(opts) {
    opts = opts || {};
    var stroke = opts.stroke || "rgba(255,255,255,.18)";
    var accent = opts.accent || "#2F5DFF";
    return (
      '<svg viewBox="0 0 400 400" aria-hidden="true">' +
      '<circle cx="200" cy="200" r="190" fill="none" stroke="' + stroke + '" stroke-width="1"/>' +
      '<circle cx="200" cy="200" r="150" fill="none" stroke="' + stroke + '" stroke-width="1"/>' +
      '<circle cx="200" cy="200" r="108" fill="none" stroke="' + accent + '" stroke-width="1.4" stroke-dasharray="2 10" opacity="0.6"/>' +
      '<circle cx="200" cy="200" r="66" fill="none" stroke="' + stroke + '" stroke-width="1"/>' +
      "</svg>"
    );
  }

  function starsHTML(rating, count) {
    var pct = Math.max(0, Math.min(1, rating / 5)) * 100;
    var one = ICON_PATHS.star;
    var bg = "", fg = "";
    for (var i = 0; i < 5; i++) { bg += '<svg viewBox="0 0 24 24">' + one + "</svg>"; fg += '<svg viewBox="0 0 24 24">' + one + "</svg>"; }
    var html = '<span class="stars" aria-hidden="true"><span class="stars-bg">' + bg + '</span><span class="stars-fg" style="width:' + pct.toFixed(0) + '%">' + fg + "</span></span>";
    if (count != null) html += '<span>' + rating.toFixed(1) + " (" + count + ")</span>";
    return html;
  }

  function swatchBg(c) {
    return "linear-gradient(135deg, " + c.swatch + " 50%, " + c.swatch2 + " 50%)";
  }

  var AVATAR_COLORS = ["#2F5DFF", "#D61F2C", "#1FA35C", "#D9A441", "#7A1F35", "#3A3D42"];
  function avatarHTML(name) {
    var parts = String(name).trim().split(/\s+/);
    var initials = (parts[0] ? parts[0][0] : "") + (parts[1] ? parts[1][0] : "");
    var sum = 0;
    for (var i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    var color = AVATAR_COLORS[sum % AVATAR_COLORS.length];
    return '<span class="avatar" style="background:' + color + '">' + escHTML(initials.toUpperCase()) + "</span>";
  }

  // ---------------------------------------------------------------------
  // Product helpers
  // ---------------------------------------------------------------------
  function allProducts() { return data.products || []; }
  function findProduct(slugOrId) {
    var list = allProducts();
    for (var i = 0; i < list.length; i++) {
      if (list[i].slug === slugOrId || list[i].id === slugOrId) return list[i];
    }
    return null;
  }
  function pickReviews(product) {
    var pool = data.reviewPool || [];
    if (!pool.length) return [];
    var idx = allProducts().indexOf(product);
    if (idx < 0) idx = 0;
    var offsets = [0, 2, 5];
    var dates = ["hace 4 días", "hace 2 semanas", "hace 1 mes"];
    return offsets.map(function (off, i) {
      var r = pool[(idx + off) % pool.length];
      return { name: r.name, rating: r.rating, title: r.title, body: r.body, date: dates[i] };
    });
  }
  function productCardHTML(p) {
    var mainColor = p.colors[0];
    var wl = getWishlist();
    var cmp = getCompare();
    var isWished = wl.indexOf(p.id) > -1;
    var isCompared = cmp.indexOf(p.id) > -1;
    var badges = (p.badges || []).map(function (b) {
      var cls = b === "Oferta" ? "badge badge-danger" : (b === "Novedad" || b === "Edición limitada" ? "badge badge-accent" : "badge");
      return '<span class="' + cls + '">' + escHTML(b) + "</span>";
    }).join("");
    var swatches = p.colors.map(function (c, i) {
      return '<button type="button" class="swatch' + (i === 0 ? " is-selected" : "") + '" style="background:' + swatchBg(c) + '" data-swatch="' + c.id + '" data-product="' + p.id + '" aria-label="Color ' + escHTML(c.name) + '"></button>';
    }).join("");
    return (
      '<article class="product-card reveal" data-product-card="' + p.id + '">' +
      '<div class="product-media" style="--boot-angle:' + p.angle + 'deg">' +
      '<div class="product-badges">' + badges + "</div>" +
      '<div class="product-quick-actions">' +
      '<button type="button" class="btn-icon wishlist-toggle' + (isWished ? " is-active" : "") + '" data-wishlist="' + p.id + '" aria-label="Añadir a favoritos" aria-pressed="' + isWished + '">' + icon(isWished ? "heartFill" : "heart") + "</button>" +
      '<button type="button" class="btn-icon compare-toggle' + (isCompared ? " is-active" : "") + '" data-compare="' + p.id + '" aria-label="Añadir a comparador" aria-pressed="' + isCompared + '">' + icon("compare") + "</button>" +
      "</div>" +
      '<a href="producto.html?slug=' + p.slug + '" class="product-media-link" aria-label="Ver ' + escHTML(p.name) + '">' + bootSVG(mainColor.palette, { alt: p.name }) + "</a>" +
      "</div>" +
      '<div class="product-body">' +
      '<span class="product-cat">' + escHTML(p.categoryLabel) + "</span>" +
      '<h3 class="product-name"><a href="producto.html?slug=' + p.slug + '">' + escHTML(p.name) + "</a></h3>" +
      '<div class="product-rating">' + starsHTML(p.rating, p.reviewCount) + "</div>" +
      '<div class="product-swatches">' + swatches + "</div>" +
      '<div class="product-foot">' +
      '<div class="product-price"><span>' + fmtPrice(p.price) + "</span>" + (p.compareAtPrice ? '<span class="price-old">' + fmtPrice(p.compareAtPrice) + "</span>" : "") + "</div>" +
      '<button type="button" class="btn btn-primary btn-sm product-add" data-quick-add="' + p.id + '">Añadir</button>' +
      "</div></div></article>"
    );
  }

  // ---------------------------------------------------------------------
  // Cart
  // ---------------------------------------------------------------------
  function getCart() { return storeGet(CART_KEY, []); }
  function setCart(cart) { storeSet(CART_KEY, cart); renderCartDrawer(); updateCartBadge(); }
  function addToCart(productId, colorId, size, qty) {
    var cart = getCart();
    var existing = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].productId === productId && cart[i].colorId === colorId && cart[i].size === size) { existing = cart[i]; break; }
    }
    if (existing) existing.qty += qty || 1;
    else cart.push({ productId: productId, colorId: colorId, size: size, qty: qty || 1 });
    setCart(cart);
  }
  function cartCount() {
    return getCart().reduce(function (n, i) { return n + i.qty; }, 0);
  }
  function cartLines() {
    return getCart().map(function (item, index) {
      var p = findProduct(item.productId);
      if (!p) return null;
      var color = null;
      for (var i = 0; i < p.colors.length; i++) if (p.colors[i].id === item.colorId) color = p.colors[i];
      color = color || p.colors[0];
      return { index: index, product: p, color: color, size: item.size, qty: item.qty, lineTotal: p.price * item.qty };
    }).filter(Boolean);
  }
  function cartSubtotal() { return cartLines().reduce(function (s, l) { return s + l.lineTotal; }, 0); }

  function updateCartBadge() {
    $$("[data-cart-badge]").forEach(function (el) {
      var n = cartCount();
      el.textContent = n;
      el.classList.toggle("is-visible", n > 0);
    });
  }

  function renderCartDrawer() {
    var body = $("[data-cart-body]");
    var foot = $("[data-cart-foot]");
    if (!body) return;
    var lines = cartLines();
    if (!lines.length) {
      body.innerHTML = '<div class="cart-empty">' + icon("cart") + "<p>Tu carrito está vacío.</p></div>";
      if (foot) foot.innerHTML = '<a href="tienda.html" class="btn btn-primary btn-block">Ir a la tienda</a>';
      return;
    }
    body.innerHTML = lines.map(function (l) {
      return (
        '<div class="cart-item">' +
        '<div class="cart-item-media">' + bootSVG(l.color.palette, { alt: l.product.name }) + "</div>" +
        '<div class="cart-item-info">' +
        '<span class="cart-item-name">' + escHTML(l.product.name) + "</span>" +
        '<span class="cart-item-opts">' + escHTML(l.color.name) + " · Talla " + l.size + "</span>" +
        '<div class="cart-item-row">' +
        '<div class="qty-stepper"><button type="button" data-cart-dec="' + l.index + '" aria-label="Restar">' + icon("minus") + '</button><span>' + l.qty + '</span><button type="button" data-cart-inc="' + l.index + '" aria-label="Sumar">' + icon("plus") + "</button></div>" +
        '<strong>' + fmtPrice(l.lineTotal) + "</strong>" +
        "</div>" +
        '<button type="button" class="cart-item-remove" data-cart-remove="' + l.index + '">Eliminar</button>' +
        "</div></div>"
      );
    }).join("");
    var subtotal = cartSubtotal();
    if (foot) {
      foot.innerHTML =
        '<div class="cart-summary-row"><span>Subtotal</span><span>' + fmtPrice(subtotal) + "</span></div>" +
        '<div class="cart-summary-row"><span>Envío</span><span>' + (subtotal >= 80 ? "Gratis" : fmtPrice(4.95)) + "</span></div>" +
        '<div class="cart-summary-row total"><span>Total</span><span>' + fmtPrice(subtotal >= 80 ? subtotal : subtotal + 4.95) + "</span></div>" +
        '<a href="checkout.html" class="btn btn-accent btn-block btn-lg">Finalizar compra</a>';
    }
  }

  // ---------------------------------------------------------------------
  // Wishlist / Compare
  // ---------------------------------------------------------------------
  function getWishlist() { return storeGet(WISH_KEY, []); }
  function toggleWishlist(id) {
    var list = getWishlist();
    var idx = list.indexOf(id);
    if (idx > -1) list.splice(idx, 1); else list.push(id);
    storeSet(WISH_KEY, list);
    syncToggleButtons();
    updateWishBadge();
    return idx === -1;
  }
  function updateWishBadge() {
    $$("[data-wish-badge]").forEach(function (el) {
      var n = getWishlist().length;
      el.textContent = n;
      el.classList.toggle("is-visible", n > 0);
    });
  }

  function getCompare() { return storeGet(COMPARE_KEY, []); }
  function toggleCompare(id) {
    var list = getCompare();
    var idx = list.indexOf(id);
    if (idx > -1) { list.splice(idx, 1); storeSet(COMPARE_KEY, list); syncToggleButtons(); updateCompareBar(); return true; }
    if (list.length >= 3) { showToast("Puedes comparar hasta 3 modelos a la vez."); return false; }
    list.push(id);
    storeSet(COMPARE_KEY, list);
    syncToggleButtons();
    updateCompareBar();
    return true;
  }
  function updateCompareBar() {
    var bar = $("[data-compare-bar]");
    if (!bar) return;
    var n = getCompare().length;
    var countEl = $("[data-compare-bar-count]", bar);
    if (countEl) countEl.textContent = n;
    bar.classList.toggle("is-visible", n > 0 && !document.body.hasAttribute("data-page-compare"));
  }

  function syncToggleButtons() {
    var wl = getWishlist(), cmp = getCompare();
    $$("[data-wishlist]").forEach(function (btn) {
      var id = btn.getAttribute("data-wishlist");
      var active = wl.indexOf(id) > -1;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active);
      btn.innerHTML = icon(active ? "heartFill" : "heart");
    });
    $$("[data-compare]").forEach(function (btn) {
      var id = btn.getAttribute("data-compare");
      var active = cmp.indexOf(id) > -1;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active);
    });
  }

  // ---------------------------------------------------------------------
  // Toast
  // ---------------------------------------------------------------------
  var toastTimer = null;
  function showToast(msg) {
    var el = $("[data-toast]");
    if (!el) return;
    el.innerHTML = icon("check") + "<span>" + escHTML(msg) + "</span>";
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-visible"); }, 2600);
  }

  // ---------------------------------------------------------------------
  // Theme
  // ---------------------------------------------------------------------
  function initTheme() {
    var saved = storeGet(THEME_KEY, null);
    if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
    $$("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var isDark = document.documentElement.getAttribute("data-theme") === "dark";
        if (isDark) { document.documentElement.removeAttribute("data-theme"); storeSet(THEME_KEY, "light"); }
        else { document.documentElement.setAttribute("data-theme", "dark"); storeSet(THEME_KEY, "dark"); }
      });
    });
  }

  // ---------------------------------------------------------------------
  // Nav / drawers / mobile menu / search overlay
  // ---------------------------------------------------------------------
  function initNav() {
    var nav = $(".nav");
    if (!nav) return;
    function onScroll() { nav.classList.toggle("is-solid", window.scrollY > 12); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var path = location.pathname.split("/").pop() || "index.html";
    $$(".nav-menu a, .mobile-menu-links a").forEach(function (a) {
      var raw = a.getAttribute("href");
      if (raw.indexOf("#") > -1) return; // same-page anchor links (e.g. "Asics") never get the active state
      var href = raw.split("?")[0];
      if (href === path || (href === "index.html" && path === "")) a.classList.add("is-active");
    });
  }

  function openPanel(el) {
    if (!el) return;
    el.classList.add("is-open");
    $(".scrim").classList.add("is-visible");
    document.body.classList.add("no-scroll");
  }
  function closeAllPanels() {
    $$(".drawer.is-open, .search-overlay.is-open, .mobile-menu.is-open, .filters-panel.is-open").forEach(function (el) {
      el.classList.remove("is-open");
    });
    var scrim = $(".scrim");
    if (scrim) scrim.classList.remove("is-visible");
    document.body.classList.remove("no-scroll");
  }

  function initDrawers() {
    $$("[data-open]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var target = btn.getAttribute("data-open");
        var el = $('[data-panel="' + target + '"]');
        if (target === "cart") renderCartDrawer();
        openPanel(el);
        if (target === "search") { var input = $(".search-overlay-head input"); if (input) setTimeout(function () { input.focus(); }, 350); }
      });
    });
    $$("[data-close]").forEach(function (btn) { btn.addEventListener("click", closeAllPanels); });
    var scrim = $(".scrim");
    if (scrim) scrim.addEventListener("click", closeAllPanels);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAllPanels(); });
  }

  // ---------------------------------------------------------------------
  // Search
  // ---------------------------------------------------------------------
  function initSearch() {
    var input = $(".search-overlay-head input");
    var results = $("[data-search-results]");
    if (!input || !results) return;
    function run(query) {
      query = (query || "").trim().toLowerCase();
      if (!query) {
        results.innerHTML = '<p class="search-empty">Busca por modelo, colección o color: “EX-EO”, “Aggressor”, “azul”…</p>';
        return;
      }
      var matches = allProducts().filter(function (p) {
        return p.name.toLowerCase().indexOf(query) > -1 ||
          p.categoryLabel.toLowerCase().indexOf(query) > -1 ||
          p.colors.some(function (c) { return c.name.toLowerCase().indexOf(query) > -1; });
      });
      if (!matches.length) { results.innerHTML = '<p class="search-empty">Sin resultados para “' + escHTML(query) + '”.</p>'; return; }
      results.innerHTML = matches.map(function (p) {
        return (
          '<a class="search-result-item" href="producto.html?slug=' + p.slug + '">' +
          '<div class="search-result-media">' + bootSVG(p.colors[0].palette, { alt: p.name }) + "</div>" +
          '<div class="search-result-info"><b>' + escHTML(p.name) + "</b><span>" + escHTML(p.categoryLabel) + " · " + fmtPrice(p.price) + "</span></div>" +
          "</a>"
        );
      }).join("");
    }
    input.addEventListener("input", function () { run(input.value); });
    run("");
  }

  // ---------------------------------------------------------------------
  // Cart / wishlist / compare event delegation (works on any page)
  // ---------------------------------------------------------------------
  function initCommerceEvents() {
    document.addEventListener("click", function (e) {
      var wishBtn = e.target.closest("[data-wishlist]");
      if (wishBtn) {
        var added = toggleWishlist(wishBtn.getAttribute("data-wishlist"));
        showToast(added ? "Añadido a favoritos" : "Eliminado de favoritos");
        if (document.body.hasAttribute("data-page-wishlist")) mountWishlistPage();
        return;
      }
      var cmpBtn = e.target.closest("[data-compare]");
      if (cmpBtn) {
        var ok = toggleCompare(cmpBtn.getAttribute("data-compare"));
        if (ok) showToast(cmpBtn.classList.contains("is-active") ? "Eliminado del comparador" : "Añadido al comparador");
        if (document.body.hasAttribute("data-page-compare")) mountComparePage();
        return;
      }
      var quickAdd = e.target.closest("[data-quick-add]");
      if (quickAdd) {
        var p = findProduct(quickAdd.getAttribute("data-quick-add"));
        if (p) {
          var card = quickAdd.closest("[data-product-card]");
          var selectedSwatch = card ? card.querySelector(".swatch.is-selected") : null;
          var colorId = selectedSwatch ? selectedSwatch.getAttribute("data-swatch") : p.colors[0].id;
          addToCart(p.id, colorId, p.sizes[Math.floor(p.sizes.length / 2)], 1);
          showToast(p.name + " añadida al carrito");
        }
        return;
      }
      var swatch = e.target.closest(".swatch[data-swatch]");
      if (swatch) {
        var card2 = swatch.closest("[data-product-card]");
        $$(".swatch", card2).forEach(function (s) { s.classList.remove("is-selected"); });
        swatch.classList.add("is-selected");
        return;
      }
      var incBtn = e.target.closest("[data-cart-inc]");
      if (incBtn) { var cart = getCart(); var i1 = +incBtn.getAttribute("data-cart-inc"); if (cart[i1]) { cart[i1].qty++; setCart(cart); } return; }
      var decBtn = e.target.closest("[data-cart-dec]");
      if (decBtn) {
        var cart2 = getCart(); var i2 = +decBtn.getAttribute("data-cart-dec");
        if (cart2[i2]) { cart2[i2].qty--; if (cart2[i2].qty <= 0) cart2.splice(i2, 1); setCart(cart2); }
        return;
      }
      var rmBtn = e.target.closest("[data-cart-remove]");
      if (rmBtn) { var cart3 = getCart(); cart3.splice(+rmBtn.getAttribute("data-cart-remove"), 1); setCart(cart3); return; }
    });
  }

  // ---------------------------------------------------------------------
  // Mounts — homepage featured, shop grid + filters, product detail,
  // related products, wishlist page, compare page
  // ---------------------------------------------------------------------
  function mountFeatured() {
    var target = $("[data-mount='featured']");
    if (!target || target.dataset.mounted) return;
    var featured = [allProducts()[0], allProducts()[3], allProducts()[6], allProducts()[2], allProducts()[5], allProducts()[8]].filter(Boolean);
    target.innerHTML = featured.map(productCardHTML).join("");
    target.dataset.mounted = "1";
    bindReveal(target);
  }

  var shopState = { category: qs("categoria") || "", sizes: [], colors: [], priceMax: null, sort: "relevance", query: "" };

  function mountShopFilters() {
    var sizeWrap = $("[data-filter-sizes]");
    var colorWrap = $("[data-filter-colors]");
    var catWrap = $("[data-filter-categories]");
    if (!sizeWrap) return;
    var allSizes = Array.from(new Set([].concat.apply([], allProducts().map(function (p) { return p.sizes; })))).sort(function (a, b) { return a - b; });
    sizeWrap.innerHTML = allSizes.map(function (s) { return '<button type="button" class="filter-chip" data-size="' + s + '">' + s + "</button>"; }).join("");

    var colorMap = {};
    allProducts().forEach(function (p) { p.colors.forEach(function (c) { colorMap[c.id] = c; }); });
    colorWrap.innerHTML = Object.keys(colorMap).map(function (id) {
      var c = colorMap[id];
      return '<button type="button" class="filter-swatch-btn" style="background:' + swatchBg(c) + '" data-color="' + id + '" title="' + escHTML(c.name) + '" aria-label="' + escHTML(c.name) + '"></button>';
    }).join("");

    if (catWrap) {
      catWrap.innerHTML = (data.categories || []).map(function (c) {
        return '<button type="button" class="filter-chip" data-category="' + c.id + '">' + escHTML(c.name) + "</button>";
      }).join("");
    }

    var maxPrice = Math.max.apply(null, allProducts().map(function (p) { return p.price; }));
    var priceInput = $("[data-filter-price]");
    if (priceInput) { priceInput.max = Math.ceil(maxPrice); priceInput.value = Math.ceil(maxPrice); shopState.priceMax = Math.ceil(maxPrice); }
    var priceLabel = $("[data-filter-price-value]");
    if (priceLabel) priceLabel.textContent = fmtPrice(shopState.priceMax);

    if (shopState.category) {
      var initChip = catWrap && catWrap.querySelector('[data-category="' + shopState.category + '"]');
      if (initChip) initChip.classList.add("is-active");
    }
  }

  function applyShopFilters() {
    var list = allProducts().filter(function (p) {
      if (shopState.category && p.category !== shopState.category) return false;
      if (shopState.sizes.length && !shopState.sizes.some(function (s) { return p.sizes.indexOf(s) > -1; })) return false;
      if (shopState.colors.length && !shopState.colors.some(function (cid) { return p.colors.some(function (c) { return c.id === cid; }); })) return false;
      if (shopState.priceMax != null && p.price > shopState.priceMax) return false;
      if (shopState.query && p.name.toLowerCase().indexOf(shopState.query.toLowerCase()) === -1) return false;
      return true;
    });
    if (shopState.sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
    else if (shopState.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
    else if (shopState.sort === "rating") list.sort(function (a, b) { return b.rating - a.rating; });
    else if (shopState.sort === "new") list.sort(function (a, b) { return (b.badges.indexOf("Novedad") > -1 ? 1 : 0) - (a.badges.indexOf("Novedad") > -1 ? 1 : 0); });

    var grid = $("[data-mount='shop-grid']");
    var count = $("[data-shop-count]");
    var empty = $("[data-shop-empty]");
    if (!grid) return;
    grid.innerHTML = list.map(productCardHTML).join("");
    bindReveal(grid);
    if (count) count.textContent = list.length + (list.length === 1 ? " resultado" : " resultados");
    if (empty) empty.classList.toggle("hidden", list.length > 0);

    var pills = $("[data-active-filters]");
    if (pills) {
      var chips = [];
      if (shopState.category) { var cat = (data.categories || []).filter(function (c) { return c.id === shopState.category; })[0]; if (cat) chips.push({ label: cat.name, clear: function () { shopState.category = ""; } }); }
      shopState.sizes.forEach(function (s) { chips.push({ label: "Talla " + s, clear: function () { shopState.sizes = shopState.sizes.filter(function (x) { return x !== s; }); } }); });
      shopState.colors.forEach(function (cid) { chips.push({ label: cid, clear: function () { shopState.colors = shopState.colors.filter(function (x) { return x !== cid; }); } }); });
      pills.innerHTML = chips.map(function (c, i) { return '<span class="active-filter-pill">' + escHTML(c.label) + '<button type="button" data-pill-clear="' + i + '">' + icon("close") + "</button></span>"; }).join("");
      pills._clears = chips.map(function (c) { return c.clear; });
    }
  }

  function initShop() {
    var grid = $("[data-mount='shop-grid']");
    if (!grid) return;
    mountShopFilters();
    applyShopFilters();

    document.addEventListener("click", function (e) {
      var sizeChip = e.target.closest("[data-filter-sizes] [data-size]");
      if (sizeChip) {
        var s = +sizeChip.getAttribute("data-size");
        sizeChip.classList.toggle("is-active");
        shopState.sizes = shopState.sizes.indexOf(s) > -1 ? shopState.sizes.filter(function (x) { return x !== s; }) : shopState.sizes.concat([s]);
        applyShopFilters();
      }
      var colorChip = e.target.closest("[data-filter-colors] [data-color]");
      if (colorChip) {
        var cid = colorChip.getAttribute("data-color");
        colorChip.classList.toggle("is-active");
        shopState.colors = shopState.colors.indexOf(cid) > -1 ? shopState.colors.filter(function (x) { return x !== cid; }) : shopState.colors.concat([cid]);
        applyShopFilters();
      }
      var catChip = e.target.closest("[data-filter-categories] [data-category]");
      if (catChip) {
        var wasActive = catChip.classList.contains("is-active");
        $$("[data-filter-categories] [data-category]").forEach(function (b) { b.classList.remove("is-active"); });
        if (!wasActive) { catChip.classList.add("is-active"); shopState.category = catChip.getAttribute("data-category"); }
        else shopState.category = "";
        applyShopFilters();
      }
      var pillClear = e.target.closest("[data-pill-clear]");
      if (pillClear) {
        var pillsWrap = $("[data-active-filters]");
        var idx = +pillClear.getAttribute("data-pill-clear");
        if (pillsWrap && pillsWrap._clears && pillsWrap._clears[idx]) pillsWrap._clears[idx]();
        mountShopFilters();
        applyShopFilters();
      }
      var clearAll = e.target.closest("[data-filters-clear]");
      if (clearAll) { shopState.category = ""; shopState.sizes = []; shopState.colors = []; mountShopFilters(); applyShopFilters(); }
    });

    var sortSelect = $("[data-shop-sort]");
    if (sortSelect) sortSelect.addEventListener("change", function () { shopState.sort = sortSelect.value; applyShopFilters(); });

    var priceInput = $("[data-filter-price]");
    if (priceInput) priceInput.addEventListener("input", function () {
      shopState.priceMax = +priceInput.value;
      var label = $("[data-filter-price-value]"); if (label) label.textContent = fmtPrice(shopState.priceMax);
      applyShopFilters();
    });

    var shopSearch = $("[data-shop-search]");
    if (shopSearch) shopSearch.addEventListener("input", function () { shopState.query = shopSearch.value; applyShopFilters(); });

    var toggleBtn = $("[data-filters-toggle]");
    var panel = $(".filters-panel");
    if (toggleBtn && panel) toggleBtn.addEventListener("click", function () { panel.classList.add("is-open"); $(".scrim").classList.add("is-visible"); });
  }

  // ---------------------------------------------------------------------
  // Product detail page
  // ---------------------------------------------------------------------
  function renderProductDetail(p) {
    document.title = p.name + " — TWR900";
    var metaDesc = $('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", p.shortDescription);

    $$("[data-pdp-cat]").forEach(function (el) { el.textContent = p.categoryLabel; el.setAttribute("href", "tienda.html?categoria=" + p.category); });
    $$("[data-pdp-title]").forEach(function (el) { el.textContent = p.name; });
    $$("[data-pdp-rating]").forEach(function (el) { el.innerHTML = starsHTML(p.rating, p.reviewCount); });
    $$("[data-pdp-price]").forEach(function (el) {
      el.innerHTML = "<span>" + fmtPrice(p.price) + "</span>" + (p.compareAtPrice ? '<span class="price-old">' + fmtPrice(p.compareAtPrice) + "</span>" : "");
    });
    $$("[data-pdp-short]").forEach(function (el) { el.textContent = p.shortDescription; });
    $$("[data-pdp-description]").forEach(function (el) { el.textContent = p.description; });
    $$("[data-pdp-shipping]").forEach(function (el) { el.textContent = p.shipping; });
    $$("[data-pdp-features]").forEach(function (el) { el.innerHTML = p.features.map(function (f) { return "<li>" + icon("check") + "<span>" + escHTML(f) + "</span></li>"; }).join(""); });

    var state = { color: p.colors[0], size: null };

    function paintGallery() {
      $$("[data-pdp-media]").forEach(function (el) { el.innerHTML = bootSVG(state.color.palette, { alt: p.name }); });
    }
    paintGallery();

    var colorsWrap = $("[data-pdp-colors]");
    if (colorsWrap) {
      colorsWrap.innerHTML = p.colors.map(function (c, i) {
        return '<button type="button" class="pdp-color-btn' + (i === 0 ? " is-active" : "") + '" data-color-id="' + c.id + '"><span class="dot" style="background:' + swatchBg(c) + '"></span>' + escHTML(c.name) + "</button>";
      }).join("");
      colorsWrap.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-color-id]");
        if (!btn) return;
        $$(".pdp-color-btn", colorsWrap).forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var chosen = null;
        p.colors.forEach(function (c) { if (c.id === btn.getAttribute("data-color-id")) chosen = c; });
        state.color = chosen || state.color;
        paintGallery();
      });
    }

    var sizesWrap = $("[data-pdp-sizes]");
    if (sizesWrap) {
      sizesWrap.innerHTML = p.sizes.map(function (s) { return '<button type="button" class="pdp-size-btn" data-size-btn="' + s + '">' + s + "</button>"; }).join("");
      sizesWrap.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-size-btn]");
        if (!btn) return;
        $$(".pdp-size-btn", sizesWrap).forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        state.size = +btn.getAttribute("data-size-btn");
        var err = $("[data-pdp-size-error]"); if (err) err.textContent = "";
      });
    }

    var addBtn = $("[data-pdp-add]");
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        if (!state.size) {
          var err = $("[data-pdp-size-error]");
          if (err) err.textContent = "Selecciona una talla antes de continuar.";
          return;
        }
        addToCart(p.id, state.color.id, state.size, 1);
        showToast(p.name + " añadida al carrito");
      });
    }
    var wishBtn = $("[data-pdp-wishlist]");
    if (wishBtn) {
      wishBtn.setAttribute("data-wishlist", p.id);
      syncToggleButtons();
    }

    // reviews
    var reviews = pickReviews(p);
    var revList = $("[data-pdp-reviews]");
    if (revList) {
      revList.innerHTML = reviews.map(function (r) {
        return (
          '<div class="review-item">' +
          '<div class="review-head">' + avatarHTML(r.name) + '<div><div class="review-name">' + escHTML(r.name) + '</div><div class="review-date">' + r.date + "</div></div></div>" +
          "<div>" + starsHTML(r.rating) + "</div>" +
          '<div class="review-title">' + escHTML(r.title) + "</div>" +
          '<div class="review-body">' + escHTML(r.body) + "</div>" +
          "</div>"
        );
      }).join("");
    }
    $$("[data-pdp-review-score]").forEach(function (el) { el.textContent = p.rating.toFixed(1); });
    $$("[data-pdp-review-count]").forEach(function (el) { el.textContent = p.reviewCount + " valoraciones"; });

    // related products
    var related = allProducts().filter(function (o) { return o.category === p.category && o.id !== p.id; }).slice(0, 3);
    var relWrap = $("[data-mount='related']");
    if (relWrap) { relWrap.innerHTML = related.map(productCardHTML).join(""); bindReveal(relWrap); }

    // thumbs
    $$(".pdp-thumb").forEach(function (t, i) { t.classList.toggle("is-active", i === 0); t.innerHTML = bootSVG(state.color.palette, { alt: p.name }); });
    var mainMedia = $(".pdp-main-media");
    $$(".pdp-thumb").forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        $$(".pdp-thumb").forEach(function (t) { t.classList.remove("is-active"); });
        thumb.classList.add("is-active");
      });
    });
    if (mainMedia) mainMedia.addEventListener("click", function () { mainMedia.classList.toggle("is-zoomed"); });
  }

  function mountProductDetail() {
    var root = $("[data-page-product]");
    if (!root) return;
    var slug = qs("slug");
    var p = (slug && findProduct(slug)) || allProducts()[0];
    if (!p) return;
    renderProductDetail(p);
  }

  // ---------------------------------------------------------------------
  // Wishlist / compare pages
  // ---------------------------------------------------------------------
  function mountWishlistPage() {
    var wrap = $("[data-mount='wishlist']");
    var empty = $("[data-wishlist-empty]");
    if (!wrap) return;
    var ids = getWishlist();
    var items = ids.map(findProduct).filter(Boolean);
    wrap.innerHTML = items.map(productCardHTML).join("");
    bindReveal(wrap);
    if (empty) empty.classList.toggle("hidden", items.length > 0);
  }

  function mountComparePage() {
    var wrap = $("[data-mount='compare']");
    if (!wrap) return;
    var ids = getCompare();
    var items = ids.map(findProduct).filter(Boolean);
    var empty = $("[data-compare-empty]");
    var tableWrap = $("[data-compare-table-wrap]");
    if (!items.length) {
      if (empty) empty.classList.remove("hidden");
      if (tableWrap) tableWrap.classList.add("hidden");
      return;
    }
    if (empty) empty.classList.add("hidden");
    if (tableWrap) tableWrap.classList.remove("hidden");

    var rows = [
      { label: "Imagen", render: function (p) { return '<div style="width:90px">' + bootSVG(p.colors[0].palette, { alt: p.name }) + "</div>"; } },
      { label: "Modelo", render: function (p) { return '<a href="producto.html?slug=' + p.slug + '"><strong>' + escHTML(p.name) + "</strong></a>"; } },
      { label: "Colección", render: function (p) { return escHTML(p.categoryLabel); } },
      { label: "Precio", render: function (p) { return fmtPrice(p.price); } },
      { label: "Valoración", render: function (p) { return p.rating.toFixed(1) + " ★ (" + p.reviewCount + ")"; } },
      { label: "Tallas", render: function (p) { return p.sizes[0] + "–" + p.sizes[p.sizes.length - 1]; } },
      { label: "Colores", render: function (p) { return p.colors.map(function (c) { return c.name; }).join(", "); } },
      { label: "Características", render: function (p) { return "<ul>" + p.features.slice(0, 4).map(function (f) { return "<li>" + escHTML(f) + "</li>"; }).join("") + "</ul>"; } },
      { label: "", render: function (p) { return '<a class="btn btn-primary btn-sm" href="producto.html?slug=' + p.slug + '">Ver ficha</a>'; } }
    ];
    var html = '<table class="compare-table"><tbody>';
    rows.forEach(function (row) {
      html += "<tr><th>" + escHTML(row.label) + "</th>" + items.map(function (p) { return "<td>" + row.render(p) + "</td>"; }).join("") + "</tr>";
    });
    html += "</tbody></table>";
    wrap.innerHTML = html;
  }

  function mountHeroBoot() {
    var wrap = $("[data-hero-boot]");
    if (!wrap || wrap.dataset.mounted) return;
    var palette = (data.palettes && data.palettes.voltage) || null;
    wrap.innerHTML = bootSVG(palette, { alt: "Bota Asics TWR900 Voltage" });
    wrap.dataset.mounted = "1";
  }

  function mountRings() {
    $$(".hero-rings, .cat-rings, .mat-rings").forEach(function (el) {
      if (el.dataset.ringsMounted) return;
      el.innerHTML = matRingsSVG({ stroke: el.classList.contains("cat-rings") ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.16)" });
      el.dataset.ringsMounted = "1";
    });
  }

  // ---------------------------------------------------------------------
  // Reveal on scroll (IntersectionObserver, gotcha-safe)
  // ---------------------------------------------------------------------
  var revealObserver = null;
  function bindReveal(scope) {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); }
        });
      }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    }
    $$(".reveal", scope).forEach(function (el) { if (!el.classList.contains("is-visible")) revealObserver.observe(el); });
  }
  function initReveals() {
    bindReveal(document);
    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      });
    }, 6000);
  }

  // ---------------------------------------------------------------------
  // Hero parallax + entrance (GSAP if available, otherwise CSS-only reveal)
  // ---------------------------------------------------------------------
  function initHeroMotion() {
    var hero = $(".hero");
    if (!hero) return;
    var boot = $(".hero-boot-wrap", hero);
    var glow = $(".hero-glow", hero);
    var rings = $(".hero-rings", hero);

    if (window.gsap) {
      var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-meta", { opacity: 0, y: 16, duration: .7 })
        .from(".hero-title", { opacity: 0, y: 34, duration: .9 }, "-=0.45")
        .from(".hero-sub", { opacity: 0, y: 24, duration: .8 }, "-=0.55")
        .from(".hero-actions", { opacity: 0, y: 20, duration: .7 }, "-=0.5")
        .from(".hero-stats", { opacity: 0, y: 20, duration: .7 }, "-=0.5")
        .from(".hero-boot-wrap", { opacity: 0, x: 40, duration: 1.1 }, "-=0.9");

      if (window.ScrollTrigger && !reduced) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(boot, { y: 60, scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } });
        gsap.to(glow, { y: -40, scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } });
      }
    } else {
      $$(".hero-meta, .hero-title, .hero-sub, .hero-actions, .hero-stats").forEach(function (el) { el.style.opacity = 1; });
    }
  }

  // ---------------------------------------------------------------------
  // Mobile menu / accordion / tabs / carousel / newsletter / forms
  // ---------------------------------------------------------------------
  function initAccordion() {
    $$(".accordion-item").forEach(function (item) {
      var trigger = $(".accordion-trigger", item);
      var panel = $(".accordion-panel", item);
      if (!trigger || !panel) return;
      trigger.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        $$(".accordion-item").forEach(function (other) {
          other.classList.remove("is-open");
          $(".accordion-panel", other).style.maxHeight = "";
        });
        if (!isOpen) { item.classList.add("is-open"); panel.style.maxHeight = panel.scrollHeight + "px"; }
      });
    });
  }

  function initTabs() {
    $$(".tab-list").forEach(function (list) {
      var btns = $$(".tab-btn", list);
      btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var target = btn.getAttribute("data-tab");
          btns.forEach(function (b) { b.classList.remove("is-active"); });
          btn.classList.add("is-active");
          $$(".tab-panel").forEach(function (panel) { panel.classList.toggle("is-active", panel.getAttribute("data-tab-panel") === target); });
        });
      });
    });
  }

  function initCarousel() {
    $$("[data-carousel]").forEach(function (carousel) {
      var track = $(".testimonial-track", carousel);
      var prev = $("[data-carousel-prev]", carousel);
      var next = $("[data-carousel-next]", carousel);
      if (!track) return;
      function step(dir) {
        var card = $(".testimonial-card", track);
        var amount = card ? card.getBoundingClientRect().width + 22 : 300;
        track.scrollBy({ left: dir * amount, behavior: reduced ? "auto" : "smooth" });
      }
      if (prev) prev.addEventListener("click", function () { step(-1); });
      if (next) next.addEventListener("click", function () { step(1); });
    });
  }

  function initNewsletter() {
    $$("[data-newsletter-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.reportValidity()) return;
        var success = $("[data-newsletter-success]", form.parentElement) || $("[data-newsletter-success]");
        if (success) success.classList.add("is-visible");
        form.reset();
      });
    });
  }

  function initContactForm() {
    var form = $("[data-contact-form]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      $("[data-contact-success]").classList.remove("hidden");
      form.reset();
    });
  }

  function initAuthTabs() {
    var tabs = $$(".auth-tab");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("is-active"); });
        tab.classList.add("is-active");
        $$(".auth-panel").forEach(function (p) { p.classList.toggle("is-active", p.getAttribute("data-auth-panel") === tab.getAttribute("data-auth-tab")); });
      });
    });
    $$("[data-auth-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.reportValidity()) return;
        showToast("¡Bienvenido a TWR900!");
      });
    });
  }

  // ---------------------------------------------------------------------
  // Checkout
  // ---------------------------------------------------------------------
  function initCheckout() {
    var root = $("[data-page-checkout]");
    if (!root) return;
    var summaryWrap = $("[data-checkout-summary]");
    var lines = cartLines();
    if (summaryWrap) {
      if (!lines.length) {
        summaryWrap.innerHTML = '<p class="text-mute">Tu carrito está vacío. <a href="tienda.html" style="text-decoration:underline">Ir a la tienda →</a></p>';
      } else {
        summaryWrap.innerHTML = lines.map(function (l) {
          return '<div class="order-summary-item"><span>' + escHTML(l.product.name) + " (" + escHTML(l.color.name) + ", talla " + l.size + ") ×" + l.qty + "</span><span>" + fmtPrice(l.lineTotal) + "</span></div>";
        }).join("");
      }
    }
    var subtotal = cartSubtotal();
    var shipping = subtotal >= 80 || subtotal === 0 ? 0 : 4.95;
    $$("[data-checkout-subtotal]").forEach(function (el) { el.textContent = fmtPrice(subtotal); });
    $$("[data-checkout-shipping]").forEach(function (el) { el.textContent = shipping === 0 ? "Gratis" : fmtPrice(shipping); });
    $$("[data-checkout-total]").forEach(function (el) { el.textContent = fmtPrice(subtotal + shipping); });

    $$(".pay-method").forEach(function (btn) {
      btn.addEventListener("click", function () {
        $$(".pay-method").forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        $$("[data-pay-fields]").forEach(function (f) { f.classList.add("hidden"); });
        var fields = $('[data-pay-fields="' + btn.getAttribute("data-pay") + '"]');
        if (fields) fields.classList.remove("hidden");
      });
    });

    var form = $("[data-checkout-form]");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!lines.length) return;
        if (!form.reportValidity()) return;
        var orderNum = "TWR" + Math.floor(100000 + Math.random() * 899999);
        var numEl = $("[data-order-number]");
        if (numEl) numEl.textContent = "#" + orderNum;
        $("[data-checkout-form-wrap]").classList.add("hidden");
        $("[data-order-confirm]").classList.remove("hidden");
        setCart([]);
      });
    }
  }

  // ---------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------
  function boot() {
    safe(initTheme, "initTheme");
    safe(initNav, "initNav");
    safe(initDrawers, "initDrawers");
    safe(initSearch, "initSearch");
    safe(initCommerceEvents, "initCommerceEvents");
    safe(mountFeatured, "mountFeatured");
    safe(mountHeroBoot, "mountHeroBoot");
    safe(initShop, "initShop");
    safe(mountProductDetail, "mountProductDetail");
    safe(mountWishlistPage, "mountWishlistPage");
    safe(mountComparePage, "mountComparePage");
    safe(initCheckout, "initCheckout");
    safe(initAccordion, "initAccordion");
    safe(initTabs, "initTabs");
    safe(initCarousel, "initCarousel");
    safe(initNewsletter, "initNewsletter");
    safe(initContactForm, "initContactForm");
    safe(initAuthTabs, "initAuthTabs");
    safe(renderCartDrawer, "renderCartDrawer");
    safe(updateCartBadge, "updateCartBadge");
    safe(updateWishBadge, "updateWishBadge");
    safe(syncToggleButtons, "syncToggleButtons");
    safe(updateCompareBar, "updateCompareBar");
    safe(initReveals, "initReveals");
    safe(mountRings, "mountRings");
    safe(initHeroMotion, "initHeroMotion");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
