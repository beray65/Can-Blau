import { ScrollTextIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";

export default function HadicesPage() {
  return (
    <ComingSoon
      icon={ScrollTextIcon}
      title="Hadices"
      description="Selector de colección: Bujari, Muslim, Riyad as-Salihin y los 40 de An-Nawawi, con filtros por libro, tema y grado."
      phase="Fase 6 del roadmap: se empieza por los 40 de An-Nawawi."
    />
  );
}
