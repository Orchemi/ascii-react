export interface AsciiMediaOptionalProps {
  src: string;
  mediaType: "image" | "video";
  resolution?: number;
  fontSize?: number;
  charInterval?: number;
  colored?: boolean;
  charsRandomLevel?: "none" | "group" | "all";
  charList?: string[];
  charMatrix?: string[][];
}

export type AsciiMediaRequiredProps = Required<
  Omit<AsciiMediaOptionalProps, "mediaType">
>;
