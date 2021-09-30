export default function NearbyPokemon(props) {
  return (
    <div className="pokemon-nearby">
      {props.nearbyPokemon.slice(0, 3).map((pk) => (
        <img src={pk.icon} key={pk.distance} />
      ))}
    </div>
  );
}
