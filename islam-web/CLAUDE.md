@AGENTS.md

# Web de aprendizaje del Islam en español — Brief del proyecto

Contexto para Claude Code. Léelo entero antes de generar código.

## Visión

Web en español (con expansión a inglés, árabe, turco y búlgaro) para aprender
Islam desde fuentes primarias: Corán completo (árabe + transliteración +
traducción + audio), hadices de las colecciones principales, biblioteca,
horarios de oración/Qibla, duas y una sección de preguntas con respuestas
citando fuentes.

Sensación buscada: una biblioteca en calma, un patio de mezquita al amanecer —
moderna, minimalista, sin nada que distraiga del contenido. El diseño
detallado está en `DESIGN_SYSTEM.md`.

## Stack

- Next.js 16 (App Router, Turbopack) — la línea 15 ya está solo en
  mantenimiento; arrancar directo en 16.
- TypeScript
- Tailwind CSS + shadcn/ui (Radix) para componentes accesibles: Card, Dialog,
  Command, Tabs, Select, Sheet.
- Supabase (Postgres + Auth + Storage) — usuarios, favoritos, progreso de
  lectura, notas. Esquema completo en `supabase/schema.sql`.
- next-themes para modo claro/oscuro.
- Vercel para despliegue.
- Buscador: Postgres full-text search (ya viene gratis con Supabase, ver
  índices GIN en `supabase/schema.sql`) como base. Evaluar Algolia o
  Meilisearch más adelante solo si el volumen de tráfico lo justifica.

## Estructura de rutas (App Router)

```
app/
  [locale]/                      # es (default) · en · ar · tr · bg
    layout.tsx
    page.tsx                     # Inicio: qué es el Islam, 5 pilares, 6 pilares de la fe, FAQ, últimos artículos
    coran/
      page.tsx                   # listado de 114 suras + buscador
      [surah]/page.tsx           # sura: árabe, transliteración, traducción, audio, progreso
    hadices/
      page.tsx                   # selector de colección
      [coleccion]/page.tsx       # Bujari, Muslim, Riyad as-Salihin, 40 de An-Nawawi
      [coleccion]/[libro]/page.tsx
    biblioteca/
      page.tsx
      [categoria]/page.tsx       # aqidah, fiqh, sirah, tafsir, historia, ética
      [libro]/page.tsx
    horarios/
      page.tsx                   # horarios + Qibla + calendario Hijri + próximo Ramadán/Eid
    duas/
      page.tsx
      [categoria]/page.tsx       # mañana, noche, comida, viaje, entrar/salir de casa
    multimedia/
      page.tsx                   # recitadores, podcasts, conferencias, vídeos
    preguntas/
      page.tsx
      [pregunta]/page.tsx
    perfil/
      favoritos/page.tsx
      notas/page.tsx
components/
  ui/                            # shadcn
  quran/  hadith/  duas/  layout/
lib/
  supabase/                      # clientes server/client
  api/                           # wrappers de las fuentes externas (tabla abajo) — solo se usan en scripts de ingesta, no en runtime de la app
scripts/
  ingest-quran.ts
  ingest-hadith.ts
  ingest-duas.ts
supabase/
  schema.sql
```

> Nota de implementación (fase 1): `middleware.ts` se llama `proxy.ts` en
> Next.js 16 (`export function proxy`); ver el aviso en `AGENTS.md`
> generado por `next dev` antes de tocar rutas o convenciones de archivo.

## Fuentes de datos por sección

