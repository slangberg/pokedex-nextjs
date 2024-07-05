"use client";

import { CSSProperties } from "react";
import styles from "./dpad.module.css";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import {} from "react-icons/fa";
interface DPadProps {}

export default function Dpad() {
  const style = {
    "--buttonSize": "2.2rem",
  } as CSSProperties;

  const onClickHandler = (direction: "up" | "down" | "left" | "right") => {};

  return (
    <div className={styles.container} style={style}>
      <div className={styles.wrapper}>
        <div className={styles.center}>
          <div className={styles.centerCircle}></div>
        </div>
        <button className={styles.up} onClick={() => onClickHandler("up")}>
          <FaAngleUp className={styles.icon} />
        </button>
        <button
          className={styles.right}
          onClick={() => onClickHandler("right")}
        >
          <FaAngleRight className={styles.icon} />
        </button>
        <button className={styles.down} onClick={() => onClickHandler("down")}>
          <FaAngleDown className={styles.icon} />
        </button>
        <button className={styles.left} onClick={() => onClickHandler("left")}>
          <FaAngleLeft className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
