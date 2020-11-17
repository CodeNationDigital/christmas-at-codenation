let board = document.querySelector("#board");

let squares = [];

for (let i = 0; i < 100; i++) {
  let square = document.createElement("div");
  square.classList.add("square");
  if (i % 2 !== 0) {
    square.classList.add("oddSquare");
  }

  square.id = i + 1;

  squares.push(square);
}

console.log(Array.from(squares));
