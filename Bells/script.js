// import songs
import { twinkle, baba, littleLamb, jingle } from "./songs.js";

let soundsNodeList = document.querySelectorAll(".sound");
let bellsNodeList = document.querySelectorAll(".bell");
let keysNodeList = document.querySelectorAll(".key");

// create array from nodeList so we can use array methods
let sounds = Array.from(soundsNodeList);
let bells = Array.from(bellsNodeList);
let keys = Array.from(keysNodeList);

// Handle selection of individual elements
const selectSound = (note) => {
  return sounds.find((sound) => sound.id === note);
};

const selectBell = (note) => {
  return bells.find((bell) => bell.dataset.note === note);
};

const selectKey = (note) => {
  return keys.find((key) => key.dataset.note === note);
};

// const bellRing = (bell) => {
//   let direction = Math.random() < 0.5 ? "ring-bell-right" : "ring-bell-left";
//   bell.classList.toggle(direction);
//   setTimeout(() => {
//     bell.classList.toggle(direction);
//   }, 500);
// };

// handle playing, stopping and reseting bell audio
const bellPlaying = (bell, sound, key) => {
  //  Apply styles
  key.classList.toggle("press-key");
  bell.classList.toggle("ring-bell");
  //  Sounds
  sound.pause();
  sound.currentTime = 0;
  sound.play();
  //  Remove styles
  setTimeout(() => {
    bell.classList.toggle("ring-bell");
    key.classList.toggle("press-key");
  }, 500);
};

bells.forEach((bell) => {
  bell.addEventListener("click", () => {
    bellPlaying(
      bell,
      selectSound(bell.dataset.note),
      selectKey(bell.dataset.note)
    );
  });
});

keys.forEach((key) => {
  key.addEventListener("click", () => {
    bellPlaying(
      selectBell(key.dataset.note),
      selectSound(key.dataset.note),
      key
    );
  });
});

const logKey = (e) => {
  let note;
  switch (e.code) {
    case "KeyO":
      note = "a-bb";
      break;
    case "KeyK":
      note = "a";
      break;
    case "KeyL":
      note = "b";
      break;
    case "KeyW":
      note = "c-db";
      break;
    case "KeyR":
      note = "d-eb";
      break;
    case "KeyD":
      note = "d";
      break;
    case "KeyG":
      note = "e";
      break;
    case "KeyU":
      note = "f-gb";
      break;
    case "KeyH":
      note = "f";
      break;
    case "KeyI":
      note = "g-ab";
      break;
    case "KeyJ":
      note = "g";
      break;
    case "Semicolon":
      note = "high-c";
      break;
    case "KeyA":
      note = "low-c";
      break;

    default:
      note = "low-c";
      break;
  }

  bellPlaying(selectBell(note), selectSound(note), selectKey(note));
};

document.addEventListener("keydown", logKey);

const song = (notes) => {
  notes.forEach((note, index) => {
    setTimeout(() => {
      if (note !== ".") {
        bellPlaying(selectBell(note), selectSound(note), selectKey(note));
      }
    }, 900 * ++index);
  });
};

document.querySelector("#twinkle").addEventListener("click", () => {
  song(twinkle);
});

document.querySelector("#baba").addEventListener("click", () => {
  song(baba);
});

document.querySelector("#littleLamb").addEventListener("click", () => {
  song(littleLamb);
});

document.querySelector("#jingle").addEventListener("click", () => {
  song(jingle);
});
