import { useState } from "react";
import { deletePokemon } from "../helpers/pokemon";
import Pokeball from "./common/Pokeball";

export default function Battle(props) {
  const [isCatching, setIsCatching] = useState(false);

  const handleCatching = () => {
    setIsCatching(null);

    setTimeout(() => {
      setIsCatching(true);
    }, 2000);
  };

  const battleFinished = async () => {
    const { data, error } = await deletePokemon(props.data.uuid);
    props.setIsBattle(false);
  };

  if (isCatching)
    return (
      <>
        <div className="catch-modal">
          <button onClick={battleFinished}>Concluido</button>
        </div>
        <div className="catch-container">
          <div>
            <div className="catch-pokeball" />
          </div>
        </div>
      </>
    );

  return (
    <div className="battle">
      <div className="run-button" onClick={() => props.setIsBattle(false)} />
      <div
        className="battle-pokemon"
        data-catching={isCatching === null}
        style={{
          "--pokemon-sprite": `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${props.data.id}.gif')`,
        }}
      >
        <div className="pokemon-info" />
      </div>
      <div className="battle-ui">
        <div />
        <div className="battle-pokeball-container">
          <Pokeball setIsCatching={handleCatching} />
        </div>
        <div />
      </div>
    </div>
  );
}
