import { StarIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";

export default async function FavoritosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ComingSoon
      icon={StarIcon}
      title="Favoritos"
      description="Aleyas, hadices y duas que marques como favoritos, sincronizados con tu cuenta."
      phase="Fase 4 del roadmap: favoritos, progreso de lectura y notas."
      locale={locale}
    />
  );
}
