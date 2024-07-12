import MainLayout from "@/components/Global/main.layout";
import { BaseParams, ExtendedPageProps } from "@/types/page";
import { apiSearch, getAllData } from "@/utils/api";
import ClientSlideshow from "@/components/LeftSide/image.slideshow.client";
import ClientDpad from "@/components/LeftSide/dpad.client";
import { Metadata } from "next";
import { PokeResource } from "@/types/data";

type LayoutProps = ExtendedPageProps & {
  screen: JSX.Element;
  slideshow: JSX.Element;
};

export async function generateMetadata({
  params,
}: ExtendedPageProps): Promise<Metadata> {
  const slug = params.slug;
  const data = await getAllData(slug);
  return {
    title: `${data.display_name} - Overview`,
    description: `Pokedex overview of ${data.display_name}`,
  };
}

export default async function PokemonPageLayout({
  params,
  screen,
}: LayoutProps) {
  const slug = params.slug;
  const data = await getAllData(slug);
  const allPokemon = await apiSearch<PokeResource[]>({
    url: "https://pokeapi.co/api/v2/pokemon",
    key: "results",
    params: { limit: "1302" },
  });

  return (
    <MainLayout
      left={<ClientSlideshow data={data.images} />}
      mini={<>mini</>}
      dpad={<ClientDpad images={data.images} pokemon={allPokemon} />}
    >
      {screen}
    </MainLayout>
  );
}
