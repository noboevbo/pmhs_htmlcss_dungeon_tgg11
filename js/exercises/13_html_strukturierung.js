import { Exercise } from "../exercise/exercise_base.js";
import {
    elementsExist
} from "../exercise/validation_helper.js";
let exerciseID = "13_html_strukturierung";

let instructions = {
    content: "/js/exercises/markdown/13_html_strukturierung/description.md",
    isMarkdown: true
  }

let infos = [
    {
        markdown: "/js/exercises/markdown/13_html_strukturierung/info.md",
        contentIsMarkdown: true,
    },
    ]

    let tips = [
    {
        level: 1,
        markdown: "/js/exercises/markdown/13_html_strukturierung/tip_1.md",
        contentIsMarkdown: true,
    },
    {
        level: 3,
        markdown: "/js/exercises/markdown/13_html_strukturierung/tip_solution.md",
        contentIsMarkdown: true,
    }
]


let validationFuncs = [
    function () {
        return elementsExist("header", 1, false);
    },
    function () {
        return elementsExist(
            "h1",
            1,
            false,
            document.getElementsByTagName("header")[0]
        );
    },
    function () {
        return elementsExist("main", 1, false);
    },
    function () {
        return elementsExist("footer", 1, false);
    },
    function () {
        return elementsExist(
            "article",
            2,
            true,
            document.getElementsByTagName("main")[0]
        );
    },
    function () {
        return elementsExist(
            "h2",
            2,
            true,
            document.getElementsByTagName("main")[0]
        );
    },
    function () {
        return elementsExist(
            "p",
            2,
            true,
            document.getElementsByTagName("main")[0]
        );
    },
    function () {
        return elementsExist(
            "small",
            1,
            false,
            document.getElementsByTagName("footer")[0]
        );
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
