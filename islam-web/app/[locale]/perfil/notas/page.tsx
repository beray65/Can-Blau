import { NotebookPenIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";

export default function NotasPage() {
  return (
    <ComingSoon
      icon={NotebookPenIcon}
      title="Notas"
      description="Tus notas personales sobre aleyas, hadices y duas, guardadas en tu cuenta."
      phase="Fase 4 del roadmap: favoritos, progreso de lectura y notas."
    />
  );
}
