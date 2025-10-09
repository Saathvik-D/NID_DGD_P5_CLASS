let x, y;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  background(220);
}

function draw() {


  carModel();
}


function carModel() {

  ellipse(x - 50, y + 50, 50, 50);
  ellipse(x + 50, y + 50, 50, 50);
  rect(x, y, 150, 50);
}

function mouseClicked() {
  x = mouseX;
  y = mouseY;
};