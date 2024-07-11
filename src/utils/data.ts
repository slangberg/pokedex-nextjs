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

export const moveObjectsToFirstPosition = <T extends Record<string, any>>(
  array: T[],
  key: string,
  searchString: string
): Array<T> => {
  return array.sort((a, b) => {
    const aMatch = typeof a[key] === "string" && a[key].includes(searchString);
    const bMatch = typeof b[key] === "string" && b[key].includes(searchString);
    if (aMatch && !bMatch) {
      return -1;
    }
    if (!aMatch && bMatch) {
      return 1;
    }
    return 0;
  });
};

export const addSpaces = (string: string): string =>
  capitalizeFirstLetter(string.replace(/_/g, " ").replace(/-/g, " ").trim());

export const convertToItemProps = <
  T extends Record<string, string | number | boolean | null>
>(
  source: T
): Array<{ name: string; value: DisplayValue }> =>
  Object.entries(source)
    .filter(([_key, value]) => value !== null)
    .map(([key, value]) => {
      const name = addSpaces(key);
      const valueOutput = !value
        ? "None"
        : typeof value === "string"
        ? addSpaces(key)
        : value;
      return {
        name,
        value: valueOutput,
      };
    });

export const capitalizeFirstLetter = (string: string): string => {
  if (string.length === 0) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};
