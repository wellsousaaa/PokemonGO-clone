import { useRef } from "react";

function Pokeball(props) {
  /// Pokeball Position
  const pos = useRef({ pos1: 0, pos2: 0, pos3: 0, pos4: 0 });
  const el = useRef(null);

  /// Pokeball velocity
  const pokeball = useRef(0);
  const pokeballX = useRef(0);

  /// Last Pokeball velocity
  const lastX = useRef(null);
  const lastY = useRef(null);

  const dragMouseDown = (e) => {
    // get the mouse cursor position at startup:
    pos.current.pos3 = e.clientX;
    pos.current.pos4 = e.clientY;

    window.addEventListener("touchend", closeDragElement);
    window.addEventListener("touchmove", elementDrag);
  };

  const elementDrag = (e) => {
    if (lastY.current && e.changedTouches[0].clientY < lastY.current) {
      pokeball.current +=
        lastY.current - e.changedTouches[0].clientY > 10 ? 5 : 0.2;
    }

    pokeballX.current =
      pokeballX.current +
      (e.changedTouches[0].clientX > lastX.current ? -10 : 10);

    lastX.current = e.changedTouches[0].clientX;
    lastY.current = e.changedTouches[0].clientY;

    // calculate the new cursor position:
    pos.current.pos1 = pos.current.pos3 - e.changedTouches[0].clientX;
    pos.current.pos2 = pos.current.pos4 - e.changedTouches[0].clientY;
    pos.current.pos3 = e.changedTouches[0].clientX;
    pos.current.pos4 = e.changedTouches[0].clientY;
    // set the element's new position:
    el.current.style.top = el.current.offsetTop - pos.current.pos2 + "px";
    el.current.style.left = el.current.offsetLeft - pos.current.pos1 + "px";
  };

  function closeDragElement() {
    // stop moving when mouse button is released:
    window.removeEventListener("touchend", closeDragElement);
    window.removeEventListener("touchmove", elementDrag);

    if (!el.current) return;

    const p = el.current.offsetTop - pos.current.pos2;
    const x = el.current.offsetLeft - pos.current.pos1;

    const throwPositionX = x - pokeballX.current + "px";
    const throwPositionY = p - pokeball.current * 5 + "px";
    const transitionTime =
      (p + pokeball.current < 400 ? 500 : p + pokeball.current) + "ms";
    const transitionEase = "cubic-bezier(0.17, 0.67, 0.79, 1.64)";
    const startScale = "scale(0.7)";

    el.current.style.setProperty("--left", throwPositionX);
    el.current.style.setProperty("--top", throwPositionY);
    el.current.style.setProperty("--transition-time", transitionTime);
    el.current.style.setProperty("--ease-function", transitionEase);
    el.current.style.setProperty("--scale", startScale);

    el.current.className = el.current.className + " pokeball-throw";

    pokeball.current = 0;
    pokeballX.current = 0;

    setTimeout(() => {
      if (!el.current) return;
      const finalThrowPositionY = p - pokeball.current * 5 + "px";
      const finalTransitionTime = p + pokeball.current * 4 + "ms";
      const finalEase = "cubic-bezier(.46,.28,.74,1.1)";
      const finalScale = "scale(0.4)";

      el.current.style.setProperty("--top", finalThrowPositionY);
      el.current.style.setProperty("-transition-time", finalTransitionTime);
      el.current.style.setProperty("--ease-function", finalEase);
      el.current.style.setProperty("--scale", finalScale);

      setTimeout(() => {
        if (!el.current) return;
        /// Checar se o pokemon foi pego
        const poke = document.querySelector(".battle-pokemon");

        console.log(x - pokeballX.current * 5, poke.offsetLeft - 40);

        if (
          p - pokeball.current * 5 > poke.offsetTop - 100 &&
          p - pokeball.current * 5 <
            poke.offsetTop - 100 + poke.offsetHeight / 1.9 &&
          x - pokeballX.current * 5 < poke.offsetLeft - 40 &&
          x - pokeballX.current * 5 > poke.offsetLeft - poke.offsetWidth / 3
        ) {
          el.current.style.setProperty("--top", "10%");
          el.current.className = el.current.className + " pokeball-open";
          props.setIsCatching(true);
          // window.alert("Pegou");
        } else {
          const finalThrowPositionY = p - pokeball.current * 7 + "px";
          el.current.style.top = finalThrowPositionY;
          el.current.style.opacity = "0";

          setTimeout(() => {
            if (!el.current) return;
            el.current.style.opacity = "1";
            el.current.style.top = "unset";
            el.current.className = "battle-pokeball";
            el.current.style.left = "unset";
            el.current.style.setProperty("--scale", "scale(1)");
          }, 1000);
        }
      }, p + pokeball.current * 5);
    }, p + pokeball.current);
  }

  return (
    <div className="battle-pokeball" ref={el} onTouchStart={dragMouseDown} />
  );
}

export default Pokeball;
