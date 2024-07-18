import DisplayItem from "@/components/Global/display.item";
import ScreenHeading from "@/components/RightSide/screen.heading";
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
  const { abilities, display_name } = await getAllData(slug);
  return (
    <>
      <ScreenHeading>{display_name} - Abilities</ScreenHeading>
      {abilities.map(({ name, summary }) => (
        <DisplayItem key={name} title={name} description={summary} />
      ))}
    </>
  );
}
