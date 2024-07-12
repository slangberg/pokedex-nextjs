import styles from "./right.side.module.css";
import { metalTexture } from "@/utils/styles";
import ButtonNav from "./button.nav";
import MainDisplay from "./main.display";
interface RightSide {
  children?: JSX.Element;
}

export default function Button({ children }: RightSide) {
  return (
    <div className={metalTexture(styles.container)}>
      <div className={styles.cutout} />
      <div className={metalTexture(styles.cutoutOutline)} />
      <div className={styles.body}>
        <MainDisplay>{children}</MainDisplay>
        <ButtonNav />
      </div>
    </div>
  );
}
