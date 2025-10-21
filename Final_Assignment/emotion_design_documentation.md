# Emotion Design Documentation

## Emotion plays you
I have a thought — what runs a person, what makes a human a human?
What are the terms that depend on a human? It can be her or him.
It’s all about emotions.
If I, as a designer, am able to control their emotions, I can make them feel what I want them to experience.
And for this, I shall become someone who understands how things work in a human.

---

## My First Idea
I came up with a thought about where I can show **family, friends, career,** and **lover** — because they are important for a person.
But when I made this, I realized it’s more personal to me.
For example, love can mean anything to anyone — like, for some people, their family is their love.

### Feedback Reflection
I received feedback saying that my idea of showing *family, friends, career,* and *lover* gives a complete and emotional picture of what shapes a person’s life. The concept feels relatable and meaningful, but I was advised to explore how these four elements connect or conflict with each other.

It was also suggested that I maintain a visual balance so that one doesn’t overpower the others, unless that imbalance is intentional. I can use colors or symbols to express the emotions linked to each — like warmth for family, energy for career, calmness for love, and vibrance for friends.

The feedback also made me realize that even though the idea feels very personal, that’s actually a strength — it shows authenticity. I should reflect on how these meanings change for different people and create a smooth emotional transition between them to give the design more flow and depth.


![image](img\Screenshot 2025-10-17 095221.png)

---

## My Second Idea
After I got feedback for my previous ideation, I realized I needed to try something different. I thought about how we have six main emotions — **happiness, sadness, fear, anger, surprise,** and **disgust.** I wanted to play with them.

My idea is to create six different scales, one for each emotion, ranging from 0 to 10. Each emotion will be assigned a piano chord that represents it. Then, based on the input given by the user, I will play a piece of music that merges all these emotions together. It’s like we’ll be able to listen to our emotions through sound.

### Feedback Reflection
The feedback I received for this idea was very encouraging. It was appreciated that I tried to move from a personal emotional concept to something more interactive and universal. The idea of translating emotions into sound was seen as a creative and sensory approach — something that allows users to experience their emotions in a new form.

However, I was also advised to think about how each emotion connects musically — for example, how different chords, tones, or tempos can truly represent happiness, sadness, or fear. It was suggested that I experiment with sound intensity and harmony to create smoother transitions between emotions instead of treating them separately.

I was also told to focus on user experience — how users will input their emotions, how the system interprets them, and how the final music piece reflects their emotional state. The overall feedback helped me see that the idea has strong potential if I can balance the technical and emotional sides carefully.


## My 3rd Idea

## What I Did
- Created an **interactive animation** where a circle moves smoothly following the mouse cursor.  
- Divided the canvas into multiple **emotion zones** — each representing a different mood such as *Happy, Sad, Angry, Surprised, Calm,* and *Excited*.  
- Each emotion zone had a **different easing value**, controlling how fast or slow the circle follows the cursor.  
- Used **arrays** to store both the emotions and their respective easing values.  
- Implemented a **dynamic background** using colored rectangles for each emotion zone.  
- Used text to display the emotion names, creating a **visual mapping** between motion and feelings.

---

## What I Learned
- How to use **arrays** in p5.js to store and access multiple related values.  
- The concept of **easing** — making movement smoother by incrementally closing the gap between current and target positions.  
- How to use `mouseX` and `mouseY` values dynamically to make objects respond to user interaction.  
- Learned how to use `constrain()` to limit values within a specific range (important for avoiding errors when the mouse goes out of bounds).  
- How to create **zone-based interactivity** using grid-like divisions on the canvas.  
- Understood how different easing values change the **feel and speed** of the animation — linking code logic with emotional expression.

---

## Key Syntax Used
- **Array declaration:**  
  `let emotions = ['Happy', 'Sad', 'Angry', 'Surprised', 'Calm', 'Excited'];`  
  `let easings = [0.2, 0.05, 0.1, 0.15, 0.03, 0.25];`

- **Easing formula:**  
  `x += (targetX - x) * easing;`  
  `y += (targetY - y) * easing;`

- **Constrain function:**  
  `zone = constrain(zone, 0, emotions.length - 1);`

- **Zone calculation:**  
  `let boxWidth = width / emotions.length;`  
  `let zone = floor(mouseX / boxWidth);`

---

## Challenges I Faced
- Understanding how **easing values** affect motion — it took experimentation to get the right speed for each emotion.  
- Managing **zones and boundaries** — initially, the program would break or behave unexpectedly when the mouse moved outside the canvas.  
- Coordinating between arrays (`emotions` and `easings`) to make sure they matched correctly.  
- Getting smooth transitions between zones without visual jumps or flickers.  
- Balancing **visual clarity** (colors and text) so that the interface was both functional and aesthetic.

---

## Overall Reflection
This exercise helped me connect **programming logic with expressive design.**  
By assigning motion characteristics (easing) to emotions, I learned how code can represent **abstract feelings** through interaction and movement.  
It was a fun and challenging way to explore **creative coding and user interactivity** in p5.js.
