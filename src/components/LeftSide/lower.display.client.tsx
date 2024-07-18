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

export default function LowerDisplayClient({
  images = [],
  pokemon = [],
}: LowerDisplayProps) {
  const imageData = usePokemonImageData(images);
  const pokemonData = usePokemonIndexes(pokemon);
  return (
    <>
      <ul className={styles.list}>
        <li>
          <span className={nanum.className}>Up:</span> Show #
          {pokemonData.prevCount} {addSpaces(pokemonData.prev || "")}
        </li>
        <li>
          <span className={nanum.className}>Down:</span> Show #
          {pokemonData.nextCount} {addSpaces(pokemonData.next || "")}
        </li>
        {!!imageData.total && (
          <>
            <li>
              <span className={nanum.className}>Left:</span> Show Image{" "}
              {`(${imageData.nextCount}/${imageData.total})`}
            </li>
            <li>
              <span className={nanum.className}>Right:</span> Show Image{" "}
              {`(${imageData.prevCount}/${imageData.total})`}
            </li>
          </>
        )}
        {!imageData.total && (
          <>
            <li>
              <span className={nanum.className}>Left:</span> None
            </li>
            <li>
              <span className={nanum.className}>Right:</span> None
            </li>
          </>
        )}
      </ul>
    </>
  );
}
