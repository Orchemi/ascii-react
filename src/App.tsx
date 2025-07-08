import { AsciiMedia } from "./index";

function App() {
  return (
    <AsciiMedia
      src={
        "https://exem-web-hub-static-file-bucket.s3.ap-northeast-2.amazonaws.com/tmp/test-image2.png"
      }
      mediaType={"image"} // image, video
      resolution={96}
      fontSize={8}
      charInterval={100}
      color={"auto"} // auto, mono, #RRGGBB
      backgroundColor={"#00000000"} // #RRGGBB(default: #00000000)
      charsRandomLevel={"group"} // none, group, all
      ignoreBright={0} // 0~1
      invert={true} // true: 밝기와 문자 매핑을 반전시킴 (밝은 곳에 진한 문자)
    />
  );
}

export default App;
