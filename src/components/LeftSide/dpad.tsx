"use client";

import { CSSProperties } from "react";
import styles from "./dpad.module.css";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  DPadConfig,
  LinkConfig,
  LinkConfigParam,
  LinkConfigUnion,
} from "@/types/page";
import { IconType } from "react-icons";

export default function Dpad() {
  const style = {
    "--buttonSize": "2.2rem",
  } as CSSProperties;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const genButton = (
    className: string,
    Icon: IconType,
    buttonConfig?: LinkConfigUnion
  ) => {
    if (!buttonConfig) {
      return (
        <button className={className}>
          <Icon className={styles.icon} />
        </button>
      );
    }
    if (buttonConfig.type === "param") {
      const { paramValue, value, description } =
        buttonConfig as LinkConfigParam;
      const params = new URLSearchParams(searchParams);
      return (
        <button
          role="link"
          aria-label={description}
          className={className}
          onClick={() => {
            params.set(paramValue, value.toString());
            replace(`${pathname}?${params.toString()}`);
          }}
        >
          <Icon className={styles.icon} />
        </button>
      );
    }
    const { value, description } = buttonConfig as LinkConfigParam;
    return (
      <Link
        aria-label={description}
        className={className}
        href={value.toString()}
      >
        <FaAngleUp className={styles.icon} />
      </Link>
    );
  };
  const config = {};
  return (
    <div className={styles.container} style={style}>
      <div className={styles.wrapper}>
        <div className={styles.center}>
          <div className={styles.centerCircle}></div>
        </div>
        {genButton(styles.up, FaAngleUp, config.up)}
        {genButton(styles.right, FaAngleRight, config.right)}
        {genButton(styles.down, FaAngleDown, config.down)}
        {genButton(styles.left, FaAngleLeft, config.left)}
      </div>
    </div>
  );
}
