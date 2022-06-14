import { Exercise } from "../exercise/exercise_base.js";
import {
    cssBorderColorNames, cssBorderStyleNames, cssBorderWidthNames, elCheckStyleSameValue
} from "../exercise/validation_helper.js";

let exerciseID = "06_css_tabellen";

let instructions = `
Die Tabelle aus Aufgabe 4 hat noch keine Ränder, daher ist sie schwer als Tabelle zu erkennen.
<ol>
<li>Nutze für die folgenden Aufgaben <em>Inline Styles</em> (Attibut: <strong>style</strong>).</li>
<li>Die Tabelle soll eine Kontur erhalten, die 2px stark ist, die Farbe <em>#ff0000</em> sowie den Style <em>solid</em> hat.</li>
<li>Jede Zelle der Tabelle soll eine Kontur erhalten, die 1px stark ist, die Farbe schwarz sowie den Style <em>solid</em> hat.</li>
</ol>
`;

let infos = [
    {
        title: "Text",
        content: `Um CSS inline anzuwenden benötigst du das <em>style</em> Attribut. Der Wert des Attributs sind dann CSS Regeln. Ein Beispiel wäre <em>style="color:red;"</em> um die Schriftfarbe auf rot zu setzen. Die CSS Eigenschaft (color) steht vor dem Doppelpunkt (:), der Wert (red) dahinter, abgeschlossen wird immer mit einem Semikolon (;).  Unten findest du einen Link, der den Aufbau eines solchen style-Attributs genauer beschreibt. Zusatztipp: Da style ein Attribut ist, schreibt man es IM Starttag.
  `,
        weblinks: [
            "https://wiki.selfhtml.org/wiki/CSS/Tutorials/Einstieg/Stylesheets_einbinden#direkt_in_einem_style-Attribut",
        ],
        contentIsHTML: true,
    },
]

let tips = [
    {
        level: 2,
        title: "Benötigte Elemente und Styles",
        content: `Du benötigst die folgenden HTML Elemente: 
  <ul>
  <li>Kontur Farbe: border-color</li>
  <li>Farbwerte: z.B. #ff0000 (je zwei Stellen für r, g und b) = rot, alternativ: einfach <em>red</em></li>
  <li>Kontur Breite: border-width</li>
  <li>Kontur Style: border-style</li>
  <li>Alternativ zusammengefasst: border (Siehe Link 1)</li>
  </ul>
  `,
        weblinks: [
            "https://developer.mozilla.org/de/docs/Web/CSS/border",
            "https://developer.mozilla.org/de/docs/Web/CSS/border-color",
            "https://developer.mozilla.org/de/docs/Web/CSS/border-style",
            "https://developer.mozilla.org/de/docs/Web/CSS/border-width",
        ],
        contentIsHTML: true,
    },
    {
        level: 3,
        title: "Lösung anzeigen",
        content: `Die Lösung ist: <xmp>
  <table id="tabelle1" style="border: 2px solid #ff0000">
    <tr id="tr_1">
      <th id="td_1_1" style="border: 1px solid #000000">Schüler</th>
      <th id="td_1_2" style="border: 1px solid #000000">Alter</th>
      <th id="td_1_3" style="border: 1px solid #000000">Note</th>
    </tr>
    <tr id="tr_2">
      <td id="td_2_1" style="border: 1px solid #000000">Alice</td>
      <td id="td_2_2" style="border: 1px solid #000000">17</td>
      <td id="td_2_3" style="border: 1px solid #000000">3</td>
    </tr>
    <tr id="tr_3">
      <td id="td_3_1" style="border: 1px solid #000000">Bob</td>
      <td id="td_3_2" style="border: 1px solid #000000">19</td>
      <td id="td_3_3" style="border: 1px solid #000000">2</td>
    </tr>
    <tr id="tr_4">
      <td id="td_4_1" style="border: 1px solid #000000">Eve</td>
      <td id="td_4_2" style="border: 1px solid #000000">18</td>
      <td id="td_4_3" style="border: 1px solid #000000">1</td>
    </tr>
  </table> 
  </xmp>`,
        contentIsHTML: true,
    },
];

let validationFuncs = [
    function () {
        return elCheckStyleSameValue(
            `tabelle1`,
            cssBorderColorNames,
            "rgb(255, 0, 0)"
        );
    },
    function () {
        return elCheckStyleSameValue(`tabelle1`, cssBorderWidthNames, "2px");
    },
    function () {
        return elCheckStyleSameValue(`tabelle1`, cssBorderStyleNames, "solid");
    },
];

for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 4; j++) {
        validationFuncs.push(function () {
            return elCheckStyleSameValue(
                `td_${i}_${j}`,
                cssBorderColorNames,
                "rgb(0, 0, 0)"
            );
        });
        validationFuncs.push(function () {
            return elCheckStyleSameValue(
                `td_${i}_${j}`,
                cssBorderWidthNames,
                "1px"
            );
        });
        validationFuncs.push(function () {
            return elCheckStyleSameValue(
                `td_${i}_${j}`,
                cssBorderStyleNames,
                "solid"
            );
        });
    }
}

let exerciseBase = new Exercise(
    exerciseID,
    instructions,
    infos,
    tips,
    validationFuncs
);
window.onload = exerciseBase.init();
