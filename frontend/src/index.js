import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./styles/battle.css";
import "./styles/menu-ui.css";

import "./styles/intro.css";
import "./styles/index.css";
import "./styles/catch.css";
import Profile from "./components/common/Profile.js";

function Localization() {
  const [name, setName] = useState(localStorage.getItem("poke_name") || "");
  const [start, setStart] = useState(false);
  const [coords, setCoords] = useState(null);

  const handleStart = () => {
    if (!name.trim()) return;

    localStorage.setItem("poke_name", name);
    setStart(true);
  };

  const activeGeo = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    } else {
      alert("Seu dispositivo não tem localização!");
    }
  };

  useEffect(() => {
    activeGeo();
  }, []);

  if ("geolocation" in navigator && name && start && coords)
    return <App defaultCoords={coords} name={name} />;
  return (
    <main className="intro-container">
      <div className="intro">
        {/* <h1>Pokémon GO</h1> */}
        {/* <img
          className="go-icon"
          src="https://pbs.twimg.com/profile_images/1155697286078296069/muxy-u6y_400x400.jpg"
        /> */}

        <p> Insira o seu username e ative a localização para poder jogar! </p>
        <input
          onChange={({ target }) => setName(target.value)}
          value={name}
          type="text"
          placeholder="Insira seu username"
        />
        <button onClick={handleStart}>Start</button>

        {!coords && <button onClick={activeGeo}>Ativar Localização</button>}

        <Profile intro />
        <p>Made by Wendell de Sousa | 2021</p>

        <button>Github</button>
        <button>Email</button>
      </div>
    </main>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Localization />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
