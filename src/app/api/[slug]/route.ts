import { genPokemonData, NotFoundError } from "@/utils/api";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  try {
    const data = await genPokemonData(slug);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return Response.json(
        { error: `No Pokémon found for "${slug}"` },
        { status: 404 }
      );
    }
    throw error;
  }
}
