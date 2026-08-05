import { PlayCircleIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";

export default function MultimediaPage() {
  return (
    <ComingSoon
      icon={PlayCircleIcon}
      title="Multimedia"
      description="Recitadores, podcasts, conferencias y vídeos, enlazados a YouTube, Spotify o el CDN de audio de Al Quran Cloud."
      phase="Fase 8 del roadmap."
    />
  );
}
