import MainLayout from "@/components/Global/main.layout";
import { PageProps } from "@/types/page";
import { apiSearch } from "@/utils/api";

const getCombinedData = async (slug?: string): any => {
  if (slug) {
    const pokemon = await apiSearch<any>({ url: `/pokemon/${slug}` });
    const species = await apiSearch<any>({
      url: `/pokemon-species/${pokemon.species.name}`,
    });
    return {
      ...pokemon,
      species: species,
    };
  }
  return null;
};

export default async function PokemonPage({ params }: PageProps) {
  const slug = params.slug as string;
  const data = await getCombinedData(slug);
  console.log(data);
  return (
    <MainLayout
      links={[{ url: "#", id: "test", text: "Moves" }]}
      left={<>Test</>}
      mini={<>mini</>}
    >
      <h1>Test</h1>
    </MainLayout>
  );
}
