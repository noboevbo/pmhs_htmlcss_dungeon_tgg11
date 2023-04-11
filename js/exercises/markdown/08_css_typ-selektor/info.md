# Typselektoren

Selektoren werden in CSS benötigt um bestimmte HTML-Elemente auszuwählen, die dann über CSS-Regeln gestaltet (gestylt) werden sollen.

## Warum Selektoren?

Im folgenden HTML Code einer Tabelle sollen alle Zellen (**td**) gestylt werden, bisher sind nur Inline-Styles verwendet worden, dadurch müssen Änderungen und Erweiterungen in jedem einzelnen td-Element vorgenommen werden. Das ist zum einen aufwendig und zum anderen können sich hier auch schnell Fehler, wie zum Beispiel Tippfehler oder vergessene Elemente, einschleichen. 

```html
<table>
    <tr>
        <th style="border: 1px solid black; background-color: darkgray; color: white;">Stadt</th>
        <th style="border: 1px solid black; background-color: darkgray; color: white;">Benzin</th>
        <th style="border: 1px solid black; background-color: darkgray; color: white;">Diesel</th>
    </tr>
    <tr>
        <td style="border: 1px solid black;">Berlin</td>
        <td style="border: 1px solid black;">2,04</td>
        <td style="border: 1px solid black;">2,10</td>
    </tr>
    <tr>
        <td style="border: 1px solid black;">Esslingen</td>
        <td style="border: 1px solid black;">2,01</td>
        <td style="border: 1px solid black;">2,15</td>
    </tr>
</table>
```

## Syntax

Selektoren sind immer nach folgendem Schema aufgebaut:

```css
SELEKTOR { 
    EIGENSCHAFT: WERT;
    EIGENSCHAFT2: Wert;
}
```

Einen solchen Block nennt man **CSS-Regelsatz**. Jede Zuweisung von einem Wert zu einer Eigenschaft wird **Deklaration** genannt, im Beispiel oben gibt es entsprechend **einen Regelsatz mit zwei Deklarationen**. Beachte jedes Zeichen, CSS-Deklarationen steht immer in **geschweiften Klammern** (**{}**). Eine Regel ist immer so aufgebaut, dass Eigenschaft und Wert durch einen **Doppelpunkt** (**:**) getrennt werden. Die Regel wird mit einem Semikolon (**;**) abgeschlossen.

## Wohin schreibt man CSS-Regelsätze?

Man kann CSS Regelsätze innerhalb eines style-Elements im head-Element anlegen, das sähe z.B. wie folgt aus:

```html
<html>
  <head>
    ...
    <style>
      SELEKTOR { 
        EIGENSCHAFT: WERT;
        EIGENSCHAFT2: WERT;
      }
    </style>
  </head>
  <body>
    ...
  </body>
</html>
```

Es gibt noch weitere Möglichkeiten CSS-Regelsätze einzubinden, dies wird zu einem späteren Zeitpunkt thematisiert.

## Typselektoren

Ein wichtiger Selektor ist der Typselektor, über diesen lassen sich HTML-Elemente anhand ihres Elementnamens (z.B. td, th oder h1) auswählen. Will man im Beispiel oben für **alle td-Elemente** den schwarzen Rand setzen sähe die Regel wie folgt aus:

```css
td {
  border: 1px solid black;
}
```

Dieser CSS Regelsatz bedeutet soviel wie:

> **Wähle alle td-Elemente aus** und **weise** ihnen einen **1px** starken Rand (**border**) mit dem Style **solid** und der Farbe **black zu**.

Will man für alle th-Elemente die Hintergrundfarbe auf darkgray und die Textfarbe auf white setzen sähe der CSS-Regelsatz wie folgt aus:

```css
th {
  background-color: darkgray;
  color: white;
}
```

Man schreibt also einfach alle CSS-Deklarationen untereinander und sie werden auf die ausgewählten Elemente übertragen.

## Mehrere Selektoren verwenden

Im Beispiel oben haben die th-Zellen den selben Rand wie die td-Zellen, daher kann man hier alle td- und th-Elemente auswählen und den Rand zuweisen. Dafür werden die HTML-Elementnamen mit Komma getrennt:

```css
td, th {
  border: 1px solid black;
}
```

## Weiterführende Informationen
- [https://wiki.selfhtml.org/wiki/CSS/Selektoren/Typselektor](https://wiki.selfhtml.org/wiki/CSS/Selektoren/Typselektor)