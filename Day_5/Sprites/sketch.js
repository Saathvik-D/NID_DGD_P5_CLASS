let spriteImg;
let sRows = 4; sCols = 8;
let sprites = [];
function preload() {
  spriteImg = loadImage("Image/img.png");

}
function setup() {

  let sWidth = spriteImg.width / sCols;
  let sHeight = spriteImg.height / sRows;
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < sRows; i++) {
    for (let j = 0; j < sCols; j++) {
      sprites[sprites.length] = spriteImg.get(j * sWidth, i * sHeight, sWidth, sHeight)
    }
  }
  console.log(sprites);
}

function draw() {
  
 background(220);

}

function mousePressed(){
  
   let totalframe= sCols*sRows;
  image(sprites[frameCount%totalframe],0,0);
}


