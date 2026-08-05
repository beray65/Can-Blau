import type { LucideIcon } from "lucide-react";

export function ComingSoon({
  icon: Icon,
  title,
  description,
  phase,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  phase: string;
}) {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
        <Icon className="size-6" />
      </div>
      <h1 className="font-display text-3xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <p className="text-sm text-muted-foreground/70">{phase}</p>
    </section>
  );
}
