import { useEffect, useRef, useCallback } from "react";
import type { AsciiMediaRequiredProps } from "../asciiMedia.type";
import { getAsciiCanvasContext, drawAsciiToCanvas } from "../AsciiMedia.util";
import { getVideoAspect } from "./AsciiVideo.util";

function AsciiVideo({
  src,
  resolution,
  fontSize,
  charInterval,
  colored,
  charsRandomLevel,
  charList,
  charMatrix,
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
    const aspect = getVideoAspect(video);
    const w = resolution;
    const h = Math.round(w / aspect);
    canvas.width = w * fontSize;
    canvas.height = h * fontSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, w, h);
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
