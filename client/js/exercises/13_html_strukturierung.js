import {
    elementIsCorrectTag,
    elementsExist,
    or,
} from "../exercise/validation_helper.js";
import { Exercise } from "../exercise/exercise_base.js";
let exerciseID = "13_html_strukturierung";

let instructions = `
<ol>
<li>Erstelle eine Website mit folgenden Inhalten. Es sollen semantische HTML5-Tags für die entsprechenden Bereiche verwendet werden!</li>
<li>Eine Kopfzeile mit einer Überschrift erster Ordnung</li>
<li>Hauptteil mit folgenden Inhalten: <ol>
<li>Erster Blogpost mit einer Überschrift zweiter Ordnung sowie einem Paragraphen mit Blindtext.</li>
<li>Zweiter Blogpost mit einer Überschrift zweiter Ordnung sowie einem Paragraphen mit Blindtext.</li>
</ol></li>
<li>Eine Fußzeile in der mit kleinerem Text das Copyright Symbol und dahinter das Jahr sowie ein beliebiger Name steht.</li>
<li>Tipp: Blindtexte kann man z.B. auf <a href="https://corporatelorem.kovah.de/">https://corporatelorem.kovah.de/</a> finden.</li>
</ol>
`;

let tips = [
    {
        level: 1,
        title: "Strukturelemente",
        content: `HTML bietet seit der Version 5 diverse Elemente zur semantischen Strukturierung von Websites. Auf den verlinkten Websites findest du weitere Informationen zu den Tags und wie sie verwendet werden können um Inhalte zu strukturieren.`,
        weblinks: [
            "https://wiki.selfhtml.org/wiki/HTML/Tutorials/HTML5/Seitenstrukturierung",
            "https://www.w3schools.com/html/html5_semantic_elements.asp",
        ],
    },
    {
        level: 2,
        title: "Benötigte Elemente um die Aufgabe zu lösen.",
        content:
            "Um diese Aufgabe zu lösen benötigst du für die Kopfzeile das <em>header</em>-Element, für den Hauptteil das <em>main</em>-Element, für die Fußzeile das <em>footer</em>-Element und die Blogposts sollen in einem <em>article</em>-Element umgesetzt werden. Für die Textformatierungen werden <em>h1</em>-, <em>h2</em>-, <em>p</em>- und <em>small</em>-Elemente benötigt. Weitere Infos findest du auf den verlinkten Websites.",
        weblinks: [
            "https://wiki.selfhtml.org/wiki/HTML/Tutorials/HTML5/Seitenstrukturierung",
            "https://www.w3schools.com/html/html5_semantic_elements.asp",
        ],
        contentIsHTML: true,
    },
    {
        level: 3,
        title: "Lösung anzeigen",
        content: `Die Lösung ist: <xmp>
  <header>
    <h1>Mein Blo[ck]g</h1>
  </header>
  <main>
    <article>
      <h2>Ein Blogeintrag</h2>
      <p>TheThe moment I fully grasped the danger of my situation in the opening few hours of Cyberpunk 2077, I had just opted to take a hit of a particularly dodgy illegal substance. The drug came from a junkie gangster with a spider-like face full of red cybernetic eyes. His name, he insisted, was Dum Dum. As a street kid, my chosen "life path" in the game, I recognized the name of the aerosolized adrenaline-booster and was able to chat cordially with our frightening host about it. Had I come from a corporate background or been a wandering nomad type passing through Night City, I might not have known.</p>
    </article>
    <article>
      <h2>Zweiter Blogeintrag</h2>
      <p>It’s an eclectic lineup, but it’s also one that includes some of the developer’s more influential games. San Andreas is the biggest of the trio and arguably is the most beloved game in the GTA series. It introduced the world to the fictional version of California that would also be the setting for the best-selling Grand Theft Auto V. Midnight Club: Los Angeles, meanwhile, is a racer that came out in 2008, and at present, it’s the last title in the series to be released, while Table Tennis is a shockingly in-depth look at the sport from a developer best-known for violent action games.</p>
    </article>
  </main>
  <footer>
    <small>© 2022 Alice</small>
  </footer>
  </xmp>`,
        contentIsHTML: true,
        weblinks: [
            "https://wiki.selfhtml.org/wiki/HTML/Tutorials/HTML5/Seitenstrukturierung",
            "https://www.w3schools.com/html/html5_semantic_elements.asp",
        ],
    },
];

let validationFuncs = [
    function () {
        return elementsExist("header", 1, false);
    },
    function () {
        return elementsExist(
            "h1",
            1,
            false,
            document.getElementsByTagName("header")[0]
        );
    },
    function () {
        return elementsExist("main", 1, false);
    },
    function () {
        return elementsExist("footer", 1, false);
    },
    function () {
        return elementsExist(
            "article",
            2,
            true,
            document.getElementsByTagName("main")[0]
        );
    },
    function () {
        return elementsExist(
            "h2",
            2,
            true,
            document.getElementsByTagName("main")[0]
        );
    },
    function () {
        return elementsExist(
            "p",
            2,
            true,
            document.getElementsByTagName("main")[0]
        );
    },
    function () {
        return elementsExist(
            "small",
            1,
            false,
            document.getElementsByTagName("footer")[0]
        );
    },
];

let exerciseBase = new Exercise(
    exerciseID,
    instructions,
    tips,
    validationFuncs
);
window.onload = exerciseBase.init();
