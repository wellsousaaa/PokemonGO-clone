import { useEffect, useState } from "react";
import "../../styles/pokedex.css";
import { useWorker } from "@koale/useworker";
import { getPokedex } from "../../helpers/workers/pokedex";

const pokemonList = [...Array(150).keys()];

export default function Pokedex(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [pokedex, setPokedex] = useState([]);
  const [pokedexWorker] = useWorker(getPokedex);

  useEffect(() => {
    (async () => {
      const seen = await pokedexWorker(localStorage.getItem("pokedex_seen"));
      const caught = await pokedexWorker(
        localStorage.getItem("pokedex_caught")
      );

      setPokedex({ seen, caught });
    })();
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="pokedex">
          <div className="close-button" onClick={() => setIsOpen(false)} />
          <header>
            <div>
              <h3>Pokedex</h3>
              <p>
                Caught: {pokedex.caught.length} <span> | </span> Seen:{" "}
                {pokedex.seen.length}
              </p>
            </div>
          </header>
          <section className="pokedex-list">
            {pokemonList.map((i) => (
              <PokemonItem
                key={Number(i) + 1}
                pokedex={pokedex}
                id={Number(i) + 1}
              />
            ))}
          </section>
        </div>
      )}

      <div className="pokedex-icon" onClick={() => setIsOpen(true)} />
    </>
  );
}

const PokemonItem = (props) => {
  return (
    <img
      src={
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/" +
        props.id +
        ".png"
      }
      loading="lazy"
      className={
        props.pokedex.caught.includes(props.id)
          ? "pokedex-icon-captured"
          : "pokedex-icon-not"
      }
    />
  );
};
