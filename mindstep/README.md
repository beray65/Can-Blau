# MindStep — Catálogo de reventa de chanclas Nike

Sitio estático (HTML + CSS + JS, sin frameworks ni build) para mostrar un catálogo
de chanclas Nike en reventa y recibir consultas por WhatsApp. No necesita backend
ni base de datos: todo el contenido se edita en dos archivos de texto.

## Ver el sitio en tu ordenador

No hace falta instalar nada. Alcanza con abrir `index.html` directamente en el
navegador (doble clic), o si prefieres un servidor local:

```bash
cd mindstep
python3 -m http.server 8000
```

y entrar a `http://localhost:8000`.

## Lo primero que tienes que cambiar

### 1. Tu número de WhatsApp

Abre `js/config.js` y reemplaza `whatsappNumber` por tu número real, con código
de país, sin "+", espacios ni guiones:

```js
whatsappNumber: "34600000000",
```

Todos los botones de "Consultar" y el botón flotante de WhatsApp usan ese número.

### 2. Los productos

Abrí `js/products.js`. Ahí están tus 3 Nike Mind (Negro/Gris/Rojo) con precio
y talles placeholder. Para cada producto, completa:

| Campo       | Qué va                                                      |
|-------------|--------------------------------------------------------------|
| `name`      | Nombre del modelo, ej. `"Nike Mind"`                          |
| `color`     | Color/detalle, ej. `"Negro"`                                 |
| `price`     | Precio en número, sin puntos ni símbolo, ej. `55`             |
| `sizes`     | Talles disponibles, ej. `[38, 39, 40, 41]`                   |
| `condition` | `"nuevo"` o `"poco-uso"`                                      |
| `images`    | Lista de rutas a fotos reales (ver siguiente punto) o `[]` para usar el ícono de muestra |
| `accent`    | Número del 0 al 3, solo cambia el color de fondo del ícono de muestra |

Puedes agregar o borrar productos libremente, el catálogo se genera solo a
partir de esta lista.

### 3. Fotos reales

Cuando tengas las fotos:

1. Cópialas dentro de `assets/productos/` (ya existe la carpeta).
2. En el producto correspondiente de `js/products.js`, completa el campo
   `images` con una o varias rutas, por ejemplo:

   ```js
   images: [
     "assets/productos/nike-mind-negro-1.jpg",
     "assets/productos/nike-mind-negro-2.jpg",
   ],
   ```

Si cargas más de una foto por producto, en la card aparecen puntitos para
pasar de una a otra. Mientras `images` esté vacío (`[]`), se muestra un
ícono de chancla de muestra con la etiqueta "Imagen de muestra" para que
sepas a cuáles les faltan fotos.

**Importante sobre subir fotos en el chat**: si me las pegas directamente en
el mensaje, a veces no me quedan accesibles como archivo para copiarlas al
proyecto. Si ves que no las agrego, prueba adjuntarlas como archivo (botón de
adjuntar/clip) en lugar de pegarlas.

## Otras cosas editables

- **Nombre de la tienda**: cambia `storeName` en `js/config.js` (se usa en los
  mensajes de WhatsApp) y también el texto "MindStep"/"MIND / STEP" que aparece
  en `index.html` (nav, footer) — son búsquedas rápidas con Ctrl+F.
- **Instagram**: completa `instagramUrl` en `js/config.js` si quieres enlazarlo
  (por ahora no se muestra ningún ícono en el sitio; avísame si quieres que
  agregue el botón).
- **Frases de la barra de confianza** ("Productos originales", "Coordinamos
  entrega o envío", etc.) en `index.html`, sección `trust-bar`: son textos de
  ejemplo, ajústalos a cómo trabajas realmente tú.

## Publicar el sitio gratis

Cualquiera de estas opciones funciona sin cambiar nada de código:

- **GitHub Pages**: en la configuración del repositorio, activar Pages
  apuntando a la carpeta `mindstep/`.
- **Netlify** o **Vercel**: crear un proyecto nuevo apuntando a este
  repositorio y configurar `mindstep/` como carpeta raíz de publicación
  (no requieren comando de build).

## Nota legal

MindStep es un nombre de tienda para reventa independiente, no una tienda
oficial de Nike. El footer del sitio ya incluye una aclaración de que no hay
afiliación con Nike, Inc. — no la borres, protege tanto a tu negocio como a
tus clientes de confusiones.
