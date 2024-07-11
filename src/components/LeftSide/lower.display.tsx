import { CSSProperties } from "react";
import styles from "./lower.display.module.css";
import classnames from "classnames";
interface LowerDisplayProps {
  children?: JSX.Element | ReactNode;
}

export default function LowerDisplay({ children }: LowerDisplayProps) {
  return <div className={styles.container}>{children}</div>;
}
