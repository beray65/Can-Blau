import { LibraryIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";

export default function BibliotecaPage() {
  return (
    <ComingSoon
      icon={LibraryIcon}
      title="Biblioteca"
      description="Libros por categoría — aqidah, fiqh, tafsir, sirah, historia y ética — con portada, autor, descripción y enlace de lectura o descarga."
      phase="Fase 7 del roadmap."
    />
  );
}
