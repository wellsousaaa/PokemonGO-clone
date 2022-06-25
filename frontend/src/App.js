import { useState } from "react";
import Battle from "./components/Battle.js";
import OverWorld from "./components/Overworld.js";

function App(props) {
  const [isBattle, setIsBattle] = useState(false);

  return (
    <main
      style={{
        overflow: "hidden",
        maxHeight: window.innerHeight,
        "-webkit-clip-path": "content-box",
        "-webkit-mask-image": "-webkit-linear-gradient(white, black)",
        clipPath: "content-box",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          maxHeight: window.innerHeight,
          clipPath: "content-box",
        }}
      >
        {isBattle ? (
          <Battle name={props.name} data={isBattle} setIsBattle={setIsBattle} />
        ) : null}
      </div>

      <OverWorld
        defaultCoords={props.defaultCoords}
        isBattle={isBattle}
        setIsBattle={setIsBattle}
      />
    </main>
  );
}

export default App;
