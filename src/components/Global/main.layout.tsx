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
export default function MainLayout({ mini, left, children, dpad }: AsideProps) {
  return (
    <div className={classNames(styles.container)}>
      <LeftSide mini={mini} dpad={dpad}>
        {left}
      </LeftSide>
      <RightSide>{children}</RightSide>
    </div>
  );
}
