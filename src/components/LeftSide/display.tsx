import { ReactNode } from "react";
import styles from "./display.module.css";
import Light from "@/components/Global/light";
interface DisplayProps {
  children?: ReactNode;
}
export default function Display({ children }: DisplayProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Light size={10} color="#e93a3a" />
        <Light size={10} color="#0ec518" />
      </div>
      <aside
        className={styles.display}
        aria-labelledby="fig2-caption"
        role="complementary"
      >
        {children}
      </aside>
      <div className={styles.bottom}>
        <Light size={20} color="#e93a3a" />
        <div>
          <div className={styles.speakerLine} />
          <div className={styles.speakerLine} />
          <div className={styles.speakerLine} />
          <div className={styles.speakerLine} />
        </div>
      </div>
    </div>
  );
}
