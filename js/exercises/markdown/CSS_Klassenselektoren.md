# Klassenselektoren

Der Klassenselektor kann verwendet werden um bestimmte Elemente anhand ihrer Klassennamen im **class**-Attribut auszuwählen.

## Problemstellung

Im folgenden HTML Code einer Tabelle soll die Zelle mit dem günstigsten Benzin- und Dieselpreis mit einem grünen Hintergrund hervorgehoben werden. Typselektoren können dafür nicht eingesetzt werden, da **nicht alle** Elemente des entsprechenden Typs ausgewählt werden sollen, sondern **mehrere bestimmte** Elemente. Dafür bietet sich der **Klassenselektor** an. Dieser wählt Elemente aus, denen ein bestimmter Klassenname zugewiesen wurde. 

```html
<table>
    <tr>
        <th>Stadt</th>
        <th>Benzin</th>
        <th>Diesel</th>
    </tr>
    <tr>
        <td>Berlin</td>
        <td>2,04</td>
        <td>2,10</td>
    </tr>
    <tr>
        <td>Esslingen</td>
        <td>2,01</td>
        <td>2,15</td>
    </tr>
</table>
```

## Zuweisen von Klassennamen

Klassennamen werden über das **class**-Attribut zugewiesen und können frei gewählt werden. 

```html
<td class="highlight">2,10</td>
```

**Hinweis**: Klassennamen unterstützen nicht alle Sonderzeichen, nimm deswegen am besten sprechende Namen die nur aus Buchstaben, Bindestrichen und Nummern bestehen.

## Auswählen von Klassennamen

Hat man den Elementen, die ausgewählt werden sollen einen entsprechenden Klassennamen zugewiesen, kann dieser über den Selektor ausgewählt werden. Dabei schreibt man immer einen **Punkt (.) vor den Klassennamen**:

```css
.highlight {
  background-color: green;
  color: white;
}
```

## Verwenden mehrerer Klassen

Einem Element können beliebig viele Klassennamen zugewiesen werden. Dafür schreibt man die Namen nacheinander im **class**-Attribut und trennt sie durch ein Leerzeichen:

```html
<style>
  .highlight {
    background-color: green;
    color: white;
  }
  
  .meine-stadt {
    border: 5px dotted red;
  }
</style>
...
<td class="highlight meine-stadt">2,10</td>
```
