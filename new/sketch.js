let paddleW = 30;
let paddleH = 120;
let paddleSpeed = 7;
let borderThickness = paddleW;

let playerPaddle, aiPaddle, ball;
let leftScore = 0;
let rightScore = 0;

let ballMoving = false;

// ---- New serve / AFK state ----
let hasServedOnce = false;
let nextServeDir = 0;        // -1 left, +1 right, 0 random
let lastResetMs = 0;
let serveDelayMs = 900;      // delay before auto-serve after a point

// ---- Player AFK auto-play ----
const AFK_MS = 4000;        // 4 seconds
let anyInputThisFrame = false;

// ---- Bonus point squares ----
let bonuses = [];
let nextBonusSpawnMs = 0;
const BONUS_MIN_INTERVAL = 1500; // between spawns
const BONUS_MAX_INTERVAL = 3000;
const BONUS_SIZE = 26;
const BONUS_LIFETIME = 6000; // ms
const BONUS_VALUES = [1, 2, 3];

function setup() {
  createCanvas(1080, 720);
  rectMode(CENTER);
  noStroke();

  // Left player paddle (player)
  playerPaddle = new PaddlePlayer(paddleW + 10, height / 2, paddleW, paddleH, paddleSpeed);

  // Right paddle (AI)
  aiPaddle = new PaddleAi(width - paddleW - 10, height / 2, paddleW, paddleH, paddleSpeed);

  // Ball in center but stationary until click (first time only)
  ball = new Ball(width / 2, height / 2, 15, 0, 0);
  ball.reset(0);
  ball.xs = 0;
  ball.ys = 0;
  ballMoving = false;

  // Init bonus spawn schedule
  scheduleNextBonus();
}

function draw() {
  background(255);

  // draw scores (faint background)
  fill(0, 0, 0, 20);
  textSize(200);
  textAlign(CENTER, CENTER);
  text(leftScore, width * 0.25, height / 2);
  text(rightScore, width * 0.75, height / 2);

  // top and bottom bars
  fill(0);
  rect(width / 2, borderThickness / 2, width, borderThickness);
  rect(width / 2, height - borderThickness / 2, width, borderThickness);

  // messages
  textAlign(CENTER, CENTER);
  textSize(20);
  if (!hasServedOnce) {
    fill(255); // white text for first start message
    text("Click anywhere to serve", width / 2, 22);
  } else if (!ballMoving) {
    fill(255);
    text("Get ready...", width / 2, 22);
  }

  // center line (dashed)
  stroke(0);
  strokeWeight(2);
  for (let y = borderThickness + 20; y < height - borderThickness - 20; y += 30) {
    line(width / 2, y, width / 2, y + 12);
  }
  noStroke();

  // --- INPUT / AUTOPILOT handling ---
  anyInputThisFrame = false;
  playerPaddle.handleInput();

  // If no input for AFK_MS, autopilot; else manual
  const now = millis();
  if (!playerPaddle.autopilot && now - playerPaddle.lastInputMs >= AFK_MS) {
    playerPaddle.autopilot = true;
  }
  if (playerPaddle.autopilot) {
    // Small imperfection so it's not perfect
    playerPaddle.smoothFollowWithError(ball.y, 0.03, 26);
  }

  // draw paddles
  fill(0);
  playerPaddle.show();
  aiPaddle.show();

  // AI automatic movement
  aiPaddle.smoothFollowWithError(ball.y, 0.01, 30);

  // --- Bonuses spawn/update/draw ---
  updateBonuses(now);
  drawBonuses();

  // always draw the ball so user can see it
  ball.show();

  // auto-serve after point (only after first serve)
  if (!ballMoving && hasServedOnce && now - lastResetMs >= serveDelayMs) {
    serveBall(nextServeDir);
  }

  // only update & process collisions/scoring if the ball has been served
  if (ballMoving) {
    ball.update();

    // collisions with paddles
    if (ball.checkCollision(playerPaddle)) {
      // optional: nudge player toward manual if they just hit while AFK
    }
    ball.checkCollision(aiPaddle);

    // scoring: if ball goes out horizontally, award point and reset (auto serve later)
    if (ball.x - ball.r < 0) {
      // right player scores
      rightScore++;
      prepareReset(+1);   // next serve direction suggestion (to the right)
    } else if (ball.x + ball.r > width) {
      leftScore++;
      prepareReset(-1);   // next serve direction suggestion (to the left)
    }
  }
}

function mousePressed() {
  // First serve requires click; afterwards, ignore (auto-serve handles it)
  if (!ballMoving && !hasServedOnce) {
    serveBall(0); // random first serve direction
    hasServedOnce = true;
  }
}

// Utility: serve with direction (0 random)
function serveBall(dir = 0) {
  if (ballMoving) return;
  const chosenDir = dir === 0 ? (random() < 0.5 ? -1 : 1) : dir;
  const baseSpeed = 4.2;
  ball.xs = baseSpeed * chosenDir;
  ball.ys = random(-2.7, 2.7);
  ballMoving = true;
}

