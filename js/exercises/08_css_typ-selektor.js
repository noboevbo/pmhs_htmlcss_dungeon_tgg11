import { Exercise } from "../exercise/exercise_base.js";
import {
    hasSelectorStyleValue, or
} from "../exercise/validation_helper.js";

let exerciseID = "08_css_typ-selektor";

let instructions = {
    content: "/js/exercises/markdown/08_css_typ-selektor/description.md",
    isMarkdown: true
  }
  
let infos = [
{
    markdown: "/js/exercises/markdown/08_css_typ-selektor/info.md",
    contentIsMarkdown: true,
},
{
    markdown: "/js/exercises/markdown/08_css_typ-selektor/info_video.md",
    contentIsMarkdown: true,
},
]

let tips = [
{
    level: 1,
    markdown: "/js/exercises/markdown/08_css_typ-selektor/tip_1.md",
    contentIsMarkdown: true,
},
{
    level: 3,
    markdown: "/js/exercises/markdown/08_css_typ-selektor/tip_solution.md",
    contentIsMarkdown: true,
}
]

let validationFuncs = [
    function () {
        return hasSelectorStyleValue("td", "border-color", "black");
    },
    function () {
        return hasSelectorStyleValue("td", "border-width", "1px");
    },
    function () {
        return hasSelectorStyleValue("td", "border-style", "solid");
    },
    function () {
        return hasSelectorStyleValue("td", "font-weight", ""); // No font weight in td!
    },
    function () {
        return hasSelectorStyleValue("th", "border-color", "black");
    },
    function () {
        return hasSelectorStyleValue("th", "border-width", "1px");
    },
    function () {
        return hasSelectorStyleValue("th", "border-style", "solid");
    },
    function () {
        return or([
            hasSelectorStyleValue("th", "font-weight", "700"),
            hasSelectorStyleValue("th", "font-weight", "bold"),
        ]);
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
