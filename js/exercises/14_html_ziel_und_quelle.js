import { Exercise } from '../exercise/exercise_base.js';
import { elAttributeIs, elementIsCorrectTag, linkContentIsCorrect, linkTargetIsCorrect } from '../exercise/validation_helper.js';

let exerciseID = "14_html_ziel_und_quelle";

let instructions = {
  content: "/js/exercises/markdown/14_html_ziel_und_quelle/aufgabe_html_ziel_und_quelle.md",
  isMarkdown: true
}

let infos = [
  {
    title: "Text",
    markdown: "/js/exercises/markdown/14_html_ziel_und_quelle/aufgabe_html_ziel_und_quelle.md",
    contentIsMarkdown: true,
    weblinks: [
      "https://www.w3schools.com/tags/tag_a.asp",
      "https://www.w3schools.com/tags/tag_img.asp",
    ],
  },
]

let tips = [
  {
    level: 1,
    title: "Video: HTML Links & Pfade.",
    content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/DHX4U4oKSLA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Tutorials/Links", "https://wiki.selfhtml.org/wiki/HTML/Tutorials/Links/Referenzieren_in_HTML", "https://www.w3schools.com/html/html_links.asp"],
    contentIsHTML: true
  },
  { level: 1, title: "Aufbau von HTML Links.", content: `HTML Links werden über das anchor (<a>-Tag) Element erstellt. Dieses benötigt das Attribut href, in dem das Ziel (z.B. eine URL oder ein Dateipfad) angegeben wird. Der Inhalt des Elements ist dann der Text, der auf der Website angezeigt werden soll, ein Beispiel wäre: <xmp><a href="https://www.pmhs.de/">PMHS Website</a></xmp>Um lokale Dateien (also Dateien auf dem PC auf dem auch die Website liegt) einzubinden sollten relative Pfade verwendet werden. Sieh dir dafür am besten den ersten Link an, dort findet ihr gute Beispiele! Die anderen Links helfen dir ansonsten sicher auch weiter.`, weblinks: ["https://www.akademie.de/de/wissen/html-lernen-1-grundlagen/relative-pfade", "https://wiki.selfhtml.org/wiki/HTML/Tutorials/Links", "https://wiki.selfhtml.org/wiki/HTML/Tutorials/Links/Referenzieren_in_HTML", "https://www.w3schools.com/html/html_links.asp"], contentIsHTML: true },
  {
    level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <a id="einlink" href="https://wiki.selfhtml.org", target="_blank">selfhtml</a>
  <img id="bild1" src="static/Boxmodell-detail.png" alt="Das CSS-Boxmodell.">
  <img id="bild2" src="../img/00_tutorial-code-screenshot.png" alt="Screenshot vom Aufgabencode">
  </xmp>`, contentIsHTML: true
  }
]

let validationFuncs = [
  function () { return elementIsCorrectTag("einlink", "a"); },
  function () { return linkTargetIsCorrect("einlink", "https://wiki.selfhtml.org"); },
  function () { return linkContentIsCorrect("einlink", "selfhtml"); },
  function () { return elAttributeIs("bild1", "src", "https://www.pmhs.de/wp-content/uploads/TG_GMT_PMHS-2.png") },
  function () { return elAttributeIs("bild1", "alt", "TG Werbung: Berufswünsche") }
]

let exerciseBase = new Exercise(exerciseID, instructions, infos, tips, validationFuncs);
window.onload = exerciseBase.init();
