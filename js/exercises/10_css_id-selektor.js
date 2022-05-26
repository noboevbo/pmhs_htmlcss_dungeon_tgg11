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

let exerciseID = "10_css_id-selektor";

let instructions = `
<ol>
<li>Gib dem Tabellenelement die ID <em>benzinpreis-tabelle</em>.</li>
<li>Erstelle einen CSS-Regelsatz für das Tabellen-Element mit der ID <em>benzinpreis-tabelle</em>.</li>
<li>Füge diesem eine Regel hinzu, durch die die Tabelle eine Breite von 100% erhält.</li>
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
            #benzinpreis-tabelle {
                width: 100%;
            }
        </style>
        
        Im Body:
            <table id="benzinpreis-tabelle">
            ...
            </table>
  </xmp>`,
        contentIsHTML: true,
    },
];

let validationFuncs = [
    function () {
        return elementIsCorrectTag("benzinpreis-tabelle", "table");
    },
    function () {
        return hasSelectorStyleValue("#benzinpreis-tabelle", "width", "100%");
    },
];

let exerciseBase = new Exercise(
    exerciseID,
    instructions,
    tips,
    validationFuncs
);
window.onload = exerciseBase.init();
