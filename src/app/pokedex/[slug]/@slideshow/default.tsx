"use client";
import { BaseParams, ExtendedPageProps } from "@/types/page";
import SlideShow from "@/components/LeftSide/image.slideshow";
import { getAllData } from "@/utils/api";

export default async function SlideShowView({
  params,
  searchParams,
}: ExtendedPageProps<BaseParams, { imageIndex: string }>) {
  const slug = params.slug;
  const imageIndex = searchParams?.imageIndex;
  const pokemon = await getAllData(slug);
  const activeIndex = imageIndex ? Number(imageIndex) : 0;
  return <SlideShow data={pokemon?.images} activeIndex={activeIndex} />;
}
