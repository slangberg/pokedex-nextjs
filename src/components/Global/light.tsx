import { CSSProperties } from "react";
import styles from "./light.module.css";
import classnames from "classnames";
import classNames from "classnames";
interface LightProps {
  size?: number;
  color: string;
  className?: string;
}

export default function Light({ size, color, className }: LightProps) {
  const style = {
    "--lightSize": `${size}px`,
    "--lightColor": color,
  } as CSSProperties;
  return <div className={classnames(styles.base, className)} style={style} />;
}
