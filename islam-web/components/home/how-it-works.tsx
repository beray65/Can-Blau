import {
  LayoutGridIcon,
  LanguagesIcon,
  StarIcon,
  HistoryIcon,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/layout/reveal";

type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    title: "Elige una sección",
    description: "Explora el Corán, los hadices o las duas.",
    icon: LayoutGridIcon,
  },
  {
    title: "Lee árabe y traducción",
    description: "Texto original, transliteración y traducción en el mismo lugar.",
    icon: LanguagesIcon,
  },
  {
    title: "Guarda tus favoritos",
    description: "Marca las aleyas, hadices y duas que quieras volver a leer.",
    icon: StarIcon,
  },
  {
    title: "Sigue tu progreso",
    description: "Retoma la lectura justo donde la dejaste.",
    icon: HistoryIcon,
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <Reveal className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">
          Cómo funciona
        </p>
        <h2 className="font-display text-3xl font-semibold text-balance">
          Aprender aquí, paso a paso
        </h2>
      </Reveal>

      <Reveal>
        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="pointer-events-none absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-border lg:block"
          />
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 mb-4 flex size-14 items-center justify-center rounded-full border border-border bg-card text-primary">
                <step.icon className="size-6" />
              </div>
              <span className="mb-1 font-display text-sm text-primary">
                Paso {i + 1}
              </span>
              <h3 className="mb-1.5 font-display text-lg font-semibold">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
