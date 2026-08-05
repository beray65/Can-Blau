import { Hero } from "@/components/home/hero";
import { FeatureGrid } from "@/components/home/feature-grid";
import { Pillars } from "@/components/home/pillars";
import { CtaBand } from "@/components/home/cta-band";

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
      <div className="bg-secondary/15">
        <Pillars />
      </div>
      <CtaBand locale={locale} />
    </>
  );
}
