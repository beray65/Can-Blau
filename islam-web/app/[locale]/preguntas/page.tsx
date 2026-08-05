import { HelpCircleIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";

export default async function PreguntasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ComingSoon
      icon={HelpCircleIcon}
      title="Preguntas"
      description="Respuestas redactadas o revisadas por una persona con formación islámica, citando la aleya o el hadiz exacto."
      phase="Fase 8 del roadmap."
      locale={locale}
    />
  );
}
