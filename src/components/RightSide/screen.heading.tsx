import styles from "./main.display.module.css";
import classNames from "classnames";
import { nanum } from "@/fonts";
import { ReactNode } from "react";
interface ScreenHeadingProps {
  children?: JSX.Element | ReactNode;
}

export default function ScreenHeading({ children }: ScreenHeadingProps) {
  return <h1 className="font-heading bg-black p-2 text-white">{children}</h1>;
}
