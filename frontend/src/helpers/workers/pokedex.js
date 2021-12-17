export const getPokedex = (item) => {
  let pokedex;
  const list = [];

  try {
    if (typeof item !== "string") {
      pokedex = {};
    } else {
      pokedex = JSON.parse(item);
    }
  } catch (err) {
    pokedex = {};
  }

  for (let pokemon of Object.entries(pokedex)) {
    try {
      if (Array.isArray(pokemon) && pokemon[1]) list.push(Number(pokemon[0]));
    } catch (err) {}
  }

  return list;
};
