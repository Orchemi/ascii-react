// 공통 유틸 함수들

// 캔버스 2D 컨텍스트 얻기
export function getAsciiCanvasContext(
  canvas: HTMLCanvasElement | null
): CanvasRenderingContext2D | null {
  return canvas ? canvas.getContext("2d") : null;
}

// 픽셀 밝기 계산
export function getBrightness(r: number, g: number, b: number): number {
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
}

// 아스키 문자 선택
export function getAsciiChar(
  brightnessNorm: number,
  charsRandomLevel: "none" | "group" | "all",
  charList: string[],
  charMatrix: string[][]
): string {
  if (charsRandomLevel === "none") {
    const charIndex = Math.floor((1 - brightnessNorm) * (charList.length - 1));
    return charList[charIndex];
  } else if (charsRandomLevel === "group") {
    const groupIndex = Math.floor(
      (1 - brightnessNorm) * (charMatrix.length - 1)
    );
    const group = charMatrix[groupIndex];
    return group[Math.floor(Math.random() * group.length)];
  } else {
    return charList[Math.floor(Math.random() * charList.length)];
  }
}

// 캔버스에 아스키 문자 그리기
export function drawAsciiToCanvas(
  ctx: CanvasRenderingContext2D,
  data: Uint8ClampedArray,
  w: number,
  h: number,
  fontSize: number,
  colored: boolean,
  charsRandomLevel: "none" | "group" | "all",
  charList: string[],
  charMatrix: string[][]
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.font = `${fontSize}px monospace`;

  let i = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++, i++) {
      const idx = (x + y * w) * 4;
      const [r, g, b] = data.slice(idx, idx + 3);
      const brightness = getBrightness(r, g, b);
      const brightnessNorm = brightness / 255;
      const char = getAsciiChar(
        brightnessNorm,
        charsRandomLevel,
        charList,
        charMatrix
      );
      if (colored) {
        ctx.fillStyle = `rgb(${r},${g},${b})`;
      } else {
        ctx.fillStyle = `rgb(${brightness},${brightness},${brightness})`;
      }
      ctx.fillText(char ?? " ", x * fontSize, y * fontSize);
    }
  }
}
