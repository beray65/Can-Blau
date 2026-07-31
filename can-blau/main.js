(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function escHTML(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); }
  }

  /* ---------------- Nav ---------------- */
  function initNav() {
    var nav = $(".nav");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var burger = $("[data-nav-burger]");
    var mobile = $("[data-nav-mobile]");
    if (!burger || !mobile) return;
    function closeMobile() {
      nav.removeAttribute("data-nav-open");
      mobile.setAttribute("data-open", "false");
      document.body.style.overflow = "";
    }
    function openMobile() {
      nav.setAttribute("data-nav-open", "true");
      mobile.setAttribute("data-open", "true");
      document.body.style.overflow = "hidden";
    }
    burger.addEventListener("click", function () {
      var isOpen = mobile.getAttribute("data-open") === "true";
      if (isOpen) closeMobile(); else openMobile();
    });
    $$("a, button", mobile).forEach(function (el) {
      el.addEventListener("click", function () {
        if (el.tagName === "A") closeMobile();
      });
    });
  }

  /* ---------------- Scroll spy (active nav link) ---------------- */
  function initScrollSpy() {
    var links = $$(".nav-link[href^='#']");
    if (!links.length) return;
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) map[id] = a;
    });
    var ids = Object.keys(map);
    if (!ids.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        if (entry.isIntersecting) {
          links.forEach(function (a) { a.classList.remove("is-active"); });
          map[id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    ids.forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* ---------------- Custom cursor ---------------- */
  function initCursor() {
    if (!fineHover || reduced) return;
    var dot = document.createElement("div");
    var ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.documentElement.classList.add("has-cursor");

    var rx = 0, ry = 0, tx = 0, ty = 0;
    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = "translate(" + tx + "px," + ty + "px)";
    });
    (function loop() {
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(loop);
    })();

    var hoverables = "a, button, [data-ba], input, textarea, select, .has-tilt";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest && e.target.closest(hoverables)) ring.classList.add("is-active");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest(hoverables)) ring.classList.remove("is-active");
    });
    document.addEventListener("mousedown", function () { ring.classList.add("is-pressed"); });
    document.addEventListener("mouseup", function () { ring.classList.remove("is-pressed"); });
    document.documentElement.addEventListener("mouseleave", function () {
      dot.style.opacity = "0"; ring.style.opacity = "0";
    });
    document.documentElement.addEventListener("mouseenter", function () {
      dot.style.opacity = "1"; ring.style.opacity = "1";
    });
  }

  /* ---------------- Magnetic buttons ---------------- */
  function initMagnetic() {
    if (!fineHover || reduced) return;
    $$(".btn-primary, .btn-ghost").forEach(function (btn) {
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 14;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 10;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      btn.addEventListener("mouseleave", function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      function loop() {
        cx += (tx - cx) * 0.25; cy += (ty - cy) * 0.25;
        btn.style.transform = "translate(" + cx.toFixed(2) + "px," + cy.toFixed(2) + "px)";
        raf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  /* ---------------- Hero parallax ---------------- */
  function initParallax() {
    if (reduced) return;
    var art = $(".hero-photo");
    var hero = $(".hero");
    if (!art || !hero) return;
    var raf = null;
    function update() {
      var r = hero.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        var p = 1 - Math.max(0, Math.min(1, r.top / window.innerHeight));
        art.style.transform = "translateY(" + (p * 34) + "px)";
      }
      raf = null;
    }
    window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    update();
  }

  /* ---------------- Smooth anchors ---------------- */
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 76;
      var top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ---------------- Scroll progress ---------------- */
  function initScrollProgress() {
    var bar = $("[data-scroll-progress]");
    if (!bar) return;
    var raf = null;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = "scaleX(" + pct + ")";
      raf = null;
    }
    window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    update();
  }

  /* ---------------- Reveal on scroll ---------------- */
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

  /* ---------------- Tilt ---------------- */
  function initTilt() {
    if (!fineHover) return;
    $$(".has-tilt").forEach(function (card) {
      var MAX = 6;
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tx = -py * MAX; ty = px * MAX;
        if (card.classList.contains("has-halo")) {
          card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
          card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
        }
        if (!raf) raf = requestAnimationFrame(loop);
      });
      card.addEventListener("mouseleave", function () {
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

  /* ---------------- Count up ---------------- */
  function initCountUp() {
    $$("[data-count-to]").forEach(function (el) {
      var target = parseFloat(el.dataset.countTo);
      if (isNaN(target)) return;
      var decimals = (el.dataset.countTo.split(".")[1] || "").length;
      var pow = Math.pow(10, decimals);
      var suffix = el.dataset.countSuffix || "";
      var duration = 1500;
      var triggered = false;
      function trigger() {
        if (triggered) return;
        triggered = true;
        if (reduced) { el.textContent = target.toLocaleString("es-ES", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix; return; }
        var start = null;
        function frame(ts) {
          if (!start) start = ts;
          var p = Math.min(1, (ts - start) / duration);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = Math.round(target * eased * pow) / pow;
          el.textContent = val.toLocaleString("es-ES", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
          if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { trigger(); io.unobserve(e.target); } });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  /* ---------------- Before / after sliders ---------------- */
  function initBeforeAfter() {
    $$("[data-ba]").forEach(function (root) {
      var range = $("[data-ba-range]", root);
      if (!range) return;
      function setPos(val) {
        root.style.setProperty("--ba-pos", val + "%");
      }
      setPos(range.value);
      range.addEventListener("input", function () { setPos(range.value); });

      // Drag directly on the media for a more tactile feel
      var dragging = false;
      function posFromClientX(clientX) {
        var r = root.getBoundingClientRect();
        var pct = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
        return pct;
      }
      root.addEventListener("pointerdown", function (e) {
        if (e.target === range) return;
        dragging = true;
        var pct = posFromClientX(e.clientX);
        range.value = pct;
        setPos(pct);
      });
      window.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        var pct = posFromClientX(e.clientX);
        range.value = pct;
        setPos(pct);
      });
      window.addEventListener("pointerup", function () { dragging = false; });
    });
  }

  /* ---------------- Contact form ---------------- */
  function initContactForm() {
    var form = $("[data-contact-form]");
    var success = $("[data-contact-success]");
    if (!form || !success) return;
    var msg = $("[data-contact-success-msg]", success);

    $$("input, textarea", form).forEach(function (field) {
      var wrap = field.closest(".field");
      if (field.value) wrap && wrap.classList.add("has-value");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.classList.contains("is-sending")) return;
      if (!form.reportValidity()) return;

      form.classList.add("is-sending");

      setTimeout(function () {
        var firstName = (form.elements.nombre && form.elements.nombre.value.trim().split(/\s+/)[0]) || "Hola";
        if (msg) msg.textContent = firstName + ", hemos recibido tu solicitud. Te contactaremos en menos de 24 horas laborables.";
        form.classList.remove("is-sending");
        form.classList.add("is-sent");
        success.setAttribute("aria-hidden", "false");
        success.classList.add("is-visible");
      }, 900);
    });
  }

  /* ---------------- Select field label state ---------------- */
  function initFloatingSelect() {
    $$(".field select").forEach(function (sel) {
      var wrap = sel.closest(".field");
      function sync() {
        if (sel.value) wrap.classList.add("has-value");
        else wrap.classList.remove("has-value");
      }
      sync();
      sel.addEventListener("change", sync);
    });
  }

  /* ---------------- Current year ---------------- */
  function initYear() {
    var el = $("[data-current-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  function boot() {
    safe(initNav, "initNav");
    safe(initScrollSpy, "initScrollSpy");
    safe(initCursor, "initCursor");
    safe(initMagnetic, "initMagnetic");
    safe(initParallax, "initParallax");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initScrollProgress, "initScrollProgress");
    safe(initReveals, "initReveals");
    safe(initTilt, "initTilt");
    safe(initCountUp, "initCountUp");
    safe(initBeforeAfter, "initBeforeAfter");
    safe(initContactForm, "initContactForm");
    safe(initFloatingSelect, "initFloatingSelect");
    safe(initYear, "initYear");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
