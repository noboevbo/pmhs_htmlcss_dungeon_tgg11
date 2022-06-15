import { Exercise } from "../exercise/exercise_base.js";
import {
    hasSelectorStyleValue, or
} from "../exercise/validation_helper.js";

let exerciseID = "08_css_typ-selektor";

let instructions = `
<ol>
<li>Füge einen CSS-Regelsatz für alle TableData (td) Elemente hinzu.</li>
<li>Füge in diesem die CSS Deklaration <em>border: 1px solid black</em> ein, um einen schwarzen Rand um alle td-Elemente zu legen.</li>
<li>Wende den Rand auch auf die TableHead (th) Zellen an (Tipp: Nur der Selektor muss angepasst werden).</li>
<li>Füge noch einen CSS-Regelsatz für alle th-Elemente ein.</li>
<li>Füge in diesem die CSS Deklaration <em>font-weight: bold</em> ein, um den Text in th-Zellen fett zu drucken.</li>
</ol>
`;

let infos = [
    {
        title: "Text",
        markdown: "/js/exercises/markdown/CSS_Typselektoren.md",
        contentIsMarkdown: true,
        weblinks: [
            "https://www.w3schools.com/cssref/sel_element.asp",
            "https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/einfacher_Selektor",
            "https://www.w3schools.com/css/css_selectors.asp",
        ],
    },
    {
        title: "Video",
        content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/H9lYGiNAAYQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        weblinks: [
            "https://www.w3schools.com/cssref/sel_element.asp",
            "https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/einfacher_Selektor",
            "https://www.w3schools.com/css/css_selectors.asp",
        ],
        contentIsHTML: true,
    },
]

let tips = [
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
    infos,
    tips,
    validationFuncs
);
window.onload = exerciseBase.init();
