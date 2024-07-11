import DisplayItem from "@/components/Global/display.item";
import { ExtendedPageProps } from "@/types/page";
import { getAllData } from "@/utils/api";
import { convertToItemProps } from "@/utils/data";
export default async function EvolutionsScreen({ params }: ExtendedPageProps) {
  const slug = params.slug;
  const { evolution_chain } = await getAllData(slug);
  return (
    <>
      {evolution_chain.map(({ displayName, name, details }) => {
        const formatted = details.map(convertToItemProps).flat();
        return (
          <DisplayItem
            key={name}
            href={`/pokedex/${name}/`}
            title={displayName}
            properties={formatted}
          />
        );
      })}
    </>
  );
}
