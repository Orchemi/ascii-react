import { defaultBackgroundColor } from "./asciiMedia.constant";
import type {
  AsciiColor,
  CharsRandomLevel,
  CharList,
  CharMatrix,
  HexColor,
  ManualCharColor,
} from "./asciiMedia.type";

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
  charsRandomLevel: CharsRandomLevel,
  charList: CharList,
  charMatrix: CharMatrix,
  invert: boolean = false
): string {
  if (charsRandomLevel === "none") {
    const charIndex = invert
      ? Math.floor(brightnessNorm * (charList.length - 1))
      : Math.floor((1 - brightnessNorm) * (charList.length - 1));
    return charList[charIndex];
  } else if (charsRandomLevel === "group") {
    const groupIndex = invert
      ? Math.floor(brightnessNorm * (charMatrix.length - 1))
      : Math.floor((1 - brightnessNorm) * (charMatrix.length - 1));
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

/**
 * 아스키 픽셀의 fillStyle을 결정
 * @param color 'auto' | 'mono' | `HexColor`
 * @param r R값(0~255)
 * @param g G값(0~255)
 * @param b B값(0~255)
 * @param brightness 밝기값(0~255)
 */
export function getAsciiFillStyle(
  color: AsciiColor,
  r: number,
  g: number,
  b: number,
  brightness: number
): string {
  if (color === "auto") {
    return `rgb(${r},${g},${b})`;
  } else if (color === "mono") {
    return `rgb(${brightness},${brightness},${brightness})`;
  } else if (typeof color === "string" && color.startsWith("#")) {
    return color;
  }
  return `rgb(${r},${g},${b})`;
}

/**
 * 아스키 한 글자를 캔버스에 그린다
 * @param ctx 캔버스 2D 컨텍스트
 * @param x x좌표 (문자 단위)
 * @param y y좌표 (문자 단위)
 * @param fontSize 폰트 크기(px)
 * @param r R값(0~255)
 * @param g G값(0~255)
 * @param b B값(0~255)
 * @param brightness 밝기값(0~255)
 * @param charsRandomLevel 랜덤화 수준
 * @param charList 아스키 문자 리스트
 * @param charMatrix 밝기 그룹별 문자 매트릭스
 * @param color 색상 처리 방식
 */
export function drawAsciiChar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fontSize: number,
  r: number,
  g: number,
  b: number,
  brightness: number,
  charsRandomLevel: CharsRandomLevel,
  charList: CharList,
  charMatrix: CharMatrix,
  color: AsciiColor,
  opacity: number = 1,
  invert: boolean = false,
  manualCharColors?: ManualCharColor[]
) {
  const brightnessNorm = brightness / 255;
  const char = getAsciiChar(
    brightnessNorm,
    charsRandomLevel,
    charList,
    charMatrix,
    invert
  );
  const manualColor = getManualCharColor(char, manualCharColors);
  if (manualColor) {
    // manualCharColors가 지정된 문자는 opacity를 무시(=완전 불투명)
    const hadOpacity = opacity < 1;
    if (hadOpacity) ctx.globalAlpha = 1;
    ctx.fillStyle = manualColor;
    ctx.fillText(char ?? " ", x * fontSize, y * fontSize);
    if (hadOpacity) ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
    return;
  }
  // 일반 문자는 이미 프레임 단위로 globalAlpha가 설정되어 있으므로 색상만 지정
  if (color === "auto") {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
  } else if (color === "mono") {
    ctx.fillStyle = `rgb(${brightness},${brightness},${brightness})`;
  } else if (typeof color === "string" && color.startsWith("#")) {
    ctx.fillStyle = color;
  } else {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
  }
  ctx.fillText(char ?? " ", x * fontSize, y * fontSize);
}

/**
 * manualCharColor에서 해당 char에 대한 색상을 찾는다.
 */
function getManualCharColor(
  char: string,
  manualCharColor?: { char: string; color: string }[]
): string | undefined {
  if (!manualCharColor) return undefined;
  const found = manualCharColor.find((item) => item.char === char);
  return found?.color;
}

/**
 * 이미지/비디오 소스를 받아 아스키 변환 전체를 처리하는 공통 함수
 * @param ctx 캔버스 2D 컨텍스트
 * @param source HTMLImageElement | HTMLVideoElement
 * @param resolution 해상도(가로 문자 개수)
 * @param fontSize 폰트 크기(px)
 * @param charInterval 프레임 갱신 간격(ms)
 * @param charsRandomLevel 랜덤화 수준
 * @param charList 아스키 문자 리스트
 * @param charMatrix 밝기 그룹별 문자 매트릭스
 * @param color 색상 처리 방식
 * @param animationId 애니메이션 id ref
 * @param drawAscii drawAscii 콜백
 */
export function drawAsciiFromSource(
  ctx: CanvasRenderingContext2D,
  source: HTMLImageElement | HTMLVideoElement,
  resolution: number,
  fontSize: number,
  charInterval: number,
  charsRandomLevel: CharsRandomLevel,
  charList: CharList,
  charMatrix: CharMatrix,
  color: AsciiColor,
  animationId: { current: number | null },
  drawAscii: () => void,
  backgroundColor: HexColor,
  ignoreBright: number = 0,
  invert: boolean = false,
  manualCharColors?: ManualCharColor[],
  opacity: number = 1
) {
  const aspect =
    "naturalWidth" in source
      ? source.naturalWidth / source.naturalHeight || 3
      : source.videoWidth / source.videoHeight || 3;
  const w = resolution;
  const h = Math.round(w / aspect);
  ctx.canvas.width = w * fontSize;
  ctx.canvas.height = h * fontSize;
  // 배경색 칠하기
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  if (backgroundColor !== defaultBackgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  } else {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  ctx.drawImage(source, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  // getImageData 이후, 다시 배경색 칠하기(겹침 방지)
  if (backgroundColor !== defaultBackgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  } else {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.font = `${fontSize}px monospace`;
  // 프레임 전체에 동일하게 적용될 투명도 설정(수동 색상 문자는 개별 override)
  const clampedOpacity = Math.max(0, Math.min(1, opacity));
  ctx.globalAlpha = clampedOpacity;
  let i = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++, i++) {
      const idx = (x + y * w) * 4;
      const [r, g, b] = data.slice(idx, idx + 3);
      const brightness = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      let brightnessNorm = brightness / 255;
      if (invert) brightnessNorm = 1 - brightnessNorm;
      if (brightnessNorm < ignoreBright) {
        // 공백으로 무시 (ignoreBright가 커질수록 더 많이 필터링)
        continue;
      }
      drawAsciiChar(
        ctx,
        x,
        y,
        fontSize,
        r,
        g,
        b,
        brightness,
        charsRandomLevel,
        charList,
        charMatrix,
        color,
        opacity,
        invert,
        manualCharColors
      );
    }
  }
  // 다음 프레임 및 다른 그리기에 영향 없도록 원복
  ctx.globalAlpha = 1;
  animationId.current = window.setTimeout(drawAscii, charInterval);
}
