import { elementIsCorrectTag, linkTargetIsCorrect, linkContentIsCorrect, elSrcAttributeIs, or} from '../exercise/validation_helper.js';
import { Exercise } from '../exercise/exercise_base.js';

let exerciseID = "06_html_pfade";

let instructions = `
<ol>
<li>Füge einen Link zur Website https://wiki.selfhtml.org ein. Der kickbare Text soll <em>selfhtml</em> sein. Wenn man auf den Link klickt, soll sich die Website in einem neuen Tab öffnen. Das HTML-Element soll die ID <em>einlink</em> haben.</li>
<li>Füge ein img-Element ein um das Bild <em>aufgaben/static/Boxmodell-detail.png</em> anzuzeigen. Das Bild zeigt das CSS Boxmodell. Verwende eine relative Pfadangabe. Das HTML-Element soll die ID <em>bild1</em> haben.</li>
<li>Füge ein img-Element ein um das Bild <em>img/00_tutorial-code-screenshot.png</em> anzuzeigen. Das Bild zeigt einen Screenshot von Aufgabencode. Verwende eine relative Pfadangabe vom aktuellen Verzeichnis aus! Das HTML-Element soll die ID <em>bild2</em> haben.</li>
</ol>
`

let tips = [
  {level: 1, title: "Video: HTML Links & Pfade.", content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/DHX4U4oKSLA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Tutorials/Links", "https://wiki.selfhtml.org/wiki/HTML/Tutorials/Links/Referenzieren_in_HTML", "https://www.w3schools.com/html/html_links.asp"], contentIsHTML: true},
  {level: 1, title: "Aufbau von HTML Links.", content: `HTML Links werden über das anchor (<a>-Tag) Element erstellt. Dieses benötigt das Attribut href, in dem das Ziel (z.B. eine URL oder ein Dateipfad) angegeben wird. Der Inhalt des Elements ist dann der Text, der auf der Website angezeigt werden soll, ein Beispiel wäre: <xmp><a href="https://www.pmhs.de/">PMHS Website</a></xmp>Um lokale Dateien (also Dateien auf dem PC auf dem auch die Website liegt) einzubinden sollten relative Pfade verwendet werden. Sieh dir dafür am besten den ersten Link an, dort findet ihr gute Beispiele! Die anderen Links helfen dir ansonsten sicher auch weiter.`, weblinks: ["https://www.akademie.de/de/wissen/html-lernen-1-grundlagen/relative-pfade", "https://wiki.selfhtml.org/wiki/HTML/Tutorials/Links", "https://wiki.selfhtml.org/wiki/HTML/Tutorials/Links/Referenzieren_in_HTML", "https://www.w3schools.com/html/html_links.asp"], contentIsHTML: true},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <a id="einlink" href="https://wiki.selfhtml.org", target="_blank">selfhtml</a>
  <img id="bild1" src="static/Boxmodell-detail.png" alt="Das CSS-Boxmodell.">
  <img id="bild2" src="../img/00_tutorial-code-screenshot.png" alt="Screenshot vom Aufgabencode">
  </xmp>`, contentIsHTML: true}
]

let validationFuncs = [
  function() { return elementIsCorrectTag("einlink", "a"); },
  function() { return linkTargetIsCorrect("einlink", "https://wiki.selfhtml.org"); },
  function() { return linkContentIsCorrect("einlink", "selfhtml"); },
  function() { return or([elSrcAttributeIs("bild1", "/aufgaben/static/Boxmodell-detail.png"), elSrcAttributeIs("bild1", "static/Boxmodell-detail.png")]); },
  function() { return elSrcAttributeIs("bild2", "../img/00_tutorial-code-screenshot.png"); }
]

let exerciseBase = new Exercise(exerciseID, instructions, tips, validationFuncs);
window.onload = exerciseBase.init();
