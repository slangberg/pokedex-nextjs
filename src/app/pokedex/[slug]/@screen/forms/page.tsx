import DisplayItem from "@/components/Global/display.item";
import ScreenHeading from "@/components/RightSide/screen.heading";
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
  return (
    <>
      <ScreenHeading>{display_name} - Forms</ScreenHeading>
      {forms.map(({ name, display_name, id, ...rest }) => {
        const props = convertToItemProps(rest);
        return (
          <DisplayItem key={name} title={display_name} properties={props} />
        );
      })}
    </>
  );
}
