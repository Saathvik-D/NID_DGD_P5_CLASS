let recSize, g0, g1, g2, g3, g4, g5, g6, g7, g8, g9, g10;


function preload() {
  g0 = loadImage("Pattern/0.png");
  g1 = loadImage("Pattern/1.png");
  g2 = loadImage("Pattern/2.png");
  g3 = loadImage("Pattern/3.png");
  g4 = loadImage("Pattern/4.png");
  g5 = loadImage("Pattern/5.png");
  g6 = loadImage("Pattern/6.png");
  g7 = loadImage("Pattern/7.png");
  g8 = loadImage("Pattern/8.png");
  g9 = loadImage("Pattern/9.png");
  g10 = loadImage("Pattern/10.png");
 



}
function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(10);
  mousePressed();
  
}

function draw() {
  
  
 
}

function mousePressed(){
  background(220);
  recSize = 100;
  for (let i = 0; i < width; i = i + recSize) {
    for (let j = 0; j < height; j = j + recSize) {
      
    


       let choice = floor(random(0, 10));
     if (choice == 0) {
        image(g0, i, j, recSize, recSize);

      }
      else if (choice == 1) {
        image(g1, i, j, recSize, recSize);
      }
      else if (choice == 2) {
        image(g2, i, j, recSize, recSize);
      }
      else if (choice == 3) {
        image(g3, i, j, recSize, recSize);
      }
      else if (choice == 4) {
        image(g4, i, j, recSize, recSize);
      }
      else if (choice == 5) {
        image(g5, i, j, recSize, recSize);
      }
      else if (choice == 6) {
        image(g6, i, j, recSize, recSize);
      }
      else if (choice == 7) {
        image(g7, i, j, recSize, recSize);
      }
      else if (choice == 8) {
        image(g8, i, j,recSize, recSize);
      }
      else if (choice == 9) {
        image(g9, i, j,recSize, recSize);
      }
      else if (choice == 10) {
        image(g10, i, j, recSize, recSize)
      }


    }

  }}


