const express = require("express");
const app = express();

require("dotenv").config();

const cron = require("node-cron");
const randomLocation = require("random-location");

const supabase = require("./supabase");

const P = {
  latitude: process.env.GEO_COORDINATES_LAT,
  longitude: process.env.GEO_COORDINATES_LNG,
};

const R = 7904; // 6854; // 7904; // meters

// const easyPokemon = [
//   1, 4, 7, 10, 11, 13, 14, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43,
//   46, 48, 50, 52, 54, 56, 58, 60,
// ];

const easyPokemon = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
  115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129,
  130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144,
  145, 146, 147, 148, 149, 150, 151,
];

const getRandomPoint = () => {
  var y0 = process.env.GEO_COORDINATES_LAT;
  var x0 = process.env.GEO_COORDINATES_LNG;
  var rd = 7904 / 111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  return {
    latitude: y + y0,
    longitude: x + x0,
  };
};

const task = cron.schedule("* * * * *", async () => {
  const id = Math.random();

  console.log("Iniciou o processo de spawnar - " + id);

  const data = [];

  for (let i = 0; i < 2000; i++) {
    let selectedPokemon =
      easyPokemon[Math.floor(Math.random() * easyPokemon.length)];

    // let randomPoint = randomLocation.randomCirclePoint(P, R);
    let randomPoint = getRandomPoint();
    data.push({
      poke_id: selectedPokemon,
      latitude: randomPoint.latitude,
      longitude: randomPoint.longitude,
    });
  }

  const { error } = await supabase.from("pokemon").insert(data);

  if (!error) console.log("Mais 2000 pokemon spawnados - " + id);
  else console.log(error);
});

app.listen(8000, () => {
  task.start();
  console.log("Server on port 8000");
});
