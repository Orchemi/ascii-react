// AsciiImage 전용 유틸 함수

export function getImageAspect(img: HTMLImageElement): number {
  return img.naturalWidth / img.naturalHeight || 3;
}
