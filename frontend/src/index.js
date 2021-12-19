import React from "react";
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
  // if ("geolocation" in navigator) return <App />;
  return (
    <main className="intro">
      <h1>Pokémon GO</h1>
      <img src="https://pbs.twimg.com/profile_images/1155697286078296069/muxy-u6y_400x400.jpg" />

      <p>Lorem ipsum</p>
      <input type="text" placeholder="Insira seu username" />
      <button>Start</button>

      <Profile intro />
      <p>Made by Wendell de Sousa | 2021</p>

      <button>Github</button>
      <button>Email</button>
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
