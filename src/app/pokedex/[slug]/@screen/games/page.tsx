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
    title: `${data.display_name} - Games`,
    description: `Pokedex entry for the games that ${data.display_name} is in`,
  };
}

export default async function GamesScreen({ params }: ExtendedPageProps) {
  const slug = params.slug;
  const { games, display_name } = await getAllData(slug);
  return (
    <>
      <ScreenHeading>{display_name} - Games</ScreenHeading>
      {games.map((name) => {
        return <DisplayItem key={name} title={name} />;
      })}
    </>
  );
}
