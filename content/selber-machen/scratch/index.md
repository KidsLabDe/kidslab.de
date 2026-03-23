---
title: "Scratch - dein erstes Spiel!"
description: |
  **Was ist Scratch?**
  Scratch ist eine visuelle Programmiersprache, die speziell für Kinder und Anfänger entwickelt wurde. Anstatt komplizierte Textbefehle zu tippen, ziehst du bunte Blöcke zusammen wie Puzzleteile. Diese Blöcke enthalten verschiedene Befehle - manche lassen Figuren sich bewegen, andere spielen Töne ab oder reagieren auf Tastendrücke. Scratch macht Programmieren so einfach wie Bausteine zusammenstecken und hilft dabei, logisches Denken zu entwickeln, während du deine eigenen Spiele, Animationen und Geschichten erschaffst.
  **Spielidee: Katze fängt Käse**
  Bei diesem einfachen Fangspiel steuerst du eine Katze, die durch die Gegend läuft und Käsestücke einsammelt. Jedes gefangene Käsestück gibt Punkte. Das Spiel wird mit den Pfeiltasten gesteuert und ist perfekt für Scratch-Anfänger geeignet.
image: "chatgpt-image-26.-juli-2025-15_56_33.png"
slug: "scratch"
level: "einfach"
age: "9-11"
category: "code-coenner"
aliases:
  - "/ideen/scratch"
---

**Was ist Scratch?**
Scratch ist eine visuelle Programmiersprache, die speziell für Kinder und Anfänger entwickelt wurde. Anstatt komplizierte Textbefehle zu tippen, ziehst du bunte Blöcke zusammen wie Puzzleteile. Diese Blöcke enthalten verschiedene Befehle - manche lassen Figuren sich bewegen, andere spielen Töne ab oder reagieren auf Tastendrücke. Scratch macht Programmieren so einfach wie Bausteine zusammenstecken und hilft dabei, logisches Denken zu entwickeln, während du deine eigenen Spiele, Animationen und Geschichten erschaffst.
**Spielidee: Katze fängt Käse**
Bei diesem einfachen Fangspiel steuerst du eine Katze, die durch die Gegend läuft und Käsestücke einsammelt. Jedes gefangene Käsestück gibt Punkte. Das Spiel wird mit den Pfeiltasten gesteuert und ist perfekt für Scratch-Anfänger geeignet.

**Schritt 1:**

Öffne Scratch im Browser (scratch.mit.edu)
Die Katze (Sprite1) ist bereits da - perfekt für unser Spiel
Lösche den weißen Hintergrund und wähle einen schönen Hintergrund aus der Bibliothek (z.B. "Outdoors" oder "Park")

**Schritt 2:**

Klicke auf "Figur wählen" (Katzensymbol unten rechts)
Suche nach "Cheese" oder "Food" und wähle ein Käsestück aus
Der Käse sollte nun neben der Katze erscheinen

**Schritt 3:**

- Klicke auf die Katze
- Ziehe diese Blöcke zusammen:
```
Wenn Flagge angeklickt
Wiederhole fortlaufend
Wenn Taste [Pfeil nach oben] gedrückt
ändere y um 10
Wenn Taste [Pfeil nach unten] gedrückt
ändere y um -10
Wenn Taste [Pfeil nach rechts] gedrückt
ändere x um 10
Wenn Taste [Pfeil nach links] gedrückt
ändere x um -10
```

**Schritt 4:**

- Klicke auf den Käse
- Programmiere ihn so:
```
Wenn Flagge angeklickt
Wiederhole fortlaufend
gehe zu x: [Zufallszahl von -200 bis 200] y: [Zufallszahl von -150 bis 150]
warte bis <wird [Sprite1] berührt?>
spiele Klang [chomp]
ändere [Punkte] um 1
```

**Schritt 5:**

- Klicke auf "Variablen" in der Blockliste
- Klicke "Neue Variable" und nenne sie "Punkte"
- Bei der Katze fügst du ganz am Anfang hinzu:
```
Wenn Flagge angeklickt
setze [Punkte] auf 0
```

**Schritt 6:**

- Klicke auf die grüne Flagge
- Bewege die Katze mit den Pfeiltasten
- Berühre den Käse - er sollte verschwinden und an einer neuen Stelle erscheinen
- Die Punkte sollten sich erhöhen

**Schritt 7:**

**Bonus-Verbesserungen:**
- Füge einen Timer hinzu, der das Spiel nach 60 Sekunden beendet
- Lass die Katze "Miau" sagen, wenn sie Käse fängt
- Erstelle mehrere Käsestücke für mehr Herausforderung
- Füge Hindernisse hinzu, die Punkte abziehen

Das Spiel ist jetzt fertig! Du hast gelernt, wie man Figuren bewegt, Kollisionen erkennt und Variablen verwendet - die Grundlagen für fast alle Scratch-Spiele.
