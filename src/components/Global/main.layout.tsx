import LeftSide from "@/components/LeftSide/leftside";
import RightSide from "@/components/RightSide/right.side";
import styles from "./main.layout.module.css";
import { ReactNode } from "react";
interface AsideProps {
  left?: JSX.Element | ReactNode;
  children?: JSX.Element | undefined;
  mini?: JSX.Element;
  links: Array<{ url: string; id: string; text: string }>;
  dpad: JSX.Element | ReactNode;
}
export default function MainLayout({
  mini,
  left,
  children,
  links,
  dpad,
}: AsideProps) {
  return (
    <div className={styles.container}>
      <LeftSide mini={mini} dpad={dpad}>
        {left}
      </LeftSide>
      <RightSide links={links}>{children}</RightSide>
    </div>
  );
}
