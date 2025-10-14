# Class Notes – Day 1: Introduction to p5.js

## Date: 6-10-2-25
## Topic: Getting Started with p5.js

---

### **Introduction to p5.js**
- p5.js is a **JavaScript library** used for creative coding and interactive visuals.  
- A basic p5.js program consists of:
  - `setup()` → runs once at the beginning.  
  - `draw()` → runs repeatedly in a loop (for animation).
- I created a **500 × 500** canvas using `createCanvas(500, 500)` and set `frameRate(5)` to slow down the updates and make the animation more visible.

---

### **Variables and Randomization**
- Declared variables: `x, y, z, a, b, c, d, e, f, g`.
- Used:
  - `random(0,255)` → to generate **random RGB color values**.
  - `random(0,500)` → to generate **random positions** within the canvas.
- Random values made the shapes and colors change every frame, resulting in a **dynamic generative art** effect.

---

### **Drawing Shapes**
- Functions used:
  - `rect()` → for drawing rectangles.  
  - `triangle()` → for drawing triangles at random positions.  
- Used `fill()` to set colors dynamically and `noStroke()` to remove shape outlines.
- Built a **maze-like structure** with rectangles and added **random colored triangles** for a layered, abstract look.

---

### **Key Learnings**
- Basic p5.js structure: `setup()` and `draw()`.
- How to use `random()` for variation.
- Applying and changing colors with `fill()`.
- Drawing and layering shapes on the canvas.
- Real-time updates through the `draw()` loop.

---


