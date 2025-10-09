let x;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  x = 30;
}

function draw() {


  /* //using nostroke 
   noStroke();
   fill("red");
  
   //top 
   ellipse(windowWidth/2,(windowHeight/2)-90,x,x);
   //bottom
   ellipse(windowWidth/2,(windowHeight/2)+90,x,x);
   //right
   ellipse((windowWidth/2)+90,(windowHeight/2),x,x);
   //left
   ellipse((windowWidth/2)-90,(windowHeight/2),x,x);
   //using fill
   fill("yellow");
    //drawing a flower
   ellipse(windowWidth/2,windowHeight/2,x+20,x+20);*/





}

function makingFlower(a, b, pSize) {
  /* //using nostroke 
  noStroke();
  fill("red");
 
  //top 
  ellipse(a,b-90,x,x);
  //bottom
  ellipse(a,b+90,x,x);
  //right
  ellipse(a+90,b,x,x);
  //left
  ellipse(a-90,b,x,x);
  //using fill
  fill("yellow");
   //drawing a flower
  ellipse(a,b,x+20,x+20);*/




  /*
    //using nostroke 
    noStroke();
    let newRGB;
    newRGB=random(0,255);
    fill(newRGB,0,0);
   
    //top 
    ellipse(a,(b)-x,pSize);
    //bottom  
    ellipse(a,(b)+x,pSize);
    //right
    ellipse((a)+x,(b),pSize);
    //left
    ellipse((a)-x,(b),pSize);
    //using fill
    fill("yellow");
     //drawing a flower
    ellipse(a,b,pSize);*/






}

function mousePressed() {

  let pSize = random(20, 100);
  makingFlower(mouseX, mouseY, pSize);
  if (mouseY > windowHeight / 2) {
    fill("red");
  }
  else {
    fill("yellow");
  }
  if (mouseX < windowWidth / 2) {
    ellipse(mouseX, mouseY, 50, 50);
  }
  else{
    rect(mouseX, mouseY, 50, 50);
  }

}