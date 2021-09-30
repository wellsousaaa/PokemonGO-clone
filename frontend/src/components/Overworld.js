import { useEffect, useRef, useState } from "react";
import { getNearbyPokemon } from "../helpers/pokemon";
import { getDistanceFromLatLonInKm } from "../helpers/radius";

const defaultCoords = {
  lat: process.env.REACT_APP_DEFAULT_LAT,
  lng: process.env.REACT_APP_DEFAULT_LNG,
};

export default function OverWorld(props) {
  const mapRef = useRef();
  const [HMap, setMap] = useState(null);

  useEffect(() => {
    // if("H" in window) return;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // const defaultCoords = {
        //   lat: pos.coords.latitude,
        //   lng: pos.coords.longitude,
        // };
        const H = window.H;
        const platform = new H.service.Platform({
          apikey: process.env.REACT_APP_MAP_KEY,
        });

        const defaultLayers = platform.createDefaultLayers();

        defaultLayers.raster.normal.base.setMax(1000);
        // defaultLayers.raster.normal.base.setMin(999);

        // defaultLayers.raster.normal.base.setMin(960);

        // Create an instance of the map
        const map = new H.Map(
          mapRef.current,
          defaultLayers.raster.normal.base,
          {
            // This map is centered over Europe
            center: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
            zoom: 18,
            pixelRatio: window.devicePixelRatio || 1,
          }
        );

        window.addEventListener("resize", () => map.getViewPort().resize());

        map.getViewModel().setLookAtData({
          tilt: 45,
          heading: 0,
          position: defaultCoords,
        });

        const behavior = new H.mapevents.Behavior(
          new H.mapevents.MapEvents(map)
        );

        // ("pikomon");
        function makeMarker(
          className,
          size = { width: "2rem", height: "2rem" },
          src = "https://indiefasr640.weebly.com/uploads/1/2/5/6/125615895/560651481.png"
        ) {
          var outerElement = document.createElement("div");
          var innerElement = document.createElement("img");

          outerElement.className = className;
          innerElement.className = className + "-inner";
          outerElement.style.imageRendering = "pixelated";
          outerElement.style.userSelect = "none";
          outerElement.style.webkitUserSelect = "none";
          outerElement.style.msUserSelect = "none";
          outerElement.style.mozUserSelect = "none";
          outerElement.style.cursor = "pointer";

          innerElement.src = src;
          innerElement.style.width = size.width;
          innerElement.style.height = size.height;
          //   innerElement.style.transform = "scale(1.6)";

          // add negative margin to inner element
          // to move the anchor to center of the div

          outerElement.appendChild(innerElement);

          // Add text to the DOM element
          // innerElement.innerHTML = "C";

          return outerElement;
        }

        function startBattle(id) {
          props.setIsBattle({ id });
        }

        // function changeOpacityToOne(evt) {
        //   evt.target.style.opacity = 1;
        // }

        //create dom icon and add/remove opacity listeners

        const playerIcon = new H.map.DomIcon(
          makeMarker(
            "player",
            { height: "5.9rem", width: "3rem" },
            "https://i.pinimg.com/originals/69/62/bb/6962bbaea08e4589a85b771c24116019.png"
          )
        );

        const playerMarker = new H.map.DomMarker(
          defaultCoords || {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          { icon: playerIcon }
        );
        map.addObject(playerMarker);

        setMap(map);

        (async () => {
          const { data, error } = await getNearbyPokemon(defaultCoords);

          if (error) return;
          for (let pokemon of data) {
            const pokemonImage =
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/" +
              pokemon.poke_id +
              ".png";

            // getDistanceFromLatLonInKm(
            //   defaultCoords.lat,
            //   defaultCoords.lng,
            //   pokemon.latitude,
            //   pokemon.longitude
            // ),
            //   pokemonImage
            // );
            const handleBattle = () => {
              startBattle(pokemon.poke_id);
            };

            const pokemonIcon = new H.map.DomIcon(
              makeMarker(
                "pikomon",
                {
                  width: 80,
                  height: 60,
                },
                pokemonImage
              ),
              {
                // the function is called every time marker enters the viewport
                onAttach: function (clonedElement, domIcon, domMarker) {
                  clonedElement.addEventListener("touchend", handleBattle);
                },
                // the function is called every time marker leaves the viewport
                onDetach: function (clonedElement, domIcon, domMarker) {
                  clonedElement.removeEventListener("touchend", handleBattle);
                },
              }
            );

            const pokemonMarker = new H.map.DomMarker(
              { lat: pokemon.latitude, lng: pokemon.longitude },
              { icon: pokemonIcon }
            );
            map.addObject(pokemonMarker);
          }
        })();
      });
    }

    // return () => {
    //   // if (HMap.dispose) HMap.dispose();
    // };
  }, []);

  return (
    <div>
      <Menu />
      <div className="weather" />
      <div ref={mapRef} style={{ height: "100vh" }}></div>
    </div>
  );
}

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [section, setSection] = useState("pokemon");

  if (!isOpen)
    return (
      <div className="bottom-ui">
        <div className="profile" />
        <div className="pokeball" onClick={() => setIsOpen(true)} />
        <div className="pokemon-nearby" />
      </div>
    );

  return (
    <div className="menu">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <h2 onClick={() => setSection("pokemon")}>Pokemon</h2>
        <h2 onClick={() => setSection("bag")}>Bag</h2>
      </div>

      {section === "pokemon" ? (
        <div className="pokemon-list">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      ) : (
        <div className="bag-list">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      )}

      <div className="close-button" onClick={() => setIsOpen(false)}></div>
    </div>
  );
};
