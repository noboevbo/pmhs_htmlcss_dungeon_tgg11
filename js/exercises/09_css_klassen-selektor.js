import {
    elementIsCorrectTag,
    elHasCorrectStyleValue,
    elHasCSSClass,
    elementsExist,
    checkTableContent,
    or,
    hasCorrectStyleValue,
    hasQuerySelectorCorrectStyleValue,
    cssContains,
    hasSelectorStyleValue,
} from "../exercise/validation_helper.js";
import { Exercise } from "../exercise/exercise_base.js";

let exerciseID = "09_css_klassen-selektor";

let instructions = `
<ol>
<li>Füge einen CSS-Regelsatz für alle TableData (td) Elemente hinzu.</li>
<li>Setze in diesem den Rand so, dass er 1px stark ist, die Farbe schwarz sowie den Style <em>solid</em> hat.</li>
<li>Wende den Rand auch auf die TableHead (th) Zellen an.</li>
<li>Zusätzlich soll in allen TableHead-Zellen die Schrift fett gedruckt werden.</li>
</ol>
`;

let tips = [
    {
        level: 2,
        title: "Benötigte Elemente und Styles",
        content: `<ul>
  <li>Hintergrundfarbe: background-color</li>
  <li>Textfarbe: color</li>
  <li>Farbwerte: z.B. #ff0000 (je zwei Stellen für r, g und b) = rot, alternativ: einfach <em>red</em></li>
  <li>Text zentrieren: text-align</li>
  <li>Schriftfamilie: font-family (Fallbacks werden durch Komma getrennt)</li>
  </ul>
  `,
        weblinks: [],
    },
    {
        level: 3,
        title: "Lösung anzeigen",
        content: `Die Lösung ist: <xmp>
        Im Head:
        <style>
                td,
                th {
                    border: 1px solid black;
                }
        
                th {
                    font-weight: bold;
                }
        
                .highlight {
                    background-color: green;
                    color: white;
                }
        
                .meine-stadt {
                    border: 2px solid red;
                }
            </style>
        
        Im Body:
            <table id="tabelle1">
                <tr>
                    <th id="th_1_1">Stadt</th>
                    <th id="th_1_2">Super E10</th>
                    <th id="th_1_3">Diesel</th>
                </tr>
                <tr>
                    <td id="td_2_1">Berlin</td>
                    <td id="td_2_2">2,087</td>
                    <td id="td_3_3">1,972</td>
                </tr>
                <tr>
                    <td id="td_3_1">Esslingen</td>
                    <td id="td_3_2">2,014</td>
                    <td id="td_3_3" class="highlight">1,932</td>
                </tr>
                <tr>
                    <td id="td_4_1" class="meine-stadt">Nürtingen</td>
                    <td id="td_4_2" class="meine-stadt highlight">1,979</td>
                    <td id="td_4_3" class="meine-stadt">1,899</td>
                </tr>
            </table>
  </xmp>`,
        contentIsHTML: true,
    },
];

let validationFuncs = [
    function () {
        return hasSelectorStyleValue(".meine-stadt", "border-color", "red");
    },
    function () {
        return hasSelectorStyleValue(".meine-stadt", "border-width", "2px");
    },
    function () {
        return hasSelectorStyleValue(".meine-stadt", "border-style", "dotted");
    },
    function () {
        return hasSelectorStyleValue(".highlight", "background-color", "green");
    },
    function () {
        return hasSelectorStyleValue(".highlight", "color", "white");
    },
    function () {
        return elHasCSSClass("td_4_1", "meine-stadt");
    },
    function () {
        return elHasCSSClass("td_4_2", "meine-stadt");
    },
    function () {
        return elHasCSSClass("td_4_3", "meine-stadt");
    },
    function () {
        return elHasCSSClass("td_4_2", "highlight");
    },
    function () {
        return elHasCSSClass("td_3_3", "highlight");
    },
];

let exerciseBase = new Exercise(
    exerciseID,
    instructions,
    tips,
    validationFuncs
);
window.onload = exerciseBase.init();
