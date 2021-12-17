import { useEffect, useState } from "react";
import { addHistoric, deletePokemon } from "../helpers/pokemon";
import Pokeball from "./common/Pokeball";
import pokedex from "../helpers/pokemon.json";

export default function Battle(props) {
  const [isCatching, setIsCatching] = useState(false);

  const pokemon = pokedex[props.data.id - 1];

  const handleCatching = () => {
    setIsCatching(null);

    setTimeout(() => {
      setIsCatching(true);
    }, 2000);
  };

  const handleLocalStorage = (name, key, value) => {
    try {
      const item = localStorage.getItem(name);
      if (!item) localStorage.setItem(name, JSON.stringify({}));
      const list = item ? JSON.parse(item) : {};
      localStorage.setItem(name, JSON.stringify({ ...list, [key]: value }));
    } catch (err) {}
  };

  const generatePokemon = async () => {
    return {
      id: props.data.id,
      date: new Date().getTime(),
      specie_name: "Placeholder",
      name: "Placeholder",
      favorite: false,
      cp: 500,
      max_cp: 1500,
      types: [],
      stats: {
        hp: 100,
        attack: 15,
        defense: 15,
        stamina: 15,
      },
      moves: ["Tackle", "Hyper Beam"],
    };
  };

  const battleFinished = async () => {
    const { data, error } = await deletePokemon(props.data.uuid);
    handleLocalStorage("pokedex_caught", props.data.id, true);
    handleLocalStorage(
      "pokemon_list",
      props.data.uuid,
      await generatePokemon(props.data.id)
    );
    await addHistoric("MrWell", "null", props.data.id, "CATCH");
    props.setIsBattle(false);
  };

  useEffect(() => {
    handleLocalStorage("pokedex_seen", props.data.id, true);
  }, []);

  if (!pokemon) return null;

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
    <div className="battle" style={{ maxHeight: window.innerHeight }}>
      <div className="run-button" onClick={() => props.setIsBattle(false)} />

      <div
        className="battle-pokemon"
        data-catching={isCatching === null}
        style={{
          "--pokemon-sprite": `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${props.data.id}.gif')`,
          "--width": pokemon.VWidth || "80vw",
          "--height": pokemon.VHeight || "90vw",
        }}
      >
        <div className="pokemon-info" />
      </div>
      <div
        className="pokemon-shadow"
        data-catching={isCatching === null}
        style={{
          "--pokemon-sprite": `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${props.data.id}.gif')`,
          "--width": pokemon.VWidth || "80vw",
          "--height": pokemon.VHeight || "90vw",
        }}
      />
      <div className="battle-ui">
        <div className="battle-pokeball-container">
          <Pokeball setIsCatching={handleCatching} />
        </div>
      </div>
    </div>
  );
}
