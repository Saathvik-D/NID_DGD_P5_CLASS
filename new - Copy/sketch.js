// sketch.js  -- AI vs AI with randomness + heavy Gaussian blur overlay
// Requires: Ball.js, PaddleAi.js (PaddleAi should have smoothFollow / smoothFollowWithError / clamp)

let paddleW = 30;
let paddleH = 120;
let paddleSpeed = 7;
let borderThickness = paddleW; // top/bottom bar thickness; Ball will use this global

let leftPaddle, rightPaddle, ball;
let leftScore = 0;
let rightScore = 0;

// per-paddle reaction timers & randomness state
const paddleState = {
  left: { lastUpdate: 0, reactionInterval: 0, noiseSeed: 0 },
  right: { lastUpdate: 0, reactionInterval: 0, noiseSeed: 0 }
};

// blur settings
let blurEnabled = true;
let blurAmount = 18;         // larger => stronger blur (try 8..30). This uses p5.Image filter(BLUR, n)
let blurOverlayAlpha = 200;  // 0..255 alpha of the blurred overlay (higher => more opaque)

function setup() {
  createCanvas(1080, 720);
  rectMode(CENTER);
  noStroke();
  textFont('sans-serif');

  // left and right paddles (both AI)
  leftPaddle  = new PaddleAi(paddleW + 10, height / 2, paddleW, paddleH, paddleSpeed);
  rightPaddle = new PaddleAi(width - paddleW - 10, height / 2, paddleW, paddleH, paddleSpeed);

  // configure different params so they don't mirror each other
  if (leftPaddle.params) {
    leftPaddle.params = {
      mode: 'p',
      lerpAmt: 0.12,
      pGain: 0.085,
      maxStep: 10,
      deadzone: 6,
      framerateIndependent: true
    };
  }
  if (rightPaddle.params) {
    rightPaddle.params = {
      mode: 'p',
      lerpAmt: 0.12,
      pGain: 0.11,
      maxStep: 13,
      deadzone: 7,
      framerateIndependent: true
    };
  }

  // initialize reaction intervals (ms) randomly within a small range
  paddleState.left.reactionInterval  = random(40, 100); // 40-100 ms
  paddleState.right.reactionInterval = random(50, 120);

  // seeds for Perlin/noise offsets (so noise is smooth)
  paddleState.left.noiseSeed  = random(1000);
  paddleState.right.noiseSeed = random(2000);

  // Ball: start moving
  ball = new Ball(width / 2, height / 2, 15, 4, random(-2, 2));
  ball.border = borderThickness;
}

function draw() {
  background(255);

  // DRAW GAME SCENE (paddles, ball, lines, scores)
  drawScene();

  // Apply heavy blur overlay on top if enabled.
  // We capture the current canvas, blur that image and draw it semi-transparently over the frame.
  if (blurEnabled) {
    applyHeavyBlurOverlay();
  }

  // Debug / instructions
  drawUI();
}

function drawScene() {
  // top and bottom bars
  fill(0);
  rect(width / 2, borderThickness / 2, width, borderThickness);
  rect(width / 2, height - borderThickness / 2, width, borderThickness);

  // center dashed line
  stroke(0);
  strokeWeight(2);
  for (let y = borderThickness + 20; y < height - borderThickness - 20; y += 30) {
    line(width / 2, y, width / 2, y + 12);
  }
  noStroke();

  // draw paddles
  fill(0);
  leftPaddle.show();
  rightPaddle.show();

  // Update ball
  ball.show();
  ball.update();

  // collisions
  ball.checkCollision(leftPaddle);
  ball.checkCollision(rightPaddle);

  // scoring & reset when out
  if (ball.x - ball.r < 0) {
    rightScore++;
    ball.reset(+1);
    ball.ys = random(-2.5, 2.5);
  } else if (ball.x + ball.r > width) {
    leftScore++;
    ball.reset(-1);
    ball.ys = random(-2.5, 2.5);
  }

  // AI updates with randomness (call per paddle)
  aiUpdateWithRandomness('left', leftPaddle);
  aiUpdateWithRandomness('right', rightPaddle);

  // draw scores (centered vertically)
  fill(0);
  textSize(120);
  textAlign(CENTER, CENTER);
  text(leftScore, width * 0.25, height / 2);
  text(rightScore, width * 0.75, height / 2);
}

function drawUI() {
  textSize(14);
  textAlign(LEFT, TOP);
  fill(0);
  text('AI vs AI (with randomness). Press B to toggle blur. Press R to reset scores.', 10, 10);
}

// Capture the canvas, apply strong p5 blur, and overlay it semi-transparently
function applyHeavyBlurOverlay() {
  // capture current canvas as p5.Image
  const img = get(); // full canvas capture
  // apply p5 filter BLUR (Gaussian-like). This mutates the image.
  // filter(BLUR, amount) accepts small integers; higher amounts increase blur effect.
  img.filter(BLUR, blurAmount);

  // draw the blurred image on top with alpha to create frosted overlay
  push();
  tint(255, blurOverlayAlpha); // control overlay opacity
  image(img, 0, 0);
  noTint();
  pop();
}

// aiUpdateWithRandomness: updates a paddle with independent randomness & reaction delay
function aiUpdateWithRandomness(side, paddle) {
  const state = paddleState[side];

  // only update when reactionInterval ms has passed since last update
  const now = millis();
  if (now - state.lastUpdate < state.reactionInterval) {
    // still waiting — do nothing (but clamp to ensure it's on screen)
    if (typeof paddle.clamp === 'function') paddle.clamp();
    return;
  }
  state.lastUpdate = now;

  // add small jitter to reactionInterval so it's not constant
  state.reactionInterval = random(40, 140);

  // Predictive offset: predict where ball will be a little in future
  // Use different prediction strength per paddle so they don't mirror each other
  const predictFactor = (side === 'left') ? 4.5 : 7.5; // right predicts more
  let predictedY = ball.y + (ball.ys * predictFactor);

  // Add smooth noise using Perlin noise for natural movement
  const t = millis() * 0.001;
  const noiseAmt = (side === 'left') ? 8 : 14; // left quieter, right noisier
  const noiseSeed = state.noiseSeed;
  const perlin = (noise(noiseSeed + t) - 0.5) * 2; // -1..1
  predictedY += perlin * noiseAmt;

  // Occasional miss: small chance to bias target away from actual position
  if (random() < 0.015) { // 1.5% chance each update
    predictedY += random(-60, 60); // bias target up/down
  }

  // Slight independent offset so left/right don't mirror
  predictedY += (side === 'left') ? random(-6, 6) : random(-12, 12);

  // Now use paddle's smoothFollow (if available) or fallback
  if (typeof paddle.smoothFollowWithError === 'function') {
    paddle.smoothFollowWithError(predictedY, 0.02, (side === 'left') ? 18 : 26);
  } else if (typeof paddle.smoothFollow === 'function') {
    paddle.smoothFollow(predictedY);
  } else if (typeof paddle.autoMoveTowards === 'function') {
    paddle.autoMoveTowards(predictedY, 8);
  } else {
    const diff = predictedY - paddle.y;
    const step = constrain(diff * 0.09, -12, 12);
    paddle.y += step;
    if (typeof paddle.clamp === 'function') paddle.clamp();
  }
}

// keyboard controls: B toggles blur, R resets scores
function keyPressed() {
  if (key === 'b' || key === 'B') {
    blurEnabled = !blurEnabled;
  } else if (key === 'r' || key === 'R') {
    leftScore = 0;
    rightScore = 0;
  }
}
