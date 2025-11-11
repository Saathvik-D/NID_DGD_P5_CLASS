class PaddlePlayer {
  constructor(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;

    // Horizontal limits (tweak)
    this.minX = this.w/2 + 10;
    this.maxX = width * 0.35;

    // ensure initial pos is valid
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
    // respect top/bottom borders (fall back to 0 if undefined)
    const border = (typeof borderThickness !== 'undefined') ? borderThickness : 0;
    const halfH = this.h / 2;
    const halfW = this.w / 2;

    // vertical limits
    this.y = constrain(this.y, border + halfH, height - border - halfH);

    // horizontal limits
    this.x = constrain(this.x, this.minX + halfW, this.maxX - halfW);
  }

  handleInput() {
    // vertical
    if (keyIsDown(UP_ARROW)) this.moveUp();
    if (keyIsDown(DOWN_ARROW)) this.moveDown();

    // horizontal (optional) - arrow keys or A/D
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.moveLeft();   // LEFT or 'A'
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.moveRight(); // RIGHT or 'D'
  }
}
