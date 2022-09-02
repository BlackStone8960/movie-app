export type ContentsState = {
  result: any;
  status: "idle" | "loading" | "failed";
  searchTitle: string;
  searchType: string;
};

export type FetchContentsParams = {
  s: string;
  type?: string;
  y?: string;
  plot?: string;
  page?: number;
};
