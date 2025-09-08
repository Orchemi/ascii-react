// 주요 타입 별도 정의
export type HexColor = `#${string}`;
export type AsciiColor = "auto" | "mono" | HexColor;
export type MediaType = "image" | "video";
export type CharsRandomLevel = "none" | "group" | "all";
export type CharList = string[];
export type CharMatrix = string[][];

/**
 * 특정 문자에 수동으로 색상을 지정하는 옵션
 */
export type ManualCharColor = {
  char: string;
  color: HexColor; // CSS 색상값 (예: '#ff00ff')
};

export interface AsciiMediaProps {
  /**
   * 변환할 이미지 또는 비디오의 URL
   * @type {string}
   */
  src: string;
  /**
   * 미디어 타입 (이미지 또는 비디오)
   * @type {MediaType}
   */
  mediaType: MediaType;
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
   * @type {AsciiColor}
   * - 'auto': 원본 이미지/비디오의 색상 사용
   * - 'mono': 흑백(밝기값)으로 출력
   * - hash string: '#RRGGBB' 등 해시 색상값을 지정하면 해당 색상으로 출력
   */
  color?: AsciiColor;
  /**
   * 아스키 문자 랜덤화 수준
   * @default "none"
   * @type {CharsRandomLevel}
   * - none: 밝기에 따라 고정 문자
   * - group: 밝기 그룹 내에서 랜덤
   * - all: 전체 문자 중 랜덤
   */
  charsRandomLevel?: CharsRandomLevel;
  /**
   * 사용할 아스키 문자 리스트
   * @default 기본 문자셋
   * @type {CharList}
   */
  charList?: CharList;
  /**
   * 밝기 그룹별 아스키 문자 매트릭스
   * @default 기본 매트릭스
   * @type {CharMatrix}
   */
  charMatrix?: CharMatrix;
  /**
   * 아스키 아트의 배경색 (hex string, 예: '#000000')
   * @default #00000000
   * @type {HexColor}
   */
  backgroundColor?: HexColor;
  /**
   * 밝기 무시 임계값 (0~1, 해당 값 미만의 밝기는 공백으로 처리)
   * @default 0
   * @type {number}
   * 0: 무시 없음, 1: 거의 모든 영역 무시
   */
  ignoreBright?: number;
  /**
   * 밝기-문자 매핑 반전 (명도 반전)
   * @default false
   * @type {boolean}
   * true: 밝기와 문자 매핑을 반전시킴 (밝은 곳에 진한 문자, 어두운 곳에 공백/획수 적은 문자)
   */
  invert?: boolean;
  /**
   * 아스키 문자의 투명도 (0~1)
   * @default 1
   * manualCharColors가 적용된 문자는 이 투명도를 무시합니다.
   */
  opacity?: number;
  /**
   * 특정 문자에 수동으로 색상을 지정하는 배열. 예: [{ char: '$', color: '#ff00ff' }]
   */
  manualCharColors?: ManualCharColor[];
}

/**
 * mediaType을 제외한 모든 옵션을 필수로 갖는 타입
 */
export type AsciiMediaRequiredProps = Required<
  Omit<AsciiMediaProps, "mediaType">
>;
