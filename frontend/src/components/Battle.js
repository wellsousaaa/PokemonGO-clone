export default function Battle(props) {
  return (
    <div className="battle">
      <div className="run-button" onClick={() => props.setIsBattle(false)} />
      <div
        className="battle-pokemon"
        style={{
          "--pokemon-sprite": `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${props.data.id}.gif')`,
        }}
      >
        <div className="pokemon-info" />
      </div>
      <div className="battle-ui">
        <div />
        <div className="battle-pokeball"></div>
        <div />
      </div>
    </div>
  );
}
