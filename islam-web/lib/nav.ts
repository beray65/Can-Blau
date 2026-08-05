import type { LucideIcon } from "lucide-react";
import {
  BookOpenIcon,
  ScrollTextIcon,
  LibraryIcon,
  ClockIcon,
  HandHeartIcon,
  PlayCircleIcon,
  HelpCircleIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  {
    href: "/coran",
    label: "Corán",
    description: "114 suras: árabe, transliteración, traducción y audio.",
    icon: BookOpenIcon,
  },
  {
    href: "/hadices",
    label: "Hadices",
    description: "Bujari, Muslim, Riyad as-Salihin y los 40 de An-Nawawi.",
    icon: ScrollTextIcon,
  },
  {
    href: "/duas",
    label: "Duas",
    description: "Súplicas para la mañana, la noche, comer y viajar.",
    icon: HandHeartIcon,
  },
  {
    href: "/horarios",
    label: "Horarios",
    description: "Horarios de oración, Qibla y calendario Hijri.",
    icon: ClockIcon,
  },
  {
    href: "/multimedia",
    label: "Audio",
    description: "Recitadores, podcasts, conferencias y vídeos.",
    icon: PlayCircleIcon,
  },
  {
    href: "/biblioteca",
    label: "Biblioteca",
    description: "Aqidah, fiqh, sirah, tafsir, historia y ética.",
    icon: LibraryIcon,
  },
];

export const secondaryNavItems: NavItem[] = [
  {
    href: "/preguntas",
    label: "Preguntas",
    description: "Respuestas citando fuentes revisadas por eruditos.",
    icon: HelpCircleIcon,
  },
];
