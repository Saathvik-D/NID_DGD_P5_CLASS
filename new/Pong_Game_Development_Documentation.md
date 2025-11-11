# Pong Game Development Documentation

## Introduction

This project focuses on creating a **Pong Game** — a digital version of one of the earliest arcade games.  
The game is designed using **JavaScript (p5.js)**, which allows real-time interaction and easy rendering of graphical elements.

However, this version of Pong is more than just a classic recreation.  
It integrates the **philosophical concept of “Voluntarism”**, where gameplay and design reflect the idea that **willpower dominates logical reasoning**.

---

## Objective

The main objective of this project was to:
- Understand and implement **game physics** (ball movement, collision detection, and rebound logic).  
- Create **AI-controlled paddles** that can react dynamically to the ball’s movement.  
- Add **philosophical and psychological depth** by integrating the idea of **Voluntarism** through game design.  
- Explore how **AI assistance** can enhance logic building while ensuring independent coding and creativity.

---

## Tools and Technologies Used

| Tool | Purpose |
|------|----------|
| **p5.js** | For rendering graphics and game logic |
| **HTML / CSS** | To host and style the game environment |
| **JavaScript (ES6)** | To write the main logic (ball, paddles, collisions, AI) |
| **Visual Studio Code** | As the main development environment |
| **ChatGPT (AI Assistant)** | Used for logic refinement, optimization suggestions, and bug analysis |

---

## Development Process

### Step 1: Game Setup
- Created a 1080×720 canvas using p5.js.
- Set up core variables for ball, paddles, and boundaries.
- Implemented `rectMode(CENTER)` to simplify paddle and wall positioning.

### Step 2: Ball Mechanics
- Developed the `Ball` class with:
  - Position (`x`, `y`)
  - Velocity (`xs`, `ys`)
  - Radius (`r`)
- Added `update()` for movement and `checkCollision()` for bouncing against paddles.
- Implemented a `reset()` function to restart gameplay after scoring.

### Step 3: Paddle Design
- Created two separate paddle classes:
  - `PaddlePlayer` (for manual or philosophical control)
  - `PaddleAi` (for autonomous, AI-based paddle movement)
- Used **smooth follow logic** for AI paddles with adjustable reaction speed and noise for human-like imperfection.

### Step 4: AI Implementation
- The AI follows the ball using a **proportional control (P-controller)** approach.  
- Added **randomness**, **prediction**, and **reaction delays** so the paddles are never perfectly parallel.
- This randomness simulates **individual willpower**, aligning with the concept of **Voluntarism** — the AI behaves based on internal drive, not pure logic.

### Step 5: Testing and Optimization
- Tuned AI reaction intervals and ball speeds for balanced gameplay.
- Prevented “sticking” issues by adjusting collision repositioning logic.
- Reduced frame lag from heavy blur by optimizing the draw cycle.

---

## Problems Faced and Solutions

| Problem | Description | Solution |
|----------|--------------|-----------|
| **Ball Sticking to Paddles** | The ball would sometimes overlap and get stuck during collisions. | Repositioned the ball slightly outside the paddle after each collision. |
| **AI Paddles Too Synchronized** | Both AI paddles mirrored each other perfectly. | Introduced randomness using Perlin noise and separate prediction factors. |
| **Performance Drop from Blur** | High blur values caused FPS drops. | Optimized by limiting blur updates and reducing filter calls. |
| **Illogical Controls for Voluntarism Concept** | Needed a gameplay mechanic that reflected willpower over logic. | Reversed player controls — pressing right moves left and vice versa. |
| **AI Behavior Too Robotic** | AI responded too perfectly. | Added random delays and errors to simulate human-like reactions. |

---

## Role of AI in the Project

AI (ChatGPT) was used as a **logic assistant**, not as a code generator.

- It helped **explain complex mechanics** such as proportional control and collision response.
- It suggested ways to **avoid duplication**, **optimize loops**, and **implement randomness** effectively.
- It assisted in **debugging errors** and **refactoring code structure** for modular clarity.
- All core code (ball physics, paddle movement, scoring logic, and rendering) was **written and tested manually** by me.

This process reflects **Voluntarism** itself — using logic as guidance but depending on personal willpower and creativity to bring the idea to life.

---
