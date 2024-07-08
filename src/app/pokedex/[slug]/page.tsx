import MainLayout from "@/components/Global/main.layout";
import SlideShow from "@/components/LeftSide/image.slideshow";
import { DPadConfig, PageProps } from "@/types/page";
import { apiSearch, getImagesFromObject } from "@/utils/api";
import { constructSearchParams } from "@/utils/navigation";

const getCombinedData = async (slug?: string): any => {
  if (slug) {
    const pokemon = await apiSearch<any>({ url: `/pokemon/${slug}` });
    const species = await apiSearch<any>({
      url: `/pokemon-species/${pokemon.species.name}`,
    });
    const images = getImagesFromObject(pokemon.sprites.other);
    return {
      ...pokemon,
      images,
      species: species,
    };
  }
  return null;
};

const genDpadLinks = (images: any[], activeIndex: number): DPadConfig => {
  const imageCount = images.length;
  const nextIndex = activeIndex + 1 < imageCount ? activeIndex + 1 : 0;
  const previousIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : imageCount - 1;
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
};

export default async function PokemonPage({ params, searchParams }: PageProps) {
  const slug = params.slug as string;
  const imageIndex = searchParams;
  const data = await getCombinedData(slug);
  const activeIndex = imageIndex ? Number(imageIndex) : 0;

  const dpadLinks = genDpadLinks(data.images, activeIndex);

  return (
    <MainLayout
      links={[{ url: "#", id: "test", text: "Moves" }]}
      left={<SlideShow data={data.sprites} activeIndex={activeIndex} />}
      mini={<>mini</>}
      dPadLinks={dpadLinks}
    >
      <h1>Test</h1>
    </MainLayout>
  );
}
