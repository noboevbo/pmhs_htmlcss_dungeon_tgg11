# ID-Selektor

Der ID-Selektor kann verwendet werden um ein bestimmtes Element anhand seiner **id** auszuwählen.

## Problemstellung

Im folgenden HTML Code einer Tabelle soll der gesamten Tabelle eine Breite von 50% zugewiesen werden. Typselektoren können dafür nicht eingesetzt werden, da **nicht alle** Elemente des entsprechenden Typs ausgewählt werden sollen, sondern **ein bestimmtes** Element.

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

## Zuweisen von IDs

IDs werden über das **id**-Attribut zugewiesen und können frei gewählt werden. Der Name muss aber **einzigartig** sein! Das heißt, im Gegensatz zu Klassennamen darf der gleiche Name nicht mehreren Elementen zugewiesen werden.

```html
<table id="statistik-tabelle">...</table>
```

**Hinweis**: IDs unterstützen nicht alle Sonderzeichen, nimm deswegen am besten sprechende Namen die nur aus Buchstaben, Bindestrichen und Nummern bestehen.

## Auswählen von IDs

Hat man dem Element, das ausgewählt werden soll eine entsprechende ID zugewiesen, kann diese über den Selektor ausgewählt werden. Dabei schreibt man immer ein **Raute (#) vor den Klassennamen**:

```css
#statistik-tabelle {
  width: 50%;
}
```

## Warum nicht Inline-Styles verwenden?

Wenn man sowieso nur ein einzigartiges Element auswählt könnte man dies ja auch über Inline-Styles (z.B. `style="width: 50%"`) machen, jedoch hat der ID-Selektor den Vorteil, dass damit der Code für die Gesaltung (CSS) vom Code für die Auszeichnung (HTML) getrennt ist und man entsprechend alle gestalterischen Änderungen in den CSS-Regelsätzen machen kann und nicht den HTML-Code nach dem passenden style-Attribut durchsuchen muss.

## Warum nicht Klassenselektoren verwenden?

Man könnte der Tabelle auch einen Klassennamen zuweisen und sie über einen Klassenselektor auswählen. Dieser wäre dann aber nicht unbedingt einzigartig, da der Klassenname auch anderen Elementen zugewiesen werden kann. Dadurch besteht die Gefahr, dass man den Klassennamen doch öfter nutzt und später etwas daran ändert und damit eventuell unbeabsichtigt auch die anderen Elemente beeinflusst. Ist man sich dessen bewusst, spricht allerdings tatsächlich nichts dagegen, Klassenselektoren für einzelne Elemente zu nutzen. 

## Weiterführende Informationen
- [https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/einfacher_Selektor#ID-Selektor](https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/einfacher_Selektor#ID-Selektor)
- [https://www.w3schools.com/cssref/sel_id.asp](https://www.w3schools.com/cssref/sel_id.asp)