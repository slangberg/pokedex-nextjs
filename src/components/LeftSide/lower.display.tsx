import { ReactNode } from "react";
import styles from "./lower.display.module.css";
interface LowerDisplayProps {
  children?: ReactNode;
}

export default function LowerDisplay({ children }: LowerDisplayProps) {
  return <div className={styles.container}>{children}</div>;
}
