import { CSSProperties } from "react";
import styles from "./light.module.css";
import classNames from "classnames";
interface LightProps {
  size?: number;
  color: string;
  className?: string;
}

const lightStyles = classNames("rounded-full");

export default function Light({ size, color, className }: LightProps) {
  const style = {
    "--lightSize": `${size}px`,
    "--lightColor": color,
  } as CSSProperties;
  return (
    <div
      className={classNames(styles.base, lightStyles, className)}
      style={style}
    />
  );
}
