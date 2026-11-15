import { ExtendedPageProps } from "@/types/page";
import { redirect } from "next/navigation";
export default async function Home({ params }: ExtendedPageProps) {
  const slug = params.slug;
  redirect(`/${slug}/overview`);
  return null;
}
