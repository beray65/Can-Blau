import { cn } from "@/lib/utils";

/**
 * Patrón geométrico islámico (estrella de 8 puntas) muy sutil de fondo.
 * Nunca se coloca sobre texto ni compite con el contenido (5-8% opacidad).
 */
export function GeometricPattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("absolute inset-0 h-full w-full text-primary", className)}
      style={{ opacity: 0.06 }}
    >
      <defs>
        <pattern
          id="islamic-star"
          width="56"
          height="56"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1)"
        >
          <path
            d="M28 2 L34 16 L48 10 L38 22 L54 28 L38 34 L48 46 L34 40 L28 54 L22 40 L8 46 L18 34 L2 28 L18 22 L8 10 L22 16 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-star)" />
    </svg>
  );
}
