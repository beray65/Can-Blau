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

  /* ---------------------------------------------------------
     Splash — double safety net (CSS animation + JS)
     --------------------------------------------------------- */
  function initSplash() {
    var splash = $("[data-splash]");
    if (!splash) return;
    var hide = function () { splash.classList.add("is-out"); };
    if (document.readyState === "complete") setTimeout(hide, 450);
    else window.addEventListener("load", function () { setTimeout(hide, 350); });
    setTimeout(hide, 2800);
  }

  /* ---------------------------------------------------------
     Nav — solidify on scroll + mobile fullscreen menu
     --------------------------------------------------------- */
  function initNav() {
    var nav = $("[data-nav]");
    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 60) nav.classList.add("is-scrolled");
        else nav.classList.remove("is-scrolled");
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    var toggle = $("[data-nav-toggle]");
    var mobile = $("[data-nav-mobile]");
    if (!toggle || !mobile) return;
    var close = function () {
      toggle.setAttribute("aria-expanded", "false");
      mobile.setAttribute("data-open", "false");
      mobile.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    var open = function () {
      toggle.setAttribute("aria-expanded", "true");
      mobile.setAttribute("data-open", "true");
      mobile.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) close(); else open();
    });
    $$(".nav-mobile-link, .nav-mobile-phone", mobile).forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------------------------------------------------------
     Smooth anchor scrolling (native, offset for fixed nav)
     --------------------------------------------------------- */
  function initAnchorScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 74;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navOffset,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ---------------------------------------------------------
     Reveal on scroll — threshold low + 6s safety net
     --------------------------------------------------------- */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    if (typeof IntersectionObserver === "undefined") {
      els.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }
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

  /* ---------------------------------------------------------
     Split text (words) — preserves <br>
     --------------------------------------------------------- */
  function splitWords(el) {
    el.setAttribute("aria-label", el.textContent.trim().replace(/\s+/g, " "));
    var wrap = function (text) {
      return text.split(/(\s+)/).map(function (w) {
        return /^\s+$/.test(w) ? w : '<span class="split-word" aria-hidden="true">' + escHTML(w) + "</span>";
      }).join("");
    };
    var html = Array.prototype.map.call(el.childNodes, function (node) {
      if (node.nodeType === 3) return wrap(node.textContent);
      if (node.nodeName === "BR") return "<br>";
      if (node.nodeType === 1) {
        var tag = node.tagName.toLowerCase();
        return "<" + tag + ">" + wrap(node.textContent) + "</" + tag + ">";
      }
      return "";
    }).join("");
    el.innerHTML = html;
    return $$(".split-word", el);
  }

  function initSplitText() {
    var els = $$("[data-split]");
    if (!els.length) return;
    els.forEach(function (el) {
      var parts = splitWords(el);
      if (window.gsap) {
        gsap.set(parts, { y: 22, opacity: 0 });
        gsap.to(parts, {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.045, ease: "expo.out", delay: 0.15
        });
      } else {
        parts.forEach(function (p) { p.style.opacity = 1; });
      }
    });
  }

  /* ---------------------------------------------------------
     Tilt 3D subtle (max 7deg) — cards only, fine pointer only
     --------------------------------------------------------- */
  function initTilt() {
    if (!fineHover) return;
    $$(".dish").forEach(function (card) {
      var MAX = 6;
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tx = -py * MAX; ty = px * MAX;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      card.addEventListener("mouseout", function (e) {
        if (card.contains(e.relatedTarget)) return;
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      function loop() {
        cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
        card.style.setProperty("--rx", cx.toFixed(2) + "deg");
        card.style.setProperty("--ry", cy.toFixed(2) + "deg");
        raf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  /* ---------------------------------------------------------
     Count-up numbers
     --------------------------------------------------------- */
  function initCountUp() {
    var els = $$("[data-count-to]");
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    els.forEach(function (el) {
      var target = parseFloat(el.dataset.countTo);
      var decimals = (el.dataset.countTo.split(".")[1] || "").length;
      var trigger = function () {
        if (window.gsap) {
          var obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 1.3, ease: "power2.out",
            onUpdate: function () { el.textContent = obj.v.toFixed(decimals); }
          });
        } else {
          el.textContent = target.toFixed(decimals);
        }
      };
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { trigger(); io.unobserve(e.target); } });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------
     Carta — category filter
     --------------------------------------------------------- */
  function initCartaFilter() {
    var buttons = $$("[data-filter]");
    var dishes = $$(".dish");
    if (!buttons.length || !dishes.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.dataset.filter;
        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        dishes.forEach(function (dish) {
          var show = cat === "all" || dish.dataset.category === cat;
          dish.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* ---------------------------------------------------------
     Open / closed status from real hours (brand.hours)
     --------------------------------------------------------- */
  function initOpenStatus() {
    var el = $("[data-open-status]");
    if (!el || !data.hours) return;
    var now = new Date();
    var day = now.getDay();
    var minutesNow = now.getHours() * 60 + now.getMinutes();
    var toMinutes = function (hhmm) {
      var parts = hhmm.split(":");
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    };
    var isOpenDay = data.hours.openDays.indexOf(day) !== -1;
    var isOpenNow = isOpenDay && minutesNow >= toMinutes(data.hours.open) && minutesNow < toMinutes(data.hours.close);
    el.textContent = isOpenNow ? "Abierto ahora" : "Cerrado ahora";
    el.classList.toggle("is-open", isOpenNow);
  }

  /* ---------------------------------------------------------
     WhatsApp links — build from real number + message
     --------------------------------------------------------- */
  function initWhatsAppLinks() {
    if (!data.contact || !data.contact.whatsapp) return;
    var msg = encodeURIComponent(data.contact.whatsappMessage || "Hola, me gustaría reservar mesa.");
    var url = "https://wa.me/" + data.contact.whatsapp + "?text=" + msg;
    $$("[data-whatsapp-link]").forEach(function (a) { a.setAttribute("href", url); });
  }

  /* ---------------------------------------------------------
     Footer year
     --------------------------------------------------------- */
  function initFooterYear() {
    var el = $("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------
     Hero arch subtle parallax
     --------------------------------------------------------- */
  function initHeroParallax() {
    if (!window.gsap || !window.ScrollTrigger || reduced) return;
    var arch = $(".hero-arch");
    if (!arch) return;
    gsap.to(arch, {
      yPercent: 18, opacity: 0.05, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  }

  function boot() {
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initAnchorScroll, "initAnchorScroll");
    safe(initReveals, "initReveals");
    safe(initSplitText, "initSplitText");
    safe(initTilt, "initTilt");
    safe(initCountUp, "initCountUp");
    safe(initCartaFilter, "initCartaFilter");
    safe(initOpenStatus, "initOpenStatus");
    safe(initWhatsAppLinks, "initWhatsAppLinks");
    safe(initFooterYear, "initFooterYear");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_e) {}
      safe(initHeroParallax, "initHeroParallax");
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
