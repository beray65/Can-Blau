# Arab Dream Palma — notas de entrega

## Qué es esto
Rediseño completo de la web de Arab Dream Palma (gastronomía marroquí, C. de Manacor 17, Llevant, Palma). Sitio estático (HTML/CSS/JS, sin build, sin dependencias de servidor), listo para subir por FTP/gestor de archivos a Hostinger o cualquier hosting estático.

## Cómo previsualizar
Abre `index.html` haciendo doble clic, o sirve la carpeta con `python3 -m http.server 8000` y entra a `http://localhost:8000/`.

## Decisiones a confirmar con el cliente
1. **Fotografías**: no se pudieron descargar fotos de stock ni acceder al sitio Wix original (la red de esta sesión bloqueaba esos dominios). El diseño actual usa ilustración vectorial propia de estilo marroquí (arco, patrón zellige, iconos de plato) en vez de fotos. Sube fotos reales a `assets/photos/source/` cuando las tengas — hay instrucciones ahí mismo.
2. **Número de WhatsApp**: se usó el teléfono público de Google Maps (871 85 55 20), que tiene formato de fijo. Confirma que ese número tiene WhatsApp activo; si no, dame el número de móvil correcto y actualizo `lib/manifest.js` (campo `contact.whatsapp`).
3. **Instagram / Facebook**: no se encontraron enlaces oficiales. Los iconos del footer están en `index.html` (buscar el comentario `TODO cliente`) apuntando a `#` — sustitúyelos por las URLs reales.
4. **Carta y precios**: los platos y precios son una selección orientativa (basada en reseñas reales de clientes y platos típicos marroquíes), no la carta oficial del restaurante. Está marcado en la propia web ("Selección orientativa..."). Edítalo en `lib/manifest.js` y en las tarjetas de `index.html` (sección `#carta`) cuando tengas la carta real.
5. **Email de contacto**: se usó un email de ejemplo (`hola@arabdreampalma.es`) — sustitúyelo por el real en el footer de `index.html`.

## Datos verificados (no inventados)
Dirección, teléfono, horario (L–S 9:00–22:00, domingo cerrado) y valoración de Google (4,6★, 367 reseñas) proceden de capturas reales de Google Maps aportadas por el cliente.

## Estructura
```
index.html        página única con ancla a cada sección
styles.css        todo el diseño (tokens de color arriba del todo)
main.js           interacciones (IIFE, sin dependencias de build)
lib/manifest.js   datos de marca — edítalo para cambiar textos/precios/contacto
lib/gsap.min.js, lib/ScrollTrigger.min.js   animaciones de scroll
assets/img/       ilustraciones SVG propias
assets/photos/source/   pon aquí fotos reales cuando las tengas
.htaccess         cabeceras de caché para Hostinger (ya configurado)
```

## Antes de cada redeploy
Si cambias `styles.css` o `main.js`, sube el número de versión `?v=20260723` en `index.html` (las dos líneas `<link>`/`<script>` correspondientes) para evitar que el navegador sirva la versión antigua en caché.
