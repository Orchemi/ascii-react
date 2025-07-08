import { useEffect, useRef, useCallback } from "react";
import type { AsciiMediaRequiredProps } from "../asciiMedia.type";
import { getAsciiCanvasContext, drawAsciiFromSource } from "../AsciiMedia.util";

function AsciiVideo({
  src,
  resolution,
  fontSize,
  charInterval,
  color = "auto",
  charsRandomLevel,
  charList,
  charMatrix,
  backgroundColor,
  ignoreBright,
  invert,
}: AsciiMediaRequiredProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationId = useRef<number | null>(null);

  const drawAscii = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = getAsciiCanvasContext(canvas);
    if (!ctx) return;
    const video = videoRef.current;
    if (!video || !video.videoWidth || video.paused || video.ended) return;
    drawAsciiFromSource(
      ctx,
      video,
      resolution,
      fontSize,
      charInterval,
      charsRandomLevel,
      charList,
      charMatrix,
      color,
      animationId,
      drawAscii,
      backgroundColor,
      ignoreBright,
      invert
    );
  }, [
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
  ]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.onloadeddata = () => {
      video.play();
      drawAscii();
    };
    if (video.readyState >= 2) {
      video.play();
      drawAscii();
    }
    return () => {
      if (animationId.current) clearTimeout(animationId.current);
      if (video) video.onloadeddata = null;
    };
  }, [drawAscii]);

  if (src === "") return null;
  return (
    <>
      <canvas ref={canvasRef} />
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        crossOrigin="anonymous"
        style={{ display: "none" }}
      />
    </>
  );
}

export default AsciiVideo;
