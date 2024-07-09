import { DisplayValue } from "@/types/data";
import styles from "./display.item.module.css";
interface LightProps {
  title: string;
  description?: string;
  properties?: Array<{
    name: string;
    value: DisplayValue;
  }>;
}

export default function DisplayItem({
  title,
  description,
  properties,
}: LightProps) {
  const describedBy =
    description && properties
      ? "pokdex-item-description pokdex-item-properties"
      : description
      ? "pokdex-item-description"
      : properties
      ? "pokdex-item-properties"
      : undefined;
  return (
    <article
      aria-labelledby="pokdex-item-title"
      aria-describedby={describedBy}
      className={styles.container}
    >
      <header>
        <h2 id="pokdex-item-title">{title}</h2>
      </header>
      <section id="pokdex-item-description">{description}</section>
      {properties && properties.length && (
        <section id="pokdex-item-properties">
          <ul className={styles.properties}>
            {properties.map(({ name, value }) => (
              <li key={name}>{`${name}: ${value}`}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
