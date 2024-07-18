import type { Metadata } from "next";
import "./globals.css";
import { dot_gothic } from "@/fonts";
export const metadata: Metadata = {
  title: "PokeDex Next.js Application",
  description: "Example App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element;
}>) {
  return (
    <html lang="en" className={dot_gothic.className}>
      <body>{children}</body>
    </html>
  );
}
