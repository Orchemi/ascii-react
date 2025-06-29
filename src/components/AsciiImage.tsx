import { useEffect, useRef, useCallback } from "react";
import { defaultCharList, defaultCharMatrix } from "./asciiMedia.constant";
import type { AsciiMediaProps } from "./AsciiMedia";

function AsciiImage(props: Omit<AsciiMediaProps, "mediaType">) {
  const {
    src,
    resolution = 96,
    fontSize = 8,
    charInterval = 100,
    colored = true,
    charsRandomLevel = "none",
    charList = defaultCharList,
    charMatrix = defaultCharMatrix,
  } = props;

  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationId = useRef<number | null>(null);

  const drawAscii = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imgRef.current;
    if (!img || !img.naturalWidth) {
      animationId.current = window.setTimeout(drawAscii, charInterval);
      return;
    }
    const aspect = img.naturalWidth / img.naturalHeight || 3;
    const w = resolution;
    const h = Math.round(w / aspect);
    canvas.width = w * fontSize;
    canvas.height = h * fontSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = `${fontSize}px monospace`;
    let i = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++, i++) {
        const idx = (x + y * w) * 4;
        const [r, g, b] = data.slice(idx, idx + 3);
        const brightness = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        const brightnessNorm = brightness / 255;
        let char = " ";
        if (charsRandomLevel === "none") {
          const charIndex = Math.floor(
            (1 - brightnessNorm) * (charList.length - 1)
          );
          char = charList[charIndex];
        } else if (charsRandomLevel === "group") {
          const groupIndex = Math.floor(
            (1 - brightnessNorm) * (charMatrix.length - 1)
          );
          const group = charMatrix[groupIndex];
          char = group[Math.floor(Math.random() * group.length)];
        } else {
          char = charList[Math.floor(Math.random() * charList.length)];
        }
        if (colored) {
          ctx.fillStyle = `rgb(${r},${g},${b})`;
        } else {
          ctx.fillStyle = `rgb(${brightness},${brightness},${brightness})`;
        }
        ctx.fillText(char ?? " ", x * fontSize, y * fontSize);
      }
    }
    animationId.current = window.setTimeout(drawAscii, charInterval);
  }, [
    src,
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
