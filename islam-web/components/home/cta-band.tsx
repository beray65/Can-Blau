import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/layout/reveal";

export function CtaBand({ locale }: { locale: string }) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <Image
        src="/images/mezquita-hero.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-25 mix-blend-luminosity"
      />
      <div aria-hidden className="absolute inset-0 bg-primary/85" />

      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-balance sm:text-3xl">
          Empieza tu lectura de hoy
        </h2>
        <p className="max-w-md text-primary-foreground/85">
          114 suras te esperan, con árabe, transliteración y traducción en el
          mismo lugar.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        >
          <Link href={`/${locale}/coran`}>
            Ir al Corán
            <ArrowRightIcon />
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}
