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
  <h1 id="h11" style="background-color: #2F4F4F; color: white; text-align: center;">PMHS Blog</h1>
  <p id="p1" style="font-family: Arial, Helvetica, sans-serif;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet ornare purus, vitae rhoncus purus. Donec quis nibh vulputate nisl maximus tempor. Donec eget pellentesque odio. Phasellus sed nulla et neque semper finibus. Nullam cursus libero quis vehicula ornare. Sed dictum eros eu magna fringilla, id dapibus mi condimentum. Donec euismod mauris ex, id vestibulum mi efficitur sed. Phasellus in lobortis velit, sed iaculis diam. Nunc eget sapien eget lorem aliquet elementum. Maecenas id magna et purus molestie lacinia. Aenean gravida leo ut metus pellentesque sagittis. Sed in nisi ut ex sodales pharetra in eget orci. Ut ex nisi, laoreet nec sodales eu, tincidunt sed risus.
  </p>
  <p id="p2">Hier geht es direkt <a id="a1" href="https://www.pmhs.de" style="color: #ff0000; font-size: 24px; font-weight: 700;">zur PMHS</a>!</p>
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
        return hasSelectorStyleValue("th", "border-color", "black");
    },
    function () {
        return hasSelectorStyleValue("th", "border-width", "1px");
    },
    function () {
        return hasSelectorStyleValue("th", "border-style", "solid");
    },
];

let exerciseBase = new Exercise(
    exerciseID,
    instructions,
    tips,
    validationFuncs
);
window.onload = exerciseBase.init();
