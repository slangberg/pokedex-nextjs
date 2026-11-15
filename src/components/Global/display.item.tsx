import { DisplayValue } from "@/types/data";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";
import classNames from "classnames";
export interface DisplayItemProps {
  title: string;
  description?: string;
  href?: string;
  properties?: Array<{
    name: string;
    value: DisplayValue;
  }>;
}
const containerClasses = classNames("bordered-container");

const titleClasses = classNames(
  "capitalize",
  "flex",
  "items-center",
  "text-lg",
  "font-heading"
);

const listClasses = classNames(
  "list-square",
  "p-0 mx-0 mt-2",
  "no-underline",
  "list-inside"
);

export default function DisplayItem({
  title,
  description,
  properties,
  href,
}: DisplayItemProps) {
  const itemId = `pokedex-item-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const titleId = `${itemId}-title`;
  const descId = `${itemId}-description`;
  const propsId = `${itemId}-properties`;

  const describedBy =
    description && properties
      ? `${descId} ${propsId}`
      : description
      ? descId
      : properties
      ? propsId
      : undefined;

  const Content = (
    <>
      <header>
        <h2 id={titleId} className={titleClasses}>
          {href && <FaLink className="mr-3" aria-hidden="true" />} {title}
        </h2>
      </header>
      <section id={descId}>{description}</section>
      {properties && !!properties.length && (
        <section id={propsId}>
          <ul className={listClasses}>
            {properties.map(({ name, value }) => (
              <li key={name} className="leading-5">
                <span className="capitalize font-bold font-heading text-base mr-1">
                  {name}:
                </span>
                <span className="text-sm">{value}</span>
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
        aria-labelledby={titleId}
        aria-describedby={describedBy}
        className={containerClasses}
      >
        {Content}
      </article>
    );
  }

  return (
    <Link
      href={href}
      aria-labelledby={titleId}
      aria-describedby={describedBy}
      className="no-underline hover:opacity-80"
    >
      <article className="bordered-container">{Content}</article>
    </Link>
  );
}
