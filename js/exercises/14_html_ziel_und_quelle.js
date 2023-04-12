import { Exercise } from '../exercise/exercise_base.js';
import { elAttributeIs, elementIsCorrectTag, linkContentContains, linkTargetIsCorrect } from '../exercise/validation_helper.js';

let exerciseID = "14_html_ziel_und_quelle";

let instructions = {
  content: "/js/exercises/markdown/14_html_ziel_und_quelle/description.md",
  isMarkdown: true
}

let infos = [
  {
    markdown: "/js/exercises/markdown/14_html_ziel_und_quelle/info.md",
    contentIsMarkdown: true
  },
]

let tips = [
  {
    level: 2,
    markdown: "/js/exercises/markdown/14_html_ziel_und_quelle/tip_1.md",
    contentIsMarkdown: true,
  },
  {
    level: 2,
    markdown: "/js/exercises/markdown/14_html_ziel_und_quelle/tip_2.md",
    contentIsMarkdown: true,
  },
  {
    level: 3,
    markdown: "/js/exercises/markdown/14_html_ziel_und_quelle/tip_solution.md",
    contentIsMarkdown: true,
  },
]

let validationFuncs = [
  function () { return elementIsCorrectTag("link1", "a"); },
  function () { return linkTargetIsCorrect("link1", "https://www.w3schools.com/html/default.asp"); },
  function () { return linkContentContains("link1", "w3schools: HTML Informationen"); },
  function () { return elAttributeIs("bild1", "src", "https://www.pmhs.de/wp-content/uploads/TG_GMT_PMHS-2.png") },
  function () { return elAttributeIs("bild1", "alt", "TG Werbung: Berufswünsche") }
]

let exerciseBase = new Exercise(exerciseID, instructions, infos, tips, validationFuncs);
exerciseBase.init();
