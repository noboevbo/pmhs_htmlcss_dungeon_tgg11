import { Exercise } from '../exercise/exercise_base.js';
import { elementIsChildOf, elementIsCorrectTag, listHasMinElements } from '../exercise/validation_helper.js';

let exerciseID = "03_html_listen";
let instructions = {
  content: "/js/exercises/markdown/03_html_listen/description.md",
  isMarkdown: true
}

let infos = [
  {
      title: "Video: HTML Listen",
      markdown: "/js/exercises/markdown/03_html_listen/info.md",
      contentIsMarkdown: true,
  },
]
let tips = [
  {
      level: 1,
      title: "Texte im Paragraphen markieren",
      markdown: "/js/exercises/markdown/03_html_listen/tip_1.md",
      contentIsMarkdown: true,
  },
  {
      level: 2,
      title: "IDs einfügen",
      markdown: "/js/exercises/markdown/03_html_listen/tip_2.md",
      contentIsMarkdown: true,
  },
  {
      level: 3,
      title: "Lösung anzeigen",
      markdown: "/js/exercises/markdown/03_html_listen/tip_solution.md",
      contentIsMarkdown: true,
  }
]

let validationFuncs = [
  function () { return elementIsCorrectTag("ungeordneteliste", "ul"); },
  function () { return listHasMinElements("ungeordneteliste", 3); },
  function () { return elementIsCorrectTag("geordneteliste", "ol"); },
  function () { return listHasMinElements("geordneteliste", 3); },
  function () { return elementIsCorrectTag("listeebene2", "ul"); },
  function () { return listHasMinElements("listeebene2", 3); },
  function () { return elementIsChildOf("listeebene2", "geordneteliste") }
  // function() { return isInlineElement("inlinelement"); },
  // function() { return isBlockElement("blockelement"); },
]

let exerciseBase = new Exercise(exerciseID, instructions, infos, tips, validationFuncs);
exerciseBase.init();
