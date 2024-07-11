import { CSSProperties } from "react";
import styles from "./main.display.module.css";
import classnames from "classnames";
interface ButtonNavProps {
  children?: JSX.Element | ReactNode;
}

export default function MainDisplay({ children }: ButtonNavProps) {
  return (
    <main className={styles.container} role="main">
      {children}
    </main>
  );
}
