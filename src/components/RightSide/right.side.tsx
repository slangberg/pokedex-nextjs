import { CSSProperties } from "react";
import styles from "./right.side.module.css";
import classnames from "classnames";
import { metalTexture } from "@/utils/styles";
import ButtonNav from "./button.nav";
import MainDisplay from "./main.display";
interface RightSide {
  children?: JSX.Element | ReactNode;
  links: Array<{ url: string; id: string; text: string }>;
}

export default function Button({ children, links }: RightSide) {
  return (
    <div className={metalTexture(styles.container)}>
      <div className={styles.cutout} />
      <div className={metalTexture(styles.cutoutOutline)} />
      <div className={styles.body}>
        <MainDisplay>{children}</MainDisplay>
        <ButtonNav links={links} />
      </div>
    </div>
  );
}
