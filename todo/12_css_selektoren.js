import { elementIsCorrectTag, elementsExist, checkTableContent, or, hasCorrectStyleValue, hasQuerySelectorCorrectStyleValue, cssContains, hasSelectorStyleValue} from '../exercise/validation_helper.js';
import { Exercise } from '../exercise/exercise_base.js';

let exerciseID = "12_css_selektoren";


let instructions = `
<ol>
<li>Bearbeite die HTML Datei so, dass die Hintergrundfarbe der Überschrift 1 <em>DarkSlateGray</em> (Hex: #2F4F4F) und die Schriftfarbe <em>weiß</em> ist.</li>
<li>Die Überschriften 2-4 sollen rot dargestellt werden. Verwende dazu eine CSS Klasse mit den Namen <em>wichtig</em>. Setze die Schriftfarbe dann mit dem Namen der Farbe, nicht mit einem Hexadezimal oder RGB Farbwert!</li>
<li>Die Überschrift 1.1 soll grün dargestellt werden. Gib den Farbwert in Hexadezimal an.</li>
<li>Ändere die Schriftfamilie für die Überschriften erster bis dritter Ordnung zu <em>"Times New Roman"</em>. Gib als ersten Fallback die Schriftfamilie <em>Times</em> und als letzten Fallback <em>serif</em> an!</li>
<li>Überschrift 5 soll zentriert dargestellt werden</li>
</ol>
`

let tips = [
  {level: 1, title: "Video: Selektoren", content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/QWnvqFLf3ys" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Selektoren/Typselektor", "https://wiki.selfhtml.org/wiki/CSS/Selektoren/Klassenselektor"], contentIsHTML: true},
  {level: 2, title: "Benötigte Elemente und Styles", content: `<ul>
  <li>Hintergrundfarbe: background-color</li>
  <li>Textfarbe: color</li>
  <li>Farbwerte: z.B. #ff0000 (je zwei Stellen für r, g und b) = rot, alternativ: einfach <em>red</em></li>
  <li>Text zentrieren: text-align</li>
  <li>Schriftfamilie: font-family (Fallbacks werden durch Komma getrennt)</li>
  </ul>
  `, weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Selektoren/Typselektor", "https://wiki.selfhtml.org/wiki/CSS/Selektoren/Klassenselektor"]},
  {level: 2, title: "Style auf mehrere Elemente anwenden", content: `Um einen Style auf mehrere Elemente anzuwenden gibt es verschiedene Möglichkeiten. Man könnte allen Elementen die selbe CSS Klasse zuweisen, oder man nutzt den selben Code für mehrere Selektoren. Ein Beispiel wäre die selbe Schriftart für alle Überschriften, dafür müssen die Selektoren mit Komma getrennt geschrieben werden, z.B. <em>h1, h2, h3 { ... }</em>, hier würden alle Styles auf h1-h3 angewendet.`, weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Selektoren/Typselektor", "https://wiki.selfhtml.org/wiki/CSS/Selektoren/Klassenselektor"], contentIsHTML: true},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <style id="meinStyle">
    h1, h2, h3 { font-family: "Times New Roman", Times, serif; }
    #u1 {
      color: white;
      background-color: #2F4F4F; 
    }

    .wichtig {
      color: red;
    }

    #u5 {
      text-align: center;
    }

    #u1_1 {
      color: #00FF00;
    }
  </style>
  [...]
  <h1 id="u1">Überschrift 1</h1>
  <h2 id="u1_1">Überschrift 1.1</h2>
  <h3 id="u1_1_1">Überschrift 1.1.1</h3>
  <h1 id="u2" class="wichtig">Überschrift 2</h1>
  <h1 id="u3" class="wichtig">Überschrift 3</h1>
  <h1 id="u4" class="wichtig">Überschrift 4</h1>
  <h1 id="u5">Überschrift 5</h1>
  <h1 id="u6">Überschrift 6</h1>
  </xmp>`, contentIsHTML: true}
]

let validationFuncs = [
  function() { return elementIsCorrectTag("u1", "h1"); },
  function() { return hasCorrectStyleValue("u1", "background-color", "rgb(47, 79, 79)"); },
  function() { return hasCorrectStyleValue("u1", "color", "rgb(255, 255, 255)"); },
  function() { return hasSelectorStyleValue(".wichtig", "color", "red"); },
  function() { return hasCorrectStyleValue("u2", "color", "rgb(255, 0, 0)"); },
  function() { return hasCorrectStyleValue("u3", "color", "rgb(255, 0, 0)"); },
  function() { return hasCorrectStyleValue("u4", "color", "rgb(255, 0, 0)"); },
  function() { return hasCorrectStyleValue("u1_1", "color", "rgb(0, 255, 0)"); },
  function() { return hasQuerySelectorCorrectStyleValue("h1", "font-family", `"Times New Roman", Times, serif`); },
  function() { return hasQuerySelectorCorrectStyleValue("h2", "font-family", `"Times New Roman", Times, serif`); },
  function() { return hasQuerySelectorCorrectStyleValue("h3", "font-family", `"Times New Roman", Times, serif`); },
  function() { return hasCorrectStyleValue("u5", "text-align", `center`); },
  function() { return cssContains("#00ff00")}
]

let exerciseBase = new Exercise(exerciseID, instructions, tips, validationFuncs);
window.onload = exerciseBase.init();