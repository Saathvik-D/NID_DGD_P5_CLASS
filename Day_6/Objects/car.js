class Car {
    constructor(x, y, z,speed) {
        this.x = x;
        this.y = y;
        this.size = z;
        this.speed=speed;
    }

    show() {
        ellipse(this.x+10, this.y+25, 20)
        ellipse(this.x+this.size-10, this.y+25, 20)
        rect(this.x, this.y, this.size,20);
        
    }


    move(){
        this.x = this.x+this.speed;
        if(this.x>width){
            this.x=-this.size
        }
    }


}