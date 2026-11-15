import MainLayout from "@/components/Global/main.layout";
import { apiSearch } from "@/utils/api";
import ClientDpad from "@/components/LeftSide/dpad.client";
import { PokeResource } from "@/types/data";
import LowerDisplayClient from "@/components/LeftSide/lower.display.client";
import SearchBar from "@/components/RightSide/search.bar.client";

// The D-pad and hint display read the URL with useSearchParams(), so this
// page can't be prerendered at build time. Render it per request instead.
export const dynamic = "force-dynamic";

export default async function Home() {
  const allPokemon = await apiSearch<PokeResource[]>({
    url: "https://pokeapi.co/api/v2/pokemon",
    key: "results",
    params: { limit: "1302" },
  });

  return (
    <MainLayout
      left={<p className="sr-only">Select a Pokémon to view its details</p>}
      mini={<LowerDisplayClient pokemon={allPokemon} />}
      dpad={<ClientDpad pokemon={allPokemon} />}
      search={<SearchBar pokemon={allPokemon} />}
    >
      <></>
    </MainLayout>
  );
}
