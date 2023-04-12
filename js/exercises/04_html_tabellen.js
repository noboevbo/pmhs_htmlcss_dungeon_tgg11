import { Exercise } from '../exercise/exercise_base.js';
import { checkTableContent, elementIsCorrectTag } from '../exercise/validation_helper.js';

let exerciseID = "04_html_tabellen";

let instructions = {
  content: "/js/exercises/markdown/04_html_tabellen/description.md",
  isMarkdown: true
}

let infos = [
  {
      markdown: "/js/exercises/markdown/04_html_tabellen/info.md",
      contentIsMarkdown: true,
  },
]
let tips = [
  {
      level: 1,
      markdown: "/js/exercises/markdown/04_html_tabellen/tip_1.md",
      contentIsMarkdown: true,
  },
  {
      level: 3,
      markdown: "/js/exercises/markdown/04_html_tabellen/tip_solution.md",
      contentIsMarkdown: true,
  }
]

let tableContent = [
  [{ value: "Schüler", type: "th" }, { value: "Alter", type: "th" }, { value: "Note", type: "th" }],
  [{ value: "Alice", type: "td" }, { value: "17", type: "td" }, { value: "3", type: "td" }],
  [{ value: "Bob", type: "td" }, { value: "19", type: "td" }, { value: "2", type: "td" }],
  [{ value: "Eve", type: "td" }, { value: "18", type: "td" }, { value: "1", type: "td" }]]

let validationFuncs = [
  function () { return elementIsCorrectTag("tabelle1", "table"); },
  function () { return checkTableContent("tabelle1", tableContent); },
]

let exerciseBase = new Exercise(exerciseID, instructions, infos, tips, validationFuncs);
exerciseBase.init();