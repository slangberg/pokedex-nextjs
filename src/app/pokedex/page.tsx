import MainLayout from "@/components/Global/main.layout";
import { ExtendedPageProps } from "@/types/page";
import { apiSearch } from "@/utils/api";
import ClientDpad from "@/components/LeftSide/dpad.client";
import { PokeResource } from "@/types/data";
import LowerDisplayClient from "@/components/LeftSide/lower.display.client";

type LayoutProps = ExtendedPageProps & {
  screen: JSX.Element;
  slideshow: JSX.Element;
};

export default async function PokemonPageLayout({ screen }: LayoutProps) {
  const allPokemon = await apiSearch<PokeResource[]>({
    url: "https://pokeapi.co/api/v2/pokemon",
    key: "results",
    params: { limit: "1302" },
  });

  return (
    <MainLayout
      left={<h1>EMPTY</h1>}
      mini={<LowerDisplayClient pokemon={allPokemon} />}
      dpad={<ClientDpad pokemon={allPokemon} />}
    >
      {screen}
    </MainLayout>
  );
}
