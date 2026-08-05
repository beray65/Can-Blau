import Link from "next/link";
import { ArrowRightIcon, BookCheckIcon, QuoteIcon, ShieldCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GeometricPattern } from "@/components/layout/geometric-pattern";

const trustSignals = [
  { icon: QuoteIcon, label: "Cada fuente citada" },
  { icon: ShieldCheckIcon, label: "Contenido revisado" },
  { icon: BookCheckIcon, label: "Sin publicidad" },
];

export function Hero({ locale }: { locale: string }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--secondary)_0%,_var(--background)_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_color-mix(in_srgb,var(--accent)_18%,transparent)_0%,_transparent_55%)]"
      />
      <GeometricPattern />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center sm:py-32">
        <h1 className="animate-in fade-in slide-in-from-bottom-2 duration-700 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Aprende el Islam desde sus fuentes auténticas
        </h1>
        <p className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150 max-w-xl text-lg text-muted-foreground text-balance">
          El Corán completo, hadices de las colecciones principales y
          conocimiento islámico accesible, citando siempre su fuente.
        </p>
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={`/${locale}/coran`}>
              Comenzar a aprender
              <ArrowRightIcon />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={`/${locale}/coran`}>Leer el Corán</Link>
          </Button>
        </div>

        <ul className="animate-in fade-in duration-700 delay-500 mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {trustSignals.map((signal) => (
            <li key={signal.label} className="flex items-center gap-1.5">
              <signal.icon className="size-4 text-primary" aria-hidden />
              {signal.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