// After a point, stop ball and schedule an auto-serve
function prepareReset(dirHint = 0) {
  ball.reset(dirHint);
  ball.xs = 0;
  ball.ys = 0;
  ballMoving = false;
  lastResetMs = millis();
  nextServeDir = dirHint === 0 ? (random() < 0.5 ? -1 : 1) : dirHint;
}

/* -------------------------
   PaddlePlayer (manual + autopilot)
   ------------------------- */
class PaddlePlayer {
  constructor(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;

    // Horizontal limits (player zone)
    this.minX = this.w / 2 + 10;
    this.maxX = width * 0.35;

    // autopilot + timing
    this.autopilot = false;
    this.lastInputMs = millis();

    // Smooth follow params (like AI)
    this.params = {
      mode: 'p',        // 'lerp' or 'p'
      lerpAmt: 0.12,
      pGain: 0.1,
      maxStep: 12,
      deadzone: 8,
      framerateIndependent: true
    };

    this.clamp();
  }

  show() {
    rect(this.x, this.y, this.w, this.h);
  }

  moveUp() {
    this.y -= this.speed;
    this.clamp();
  }

  moveDown() {
    this.y += this.speed;
    this.clamp();
  }

  moveLeft() {
    this.x -= this.speed;
    this.clamp();
  }

  moveRight() {
    this.x += this.speed;
    this.clamp();
  }

  clamp() {
    const border = (typeof borderThickness !== 'undefined') ? borderThickness : 0;
    const halfH = this.h / 2;
    const halfW = this.w / 2;

    // vertical limits
    this.y = constrain(this.y, border + halfH, height - border - halfH);

    // horizontal limits
    this.x = constrain(this.x, this.minX + halfW, this.maxX - halfW);
  }

  handleInput() {
    let used = false;

    // vertical
    if (keyIsDown(UP_ARROW)) { this.moveUp(); used = true; }
    if (keyIsDown(DOWN_ARROW)) { this.moveDown(); used = true; }

    // horizontal (arrow keys or A/D)
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { this.moveLeft(); used = true; }   // LEFT or 'A'
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { this.moveRight(); used = true; } // RIGHT or 'D'

    if (used) {
      this.autopilot = false;                 // user took control
      this.lastInputMs = millis();
      anyInputThisFrame = true;
    }
  }

  smoothFollow(targetY) {
    if (typeof targetY !== 'number') return;
    const diff = targetY - this.y;
    if (abs(diff) <= this.params.deadzone) return;

    const dtFactor = (this.params.framerateIndependent) ? (deltaTime / 16.6667) : 1;

    if (this.params.mode === 'lerp') {
      const amt = constrain(this.params.lerpAmt * dtFactor, 0, 1);
      this.y = lerp(this.y, targetY, amt);
    } else {
      let step = diff * this.params.pGain * dtFactor;
      const maxStepScaled = this.params.maxStep * Math.max(1, dtFactor);
      step = constrain(step, -maxStepScaled, maxStepScaled);
      if (this.speed) step = constrain(step, -this.speed, this.speed);
      this.y += step;
    }

    this.clamp();
  }

  smoothFollowWithError(targetY, missChance = 0.02, maxError = 25) {
    if (typeof targetY !== 'number') return;
    if (random() < missChance) {
      targetY += random(-maxError, maxError);
    }
    this.smoothFollow(targetY);
  }
}

/* -------------------------
   PaddleAi (keeps your original behavior)
   ------------------------- */
class PaddleAi {
  constructor(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;

    // tuning / difficulty settings (tweak these)
    this.params = {
      mode: 'p',        // 'lerp' or 'p'
      lerpAmt: 0.12,
      pGain: 0.09,
      maxStep: 12,
      deadzone: 8,
      framerateIndependent: true
    };
  }

  show() {
    rect(this.x, this.y, this.w, this.h);
  }

  moveUp() { this.y -= this.speed; this.clamp(); }
  moveDown() { this.y += this.speed; this.clamp(); }

  clamp() {
    const half = this.h / 2;
    const topBorder = (typeof borderThickness !== 'undefined') ? borderThickness : 0;
    const bottomLimit = height - topBorder;
    this.y = constrain(this.y, topBorder + half, bottomLimit - half);
  }

  smoothFollow(targetY) {
    if (typeof targetY !== 'number') return;
    const diff = targetY - this.y;
    if (abs(diff) <= this.params.deadzone) return;

    const dtFactor = (this.params.framerateIndependent) ? (deltaTime / 16.6667) : 1;

    if (this.params.mode === 'lerp') {
      const amt = constrain(this.params.lerpAmt * dtFactor, 0, 1);
      this.y = lerp(this.y, targetY, amt);
    } else {
      let step = diff * this.params.pGain * dtFactor;
      const maxStepScaled = this.params.maxStep * Math.max(1, dtFactor);
      step = constrain(step, -maxStepScaled, maxStepScaled);
      if (this.speed) step = constrain(step, -this.speed, this.speed);
      this.y += step;
    }

    this.clamp();
  }

