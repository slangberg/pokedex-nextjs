import DisplayItem from "@/components/Global/display.item";
import { ExtendedPageProps } from "@/types/page";
import { getAllData } from "@/utils/api";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: ExtendedPageProps): Promise<Metadata> {
  const slug = params.slug;
  const data = await getAllData(slug);
  return {
    title: `${data.display_name} - Abilities`,
    description: `Pokedex entry for the abilities of ${data.display_name}`,
  };
}

export default async function AbilitiesScreen({ params }: ExtendedPageProps) {
  const slug = params.slug;
  const { abilities } = await getAllData(slug);
  return (
    <>
      {abilities.map(({ name, summary }) => (
        <DisplayItem key={name} title={name} description={summary} />
      ))}
    </>
  );
}