| Sección | Fuente recomendada | Acceso | Idioma | Nota |
| --- | --- | --- | --- | --- |
| Corán (árabe, traducción, transliteración, audio) | Al Quran Cloud — alquran.cloud | Gratis, sin API key | Árabe + 50+ ediciones — confirmar en `/edition` que existe una en español | Es la fuente más completa y estable para arrancar |
| Hadices (Bujari, Muslim, Riyad as-Salihin, 40 Nawawi) | sunnah.com | Requiere API key: pedirla ya abriendo un issue en `sunnah-com/api` en GitHub (proceso manual, no es inmediato) | Árabe + inglés. No hay fuente abierta fiable en español | El grading (sahih/hasan/da'if) viene incluido en los datos — nunca se genera |
| Horarios de oración / Qibla / calendario Hijri | AlAdhan — aladhan.com | Gratis, sin auth, open source (GPL-3.0) | No aplica (son cálculos) | Se puede llamar en vivo, no hace falta ingerir |
| Duas | Hisnul Muslim (Fortaleza del Musulmán, Al-Qahtani) — varios volcados JSON/CSV de la comunidad en GitHub | Gratis | Normalmente árabe/inglés. Traducción española: manual | ~267 duas — proyecto de traducción acotado, no bloqueante |
| Multimedia (recitadores, podcasts, conferencias) | Enlaces/embeds a YouTube, Spotify, o el propio CDN de audio de Al Quran Cloud | — | — | No hostear vídeo pesado tú mismo al principio |
| Preguntas ("¿Qué dice el islam sobre…?") | Redactado/revisado por una persona con formación islámica, citando aleyas/hadices ya en tu BD | — | — | Ver política de contenido más abajo |

## Arquitectura de datos: ingerir, no proxear en vivo

Para que el buscador, "continuar donde lo dejaste" y el modo offline (PWA)
funcionen, el Corán y los hadices deben vivir en tu propia base de datos, no
pedirse a una API externa en cada carga de página.

1. Los scripts en `scripts/` llaman una vez (o cuando haya actualizaciones) a
   Al Quran Cloud y sunnah.com y rellenan `surahs`, `ayahs`,
   `hadith_collections`, `hadith_books`, `hadiths`, `duas`.
2. La app en producción lee siempre de Supabase — las APIs externas no están
   en el camino crítico de ninguna petición de usuario.
3. Full-text search en español vía índices GIN sobre `ayahs.text_es` y
   `hadiths.text_es` (ya definidos en `supabase/schema.sql`).

## Fases de desarrollo (MVP primero)

1. **Estructura base + Supabase Auth + layout + tema claro/oscuro.** ✅ hecho en esta sesión (ver estado abajo).
2. Ingesta del Corán completo (114 suras) + página de sura + buscador. Esto ya
   es una web publicable.
3. Horarios de oración + Qibla + calendario Hijri (AlAdhan, en vivo).
4. Favoritos + progreso de lectura + notas.
5. Duas traducidas.
6. Hadices — empezar por los 40 de An-Nawawi (el más pequeño, ~42 hadices)
   para validar el modelo de datos antes de meter Bujari o Muslim, que son
   órdenes de magnitud más grandes.
7. Biblioteca.
8. Multimedia + Preguntas.
9. Resto de idiomas (en, ar, tr, bg) + SEO + PWA + Vercel.

### Estado actual (fase 1)

- Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui (Button, Card, Dialog,
  Command, Tabs, Select, Sheet, Input) escritos a mano porque el registro de
  `ui.shadcn.com` no es accesible desde este entorno — mismo resultado, sin
  el fetch de la CLI.
- Fuentes (Cormorant Garamond, Inter, Amiri), tokens de color claro/oscuro y
  radios de `DESIGN_SYSTEM.md` aplicados en `app/globals.css`.
- `next-themes` con toggle en el header.
- Rutas `app/[locale]/...` creadas con stubs "próximamente" para todas las
  secciones del roadmap; solo `es` está habilitado (`lib/i18n.ts`).
- Home (`/es`) con Hero, grid de secciones y pilares del Islam/de la fe ya
  maquetados con el sistema de diseño.
- Clientes de Supabase (`lib/supabase/client.ts`, `server.ts`) y refresco de
  sesión en `proxy.ts` (nombre de `middleware.ts` en Next.js 16), listos para
  cuando haya un proyecto Supabase real — de momento sin credenciales, ver
  `.env.example`.
- `supabase/schema.sql` copiado tal cual del brief.
- Pendiente explícitamente para fases siguientes: scripts de ingesta, UI de
  login/registro, páginas de detalle (sura, colección, categoría), y el
  resto de idiomas.

## Precisión de contenido — reglas no negociables

- La clasificación de hadices (sahih/hasan/da'if) se importa de la fuente;
  nunca se genera con IA.
- Las respuestas de "Preguntas" no se generan libremente con un LLM en
  producción: se escriben o revisan por alguien con formación islámica,
  citando la aleya o el hadiz exacto, y pasan por el campo `status`
  (draft/published) de `qa_questions` antes de publicarse.
- Cualquier IA usada en el proceso (por ejemplo, para un primer borrador de
  traducción) es un punto de partida para revisión humana, nunca el
  resultado final que se publica.

## Checklist de licencias antes de publicar

- Confirmar la licencia exacta de la edición de traducción del Corán usada
  (no todas permiten redistribución comercial).
- Confirmar el alcance de la licencia concedida por sunnah.com al aprobar el
  acceso a la API.
- Verificar fuente y traducción de cada dua antes de publicarla como
  definitiva.
- Citar la fuente (edición/traductor) junto a cada aleya, hadiz o dua
  mostrado en la web.
