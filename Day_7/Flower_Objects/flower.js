class Flower {
    constructor(x, y, a, b, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.b = b;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.selected = false;
    }

    drawFlower() {

        ellipse(this.x, this.y, this.b, this.a);
        ellipse(this.x, this.y, this.a, this.b);
        ellipse(this.x, this.y, 20);
    }

    moveFlower() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x > width || this.x < 0) {
            this.xSpeed = -this.xSpeed;
        }
        if (this.y > height || this.y < 0) {
            this.ySpeed = -this.ySpeed;
        }
    }

    checkPosition(mX, mY) {
        let distance = dist(mX, mY, this.x, this.y);
        if (distance < 10) {
            this.selected = true;
            fill(255, 0, 0);
        } else {
            this.selected = false;
            fill(255);
        }
    }


}