import { ClockIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";

export default async function HorariosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ComingSoon
      icon={ClockIcon}
      title="Horarios de oración"
      description="Horarios de oración, dirección de la Qibla, calendario Hijri y cuenta atrás para el próximo Ramadán o Eid, calculados en vivo con AlAdhan."
      phase="Fase 3 del roadmap."
      locale={locale}
    />
  );
}
