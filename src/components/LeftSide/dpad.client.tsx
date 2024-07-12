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
import { UrlObject } from "@/types/data";
import { usePageIndex } from "@/utils/route";
interface DPadProps {
  images?: UrlObject[];
}

const genDpadLinks = (images: UrlObject[], activeIndex: number): DPadConfig => {
  if (!images?.length) {
    return {};
  } else {
    const imageCount = images.length;
    const nextIndex = activeIndex + 1 < imageCount ? activeIndex + 1 : 0;
    const previousIndex =
      activeIndex - 1 >= 0 ? activeIndex - 1 : imageCount - 1;
    return {
      left: {
        type: "param",
        value: previousIndex,
        description: `Show image ${images[previousIndex].description}`,
        paramValue: "imageIndex",
      },
      right: {
        type: "param",
        value: nextIndex,
        description: `Show image ${images[nextIndex].description}`,
        paramValue: "imageIndex",
      },
    };
  }
};

export default function Dpad({ images = [] }: DPadProps) {
  const style = {
    "--buttonSize": "2.2rem",
  } as CSSProperties;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const activeIndex = usePageIndex();
  const localConfig = genDpadLinks(images, activeIndex);

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

  return (
    <div className={styles.container} style={style}>
      <div className={styles.wrapper}>
        <div className={styles.center}>
          <div className={styles.centerCircle}></div>
        </div>
        {genButton(styles.up, FaAngleUp, localConfig.up)}
        {genButton(styles.right, FaAngleRight, localConfig.right)}
        {genButton(styles.down, FaAngleDown, localConfig.down)}
        {genButton(styles.left, FaAngleLeft, localConfig.left)}
      </div>
    </div>
  );
}
