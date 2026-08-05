import { HandHeartIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";

export default async function DuasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ComingSoon
      icon={HandHeartIcon}
      title="Duas"
      description="Súplicas por categoría — mañana, noche, comida, viaje, entrar y salir de casa — con árabe, transliteración y traducción revisada."
      phase="Fase 5 del roadmap."
      locale={locale}
    />
  );
}
