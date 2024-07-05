const BASE_URL = "https://pokeapi.co/api/v2/";

export interface APIConfig {
  url: string;
  params?: Record<string, string>;
  error?: string;
}
export const apiSearch = async <T>({
  url,
  params,
  error,
}: APIConfig): Promise<T> => {
  let queryString = "";

  if (params) {
    const compiled = new URLSearchParams(params).toString();
    queryString = `?${compiled}`;
  }

  const response = await fetch(`${BASE_URL}/${url}${queryString}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("not found");
    }

    throw new Error(error || "Failed to load data");
  }

  return (await response.json()) as T;
};
