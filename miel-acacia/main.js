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
  var money = function (n) {
    return n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  };
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  var CART_KEY = "acaciaDorada.cart";

  // -----------------------------------------------------------------
  // Splash
  // -----------------------------------------------------------------
  function initSplash() {
    var splash = $("[data-splash]");
    if (!splash) return;
    var hide = function () { splash.classList.add("is-out"); };
    if (document.readyState === "complete") setTimeout(hide, 500);
    else window.addEventListener("load", function () { setTimeout(hide, 350); });
    setTimeout(hide, 3200);
  }

  // -----------------------------------------------------------------
  // Nav
  // -----------------------------------------------------------------
  function initNav() {
    var nav = $("[data-nav]");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add("is-solid");
      else nav.classList.remove("is-solid");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $("[data-nav-toggle]");
    var mobile = $("[data-nav-mobile]");
    if (toggle && mobile) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        mobile.classList.toggle("is-open", !open);
        document.body.style.overflow = !open ? "hidden" : "";
      });
      $$("a", mobile).forEach(function (a) {
        a.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");
          mobile.classList.remove("is-open");
          document.body.style.overflow = "";
        });
      });
    }
  }

  // -----------------------------------------------------------------
  // Smooth anchor scroll (native)
  // -----------------------------------------------------------------
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 76;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navOffset,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  // -----------------------------------------------------------------
  // Reveal on scroll
  // -----------------------------------------------------------------
  function initReveals() {
    var items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    items.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      items.forEach(function (el) {
        if (!el.classList.contains("is-visible") && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  // -----------------------------------------------------------------
  // Count-up stats
  // -----------------------------------------------------------------
  function initCountUp() {
    var els = $$("[data-count-to]");
    if (!els.length || !("IntersectionObserver" in window)) return;
    var animate = function (el) {
      var target = parseFloat(el.getAttribute("data-count-to")) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduced) { el.textContent = target + suffix; return; }
      var start = null;
      var duration = 1100;
      var step = function (ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      els.forEach(function (el) {
        if (el.textContent === "0" || el.textContent === "—") {
          if (el.getBoundingClientRect().top < window.innerHeight) animate(el);
        }
      });
    }, 6000);
  }

  // -----------------------------------------------------------------
  // Hero cursor spotlight
  // -----------------------------------------------------------------
  function initHeroSpotlight() {
    if (!fineHover) return;
    var hero = $("[data-hero]");
    var spot = $("[data-hero-spotlight]");
    if (!hero || !spot) return;
    var raf = null;
    hero.addEventListener("mousemove", function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var rect = hero.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty("--mx", x + "%");
        hero.style.setProperty("--my", y + "%");
        spot.classList.add("is-active");
        raf = null;
      });
    });
    hero.addEventListener("mouseleave", function () {
      spot.classList.remove("is-active");
    });
  }

  // -----------------------------------------------------------------
  // Tilt on product cards
  // -----------------------------------------------------------------
  function initTilt() {
    if (!fineHover) return;
    $$("[data-tilt]").forEach(function (card) {
      var raf = null;
      card.addEventListener("mousemove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          var rect = card.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width - 0.5;
          var py = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = "perspective(700px) rotateX(" + (-py * 7) + "deg) rotateY(" + (px * 7) + "deg) translateY(-4px)";
          raf = null;
        });
      });
      card.addEventListener("mouseout", function (e) {
        if (card.contains(e.relatedTarget)) return;
        card.style.transform = "";
      });
    });
  }

  // -----------------------------------------------------------------
  // FAQ accordion
  // -----------------------------------------------------------------
  function initAccordion() {
    var wrap = $("[data-accordion]");
    if (!wrap) return;
    $$(".accordion-item", wrap).forEach(function (item, i) {
      var trigger = $(".accordion-trigger", item);
      var panel = $(".accordion-panel", item);
      var panelId = "faqPanel" + i;
      panel.id = panelId;
      trigger.setAttribute("aria-controls", panelId);
      panel.setAttribute("role", "region");
      trigger.addEventListener("click", function () {
        var isOpen = item.getAttribute("data-open") === "true";
        item.setAttribute("data-open", String(!isOpen));
        trigger.setAttribute("aria-expanded", String(!isOpen));
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : "0px";
      });
    });
  }

  // -----------------------------------------------------------------
  // WhatsApp helpers
  // -----------------------------------------------------------------
  function waLink(text) {
    var phone = (data.contact && data.contact.whatsapp) || "";
    return "https://wa.me/" + phone + "?text=" + encodeURIComponent(text);
  }

  function bindGenericWhatsapp() {
    var links = $$("[data-whatsapp-generic]");
    if (!links.length) return;
    var text = "Hola, me gustaría hacer un pedido de miel de acacia.";
    links.forEach(function (a) { a.setAttribute("href", waLink(text)); });
  }

  function bindContactInfo() {
    var wa = $("[data-contact-whatsapp]");
    if (wa && data.contact) wa.textContent = data.contact.whatsappDisplay || data.contact.whatsapp;
    var email = $("[data-contact-email]");
    if (email && data.contact) email.textContent = data.contact.email;
    var emailLink = $("[data-contact-email-link]");
    if (emailLink && data.contact) emailLink.setAttribute("href", "mailto:" + data.contact.email);
  }

  // -----------------------------------------------------------------
  // Cart
  // -----------------------------------------------------------------
  function getCart() {
    try {
      var raw = window.localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveCart(cart) {
    try { window.localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  function initCart() {
    var products = {};
    $$("[data-product]").forEach(function (card) {
      var id = card.getAttribute("data-id");
      products[id] = {
        id: id,
        name: card.getAttribute("data-name"),
        price: parseFloat(card.getAttribute("data-price"))
      };
    });

    var itemsWrap = $("[data-cart-items]");
    var emptyMsg = $("[data-cart-empty]");
    var subtotalEl = $("[data-cart-subtotal]");
    var badge = $("[data-cart-badge]");
    var fab = $("[data-cart-fab]");
    var fabText = $("[data-cart-fab-text]");
    var checkoutBtn = $("[data-cart-checkout]");
    var overlay = $("[data-cart-overlay]");
    var drawer = $("[data-cart-drawer]");

    function totalCount(cart) {
      return Object.keys(cart).reduce(function (sum, id) { return sum + cart[id]; }, 0);
    }

    function render() {
      var cart = getCart();
      var ids = Object.keys(cart).filter(function (id) { return cart[id] > 0 && products[id]; });
      var count = totalCount(cart);
      var subtotal = ids.reduce(function (sum, id) { return sum + products[id].price * cart[id]; }, 0);

      if (badge) {
        badge.textContent = String(count);
        badge.classList.toggle("is-visible", count > 0);
      }
      if (fab) fab.classList.toggle("is-visible", count > 0);
      if (fabText) fabText.textContent = count > 0 ? "Ver carrito (" + count + ")" : "Ver carrito";
      if (subtotalEl) subtotalEl.textContent = money(subtotal);
      if (checkoutBtn) {
        if (count > 0) {
          checkoutBtn.removeAttribute("disabled");
          checkoutBtn.setAttribute("href", waLink(buildOrderMessage(ids, cart, subtotal)));
        } else {
          checkoutBtn.setAttribute("disabled", "true");
          checkoutBtn.setAttribute("href", waLink("Hola, me gustaría hacer un pedido de miel de acacia."));
        }
      }

      if (!itemsWrap) return;
      if (!ids.length) {
        itemsWrap.innerHTML = "";
        itemsWrap.appendChild(emptyMsg || document.createTextNode(""));
        return;
      }
      itemsWrap.innerHTML = ids.map(function (id) {
        var p = products[id];
        var qty = cart[id];
        return (
          '<div class="cart-item" data-cart-line data-id="' + escHTML(id) + '">' +
            '<svg class="cart-item-jar" viewBox="0 0 120 160" aria-hidden="true">' +
              '<rect x="22" y="58" width="76" height="84" rx="10" class="jar-fill"/>' +
              '<rect x="18" y="34" width="84" height="112" rx="14" class="jar-glass"/>' +
              '<rect x="34" y="10" width="52" height="18" rx="5" class="jar-lid"/>' +
            "</svg>" +
            '<div><h4>' + escHTML(p.name) + '</h4><span class="price-line">' + qty + ' × ' + money(p.price) + '</span></div>' +
            '<div class="cart-item-actions">' +
              '<span class="price-line">' + money(p.price * qty) + '</span>' +
              '<button type="button" class="cart-item-remove" data-remove="' + escHTML(id) + '">Quitar</button>' +
            "</div>" +
          "</div>"
        );
      }).join("");

      $$("[data-remove]", itemsWrap).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var cart = getCart();
          delete cart[btn.getAttribute("data-remove")];
          saveCart(cart);
          render();
        });
      });
    }

    function buildOrderMessage(ids, cart, subtotal) {
      var lines = ["Hola, quiero hacer este pedido de Acacia Dorada:", ""];
      ids.forEach(function (id) {
        var p = products[id];
        lines.push("• " + cart[id] + " × " + p.name + " — " + money(p.price * cart[id]));
      });
      lines.push("", "Subtotal: " + money(subtotal), "", "Mi dirección de envío es:");
      return lines.join("\n");
    }

    function addToCart(id, qty) {
      var cart = getCart();
      cart[id] = (cart[id] || 0) + qty;
      saveCart(cart);
      render();
    }

    function openDrawer() {
      if (overlay) overlay.classList.add("is-open");
      if (drawer) drawer.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function closeDrawer() {
      if (overlay) overlay.classList.remove("is-open");
      if (drawer) drawer.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    $$("[data-cart-open]").forEach(function (btn) { btn.addEventListener("click", openDrawer); });
    if (fab) fab.addEventListener("click", openDrawer);
    var closeBtn = $("[data-cart-close]");
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });

    var clearBtn = $("[data-cart-clear]");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        saveCart({});
        render();
      });
    }

    // Product cards: qty stepper + add to cart
    $$("[data-product]").forEach(function (card) {
      var id = card.getAttribute("data-id");
      var stepper = $("[data-qty-stepper]", card);
      var valueEl = $("[data-qty-value]", stepper);
      var qty = 1;
      $("[data-qty-minus]", stepper).addEventListener("click", function () {
        qty = Math.max(1, qty - 1);
        valueEl.textContent = String(qty);
      });
      $("[data-qty-plus]", stepper).addEventListener("click", function () {
        qty = Math.min(20, qty + 1);
        valueEl.textContent = String(qty);
      });
      var addBtn = $("[data-add-to-cart]", card);
      addBtn.addEventListener("click", function () {
        addToCart(id, qty);
        var original = addBtn.textContent;
        addBtn.textContent = "Añadido ✓";
        addBtn.classList.add("is-added");
        showToast((products[id] && products[id].name || "Producto") + " añadido al carrito");
        setTimeout(function () {
          addBtn.textContent = original;
          addBtn.classList.remove("is-added");
        }, 1400);
      });
    });

    render();
  }

  function showToast(msg) {
    var toast = $("[data-toast]");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toast.classList.remove("is-visible"); }, 2400);
  }

  // -----------------------------------------------------------------
  // Contact form -> mailto
  // -----------------------------------------------------------------
  function initContactForm() {
    var form = $("[data-contact-form]");
    if (!form || !data.contact) return;
    form.addEventListener("submit", function (e) {
      var name = $("#cf-name", form).value.trim();
      var email = $("#cf-email", form).value.trim();
      var msg = $("#cf-msg", form).value.trim();
      if (!name || !email || !msg) return;
      e.preventDefault();
      var subject = "Consulta de " + name + " — Acacia Dorada";
      var body = msg + "\n\n— " + name + " (" + email + ")";
      window.location.href = "mailto:" + data.contact.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  // -----------------------------------------------------------------
  // Footer year
  // -----------------------------------------------------------------
  function initFooterYear() {
    var el = $("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  // -----------------------------------------------------------------
  // Boot
  // -----------------------------------------------------------------
  function boot() {
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initReveals, "initReveals");
    safe(initCountUp, "initCountUp");
    safe(initHeroSpotlight, "initHeroSpotlight");
    safe(initTilt, "initTilt");
    safe(initAccordion, "initAccordion");
    safe(bindGenericWhatsapp, "bindGenericWhatsapp");
    safe(bindContactInfo, "bindContactInfo");
    safe(initCart, "initCart");
    safe(initContactForm, "initContactForm");
    safe(initFooterYear, "initFooterYear");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
