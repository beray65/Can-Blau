(function () {
  "use strict";

  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
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
      if (window.history && history.pushState) history.pushState(null, "", id);
    });

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
     Subtle tilt on dish / gallery cards
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
     Cookie notice — shown once, dismissal remembered in
     localStorage so returning visitors don't see it again.
     ----------------------------------------------------------- */
  function initCookieNotice() {
    var notice = $("[data-cookie-notice]");
    if (!notice) return;
    var STORAGE_KEY = "tumi-cookie-ack";
    var ack;
    try { ack = window.localStorage.getItem(STORAGE_KEY); } catch (e) { ack = null; }
    if (ack) return;

    notice.hidden = false;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { notice.classList.add("is-visible"); });
    });

    var btn = $("[data-cookie-accept]", notice);
    if (btn) {
      btn.addEventListener("click", function () {
        try { window.localStorage.setItem(STORAGE_KEY, "1"); } catch (e) { /* ignore */ }
        notice.classList.remove("is-visible");
        setTimeout(function () { notice.hidden = true; }, 400);
      });
    }
  }

  /* -----------------------------------------------------------
     Boot
     ----------------------------------------------------------- */
  function boot() {
    safe(initNav, "initNav");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initReveals, "initReveals");
    safe(initCursor, "initCursor");
    safe(initTilt, "initTilt");
    safe(initMagnetic, "initMagnetic");
    safe(initCookieNotice, "initCookieNotice");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
