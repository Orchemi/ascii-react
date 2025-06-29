import { AsciiMedia } from "./index";

function App() {
  return (
    <AsciiMedia
      src={
        "https://exem-homepage-static.s3.ap-northeast-2.amazonaws.com/sample.png"
      }
      mediaType={"image"} // image, video
      resolution={96}
      fontSize={8}
      charInterval={100}
      color={"#b6b6e2"} // auto, mono, #RRGGBB
      charsRandomLevel={"none"} // none, group, all
    />
  );
}

export default App;
