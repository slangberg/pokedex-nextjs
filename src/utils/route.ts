import { PokeResource, UrlObject } from "@/types/data";
import { ListData } from "@/types/page";
import { useParams, useSearchParams } from "next/navigation";
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

export const usePokemonImageData = (images: UrlObject[]): ListData => {
  if (!images.length) {
    return {
      total: 0,
      current: 0,
      nextCount: 0,
      prevCount: 0,
      next: null,
      prev: null,
    };
  }

  let indexes = { prev: images.length - 1, next: 1 };
  const imageIndex = usePageIndex();
  if (imageIndex === 0) {
    indexes = { prev: images.length - 1, next: 1 };
  } else if (imageIndex === images.length - 1) {
    indexes = { prev: images.length - 2, next: 0 };
  } else {
    indexes = { prev: imageIndex - 1, next: imageIndex + 1 };
  }

  return {
    total: images.length,
    current: imageIndex + 1,
    nextCount: indexes.next + 1,
    prevCount: indexes.prev + 1,
    next: null,
    prev: images[indexes.prev].description,
  };
};

export const usePokemonIndexes = (pokemon: PokeResource[]): ListData => {
  const { slug } = useParams();
  if (!slug && !pokemon.length) {
    return {
      next: null,
      prev: null,
      nextCount: 0,
      prevCount: 0,
      total: pokemon.length,
      current: 0,
    };
  }
  let indexes = { prev: pokemon.length - 1, next: 1 };
  const currentIndex = pokemon.findIndex(({ name }) => name === slug);

  if (currentIndex === 0 || currentIndex === -1) {
    indexes = { prev: pokemon.length - 1, next: 1 };
  } else if (currentIndex === pokemon.length - 1) {
    indexes = { prev: pokemon.length - 2, next: 0 };
  } else {
    indexes = { prev: currentIndex - 1, next: currentIndex + 1 };
  }

  return {
    total: pokemon.length,
    current: currentIndex + 1,
    nextCount: indexes.next + 1,
    prevCount: indexes.prev + 1,
    next: pokemon[indexes.next].name,
    prev: pokemon[indexes.prev].name,
  };
};
