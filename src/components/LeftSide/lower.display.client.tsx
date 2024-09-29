"use client";

import { usePokemonImageData, usePokemonIndexes } from "@/utils/route";
import styles from "./lower.display.module.css";
import { PokeResource, UrlObject } from "@/types/data";
import { addSpaces } from "@/utils/data";
import { nanum } from "@/fonts";
import classNames from "classnames";
interface LowerDisplayProps {
  images?: UrlObject[];
  pokemon: PokeResource[];
}

function Item({ heading, text }: { heading: string; text: string }) {
  return (
    <div className="flex items-center">
      <span className="font-heading text-sm mr-1">{heading}:</span>
      <span className="text-xs">{text}</span>
    </div>
  );
}

export default function LowerDisplayClient({
  images = [],
  pokemon = [],
}: LowerDisplayProps) {
  const imageData = usePokemonImageData(images);
  const pokemonData = usePokemonIndexes(pokemon);
  return (
    <>
      <div className="flex flex-col">
        <Item
          heading="Up"
          text={`${pokemonData.nextCount} ${addSpaces(pokemonData.next || "")}`}
        />
        <Item
          heading="Down"
          text={`${pokemonData.prevCount} ${addSpaces(pokemonData.prev || "")}`}
        />
        {!!imageData.total && (
          <>
            <Item
              heading="Left"
              text={`Show Image (${imageData.nextCount}/${imageData.total})`}
            />
            <Item
              heading="Right"
              text={`Show Image (${imageData.prevCount}/${imageData.total})`}
            />
          </>
        )}
        {!imageData.total && (
          <>
            <Item heading="Left" text="None" />
            <Item heading="Right" text="None" />
          </>
        )}
      </div>
    </>
  );
}
