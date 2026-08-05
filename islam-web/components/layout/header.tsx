"use client";

import * as React from "react";
import Link from "next/link";
import { MenuIcon, MoonStarIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { navItems, secondaryNavItems } from "@/lib/nav";

export function Header({ locale }: { locale: string }) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const allItems = [...navItems, ...secondaryNavItems];
  const withLocale = (href: string) => `/${locale}${href}`;

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight"
        >
          <MoonStarIcon className="size-5 text-primary" aria-hidden />
          Nur
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withLocale(item.href)}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors duration-250 hover:bg-secondary hover:text-secondary-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="hidden text-muted-foreground sm:inline-flex"
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon />
            Buscar
            <kbd className="ml-2 rounded border border-border bg-secondary px-1.5 text-xs">
              ⌘K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label="Buscar"
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon />
          </Button>
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menú">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menú</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {allItems.map((item) => (
                  <Link
                    key={item.href}
                    href={withLocale(item.href)}
                    className="rounded-lg px-3 py-3 text-base font-medium transition-colors duration-250 hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Busca una sura, un hadiz o un tema…" />
        <CommandList>
          <CommandEmpty>Sin resultados.</CommandEmpty>
          <CommandGroup heading="Secciones">
            {allItems.map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => {
                  setSearchOpen(false);
                  window.location.href = withLocale(item.href);
                }}
              >
                <item.icon className="text-muted-foreground" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
