import Screen from "@/components/RightSide/main.screen";
import { ExtendedPageProps } from "@/types/page";
import { apiSearch, withNotFound } from "@/utils/api";
import { addSpaces } from "@/utils/data";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: ExtendedPageProps): Promise<Metadata> {
  const { name } = await withNotFound(
    apiSearch<{ name: string }>({
      url: `https://pokeapi.co/api/v2/pokemon/${params.slug}`,
    })
  );
  const displayName = addSpaces(name);
  return {
    title: `${displayName} - Moves`,
    description: `Moves that ${displayName} can learn`,
  };
}

export default async function MovesScreen({ params }: ExtendedPageProps) {
  const { name, moves } = await withNotFound(
    apiSearch<{
      name: string;
      moves: Array<{ move: { name: string } }>;
    }>({
      url: `https://pokeapi.co/api/v2/pokemon/${params.slug}`,
    })
  );

  const displayName = addSpaces(name);
  const formatted = moves.map(({ move }) => ({
    title: addSpaces(move.name),
    key: move.name,
  }));

  return <Screen title={`${displayName} - Moves`} displayItems={formatted} />;
}
