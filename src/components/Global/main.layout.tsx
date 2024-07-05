import LeftSide from "@/components/LeftSide/leftside";
import RightSide from "@/components/RightSide/right.side";
import styles from "./main.layout.module.css";
interface AsideProps {
  left?: JSX.Element;
  children?: JSX.Element;
  mini?: JSX.Element;
  links: Array<{ url: string; id: string; text: string }>;
}
export default function MainLayout({
  mini,
  left,
  children,
  links,
}: AsideProps) {
  return (
    <div className={styles.container}>
      <LeftSide mini={mini}>{left}</LeftSide>
      <RightSide links={links}>{children}</RightSide>
    </div>
  );
}
