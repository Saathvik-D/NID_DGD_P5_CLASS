class PaddlePlayer {
    constructor(x, y, w, h, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;
    }


    // draw (expects rectMode(CENTER))
    show() {
        rect(this.x, this.y, this.w, this.h);
    }


    // move up
    moveUp() {
        if (this.y > 90) {
            this.y -= this.speed;
        }
    }


    // move down
    moveDown() {
        if (this.y < 630) {
            this.y += this.speed;
        }



    }
}