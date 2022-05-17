import { classCheckStyleSameValue, classCheckStyleValues, classHasCorrectStyleValue, cssBorderColorNames, cssBorderStyleNames, cssBorderWidthNames, cssMarginNames, cssPaddingNames, hasClassStyleValue as hasStyleValue, hasQuerySelectorCorrectStyleValue} from '../exercise/validation_helper.js';
import { Exercise } from '../exercise/exercise_base.js';

let exerciseID = "14_css_navbar";


let instructions = `
Setze in dieser Aufgabe Typselektoren ein!
<ol>
<li>Entferne die Punkte vor den einzelnen ListItems über die CSS Eigenschaft <em>list-style-type</em> der ungeordneten Liste.</li>
<li>Setze die Hintergrundfarbe der ungeordneten Liste auf schwarz.</em>
<li>Setze die Farbe von Links in jedem ListItem auf weiß. Nutze dafür kombinierte Selektoren!</li>
<li>Füge einen Hover Effekt für jeden Link in jedem ListItem ein, bei dem die Hintergrundfarbe auf weiß und die Textfarbe auf schwarz gesetzt wird.</li>
<li>Die Liste ist noch zu breit, lege eine fixe Breite von 200px für die ungeordnete Liste fest</li>
<li>Entferne den Unterstrich der Links!</li>
<li>Die Links in allen Listenelementen sollen nun die gesamte verfügbare Breite nutzen. Ändere dafür deren Anzeigeart von <em>inline</em> zu <em>block</em>.
</ol>
`

let tips = [
  {level: 1, title: "Typselektor", content: `Typselektoren geben Styles für bestimmte HTML-Tags an, will man z.B. für alle ListItem (li) Elemente einen Style angeben schreibt man als Selektor einfach den HTML-Elementnamen <xmp>li { ... }</xmp> verwenden.`, weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Selektoren/Typselektor"], contentIsHTML: true},
  {level: 2, title: "Kombinierte Selektoren", content: "Bei der Kombination von Selektoren kommt es darauf an, wie die Elemente zusammenhängen. In dieser Aufgabe enthält jedes li-Element ein a-Element, es liegt also eine Kind-Beziehung vor (a ist Kind von li). Dafür kann der Kindselektor verwendet werden. Im Beispiel wäre das <xmp>li > a { ... }</xmp>", weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Tutorials/Hintergrund/Gestaltung_mit_CSS", "https://www.w3schools.com/colors/colors_names.asp"]},
  {level: 2, title: "Benötigte Elemente und Styles", content: `<ul>
  <li>Textfarbe: color</li>
  <li>Hintergrundfarbe: background-color</li>
  <li>Farbwerte: z.B. #ff0000 (je zwei Stellen für r, g und b) = rot, alternativ: einfach <em>red</em></li>
  <li>Hover Selektor: Pseudoklasse :hover, Beispiel: a:hover</li>
  <li>Breite: width</li>
  <li>Unterstriche entfernen: text-decoration</li>
  <li>Anzeigeart ändern: display</li>
  </ul>
  `, weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Tutorials/Hintergrund/Gestaltung_mit_CSS", "https://wiki.selfhtml.org/wiki/CSS/Selektoren/hover", "https://www.w3schools.com/css/css_inline-block.asp"], contentIsHTML: true},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <style id="meinStyle">
  ul {
    list-style-type: none;
    width: 200px;
    background-color: #000;
  }

  li > a {
    display: block;
    color: #fff;
    text-decoration: none;
  }

  li > a:hover {
    background-color: #fff;
    color: #000;
  }
  </style>
[...]
  <!-- Änderungen im Body ab hier einfügen -->
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">News</a></li>
    <li><a href="#">Contact</a></li>
    <li><a href="#">About</a></li>
  </ul> 
  </xmp>`, contentIsHTML: true}
]

let validationFuncs = [
  function() { return hasQuerySelectorCorrectStyleValue("ul", "list-style-type", `none`); },
  function() { return hasQuerySelectorCorrectStyleValue("ul", "background-color", "rgb(0, 0, 0)"); },
  function() { return hasQuerySelectorCorrectStyleValue("li a", "color", "rgb(255, 255, 255)"); },
  function() { return hasStyleValue("li > a:hover", "color", "rgb(0, 0, 0)"); },
  function() { return hasStyleValue("li > a:hover", "background-color", "rgb(255, 255, 255)"); },
  function() { return hasQuerySelectorCorrectStyleValue("ul", "width", `200px`); },
  function() { return hasStyleValue("li > a", "text-decoration", "none"); },
  function() { return hasQuerySelectorCorrectStyleValue("li > a", "display", "block"); },
]

let exerciseBase = new Exercise(exerciseID, instructions, tips, validationFuncs);
window.onload = exerciseBase.init();