import { NotebookPenIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";

export default async function NotasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ComingSoon
      icon={NotebookPenIcon}
      title="Notas"
      description="Tus notas personales sobre aleyas, hadices y duas, guardadas en tu cuenta."
      phase="Fase 4 del roadmap: favoritos, progreso de lectura y notas."
      locale={locale}
    />
  );
}
