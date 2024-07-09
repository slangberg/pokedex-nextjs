import DisplayItem from "@/components/Global/display.item";
import { ExtendedPageProps } from "@/types/page";
import { getAllData } from "@/utils/api";
export default async function GamesScreen({ params }: ExtendedPageProps) {
  const slug = params.slug;
  const { games } = await getAllData(slug);
  return (
    <>
      {games.map((name) => {
        return <DisplayItem key={name} title={name} />;
      })}
    </>
  );
}
