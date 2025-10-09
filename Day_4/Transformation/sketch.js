let numPttals = 18;
let flowerSize;
let a = 0;
let b = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();

}

function draw() {
  flowerSize = 200
  background(220);
  for (let i = 0; i < width; i = i + flowerSize) {
    for (let j = 0; j < height; j = j + flowerSize) {
      pinkFlower(i, j);
    }

  }



}

function pinkFlower(x, y) {
  push();

  translate(x+50, y+50);
  scale(0.5, 0.5);
  rotate(mouseY);

  for (let i = 0; i < numPttals; i++) {
    rotate(20);

    fill(245, 40, 145, 100);
    ellipse(120, 0, 150, 80);
    fill("white");
    ellipse(0, 0, 100, 100);
  }


  pop();

}
