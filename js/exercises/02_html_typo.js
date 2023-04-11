import { Exercise } from '../exercise/exercise_base.js';
import { elementIsCorrectTag, elementsExist, or } from '../exercise/validation_helper.js';
;

let exerciseID = "02_html_typo";

let instructions = {
  content: "/js/exercises/markdown/02_html_typo/description.md",
  isMarkdown: true
}

let infos = [

]

let tips = [
  {
      level: 1,
      title: "Texte im Paragraphen markieren",
      markdown: "/js/exercises/markdown/02_html_typo/tip_1.md",
      contentIsMarkdown: true,
  },
  {
      level: 2,
      title: "IDs einfügen",
      markdown: "/js/exercises/markdown/02_html_typo/tip_2.md",
      contentIsMarkdown: true,
  },
  {
      level: 3,
      title: "Lösung anzeigen",
      markdown: "/js/exercises/markdown/02_html_typo/tip_solution.md",
      contentIsMarkdown: true,
  }
]

let validationFuncs = [
  function () { return elementIsCorrectTag("auszeichnungen", "p"); },
  function () { return elementsExist("strong", 1, true); },
  function () { return or([elementsExist("em", 1, true), elementsExist("i", 1, true)]); },
  function () { return or([elementsExist("strong", 1, true), elementsExist("b", 1, true)]); },
  function () { return or([elementsExist("u", 1, true), elementsExist("ins", 1, true)]); },
  function () { return elementsExist("del", 1, true) },
  function () { return elementsExist("br", 1, true); },
  function () { return elementsExist("hr", 1, true); },
]

let exerciseBase = new Exercise(exerciseID, instructions, infos, tips, validationFuncs);
exerciseBase.init();