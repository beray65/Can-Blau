import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Amiri } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { PaperGrain } from "@/components/layout/paper-grain";

import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const arabic = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Aprende el Islam desde sus fuentes auténticas",
  description:
    "Corán completo, hadices, duas, horarios de oración y biblioteca islámica en español.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${arabic.variable}`}
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PaperGrain />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
