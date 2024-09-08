import { metalTexture } from "@/utils/styles";
import styles from "./leftside.module.css";
import Light from "@/components/Global/light";
import Display from "./display";
import LowerDisplay from "./lower.display";
import classNames from "classnames";

interface LefSideProps {
  children?: JSX.Element;
  mini?: JSX.Element;
  dpad: JSX.Element;
}

const leftSideContainerStyles = classNames(
  "relative",
  "bg-metal",
  "rounded-3xl",
  "rounded-br-none",
  "pr-[15px]",
  "max-w-[500px] h-[700px]"
);

const headerStyles = classNames(
  "absolute top-0",
  "drop-shadow-deep-down",
  "rounded-t-3xl",
  "w-full h-[80px]"
);

const headerLeftStyles = classNames(
  "absolute z-1",
  "w-[38%] h-[80px]",
  "md:h-[98px]",
  "bg-metal",
  "shadow-ridge",
  "rounded-tl-3xl rounded-br-[76px]"
);

const headerRightStyles = classNames(
  "absolute z-[2]",
  "w-[calc(65%_-_2px)]",
  "h-[40px] md:h-[57px]",
  "right-0",
  "bg-metal",
  "rounded-tr-3xl",
  "shadow-ridge-1"
);

const lensStyles = classNames(
  "absolute z-[2]",
  "w-[55px] h-[55px]",
  "right-0",
  "bg-metal",
  "rounded-tr-3xl",
  "shadow-ridge-1"
);

const bodyStyles = classNames(
  styles.body,
  "pt-[80px] md:pt-[110px] px-3 md:px-4"
);

const extraContainerStyles = classNames("flex flex-row md:flex-col");

const extraRowStyles = classNames(
  "flex items-center gap-1",
  "flex-col md:flex-row",
  "flexDirt"
);

const indicatorStyles = classNames(
  "w-12 h-3",
  "md:w-[65px] md:h-[15px]",
  "shadow-[inset_0px_0px_2px_2px_rgba(111,4,20,0.4)]",
  "border border-[rgba(0,0,0,0.5)]",
  "rounded-[15px]"
);

const circleButtonStyles = classNames(
  styles.circleButton,
  "w-8 h-8",
  "md:w-10 md:h-10",
  "mb-1 md:mb-0",
  "bg-black",
  "rounded-full"
);

export default async function LeftSide({ children, mini, dpad }: LefSideProps) {
  return (
    <div className={leftSideContainerStyles} data-testId="left-side-container">
      <div className={headerStyles}>
        <div className={headerLeftStyles}>
          <div className={styles.lens} />
          <div className={styles.indicators}>
            <Light className="md:w-4 md:h-4 w-3 h-3" color="#e93a3a" />
            <Light className="md:w-4 md:h-4 w-3 h-3" color="#0ec518" />
            <Light className="md:w-4 md:h-4 w-3 h-3" color="#ffc334" />
          </div>
        </div>
        <div className={headerRightStyles} />
      </div>
      <div className={bodyStyles}>
        <Display>{children}</Display>
        <div className={extraContainerStyles}>
          <div className={extraRowStyles}>
            <div className={circleButtonStyles} />
            <div
              className={indicatorStyles}
              style={{ background: "#B73137" }}
            />
            <div
              className={indicatorStyles}
              style={{ background: "#609DD6" }}
            />
          </div>
          <div className={styles.leftSideControls}>
            <LowerDisplay>{mini}</LowerDisplay>
            {dpad}
          </div>
        </div>
      </div>
    </div>
  );
}
