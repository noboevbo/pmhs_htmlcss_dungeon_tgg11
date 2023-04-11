# Selektoren kombinieren
Bei der Kombination von Selektoren kommt es darauf an, wie die Elemente zusammenhängen. In dieser Aufgabe enthält jedes li-Element ein a-Element, es liegt also eine Kind-Beziehung vor (a ist Kind von li). Dafür kann der Kindselektor verwendet werden. Im Beispiel wäre das *`li > a { ... }`*.

## Beispiel
Alle Links auswählen, die direkte Kindelemente eines *`<li>`*-Elements sind und ihnen die Schriftfarbe rot zuweisen.

```html
li > a { 
    color: red;
}
```

## Weiterführende Informationen
- [https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/Kombinator](https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/Kombinator)
- [https://www.w3schools.com/css/css_combinators.asp](https://www.w3schools.com/css/css_combinators.asp)