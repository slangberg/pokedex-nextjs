import ButtonNav from "./button.nav";
import MainDisplay from "./main.display";
import classNames from "classnames";
interface RightSide {
  children?: JSX.Element;
}

const rightSideContainerStyles = classNames(
  "relative flex flex-col flex-1",
  "bg-metal",
  "p-1 pl-0",
  "rounded-b-3xl md:rounded-bl-none",
  "z-1",
  "md:top-[45px]",
  "max-w-[500px] md:w-[626px]",
  "h-[630px]"
);

const cutoutStyles = classNames(
  "absolute",
  "bg-[#7ac9f9]",
  "rounded-bl-[75px]",
  "z-[3]",
  "right-0 top-0",
  "w-[36%] h-[44px]",
  "hidden md:block"
);

const cutoutOutlineStyles = classNames(
  "absolute z-[2] shadow-ridge-2",
  "h-[44px] w-[36%]",
  "rounded-bl-[75px]",
  "top-2 right-1",
  "bg-metal hidden md:block"
);

const bodyStyles = classNames(
  "px-2 md:px-4",
  "pt-2 md:pt-[60px]",
  "pb-4",
  "rounded-b-3xl md:rounded-bl-none",
  "shadow-body-inset grow"
);

export default function RightSide({ children }: RightSide) {
  return (
    <div className={rightSideContainerStyles}>
      <div className={cutoutStyles} />
      <div className={cutoutOutlineStyles} />
      <div className={bodyStyles}>
        <MainDisplay>{children}</MainDisplay>
        <ButtonNav />
      </div>
    </div>
  );
}
