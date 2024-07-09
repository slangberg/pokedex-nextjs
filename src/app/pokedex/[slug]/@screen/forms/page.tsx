import DisplayItem from "@/components/Global/display.item";
import { ExtendedPageProps } from "@/types/page";
import { getAllData } from "@/utils/api";
import { convertToItemProps } from "@/utils/data";
export default async function AbilitiesScreen({
  params,
  searchParams,
}: ExtendedPageProps) {
  const slug = params.slug;
  const { forms } = await getAllData(slug);
  console.log({ searchParams });
  return (
    <>
      {forms.map(({ name, id, ...rest }) => {
        const props = convertToItemProps(rest);
        return <DisplayItem key={name} title={name} properties={props} />;
      })}
    </>
  );
}
