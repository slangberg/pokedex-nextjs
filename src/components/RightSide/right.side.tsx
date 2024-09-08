import styles from "./right.side.module.css";
import { metalTexture } from "@/utils/styles";
import ButtonNav from "./button.nav";
import MainDisplay from "./main.display";
import classNames from "classnames";
interface RightSide {
  children?: JSX.Element;
}

const rightSideContainerStyles = classNames(
  "relative",
  "bg-metal",
  "br-rounded-md",
  "z-1",
  "top-[57px]",
  "w-[500px] h-[643px]"
);

const cutoutStyles = classNames(
  "absolute",
  "bg-[#7ac9f9]",
  "rounded-bl-[75px]",
  "z-[3]",
  "right-0",
  "w-[189px] h-[44px]"
);

export default function RightSide({ children }: RightSide) {
  return (
    <div className={rightSideContainerStyles}>
      <div className={cutoutStyles} />
      <div className={metalTexture(styles.cutoutOutline)} />
      <div className={styles.body}>
        <MainDisplay>{children}</MainDisplay>
        <ButtonNav />
      </div>
    </div>
  );
}
