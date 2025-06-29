export interface AsciiMediaOptionalProps {
  /**
   * 변환할 이미지 또는 비디오의 URL
   * @type {string}
   */
  src: string;
  /**
   * 미디어 타입 (이미지 또는 비디오)
   * @type {"image" | "video"}
   */
  mediaType: "image" | "video";
  /**
   * 아스키 변환 해상도 (가로 문자 개수)
   * @default 96
   * @type {number}
   */
  resolution?: number;
  /**
   * 아스키 문자의 폰트 크기 (px)
   * @default 8
   * @type {number}
   */
  fontSize?: number;
  /**
   * 프레임 갱신 간격(ms)
   * @default 100
   * @type {number}
   */
  charInterval?: number;
  /**
   * 아스키 코드 색상 처리 방식
   * @default 'auto'
   * @type {'auto' | 'mono' | `#${string}`}
   * - 'auto': 원본 이미지/비디오의 색상 사용
   * - 'mono': 흑백(밝기값)으로 출력
   * - hash string: '#RRGGBB' 등 해시 색상값을 지정하면 해당 색상으로 출력
   */
  color?: "auto" | "mono" | `#${string}`;
  /**
   * 아스키 문자 랜덤화 수준
   * @default "none"
   * @type {"none" | "group" | "all"}
   * - none: 밝기에 따라 고정 문자
   * - group: 밝기 그룹 내에서 랜덤
   * - all: 전체 문자 중 랜덤
   */
  charsRandomLevel?: "none" | "group" | "all";
  /**
   * 사용할 아스키 문자 리스트
   * @default 기본 문자셋
   * @type {string[]}
   */
  charList?: string[];
  /**
   * 밝기 그룹별 아스키 문자 매트릭스
   * @default 기본 매트릭스
   * @type {string[][]}
   */
  charMatrix?: string[][];
}

/**
 * mediaType을 제외한 모든 옵션을 필수로 갖는 타입
 */
export type AsciiMediaRequiredProps = Required<
  Omit<AsciiMediaOptionalProps, "mediaType">
>;
