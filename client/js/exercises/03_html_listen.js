import { elementIsChildOf, elementIsCorrectTag, getFailResultObj, getSuccessResultObj, innerTextEquals, innerTextStartsWith, isBlockElement, isInlineElement, listHasMinElements } from '../exercise/validation_helper.js';
import { Exercise } from '../exercise/exercise_base.js';

let exerciseID = "03_html_listen";
let instructions = `
<ol>
<li>Erstelle eine ungeordnete Liste mit mindestens drei Einträgen! Das Listenelement soll die <strong>id</strong> <em>ungeordneteliste</em> haben.</li>
<li>Erstelle eine geordnete Liste mit mindestens drei Einträgen! Das Listenelement soll die <strong>id</strong> <em>geordneteliste</em> haben.</li>
<li>Erstelle eine ungeordnete Liste mit mindestens zwei Einträgen, die im dritten Eintrag der geordneten Liste <em>geordneteliste</em> enthalten ist (verschachtelte Liste)! Die neue Liste soll die <strong>id</strong> <em>listeebene2</em> haben!
</ol>
`

let tips = [
  {level: 0, title: "Video: HTML Einführung: Elemente, Tags und Attribute", content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/mjYKVJBGz9s" title="YouTube video player" frameborder="0" allowfullscreen></iframe>`, weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Tutorials/Listen/Aufz%C3%A4hlungslisten"], contentIsHTML: true},
  {level: 2, title: "Listen erstellen", content: "Eine geordnete Liste wird mit dem ol-Tag (OrderedList) erstellt, eine ungeordnete mit dem ul-Tag (UnorderedList). In diesem Tag werden dann Listenelemente benötigt, diese werden mit dem li-Element (ListItem) erstellt.", weblinks: ["https://developer.mozilla.org/de/docs/Web/HTML/Element/ol", "https://wiki.selfhtml.org/wiki/HTML/Tutorials/Listen/Aufz%C3%A4hlungslisten#li"]},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <ul id="ungeordneteliste">
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>

  <ol id="geordneteliste">
    <li>1</li>
    <li>2</li>
    <li>3
      <ul id="listeebene2">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      <ul>
    </li>
  </ol>
  </xmp>`, contentIsHTML: true}
]

// var spielername = "";

// function checkPlayerName() {
//   let playerEl = document.getElementById("spielertext");
//   let fats = playerEl.querySelectorAll("b,strong");
//   if (fats.length === 0) {
//     return getFailResultObj(`Es wurde kein fett gedruckter Spielername gefunden.`)
//   } else if (fats.length > 1) {
//     return getFailResultObj(`Spielername unklar. Mehr als ein fettgedrucktes Wort gefunden.`)
//   } else {
//     spielername = fats[0].innerText;
//   }
//   return getSuccessResultObj();
// }

let validationFuncs = [
  function() { return elementIsCorrectTag("ungeordneteliste", "ul"); },
  function() { return listHasMinElements("ungeordneteliste", 3); },
  function() { return elementIsCorrectTag("geordneteliste", "ol"); },
  function() { return listHasMinElements("geordneteliste", 3); },
  function() { return elementIsCorrectTag("listeebene2", "ul"); },
  function() { return listHasMinElements("listeebene2", 3); },
  function() { return elementIsChildOf("listeebene2", "geordneteliste")}
  // function() { return isInlineElement("inlinelement"); },
  // function() { return isBlockElement("blockelement"); },
]

let exercise = new Exercise(exerciseID, instructions, tips, validationFuncs);
window.onload = exercise.init();
