import { BookOpenIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";

export default async function CoranPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ComingSoon
      icon={BookOpenIcon}
      title="Corán"
      description="Listado de las 114 suras con árabe, transliteración, traducción y audio, además de un buscador de texto completo."
      phase="Fase 2 del roadmap: ingesta del Corán completo."
      locale={locale}
    />
  );
}
