import { useEffect, useState } from "react";
import "../../styles/menu.css";
import NearbyPokemon from "./NearbyPokemon";
import PokemonList from "./PokemonList";
import Profile from "./Profile";

const Menu = ({ nearbyPokemon }) => {
  const [isListOpen, setListIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(true);

  if (isProfileOpen) return <Profile setIsOpen={setIsProfileOpen} />;
  if (isListOpen) return <PokemonList setIsOpen={setListIsOpen} />;

  return (
    <div className="bottom-ui">
      <div className="profile" onClick={() => setIsProfileOpen(true)} />
      <div className="pokeball" onClick={() => setListIsOpen(true)} />
      <NearbyPokemon nearbyPokemon={nearbyPokemon} />
    </div>
  );
};

export default Menu;
