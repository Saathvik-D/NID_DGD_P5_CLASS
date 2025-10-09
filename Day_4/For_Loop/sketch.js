let x = 0, y = 0, blockSize = 40;
function setup() {
  createCanvas(innerWidth, innerHeight);
  mouseClicked();
  strokeCap(ROUND);


}

function draw() {


}

function mouseClicked() {
  newLineMaker();

}

function newLineMaker() {
  background(220);
  strokeCap(ROUND);
  strokeWeight(5);
  stroke(random(0, 255), random(0, 255), random(0, 255));


  for (let i = 0; i < width; i = i + blockSize) {
    for (let j = 0; j < height; j = j + blockSize) {

      let choice = random(0, 1);

      if (choice < 0.5) {

        line(i, j, i + blockSize, j + blockSize);
      }
      else {

        line(i + blockSize, j, i, j + blockSize);
      }
    }

  }


}