import { useState } from "react";
import { AsciiMedia } from "./index";

const video1 = "https://assets.codepen.io/907471/mouse.mp4";
const video2 =
  "https://exem-homepage-static.s3.ap-northeast-2.amazonaws.com/swedish-flag-short.mp4";
const image1 =
  "https://exem-homepage-static.s3.ap-northeast-2.amazonaws.com/sample.png";

function App() {
  const [src, setSrc] = useState(video2);

  const [mediaType, setMediaType] = useState<"video" | "image">("video");
  const [resolution, setResolution] = useState(96);
  const [fontSize, setFontSize] = useState(8);
  const [charInterval, setCharInterval] = useState(100);
  const [colored, setColored] = useState(true);
  const [charsRandomLevel, setCharsRandomLevel] = useState<
    "none" | "group" | "all"
  >("none");

  return (
    <div>
      <input
        type="text"
        value={src}
        onChange={(e) => setSrc(e.target.value)}
        placeholder="이미지 또는 동영상 URL"
      />
      <div>
        <button
          onClick={() => {
            setSrc(video1);
            setMediaType("video");
          }}
        >
          video1
        </button>
        <button
          onClick={() => {
            setSrc(video2);
            setMediaType("video");
          }}
        >
          video2
        </button>
        <button
          onClick={() => {
            setSrc(image1);
            setMediaType("image");
          }}
        >
          image1
        </button>
      </div>
      <div>
        <div>
          <label htmlFor="resolution-slider">Resolution:</label>
          <input
            id="resolution-slider"
            type="range"
            min={24}
            max={192}
            value={resolution}
            onChange={(e) => setResolution(Number(e.target.value))}
          />
          <span>{resolution}px</span>
        </div>
        <div>
          <label htmlFor="font-size-slider">Font size:</label>
          <input
            id="font-size-slider"
            type="range"
            min={4}
            max={24}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
          <span>{fontSize}px</span>
        </div>
        <div>
          <label htmlFor="interval-slider">Interval(ms):</label>
          <input
            id="interval-slider"
            type="range"
            min={16}
            max={500}
            value={charInterval}
            onChange={(e) => setCharInterval(Number(e.target.value))}
          />
          <span>{charInterval}ms</span>
        </div>
      </div>
      <div>
        <label htmlFor="colored-checkbox">Colored:</label>
        <input
          id="colored-checkbox"
          type="checkbox"
          checked={colored}
          onChange={(e) => setColored(e.target.checked)}
        />
        <span>{colored ? "Yes" : "No"}</span>
      </div>
      <div>
        <label htmlFor="chars-random-level-checkbox">Chars random level:</label>
        <select
          id="chars-random-level-select"
          value={charsRandomLevel}
          onChange={(e) =>
            setCharsRandomLevel(e.target.value as "none" | "group" | "all")
          }
        >
          <option value="none">None</option>
          <option value="group">Group</option>
          <option value="all">All</option>
        </select>
      </div>
      <AsciiMedia
        src={src}
        mediaType={mediaType}
        resolution={resolution}
        fontSize={fontSize}
        charInterval={charInterval}
        colored={colored}
        charsRandomLevel={charsRandomLevel}
      />
    </div>
  );
}

export default App;
