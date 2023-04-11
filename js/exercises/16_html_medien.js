import { Exercise } from '../exercise/exercise_base.js';
import { elAttributeValueRegex, elCheckAttributeValue, elChildElAttributeIs, elContainsInnerHTML, elementIsCorrectTag, or } from '../exercise/validation_helper.js';

let exerciseID = "16_html_medien";

let instructions = {
  content: "/js/exercises/markdown/16_html_medien/description.md",
  isMarkdown: true
}

let infos = [
  {
    title: "Text",
    markdown: "/js/exercises/markdown/16_html_medien/info.md",
    contentIsMarkdown: true,
  },
]

let tips = [
  {
    level: 1,
    title: "Video auf 100% Breite setzen",
    markdown: "/js/exercises/markdown/16_html_medien/tip_1.md",
    contentIsMarkdown: true,
  },
  {
    level: 1,
    title: "Steuerelemente wie Play/Pause anzeigen",
    markdown: "/js/exercises/markdown/16_html_medien/tip_2.md",
    contentIsMarkdown: true,
  },
  {
    level: 2,
    title: "Benötigte relative Pfade",
    markdown: "/js/exercises/markdown/16_html_medien/tip_3.md",
    contentIsMarkdown: true,
  },
  {
    level: 3,
    title: "Lösung anzeigen",
    markdown: "/js/exercises/markdown/16_html_medien/tip_solution.md",
    contentIsMarkdown: true,
  },
]

let validationFuncs = [
  function () { return elementIsCorrectTag("video1", "video"); },
  function () { return or([elChildElAttributeIs("video1", "source", "src", "static/sample.mp4"), elChildElAttributeIs("video1", "source", "src", "/aufgaben/static/sample.mp4")]) },
  function () { return elContainsInnerHTML("video1", "Dein Browser unterstützt dieses Video nicht.") },
  function () { return elCheckAttributeValue("video1", "width", "100%") },
  function () { return elCheckAttributeValue("video1", "controls", "") },
  function () { return elementIsCorrectTag("audio1", "audio"); },
  function () { return or([elChildElAttributeIs("audio1", "source", "src", "static/airtone_-_shimmer_1.mp3"), elChildElAttributeIs("audio1", "source", "src", "/aufgaben/static/airtone_-_shimmer_1.mp3")]) },
  function () { return elContainsInnerHTML("audio1", "Dein Browser unterstützt diese Audiodatei nicht.") },
  function () { return elCheckAttributeValue("audio1", "controls", "") },
  function () { return elementIsCorrectTag("youtube1", "iframe"); },
  function () { return elAttributeValueRegex("youtube1", "src", "http.*youtube"); },
]

let exerciseBase = new Exercise(exerciseID, instructions, infos, tips, validationFuncs);
exerciseBase.init();