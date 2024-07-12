import DisplayItem from "@/components/Global/display.item";
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
  const { evolution_chain } = await getAllData(slug);
  return (
    <>
      {evolution_chain.map(({ display_name, name, details }) => {
        const formatted = details.map(convertToItemProps).flat();
        return (
          <DisplayItem
            key={name}
            href={`/pokedex/${name}/`}
            title={display_name}
            properties={formatted}
          />
        );
      })}
    </>
  );
}
