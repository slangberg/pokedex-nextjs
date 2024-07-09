import { DisplayValue } from "@/types/data";

export const isApiLink = (value: unknown): boolean => {
  if (typeof value !== "string") {
    return false;
  }
  return value.includes("https://pokeapi.co/api/");
};

export const isEmpty = <T>(value: T): boolean => {
  if (value === 0) {
    return false;
  }
  if (!value) {
    return true;
  }
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return false;
};

export const pick = <T extends Record<string, any>>(
  source: T,
  pickList: string[]
): Partial<T> => {
  const data: Partial<T> = {};
  for (const [key, value] of Object.entries(source)) {
    if (pickList.includes(key)) {
      data[key as keyof T] = value;
    }
  }
  return data;
};

export const moveObjectToFirstPosition = <T extends Record<string, any>>(
  array: T[],
  searchString: string
): Array<T> => {
  const index = array.findIndex((obj) => {
    return Object.values(obj).some(
      (value) => typeof value === "string" && value.includes(searchString)
    );
  });

  if (index > -1 && index !== 0) {
    const [object] = array.splice(index, 1);
    array.unshift(object);
  }

  return array;
};

export const addSpaces = (string: string): string =>
  string.replace(/_/g, " ").replace(/-/g, " ").trim();

export const convertToItemProps = <
  T extends Record<string, string | number | boolean | null>
>(
  source: T
): Array<{ name: string; value: DisplayValue }> =>
  Object.entries(source).map(([key, value]) => ({
    name: addSpaces(key),
    value: value,
  }));
