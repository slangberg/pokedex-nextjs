export const constructSearchParams = (
  searchParams: Record<string, string | string[]>
): string => {
  const search = new URLSearchParams();

  Object.keys(searchParams).forEach((key) => {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      value.forEach((val) => search.append(key, val));
    } else {
      search.set(key, value);
    }
  });

  return search.toString();
};
