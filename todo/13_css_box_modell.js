import { classCheckStyleSameValue, classCheckStyleValues, classHasCorrectStyleValue, cssBorderColorNames, cssBorderStyleNames, cssBorderWidthNames, cssMarginNames, cssPaddingNames} from '../exercise/validation_helper.js';
import { Exercise } from '../exercise/exercise_base.js';

let exerciseID = "13_css_box_modell";


let instructions = `
<ol>
<li>Wenn dir der Begriff <em>Boxmodell</em> nichts sagt, lies zunächst folgende Seite durch: <a href="https://wiki.selfhtml.org/wiki/CSS/Tutorials/Boxmodell#Fazit" target="_blank">wiki.selfhtml.org - Boxmodell</a></li>
<li>Die HTML Datei enthält zwei Boxen. Diese sind aktuell noch nicht formatiert. Setze die Hintergrundfarbe für alle Elemente der Klasse <em>box</em> auf <em>red</em>. Der CSS Code ist unter <em>.box {...}</em> schon vorbereitet.</li>
<li>Lege für alle Boxen eine Höhe und Breite von jeweils <em>200px</em> fest.</li>
<li>Füge für jede Box einen Rand hinzu. Dieser soll die Farbe <em>blue</em> haben, <em>20px</em> breit sein und den style <em>solid</em> haben.</li>
<li>Füge einen Innenabstand von rundum <em>20px</em> ein.</li>
<li>Füge einen Außenabstand ein. Dieser soll links und rechts jeweils <em>30px</em> betragen. Oben und Unten soll der Abstand nur <em>15px</em> groß sein.</li>
</ol>
`

let tips = [
  {level: 1, title: "Video: CSS Boxmodell", content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/MK2bwMyXV80" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Tutorials/Hintergrund/Gestaltung_mit_CSS", "https://wiki.selfhtml.org/wiki/CSS/Tutorials/Boxmodell"], contentIsHTML: true},
  {level: 2, title: "Klassen Style bearbeiten", content: `Style Klassen können beliebige Namen haben. Im Beispiel gibt es die Klasse <em>box</em>. Diese muss im Element im Attribut <em>class="box"</em> angegeben werden. Einem Element können beliebig viele Klassen zugeordnet werden! Im CSS wird die Klasse über ihren Namen mit einem vorangestellten Punkt angesprochen, also im Beispiel <em>.box { ... }</em>`, weblinks: [], contentIsHTML: true},
  {level: 2, title: "Benötigte Elemente und Styles", content: `<ul>
  <li>Hintergrundfarbe: background-color</li>
  <li>Farbwerte: z.B. #ff0000 (je zwei Stellen für r, g und b) = rot, alternativ: einfach <em>red</em></li>
  <li>Breite: width</li>
  <li>Höhe: height</li>
  <li>Randfarbe: border-color</li>
  <li>Randdicke: border-width</li>
  <li>Randart: border-style</li>
  <li>Rand zusammengefasst: border: width color style</li>
  <li>Innenabstand: padding</li>
  <li>Aussenabstand: margin</li>
  <li>Aussen-/Innenabstand für seite: margin/padding-top/left/bottom/right</li>
  </ul>
  `, weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Tutorials/Hintergrund/Gestaltung_mit_CSS", "https://wiki.selfhtml.org/wiki/CSS/Tutorials/Boxmodell"], contentIsHTML: true},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
<style id="meinStyle">
  .box {
    display: inline-block;
    background-color: red;
    width: 200px;
    height: 200px;
    border: 20px blue solid;
    margin: 15px 30px 15px 30px;
    padding: 20px;
  }
</style>
  </xmp>`, contentIsHTML: true}
]

let validationFuncs = [
  function() { return classHasCorrectStyleValue("box", "background-color", "rgb(255, 0, 0)"); },
  function() { return classHasCorrectStyleValue("box", "width", "200px"); },
  function() { return classHasCorrectStyleValue("box", "height", "200px"); },
  function() { return classCheckStyleSameValue("box", cssBorderColorNames, "rgb(0, 0, 255)"); },
  function() { return classCheckStyleSameValue("box", cssBorderWidthNames, "20px"); },
  function() { return classCheckStyleSameValue("box", cssBorderStyleNames, "solid"); },
  function() { return classCheckStyleSameValue("box", cssPaddingNames, "20px"); },
  function() { return classCheckStyleValues("box", cssMarginNames, ["15px", "30px", "15px", "30px"]); },
]

let exerciseBase = new Exercise(exerciseID, instructions, tips, validationFuncs);
window.onload = exerciseBase.init();