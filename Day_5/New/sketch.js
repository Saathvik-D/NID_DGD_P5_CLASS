let spriteImage, sprites =[];
let spriteX = 3, spriteY = 4;
let count = 0;
let row = 0;
let x = 0, y = 0;
let xdir = 0, ydir = 0;

function preload() {
  
  spriteImage = loadImage('img/Basic Char Set Black.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
 
  let w = spriteImage.width/spriteX;
  let h = spriteImage.height/spriteY;
  
 
  for(let i = 0; i<spriteY;i++) {
   
    sprites[i] = [];
    
   
     for(let j = 0;j<spriteX;j++) {
      
      sprites[i][j] = spriteImage.get(j*w, i*h, w, h ); 
    }
  }
  
}

function draw() {
  background(220);
 
  image(sprites[row][count],x,y);
  if(frameCount%5==0 && isKeyPressed) {
    count = (count+1)%spriteX;
    x = x+ xdir;
    y = y+ ydir;
  }
}

function keyPressed() {
 
  if(keyCode == UP_ARROW) {
    row = 3; 
    xdir = 0; 
    ydir = -7;
  } else if(keyCode == DOWN_ARROW) {
    row = 0;
    xdir = 0; 
    ydir = 7; 
  } else if(keyCode == LEFT_ARROW) {
    row = 2;
    ydir = 0; 
    xdir = -7; 
  } else if(keyCode == RIGHT_ARROW) {
    row = 1;
    ydir = 0;
    xdir = 7; 
  }
}``