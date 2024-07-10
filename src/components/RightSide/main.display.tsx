import { CSSProperties, ReactNode } from "react";
import styles from "./main.display.module.css";
import classnames from "classnames";
interface ButtonNavProps {
  children?: ReactNode;
  title?: string;
}

export default function MainDisplay({ children, title }: ButtonNavProps) {
  return (
    <main className={styles.container} role="main">
      <h1 className={styles.title}>{title}</h1>
      {children}
    </main>
  );
}
