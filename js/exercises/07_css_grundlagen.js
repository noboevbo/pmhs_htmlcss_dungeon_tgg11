import { Exercise } from "../exercise/exercise_base.js";
import {
    elementIsCorrectTag,
    elHasCorrectStyleValue, hasCorrectStyleValue
} from "../exercise/validation_helper.js";

let exerciseID = "07_css_grundlagen";

let instructions = {
    content: "/js/exercises/markdown/07_css_grundlagen/description.md",
    isMarkdown: true
  }
  
let infos = [
]

let tips = [
{
    level: 1,
    title: "Benötigte Styles",
    markdown: "/js/exercises/markdown/07_css_grundlagen/tip_1.md",
    contentIsMarkdown: true,
},
{
    level: 3,
    title: "Lösung anzeigen",
    markdown: "/js/exercises/markdown/07_css_grundlagen/tip_solution.md",
    contentIsMarkdown: true,
}
]

let validationFuncs = [
    function () {
        return elementIsCorrectTag("h11", "h1");
    },
    function () {
        return hasCorrectStyleValue("h11", "text-align", `center`);
    },
    function () {
        return hasCorrectStyleValue(
            "h11",
            "background-color",
            "rgb(47, 79, 79)"
        );
    },
    function () {
        return hasCorrectStyleValue("h11", "color", "rgb(255, 255, 255)");
    },
    function () {
        return hasCorrectStyleValue("a1", "color", "rgb(255, 0, 0)");
    },
    function () {
        return elHasCorrectStyleValue(
            document.getElementById("p1"),
            "p1",
            "font-family",
            `Arial, Helvetica, sans-serif`
        );
    },
    function () {
        return hasCorrectStyleValue("a1", "font-weight", "700");
    },
    function () {
        return hasCorrectStyleValue("a1", "font-size", `24px`);
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
