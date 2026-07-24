# Arab Dream Palma — notas de entrega

## Qué es esto
Rediseño completo de la web de Arab Dream Palma (gastronomía marroquí, C. de Manacor 17, Llevant, Palma). Sitio estático (HTML/CSS/JS, sin build, sin dependencias de servidor), listo para subir por FTP/gestor de archivos a Hostinger o cualquier hosting estático.

## Cómo previsualizar
Abre `index.html` haciendo doble clic, o sirve la carpeta con `python3 -m http.server 8000` y entra a `http://localhost:8000/`.

## Decisiones a confirmar con el cliente
1. **Fotografías**: no se pudieron descargar fotos de stock ni acceder al sitio Wix original (la red de esta sesión bloqueaba esos dominios). El diseño actual usa ilustración vectorial propia de estilo marroquí (arco, patrón zellige, iconos de plato) en vez de fotos. Sube fotos reales a `assets/photos/source/` cuando las tengas — hay instrucciones ahí mismo.
2. **Número de WhatsApp**: se usó el teléfono público de Google Maps (871 85 55 20), que tiene formato de fijo. Confirma que ese número tiene WhatsApp activo; si no, dame el número de móvil correcto y actualizo `lib/manifest.js` (campo `contact.whatsapp`).
3. **Instagram / Facebook**: no se encontraron enlaces oficiales. Los iconos del footer están en `index.html` (buscar el comentario `TODO cliente`) apuntando a `#` — sustitúyelos por las URLs reales.
4. **Carta y precios**: ya es la carta real que me pasaste (Comida, Bebidas, Dulces, Salados — 170 referencias). Un par de nombres tenían erratas evidentes de tecleo y los corregí (p. ej. "Aquarius", "Sprite", "Nestea", "Cappuccino", "pimientos", "Polvorones", "Lumpia", "Poleo menta"); revísalos por si alguno no era realmente un typo. "Harira completa" la completé como "(con huevo y chebakia)" tal cual me la pasaste — si lleva algo más (dátiles, etc.) dímelo y lo actualizo. Para cambiar cualquier plato o precio, edita `tools/menu-data.mjs` y corre `node tools/generate-carta.mjs` para regenerar la sección `#carta` de `index.html` (no la edites a mano, se sobrescribe).
5. **Email de contacto**: actualizado al real, `arabdream.ny@gmail.com`.

## Datos verificados (no inventados)
Dirección, teléfono, horario (L–S 9:00–22:00, domingo cerrado), valoración de Google (4,6★, 367 reseñas) y email de contacto proceden de datos reales aportados por el cliente.

## Alternativa de estilo (mockup, no publicada)
`mockup-vintage-paper.html` es una segunda propuesta visual (paleta amarillo suave/beige/terracota/dorado/zafiro, textura de papel envejecido) hecha para comparar con el diseño principal. Es un único archivo autocontenido con fotos de Unsplash de marcador de posición — no sustituye a `index.html`, es solo para decidir dirección de estilo.

## Estructura
```
index.html        página única con ancla a cada sección
styles.css        todo el diseño (tokens de color arriba del todo)
main.js           interacciones (IIFE, sin dependencias de build)
lib/manifest.js   datos de marca — contacto, horario, testimonios
lib/gsap.min.js, lib/ScrollTrigger.min.js   animaciones de scroll
tools/menu-data.mjs        la carta real (edítala aquí)
tools/generate-carta.mjs   regenera la sección #carta de index.html a partir de menu-data.mjs
assets/img/       ilustraciones SVG propias
assets/photos/source/   pon aquí fotos reales cuando las tengas
.htaccess         cabeceras de caché para Hostinger (ya configurado)
```

Para actualizar la carta: edita `tools/menu-data.mjs` y ejecuta `node tools/generate-carta.mjs` desde la carpeta `arab-dream/`.

## Antes de cada redeploy
Si cambias `styles.css` o `main.js`, sube el número de versión `?v=20260723` en `index.html` (las dos líneas `<link>`/`<script>` correspondientes) para evitar que el navegador sirva la versión antigua en caché.
