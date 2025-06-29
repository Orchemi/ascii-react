import AsciiImage from "./AsciiImage";
import AsciiVideo from "./AsciiVideo";

export interface AsciiMediaProps {
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

export default function AsciiMedia(props: AsciiMediaProps) {
  const { mediaType, ...rest } = props;
  if (mediaType === "image") {
    return <AsciiImage {...rest} />;
  }
  if (mediaType === "video") {
    return <AsciiVideo {...rest} />;
  }
  return null;
}
