/**
 * Textura de grano de papel, casi imperceptible (2% opacidad), fija sobre
 * toda la página. Refuerza la sensación "biblioteca / papel" del
 * DESIGN_SYSTEM.md sin competir con el contenido ni afectar la legibilidad.
 */
export function PaperGrain() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.02] mix-blend-multiply dark:opacity-[0.035] dark:mix-blend-screen"
    >
      <filter id="paper-grain-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-grain-filter)" />
    </svg>
  );
}
