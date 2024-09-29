import { convertOverviewToDisplayItems, getAllData } from "@/utils/api";
import { ExtendedPageProps } from "@/types/page";
import { Metadata } from "next";
import Screen from "@/components/RightSide/main.screen";

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

export default async function OverView({ params }: ExtendedPageProps) {
  const slug = params.slug;
  const { overview, display_name } = await getAllData(slug);

  return (
    <Screen
      title={`${display_name} - Overview`}
      displayItems={convertOverviewToDisplayItems(overview)}
    />
  );
}
