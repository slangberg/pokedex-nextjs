import { DisplayValue } from "@/types/data";
import styles from "./display.item.module.css";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";
import { nanum } from "@/fonts";
import classNames from "classnames";
interface LightProps {
  title: string;
  description?: string;
  href?: string;
  properties?: Array<{
    name: string;
    value: DisplayValue;
  }>;
}

export default function DisplayItem({
  title,
  description,
  properties,
  href,
}: LightProps) {
  const describedBy =
    description && properties
      ? "pokdex-item-description pokdex-item-properties"
      : description
      ? "pokdex-item-description"
      : properties
      ? "pokdex-item-properties"
      : undefined;

  const Content = (
    <>
      <header>
        <h2
          id="pokdex-item-title"
          className={classNames(styles.title, nanum.className)}
        >
          {href && <FaLink className={styles.linkIcon} />} {title}
        </h2>
      </header>
      <section id="pokdex-item-description">{description}</section>
      {properties && !!properties.length && (
        <section id="pokdex-item-properties">
          <ul className={styles.properties}>
            {properties.map(({ name, value }) => (
              <li key={name}>
                <span className={classNames(styles.name, nanum.className)}>
                  {name}:
                </span>{" "}
                {value}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );

  if (!href) {
    return (
      <article
        aria-labelledby="pokdex-item-title"
        aria-describedby={describedBy}
        className={styles.container}
      >
        {Content}
      </article>
    );
  }

  return (
    <Link
      href={href}
      aria-labelledby="pokdex-item-title"
      aria-describedby={describedBy}
      className={styles.link}
    >
      <article className={styles.container}>{Content}</article>
    </Link>
  );
}
