---
title: "Interactive Station: Rocket"
linkTitle: "Rocket"
description: Steer the rocket through space – an interactive game with real buttons that you can play right at KidsLab.
image: "rakete-mitmachstation-kidslab-1.jpg"
slug: "rakete"
---

Five buttons, a screen, a space adventure — just sit down and start playing.

## The game

The game is by [Mario von Rickenbach](https://mariorickenbach.ch/) — we adapted it for our interactive station. It runs on a screen and is controlled with five physical buttons — no phone, no app, no account. Just press and steer.

After 90 seconds without input, the game restarts automatically so the next person can jump right in.

{{< gallery cols="2" >}}
![Rocket interactive station at KidsLab Augsburg – game screen with buttons](rakete-mitmachstation-kidslab-1.jpg)
![Rocket interactive station – buttons for controlling the game](rakete-mitmachstation-kidslab-2.jpg)
![Rocket at KidsLab – game view on screen](rakete-mitmachstation-kidslab-3.jpg)
![Rocket interactive station at KidsLab Augsburg](rakete-mitmachstation-kidslab-4.jpg)
{{< /gallery >}}

## How does it work?

Behind the game is a Raspberry Pi Pico running CircuitPython. The buttons send their signals to the Pico, which forwards them as keyboard input to the game computer — like an invisible gamepad. Our hardware adaptation is open source:

{{< github-repo repo="openlab-aux/SchaufensterRakete" text="Hardware adaptation on GitHub" >}}

## When is the station open?

The rocket runs whenever KidsLab is open — just walk in and play.

## Rent the rocket

The station can be rented for events, festivals, or exhibitions — including setup and hardware. Just get in touch:

{{< button href="/ueber-kidslab/kontakt/" >}}Inquire & book{{< /button >}}
