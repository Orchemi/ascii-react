// AsciiVideo 전용 유틸 함수

export function getVideoAspect(video: HTMLVideoElement): number {
  return video.videoWidth / video.videoHeight || 3;
}
