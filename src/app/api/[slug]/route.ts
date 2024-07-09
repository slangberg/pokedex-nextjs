import { genPokemonData } from "@/utils/api";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const data = await genPokemonData(slug);
  return new Response(JSON.stringify({ data: data }), {
    headers: { "Content-Type": "application/json" },
  });
}
