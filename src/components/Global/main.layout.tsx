import LeftSide from "@/components/LeftSide/leftside";
import RightSide from "@/components/RightSide/right.side";
import styles from "./main.layout.module.css";
import { DPadConfig } from "@/types/page";
import { ReactNode } from "react";
interface AsideProps {
  left?: ReactNode;
  children?: ReactNode | undefined;
  mini?: JSX.Element;
  title?: string;
  links: Array<{ url: string; id: string; text: string }>;
}
export default function MainLayout({
  mini,
  left,
  children,
  links,
  title,
}: AsideProps) {
  return (
    <div className={styles.container}>
      <LeftSide mini={mini}>{left}</LeftSide>
      <RightSide links={links} title={title}>
        {children}
      </RightSide>
    </div>
  );
}
