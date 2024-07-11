import { metalTexture } from "@/utils/styles";
import styles from "./leftside.module.css";
import Light from "@/components/Global/light";
import Display from "./display";
import LowerDisplay from "./lower.display";
import { ReactNode } from "react";

interface LefSideProps {
  children?: JSX.Element | ReactNode;
  mini?: JSX.Element | ReactNode;
  dpad: JSX.Element | ReactNode;
}
export default async function LeftSide({ children, mini, dpad }: LefSideProps) {
  return (
    <div className={metalTexture(styles.container)}>
      <div className={styles.header}>
        <div className={metalTexture(styles.dexInfoLeft)}>
          <div className={styles.lens} />
          <div className={styles.indicators}>
            <Light size={15} color="#e93a3a" />
            <Light size={15} color="#0ec518" />
            <Light size={15} color="#ffc334" />
          </div>
        </div>
        <div className={metalTexture(styles.dexInfoRight)}></div>
      </div>
      <div className={styles.body}>
        <Display>{children}</Display>
        <div className={styles.extrasRow}>
          <div className={styles.circleButton} />
          <div className={styles.indicator} style={{ background: "#B73137" }} />
          <div className={styles.indicator} style={{ background: "#609DD6" }} />
        </div>
        <div className={styles.leftSideControls}>
          <LowerDisplay>{mini}</LowerDisplay>
          {dpad}
        </div>
      </div>
    </div>
  );
}