  smoothFollowWithError(targetY, missChance = 0.02, maxError = 25) {
    if (typeof targetY !== 'number') return;
    if (random() < missChance) {
      targetY += random(-maxError, maxError);
    }
    this.smoothFollow(targetY);
  }
}

/* -------------------------
   Ball class (collision, bounce, reset)
   ------------------------- */
class Ball {
  constructor(x, y, r, xs, ys) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xs = xs;
    this.ys = ys;

    // config
    this.speedIncreaseOnHit = 1.05;
    this.maxSpeed = 18;
    this.minHorizontalSpeed = 0.5;

    // border thickness (top/bottom)
    this.border = (typeof borderThickness !== 'undefined') ? borderThickness : 30;
  }

  show() {
    fill(0); // black ball
    circle(this.x, this.y, this.r * 2);
  }

  update() {
    this.x += this.xs;
    this.y += this.ys;

    // Bounce off top and bottom walls (use border)
    if (this.y - this.r < this.border || this.y + this.r > height - this.border) {
      this.ys *= -1;
      this.y = constrain(this.y, this.border + this.r, height - this.border - this.r);
    }
  }

  // paddle expected to have x, y, w, h
  checkCollision(paddle) {
    const collided =
      this.x - this.r < paddle.x + paddle.w / 2 &&
      this.x + this.r > paddle.x - paddle.w / 2 &&
      this.y > paddle.y - paddle.h / 2 &&
      this.y < paddle.y + paddle.h / 2;

    if (!collided) return false;

    // position correction based on incoming xs
    if (this.xs < 0) {
      // moving left, hit left paddle -> push to right
      this.x = paddle.x + paddle.w / 2 + this.r + 0.1;
    } else {
      // moving right, hit right paddle -> push to left
      this.x = paddle.x - paddle.w / 2 - this.r - 0.1;
    }

    // Flip horizontal direction & slightly increase speed magnitude
    const newMag = min(abs(this.xs) * this.speedIncreaseOnHit, this.maxSpeed);
    this.xs = (this.xs < 0) ? newMag : -newMag;

    // Compute where on the paddle the ball hit (-1 top ... +1 bottom)
    const relativeIntersectY = (this.y - paddle.y) / (paddle.h / 2);
    const bounded = constrain(relativeIntersectY, -1, 1);

    // Map hit position to vertical speed
    const angleStrength = 7;
    this.ys = bounded * angleStrength;

    // Ensure not nearly-zero horizontal speed
    if (abs(this.xs) < this.minHorizontalSpeed) {
      this.xs = (this.xs < 0) ? -this.minHorizontalSpeed : this.minHorizontalSpeed;
    }

    return true;
  }

  reset(direction = 0) {
    // direction: 0 = (unused here), +1 = to right, -1 = to left (stored but not used directly)
    this.x = width / 2;
    this.y = random(this.border + this.r + 10, height - this.border - this.r - 10);
    this.xs = 0;
    this.ys = 0;
    this.lastDirection = direction;
  }
}

/* -------------------------
   Bonus point squares
   ------------------------- */

function scheduleNextBonus() {
  nextBonusSpawnMs = millis() + random(BONUS_MIN_INTERVAL, BONUS_MAX_INTERVAL);
}

function spawnBonus() {
  // Spawn inside player's horizontal zone
  const half = BONUS_SIZE / 2;
  const minX = playerPaddle.minX + half;
  const maxX = playerPaddle.maxX - half;

  const border = borderThickness;
  const minY = border + half;
  const maxY = height - border - half;

  const b = {
    x: random(minX, maxX),
    y: random(minY, maxY),
    s: BONUS_SIZE,
    value: random(BONUS_VALUES),
    born: millis(),
    expires: millis() + BONUS_LIFETIME
  };
  bonuses.push(b);
}

function updateBonuses(now) {
  // Spawn timing (only when ball is moving, to reduce clutter while paused)
  if (now >= nextBonusSpawnMs && ballMoving) {
    // limit total simultaneous bonuses
    if (bonuses.length < 4) {
      spawnBonus();
    }
    scheduleNextBonus();
  }

  // Remove expired
  bonuses = bonuses.filter(b => now < b.expires);

  // Check collection: paddle overlaps square
  for (let i = bonuses.length - 1; i >= 0; i--) {
    const b = bonuses[i];
    if (rectOverRect(playerPaddle.x, playerPaddle.y, playerPaddle.w, playerPaddle.h, b.x, b.y, b.s, b.s)) {
      leftScore += b.value;
      bonuses.splice(i, 1);
    }
  }
}

function drawBonuses() {
  for (const b of bonuses) {
    // body
    fill(0);
    rect(b.x, b.y, b.s, b.s);

    // label
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    text("+" + b.value, b.x, b.y);
  }
}

// axis-aligned rectangle overlap helper
function rectOverRect(cx1, cy1, w1, h1, cx2, cy2, w2, h2) {
  return (
    abs(cx1 - cx2) * 2 < (w1 + w2) &&
    abs(cy1 - cy2) * 2 < (h1 + h2)
  );
}
