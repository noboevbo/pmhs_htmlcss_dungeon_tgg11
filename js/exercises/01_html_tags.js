import { elementIsCorrectTag, getFailResultObj, getSuccessResultObj, innerTextEquals, innerTextStartsWith, isBlockElement, isInlineElement, listHasMinElements } from '../exercise/validation_helper.js';
import { Exercise } from '../exercise/exercise_base.js';
import { getEmptyUpdatePageVariablesMessage } from '../core/event_message_factory.js';

let exerciseID = "01_html_tags";
let instructions = `
<ol>
<li>Erstelle eine Überschrift erster Ordnung mit dem Titel <em>Dungeon Run 1</em>. Die Überschrift soll die <b>id</b> <em>hauptueberschrift</em> haben.</li>
<li>Erstelle einen Paragraphen, mit dem Text <em>Spielername: DEINSPIELERNAME</em>, erstetze <em>DEINSPIELERNAME</em> dabei mit einem beliebigen Namen. Der Paragraph soll die ID <em>spielertext</em> haben.</li>
<li>Der Spielername soll mithilfe eines HTML-Elements <strong>fett</strong> dargestellt werden.</li>
<li>Erstelle eine geordnete Liste mit mindestens drei Einträgen! Das Listenelement soll die ID <em>dieliste</em> haben.</li>
</ol>
`

let tips = [
  {level: 1, title: "Video: HTML Einführung: Elemente, Tags und Attribute", content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/4IZYV5vVO2Y" title="YouTube video player" frameborder="0" allowfullscreen></iframe>`, weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Tutorials/Element,_Tag_und_Attribut"], contentIsHTML: true},
  {level: 1, title: "Überschrift / Paragraphen erstellen", content: "Überschriften erster Ordnung können mit dem h1 Tag erstellt werden. Paragraphen können mit dem p Tag erstellt werden.", weblinks: ["https://www.w3schools.com/tags/tag_hn.asp", "https://www.w3schools.com/html/html_paragraphs.asp"]},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <h1 id="hauptueberschrift">Dungeon Run 1</h1> 
  <p id="spielertext">Spielername: <strong>Fritz</strong></p>
  </xmp>`, contentIsHTML: true}
]

var spielername = "";

function checkPlayerName() {
  let playerEl = document.getElementById("spielertext");
  let fats = playerEl.querySelectorAll("b,strong");
  if (fats.length === 0) {
    return getFailResultObj(`Es wurde kein fett gedruckter Spielername gefunden.`)
  } else if (fats.length > 1) {
    return getFailResultObj(`Spielername unklar. Mehr als ein fettgedrucktes Wort gefunden.`)
  } else {
    spielername = fats[0].innerText;
  }
  return getSuccessResultObj();
}

let validationFuncs = [
  function() { return elementIsCorrectTag("hauptueberschrift", "h1"); },
  function() { return innerTextEquals("hauptueberschrift", "Dungeon Run 1"); },
  function() { return elementIsCorrectTag("spielertext", "p"); },
  function() { return innerTextStartsWith("spielertext", "Spielername: "); },
  function() { return checkPlayerName(); },
]

class ExerciseA extends Exercise {
  constructor(exerciseID, instructions, tips, validationFuncs) {
    super(exerciseID, instructions, tips, validationFuncs);
  }

  beforeSuccess() {
    localStorage.setItem("01_playerName", spielername);
  }
  
  afterSuccess() {
    window.parent.postMessage(getEmptyUpdatePageVariablesMessage(), window.origin);
  }
  
  beforeFail() {
    localStorage.removeItem("01_playerName");
  }
}

let exercise = new ExerciseA(exerciseID, instructions, tips, validationFuncs);
window.onload = exercise.init();