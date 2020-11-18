const scoreTag = document.querySelector("#score");

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const itemImg = new Image();
itemImg.src = "/assets/present.png";

canvas.height = 600;
canvas.width = 600;

let score = 0;
let items = [];
let count = 0;
let maxCount = 3;
let direction = "still";
let catchBoxMovementSpeed = 2.5;

let catchBox = {
  x: canvas.width / 2 - 30,
  y: canvas.height - 20,
  width: 60,
  height: 20,
};

// handle key movements of catchBox
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight") {
    direction = "right";
  } else if (e.code === "ArrowLeft") {
    direction = "left";
  }
});

document.addEventListener("keyup", (e) => {
  direction = "still";
});

class Item {
  constructor(x, y, width, height, color, velocity, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocity = velocity;
    this.image = image ? image : null;
    this.active = true;
  }

  draw() {
    // check that the present will remain on the canvas
    if (this.x > canvas.width - this.width) {
      this.x = canvas.width - this.width;
    }
    // check if an image has been inputted
    if (this.image) {
      c.drawImage(itemImg, this.x, this.y, this.width, this.height);
    } else {
      c.beginPath();
      c.rect(this.x, this.y, this.width, this.height);
      c.fillStyle = this.color;
      c.fill();
    }
  }

  remove() {
    this.active = false;
    count--;
  }

  update() {
    this.draw();
    // check for bottom of the page
    if (this.y >= canvas.height) {
      this.remove();
    }
    // move the item
    this.y = this.y + this.velocity;
  }
}

function createItem() {
  items.push(
    new Item(
      Math.random() * canvas.width,
      0,
      30,
      30,
      "red",
      (Math.random() + 0.2) * 1
    )
  );
  count++;
  console.log(items[items.length - 1]);
}

createItem();

function animate(timestamp) {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);
  // spawn more items in until maxCount is met
  if (timestamp > 3100 && count < maxCount) {
    createItem();
  }
  // remove items at the bottom of the page
  items = items.filter((item) => {
    return item.active != false;
  });

  // add catcher
  c.beginPath();
  c.rect(catchBox.x, catchBox.y, catchBox.width, catchBox.height);
  c.fillStyle = "black";
  c.fill();

  // control movement
  if (direction == "still") {
  } else if (direction == "right") {
    catchBox.x += catchBoxMovementSpeed;
  } else if (direction == "left") {
    catchBox.x -= catchBoxMovementSpeed;
  }

  items.forEach((item) => {
    item.update();
  });

  // collision logic
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (
      item.y >= catchBox.y &&
      item.x > catchBox.x &&
      item.x + item.width < catchBox.x + catchBox.width
    ) {
      score += 10;
      item.remove();
    }
  }

  //   showScore
  scoreTag.textContent = `Score: ${score}`;
}

animate();
