let x;
let y;
let z;
let a;
let b;  
let c;
let d;
let e;
let f;
let g;
function setup() {
  createCanvas(500, 500);
frameRate(5);

}

function draw() {
  x =random(0,255);
  y =random(0,255);
  z =random(0,255);
  a =random(0,500);
  b =random(0,500);
  c =random(0,500);
  d =random(0,500);
  e =random(0,500);
  f =random(0,500);
  g =random(0,500);
  background(0,0,0);
  //ellipse(250,250,500,500);
  //rect(250,250,250,250);
  //line(0,0,250,250);
  //triangle(0,250,250,250,250,0)
  //fill(250,0,0);
  noStroke();
  //ellipse(125,125,255,255);
  //fill(0,250,0);
  //ellipse(375,125,255,255);
  //fill(0,156,100);
  //triangle(500,160,250,500,5,160);
  
  rect(50,50,400,50);
  rect(400,50,50,400);
  rect(50,400,400,50);
  rect(50,150,50,250);
  rect(50,150,300,50);
  rect(300,150,50,200);
  rect(150,300,150,50);
  rect(150,250,50,50);
  
  fill(x);
  
  rect(50,50,390,50);
  
  rect(400,50,50,390);
  rect(50,400,390,50);
  rect(50,150,50,240);
  rect(50,150,290,50);
  rect(300,150,50,190);
  rect(150,300,140,50);
  rect(150,250,50,40);
  fill(255-x,255-y,255-z);
  fill(x,y,z);
  triangle(a,b,c,d,e,f);
  triangle(a,b,c,d,e,f);

  //triangle(a,b,c,250,250);
  triangle
    
    
  
  
  
}