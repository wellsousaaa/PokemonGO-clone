import { useEffect, useState } from "react";
import { getHistoric } from "../../helpers/pokemon";
import pokemonList from "../../helpers/pokemon.json";

const pokeUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/";

const ProfileAction = (props) => {
  const { pokemon_id } = props;

  return (
    <li className="profile-action">
      <div className="pokeball-icon" />
      <div className="profile-description">
        <p>
          <span>{props.username}</span> catched{" "}
          {pokemonList[pokemon_id - 1].Name}
        </p>
      </div>
      <div
        className="pokemon-icon"
        style={{
          backgroundImage: "url(" + pokeUrl + pokemon_id + ".png" + ")",
        }}
      />
    </li>
  );
};

export default function Profile(props) {
  const [historic, setHistoric] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getHistoric(props.intro ? 3 : 10);
      console.log(data);
      setHistoric(data || []);
    };

    fetchData();
  }, []);

  if (props.intro)
    return (
      <div>
        <ul>
          {historic.map((historic) => {
            return <ProfileAction {...historic} key={historic.id} />;
          })}
        </ul>
      </div>
    );

  return (
    <div>
      <div className="profile-screen">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <h3>Adventures log</h3>
        </div>
        <ul>
          {historic.map((historic) => {
            return <ProfileAction {...historic} key={historic.id} />;
          })}
        </ul>
      </div>

      <div className="close-button" onClick={() => props.setIsOpen(false)}>
        <div>X</div>
      </div>
    </div>
  );
}
