export type PageProps<P = {}, S = {}> = {
  params: P;
  searchParams: S;
};

export interface BaseParams {
  slug: string;
}

export interface SearchParams {
  imageIndex?: string;
}

export type ExtendedPageProps<P = BaseParams, S = SearchParams> = PageProps<
  P,
  S
>;

export interface LinkConfig {
  type: "link" | "param";
  value: string | number;
  description: string;
}

export interface LinkConfigParam extends LinkConfig {
  paramValue: string;
}

export type LinkConfigUnion = LinkConfig | LinkConfigParam;

export interface DPadConfig {
  left?: LinkConfigUnion;
  right?: LinkConfigUnion;
  up?: LinkConfigUnion;
  down?: LinkConfigUnion;
}

export interface ListData {
  total: number;
  current: number;
  nextCount: number;
  prevCount: number;
  next: string | null;
  prev: string | null;
}
