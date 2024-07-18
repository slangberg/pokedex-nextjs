import styles from "./lower.display.module.css";
interface LowerDisplayProps {
  children?: JSX.Element;
}

export default function LowerDisplay({ children }: LowerDisplayProps) {
  return <div className={styles.container}>{children}</div>;
}
