import { useEffect, useRef, useCallback } from "react";
import { getAsciiCanvasContext, drawAsciiFromSource } from "../AsciiMedia.util";
import type { AsciiMediaRequiredProps } from "../asciiMedia.type";

function AsciiImage({
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
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationId = useRef<number | null>(null);

  const drawAscii = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = getAsciiCanvasContext(canvas);
    if (!ctx) return;
    const img = imgRef.current;
    if (!img || !img.naturalWidth) {
      animationId.current = window.setTimeout(drawAscii, charInterval);
      return;
    }
    drawAsciiFromSource(
      ctx,
      img,
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
    const img = imgRef.current;
    if (!img) return;
    img.onload = () => drawAscii();
    if (img.complete) drawAscii();
    return () => {
      if (animationId.current) clearTimeout(animationId.current);
      if (img) img.onload = null;
    };
  }, [drawAscii]);

  if (src === "") return null;
  return (
    <>
      <canvas ref={canvasRef} />
      <img
        ref={imgRef}
        src={src}
        alt="ascii"
        crossOrigin="anonymous"
        style={{ display: "none" }}
      />
    </>
  );
}

export default AsciiImage;
