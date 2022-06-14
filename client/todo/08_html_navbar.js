import { elementIsCorrectTag, elementIsDirectChildOf, getFailResultObj, elementsExist, getSuccessResultObj} from '../exercise/validation_helper.js';
import { Exercise } from '../exercise/exercise_base.js';

let exerciseID = "08_html_navbar";

let instructions = `
<ol>
<li>Erstelle einen Header der Seite mit der id <em>header</em>.</li>
<li>Erstelle im Header ein Navigationselement mit der id <em>navbar</em></li>
<li>Erstelle eine ungeordnete Liste in der mindestens drei Links mit den Namen <em>Home</em>, <em>News</em> und <em>About</em> enthalten sind. Das Verweisziel der Links soll jeweils <em>#</em> (aktuelle Seite/Element bzw. nichts tun) sein. Die Liste soll die id <em>navlinks</em> erhalten.</li>
</ol>
`

let tips = [
  {level: 1, title: "Verweisziel angeben", content: `Das Verweisziel wird über das <em>href</em>-Attribut des Link Elements angegeben. Wird eine Raute (#) eingegeben passiert beim Klick auf den Link nichts. Dies wird oft während der Entwicklung verwendet, wenn das tatsächliche Linkziel noch nicht klar ist. Beispiel: <xmp><a href="#">Linkname</a></xmp> Weitere Informationen findest du auf der verlinkten Website.`, weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Tutorials/Navigation/Grundstruktur"], contentIsHTML: true},
  {level: 2, title: "Aufbau der Navigationsleiste.", content: "Die Navigationsleiste soll im Headerelement angelegt werden. In der Navigationsleiste soll dann eine ungeordnete Liste angelegt werden. In jedem Listeneintrag soll dann der entsprechende Link angelegt werden. Du brauchst also das <em>header</em>-, <em>nav</em>-, <em>ul</em>-, <em>li</em>- und <em>a</em>-Element, in dieser Reihenfolge. Weitere Informationen findest du auf der verlinkten Website.", weblinks: ["https://www.w3schools.com/html/html_paragraphs.asp"], contentIsHTML: true},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <header id="header">
    <nav id="navbar">
      <ul id="navlinks">
        <li><a href="#">Home</a></li>
        <li><a href="#">News</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </nav>
  </header>
  </xmp>`, contentIsHTML: true}
]

function checkLinks(el, targets, texts) {
  if (!el) {
    return getFailResultObj(`Navlinks nicht verfügbar. Abbruch von Linkprüfung.`)
  }
  let children = el.getElementsByTagName("li");
  let errorMsg = "";
  for (let i = 0; i<children.length; i++) {
    let li = children[i];
    let links = li.getElementsByTagName("a");
    if (links.length !== 1) {
      errorMsg += `Link Nummer ${i+1} enthält ${links.length} statt 1 Link-Element.<br>`;
      continue;
    } 
    let link = links[0];
    let href = link.getAttribute("href");
    if (!href || href !== targets[i]) {
      errorMsg += `Das Verweisziel von Link Nummer ${i+1} ist nicht korrekt.<br>`;
    }
    let text = link.innerText;
    if (!text || text !== texts[i]) {
      errorMsg += `Der Text von Link Nummer ${i+1} ist nicht korrekt.<br>`;
    }
  }
  if (errorMsg === "") {
    return getSuccessResultObj();
  }
  return getFailResultObj(errorMsg);
}

let validationFuncs = [
  function() { return elementIsCorrectTag("header", "header"); },
  function() { return elementIsCorrectTag("navbar", "nav"); },
  function() { return elementIsDirectChildOf("navbar", "header"); },
  function() { return elementIsCorrectTag("navlinks", "ul"); },
  function() { return elementIsDirectChildOf("navlinks", "navbar"); },
  function() { return elementsExist("li", 3, false, document.getElementById("navlinks")); },
  function() { return checkLinks(document.getElementById("navlinks"), ["#", "#", "#"], ["Home", "News", "About"])}
]

let exerciseBase = new Exercise(exerciseID, instructions, tips, validationFuncs);
window.onload = exerciseBase.init();