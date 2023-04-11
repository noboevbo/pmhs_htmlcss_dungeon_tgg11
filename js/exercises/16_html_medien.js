import { Exercise } from '../exercise/exercise_base.js';
import { elAttributeValueRegex, elCheckAttributeValue, elChildElAttributeIs, elContainsInnerHTML, elementIsCorrectTag, or } from '../exercise/validation_helper.js';

let exerciseID = "16_html_medien";

let instructions = {
  content: "/js/exercises/markdown/16_html_medien/aufgabe_html_medien.md",
  isMarkdown: true
}

let infos = [
  {
    title: "Text",
    markdown: "/js/exercises/markdown/16_html_medien/info_html_medien.md",
    contentIsMarkdown: true,
    weblinks: [
      "https://wiki.selfhtml.org/wiki/MIME-Type/Übersicht",
      "https://www.w3schools.com/tags/tag_video.asp",
      "https://www.w3schools.com/tags/tag_audio.asp",
      "https://support.google.com/youtube/answer/171780?hl=de"
    ],
  },
]

let tips = [
  {
    level: 1,
    title: "Video auf 100% Breite setzen",
    markdown: "/js/exercises/markdown/16_html_medien/tip_video_breite.md",
    contentIsMarkdown: true,
    weblinks: [
      "https://www.w3schools.com/tags/att_video_width.asp",
    ],
  },
  {
    level: 1,
    title: "Steuerelemente wie Play/Pause anzeigen",
    markdown: "/js/exercises/markdown/16_html_medien/tip_steuerelemente.md",
    contentIsMarkdown: true,
    weblinks: [
      "https://www.w3schools.com/tags/att_controls.asp",
    ],
  },
  {
    level: 2,
    title: "Benötigte relative Pfade",
    markdown: "/js/exercises/markdown/16_html_medien/tip_pfade.md",
    contentIsMarkdown: true,
    weblinks: [
      "https://www.akademie.de/de/wissen/html-lernen-1-grundlagen/relative-pfade",
      "https://lehre.idh.uni-koeln.de/lehrveranstaltungen/wisem20/basissysteme-der-informationsverarbeitung-1-bsi-4/web-technologien/html-1/relative-vs-absolute-pfade/",
    ],
  },
  {
    level: 3,
    title: "Lösung anzeigen",
    markdown: "/js/exercises/markdown/16_html_medien/tip_loesung.md",
    contentIsMarkdown: true,
    weblinks: [
    ],
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