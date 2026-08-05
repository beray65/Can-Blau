# Sistema de diseño

Traducción a tokens implementables del brief visual ya definido. Donde el
brief no especificaba un valor, lo indico como inferido — revísalo antes de
darlo por bueno.

## Filosofía

Paz, conocimiento, claridad, elegancia, confianza, simplicidad,
espiritualidad, modernidad. Mucho espacio en blanco, nada sobrecargado,
animaciones lentas. El fondo nunca es blanco puro.

## Tokens de color

Nombrados para encajar directo con las variables que espera shadcn/ui.

```css
/* Modo claro */
:root {
  --background: #FAFAF8;
  --foreground: #1F2937;
  --card: #FFFFFF;
  --card-foreground: #1F2937;
  --primary: #0F766E;        /* verde esmeralda */
  --primary-foreground: #FFFFFF;
  --secondary: #DFF6F2;      /* verde muy claro */
  --secondary-foreground: #0F766E;
  --muted: #DFF6F2;
  --muted-foreground: #6B7280;
  --accent: #D4AF37;         /* dorado — solo decorativo, ver Accesibilidad */
  --accent-foreground: #1F2937;
  --border: #E5E7EB;
  --success: #16A34A;
  --destructive: #DC2626;
  --radius: 1.125rem;        /* 18px, sube a 20px en tarjetas grandes */
}

/* Modo oscuro */
.dark {
  --background: #0B1120;
  --foreground: #F8FAFC;
  --card: #111827;
  --card-foreground: #F8FAFC;
  --primary: #10B981;
  --primary-foreground: #0B1120;
  --secondary: #111827;      /* inferido */
  --secondary-foreground: #F8FAFC;
  --muted: #1F2937;           /* inferido */
  --muted-foreground: #9CA3AF; /* inferido */
  --accent: #D4AF37;
  --accent-foreground: #0B1120;
  --border: #1F2937;          /* inferido */
  --success: #16A34A;
  --destructive: #DC2626;
}
```

Implementadas en `app/globals.css`, con extras inferidos que exige
shadcn/ui (`--popover`, `--input`, `--ring`, `--destructive-foreground`) —
marcados igual como inferidos ahí.

## Tipografía

| Rol | Fuente | Uso |
| --- | --- | --- |
| Encabezados (H1–H3) | Cormorant Garamond | Serif, sensación de libro clásico |
| Cuerpo / UI | Inter | Texto general, botones, navegación |
| Árabe (aleyas, duas, hadices) | Amiri | Solo en el texto árabe, nunca en toda la página |

Todo bloque de texto árabe va envuelto con `dir="rtl" lang="ar"` y
`className="font-arabic"`, aislado del resto del layout, que sigue en
español LTR.

```ts
// app/layout.tsx — next/font/google
import { Cormorant_Garamond, Inter, Amiri } from 'next/font/google'
const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['500','600','700'], variable: '--font-display' })
const body = Inter({ subsets: ['latin'], variable: '--font-body' })
const arabic = Amiri({ subsets: ['arabic'], weight: ['400','700'], variable: '--font-arabic' })
```

## Componentes (mapeados a shadcn/ui)

- **Tarjeta (`Card`)**: fondo `--card`, `rounded-[18px]` a `[20px]`, sombra
  muy ligera. Hover: sube 4px (`-translate-y-1`), sombra algo mayor, borde
  verde muy fino (`border-primary/20`), transición 250ms.
- **Botón primario** (`Button variant="default"`): fondo `--primary`, texto
  blanco.
- **Botón secundario** (`Button variant="outline"`): fondo blanco/`--card`,
  borde, texto oscuro.
- **Buscador**: grande, muy redondeado, icono de lupa a la izquierda,
  placeholder "Busca una sura, un hadiz o un tema…" — usar `Command` de
  shadcn si quieres resultados con teclado, o `Input` + icono si basta con
  una página de resultados.
- **Iconografía**: solo iconos lineales (stroke), nunca rellenos ni emoji —
  `lucide-react` encaja directo con shadcn y ya cumple esto por defecto.

## Especificaciones por página

- **Inicio** — Hero con imagen muy difuminada (mezquita al amanecer / patrón
  geométrico casi transparente / cielo dorado) y degradado suave encima.
  Titular "Aprende el Islam desde sus fuentes auténticas", subtítulo sobre
  Corán/hadices/conocimiento accesible. Botón verde "Comenzar a aprender" +
  botón blanco "Leer el Corán". Debajo, cuadrícula de tarjetas (Corán,
  Hadices, Duas, Horarios, Audio, Biblioteca), cada una con icono, título,
  descripción y botón.
- **Sura individual** — Número, nombre en árabe, nombre en español, número de
  aleyas, lugar de revelación, botón reproducir, barra de progreso. Debajo
  por aleya: árabe, traducción, transliteración (opcional/toggle), notas del
  usuario, botón compartir, marcar favorita.
- **Hadices** — Filtros por libro, tema y grado. Cada hadiz: título, texto,
  referencia, grado, botón copiar, botón compartir.
- **Biblioteca** — Categorías (aqidah, fiqh, tafsir, sirah, historia, ética,
  Ramadán, oración). Cada libro: portada, descripción, autor, leer,
  descargar (solo si la licencia lo permite).
- **Footer** — Muy limpio: logo, la frase "¿Acaso no reflexionan sobre el
  Corán?", enlaces rápidos, contacto, política de privacidad.

## Animación

Fade-in al aparecer, scroll muy suave, hover elegante, nada por debajo de
~200ms ni movimientos bruscos. La tarjeta usa 250ms como referencia general.
Respeta siempre `prefers-reduced-motion` — desactiva o reduce las animaciones
no esenciales para quien lo tenga activado a nivel de sistema.

## Patrones geométricos

Patrones geométricos islámicos muy sutiles (5–8% de opacidad) en algunas
secciones de fondo, nunca sobre el texto ni compitiendo con él.

## Accesibilidad (no negociable)

- Dorado (`--accent #D4AF37`) sobre fondos claros no cumple contraste AA
  para texto. Resérvalo para bordes, iconos y detalles decorativos — nunca
  para texto de lectura sobre `--background` o `--card`.
- El gris cálido (`--muted-foreground #6B7280`) es válido para texto
  secundario, pero no lo uses por debajo de 14px.
- Mantén visible el anillo de foco de teclado en todo elemento interactivo
  (Radix/shadcn ya lo trae por defecto — no lo quites con `outline-none` sin
  sustituto).
- Mobile-first, sin scroll horizontal, objetivos táctiles de al menos
  44×44px.
