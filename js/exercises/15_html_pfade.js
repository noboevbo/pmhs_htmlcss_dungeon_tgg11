import { Exercise } from '../exercise/exercise_base.js';
import { elAttributeIs, elementIsCorrectTag, elSrcAttributeIs, linkContentContains, linkTargetIsCorrect, or } from '../exercise/validation_helper.js';

let exerciseID = "15_html_pfade";

let instructions = {
  content: "/js/exercises/markdown/15_html_pfade/aufgabe_html_pfade.md",
  isMarkdown: true
}

let infos = [
  {
    title: "Text",
    markdown: "/js/exercises/markdown/15_html_pfade/info_html_pfade.md",
    contentIsMarkdown: true,
    weblinks: [
      "https://lehre.idh.uni-koeln.de/lehrveranstaltungen/wisem20/basissysteme-der-informationsverarbeitung-1-bsi-4/web-technologien/html-1/relative-vs-absolute-pfade/",
      "https://www.w3schools.com/html/html_filepaths.asp",
      "https://www.w3schools.com/html/html_links.asp",
    ],
  },
  {
    title: "Video",
    content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/DHX4U4oKSLA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    weblinks: [
      "https://lehre.idh.uni-koeln.de/lehrveranstaltungen/wisem20/basissysteme-der-informationsverarbeitung-1-bsi-4/web-technologien/html-1/relative-vs-absolute-pfade/",
      "https://www.w3schools.com/html/html_filepaths.asp",
      "https://www.w3schools.com/html/html_links.asp",
    ],
    contentIsHTML: true,
  },
]

let tips = [
  {
    level: 1,
    title: "Link in neuem Tab öffnen",
    markdown: "/js/exercises/markdown/15_html_pfade/tip_link_neuer_tab.md",
    contentIsMarkdown: true,
    weblinks: [
      "https://www.w3schools.com/tags/att_a_target.asp",
      "https://wiki.selfhtml.org/wiki/HTML/Attribute/target",
    ],
  },
  {
    level: 2,
    title: "Benötigte Pfade",
    markdown: "/js/exercises/markdown/15_html_pfade/tip_pfade.md",
    contentIsMarkdown: true,
    weblinks: [
      "https://www.akademie.de/de/wissen/html-lernen-1-grundlagen/relative-pfade",
      "https://lehre.idh.uni-koeln.de/lehrveranstaltungen/wisem20/basissysteme-der-informationsverarbeitung-1-bsi-4/web-technologien/html-1/relative-vs-absolute-pfade/",
    ],
  },

  {
    level: 3,
    title: "Lösung anzeigen",
    markdown: "/js/exercises/markdown/15_html_pfade/tip_loesung.md",
    contentIsMarkdown: true,
    weblinks: [
    ],
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
window.onload = exerciseBase.init();
