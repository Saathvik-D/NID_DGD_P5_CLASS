
class PaddleAi {

    constructor(x, y, w, h, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;

        // tuning / difficulty settings (tweak these)
        this.params = {
            // choose one: 'lerp' or 'p' for proportional control
            mode: 'p',        // 'lerp' or 'p'
            lerpAmt: 0.12,    // used when mode='lerp' (0.02 - 0.25)
            pGain: 0.09,      // used when mode='p' (0.04 - 0.16)
            maxStep: 12,      // max pixels per frame the paddle can move
            deadzone: 8,      // do nothing if within this many pixels
            framerateIndependent: true // multiplies moves by deltaTime factor
        };
    }

    show() {
        rect(this.x, this.y, this.w, this.h);
    }

    moveUp() { this.y -= this.speed; this.clamp(); }
    moveDown() { this.y += this.speed; this.clamp(); }
    clamp() {
        const half = this.h / 2;
        this.y = constrain(this.y, half, height - half);
    }

    // Smooth AI movement towards targetY (the ball's y)
    // use in draw(): aiPaddle.smoothFollow(ball.y);
    smoothFollow(targetY) {
        const diff = targetY - this.y;
        if (abs(diff) <= this.params.deadzone) return; // inside deadzone -> no move

        // deltaTime factor for framerate independence (approx scale)
        const dtFactor = (this.params.framerateIndependent) ? (deltaTime / 16.6667) : 1;

        if (this.params.mode === 'lerp') {
            // LERP method: very smooth, may feel 'floaty'
            const amt = this.params.lerpAmt * dtFactor;
            this.y = lerp(this.y, targetY, amt);
        } else {
            // Proportional control (P-controller) + max step limiter
            let step = diff * this.params.pGain * dtFactor;
            // clamp step to maxStep so it never jumps too far in one frame
            step = constrain(step, -this.params.maxStep, this.params.maxStep);
            this.y += step;
        }

        this.clamp();
    }

    // Optional: add small randomness so AI can miss sometimes
    smoothFollowWithError(targetY, missChance = 0.02, maxError = 25) {
        // occasionally add an offset to targetY so AI is imperfect
        if (random() < missChance) {
            targetY += random(-maxError, maxError);
        }
        this.smoothFollow(targetY);
    }
}
