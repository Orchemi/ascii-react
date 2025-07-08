import AsciiImage from "./ascii-image/AsciiImage";
import AsciiVideo from "./ascii-video/AsciiVideo";
import { defaultCharList, defaultCharMatrix } from "./asciiMedia.constant";
import type { AsciiMediaOptionalProps } from "./asciiMedia.type";

export default function AsciiMedia(props: AsciiMediaOptionalProps) {
  const { mediaType, ...optionalRest } = props;
  const {
    resolution = 96,
    fontSize = 8,
    charInterval = 100,
    color = "auto",
    charsRandomLevel = "none",
    charList = defaultCharList,
    charMatrix = defaultCharMatrix,
    backgroundColor = "#00000000",
  } = optionalRest;

  const requiredRest = {
    src: props.src,
    resolution,
    fontSize,
    charInterval,
    color,
    charsRandomLevel,
    charList,
    charMatrix,
    backgroundColor,
  };

  if (mediaType === "image") {
    return <AsciiImage {...requiredRest} />;
  }
  if (mediaType === "video") {
    return <AsciiVideo {...requiredRest} />;
  }
  return null;
}
