let myCar;
let newCar_1;
let cars=[];
let NoCar=20;
function setup() {
  createCanvas(400, 400);
  myCar = new Car(100,300,200,20);
  newCar_1 = new Car(100,100,100,2)

  
  
}

function draw() {
  background(220);
  myCar.show();
  newCar_1.show();
  myCar.move();
  newCar_1.move();
  
}
