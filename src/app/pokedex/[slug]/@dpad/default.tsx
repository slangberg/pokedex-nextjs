import { BaseParams, DPadConfig, ExtendedPageProps } from "@/types/page";
import { getAllData } from "@/utils/api";
import Dpad from "@/components/LeftSide/dpad";

export default async function DpadView({
  params,
}: ExtendedPageProps<BaseParams, { imageIndex: string }>) {
  const slug = params.slug;
  const { images } = await getAllData(slug);
  console.log({ images, slug });
  return <Dpad images={images} />;
}
