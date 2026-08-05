# Nur — web de aprendizaje del Islam en español

Ver `CLAUDE.md` para el brief completo del proyecto y el roadmap de fases, y
`DESIGN_SYSTEM.md` para los tokens visuales.

## Estado

Fase 1 del roadmap: estructura base, layout, tema claro/oscuro y clientes de
Supabase listos. Todavía no hay datos (Corán, hadices, duas) ni un proyecto
Supabase real conectado.

## Getting Started

```bash
npm install
cp .env.example .env.local   # rellena las claves cuando tengas un proyecto Supabase
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — redirige a `/es`.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript + Tailwind CSS v4
- shadcn/ui (Radix), escrito a mano en `components/ui/` porque el registro
  `ui.shadcn.com` no es alcanzable desde este entorno de desarrollo
- Supabase (`lib/supabase/`) + `proxy.ts` (el `middleware.ts` de Next 16)
- next-themes

## Próximos pasos (ver `CLAUDE.md`)

1. Crear un proyecto Supabase, ejecutar `supabase/schema.sql` y rellenar
   `.env.local`.
2. Escribir `scripts/ingest-quran.ts` contra Al Quran Cloud y construir
   `coran/page.tsx` + `coran/[surah]/page.tsx`.
3. Horarios de oración / Qibla vía AlAdhan.
4. Favoritos, progreso de lectura y notas (requieren Auth ya en pie).
