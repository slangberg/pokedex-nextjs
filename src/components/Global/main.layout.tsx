import LeftSide from "@/components/LeftSide/leftside";
import RightSide from "@/components/RightSide/right.side";
import classNames from "classnames";

interface AsideProps {
  left?: JSX.Element;
  children?: JSX.Element | undefined;
  mini?: JSX.Element;
  dpad: JSX.Element;
}

const wrapperStyles = classNames(
  "w-screen",
  "h-screen",
  "flex",
  "justify-center",
  "items-center",
  "flex-row"
);

const containerStyles = classNames(
  "max-w-[100vw] md:min-w-[345px]",
  "width-full",
  "max-h-[100vh]",
  "flex h-max",
  "flex-col md:flex-row"
);

export default function MainLayout({ mini, left, children, dpad }: AsideProps) {
  return (
    <div className={wrapperStyles}>
      <div className={containerStyles}>
        <LeftSide mini={mini} dpad={dpad}>
          {left}
        </LeftSide>
        <RightSide>{children}</RightSide>
      </div>
    </div>
  );
}
