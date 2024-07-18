import { getAllData } from "@/utils/api";
import { ExtendedPageProps } from "@/types/page";
import { Metadata } from "next";
import ScreenHeading from "@/components/RightSide/screen.heading";

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
  const { display_name } = await getAllData(slug);
  return (
    <>
      <ScreenHeading>{display_name} Overview</ScreenHeading>
    </>
  );
}
