import { getUpdatePlayerNameMessage } from '../core/event_message_factory.js';
import { Exercise } from '../exercise/exercise_base.js';
import { elementIsCorrectTag, getFailResultObj, getSuccessResultObj, innerTextEquals, innerTextStartsWith } from '../exercise/validation_helper.js';

let exerciseID = "01_html_tags";

let instructions = {
  content: "/js/exercises/markdown/01_html_tags/description.md",
  isMarkdown: true
}

let infos = [
  {
      title: "Video: HTML Elemente, Tags & Attribute",
      markdown: "/js/exercises/markdown/01_html_tags/info.md",
      contentIsMarkdown: true,
  },
]

let tips = [
  {
      level: 1,
      title: "Überschrift / Paragraphen erstellen",
      markdown: "/js/exercises/markdown/01_html_tags/tip_1.md",
      contentIsMarkdown: true,
  },
  {
      level: 2,
      title: "IDs einfügen",
      markdown: "/js/exercises/markdown/01_html_tags/tip_2.md",
      contentIsMarkdown: true,
  },
  {
      level: 3,
      title: "Lösung anzeigen",
      markdown: "/js/exercises/markdown/01_html_tags/tip_solution.md",
      contentIsMarkdown: true,
  }
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
  function () { return elementIsCorrectTag("hauptueberschrift", "h1"); },
  function () { return innerTextEquals("hauptueberschrift", "Dungeon Run 1"); },
  function () { return elementIsCorrectTag("spielertext", "p"); },
  function () { return innerTextStartsWith("spielertext", "Spielername: "); },
  function () { return checkPlayerName(); },
]

class ExerciseA extends Exercise {
  constructor(exerciseID, instructions, infos, tips, validationFuncs) {
    super(exerciseID, instructions, infos, tips, validationFuncs);
  }

  afterSuccess() {
    let msg = getUpdatePlayerNameMessage()
    msg.playerName = spielername
    window.parent.postMessage(msg, window.origin);
  }
}

let exerciseBase = new ExerciseA(exerciseID, instructions, infos, tips, validationFuncs);
exerciseBase.init();
