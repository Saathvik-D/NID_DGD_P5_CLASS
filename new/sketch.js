let paddleW = 30;
let paddleH = 120;
let paddleSpeed = 7;
let borderThickness = paddleW;

let playerPaddle, aiPaddle, ball;
let leftScore = 0;
let rightScore = 0;


function setup() {
  createCanvas(1080, 720);
  rectMode(CENTER);
  noStroke();


  // Left player paddle (player)
  playerPaddle = new PaddlePlayer(paddleW + 10, height / 2, paddleW, paddleH, paddleSpeed);


  // Right paddle (AI)
  aiPaddle = new PaddleAi(width - paddleW - 10, height / 2, paddleW, paddleH, paddleSpeed);


  // Ball in center
  ball = new Ball(width / 2, height / 2, 15, 4, random(-2, 2));
}


function draw() {
  background(255);


  // draw scores
  fill(0, 0, 0, 20);
  textSize(200);
  textAlign(CENTER, CENTER); // center horizontally and vertically
  text(leftScore, width * 0.25, height / 2);
  text(rightScore, width * 0.75, height / 2);


  // top and bottom bars
  fill(0);
  rect(width / 2, borderThickness / 2, width, borderThickness);
  rect(width / 2, height - borderThickness / 2, width, borderThickness);


  // center line (dashed)
  stroke(0);
  strokeWeight(2);
  for (let y = borderThickness + 20; y < height - borderThickness - 20; y += 30) {
    line(width / 2, y, width / 2, y + 12);
  }
  noStroke();


  // draw paddles
  fill(0);
  playerPaddle.show();
  aiPaddle.show();



  if (keyIsDown(UP_ARROW)) {
    playerPaddle.moveUp();

  }
  if (keyIsDown(DOWN_ARROW)) {
    playerPaddle.moveDown();

  }


  // AI automatic movement

  aiPaddle.smoothFollowWithError(ball.y, 0.01, 30);



  // ball
  ball.show();
  ball.update();


  // collisions
  ball.checkCollision(playerPaddle);
  ball.checkCollision(aiPaddle);


  // scoring: if ball goes out horizontally, award point and reset
  if (ball.x - ball.r < 0) {
    // right player scores
    rightScore++;
    ball.reset(+1); // serve to right
  } else if (ball.x + ball.r > width) {
    leftScore++;
    ball.reset(-1); // serve to left
  }






}