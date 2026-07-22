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
     Flythrough — scroll-pinned 3D depth effect (progressive
     enhancement over the plain static grid in the CSS default state)
     ----------------------------------------------------------- */
  function initFlythrough() {
    var region = $("[data-fly-region]");
    var pin = $("[data-fly-pin]");
    var stage = $("[data-fly-stage]");
    if (!region || !pin || !stage) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    region.classList.add("fly-active");
    var items = $$("[data-fly-item]", stage);
    if (!items.length) return;
    var FAR = 1600;
    var raf = null;

    function cssVarPx(el, name) {
      var n = parseFloat(getComputedStyle(el).getPropertyValue(name));
      return isNaN(n) ? 0 : n;
    }

    function update() {
      raf = null;
      var rect = region.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      if (total <= 0) return;
      var progress = Math.min(1, Math.max(0, -rect.top / total));
      var n = items.length;
      items.forEach(function (el, i) {
        var peak = (i + 0.5) / n;
        var win = 1.3 / n;
        var local = Math.max(-1, Math.min(1, (progress - peak) / win));
        var z = -Math.abs(local) * FAR;
        var op = 1 - Math.abs(local);
        var x = cssVarPx(el, "--x");
        var y = cssVarPx(el, "--y");
        el.style.transform = "translate(-50%,-50%) translate3d(" + x + "px," + y + "px," + z + "px)";
        el.style.opacity = op.toFixed(3);
        el.style.pointerEvents = op > 0.5 ? "auto" : "none";
      });
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(update); }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* -----------------------------------------------------------
     Hero shader — ambient WebGL "smoke" in the brand's cream/gold
     tones, layered over .hero-mesh (which stays as the always-on
     fallback background). Skips entirely without WebGL or under
     prefers-reduced-motion, leaving .hero-mesh exactly as it was.
     ----------------------------------------------------------- */
  function initHeroShader() {
    var canvas = $("[data-hero-shader]");
    if (!canvas || !canvas.getContext) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;

    var VERT = "attribute vec2 a_position;\n" +
      "void main() {\n" +
      "  gl_Position = vec4(a_position, 0.0, 1.0);\n" +
      "}";

    var FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[8];
uniform vec4 u_scene;
uniform vec4 u_shape;
uniform vec4 u_surface;
uniform vec4 u_finish;
uniform vec4 u_transform;
uniform vec4 u_space;
uniform vec4 u_cursor;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
#define u_seed mod(u_transform.x, 31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy

float hash21(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 srgbToLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
}
vec3 linearToSrgb(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}
vec3 linToOklab(vec3 c) {
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
  l = pow(max(l, 0.0), 1.0 / 3.0);
  m = pow(max(m, 0.0), 1.0 / 3.0);
  s = pow(max(s, 0.0), 1.0 / 3.0);
  return vec3(
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s);
}
vec3 oklabToLin(vec3 c) {
  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  l = l * l * l; m = m * m * m; s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);
}
vec3 mixColour(vec3 a, vec3 b, float t) {
  if (u_oklab > 0.5) {
    vec3 la = linToOklab(srgbToLinear(a));
    vec3 lb = linToOklab(srgbToLinear(b));
    return clamp(linearToSrgb(oklabToLin(mix(la, lb, t))), 0.0, 1.0);
  }
  return mix(a, b, t);
}

vec3 palette(float x) {
  float n = max(u_colorCount - 1.0, 1.0);
  float f = clamp(x, 0.0, 1.0) * n;
  vec3 col = u_colors[0];
  for (int i = 0; i < 7; i++) {
    if (float(i) < n)
      col = mixColour(col, u_colors[i + 1], smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
  }
  return col;
}

vec3 hueRotate(vec3 col, float a) {
  const mat3 toYIQ = mat3(0.299, 0.596, 0.211, 0.587, -0.274, -0.523, 0.114, -0.322, 0.312);
  const mat3 toRGB = mat3(1.0, 1.0, 1.0, 0.956, -0.272, -1.106, 0.621, -0.647, 1.703);
  vec3 yiq = toYIQ * col;
  float ca = cos(a), sa = sin(a);
  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);
  return toRGB * yiq;
}

vec3 shade(vec2 uv, vec2 p, float t) {
  float warp = 2.0 + u_intensity * 4.0;
  vec2 q = vec2(fbm(p + t * 0.08), fbm(p + vec2(5.2, 1.3) - t * 0.06));
  vec2 r = vec2(fbm(p + warp * q + vec2(1.7, 9.2)), fbm(p + warp * q + vec2(8.3, 2.8)));
  return palette(fbm(p + 3.0 * r + u_seed));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 screenUv = uv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
  p *= u_scale;
  if (abs(u_rotate) > 0.0001) {
    float cr = cos(u_rotate), sr = sin(u_rotate);
    p = mat2(cr, -sr, sr, cr) * p;
  }
  p += u_offset;
  if (u_drift > 0.0001)
    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));
  if (u_warp > 0.0) {
    p += u_warp * (vec2(fbm(p * u_detail + u_seed), fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  }
  vec3 col;
  if (u_blur > 0.0) {
    float e = u_blur;
    float pe = e * u_scale;
    vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;
    col  = shade(uv, p, u_time) * 0.36;
    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;
    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;
  } else {
    col = shade(uv, p, u_time);
  }
  if (abs(u_contrast - 1.0) > 0.0001)
    col = (col - 0.5) * u_contrast + 0.5;
  if (abs(u_saturation - 1.0) > 0.0001) {
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, u_saturation);
  }
  if (abs(u_hue) > 0.0001)
    col = hueRotate(col, u_hue);
  if (abs(u_brightness) > 0.0001)
    col += u_brightness;
  if (u_vignette > 0.0001) {
    float vd = length(screenUv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
  }
  if (u_grain > 0.0001)
    col += (grainHash(gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

    function compile(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    var program = gl.createProgram();
    var vs = compile(gl.VERTEX_SHADER, VERT);
    var fs = compile(gl.FRAGMENT_SHADER, FRAG);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.useProgram(program);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    var uni = {
      colors: gl.getUniformLocation(program, "u_colors"),
      scene: gl.getUniformLocation(program, "u_scene"),
      shape: gl.getUniformLocation(program, "u_shape"),
      surface: gl.getUniformLocation(program, "u_surface"),
      finish: gl.getUniformLocation(program, "u_finish"),
      transform: gl.getUniformLocation(program, "u_transform"),
      space: gl.getUniformLocation(program, "u_space"),
      cursor: gl.getUniformLocation(program, "u_cursor")
    };

    // Maison Suzi palette: cream -> cream-2 -> gold-2 -> gold -> back to cream-2,
    // so the field always stays light and warm instead of drifting dark.
    var COLORS = new Float32Array([
      0.980, 0.965, 0.937,
      0.945, 0.902, 0.827,
      0.851, 0.714, 0.404,
      0.561, 0.392, 0.145,
      0.945, 0.902, 0.827,
      0.945, 0.902, 0.827,
      0.945, 0.902, 0.827,
      0.945, 0.902, 0.827
    ]);
    var COLOR_COUNT = 5;
    var TIME_SCALE = 0.22;

    gl.uniform3fv(uni.colors, COLORS);
    gl.uniform4f(uni.shape, 1.6, 0.5, 0.5, 0);          // scale, intensity, paramA, warp
    gl.uniform4f(uni.surface, 2.0, 1.05, 0.03, 0.9);    // detail, contrast, brightness, saturation
    gl.uniform4f(uni.finish, 0, 0.08, 0, 0.004);        // hue, vignette, blur, grain
    gl.uniform4f(uni.transform, 4021.0, 0, 0.15, 1);    // seed, rotate, drift, oklab
    gl.uniform4f(uni.space, 0, 0, 0, 0);
    gl.uniform4f(uni.cursor, 0, 0, 0, 0);

    var raf = 0, visible = document.visibilityState === "visible", inView = true, disposed = false;
    var start = performance.now();
    var bounds = canvas.getBoundingClientRect();

    function resizeCanvas() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(1, Math.round(bounds.width * dpr));
      var h = Math.max(1, Math.round(bounds.height * dpr));
      var budget = Math.min(1, Math.sqrt(2000000 / Math.max(1, w * h)));
      w = Math.max(1, Math.round(w * budget));
      h = Math.max(1, Math.round(h * budget));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }
    function requestRender() {
      if (!disposed && visible && inView && raf === 0) raf = requestAnimationFrame(render);
    }
    function updateLayout() {
      bounds = canvas.getBoundingClientRect();
      resizeCanvas();
      requestRender();
    }
    window.addEventListener("resize", updateLayout);
    var resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(canvas);
    var io = new IntersectionObserver(function (entries) {
      var entry = entries[0];
      inView = entry ? entry.isIntersecting : true;
      if (inView) requestRender();
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", function () {
      visible = document.visibilityState === "visible";
      if (visible) requestRender();
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    });

    function render(now) {
      raf = 0;
      if (disposed || !visible || !inView) return;
      resizeCanvas();
      gl.uniform4f(uni.scene, canvas.width, canvas.height, ((now - start) / 1000) * TIME_SCALE, COLOR_COUNT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      requestRender();
    }

    updateLayout();
    canvas.classList.add("is-active");
    requestRender();
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
    safe(initHeroShader, "initHeroShader");
    safe(initFlythrough, "initFlythrough");
    safe(initReveals, "initReveals");
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
