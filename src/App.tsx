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
      backgroundColor={"#000000"} // #RRGGBB
      charsRandomLevel={"group"} // none, group, all
    />
  );
}

export default App;
