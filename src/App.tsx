import { AsciiMedia } from "./index";

function App() {
  return (
    <AsciiMedia
      src={"https://assets.codepen.io/907471/mouse.mp4"}
      mediaType={"video"} // image, video
      resolution={96}
      fontSize={8}
      charInterval={100}
      color={"auto"} // auto, mono, #RRGGBB
      backgroundColor={"#00000000"} // #RRGGBB(default: #00000000)
      charsRandomLevel={"group"} // none, group, all
      ignoreBright={0} // 0~1
    />
  );
}

export default App;
