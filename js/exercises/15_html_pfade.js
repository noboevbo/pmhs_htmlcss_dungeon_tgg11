import { Exercise } from '../exercise/exercise_base.js';
import { elAttributeIs, elementIsCorrectTag, elSrcAttributeIs, linkContentContains, linkTargetIsCorrect, or } from '../exercise/validation_helper.js';

let exerciseID = "15_html_pfade";

let instructions = {
  content: "/js/exercises/markdown/15_html_pfade/description.md",
  isMarkdown: true
}

let infos = [
  {
    title: "Text",
    markdown: "/js/exercises/markdown/15_html_pfade/info.md",
    contentIsMarkdown: true,
  },
  {
    title: "Video",
    markdown: "/js/exercises/markdown/15_html_pfade/info_video.md",
    contentIsMarkdown: true,
  },
]

let tips = [
  {
    level: 1,
    markdown: "/js/exercises/markdown/15_html_pfade/tip_1.md",
    contentIsMarkdown: true
  },
  {
    level: 2,
    markdown: "/js/exercises/markdown/15_html_pfade/tip_2.md",
    contentIsMarkdown: true,
  },

  {
    level: 3,
    markdown: "/js/exercises/markdown/15_html_pfade/tip_solution.md",
    contentIsMarkdown: true,
  },
]

let validationFuncs = [
  function () { return elementIsCorrectTag("link1", "a"); },
  function () { return linkTargetIsCorrect("link1", "00_tutorial.html"); },
  function () { return linkContentContains("link1", "Zur Tutorial-Aufgabe"); },
  function () { return or([elSrcAttributeIs("bild1", "/aufgaben/static/Boxmodell-detail.png"), elSrcAttributeIs("bild1", "static/Boxmodell-detail.png")]); },
  function () { return elAttributeIs("bild1", "alt", "Das CSS-Boxmodell"); },
  function () { return elSrcAttributeIs("bild2", "../img/00_tutorial-code-screenshot.png"); },
  function () { return elAttributeIs("bild2", "alt", "Screenshot vom Aufgabencode"); },
]

let exerciseBase = new Exercise(exerciseID, instructions, infos, tips, validationFuncs);
exerciseBase.init();
