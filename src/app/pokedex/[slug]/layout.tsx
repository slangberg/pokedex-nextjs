import MainLayout from "@/components/Global/main.layout";
import { BaseParams, ExtendedPageProps } from "@/types/page";

type LayoutProps = ExtendedPageProps<BaseParams, { imageIndex: string }> & {
  screen: JSX.Element;
  slideshow: JSX.Element;
  dpad: JSX.Element;
};

export default async function PokemonPageLayout({
  params,
  screen,
  slideshow,
  dpad,
}: LayoutProps) {
  const slug = params.slug;
  return (
    <MainLayout
      links={[
        { url: `/pokedex/${slug}`, id: "overview", text: "Overview" },
        { url: `/pokedex/${slug}/forms`, id: "forms", text: "Forms" },
        { url: `/pokedex/${slug}/games`, id: "games", text: "Games" },
        {
          url: `/pokedex/${slug}/abilities`,
          id: "abilities",
          text: "Abilities",
        },
        {
          url: `/pokedex/${slug}/evolutions`,
          id: "evolutions",
          text: "Evolutions",
        },
      ]}
      left={slideshow}
      dpad={dpad}
      mini={<>mini</>}
    >
      {screen}
    </MainLayout>
  );
}
