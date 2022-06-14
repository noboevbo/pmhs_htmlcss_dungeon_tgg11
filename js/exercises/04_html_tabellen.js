import { Exercise } from '../exercise/exercise_base.js';
import { checkTableContent, elementIsCorrectTag } from '../exercise/validation_helper.js';

let exerciseID = "04_html_tabellen";


let instructions = `
<ol>
<li>Füge eine Tabelle mit folgendem Inhalt ein. Nutze für die erste Zeile header-Zellen! Das Tabellen-Element soll die id <em>tabelle1</em> haben. <br><img src="aufgaben/static/tabelle.png" alt="Beispieltabelle"></li>
</ol>
`

let tips = [
  { level: 0, title: "Video: Tabellen in HTML", content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/3_dMtz73tUk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe`, weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Tabellen"], contentIsHTML: true },
  { level: 1, title: "HTML-Element: <table>.", content: "Eine Tabelle wird mit dem <table>-Tag begonnen. In diesem Tag nutzt man dann Zeilen (<tr>-Tag) und in den Zeilen Spaltenelemente (<th>-Tag für Überschriften und <td>-Tag für Datenzellen). Dabei steht tr für tablerow, th für tablehead und td für tabledata. Mehr Infos findest du unter dem Link unten.", weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Tabellen"] },
  {
    level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <table id="tabelle1">
    <tr>
      <th>Schüler</th>
      <th>Alter</th>
      <th>Note</th>
    </tr>
    <tr>
      <td>Alice</td>
      <td>17</td>
      <td>3</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>19</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>18</td>
      <td>1</td>
    </tr>
  </table> 
  </xmp>`, contentIsHTML: true
  }
]

let tableContent = [
  [{ value: "Schüler", type: "th" }, { value: "Alter", type: "th" }, { value: "Note", type: "th" }],
  [{ value: "Alice", type: "td" }, { value: "17", type: "td" }, { value: "3", type: "td" }],
  [{ value: "Bob", type: "td" }, { value: "19", type: "td" }, { value: "2", type: "td" }],
  [{ value: "Eve", type: "td" }, { value: "18", type: "td" }, { value: "1", type: "td" }]]

let validationFuncs = [
  function () { return elementIsCorrectTag("tabelle1", "table"); },
  function () { return checkTableContent("tabelle1", tableContent); },
]

let exerciseBase = new Exercise(exerciseID, instructions, tips, validationFuncs);
window.onload = exerciseBase.init();