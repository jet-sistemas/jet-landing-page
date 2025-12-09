import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Montserrat,
  League_Spartan,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

const fontFamily = `${montserrat.variable} ${leagueSpartan.variable} ${geistSans.variable} ${geistMono.variable}`;

export const metadata: Metadata = {
  title: "Associação Desportiva Jet - Joyce e Teatino",
  description:
    "Associação Desportiva focada em esportes coletivos, promovendo valores e desenvolvimento esportivo e humano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${fontFamily} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
