import {
  BadgeCheckIcon,
  CompassIcon,
  HandCoinsIcon,
  MoonIcon,
  MapPinIcon,
  InfinityIcon,
  FeatherIcon,
  BookMarkedIcon,
  FootprintsIcon,
  ScaleIcon,
  HourglassIcon,
  type LucideIcon,
} from "lucide-react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Reveal } from "@/components/layout/reveal";

type Pillar = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const pilaresDelIslam: Pillar[] = [
  {
    title: "Shahada — el testimonio de fe",
    description: "El testimonio de que no hay más dios que Allah y que Mahoma es Su mensajero.",
    icon: BadgeCheckIcon,
  },
  {
    title: "Salat — la oración",
    description: "Las cinco oraciones diarias obligatorias, orientadas hacia la Qibla.",
    icon: CompassIcon,
  },
  {
    title: "Zakat — la limosna obligatoria",
    description: "Una parte fija de la riqueza que se entrega a quienes lo necesitan.",
    icon: HandCoinsIcon,
  },
  {
    title: "Sawm — el ayuno de Ramadán",
    description: "Abstenerse de comer y beber desde el amanecer hasta el ocaso durante Ramadán.",
    icon: MoonIcon,
  },
  {
    title: "Hajj — la peregrinación a La Meca",
    description: "El viaje a La Meca, obligatorio una vez en la vida para quien tenga la capacidad.",
    icon: MapPinIcon,
  },
];

const pilaresDeLaFe: Pillar[] = [
  {
    title: "Fe en Allah",
    description: "La creencia en la unicidad absoluta de Dios como único Creador.",
    icon: InfinityIcon,
  },
  {
    title: "Fe en los ángeles",
    description: "Seres creados por Dios que cumplen Sus órdenes sin desobedecerle jamás.",
    icon: FeatherIcon,
  },
  {
    title: "Fe en los libros revelados",
    description: "La Torá, los Salmos, el Evangelio y, como revelación final, el Corán.",
    icon: BookMarkedIcon,
  },
  {
    title: "Fe en los profetas",
    description: "Todos los mensajeros enviados por Dios a lo largo de la historia.",
    icon: FootprintsIcon,
  },
  {
    title: "Fe en el decreto divino",
    description: "El conocimiento y control absoluto de Dios sobre todo lo que sucede (Qadar).",
    icon: ScaleIcon,
  },
  {
    title: "Fe en el Día del Juicio",
    description: "La vida después de la muerte, en la que cada persona rendirá cuentas.",
    icon: HourglassIcon,
  },
];

function PillarList({ pillars }: { pillars: Pillar[] }) {
  return (
    <ol className="flex flex-col gap-px overflow-hidden rounded-lg bg-border/60">
      {pillars.map((pillar, i) => (
        <li
          key={pillar.title}
          className="flex gap-4 bg-card p-5 transition-colors duration-250 hover:bg-secondary/40"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <pillar.icon className="size-5" />
          </div>
          <div>
            <p className="font-display text-base font-semibold">
              <span className="mr-1.5 text-primary">{i + 1}.</span>
              {pillar.title}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {pillar.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Pillars() {
  return (
    <section id="pilares" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24">
      <Reveal className="mb-10 text-center">
        <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">
          Fundamentos
        </p>
        <h2 className="font-display text-3xl font-semibold text-balance">
          Los pilares del Islam y de la fe
        </h2>
      </Reveal>

      <Reveal delay={80}>
        <Tabs defaultValue="islam">
          <TabsList className="mx-auto mb-8 flex w-fit">
            <TabsTrigger value="islam">5 pilares del Islam</TabsTrigger>
            <TabsTrigger value="fe">6 pilares de la fe</TabsTrigger>
          </TabsList>
          <TabsContent value="islam">
            <PillarList pillars={pilaresDelIslam} />
          </TabsContent>
          <TabsContent value="fe">
            <PillarList pillars={pilaresDeLaFe} />
          </TabsContent>
        </Tabs>
      </Reveal>
    </section>
  );
}
