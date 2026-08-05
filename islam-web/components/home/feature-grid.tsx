import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/layout/reveal";
import { navItems } from "@/lib/nav";

export function FeatureGrid({ locale }: { locale: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <Reveal className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">
          Explora
        </p>
        <h2 className="font-display text-3xl font-semibold text-balance">
          Todo lo que necesitas para aprender
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-balance">
          Seis secciones, una sola fuente de confianza: el contenido siempre
          citado y revisado.
        </p>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {navItems.map((item, i) => (
          <Reveal key={item.href} delay={(i % 3) * 60}>
            <Card className="group relative h-full border-border/60 transition-[translate,box-shadow,border-color] duration-250 ease-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-md">
              <span
                aria-hidden
                className="absolute top-6 right-6 font-display text-2xl text-muted-foreground/25"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <CardHeader>
                <div className="mb-2 flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                  <item.icon className="size-5" />
                </div>
                <CardTitle>{item.label}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="px-0 hover:bg-transparent">
                  <Link href={`/${locale}${item.href}`}>
                    Explorar
                    <ArrowRightIcon className="transition-transform duration-250 ease-out group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
