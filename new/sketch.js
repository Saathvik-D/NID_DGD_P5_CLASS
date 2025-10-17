let x = 0;
let y = 0;


let emotions = ['Happy', 'Sad', 'Angry', 'Surprised', 'Calm', 'Excited'];


let easings = [0.2, 0.05, 0.1, 0.15, 0.03, 0.25];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(24);
  noStroke();
}

function draw() {
  background(220);


  emotionsBox();


  let boxWidth = width / emotions.length;
  let zone = floor(mouseX / boxWidth);


  zone = constrain(zone, 0, emotions.length - 1);


  let easing = easings[zone];


  let targetX = mouseX;
  let targetY = mouseY;


  x += (targetX - x) * easing;
  y += (targetY - y) * easing;


  fill(100, 200, 255);
  ellipse(x, y, 50, 50);


  fill(50);
  textSize(32);
 // text(`Current Emotion: ${emotions[zone]}`, width / 2, height - 40);
}


function emotionsBox() {
  let boxWidth = width / emotions.length;

  for (let i = 0; i < emotions.length; i++) {

    fill(255 - i * 30, 200 - i * 20, 150 + i * 15, 80);
    rect(i * boxWidth, 0, boxWidth, height);


    fill(0);
    textSize(20);
    text(emotions[i], i * boxWidth + boxWidth / 2, 30);
  }
}
