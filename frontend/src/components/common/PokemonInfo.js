import pokedex from "../../helpers/pokemon.json";

export default function PokemonInfo(props) {
  console.log(props.isOpen);

  if (!props.isOpen) return null;

  const { id, cp } = props.isOpen;

  const pokemon = pokedex[id - 1];
  console.log(pokemon);

  return (
    <div className="pokemon-list-info">
      <h3>CP: {cp}</h3>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`}
        alt="pokemon"
        style={{
          height: "30%",
          zIndex: 10,
          imageRendering: "pixelated",
          margin: "0 auto",
        }}
      />

      <div className="pokemon-info-main">
        <h3>{pokemon.Name}</h3>
        <div className="pokemon-char" style={{ display: "flex" }}>
          <p>
            {pokemon.Types[0]}
            {pokemon.Types[1] ? " / " + pokemon.Types[1] : ""}
          </p>
          <p>{pokemon.Weight.Minimum}</p>
          <p>{pokemon.Height.Minimum}</p>
        </div>

        <h4>Candys: 5</h4>

        <div
          className="evolve-container"
          style={{ opacity: pokemon["Next Evolution Requirements"] ? 1 : 0.5 }}
        >
          <button disabled={!pokemon["Next Evolution Requirements"]}>
            Evolve
          </button>
          <div style={{ marginRight: 25 }}>
            {pokemon["Next Evolution Requirements"]
              ? pokemon["Next Evolution Requirements"].Amount
              : "0"}
          </div>
        </div>

        <div className="poke-attacks">
          <p>{pokemon["Fast Attack(s)"][0].Name}</p>
          <p>{pokemon["Special Attack(s)"][0].Name}</p>
        </div>
      </div>

      <div
        className="close-button"
        onClick={() => props.setIsOpen(false)}
      ></div>
    </div>
  );
}
