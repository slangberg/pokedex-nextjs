import MainLayout from "@/components/Global/main.layout";
import SlideShow from "@/components/LeftSide/image.slideshow";
import { UrlObject } from "@/types/data";
import { BaseParams, DPadConfig, ExtendedPageProps } from "@/types/page";
import { getAllData } from "@/utils/api";
import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata({ params }: ExtendedPageProps) {
  const slug = params.slug;
  const pokemon = await getAllData(slug);
  return {
    title: pokemon.displayName,
  };
}

type LayoutProps = ExtendedPageProps<BaseParams, { imageIndex: string }> & {
  screen: ReactNode;
  slideshow: ReactNode;
  dpad: ReactNode;
};

export default async function PokemonPageLayout({
  params,
  dpad,
  screen,
  slideshow,
}: LayoutProps) {
  const slug = params.slug;
  const pokemon = await getAllData(slug);
  return (
    <MainLayout
      title={pokemon.displayName}
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
      left={<div>Test</div>}
      mini={<>mini</>}
    >
      {screen}
    </MainLayout>
  );
}
