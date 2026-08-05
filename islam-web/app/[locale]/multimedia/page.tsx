import { PlayCircleIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";

export default async function MultimediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ComingSoon
      icon={PlayCircleIcon}
      title="Multimedia"
      description="Recitadores, podcasts, conferencias y vídeos, enlazados a YouTube, Spotify o el CDN de audio de Al Quran Cloud."
      phase="Fase 8 del roadmap."
      locale={locale}
    />
  );
}
