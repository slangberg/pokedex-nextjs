import { BaseParams, ExtendedPageProps } from "@/types/page";
import SlideShow from "@/components/LeftSide/image.slideshow";
import { getAllData } from "@/utils/api";
import ClientSlideshow from "@/components/LeftSide/image.slideshow.client";
export default async function SlideShowView({
  params,
  searchParams,
}: ExtendedPageProps<BaseParams, { imageIndex: string }>) {
  const slug = params.slug;
  const imageIndex = searchParams?.imageIndex;
  const pokemon = await getAllData(slug);
  return <ClientSlideshow data={pokemon?.images} activeIndex={imageIndex} />;
}
