let paddleW = 30;
let paddleH = 120;
let paddleSpeed = 7;
let borderThickness = paddleW;

let playerPaddle, aiPaddle, ball;
let leftScore = 0;
let rightScore = 0;


let ballMoving = false;





function setup() {
  createCanvas(1080, 720);
  rectMode(CENTER);
  noStroke();


  // Left player paddle (player)
  playerPaddle = new PaddlePlayer(paddleW + 10, height / 2, paddleW, paddleH, paddleSpeed);


  // Right paddle (AI)
  aiPaddle = new PaddleAi(width - paddleW - 10, height / 2, paddleW, paddleH, paddleSpeed);


  // Ball in center but stationary until click
  ball = new Ball(width / 2, height / 2, 15, 0, 0);
  ball.reset(0);       
  ball.xs = 0;        
  ball.ys = 0;
  ballMoving = false;

}


function draw() {
  background(255);




  // draw scores
  fill(0, 0, 0, 20);
  textSize(200);
  textAlign(CENTER, CENTER); 
  text(leftScore, width * 0.25, height / 2);
  text(rightScore, width * 0.75, height / 2);


  // top and bottom bars
  fill(0);
  rect(width / 2, borderThickness / 2, width, borderThickness);
  rect(width / 2, height - borderThickness / 2, width, borderThickness);


  
  if (!ballMoving) {
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Click to serve", width/2, 15);
}


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
    playerPaddle.moveDown();

  }
  if (keyIsDown(DOWN_ARROW)) {
    playerPaddle.moveUp();

  }


  // AI automatic movement

  aiPaddle.smoothFollowWithError(ball.y, 0.01, 30);



  // ball
  // always draw the ball so user can see it
ball.show();

// only update & process collisions/scoring if the ball has been served
if (ballMoving) {
  ball.update();

  // collisions
  ball.checkCollision(playerPaddle);
  ball.checkCollision(aiPaddle);

  // scoring: if ball goes out horizontally, award point and reset (and stop movement)
  if (ball.x - ball.r < 0) {
    // right player scores
    rightScore++;
    ball.reset(+1);    // prepare serve direction if you want
    ball.xs = 0;
    ball.ys = 0;
    ballMoving = false;
  } else if (ball.x + ball.r > width) {
    leftScore++;
    ball.reset(-1);
    ball.xs = 0;
    ball.ys = 0;
    ballMoving = false;
  }
}



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

function mousePressed() {
  // Only serve if ball is currently not moving (waiting for click)
  if (!ballMoving) {
    // If ball.xs is zero (stationary), give it a horizontal speed to start moving.
    // Choose direction: random, or based on last scorer (here random).
    const dir = (random() < 0.5) ? -1 : 1;
    const baseSpeed = 4;
    ball.xs = baseSpeed * dir;
    ball.ys = random(-2.5, 2.5); // small vertical randomness for variety
    ballMoving = true;
  } else {
    // optional: clicking while ball is moving could pause — uncomment if desired
    // ballMoving = false;
  }
}
