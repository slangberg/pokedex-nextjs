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
import {
  useSearchParams,
  usePathname,
  useRouter,
  useParams,
} from "next/navigation";
import {
  DPadConfig,
  LinkConfigParam,
  LinkConfigUnion,
  ListData,
} from "@/types/page";
import { IconType } from "react-icons";
import { UrlObject } from "@/types/data";
import { usePageIndex, usePokemonIndexes } from "@/utils/route";
import { PokeResource } from "../../types/data";
interface DPadProps {
  images?: UrlObject[];
  pokemon?: PokeResource[];
}

const genDpadLinks = (
  images: UrlObject[],
  imageIndex: number,
  pokemonIndexes: ListData
): DPadConfig => {
  const imageCount = images.length;
  const nextIndex = imageIndex + 1 < imageCount ? imageIndex + 1 : 0;
  const previousIndex = imageIndex - 1 >= 0 ? imageIndex - 1 : imageCount - 1;

  let config: DPadConfig = {
    up: {
      type: "link",
      value: `/pokedex/${pokemonIndexes.next}/overview`,
      description: `Go to ${pokemonIndexes.prev}`,
    },
    down: {
      type: "link",
      value: `/pokedex/${pokemonIndexes.next}/overview`,
      description: `Go to ${pokemonIndexes.prev}`,
    },
  };

  if (!!imageCount) {
    config = {
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
      ...config,
    };
  }

  return config;
};

export default function Dpad({ images = [], pokemon = [] }: DPadProps) {
  const style = {
    "--buttonSize": "2.2rem",
  } as CSSProperties;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pokemonIndexes = usePokemonIndexes(pokemon);
  const { replace } = useRouter();
  const activeIndex = usePageIndex();
  const localConfig = genDpadLinks(images, activeIndex, pokemonIndexes);

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
          role="tab"
          id="nextImageButton"
          aria-controls="slideshow"
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
        <Icon className={styles.icon} />
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
