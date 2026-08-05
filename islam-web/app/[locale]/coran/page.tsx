import { BookOpenIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";

export default function CoranPage() {
  return (
    <ComingSoon
      icon={BookOpenIcon}
      title="Corán"
      description="Listado de las 114 suras con árabe, transliteración, traducción y audio, además de un buscador de texto completo."
      phase="Fase 2 del roadmap: ingesta del Corán completo."
    />
  );
}
