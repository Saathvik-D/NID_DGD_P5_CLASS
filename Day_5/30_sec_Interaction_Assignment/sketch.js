let cnv;
let boxSize = 100;
let rectX = 0; // movement offset
let speed = 2; // movement speed
let life = 0;

function setup() {
  cnv = createCanvas(1080, 720);
  centerCanvas();
  noStroke();
 
}

function draw() {
   background(150);
 


  fill("black");

  myFamily();
  myFriends();
 
  
}

function windowResized() {
  centerCanvas();
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}



function myFamily(){
  if ((mouseX < width / 2) && (mouseY < height / 2)) {
    life = 1;
  } 
 

  // If active, draw and move rectangles
  if (life == 1) {
    fill("blue");
    //for (let i = 0; i <= 10; i += 100) {
      rect( rectX, 0, boxSize, boxSize)
      rectX += speed;
      if (rectX > boxSize) rectX =100;
      
    //}
    
  }
}

function myFriends(){
  
  if ((mouseX > width / 2) && (mouseY < height / 2)) {
    life = 2;
  } 
 

  // If active, draw and move rectangles
  if (life ==2 ) {
    fill("green");
   // for (let j = 0; j <= 100; j += 10) {
      rect((width-rectX), 0, boxSize, boxSize)
      rectX -= speed;
      if (rectX < boxSize) rectX =100;
      
  //  }
    
    
  }
}