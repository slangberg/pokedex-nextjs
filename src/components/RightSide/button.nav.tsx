import classNames from "classnames";
import styles from "./button.nav.module.css";
import NavLink from "./main.nav.link";

const buttonMenuStyles = classNames("grid grid-rows-2 grid-flow-col gap-0");

const links: Array<{ url: string; id: string; text: string }> = [
  { url: `overview`, id: "overview", text: "Overview" },
  {
    url: `forms`,
    id: "forms",
    text: "Forms",
  },
  { url: `games`, id: "games", text: "Games" },
  {
    url: `abilities`,
    id: "abilities",
    text: "Abilities",
  },
  {
    url: `moves`,
    id: "moves",
    text: "Moves",
  },
  {
    url: `evolutions`,
    id: "evolutions",
    text: "Evolutions",
  },
];
export default function ButtonNav() {
  return (
    <nav className={buttonMenuStyles}>
      {links.map(({ url, id, text }) => (
        <NavLink path={url} key={id}>
          {text}
        </NavLink>
      ))}
    </nav>
  );
}
