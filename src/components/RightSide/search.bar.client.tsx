"use client";

import { FormEvent, KeyboardEvent, useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { FaTimes } from "react-icons/fa";
import { PokeResource } from "@/types/data";
import { addSpaces } from "@/utils/data";
import Light from "@/components/Global/light";

interface SearchBarProps {
  pokemon: PokeResource[];
}

const MAX_RESULTS = 6;

// "Mr. Mime", "mr mime" and "mr-mime" all normalise to "mr-mime".
const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[.'’]/g, "")
    .replace(/\s+/g, "-");

// PokéAPI resource URLs end in the Pokémon's id, e.g. .../pokemon/25/
const idFromUrl = (url: string) => url.match(/\/(\d+)\/?$/)?.[1];

/** Names that start with the query first, then names that contain it. */
const findMatches = (
  pokemon: PokeResource[],
  query: string
): PokeResource[] => {
  const q = normalize(query);
  if (!q) return [];

  if (/^\d+$/.test(q)) {
    const byId = pokemon.find(({ url }) => idFromUrl(url) === String(Number(q)));
    return byId ? [byId] : [];
  }

  const starts: PokeResource[] = [];
  const contains: PokeResource[] = [];
  for (const entry of pokemon) {
    if (entry.name.startsWith(q)) starts.push(entry);
    else if (entry.name.includes(q)) contains.push(entry);
    if (starts.length >= MAX_RESULTS) break;
  }
  return [...starts, ...contains].slice(0, MAX_RESULTS);
};

// Dark panel, like the screens under the keypad in the reference drawing.
const screenStyles = classNames(
  "relative flex-1 min-w-0",
  "bg-[#2b2121] rounded-md",
  "shadow-inset-2",
  "border-2 border-[rgba(111,4,20,0.8)]"
);

const inputStyles = classNames(
  "w-full h-10 px-3",
  "bg-transparent",
  "font-display text-sm text-[#d7f5d0] placeholder:text-[#8a9a86]",
  "caret-[#d7f5d0]",
  "outline-none"
);

const listStyles = classNames(
  "absolute left-0 right-0 bottom-full mb-2 z-10",
  "bg-[#2b2121] rounded-md",
  "border-2 border-[rgba(111,4,20,0.8)]",
  "drop-shadow-deep",
  "py-1"
);

// The pair of white buttons from the drawing.
const pairStyles = classNames(
  "flex h-10 shrink-0",
  "rounded-md overflow-hidden",
  "border-2 border-[rgba(111,4,20,0.8)]",
  "shadow-[0px_-1px_4px_1px_rgba(27,26,26,0.4)]"
);

const whiteButtonStyles = classNames(
  "flex items-center justify-center",
  "bg-[#f4f4f4] text-[#2b2121]",
  "font-heading text-xs font-bold uppercase",
  "shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)]",
  "hover:bg-white active:shadow-none",
  "disabled:text-[#9ca3af] disabled:cursor-not-allowed"
);

export default function SearchBar({ pokemon }: SearchBarProps) {
  const router = useRouter();
  const id = useId();
  const listId = `${id}-results`;
  const optionId = (index: number) => `${id}-option-${index}`;

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const matches = useMemo(() => findMatches(pokemon, query), [pokemon, query]);
  const showList = open && matches.length > 0;

  const go = (entry?: PokeResource) => {
    if (!entry) return;
    setQuery("");
    setOpen(false);
    router.push(`/${entry.name}/overview`);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    go(matches[showList ? active : 0]);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && matches.length) {
      event.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % matches.length);
    } else if (event.key === "ArrowUp" && matches.length) {
      event.preventDefault();
      setOpen(true);
      setActive((i) => (i - 1 + matches.length) % matches.length);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className="flex items-center gap-2 md:gap-3 mt-3"
    >
      <div className={screenStyles}>
        <label htmlFor={`${id}-input`} className="sr-only">
          Search Pokémon by name or number
        </label>
        <input
          id={`${id}-input`}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listId}
          aria-activedescendant={showList ? optionId(active) : undefined}
          autoComplete="off"
          spellCheck={false}
          placeholder="Search name or no."
          className={inputStyles}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />
        <ul id={listId} role="listbox" className={showList ? listStyles : "hidden"}>
          {matches.map((entry, index) => (
            <li
              key={entry.name}
              id={optionId(index)}
              role="option"
              aria-selected={index === active}
              // mousedown, not click: it fires before the input's blur closes the list
              onMouseDown={(event) => {
                event.preventDefault();
                go(entry);
              }}
              onMouseEnter={() => setActive(index)}
              className={classNames(
                "flex justify-between gap-2 px-3 py-1 cursor-pointer",
                "font-display text-sm capitalize",
                index === active
                  ? "bg-[#2d77f9] text-white"
                  : "text-[#d7f5d0]"
              )}
            >
              <span>{addSpaces(entry.name)}</span>
              <span className="opacity-70">#{idFromUrl(entry.url)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={pairStyles}>
        <button
          type="submit"
          className={classNames(whiteButtonStyles, "w-12")}
          disabled={!matches.length}
        >
          Go
        </button>
        <button
          type="button"
          aria-label="Clear search"
          className={classNames(
            whiteButtonStyles,
            "w-10 border-l-2 border-[rgba(111,4,20,0.35)]"
          )}
          onClick={() => {
            setQuery("");
            setOpen(false);
          }}
          disabled={!query}
        >
          <FaTimes aria-hidden="true" />
        </button>
      </div>

      {/* Yellow light from the drawing: lit while the query has a match. */}
      <Light
        color="#ffc334"
        className={classNames(
          "w-4 h-4 md:w-5 md:h-5 shrink-0 transition-opacity",
          matches.length ? "opacity-100" : "opacity-40"
        )}
      />
    </form>
  );
}
