import Image from "next/image";
import Link from "next/link";

import { navItems, secondaryNavItems } from "@/lib/nav";

export function Footer({ locale }: { locale: string }) {
  const withLocale = (href: string) => `/${locale}${href}`;

  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-display text-lg font-semibold"
            >
              <Image
                src="/images/logo-sirat.png"
                alt=""
                aria-hidden
                width={28}
                height={28}
                className="size-7"
              />
              Sirat
            </Link>
            <p className="font-display text-base italic text-muted-foreground">
              &ldquo;¿Acaso no reflexionan sobre el Corán?&rdquo;
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Enlaces rápidos
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[...navItems, ...secondaryNavItems].map((item) => (
                <li key={item.href}>
                  <Link
                    href={withLocale(item.href)}
                    className="transition-colors duration-250 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:hola@sirat.app"
                  className="transition-colors duration-250 hover:text-foreground"
                >
                  hola@sirat.app
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href={withLocale("/privacidad")}
                  className="transition-colors duration-250 hover:text-foreground"
                >
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sirat. Contenido citado con su fuente y
          traductor en cada aleya, hadiz o dua.
        </p>
      </div>
    </footer>
  );
}
