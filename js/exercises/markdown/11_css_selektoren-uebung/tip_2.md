# Styles auf mehrere Elemente anwenden
Um einen Style auf mehrere Elemente anzuwenden gibt es verschiedene Möglichkeiten. Man könnte allen Elementen die selbe CSS Klasse zuweisen, oder man nutzt den selben Code für mehrere Selektoren. Ein Beispiel wäre die selbe Schriftart für alle Überschriften, dafür müssen die Selektoren mit Komma getrennt geschrieben werden, z.B. _h1, h2, h3 { ... }_, hier würden alle Styles auf h1-h3 angewendet.

## Beispiel
Schriftfarbe für h1-h3 auf weiß setzen.
```css
h1, h2, h3 { 
    color: white;
}
```