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
  // Navegación
  // -----------------------------------------------------------------
  function initNav() {
    var nav = $("[data-nav]");
    if (!nav) return;
    var onScroll = function () {
      nav.classList.toggle("is-solid", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $("[data-nav-toggle]");
    var mobile = $("[data-nav-mobile]");
    if (!toggle || !mobile) return;
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

  // -----------------------------------------------------------------
  // Scroll suave nativo para anclas
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
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 78,
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
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -3% 0px" });

    // Escalonado suave dentro de cada rejilla
    items.forEach(function (el) {
      var siblings = el.parentElement ? $$(".reveal", el.parentElement) : [];
      var i = siblings.indexOf(el);
      if (i > 0 && i < 8) el.style.transitionDelay = (i * 0.09) + "s";
      io.observe(el);
    });

    // Red de seguridad: revela lo que siga oculto a los 6 s
    setTimeout(function () {
      items.forEach(function (el) {
        if (!el.classList.contains("is-visible") &&
            el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  // -----------------------------------------------------------------
  // Contadores
  // -----------------------------------------------------------------
  function initCountUp() {
    var els = $$("[data-count-to]");
    if (!els.length || !("IntersectionObserver" in window)) return;

    var animate = function (el) {
      var target = parseFloat(el.getAttribute("data-count-to")) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduced) { el.textContent = target + suffix; return; }
      var start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      els.forEach(function (el) {
        if ((el.textContent === "0" || el.textContent === "—") &&
            el.getBoundingClientRect().top < window.innerHeight) animate(el);
      });
    }, 6000);
  }

  // -----------------------------------------------------------------
  // Foco de luz que sigue al cursor en el hero
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
        var r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
        hero.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
        spot.classList.add("is-active");
        raf = null;
      });
    });
    hero.addEventListener("mouseleave", function () { spot.classList.remove("is-active"); });
  }

  // -----------------------------------------------------------------
  // Botones magnéticos (micro-interacción de expansión física)
  // -----------------------------------------------------------------
  function initMagnetic() {
    if (!fineHover) return;
    $$("[data-magnetic]").forEach(function (el) {
      var raf = null;
      var reset = function () {
        el.style.transform = "";
      };
      el.addEventListener("mousemove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          var r = el.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
          var dy = (e.clientY - (r.top + r.height / 2)) * 0.42;
          el.style.transform = "translate3d(" + dx + "px," + dy + "px,0) scale(1.05)";
          raf = null;
        });
      });
      el.addEventListener("mouseout", function (e) {
        if (el.contains(e.relatedTarget)) return;
        reset();
      });
      el.addEventListener("blur", reset);
    });
  }

  // -----------------------------------------------------------------
  // Inclinación 3D en las tarjetas de producto
  // -----------------------------------------------------------------
  function initTilt() {
    if (!fineHover) return;
    $$("[data-tilt]").forEach(function (card) {
      var raf = null;
      card.addEventListener("mousemove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          var r = card.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            "perspective(900px) rotateX(" + (-py * 6) + "deg) rotateY(" + (px * 6) + "deg) translateY(-8px)";
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
  // Línea de tiempo: el raíl se rellena con el scroll
  // -----------------------------------------------------------------
  function initTimeline() {
    var timeline = $("[data-timeline]");
    if (!timeline) return;

    var raf = null;
    var update = function () {
      var r = timeline.getBoundingClientRect();
      var vh = window.innerHeight;
      // 0 cuando el bloque entra por abajo, 1 cuando su final pasa el centro
      var progress = (vh * 0.72 - r.top) / (r.height + vh * 0.12);
      timeline.style.setProperty("--fill", Math.max(0, Math.min(1, progress)).toFixed(3));
      raf = null;
    };
    var onScroll = function () {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  // -----------------------------------------------------------------
  // Acordeón de preguntas
  // -----------------------------------------------------------------
  function initAccordion() {
    var wrap = $("[data-accordion]");
    if (!wrap) return;
    $$(".acc-item", wrap).forEach(function (item, i) {
      var trigger = $(".acc-trigger", item);
      var panel = $(".acc-panel", item);
      panel.id = "faqPanel" + i;
      panel.setAttribute("role", "region");
      trigger.setAttribute("aria-controls", panel.id);
      trigger.addEventListener("click", function () {
        var open = item.getAttribute("data-open") === "true";
        item.setAttribute("data-open", String(!open));
        trigger.setAttribute("aria-expanded", String(!open));
        panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
      });
    });
  }

  // -----------------------------------------------------------------
  // WhatsApp / datos de contacto
  // -----------------------------------------------------------------
  function waLink(text) {
    var phone = (data.contact && data.contact.whatsapp) || "";
    return "https://wa.me/" + phone + "?text=" + encodeURIComponent(text);
  }

  function bindGenericWhatsapp() {
    var text = "Hola, me gustaría hacer un pedido de miel.";
    $$("[data-whatsapp-generic]").forEach(function (a) { a.setAttribute("href", waLink(text)); });
  }

  function bindContactInfo() {
    if (!data.contact) return;
    var wa = $("[data-contact-whatsapp]");
    if (wa) wa.textContent = data.contact.whatsappDisplay || data.contact.whatsapp;
    var email = $("[data-contact-email]");
    if (email) email.textContent = data.contact.email;
    var link = $("[data-contact-email-link]");
    if (link) link.setAttribute("href", "mailto:" + data.contact.email);
  }

  // -----------------------------------------------------------------
  // Carrito
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
    var checkout = $("[data-cart-checkout]");
    var overlay = $("[data-cart-overlay]");
    var drawer = $("[data-cart-drawer]");

    function orderMessage(ids, cart, subtotal) {
      var lines = ["Hola, quiero hacer este pedido de Acacia Dorada:", ""];
      ids.forEach(function (id) {
        var p = products[id];
        lines.push("• " + cart[id] + " × " + p.name + " — " + money(p.price * cart[id]));
      });
      lines.push("", "Subtotal: " + money(subtotal), "", "Mi dirección de envío es:");
      return lines.join("\n");
    }

    function render() {
      var cart = getCart();
      var ids = Object.keys(cart).filter(function (id) { return cart[id] > 0 && products[id]; });
      var count = ids.reduce(function (s, id) { return s + cart[id]; }, 0);
      var subtotal = ids.reduce(function (s, id) { return s + products[id].price * cart[id]; }, 0);

      if (badge) {
        badge.textContent = String(count);
        badge.classList.toggle("is-visible", count > 0);
      }
      if (fab) fab.classList.toggle("is-visible", count > 0);
      if (fabText) fabText.textContent = count > 0 ? "Ver carrito (" + count + ")" : "Ver carrito";
      if (subtotalEl) subtotalEl.textContent = money(subtotal);

      if (checkout) {
        if (count > 0) {
          checkout.removeAttribute("disabled");
          checkout.setAttribute("href", waLink(orderMessage(ids, cart, subtotal)));
        } else {
          checkout.setAttribute("disabled", "true");
          checkout.setAttribute("href", waLink("Hola, me gustaría hacer un pedido de miel."));
        }
      }

      if (!itemsWrap) return;
      if (!ids.length) {
        itemsWrap.innerHTML = "";
        if (emptyMsg) itemsWrap.appendChild(emptyMsg);
        return;
      }
      itemsWrap.innerHTML = ids.map(function (id) {
        var p = products[id];
        return '<div class="cart-line" data-id="' + escHTML(id) + '">' +
            '<span class="thumb">' +
              '<svg viewBox="0 0 160 220" aria-hidden="true">' +
                '<path class="jar-honey" d="M32,88 h96 v88 a16,16 0 0 1 -16,16 h-64 a16,16 0 0 1 -16,-16 z"/>' +
                '<path class="jar-glass-body" d="M32,62 a16,16 0 0 1 16,-16 h64 a16,16 0 0 1 16,16 v114 a16,16 0 0 1 -16,16 h-64 a16,16 0 0 1 -16,-16 z"/>' +
                '<rect x="56" y="12" width="48" height="24" rx="8" class="jar-lid"/>' +
              "</svg>" +
            "</span>" +
            "<div><h4>" + escHTML(p.name) + '</h4><p class="sub">' + cart[id] + " × " + money(p.price) + "</p></div>" +
            '<div class="cart-line-actions">' +
              '<span class="sum">' + money(p.price * cart[id]) + "</span>" +
              '<button type="button" class="cart-remove" data-remove="' + escHTML(id) + '">Quitar</button>' +
            "</div>" +
          "</div>";
      }).join("");

      $$("[data-remove]", itemsWrap).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var c = getCart();
          delete c[btn.getAttribute("data-remove")];
          saveCart(c);
          render();
        });
      });
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

    $$("[data-cart-open]").forEach(function (b) { b.addEventListener("click", openDrawer); });
    if (fab) fab.addEventListener("click", openDrawer);
    var closeBtn = $("[data-cart-close]");
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });

    var clearBtn = $("[data-cart-clear]");
    if (clearBtn) clearBtn.addEventListener("click", function () { saveCart({}); render(); });

    $$("[data-product]").forEach(function (card) {
      var id = card.getAttribute("data-id");
      var stepper = $("[data-qty]", card);
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

      var addBtn = $("[data-add]", card);
      addBtn.addEventListener("click", function () {
        var c = getCart();
        c[id] = (c[id] || 0) + qty;
        saveCart(c);
        render();

        var label = addBtn.textContent;
        addBtn.textContent = "Añadido ✓";
        addBtn.classList.add("is-added");
        showToast((products[id] ? products[id].name : "Producto") + " añadido al carrito");
        setTimeout(function () {
          addBtn.textContent = label;
          addBtn.classList.remove("is-added");
        }, 1500);
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
  // Formularios (sin backend: abren el cliente de correo)
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
      window.location.href = "mailto:" + data.contact.email +
        "?subject=" + encodeURIComponent("Consulta de " + name + " — Acacia Dorada") +
        "&body=" + encodeURIComponent(msg + "\n\n— " + name + " (" + email + ")");
    });
  }

  function initSubscribe() {
    var form = $("[data-subscribe]");
    if (!form || !data.contact) return;
    form.addEventListener("submit", function (e) {
      var input = $("input[type=email]", form);
      if (!input || !input.value.trim()) return;
      e.preventDefault();
      window.location.href = "mailto:" + data.contact.email +
        "?subject=" + encodeURIComponent("Avisadme de la próxima cosecha") +
        "&body=" + encodeURIComponent(
          "Hola, quiero que me aviséis cuando abra la próxima cosecha.\n\nMi email: " + input.value.trim());
      showToast("Abriendo tu aplicación de correo…");
      form.reset();
    });
  }

  function initFooterYear() {
    var el = $("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  // -----------------------------------------------------------------
  // Arranque
  // -----------------------------------------------------------------
  function boot() {
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initReveals, "initReveals");
    safe(initCountUp, "initCountUp");
    safe(initHeroSpotlight, "initHeroSpotlight");
    safe(initMagnetic, "initMagnetic");
    safe(initTilt, "initTilt");
    safe(initTimeline, "initTimeline");
    safe(initAccordion, "initAccordion");
    safe(bindGenericWhatsapp, "bindGenericWhatsapp");
    safe(bindContactInfo, "bindContactInfo");
    safe(initCart, "initCart");
    safe(initContactForm, "initContactForm");
    safe(initSubscribe, "initSubscribe");
    safe(initFooterYear, "initFooterYear");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
