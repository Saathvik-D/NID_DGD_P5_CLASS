let x = 0;
let y = 0;
let slowDown = 0.08; 
function setup() {
  createCanvas(600, 400, WEBGL); 
  
}

function draw() {
  background(30);


  let targetX = mouseX - width / 2; 
  let targetY = mouseY - height / 2;

  x += (targetX - x) * slowDown;
  y += (targetY - y) * slowDown;

 
  ambientLight(100);
  pointLight(255, 255, 255, 0, 0, 300);

 
  push();
  translate(x, y, 0);
  normalMaterial();
  sphere(40); 
}
