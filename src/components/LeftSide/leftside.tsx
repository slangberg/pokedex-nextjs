import { metalTexture } from "@/utils/styles";
import Light from "@/components/Global/light";
import Display from "./display";
import LowerDisplay from "./lower.display";
import classNames from "classnames";

interface LefSideProps {
  children?: JSX.Element;
  mini?: JSX.Element;
  dpad: JSX.Element;
}

import styles from "@/components/LeftSide/leftside.styles";

export default async function LeftSide({ children, mini, dpad }: LefSideProps) {
  return (
    <div
      className={styles.leftSideContainerStyles}
      data-test-id="left-side-container"
    >
      <div className={styles.headerStyles}>
        <div className={styles.headerLeftStyles}>
          <div className={styles.lensStyles} />
          <div className={styles.lensRowStyles}>
            <Light
              className="rounded-full md:w-4 md:h-4 w-3 h-3"
              color="#e93a3a"
            />
            <Light
              className="rounded-full md:w-4 md:h-4 w-3 h-3"
              color="#0ec518"
            />
            <Light
              className="rounded-full md:w-4 md:h-4 w-3 h-3"
              color="#ffc334"
            />
          </div>
        </div>
        <div className={styles.headerRightStyles} />
      </div>
      <div className={styles.bodyStyles}>
        <Display>{children}</Display>
        <div className={styles.extraContainerStyles}>
          <div className={styles.extraRowStyles}>
            <div className={styles.circleButtonStyles} />
            <div
              className={styles.indicatorStyles}
              style={{ background: "#B73137" }}
            />
            <div
              className={styles.indicatorStyles}
              style={{ background: "#609DD6" }}
            />
          </div>
          <div className={styles.leftSideControlsStyles}>
            <LowerDisplay className="md:top-[-30%]">{mini}</LowerDisplay>
            {dpad}
          </div>
        </div>
      </div>
    </div>
  );
}
