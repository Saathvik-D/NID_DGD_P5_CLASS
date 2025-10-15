let flowers = [];
function setup() {
  createCanvas(400, 400);
  myFlower = new Flower(200, 200);
}

function draw() {
  background(220);
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].checkPosition(mouseX, mouseY);
    flowers[i].drawFlower();
    flowers[i].moveFlower();

  }
}

function mousePressed() {
  let tempFlower = new Flower(mouseX, mouseY, random(20, 50), random(20, 50), random(-2, 2), random(-2, 2));
  flowers.push(tempFlower);
}
