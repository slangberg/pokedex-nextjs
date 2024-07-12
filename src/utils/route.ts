import { PokeResource } from "@/types/data";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
export const usePageIndex = () => {
  const searchParams = useSearchParams();
  const preIndex = searchParams.get("imageIndex")
    ? Number(searchParams.get("imageIndex"))
    : 0;
  const [localIndex, setLocalIndex] = useState(preIndex);
  useEffect(() => {
    const imageIndex = searchParams.get("imageIndex");
    const newIndex = imageIndex ? Number(imageIndex) : 0;
    if (localIndex !== newIndex) {
      setLocalIndex(newIndex);
    }
  }, [searchParams]);

  return localIndex;
};

export const usePokemonIndexes = (
  all: PokeResource[]
): { nextPokemon: string | null; prevPokemon: string | null } => {
  const { slug } = useParams();
  if (!slug || !all.length) {
    return { nextPokemon: null, prevPokemon: null };
  }
  let indexes = { prev: all.length - 1, next: 1 };
  const currentIndex = all.findIndex(({ name }) => name === slug);

  if (currentIndex === 0) {
    indexes = { prev: all.length - 1, next: 1 };
  } else if (currentIndex === all.length - 1) {
    indexes = { prev: all.length - 2, next: 0 };
  } else {
    indexes = { prev: currentIndex - 1, next: currentIndex + 1 };
  }

  return {
    nextPokemon: all[indexes.next].name,
    prevPokemon: all[indexes.prev].name,
  };
};
