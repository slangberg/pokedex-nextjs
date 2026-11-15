import Link from "next/link";

// Shown with a 404 status when a /pokedex/[slug] URL doesn't match any
// Pokémon in PokéAPI (see withNotFound in src/utils/api.ts).
export default function PokemonNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 p-8 text-center">
      <h1 className="font-heading text-lg font-bold">Pokémon not found</h1>
      <p className="text-sm">
        There&apos;s no Pokédex entry for that name or number.
      </p>
      <Link href="/pokedex" className="text-sm underline">
        Back to the Pokédex
      </Link>
    </div>
  );
}
