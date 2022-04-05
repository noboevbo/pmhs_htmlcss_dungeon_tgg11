import { elementIsCorrectTag, elementsExist, or } from '../exercise/validation_helper.js';;
import { Exercise } from '../exercise/exercise_base.js';

let exerciseID = "02_html_typo";

let instructions = `
<ol>
<li>Erstelle einen neuen Paragraphen mit einem beliebigen Inhalt. Der Paragraph soll die ID <em>auszeichnungen</em> haben.</li>
<li>Markiere vier Wörter im Paragraphen in dem du jeweils eines kursiv oder fett setzt sowie unterstreichst und durchstreichst. Nutze dafür HTML Textauszeichnungen!</li>
<li>Füge noch einen manuellen Zeilenumbruch im Paragraphen ein.</li>
<li>Erstelle eine horizontale Linie unter dem Paragraphen</li>
</ol>
`

let tips = [
  {level: 1, title: "Texte im Paragraphen markieren.", content: "Innerhalb eines Paragraphen können unterschiedliche Auszeichnungen verwendet werden, bsp. <p>Das ist ein <strong>Text</strong></p>. Unter dem Link findest du weitere Auszeichnungsmöglichkeiten.", weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Tutorials/HTML5/Textauszeichnung"]},
  {level: 1, title: "Zeilenumbruch im Paragraphen verwenden.", content: "Paragraphen können beliebigen HTML Code enthalten, entsprechend kannst du einfach im Text innerhalb des Paragraphen einen Zeilenumbruch (<br>) Einsetzen.", weblinks: ["https://www.w3schools.com/html/html_paragraphs.asp"]},
  {level: 2, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <p id="auszeichnungen">Das ist ein Text.<br> <strong>strong</strong>, <em>ausgezeichnet</em>, <u>Unterstrichen</u>, <del>durchgestrichen</del></p>
  <hr>
  </xmp>`, contentIsHTML: true}
]

let validationFuncs = [
  function() { return elementIsCorrectTag("auszeichnungen", "p"); },
  function() { return elementsExist("strong", 1, true); },
  function() { return or([elementsExist("em", 1, true), elementsExist("i", 1, true)]); },
  function() { return or([elementsExist("strong", 1, true), elementsExist("b", 1, true)]); },
  function() { return elementsExist("u", 1, true) },
  function() { return elementsExist("del", 1, true) },
  function() { return elementsExist("br", 1, true); },
  function() { return elementsExist("hr", 1, true); },
]

let exerciseBase = new Exercise(exerciseID, instructions, tips, validationFuncs);
window.onload = exerciseBase.init();