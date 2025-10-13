// p5.js sketch — with reset of TL/TR/BL when mouse nears bottom-right pair
let cnv;
const CANVAS_W = 1080;
const CANVAS_H = 720;
const BOX = 100;

// movement params (adjustable)
const ACTIVATION_RADIUS = 160; // how close mouse must be to activate a square
const MAX_MOVE = 80;           // maximum distance a square will shift toward mouse
const LERP_SPEED = 0.12;       // smoothing (0..1) higher = snappier

// squares store
let squares = {};

function setup() {
  cnv = createCanvas(CANVAS_W, CANVAS_H);
  centerCanvas();
  noStroke();

  // define original corner positions and mark permanent movers
  squares.TL = createSquare(0, 0, true);                     // permanent mover
  squares.TR = createSquare(width - BOX, 0, true);          // permanent mover
  squares.BL = createSquare(0, height - BOX, true);         // permanent mover

  // bottom-right pair:
  let brRightX = width - BOX;            // right-most box x
  let brLeftX = brRightX - BOX;          // left-of-pair x
  let brY = height - BOX;
  squares.BR_L = createSquare(brLeftX, brY, false); // transient mover (returns)
  squares.BR_R = createSquare(brRightX, brY, false); // treated as fixed below
  squares.BR_R.movable = false; // ensure BR_R never moves
}

function draw() {
  background(220);

  // BEFORE handling individuals, check if mouse is near bottom-right pair
  // If so, reset TL/TR/BL to their initial original corners
  let brLcenterX = squares.BR_L.initialOx + BOX / 2;
  let brLcenterY = squares.BR_L.initialOy + BOX / 2;
  let brRcenterX = squares.BR_R.initialOx + BOX / 2;
  let brRcenterY = squares.BR_R.initialOy + BOX / 2;
  let dToBRL = dist(mouseX, mouseY, brLcenterX, brLcenterY);
  let dToBRR = dist(mouseX, mouseY, brRcenterX, brRcenterY);

  if (dToBRL <= ACTIVATION_RADIUS || dToBRR <= ACTIVATION_RADIUS) {
    // Reset permanent movers (TL, TR, BL) to their initial origins
    [squares.TL, squares.TR, squares.BL].forEach(sq => {
      sq.ox = sq.initialOx;
      sq.oy = sq.initialOy;
      sq.movedPermanent = false;   // allow them to be re-activated later
      // also set their target to original so they smoothly return
      sq.targetX = sq.ox;
      sq.targetY = sq.oy;
    });
  }

  // Handle squares' logic
  handleSquare(squares.TL);
  handleSquare(squares.TR);
  handleSquare(squares.BL);
  handleSquare(squares.BR_R); // BR_R fixed
  handleSquare(squares.BR_L); // BR_L transient with overlap protection

  // Draw in an order so BR_R visually remains rightmost
  drawSquare(squares.TL, color(52, 152, 219));
  drawSquare(squares.TR, color(46, 204, 113));
  drawSquare(squares.BL, color(155, 89, 182));
  drawSquare(squares.BR_L, color("Pink"));
  drawSquare(squares.BR_R, color(231, 76, 60));
}

function createSquare(origX, origY, permanentMover) {
  return {
    // initial fixed corner (never changes) — used for resetting
    initialOx: origX,
    initialOy: origY,
    // current "origin" reference (may be moved permanently for permanent movers)
    ox: origX,
    oy: origY,
    x: origX,         // current draw x
    y: origY,         // current draw y
    targetX: origX,
    targetY: origY,
    movable: true,            // default; can be turned off (BR_R)
    permanent: !!permanentMover, // if true: once activated it stays at that displaced origin unless reset
    movedPermanent: false     // whether it already took a permanent move
  };
}

function handleSquare(sq) {
  // If this square is not movable at all, target stays original
  if (!sq.movable) {
    sq.targetX = sq.ox;
    sq.targetY = sq.oy;
  } else {
    // distance between mouse and the square's ORIGINAL corner center (initialOx,initialOy)
    let centerInitialX = sq.initialOx + BOX / 2;
    let centerInitialY = sq.initialOy + BOX / 2;
    let d = dist(mouseX, mouseY, centerInitialX, centerInitialY);

    if (sq.permanent) {
      // Permanent movers: when mouse comes near the ORIGINAL corner and they haven't
      // permanently moved yet, compute a displaced target and "lock" that new origin.
      if (d <= ACTIVATION_RADIUS && !sq.movedPermanent) {
        // direction from original center to mouse
        let dirX = (mouseX - centerInitialX);
        let dirY = (mouseY - centerInitialY);
        let mag = sqrt(dirX * dirX + dirY * dirY);
        if (mag > 0.0001) {
          dirX /= mag;
          dirY /= mag;
        }
        // calculate displaced target relative to ORIGINAL origin
        let newTargetX = sq.initialOx + dirX * MAX_MOVE;
        let newTargetY = sq.initialOy + dirY * MAX_MOVE;

        // set target and make displacement permanent by updating ox,oy
        sq.targetX = newTargetX;
        sq.targetY = newTargetY;
        sq.ox = newTargetX;
        sq.oy = newTargetY;
        sq.movedPermanent = true; // will stay until reset by BR proximity
      } else if (!sq.movedPermanent) {
        // not yet activated permanently -> keep target at initial
        sq.targetX = sq.initialOx;
        sq.targetY = sq.initialOy;
      } else {
        // already moved permanently -> keep target fixed at that new origin
        sq.targetX = sq.ox;
        sq.targetY = sq.oy;
      }
    } else {
      // transient movers (like BR_L): they move while mouse is close, and return when far
      if (d <= ACTIVATION_RADIUS) {
        let dirX = (mouseX - centerInitialX);
        let dirY = (mouseY - centerInitialY);
        let mag = sqrt(dirX * dirX + dirY * dirY);
        if (mag > 0.0001) {
          dirX /= mag;
          dirY /= mag;
        }
        sq.targetX = sq.initialOx + dirX * MAX_MOVE;
        sq.targetY = sq.initialOy + dirY * MAX_MOVE;
      } else {
        // return to original initial origin
        sq.targetX = sq.initialOx;
        sq.targetY = sq.initialOy;
      }
    }
  }

  // Special rule: BR_L must never overlap BR_R
  if (sq === squares.BR_L) {
    // rightmost allowed x for BR_L so its right edge <= BR_R left edge
    let maxAllowedX = squares.BR_R.initialOx - BOX;
    if (sq.targetX > maxAllowedX) {
      sq.targetX = maxAllowedX;
    }
  }

  // Smoothly move current position toward target
  sq.x = lerp(sq.x, sq.targetX, LERP_SPEED);
  sq.y = lerp(sq.y, sq.targetY, LERP_SPEED);
}

function drawSquare(sq, c) {
  fill(c);
  rect(sq.x, sq.y, BOX, BOX);
}

function windowResized() {
  centerCanvas();
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}
