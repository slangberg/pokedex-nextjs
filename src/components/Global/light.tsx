import { CSSProperties } from "react";
import styles from "./light.module.css";
import classnames from "classnames";
interface LightProps {
  size: number;
  color: string;
  classes?: string[];
}

export default function Light({ size, color, classes = [] }: LightProps) {
  const style = {
    "--lightSize": `${size}px`,
    "--lightColor": color,
  } as CSSProperties;
  return <div className={classnames(styles.base, ...classes)} style={style} />;
}
