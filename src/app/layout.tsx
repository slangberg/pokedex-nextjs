import type { Metadata } from "next";
import "./globals.css";
import "./input.css";
import { dot_gothic, nanum } from "@/fonts";
export const metadata: Metadata = {
  title: "PokeDex Next.js Application",
  description: "Example App",
};
import classNames from "classnames";
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
        nanum.variable
      )}
    >
      <body>{children}</body>
    </html>
  );
}
