import supabase from "./supabase";

export const getNearbyPokemon = async (coords) => {
  return await supabase.rpc("get_nearby_pokemon", {
    distance: 0.2,
    lat: coords.lat,
    lng: coords.lng,
  });
  // return await supabase.from("pokemon").select();
};

export const deletePokemon = async (uuid) => {
  const { data, error } = await supabase
    .from("pokemon")
    .delete()
    .eq("id", uuid);
  return { data, error };
};

export const addHistoric = async (username, photo, pokemon_id, type) => {
  return await supabase
    .from("historic")
    .insert([{ username, photo, pokemon_id, type }]);
};
