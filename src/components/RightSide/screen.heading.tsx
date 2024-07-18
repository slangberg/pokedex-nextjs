import styles from "./main.display.module.css";
import classNames from "classnames";
import { nanum } from "@/fonts";
import { ReactNode } from "react";
interface ScreenHeadingProps {
  children?: JSX.Element | ReactNode;
}

export default function ScreenHeading({ children }: ScreenHeadingProps) {
  return (
    <h1 className={classNames(styles.heading, nanum.className)}>{children}</h1>
  );
}
