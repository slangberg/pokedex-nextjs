import { DotGothic16, Nanum_Gothic_Coding } from "next/font/google";

export const dot_gothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
});

export const nanum = Nanum_Gothic_Coding({
  weight: "700",
  subsets: ["latin"],
  variable: "--my-font",
});
