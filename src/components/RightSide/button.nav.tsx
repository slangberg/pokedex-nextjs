import { CSSProperties } from "react";
import styles from "./button.nav.module.css";
import classnames from "classnames";
import Link from "next/link";
interface ButtonNavProps {
  links: Array<{ url: string; id: string; text: string }>;
}

export default function ButtonNav({ links }: ButtonNavProps) {
  return (
    <nav className={styles.container}>
      {links.map(({ url, id, text }) => (
        <Link href={url} key={id} className={styles.link}>
          {text}
        </Link>
      ))}
    </nav>
  );
}
