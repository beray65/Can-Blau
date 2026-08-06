import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ComingSoon({
  icon: Icon,
  title,
  description,
  phase,
  locale,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  phase: string;
  locale: string;
}) {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
        <Icon className="size-6" />
      </div>
      <h1 className="font-display text-3xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <p className="text-sm text-muted-foreground/70">{phase}</p>
      <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
        <Button asChild variant="outline">
          <Link href={`/${locale}`}>Volver al inicio</Link>
        </Button>
        <a
          href="mailto:hola@sirat.app?subject=Avísame%20cuando%20esté%20listo"
          className="text-sm text-muted-foreground underline underline-offset-4 transition-colors duration-250 hover:text-foreground"
        >
          Avísame cuando esté listo
        </a>
      </div>
    </section>
  );
}
