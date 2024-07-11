import { BaseParams, DPadConfig, ExtendedPageProps } from "@/types/page";
import SlideShow from "@/components/LeftSide/image.slideshow";
import { getAllData } from "@/utils/api";
import { UrlObject } from "@/types/data";
import Dpad from "@/components/LeftSide/dpad";

const genDpadLinks = (images: UrlObject[], activeIndex: number): DPadConfig => {
  if (!images?.length) {
    return {};
  } else {
    const imageCount = images.length;
    const nextIndex = activeIndex + 1 < imageCount ? activeIndex + 1 : 0;
    const previousIndex =
      activeIndex - 1 >= 0 ? activeIndex - 1 : imageCount - 1;
    return {
      left: {
        type: "param",
        value: previousIndex,
        description: `Show image ${images[previousIndex].description}`,
        paramValue: "imageIndex",
      },
      right: {
        type: "param",
        value: nextIndex,
        description: `Show image ${images[nextIndex].description}`,
        paramValue: "imageIndex",
      },
    };
  }
};

export default async function DpadView({
  params,
  searchParams,
}: ExtendedPageProps<BaseParams, { imageIndex: string }>) {
  const slug = params.slug;
  const imageIndex = searchParams?.imageIndex;
  const { images } = await getAllData(slug);
  const activeIndex = imageIndex ? Number(imageIndex) : 0;
  const dPadLinks = genDpadLinks(images, activeIndex);
  console.log({ img: images.length, activeIndex, dPadLinks });
  return <Dpad config={dPadLinks} />;
}
