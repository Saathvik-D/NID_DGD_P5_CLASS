function setup() {
  createCanvas(windowWidth, windowHeight);
   background(220);
   noStroke();
}

function draw() {
  fill(random(0,255),random(0,255),random(0,255));
 
  ellipse(mouseX,mouseY,50,50); 
  ellipse(width-mouseX,mouseY,50,50);
  ellipse(mouseX,height-mouseY,50,50);
  ellipse(width-mouseX,height-mouseY,50,50);
}
