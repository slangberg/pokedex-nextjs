import DisplayItem from "@/components/Global/display.item";
import { ExtendedPageProps } from "@/types/page";
import { getAllData } from "@/utils/api";
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
