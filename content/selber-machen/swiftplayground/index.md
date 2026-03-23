---
title: "Swift Playgrounds: Deine erste App!"
description: "Entwickle deine erste iOS App mit Swift Playgrounds auf dem iPad! Lerne die Grundlagen der App-Programmierung durch interaktive Übungen und erstelle eigene kleine Apps. Perfekt für angehende App-Entwickler!"
slug: "swiftplayground"
level: "mittel"
age: "11-13"
category: "code-coenner"
duration: "2 Stunden"
aliases:
  - "/ideen/swiftplayground"
---

Hast du dich schon mal gefragt, wie Apps auf dem iPhone oder iPad gemacht werden? Mit **Swift Playgrounds** kannst du genau das lernen — und zwar direkt auf dem iPad! Du lernst die Programmiersprache **Swift**, mit der echte Profis bei Apple ihre Apps programmieren. Keine Sorge, der Einstieg ist einfacher als du denkst.

## Was ist Swift Playgrounds?

Swift Playgrounds ist eine **kostenlose App von Apple**, mit der du Programmieren lernen kannst. Das Besondere:

- Du löst **Rätsel und Aufgaben** in einer 3D-Welt
- Du lernst die **echte Programmiersprache Swift** (nicht nur Blöcke!)
- Du kannst am Ende sogar **eigene Apps** bauen
- Es gibt Anleitungen, die dich Schritt für Schritt begleiten

## Was du brauchst

- Ein **iPad** (ab iPad Air 3 oder neuer) oder einen **Mac**
- Die App **Swift Playgrounds** (kostenlos im App Store)
- Keine Programmiererfahrung nötig!

## Schritt 1: App installieren und öffnen

1. Öffne den **App Store** auf deinem iPad
2. Suche nach **"Swift Playgrounds"**
3. Installiere die App (sie ist kostenlos!)
4. Öffne Swift Playgrounds

## Schritt 2: Die ersten Rätsel lösen

Starte mit dem Kurs **"Programmieren lernen 1"**:

1. Du siehst eine 3D-Welt mit einer kleinen Figur namens **Byte**
2. Deine Aufgabe: Byte zu den **Edelsteinen** und **Schaltern** führen
3. Du tippst dafür **Befehle** ein:
   - `moveForward()` — Byte geht einen Schritt nach vorne
   - `turnLeft()` — Byte dreht sich nach links
   - `collectGem()` — Byte sammelt einen Edelstein ein
   - `toggleSwitch()` — Byte drückt einen Schalter

So sieht dein erstes Programm aus:
```swift
moveForward()
moveForward()
moveForward()
collectGem()
```

Tippe die Befehle ein und drücke auf **"Code ausführen"** — dann siehst du, wie Byte sich bewegt!

## Schritt 3: Schleifen kennenlernen

Irgendwann wird es langweilig, immer wieder `moveForward()` zu tippen. Deshalb gibt es **Schleifen**:

```swift
for i in 1...5 {
    moveForward()
}
collectGem()
```

Das bedeutet: "Gehe 5 Schritte nach vorne, dann sammle den Edelstein ein." Viel kürzer als fünfmal `moveForward()` zu schreiben!

## Schritt 4: Bedingungen verstehen

Manchmal muss Byte Entscheidungen treffen. Dafür gibt es **if-Abfragen**:

```swift
moveForward()
if isOnGem {
    collectGem()
}
```

Das heißt: "Gehe einen Schritt. Wenn du auf einem Edelstein stehst, sammle ihn ein." Dein Programm reagiert jetzt auf die Situation!

## Schritt 5: Funktionen erstellen

Wenn du die gleichen Schritte öfter brauchst, kannst du eine **eigene Funktion** schreiben:

```swift
func drehenUndSammeln() {
    turnLeft()
    moveForward()
    collectGem()
}

drehenUndSammeln()
drehenUndSammeln()
drehenUndSammeln()
```

Du hast gerade deinen **eigenen Befehl** erfunden! So denken auch echte Programmierer.

{{< callout type="info" >}}
**Tipp:** Schritt für Schritt arbeitet sich Swift Playgrounds durch immer schwierigere Konzepte. Nimm dir Zeit und probiere die Challenges aus — so lernst du am besten!
{{< /callout >}}

## Was kommt danach?

Wenn du die Grundkurse durchhast, wird es richtig spannend:

- **"Programmieren lernen 2"** — komplexere Programme mit Variablen und Arrays
- **"App erstellen mit SwiftUI"** — baue deine erste richtige App mit Buttons, Bildern und Animationen!
- **"Eigene Projekte"** — lass deiner Kreativität freien Lauf

## Wichtige Swift-Begriffe

| Begriff | Bedeutung |
|---|---|
| `func` | Eine Funktion (eigener Befehl) |
| `for ... in` | Eine Schleife (etwas wiederholen) |
| `if` / `else` | Eine Bedingung (wenn ... dann) |
| `var` | Eine Variable (ein Speicherplatz) |
| `true` / `false` | Wahr oder Falsch |

## Warum Swift lernen?

Swift ist die Programmiersprache, mit der **alle iPhone- und iPad-Apps** gebaut werden. Wenn du Swift kannst, kannst du irgendwann deine eigenen Apps im App Store veröffentlichen — wie cool wäre das? Und das Beste: Die Grundlagen, die du in Swift Playgrounds lernst, helfen dir auch bei anderen Programmiersprachen.

{{< callout type="info" >}}
**Im KidsLab** haben wir iPads mit Swift Playgrounds! Komm vorbei und starte deine Programmier-Karriere.
{{< /callout >}}
