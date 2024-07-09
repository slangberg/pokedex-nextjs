export const isApiLink = (value: unknown): boolean => {
  if (typeof value !== "string") {
    return false;
  }
  return value.includes("https://pokeapi.co/api/");
};

export const isEmpty = (value: unknown): boolean => {
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

export const pick = <T>(
  source: Record<string, any>,
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

export const moveObjectToFirstPosition = <T>(
  array: Record<string, any>,
  searchString: string
): Array<T> => {
  const index = array.findIndex((obj: Record<string, any>) => {
    return Object.values(obj).some(
      (value) => typeof value === "string" && value.includes(searchString)
    );
  });

  if (index > -1 && index !== 0) {
    const [object] = array.splice(index, 1);
    array.unshift(object);
  }

  return array as Array<T>;
};
