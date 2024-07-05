import { CSSProperties } from "react";
import styles from "./button.module.css";
import classnames from "classnames";
interface LightProps {
  content: JSX.Element | string;
  color?: string;
  classes?: string[];
}

export default function Button({
  content,
  color = "blue",
  classes = [],
}: LightProps) {
  const style = {
    "--buttonColor": color,
  } as CSSProperties;
  return (
    <button className={classnames(styles.pushable, ...classes)} style={style}>
      <span className={styles.front}>{content}</span>
    </button>
  );
}
