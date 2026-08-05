"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Revela su contenido una vez, la primera vez que entra en el viewport.
 * Solo para superficies de marketing (la home) — no envolver UI funcional
 * que el usuario visita a diario, sería una animación que estorba.
 *
 * El nodo observado por IntersectionObserver NO puede ser el mismo nodo
 * que lleva el clip-path: Chromium calcula la intersección sobre el
 * rectángulo ya recortado, así que un inset(0 0 100% 0) dejaría el área
 * en cero para siempre y el observer nunca volvería a disparar tras el
 * primer chequeo (isIntersecting se queda fijo en false). Por eso el
 * clip-path vive en un div interno y el observer vigila el envoltorio,
 * que nunca se recorta.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Retraso en ms para escalonar varios Reveal dentro del mismo bloque. */
  delay?: number;
}) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-100px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="h-full">
      <div
        style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        className={cn(
          "h-full transition-[clip-path] duration-600 ease-in-out",
          visible ? "[clip-path:inset(0_0_0%_0)]" : "[clip-path:inset(0_0_100%_0)]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
