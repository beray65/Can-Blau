(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var escHTML = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* -----------------------------------------------------------
     Icon set — inline line-art SVGs, matched to product.icon
     ----------------------------------------------------------- */
  var ICONS = {
    "cheesecake": '<svg viewBox="0 0 28 28" width="30" height="30"><path d="M4 20c0-6 4.5-10 10-10s10 4 10 10" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M4 20h20" stroke="currentColor" stroke-width="1.3"/><path d="M9 20c0-3.5 2.2-6 5-6s5 2.5 5 6" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="14" cy="9" r="1.6" fill="currentColor"/></svg>',
    "layer-cake": '<svg viewBox="0 0 28 28" width="30" height="30"><rect x="6" y="16" width="16" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="7.5" y="10" width="13" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="5" width="10" height="5" rx="1" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="14" cy="3.2" r="1.1" fill="currentColor"/></svg>',
    "cookie": '<svg viewBox="0 0 28 28" width="30" height="30"><circle cx="14" cy="14" r="10" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="10.5" cy="11" r="1.1" fill="currentColor"/><circle cx="16" cy="10" r="1" fill="currentColor"/><circle cx="17.5" cy="15.5" r="1.1" fill="currentColor"/><circle cx="11.5" cy="17" r="1" fill="currentColor"/></svg>',
    "eclair": '<svg viewBox="0 0 28 28" width="30" height="30"><rect x="3" y="12" width="22" height="7" rx="3.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M6 12c1-2 3-2 4 0" stroke="currentColor" stroke-width="1"/><circle cx="19" cy="10.5" r="1" fill="currentColor"/><circle cx="16" cy="9.8" r="1" fill="currentColor"/></svg>',
    "cup": '<svg viewBox="0 0 28 28" width="30" height="30"><path d="M8 10h12l-2 12H10L8 10Z" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M8 10h12" stroke="currentColor" stroke-width="1.3"/><circle cx="14" cy="7" r="2.2" fill="none" stroke="currentColor" stroke-width="1"/></svg>',
    "tiramisu": '<svg viewBox="0 0 28 28" width="30" height="30"><path d="M9 9h10l-1.5 14h-7L9 9Z" fill="none" stroke="currentColor" stroke-width="1.3"/><line x1="8" y1="9" x2="20" y2="9" stroke="currentColor" stroke-width="1.3"/><line x1="10.5" y1="13" x2="17.5" y2="13" stroke="currentColor" stroke-width="0.9" opacity="0.6"/><line x1="10.8" y1="17" x2="17.2" y2="17" stroke="currentColor" stroke-width="0.9" opacity="0.6"/></svg>',
    "birthday": '<svg viewBox="0 0 28 28" width="30" height="30"><rect x="5" y="14" width="18" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M5 14c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" stroke="currentColor" stroke-width="1"/><line x1="14" y1="10" x2="14" y2="6" stroke="currentColor" stroke-width="1.2"/><path d="M14 6c-1.2-1 -1.2-2.2 0-3 1.2.8 1.2 2 0 3Z" fill="currentColor"/></svg>'
  };

  var PROCESS_ICONS = [
    '<svg viewBox="0 0 28 28" width="26" height="26"><rect x="5" y="6" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="11" x2="20" y2="11" stroke="currentColor" stroke-width="1"/><line x1="8" y1="15" x2="16" y2="15" stroke="currentColor" stroke-width="1"/><path d="M8 19l2 2 4-4" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>',
    '<svg viewBox="0 0 28 28" width="26" height="26"><path d="M14 4C8 4 4 8 4 13c0 2.6 1.2 4.9 3.1 6.5L6 24l4.9-1.6c1 .3 2 .5 3.1.5 6 0 10-4 10-9s-4-9-10-9Z" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>',
    '<svg viewBox="0 0 28 28" width="26" height="26"><path d="M14 22s-8-5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-8 11-8 11-1 0-1 0-2 0Z" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>',
    '<svg viewBox="0 0 28 28" width="26" height="26"><rect x="4" y="12" width="15" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M19 15h3.2L24 18v3h-5v-6Z" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="9" cy="22.5" r="1.6" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="20" cy="22.5" r="1.6" fill="none" stroke="currentColor" stroke-width="1"/></svg>'
  ];

  /* -----------------------------------------------------------
     Idempotent mounts
     ----------------------------------------------------------- */
  function mountProducts() {
    var target = $("[data-products]");
    if (!target || target.children.length > 0 || !data.categories) return;

    var html = data.categories.map(function (cat) {
      var items = (data.products || []).filter(function (p) { return p.category === cat.id; });
      if (!items.length) return "";
      var cards = items.map(function (p) {
        var icon = ICONS[p.icon] || "";
        return (
          '<article class="card reveal" data-reveal>' +
            '<!-- REPLACE: foto real de "' + escHTML(p.name) + '" -->' +
            '<div class="card-media swatch swatch--' + escHTML(p.icon) + '">' +
              '<span class="card-icon" aria-hidden="true">' + icon + '</span>' +
            '</div>' +
            '<div class="card-body">' +
              '<h4>' + escHTML(p.name) + '</h4>' +
              '<p>' + escHTML(p.desc) + '</p>' +
            '</div>' +
          '</article>'
        );
      }).join("");
      return (
        '<div class="product-group">' +
          '<h3 class="product-group-title">' + escHTML(cat.name) + '</h3>' +
          '<div class="card-grid">' + cards + '</div>' +
        '</div>'
      );
    }).join("");

    target.innerHTML = html;
  }

  function mountProcess() {
    var target = $("[data-process]");
    if (!target || target.children.length > 0 || !data.process) return;
    target.innerHTML = data.process.map(function (step, i) {
      return (
        '<div class="process-card reveal" data-reveal>' +
          '<span class="process-icon" aria-hidden="true">' + (PROCESS_ICONS[i] || "") + '</span>' +
          '<span class="process-n">' + escHTML(step.n) + '</span>' +
          '<h3>' + escHTML(step.title) + '</h3>' +
          '<p>' + escHTML(step.desc) + '</p>' +
        '</div>'
      );
    }).join("");
  }

  /* -----------------------------------------------------------
     Nav: solidify on scroll + mobile menu
     ----------------------------------------------------------- */
  function initNav() {
    var nav = $("[data-nav]");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 60) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var burger = $("[data-nav-burger]");
    var mobile = $("[data-nav-mobile]");
    if (!burger || !mobile) return;

    var focusablesSel = 'a[href], button:not([disabled])';
    var isOpen = function () { return burger.getAttribute("aria-expanded") === "true"; };

    // The panel stays in the DOM at all times (only clip-path hides it), so its
    // links must be explicitly pulled out of tab order while closed — otherwise
    // keyboard users land on invisible focus targets.
    mobile.setAttribute("inert", "");
    $$(focusablesSel, mobile).forEach(function (el) { el.setAttribute("tabindex", "-1"); });

    var closeMenu = function (opts) {
      mobile.setAttribute("aria-hidden", "true");
      mobile.setAttribute("inert", "");
      $$(focusablesSel, mobile).forEach(function (el) { el.setAttribute("tabindex", "-1"); });
      burger.setAttribute("aria-expanded", "false");
      document.documentElement.classList.remove("nav-open");
      if (!opts || opts.returnFocus !== false) burger.focus();
    };
    var openMenu = function () {
      mobile.setAttribute("aria-hidden", "false");
      mobile.removeAttribute("inert");
      $$(focusablesSel, mobile).forEach(function (el) { el.removeAttribute("tabindex"); });
      burger.setAttribute("aria-expanded", "true");
      document.documentElement.classList.add("nav-open");
      var first = $(focusablesSel, mobile);
      if (first) first.focus();
    };

    burger.addEventListener("click", function () {
      if (isOpen()) closeMenu(); else openMenu();
    });
    $$("[data-nav-mobile-link]", mobile).forEach(function (a) {
      a.addEventListener("click", function () { closeMenu({ returnFocus: false }); });
    });

    // Escape closes the menu; Tab is trapped inside it while open.
    mobile.addEventListener("keydown", function (e) {
      if (!isOpen()) return;
      if (e.key === "Escape") { closeMenu(); return; }
      if (e.key !== "Tab") return;
      var items = $$(focusablesSel, mobile);
      if (!items.length) return;
      var firstEl = items[0], lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault(); lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault(); firstEl.focus();
      }
    });
  }

  /* -----------------------------------------------------------
     Smooth anchor scrolling (native)
     ----------------------------------------------------------- */
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 84;
      var top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: top, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      // Sync the URL so the section is bookmarkable/shareable and back/forward work,
      // without pushState itself causing a jump (it never scrolls on its own).
      if (window.history && history.pushState) history.pushState(null, "", id);
    });

    // Deep link on load: jump straight to the hash target, accounting for the fixed nav.
    if (location.hash) {
      var target = document.querySelector(location.hash);
      if (target) {
        requestAnimationFrame(function () {
          var top = target.getBoundingClientRect().top + window.scrollY - 84;
          window.scrollTo({ top: top, behavior: "auto" });
        });
      }
    }
  }

  /* -----------------------------------------------------------
     Reveal on scroll — low threshold + 6s safety net
     ----------------------------------------------------------- */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$("[data-reveal]:not(.is-revealed)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-revealed");
      });
    }, 6000);
  }

  /* -----------------------------------------------------------
     Hero background — EXPERIMENT: a real clip from Suzan's kitchen,
     heavily blurred/dimmed/desaturated, standing in for the
     "Veta Cálida" generative canvas behind the static .hero-mesh
     gradient. Plays muted/looped, pauses via IntersectionObserver
     when the hero scrolls out of view. No video support, no JS,
     or reduced-motion: opacity stays 0 and the plain gradient is
     the entire experience.
     ----------------------------------------------------------- */
  function initHeroVideo() {
    var video = $("[data-hero-video]");
    var stage = video && video.closest(".hero-art");
    if (!video || !stage) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var started = false;
    video.addEventListener("loadeddata", function () {
      if (!started) { started = true; video.classList.add("is-active"); }
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) video.play().catch(function () {});
        else video.pause();
      });
    }, { threshold: 0 });
    io.observe(stage);
  }

  /* -----------------------------------------------------------
     Custom cursor — two clean circles, hidden until first move
     ----------------------------------------------------------- */
  function initCursor() {
    if (!fineHover) return;
    var root = $("[data-cursor-root]");
    if (!root) return;
    document.documentElement.classList.add("has-cursor");
    var dot = $(".cursor-dot", root);
    var ring = $(".cursor-ring", root);
    var tx = 0, ty = 0, rx = 0, ry = 0, firstMove = false;

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (dot) dot.style.transform = "translate3d(" + tx + "px," + ty + "px,0)";
      if (!firstMove) {
        firstMove = true;
        rx = tx; ry = ty;
        if (ring) ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
        root.classList.add("is-ready");
      }
    }, { passive: true });

    function tick() {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ring) ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    var HOVERABLES = "a, button, .card, .gallery-item";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest && e.target.closest(HOVERABLES)) root.classList.add("is-interactive");
    });
    document.addEventListener("mouseout", function (e) {
      var t = e.target.closest && e.target.closest(HOVERABLES);
      if (t && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(HOVERABLES))) {
        root.classList.remove("is-interactive");
      }
    });
  }

  /* -----------------------------------------------------------
     Subtle tilt on product / gallery cards
     ----------------------------------------------------------- */
  function initTilt() {
    if (!fineHover) return;
    $$(".card, .gallery-item").forEach(function (card) {
      var MAX = 6;
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      card.classList.add("has-tilt");
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tx = -py * MAX; ty = px * MAX;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      card.addEventListener("mouseleave", function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      function loop() {
        cx += (tx - cx) * 0.15;
        cy += (ty - cy) * 0.15;
        card.style.setProperty("--rx", cx.toFixed(2) + "deg");
        card.style.setProperty("--ry", cy.toFixed(2) + "deg");
        raf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  /* -----------------------------------------------------------
     Magnetic buttons
     ----------------------------------------------------------- */
  function initMagnetic() {
    if (!fineHover) return;
    $$("[data-magnetic]").forEach(function (el) {
      var strength = parseFloat(el.dataset.magneticStrength || "0.3");
      var inner = document.createElement("span");
      inner.className = "magnetic-inner";
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
      el.classList.add("has-magnetic");
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        tx = ((e.clientX - r.left) - r.width / 2) * strength;
        ty = ((e.clientY - r.top) - r.height / 2) * strength;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      el.addEventListener("mouseleave", function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      function loop() {
        cx += (tx - cx) * 0.2;
        cy += (ty - cy) * 0.2;
        inner.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
        raf = (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  /* -----------------------------------------------------------
     Boot
     ----------------------------------------------------------- */
  function boot() {
    safe(mountProducts, "mountProducts");
    safe(mountProcess, "mountProcess");

    safe(initNav, "initNav");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initReveals, "initReveals");
    safe(initHeroVideo, "initHeroVideo");
    safe(initCursor, "initCursor");
    safe(initTilt, "initTilt");
    safe(initMagnetic, "initMagnetic");

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
