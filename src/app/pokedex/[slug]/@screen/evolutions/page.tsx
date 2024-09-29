import Screen, { ExtendedItem } from "@/components/RightSide/main.screen";
import { ExtendedPageProps } from "@/types/page";
import { getAllData } from "@/utils/api";
import { convertToItemProps } from "@/utils/data";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: ExtendedPageProps): Promise<Metadata> {
  const slug = params.slug;
  const data = await getAllData(slug);
  return {
    title: `${data.display_name} - Evolutions`,
    description: `Pokedex entry for the evolutions of ${data.display_name}`,
  };
}

export default async function EvolutionsScreen({ params }: ExtendedPageProps) {
  const slug = params.slug;
  const { evolution_chain, display_name } = await getAllData(slug);
  const formatted: Array<ExtendedItem> = evolution_chain.map(
    ({ display_name, name, details }) => ({
      title: display_name,
      href: `/pokedex/${name}/`,
      properties: details.map(convertToItemProps).flat(),
      key: name,
    })
  );
  return (
    <Screen title={`${display_name} - Evolutions`} displayItems={formatted} />
  );
}
