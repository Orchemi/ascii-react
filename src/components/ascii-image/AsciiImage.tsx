import { useEffect, useRef, useCallback } from "react";
import { getAsciiCanvasContext, drawAsciiToCanvas } from "../AsciiMedia.util";
import { getImageAspect } from "./AsciiImage.util";
import type { AsciiMediaRequiredProps } from "../asciiMedia.type";

function AsciiImage({
  src,
  resolution,
  fontSize,
  charInterval,
  colored,
  charsRandomLevel,
  charList,
  charMatrix,
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
    const aspect = getImageAspect(img);
    const w = resolution;
    const h = Math.round(w / aspect);
    canvas.width = w * fontSize;
    canvas.height = h * fontSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;
    drawAsciiToCanvas(
      ctx,
      data,
      w,
      h,
      fontSize,
      colored,
      charsRandomLevel,
      charList,
      charMatrix
    );
    animationId.current = window.setTimeout(drawAscii, charInterval);
  }, [
    resolution,
    fontSize,
    charInterval,
    colored,
    charsRandomLevel,
    charList,
    charMatrix,
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
