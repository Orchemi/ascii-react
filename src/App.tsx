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
      colored={true} // true, false
      charsRandomLevel={"none"} // none, group, all
    />
  );
}

export default App;
