let triSize = 50;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(5);
  noStroke();
mouseClicked();
}

function draw() {
 



  /* for(let i =0;i<width;i=i+triSize){
 for(let j=0;j<height;j=j+triSize){
   
 }*/


}


function mouseClicked(){
   background(220);
fill(random(0,255),random(0,255),random(0,255));
  for (let i = 0; i < width; i = i + triSize) {
    for (let j = 0; j < height; j = j + triSize) {
      let choice = random(0, 1);
      if (choice > 0.5) {
        //fill(random(0,255),random(0,255),random(0,255));
        triangle(i, j, i, j + triSize, triSize + i, j + triSize);
      }
      else {
      //  fill(random(0,255),random(0,255),random(0,255));
        triangle(i, j, i + triSize, j + triSize, triSize + i, j);
      }
    }
  }

}
