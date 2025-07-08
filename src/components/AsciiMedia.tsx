import AsciiImage from "./ascii-image/AsciiImage";
import AsciiVideo from "./ascii-video/AsciiVideo";
import {
  defaultBackgroundColor,
  defaultCharList,
  defaultCharMatrix,
} from "./asciiMedia.constant";
import type { AsciiMediaProps } from "./asciiMedia.type";

export default function AsciiMedia(props: AsciiMediaProps) {
  const { mediaType, ...optionalRest } = props;
  const {
    resolution = 96,
    fontSize = 8,
    charInterval = 100,
    color = "auto",
    charsRandomLevel = "none",
    charList = defaultCharList,
    charMatrix = defaultCharMatrix,
    backgroundColor = defaultBackgroundColor,
    manualCharColors = [],
  } = optionalRest;
  const ignoreBright = props.ignoreBright ?? 0;
  const invert = props.invert ?? false;

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
    ignoreBright,
    invert,
    manualCharColors,
  };

  if (mediaType === "image") {
    return <AsciiImage {...requiredRest} />;
  }
  if (mediaType === "video") {
    return <AsciiVideo {...requiredRest} />;
  }
  return null;
}
