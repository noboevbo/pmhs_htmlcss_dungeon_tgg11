import { Exercise } from "../exercise/exercise_base.js";
import {
    elHasCSSClass, hasSelectorStyleValue
} from "../exercise/validation_helper.js";

let exerciseID = "09_css_klassen-selektor";

let instructions = {
    content: "/js/exercises/markdown/09_css_klassen-selektor/description.md",
    isMarkdown: true
  }
  
let infos = [
{
    markdown: "/js/exercises/markdown/09_css_klassen-selektor/info.md",
    contentIsMarkdown: true,
},
{
    markdown: "/js/exercises/markdown/09_css_klassen-selektor/info_video.md",
    contentIsMarkdown: true,
},
]

let tips = [
{
    level: 1,
    markdown: "/js/exercises/markdown/09_css_klassen-selektor/tip_1.md",
    contentIsMarkdown: true,
},
{
    level: 3,
    markdown: "/js/exercises/markdown/09_css_klassen-selektor/tip_solution.md",
    contentIsMarkdown: true,
}
]

let validationFuncs = [
    function () {
        return hasSelectorStyleValue(".meine-stadt", "border-color", "red");
    },
    function () {
        return hasSelectorStyleValue(".meine-stadt", "border-width", "2px");
    },
    function () {
        return hasSelectorStyleValue(".meine-stadt", "border-style", "solid");
    },
    function () {
        return hasSelectorStyleValue(".highlight", "background-color", "green");
    },
    function () {
        return hasSelectorStyleValue(".highlight", "color", "white");
    },
    function () {
        return elHasCSSClass("td_4_1", "meine-stadt");
    },
    function () {
        return elHasCSSClass("td_4_2", "meine-stadt");
    },
    function () {
        return elHasCSSClass("td_4_3", "meine-stadt");
    },
    function () {
        return elHasCSSClass("td_4_2", "highlight");
    },
    function () {
        return elHasCSSClass("td_4_3", "highlight");
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
