import Link from "next/link";
import classNames from "classnames";
import { FaGithub } from "react-icons/fa";

export const REPO_URL = "https://github.com/slangberg/pokedex-nextjs";

// Fixed bar along the top of the page. Hidden below the md breakpoint, where
// the stacked Pokédex needs the whole viewport.
const headerStyles = classNames(
  "hidden md:flex",
  "fixed top-0 inset-x-0 z-[50]",
  "h-12 px-6 items-center justify-between",
  "bg-[#2b2121] text-[#f4f4f4]",
  "border-b-2 border-[rgba(111,4,20,0.8)]",
  "shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
);

export default function SiteHeader() {
  return (
    <header className={headerStyles}>
      <Link
        href="/"
        // Blue outline like the Pokémon logo. paint-order draws the stroke
        // behind the fill, so it outlines the letters without thinning them.
        className={classNames(
          "font-pokemon text-2xl leading-none tracking-[0.15em]",
          "text-[#ffcb05] hover:brightness-110",
          "[-webkit-text-stroke:4px_#3d7dca] [paint-order:stroke_fill]"
        )}
      >
        Pokédex
      </Link>
      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 font-heading text-sm font-bold hover:text-white hover:underline"
      >
        <FaGithub aria-hidden="true" className="w-5 h-5" />
        View on GitHub
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </header>
  );
}
