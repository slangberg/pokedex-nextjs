import Screen from "@/components/RightSide/main.screen";
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
    description: `Pokedex entry for the abilities of ${data.display_name}`,
  };
}

export default async function FormsScreen({ params }: ExtendedPageProps) {
  const slug = params.slug;
  const { forms, display_name } = await getAllData(slug);
  const formatted = forms.map(({ name, display_name, id, ...rest }) => ({
    title: display_name,
    properties: convertToItemProps(rest),
    key: name,
  }));
  return <Screen title={`${display_name} - Forms`} displayItems={formatted} />;
}
