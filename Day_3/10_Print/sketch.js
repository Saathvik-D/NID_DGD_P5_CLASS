let num;
let x;
let y;
let size;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  x=0;
  y=0;
  size=50;
}

function draw() {
  
  num = random(0,1);
  if(num<0.5){
    line(x+size,y,x,y+size);
  }
  else{
  line  (x,y,x+size,y+size);

  }

  x=x+size
  if(x>windowWidth){
    x=0;
    y=y+size;
  }
}



