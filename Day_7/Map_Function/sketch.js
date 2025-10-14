let bgColor;
function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  bgColor=map(mouseX,0,width,255,0);
  background(bgColor);


}
