# MindStep — Catálogo de reventa de chanclas Nike

Sitio estático (HTML + CSS + JS, sin frameworks ni build) para mostrar un catálogo
de chanclas Nike en reventa y recibir consultas por WhatsApp. No necesita backend
ni base de datos: todo el contenido se edita en dos archivos de texto.

## Ver el sitio en tu computadora

No hace falta instalar nada. Alcanza con abrir `index.html` directamente en el
navegador (doble clic), o si preferís un servidor local:

```bash
cd mindstep
python3 -m http.server 8000
```

y entrar a `http://localhost:8000`.

## Lo primero que tenés que cambiar

### 1. Tu número de WhatsApp

Abrí `js/config.js` y reemplazá `whatsappNumber` por tu número real, con código
de país, sin "+", espacios ni guiones:

```js
whatsappNumber: "5491123456789",
```

Todos los botones de "Consultar" y el botón flotante de WhatsApp usan ese número.

### 2. Los productos

Abrí `js/products.js`. Ahí están los 6 productos de ejemplo. Para cada chancla
real que quieras publicar, copiá un bloque `{ ... }` y completá:

| Campo       | Qué va                                                      |
|-------------|--------------------------------------------------------------|
| `name`      | Nombre del modelo, ej. `"Nike Victori One Slide"`            |
| `color`     | Color/detalle, ej. `"Negro / Blanco"`                        |
| `price`     | Precio en número, sin puntos ni `$`, ej. `15000`              |
| `sizes`     | Talles disponibles, ej. `[38, 39, 40, 41]`                   |
| `condition` | `"nuevo"` o `"poco-uso"`                                      |
| `image`     | Ruta a una foto real (ver siguiente punto) o `""` para usar el ícono de muestra |
| `accent`    | Número del 0 al 3, solo cambia el color de fondo del ícono de muestra |

Podés agregar o borrar productos libremente, el catálogo se genera solo a
partir de esta lista.

### 3. Fotos reales

Cuando tengas las fotos:

1. Copialas dentro de `assets/productos/` (ya existe la carpeta).
2. En el producto correspondiente de `js/products.js`, completá el campo
   `image`, por ejemplo:

   ```js
   image: "assets/productos/victori-one-negro.jpg",
   ```

Mientras `image` esté vacío (`""`), se muestra un ícono de chancla de muestra
con la etiqueta "Imagen de muestra" para que sepas cuáles te faltan.

## Otras cosas editables

- **Nombre de la tienda**: cambiá `storeName` en `js/config.js` (se usa en los
  mensajes de WhatsApp) y también el texto "MindStep"/"MIND / STEP" que aparece
  en `index.html` (nav, footer) — son búsquedas rápidas con Ctrl+F.
- **Instagram**: completá `instagramUrl` en `js/config.js` si querés linkearlo
  (por ahora no se muestra ningún ícono en el sitio; avisame si querés que
  agregue el botón).
- **Frases de la barra de confianza** ("Productos originales", "Coordinamos
  entrega o envío", etc.) en `index.html`, sección `trust-bar`: son textos de
  ejemplo, ajustalos a como trabajás realmente vos.

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
