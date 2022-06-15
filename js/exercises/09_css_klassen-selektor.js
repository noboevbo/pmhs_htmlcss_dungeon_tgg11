import { Exercise } from "../exercise/exercise_base.js";
import {
    elHasCSSClass, hasSelectorStyleValue
} from "../exercise/validation_helper.js";

let exerciseID = "09_css_klassen-selektor";

let instructions = `
<ol>
<li>Erstelle einen CSS Regelsatz für die Klasse <em>meine-stadt</em>.</li>
<li>Füge dieser Klasse die CSS Deklaration <em>border: 2px solid red;</em> hinzu.</li>
<li>Wende diese Klasse auf alle Zellen in der <strong>Reihe</strong> für die Stadt Nürtingen an.</li>
<li>Erstelle einen weiteren CSS-Regelsatz für die Klasse <em>highlight</em>, deren Style die Hintergrundfarbe auf <em>green</em> und die Schriftfarbe auf <em>white</em> setzt.</li>
<li>Wende die Klasse highlight auf den jeweils günstigsten Preis für die Spalte Super E10 und Diesel an.</li>
</ol>
`;

let infos = [
    {
        title: "Text",
        markdown: "/js/exercises/markdown/CSS_Klassenselektoren.md",
        contentIsMarkdown: true,
        weblinks: [
            "https://www.w3schools.com/cssref/sel_class.asp",
            "https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/einfacher_Selektor",
            "https://www.w3schools.com/css/css_selectors.asp",
        ],
    },
    {
        title: "Video",
        content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/HLcfrGFKg2Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        weblinks: [
            "https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/einfacher_Selektor",
            "https://www.w3schools.com/css/css_selectors.asp",
            "https://www.w3schools.com/cssref/sel_class.asp",
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
          <li>Auswahl Klasse "highlight": .highlight { ... }</li>
          <li>Klassenattribut im HTML Element (z.B. td) setzen: class="highlight"</li>
          <li>2 Klassen im HTML Element verwenden: z.B. class="highlight meine-stadt" (Leerzeichen dazwischen)</li>
          <li>Hintergrundfarbe grün: background-color: green</li>
          <li>Schriftfarbe weiß: color: white</li>
          <li>Rand rot: border: 2px solid red;</li>
        </ul>
  `,
        weblinks: [
            "https://wiki.selfhtml.org/wiki/CSS/Tutorials/Selektoren/einfacher_Selektor",
            "https://www.w3schools.com/css/css_selectors.asp",
            "https://www.w3schools.com/cssref/sel_class.asp",
        ],
        contentIsHTML: true,
    },
    {
        level: 3,
        title: "Lösung anzeigen",
        content: `Die Lösung ist: <xmp>
        Im Head:
        <style>
                .highlight {
                    background-color: green;
                    color: white;
                }
        
                .meine-stadt {
                    border: 2px solid red;
                }
            </style>
        
        Im Body:
            <table id="benzinpreis-tabelle">
                <tr>
                    <th id="th_1_1">Stadt</th>
                    <th id="th_1_2">Super E10</th>
                    <th id="th_1_3">Diesel</th>
                </tr>
                <tr>
                    <td id="td_2_1">Berlin</td>
                    <td id="td_2_2">2,087</td>
                    <td id="td_2_3">1,972</td>
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
        return hasSelectorStyleValue(".meine-stadt", "border-style", "solid");
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
    infos,
    tips,
    validationFuncs
);
window.onload = exerciseBase.init();
