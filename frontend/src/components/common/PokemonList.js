import { useEffect, useState } from "react";
import PokemonInfo from "./PokemonInfo";

export default function PokemonList(props) {
  const [pokemonList, setPokemonList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const pokemon = localStorage.getItem("pokemon_list");
    if (!pokemon || typeof pokemon !== "string")
      localStorage.setItem("pokemon_list", JSON.stringify({}));

    try {
      const list = Object.entries(JSON.parse(pokemon) || {});
      if (Array.isArray(list)) setPokemonList(list);
    } catch (err) {}
  }, []);

  return (
    <>
      <PokemonInfo isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="menu">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <h3>Pokémon</h3>
        </div>

        <div className="pokemon-list">
          <ul>
            {pokemonList.map(([id, pokemonProps]) => (
              <li key={id} onClick={() => setIsOpen(pokemonProps)}>
                <p className="cp">
                  <span>CP</span> <span>{pokemonProps.cp}</span>
                </p>
                <img
                  src={
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/" +
                    pokemonProps.id +
                    ".png"
                  }
                />
                <p className="name">{pokemonProps.name}</p>
                <div className="hp" />
              </li>
            ))}
          </ul>
        </div>

        <div
          className="close-button"
          onClick={() => props.setIsOpen(false)}
        ></div>
      </div>
    </>
  );
}
