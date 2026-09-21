import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pew Pew Pewductions — Milsim airsoft events, Colorado",
  description:
    "Airsoft events built by airsofters. Four factions, one running campaign. Immersive scenarios, interactive props and missions written to be played.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500;700;800&family=Saira+Condensed:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
