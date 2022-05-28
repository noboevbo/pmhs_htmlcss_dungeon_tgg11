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
        level: 0,
        title: "Video: CSS Typ-Selektoren",
        content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/gg167ZBoUTw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        weblinks: [
            "https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/einfacher_Selektor",
            "https://www.w3schools.com/css/css_selectors.asp",
            "https://www.w3schools.com/cssref/sel_id.asp",
        ],
        contentIsHTML: true,
    },
    {
        level: 2,
        title: "Benötigte Elemente und Styles",
        content: `<ul>
          <li>style-Element innerhalb von head.</li>
        <li>Auswahl ID "benzinpreis-tabelle": #benzinpreis-tabelle { ... }</li>
        <li>ID-Attribut im HTML Element table setzen: id="benzinpreis-tabelle"</li>
        <li>100% Breite verwenden: width: 100%;</li>
  </ul>
  `,
        weblinks: [
            "https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/einfacher_Selektor",
            "https://www.w3schools.com/css/css_selectors.asp",
            "https://www.w3schools.com/cssref/sel_id.asp",
        ],
        contentIsHTML: true,
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
