export type PageProps = {
  params: Record<string, string | string[]>;
  searchParams: Record<string, string | string[]>;
};

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
