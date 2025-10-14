function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  let noiceValue = noise(0.01*frameCount+100);
  let noiceMapped = map(noiceValue,0,1,10,100);
  ellipse(width/2,height/2,noiceMapped);
}
