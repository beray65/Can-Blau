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
      <div className="grid gap-10 rounded-xl border border-border/60 bg-card p-8 sm:grid-cols-2 sm:p-10">
        <div>
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
        <div>
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
    </section>
  );
}
