import { Exercise } from '../exercise/exercise_base.js';
import { elAttributeIs, elementIsCorrectTag, linkContentContains, linkTargetIsCorrect } from '../exercise/validation_helper.js';

let exerciseID = "14_html_ziel_und_quelle";

let instructions = {
  content: "/js/exercises/markdown/14_html_ziel_und_quelle/aufgabe_html_ziel_und_quelle.md",
  isMarkdown: true
}

let infos = [
  {
    title: "Text",
    markdown: "/js/exercises/markdown/14_html_ziel_und_quelle/info_html_ziel_und_quelle.md",
    contentIsMarkdown: true,
    weblinks: [
      "https://www.w3schools.com/tags/tag_a.asp",
      "https://www.w3schools.com/tags/tag_img.asp",
    ],
  },
]

let tips = [
  {
    level: 2,
    title: "Tipp zum HTML Link",
    markdown: "/js/exercises/markdown/14_html_ziel_und_quelle/tip1_html_link.md",
    contentIsMarkdown: true,
    weblinks: [
      "https://www.w3schools.com/html/html_links.asp",
      "https://wiki.selfhtml.org/wiki/HTML/Tutorials/Links/Referenzieren_in_HTML"
    ],
  },
  {
    level: 2,
    title: "Tipp zum HTML Bild",
    markdown: "/js/exercises/markdown/14_html_ziel_und_quelle/tip2_html_bild.md",
    contentIsMarkdown: true,
    weblinks: [
      "https://www.w3schools.com/tags/tag_img.asp",
      "https://wiki.selfhtml.org/wiki/HTML/Elemente/img"
    ],
  },
  {
    level: 3,
    title: "Lösung anzeigen",
    markdown: "/js/exercises/markdown/14_html_ziel_und_quelle/tip3_loesung.md",
    contentIsMarkdown: true,
    weblinks: [
    ],
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
