let x =10;

function setup() {
  createCanvas(innerWidth, innerHeight);
   a=0
   
   b=0
   size=0
   frameRate(10);
   newLoppp
   
}

function draw() {
  
 
 
 
}
function mouseClicked(){

newLoppp();

}


function newLoppp(){
  background(220);
  for(let j = 0; j<height;j=j+x ){
    for(let i=0; i<width; i=i+x){
    let num = random(0,1);
  if(num<0.5){
    line(i,j,i+x,j+x,);
  }
  else{
  line  (i+x,j,i,j+x);

  }
  }
  }
}