let size = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER); 
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  background(20);
for(let i=0; i<width; i=i+size){
  for(let j=0; j<height; j=j+size){
    push(); 
    translate(i,j);
    rotate(frameCount*10);
    rect(0,0,size/2*sin(frameCount), size/2*sin(frameCount));
    pop(); 
  }
}


}
