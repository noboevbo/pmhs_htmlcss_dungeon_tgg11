import { Exercise } from "../exercise/exercise_base.js";
import {
    cssContains, elementIsCorrectTag, hasCorrectStyleValue,
    hasQuerySelectorCorrectStyleValue, hasSelectorStyleValue
} from "../exercise/validation_helper.js";

let exerciseID = "11_css_selektoren-uebung";

let instructions = {
    content: "/js/exercises/markdown/11_css_selektoren-uebung/description.md",
    isMarkdown: true
  }
  
let infos = [
]

let tips = [
{
    level: 1,
    title: "Benötigte Selektoren & Styles",
    markdown: "/js/exercises/markdown/11_css_selektoren-uebung/tip_1.md",
    contentIsMarkdown: true,
},
{
    level: 2,
    title: "Mehrere Elemente auswählen",
    markdown: "/js/exercises/markdown/11_css_selektoren-uebung/tip_2.md",
    contentIsMarkdown: true,
},
{
    level: 3,
    title: "Lösung anzeigen",
    markdown: "/js/exercises/markdown/11_css_selektoren-uebung/tip_solution.md",
    contentIsMarkdown: true,
}
]

let validationFuncs = [
    function () {
        return elementIsCorrectTag("u1", "h1");
    },
    function () {
        return hasCorrectStyleValue(
            "u1",
            "background-color",
            "rgb(47, 79, 79)"
        );
    },
    function () {
        return hasCorrectStyleValue("u1", "color", "rgb(255, 255, 255)");
    },
    function () {
        return hasSelectorStyleValue(".wichtig", "color", "red");
    },
    function () {
        return hasCorrectStyleValue("u2", "color", "rgb(255, 0, 0)");
    },
    function () {
        return hasCorrectStyleValue("u3", "color", "rgb(255, 0, 0)");
    },
    function () {
        return hasCorrectStyleValue("u4", "color", "rgb(255, 0, 0)");
    },
    function () {
        return hasCorrectStyleValue("u1_1", "color", "rgb(0, 255, 0)");
    },
    function () {
        return hasQuerySelectorCorrectStyleValue(
            "h1",
            "font-family",
            `"Times New Roman", Times, serif`
        );
    },
    function () {
        return hasQuerySelectorCorrectStyleValue(
            "h2",
            "font-family",
            `"Times New Roman", Times, serif`
        );
    },
    function () {
        return hasQuerySelectorCorrectStyleValue(
            "h3",
            "font-family",
            `"Times New Roman", Times, serif`
        );
    },
    function () {
        return hasCorrectStyleValue("u5", "text-align", `center`);
    },
    function () {
        return cssContains("#00ff00");
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
