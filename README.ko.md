# ascii-react

**React에서 이미지/비디오를 실시간 아스키 아트로 변환해주는 초경량 라이브러리**

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tree Shaking](https://img.shields.io/badge/Tree%20Shaking-✅-00C853)](tree-shaking)
[![SSR Compatible](https://img.shields.io/badge/SSR-Compatible-FF6B35)](#ssr-support)

<br />

## 🌐 다국어 지원

이 README는 다음 언어로도 제공됩니다.

- 한국어
- [English](https://github.com/Orchemi/ascii-react/blob/main/README.md)

<br />

## ✨ 주요 기능

- **이미지/비디오를 실시간 아스키 아트로 변환**
- **컬러/흑백/단일색상 지원**
- **해상도, 폰트 크기, 프레임 간격 등 다양한 옵션**
- **완전한 TypeScript 지원**
- **초경량, 트리 셰이킹 최적화**
- **SSR/CSR 모두 호환**

<br />

## ⚙️ 사용법

```tsx
import { AsciiMedia } from "ascii-react";

<AsciiMedia
  src="https://example.com/image.png"
  mediaType="image" // 'image' | 'video'
  resolution={96} // 해상도(가로 문자 개수)
  fontSize={8} // 폰트 크기(px)
  charInterval={100} // 프레임 갱신 간격(ms)
  color="auto" // 'auto' | 'mono' | '#RRGGBB'
  charsRandomLevel="none" // 'none' | 'group' | 'all'
  backgroundColor="#000000" // 캔버스 배경색(hex)
  ignoreBelow={0.15} // 이 밝기 미만은 공백(무시) 처리 (0~1)
  invert={true} // 밝기-문자 매핑 반전 (밝은 곳에 진한 문자)
  manualCharColor={[
    { char: "$", color: "#ff00ff" },
    { char: "#", color: "#00ffff" },
  ]}
/>;
```

<br />

## 📝 주요 Props

| Prop               | 타입                                | 기본값      | 설명                                                                                 |
| ------------------ | ----------------------------------- | ----------- | ------------------------------------------------------------------------------------ |
| `src`              | `string`                            | -           | 변환할 이미지/비디오 URL                                                             |
| `mediaType`        | `'image' \| 'video'`                | -           | 미디어 타입                                                                          |
| `resolution`       | `number`                            | 96          | 아스키 해상도(가로 문자 개수)                                                        |
| `fontSize`         | `number`                            | 8           | 폰트 크기(px)                                                                        |
| `charInterval`     | `number`                            | 100         | 프레임 갱신 간격(ms)                                                                 |
| `color`            | `'auto' \| 'mono' \| #RRGGBB`       | 'auto'      | 색상 처리 방식(원본/흑백/단일색상)                                                   |
| `charsRandomLevel` | `'none' \| 'group' \| 'all'`        | 'none'      | 아스키 문자 랜덤화 수준                                                              |
| `charList`         | `string[]`                          | 기본셋      | 사용할 아스키 문자 리스트                                                            |
| `charMatrix`       | `string[][]`                        | 기본셋      | 밝기 그룹별 아스키 문자 매트릭스                                                     |
| `backgroundColor`  | `string`                            | '#00000000' | 캔버스 배경색(hex 값, 예: '#00000000')                                               |
| `ignoreBelow`      | `number`                            | 0           | 이 밝기 미만은 공백(무시) 처리 (0~1)                                                 |
| `invert`           | `boolean`                           | false       | 밝기-문자 매핑 반전 (밝은 곳에 진한 문자, 어두운 곳에 공백/획수 적은 문자)           |
| `manualCharColor`  | `{ char: string; color: string }[]` | -           | 특정 문자에 수동으로 색상을 지정하는 배열. 예: `[ { char: '$', color: '#ff00ff' } ]` |

<br />

## 🚀 장점

- **초경량**: 불필요한 의존성 없이 순수 React + TypeScript로 구현
- **트리 셰이킹 최적화**: 사용하지 않는 코드가 번들에 포함되지 않음
- **SSR/CSR 완벽 지원**: Next.js 등 서버사이드 렌더링 환경에서도 동작
- **유연한 커스터마이즈**: 문자셋, 색상, 해상도 등 다양한 옵션 제공
- **실시간 변환**: 비디오/이미지 모두 실시간으로 아스키 아트 변환

<br />

## 🛠️ 라이선스 및 기여

- 라이선스: MIT
- 기여/이슈/문의: PR 또는 Issue로 자유롭게 남겨주세요!
