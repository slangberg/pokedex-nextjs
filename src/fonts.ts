import { DotGothic16, Nanum_Gothic_Coding } from "next/font/google";
import localFont from "next/font/local";

export const dot_gothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--dot-gothic",
});

export const nanum = Nanum_Gothic_Coding({
  weight: "700",
  subsets: ["latin"],
  variable: "--nanum-gothic",
});

// Pokémon logo-style display font, used for the header title.
export const pokemon_solid = localFont({
  src: "../public/fonts/Pokemon-Solid.ttf",
  variable: "--pokemon-solid",
  display: "swap",
});
