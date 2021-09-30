import supabase from "./supabase";

export const getNearbyPokemon = async (coords) => {
  return await supabase.rpc("get_nearby_pokemon", {
    distance: 0.3,
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
  console.log(data, error);
  return { data, error };
};
