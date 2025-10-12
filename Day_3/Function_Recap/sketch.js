function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  noStroke()
}

function draw() {
  

  
}

function newLoca(x,y){
  let a = random(100,120);
  let b = random(80,100);
  fill(random(255), random(255), random(255), 150);
  ellipse(x+80, y, a);
  ellipse(x-80, y, a);
  ellipse(x, y-80, a);
  ellipse(x, y+80, a);
  fill(random(255), random(255), random(255), 150);
  ellipse(x, y, b);
}

function mousePressed(){
  
  newLoca(mouseX, mouseY);
}
