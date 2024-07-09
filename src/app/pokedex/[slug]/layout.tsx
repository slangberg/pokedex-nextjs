import MainLayout from "@/components/Global/main.layout";
import SlideShow from "@/components/LeftSide/image.slideshow";
import { UrlObject } from "@/types/data";
import {
  BaseParams,
  DPadConfig,
  ExtendedPageProps,
  PageProps,
} from "@/types/page";
import { genPokemonData, getAllData } from "@/utils/api";

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

type LayoutProps = ExtendedPageProps<BaseParams, { imageIndex: string }> & {
  screen: JSX.Element;
};

export default async function PokemonPageLayout({
  params,
  searchParams,
  screen,
}: LayoutProps) {
  const slug = params.slug;
  console.log({ searchParams });
  const imageIndex = searchParams;
  const data = await getAllData(slug);
  const activeIndex = imageIndex ? Number(imageIndex) : 0;

  const dpadLinks = genDpadLinks(data?.images || [], activeIndex);
  return (
    <MainLayout
      links={[
        { url: `/pokedex/${slug}/forms`, id: "forms", text: "Forms" },
        { url: `/pokedex/${slug}/games`, id: "games", text: "Games" },
        {
          url: `/pokedex/${slug}/abilities`,
          id: "abilities",
          text: "Abilities",
        },
      ]}
      left={<SlideShow data={data?.images || []} activeIndex={activeIndex} />}
      mini={<>mini</>}
      dPadLinks={dpadLinks}
    >
      {screen}
    </MainLayout>
  );
}
