import { Exercise } from "../exercise/exercise_base.js";
import {
    elementIsCorrectTag,
    elHasCorrectStyleValue, hasCorrectStyleValue
} from "../exercise/validation_helper.js";

let exerciseID = "07_css_grundlagen";

let instructions = `
<ol>
<li>Bearbeite die HTML Datei so, dass die Hintergrundfarbe der Überschrift (PMHS Blog) <em>DarkSlateGray</em> (Hex: #2F4F4F) und die Schriftfarbe <em>weiß</em> ist.</li>
<li>Richte die Überschrift zentriert aus</li>
<li>Setze die Schriftfarbe des Links auf <em>#ff0000</em></li>
<li>Setze die Schriftfamilie des ersten Paragraphen auf <em>Arial</em>. Gib als ersten Fallback die Schriftfamilie <em>Helvetica</em> und als letzten Fallback <em>sans</em> an!</li>
<li>Setze die Schriftgröße des Links auf die 24px</li>
<li>Setze die Strichstärke (font-weight) des Links auf 700.</li>
<li>Füge zum zweiten Paragraphen einen Aussenabstand nach oben von 15px ein.</li>.
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
        contentIsHTML: true,
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
        return elementIsCorrectTag("h11", "h1");
    },
    function () {
        return hasCorrectStyleValue("h11", "text-align", `center`);
    },
    function () {
        return hasCorrectStyleValue(
            "h11",
            "background-color",
            "rgb(47, 79, 79)"
        );
    },
    function () {
        return hasCorrectStyleValue("h11", "color", "rgb(255, 255, 255)");
    },
    function () {
        return hasCorrectStyleValue("a1", "color", "rgb(255, 0, 0)");
    },
    function () {
        return elHasCorrectStyleValue(
            document.getElementById("p1"),
            "p1",
            "font-family",
            `Arial, Helvetica, sans-serif`
        );
    },
    function () {
        return hasCorrectStyleValue("a1", "font-weight", "700");
    },
    function () {
        return hasCorrectStyleValue("a1", "font-size", `24px`);
    },
];

let exerciseBase = new Exercise(
    exerciseID,
    instructions,
    tips,
    validationFuncs
);
window.onload = exerciseBase.init();
