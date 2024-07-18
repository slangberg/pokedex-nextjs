import styles from "./button.nav.module.css";
import NavLink from "./main.nav.link";
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
    url: `evolutions`,
    id: "evolutions",
    text: "Evolutions",
  },
];
export default function ButtonNav() {
  return (
    <nav className={styles.container}>
      {links.map(({ url, id, text }) => (
        <NavLink path={url} key={id}>
          {text}
        </NavLink>
      ))}
    </nav>
  );
}
