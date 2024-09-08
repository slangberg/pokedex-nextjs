import LeftSide from "@/components/LeftSide/leftside";
import RightSide from "@/components/RightSide/right.side";
import styles from "./main.layout.module.css";
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
  "flex",
  "flex-col md:flex-row",
  styles.container
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
