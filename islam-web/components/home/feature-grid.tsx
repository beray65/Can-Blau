import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/nav";

export function FeatureGrid({ locale }: { locale: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {navItems.map((item) => (
          <Card
            key={item.href}
            className="group border-border/60 transition-all duration-250 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
          >
            <CardHeader>
              <div className="mb-2 flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                <item.icon className="size-5" />
              </div>
              <CardTitle>{item.label}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="px-0 hover:bg-transparent">
                <Link href={`/${locale}${item.href}`}>
                  Explorar
                  <ArrowRightIcon className="transition-transform duration-250 group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
