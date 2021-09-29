import supabase from "./supabase";

export const getNearbyPokemon = async () => {
  return await supabase.rpc("get_nearby_pokemon", {
    distance: 0.1,
    lat: process.env.REACT_APP_DEFAULT_LAT,
    lng: process.env.REACT_APP_DEFAULT_LNG,
  });
  // return await supabase.from("pokemon").select();
};
