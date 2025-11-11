class Ball {
  constructor(x, y, r, xs, ys) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xs = xs; // horizontal speed (can be negative)
    this.ys = ys; // vertical speed


    // config
    this.speedIncreaseOnHit = 1.05; // multiply xs magnitude by this on paddle hit
    this.maxSpeed = 18; // cap for |xs|


    // border thickness (top/bottom) - you'll set global borderThickness in sketch
    this.border = (typeof borderThickness !== 'undefined') ? borderThickness : 30;
  }


  show() {
    circle(this.x, this.y, this.r * 2);
  }


  update() {
    this.x += this.xs;
    this.y += this.ys;


    // Bounce off top and bottom walls (use border)
    if (this.y - this.r < this.border || this.y + this.r > height - this.border) {
      this.ys *= -1;
      // clamp inside so it doesn't get stuck
      this.y = constrain(this.y, this.border + this.r, height - this.border - this.r);
    }


    // NOTE: horizontal out-of-bounds handled in sketch.js for scoring
  }


  // paddle is expected to have x, y, w, h props (rectMode(CENTER))
  checkCollision(paddle) {
    // AABB collision (center-mode)
    const collided =
      this.x - this.r < paddle.x + paddle.w / 2 &&
      this.x + this.r > paddle.x - paddle.w / 2 &&
      this.y > paddle.y - paddle.h / 2 &&
      this.y < paddle.y + paddle.h / 2;


    if (!collided) return false;


    // Determine horizontal direction and reposition the ball outside the paddle
    if (this.xs < 0) {
      // ball was moving left -> it hit left-side paddle, push it just to right of paddle
      this.x = paddle.x + paddle.w / 2 + this.r + 0.1;
    } else {
      // ball was moving right -> it hit right-side paddle, push it to left of paddle
      this.x = paddle.x - paddle.w / 2 - this.r - 0.1;
    }


    // Flip horizontal direction & slightly increase speed magnitude
    const newMag = min(abs(this.xs) * this.speedIncreaseOnHit, this.maxSpeed);
    this.xs = (this.xs < 0) ? newMag : -newMag;


    // Compute where on the paddle the ball hit (-1 top ... 0 center ... +1 bottom)
    const relativeIntersectY = (this.y - paddle.y) / (paddle.h / 2);
    // Limit to [-1, 1]
    const bounded = constrain(relativeIntersectY, -1, 1);


    // Map hit position to vertical speed: the farther from center, the larger the vertical component
    const angleStrength = 7; // tweak: higher => more vertical deflection
    this.ys = bounded * angleStrength;


    // Very small correction to avoid nearly-zero horizontal speed
    if (abs(this.xs) < 0.5) {
      this.xs = (this.xs < 0) ? -0.5 : 0.5;
    }


    return true;
  }


  reset(direction = 0) {
    // direction: 0 = random, +1 = to right, -1 = to left
    this.x = width / 2;
    this.y = random(this.border + this.r + 10, height - this.border - this.r - 10);


    // choose horizontal direction
    const baseSpeed = 4;
    if (direction === 0) {
    }
  }
}