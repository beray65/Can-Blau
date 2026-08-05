import Image from "next/image";

const pilaresDelIslam = [
  "Shahada — el testimonio de fe",
  "Salat — la oración",
  "Zakat — la limosna obligatoria",
  "Sawm — el ayuno de Ramadán",
  "Hajj — la peregrinación a La Meca",
];

const pilaresDeLaFe = [
  "Creer en Allah",
  "Creer en Sus ángeles",
  "Creer en Sus libros revelados",
  "Creer en Sus mensajeros",
  "Creer en el Día del Juicio",
  "Creer en el decreto divino (Qadar)",
];

export function Pillars() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
          <Image
            src="/images/pilares-del-islam.png"
            alt="Ilustración de los cinco pilares del Islam: Shahada (profesión de fe), Salah (oración), Zakat (caridad obligatoria), Sawm (ayuno de Ramadán) y Hajj (peregrinación a La Meca)."
            width={1024}
            height={559}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 528px, 100vw"
          />
          <div className="p-8 sm:p-10">
            <h2 className="mb-4 font-display text-2xl font-semibold">
              Los 5 pilares del Islam
            </h2>
            <ol className="space-y-2 text-muted-foreground">
              {pilaresDelIslam.map((pilar, i) => (
                <li key={pilar} className="flex gap-3">
                  <span className="font-display text-primary">{i + 1}.</span>
                  {pilar}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
          <Image
            src="/images/pilares-de-la-fe.png"
            alt="Ilustración de los seis pilares de la fe: creer en Dios, en los ángeles, en los libros sagrados, en los profetas, en el decreto divino (Qadar) y en el Día del Juicio."
            width={1672}
            height={941}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 528px, 100vw"
          />
          <div className="p-8 sm:p-10">
            <h2 className="mb-4 font-display text-2xl font-semibold">
              Los 6 pilares de la fe
            </h2>
            <ol className="space-y-2 text-muted-foreground">
              {pilaresDeLaFe.map((pilar, i) => (
                <li key={pilar} className="flex gap-3">
                  <span className="font-display text-primary">{i + 1}.</span>
                  {pilar}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
