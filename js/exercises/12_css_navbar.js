import { Exercise } from "../exercise/exercise_base.js";
import {
    hasQuerySelectorCorrectStyleValue, hasSelectorStyleValue as hasStyleValue
} from "../exercise/validation_helper.js";

let exerciseID = "12_css_navbar";

let instructions = {
    content: "/js/exercises/markdown/12_css_navbar/description.md",
    isMarkdown: true
  }
  
let infos = [
]

let tips = [
    {
        level: 1,
        title: "Typselektoren",
        markdown: "/js/exercises/markdown/12_css_navbar/tip_1.md",
        contentIsMarkdown: true,
    },
    {
        level: 1,
        title: "Selektoren kombinieren",
        markdown: "/js/exercises/markdown/12_css_navbar/tip_2.md",
        contentIsMarkdown: true,
    },
    {
        level: 2,
        title: "Benötigte Selektoren & Styles",
        markdown: "/js/exercises/markdown/12_css_navbar/tip_3.md",
        contentIsMarkdown: true,
    },
    {
        level: 3,
        title: "Lösung anzeigen",
        markdown: "/js/exercises/markdown/12_css_navbar/tip_solution.md",
        contentIsMarkdown: true,
    }
]

let validationFuncs = [
    function () {
        return hasQuerySelectorCorrectStyleValue(
            "ul",
            "list-style-type",
            `none`
        );
    },
    function () {
        return hasQuerySelectorCorrectStyleValue(
            "ul",
            "background-color",
            "rgb(0, 0, 0)"
        );
    },
    function () {
        return hasQuerySelectorCorrectStyleValue(
            "li a",
            "color",
            "rgb(255, 255, 255)"
        );
    },
    function () {
        return hasStyleValue("li > a:hover", "color", "rgb(0, 0, 0)");
    },
    function () {
        return hasStyleValue(
            "li > a:hover",
            "background-color",
            "rgb(255, 255, 255)"
        );
    },
    function () {
        return hasQuerySelectorCorrectStyleValue("ul", "width", `200px`);
    },
    function () {
        return hasStyleValue("li > a", "text-decoration", "none");
    },
    function () {
        return hasQuerySelectorCorrectStyleValue("li > a", "display", "block");
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
