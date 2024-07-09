import MainLayout from "@/components/Global/main.layout";
import SlideShow from "@/components/LeftSide/image.slideshow";
import { UrlObject } from "@/types/data";
import { DPadConfig, PageProps } from "@/types/page";
import { genPokemonData } from "@/utils/api";
import { constructSearchParams } from "@/utils/navigation";

const getAllData = async (slug?: string) => {
  if (slug) {
    const pokemon = await genPokemonData(slug);
    return pokemon;
  }
  return null;
};

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

export default async function PokemonPage({ params, searchParams }: PageProps) {
  const slug = params.slug as string;
  const imageIndex = searchParams;
  const data = await getAllData(slug);
  const activeIndex = imageIndex ? Number(imageIndex) : 0;

  const dpadLinks = genDpadLinks(data?.images || [], activeIndex);

  return (
    <MainLayout
      links={[{ url: "#", id: "test", text: "Moves" }]}
      left={<SlideShow data={data?.images || []} activeIndex={activeIndex} />}
      mini={<>mini</>}
      dPadLinks={dpadLinks}
    >
      <h1>Test</h1>
    </MainLayout>
  );
}
