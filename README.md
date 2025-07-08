# ascii-react

**A super-lightweight React component for real-time ASCII art conversion of images and videos**

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tree Shaking](https://img.shields.io/badge/Tree%20Shaking-✅-00C853)](tree-shaking)
[![SSR Compatible](https://img.shields.io/badge/SSR-Compatible-FF6B35)](#ssr-support)

<br />

## 🌐 Internationalization

This README is available in:

- [한국어](./README.ko.md)
- English

<br />

## ✨ Features

- **Real-time ASCII art conversion for images and videos**
- **Color, monochrome, or custom color support**
- **Configurable resolution, font size, frame interval, and more**
- **Full TypeScript support**
- **Ultra-lightweight, tree-shaking optimized**
- **SSR/CSR compatible**

<br />

## ⚙️ Usage

```tsx
import AsciiMedia from "ascii-react";

<AsciiMedia
  src="https://example.com/image.png"
  mediaType="image" // 'image' | 'video'
  resolution={96} // number of ASCII chars per row
  fontSize={8} // font size (px)
  charInterval={100} // frame update interval (ms)
  color="auto" // 'auto' | 'mono' | '#RRGGBB'
  charsRandomLevel="none" // 'none' | 'group' | 'all'
  backgroundColor="#000000" // canvas background (hex)
  ignoreBelow={0.15} // ignore pixels below this brightness (0~1)
  invert={true} // invert brightness-to-char mapping
  manualCharColor={[
    { char: "$", color: "#ff00ff" },
    { char: "#", color: "#00ffff" },
  ]}
/>;
```

<br />

## 📝 Main Props

| Prop               | Type                                | Default     | Description                                                                                    |
| ------------------ | ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| `src`              | `string`                            | -           | Image or video URL to convert                                                                  |
| `mediaType`        | `'image' \| 'video'`                | -           | Media type                                                                                     |
| `resolution`       | `number`                            | 96          | ASCII resolution (number of columns)                                                           |
| `fontSize`         | `number`                            | 8           | Font size (px)                                                                                 |
| `charInterval`     | `number`                            | 100         | Frame update interval (ms)                                                                     |
| `color`            | `'auto' \| 'mono' \| #RRGGBB`       | 'auto'      | Color mode (original/monochrome/custom color)                                                  |
| `charsRandomLevel` | `'none' \| 'group' \| 'all'`        | 'none'      | ASCII character randomization level                                                            |
| `charList`         | `string[]`                          | default     | ASCII character list                                                                           |
| `charMatrix`       | `string[][]`                        | default     | Brightness-grouped ASCII character matrix                                                      |
| `backgroundColor`  | `string`                            | '#00000000' | Canvas background color (hex value, e.g. '#00000000')                                          |
| `ignoreBelow`      | `number`                            | 0           | Ignore pixels below this brightness (0~1, blank if below)                                      |
| `invert`           | `boolean`                           | false       | Invert brightness-to-char mapping (dense chars for bright areas)                               |
| `manualCharColor`  | `{ char: string; color: string }[]` | -           | Array to manually set color for specific chars. Example: `[ { char: '$', color: '#ff00ff' } ]` |

<br />

## 🚀 Advantages

- **Ultra-lightweight**: Pure React + TypeScript, no unnecessary dependencies
- **Tree-shaking optimized**: Only the code you use is included in your bundle
- **SSR/CSR ready**: Works perfectly in SSR environments like Next.js
- **Highly customizable**: Character set, color, resolution, and more
- **Real-time conversion**: Supports both images and videos in real time

<br />

## 🛠️ License & Contributing

- License: MIT
- Contributions/Issues/Questions: Feel free to open a PR or Issue!
