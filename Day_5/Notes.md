# Day 5 — Sprites in p5.js

## Topic 1: What are Sprites
- Sprites are **2D images or animations** used to represent characters, objects, or elements in a game or sketch.  
- They allow for **movement, animation, and interaction** in a canvas.  
- In p5.js, a sprite is typically created by **splitting a sprite sheet** (an image containing multiple frames) into individual frames.

---

## Topic 2: Loading and Splitting Sprite Sheets
- Use `loadImage()` to load a sprite sheet in the `preload()` function so it’s ready before the sketch starts.  
- To create animations, the sprite sheet is **divided into rows and columns**, corresponding to different frames.  
- **Steps learned:**  
  - Determine the number of rows and columns in the sprite sheet.  
  - Calculate width and height of each frame.  
  - Extract frames using `get()` and store them in a 2D array for easy access.

---

## Topic 3: Displaying Sprites
- Use the `image()` function to **display a specific frame** of the sprite at a position `(x, y)`.  
- To animate the sprite:  
  - Change the frame index over time (e.g., every few frames using `frameCount`).  
  - Loop through frames to create **smooth animation**.

---

## Topic 4: Sprite Animation with Keyboard
- Sprites can be animated **based on user input**, like arrow keys.  
- **Movement logic learned:**  
  - `UP_ARROW` → move sprite up and use the corresponding animation row.  
  - `DOWN_ARROW` → move sprite down and switch to down-row frames.  
  - `LEFT_ARROW` → move left and switch to left-row frames.  
  - `RIGHT_ARROW` → move right and switch to right-row frames.  
- By combining **row selection** and **frame counting**, sprites can face the correct direction while moving.

---

## Topic 5: Key Takeaways
- Sprites make **interactive and animated characters** possible in p5.js.  
- Splitting a sprite sheet into rows and columns is essential for frame-by-frame animation.  
- Keyboard input can control **sprite movement** and animation direction.  
- Frame-based animation and movement logic are combined for **smooth game-like motion**.  
- Using arrays to store frames keeps the code organized and efficient.
