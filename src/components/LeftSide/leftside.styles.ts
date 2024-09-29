import styles from "./leftside.module.css";
import classNames from "classnames";

const leftSideContainerStyles = classNames(
  "relative flex-1",
  "bg-metal",
  "rounded-t-3xl",
  "md:rounded-bl-3xl",
  "max-w-[500px] md:w-[500px]",
  "max-h-[675px]"
);

const shared = classNames("h-[70px] md:h-[80px]");

const headerStyles = classNames(
  "absolute top-0",
  "drop-shadow-deep-down",
  "rounded-t-3xl",
  "w-full h-[70px] md:h-[80px]",
  shared
);

const headerLeftStyles = classNames(
  "flex flex-row",
  "gap-2 md:gap-3",
  "p-4",
  "absolute z-1",
  "w-[38%] h-[70px]",
  "md:h-[98px]",
  "bg-metal",
  "shadow-ridge",
  "rounded-tl-3xl rounded-br-[76px]"
);

const headerRightStyles = classNames(
  "absolute z-[2]",
  "w-[66%] md:w-[calc(64%_-_2px)]",
  "h-[40px] md:h-[47px]",
  "right-0",
  "bg-metal",
  "rounded-tr-3xl",
  "shadow-ridge-1"
);

const bodyStyles = classNames(
  "m-2",
  "shadow-body-inset",
  "md:rounded-bl-3xl",
  "pt-[80px] md:pt-[110px] px-3 pb-1 md:px-4"
);

const extraContainerStyles = classNames("flex flex-row gap-2 md:flex-col");

const extraRowStyles = classNames(
  "flex items-center gap-1",
  "flex-col md:flex-row",
  "ml-4"
);

const indicatorStyles = classNames(
  "w-10 h-3",
  "md:w-[65px] md:h-[15px]",
  "shadow-[inset_0px_0px_2px_2px_rgba(111,4,20,0.4)]",
  "border border-[rgba(0,0,0,0.5)]",
  "rounded-[15px]"
);

const circleButtonStyles = classNames(
  styles.circleButton,
  "w-10 h-10",
  "rounded-full",
  "bg-stone-800"
);

const leftSideControlsStyles = classNames(
  "flex flex-row grow",
  "gap-2.5",
  "md:ml-5",
  "justify-items-center"
);

const lensStyles = classNames(
  styles.lens,
  "rounded-full",
  "w-9 h-9",
  "md:w-16 md:h-16"
);

const lensRowStyles = classNames(
  "flex flex-col",
  "gap-0.5 md:gap-1",
  "md:flex-row",
  "md:w-16 md:h-16"
);

const styleClasses: Record<string, string> = {
  leftSideContainerStyles,
  headerStyles,
  headerLeftStyles,
  headerRightStyles,
  bodyStyles,
  extraContainerStyles,
  extraRowStyles,
  indicatorStyles,
  circleButtonStyles,
  leftSideControlsStyles,
  lensStyles,
  lensRowStyles,
};

export default styleClasses;
