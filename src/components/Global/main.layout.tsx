import LeftSide from "@/components/LeftSide/leftside";
import RightSide from "@/components/RightSide/right.side";
import styles from "./main.layout.module.css";
import { DPadConfig } from "@/types/page";
interface AsideProps {
  left?: JSX.Element;
  children?: JSX.Element | undefined;
  mini?: JSX.Element;
  links: Array<{ url: string; id: string; text: string }>;
  dPadLinks: DPadConfig;
}
export default function MainLayout({
  mini,
  left,
  children,
  links,
  dPadLinks,
}: AsideProps) {
  return (
    <div className={styles.container}>
      <LeftSide mini={mini} dPadLinks={dPadLinks}>
        {left}
      </LeftSide>
      <RightSide links={links}>{children}</RightSide>
    </div>
  );
}
