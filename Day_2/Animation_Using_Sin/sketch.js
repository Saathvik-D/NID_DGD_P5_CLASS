function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  ellipse(width/2, height/2, 100 + 50 * sin(frameCount * 0.1), 100 + 50 * sin(frameCount * 0.1));

}
