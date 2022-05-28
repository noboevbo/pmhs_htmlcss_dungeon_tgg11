import {
    elementIsCorrectTag,
    elHasCorrectStyleValue,
    elementsExist,
    checkTableContent,
    or,
    hasCorrectStyleValue,
    hasQuerySelectorCorrectStyleValue,
    cssContains,
    hasSelectorStyleValue,
} from "../exercise/validation_helper.js";
import { Exercise } from "../exercise/exercise_base.js";

let exerciseID = "08_css_typ-selektor";

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
        level: 0,
        title: "Video: CSS Typselektoren",
        content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/fKEXIS00wKk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        weblinks: [
            "https://www.w3schools.com/cssref/sel_element.asp",
            "https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/einfacher_Selektor",
            "https://www.w3schools.com/css/css_selectors.asp",
        ],
        contentIsHTML: true,
    },
    {
        level: 2,
        title: "Benötigte Elemente und Styles",
        content: `
        <ul>
          <li>style-Element innerhalb von head.</li>
          <li>Auswahl th und td: th, td { ... }</li>
          <li>Auswahl th: th { ... }</li>
          <li>Schwarzer Rand: border: 1px solid black</li>
          <li>Fett drucken: font-weight: bold</li>
        </ul>
  `,
        weblinks: [
            "https://www.w3schools.com/cssref/sel_element.asp",
            "https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/einfacher_Selektor",
            "https://www.w3schools.com/css/css_selectors.asp",
        ],
        contentIsHTML: true,
    },
    {
        level: 3,
        title: "Lösung anzeigen",
        content: `Die Lösung ist: <xmp>
  <style>
      td,
      th {
          border: 1px solid black;
      }
  
      th {
          font-weight: bold;
      }
  </style>
  </xmp>`,
        contentIsHTML: true,
    },
];

let validationFuncs = [
    function () {
        return hasSelectorStyleValue("td", "border-color", "black");
    },
    function () {
        return hasSelectorStyleValue("td", "border-width", "1px");
    },
    function () {
        return hasSelectorStyleValue("td", "border-style", "solid");
    },
    function () {
        return hasSelectorStyleValue("td", "font-weight", ""); // No font weight in td!
    },
    function () {
        return hasSelectorStyleValue("th", "border-color", "black");
    },
    function () {
        return hasSelectorStyleValue("th", "border-width", "1px");
    },
    function () {
        return hasSelectorStyleValue("th", "border-style", "solid");
    },
    function () {
        return or([
            hasSelectorStyleValue("th", "font-weight", "700"),
            hasSelectorStyleValue("th", "font-weight", "bold"),
        ]);
    },
];

let exerciseBase = new Exercise(
    exerciseID,
    instructions,
    tips,
    validationFuncs
);
window.onload = exerciseBase.init();
