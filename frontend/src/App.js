import { useState } from "react";
import Battle from "./components/Battle.js";
import OverWorld from "./components/Overworld.js";

function App() {
  const [isBattle, setIsBattle] = useState(false);

  return (
    <main style={{ overflow: "hidden" }}>
      {isBattle ? <Battle data={isBattle} setIsBattle={setIsBattle} /> : null}

      <OverWorld isBattle={isBattle} setIsBattle={setIsBattle} />
    </main>
  );
}

export default App;
