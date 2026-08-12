---
title: "Swift Playgrounds: Your First App!"
description: "Develop your first iOS app with Swift Playgrounds on the iPad! Learn the basics of app programming through interactive exercises and build your own small apps. Perfect for aspiring app developers!"
slug: "swiftplayground"
level: "mittel"
age: "11-13"
category: "code-coenner"
duration: "2 hours"
aliases:
  - "/ideen/swiftplayground"
---

Have you ever wondered how apps for iPhone or iPad are made? With **Swift Playgrounds**, you can learn exactly that — right on the iPad! You'll learn **Swift**, the programming language real professionals at Apple use to build their apps. Don't worry, getting started is easier than you think.

## What is Swift Playgrounds?

Swift Playgrounds is a **free app from Apple** that lets you learn to program. What makes it special:

- You solve **puzzles and challenges** in a 3D world
- You learn the **real programming language Swift** (not just blocks!)
- By the end, you can even build **your own apps**
- There are guided tutorials that walk you through step by step

## What you need

- An **iPad** (iPad Air 3 or newer) or a **Mac**
- The **Swift Playgrounds** app (free on the App Store)
- No programming experience needed!

## Step 1: Install and open the app

1. Open the **App Store** on your iPad
2. Search for **"Swift Playgrounds"**
3. Install the app (it's free!)
4. Open Swift Playgrounds

## Step 2: Solve the first puzzles

Start with the course **"Learn to Code 1"**:

1. You'll see a 3D world with a small character named **Byte**
2. Your task: guide Byte to the **gems** and **switches**
3. You do this by typing in **commands**:
   - `moveForward()` — Byte takes a step forward
   - `turnLeft()` — Byte turns left
   - `collectGem()` — Byte collects a gem
   - `toggleSwitch()` — Byte presses a switch

Here's what your first program looks like:
```swift
moveForward()
moveForward()
moveForward()
collectGem()
```

Type in the commands and press **"Run My Code"** — then watch Byte move!

## Step 3: Getting to know loops

At some point it gets tedious to keep typing `moveForward()` over and over. That's why there are **loops**:

```swift
for i in 1...5 {
    moveForward()
}
collectGem()
```

This means: "Move forward 5 steps, then collect the gem." Much shorter than writing `moveForward()` five times!

## Step 4: Understanding conditions

Sometimes Byte has to make decisions. That's what **if statements** are for:

```swift
moveForward()
if isOnGem {
    collectGem()
}
```

This means: "Take a step. If you're standing on a gem, collect it." Your program now reacts to the situation!

## Step 5: Creating functions

If you need the same steps over and over, you can write your **own function**:

```swift
func turnAndCollect() {
    turnLeft()
    moveForward()
    collectGem()
}

turnAndCollect()
turnAndCollect()
turnAndCollect()
```

You just invented **your own command**! That's exactly how real programmers think.

{{< callout type="info" >}}
**Tip:** Swift Playgrounds works its way through increasingly difficult concepts step by step. Take your time and try out the challenges — that's the best way to learn!
{{< /callout >}}

## What comes next?

Once you've made it through the basic courses, things get really exciting:

- **"Learn to Code 2"** — more complex programs with variables and arrays
- **"Building Apps with SwiftUI"** — build your first real app with buttons, images, and animations!
- **"Your Own Projects"** — let your creativity run free

## Important Swift terms

| Term | Meaning |
|---|---|
| `func` | A function (your own command) |
| `for ... in` | A loop (repeat something) |
| `if` / `else` | A condition (if ... then) |
| `var` | A variable (a storage slot) |
| `true` / `false` | True or false |

## Why learn Swift?

Swift is the programming language used to build **every iPhone and iPad app**. If you know Swift, you can eventually publish your own apps on the App Store — how cool would that be? And best of all: the basics you learn in Swift Playgrounds also help you with other programming languages.

{{< callout type="info" >}}
**At KidsLab** we have iPads with Swift Playgrounds! Come by and start your programming career.
{{< /callout >}}
