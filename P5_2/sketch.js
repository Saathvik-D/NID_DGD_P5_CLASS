function setup() {
  createCanvas(windowWidth,windowHeight);
  background(220);
  frameRate(165);
  
 
  
  
}

function draw() {
  
  noStroke();
  fill(255);
  rect(0,0,100,100);
  fill(mouseX/2,mouseY/2,mouseX/2);
  ellipse(mouseX,mouseY,10,10);
  ellipse(width-mouseX,mouseY,10,10);
  

  
}