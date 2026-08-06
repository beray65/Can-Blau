import { Hero } from "@/components/home/hero";
import { FeatureGrid } from "@/components/home/feature-grid";
import { HowItWorks } from "@/components/home/how-it-works";
import { Pillars } from "@/components/home/pillars";
import { CtaBand } from "@/components/home/cta-band";
import { SilkShader } from "@/components/layout/silk-shader";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <FeatureGrid locale={locale} />
      <HowItWorks />
      <div className="relative overflow-hidden bg-secondary/15">
        <SilkShader className="absolute inset-0 opacity-80 dark:opacity-60" />
        <div aria-hidden className="absolute inset-0 bg-background/45 dark:bg-background/55" />
        <div className="relative">
          <Pillars />
        </div>
      </div>
      <CtaBand locale={locale} />
    </>
  );
}
