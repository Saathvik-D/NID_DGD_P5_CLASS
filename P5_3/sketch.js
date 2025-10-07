let x;

function setup() {
  createCanvas(windowWidth, windowHeight);
 x=0;
}

function draw() {
  background(220);
  rect(width/2,height/2,frameCount%300);

}
