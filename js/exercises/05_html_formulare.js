import { Exercise } from "../exercise/exercise_base.js";
import {
    elCheckAttributeValue,
    elementIsCorrectTag,
    elementIsChildOf
} from "../exercise/validation_helper.js";
let exerciseID = "05_html_formulare";

let instructions = {
  content: "/js/exercises/markdown/05_html_formulare/description.md",
  isMarkdown: true
}

let infos = [
]
let tips = [
  {
      level: 1,
      markdown: "/js/exercises/markdown/05_html_formulare/tip_1.md",
      contentIsMarkdown: true,
  },
  {
    level: 2,
    markdown: "/js/exercises/markdown/05_html_formulare/tip_2.md",
    contentIsMarkdown: true,
},
  {
      level: 3,
      markdown: "/js/exercises/markdown/05_html_formulare/tip_solution.md",
      contentIsMarkdown: true,
  }
]

let validationFuncs = [
    function () {
        return elementIsCorrectTag("formular1", "form");
    },
    function () {
        return elementIsCorrectTag("vorname", "input");
    },
    function () {
        return elCheckAttributeValue("vorname", "type", "text");
    },
    function () {
        return elementIsChildOf("vorname", "formular1");
    },
    function () {
        return elementIsCorrectTag("nachname", "input");
    },
    function () {
        return elCheckAttributeValue("nachname", "type", "text");
    },
    function () {
        return elementIsChildOf("nachname", "formular1");
    },
    function () {
        return elementIsCorrectTag("passwort", "input");
    },
    function () {
        return elCheckAttributeValue("passwort", "type", "password");
    },
    function () {
        return elementIsChildOf("passwort", "formular1");
    },
    function () {
        return elementIsCorrectTag("newsletter", "input");
    },
    function () {
        return elCheckAttributeValue("newsletter", "type", "checkbox");
    },
    function () {
        return elementIsChildOf("newsletter", "formular1");
    },
    function () {
        return elementIsCorrectTag("registerbtn", "input");
    },
    function () {
        return elCheckAttributeValue("registerbtn", "type", "submit");
    },
    function () {
        return elementIsChildOf("registerbtn", "formular1");
    },
];

let exerciseBase = new Exercise(
    exerciseID,
    instructions,
    infos,
    tips,
    validationFuncs
);
exerciseBase.init();
