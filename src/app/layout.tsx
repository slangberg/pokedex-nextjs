import type { Metadata } from "next";
import "./globals.css";
import "./input.css";
import { dot_gothic, nanum, pokemon_solid } from "@/fonts";
export const metadata: Metadata = {
  title: "PokeDex Next.js Application",
  description: "Example App",
};
import classNames from "classnames";
import SiteHeader from "@/components/Global/site.header";
export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element;
}>) {
  return (
    <html
      lang="en"
      className={classNames(
        dot_gothic.className,
        dot_gothic.variable,
        nanum.variable,
        pokemon_solid.variable
      )}
    >
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
