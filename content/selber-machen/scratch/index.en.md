---
title: "Scratch - Your First Game!"
description: |
  **What is Scratch?**
  Scratch is a visual programming language developed especially for kids and beginners. Instead of typing complicated text commands, you drag colourful blocks together like puzzle pieces. These blocks contain different commands - some make characters move, others play sounds or react to key presses. Scratch makes programming as easy as snapping together building blocks and helps develop logical thinking while you create your own games, animations, and stories.
  **Game idea: Cat catches cheese**
  In this simple catching game, you control a cat that runs around and collects pieces of cheese. Each piece of cheese caught gives points. The game is controlled with the arrow keys and is perfect for Scratch beginners.
image: "chatgpt-image-26.-juli-2025-15_56_33.png"
slug: "scratch"
level: "einfach"
age: "9-11"
category: "code-coenner"
aliases:
  - "/ideen/scratch"
---

**What is Scratch?**
Scratch is a visual programming language developed especially for kids and beginners. Instead of typing complicated text commands, you drag colourful blocks together like puzzle pieces. These blocks contain different commands - some make characters move, others play sounds or react to key presses. Scratch makes programming as easy as snapping together building blocks and helps develop logical thinking while you create your own games, animations, and stories.
**Game idea: Cat catches cheese**
In this simple catching game, you control a cat that runs around and collects pieces of cheese. Each piece of cheese caught gives points. The game is controlled with the arrow keys and is perfect for Scratch beginners.

**Step 1:**

Open Scratch in your browser (scratch.mit.edu)
The cat (Sprite1) is already there - perfect for our game
Delete the white background and choose a nice background from the library (e.g. "Outdoors" or "Park")

**Step 2:**

Click "Choose a Sprite" (cat icon at the bottom right)
Search for "Cheese" or "Food" and choose a piece of cheese
The cheese should now appear next to the cat

**Step 3:**

- Click on the cat
- Drag these blocks together:
```
when green flag clicked
forever
if key [up arrow] pressed
change y by 10
if key [down arrow] pressed
change y by -10
if key [right arrow] pressed
change x by 10
if key [left arrow] pressed
change x by -10
```

**Step 4:**

- Click on the cheese
- Program it like this:
```
when green flag clicked
forever
go to x: [random number from -200 to 200] y: [random number from -150 to 150]
wait until <touching [Sprite1]?>
play sound [chomp]
change [Score] by 1
```

**Step 5:**

- Click "Variables" in the block list
- Click "Make a Variable" and name it "Score"
- At the very start of the cat's script, add:
```
when green flag clicked
set [Score] to 0
```

**Step 6:**

- Click the green flag
- Move the cat with the arrow keys
- Touch the cheese - it should disappear and reappear in a new spot
- The score should go up

**Step 7:**

**Bonus improvements:**
- Add a timer that ends the game after 60 seconds
- Make the cat say "Meow" when it catches cheese
- Create several pieces of cheese for more challenge
- Add obstacles that subtract points

Your game is now finished! You've learned how to move characters, detect collisions, and use variables - the basics behind almost every Scratch game.
