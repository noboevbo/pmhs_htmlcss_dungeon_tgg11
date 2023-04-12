import { Exercise } from "../exercise/exercise_base.js";
import {
    elementIsCorrectTag, hasSelectorStyleValue
} from "../exercise/validation_helper.js";

let exerciseID = "10_css_id-selektor";

let instructions = {
    content: "/js/exercises/markdown/10_css_id-selektor/description.md",
    isMarkdown: true
  }
  
let infos = [
    {
        markdown: "/js/exercises/markdown/10_css_id-selektor/info.md",
        contentIsMarkdown: true,
    },
    {
        markdown: "/js/exercises/markdown/10_css_id-selektor/info_video.md",
        contentIsMarkdown: true,
    },
    ]

    let tips = [
    {
        level: 1,
        markdown: "/js/exercises/markdown/10_css_id-selektor/tip_1.md",
        contentIsMarkdown: true,
    },
    {
        level: 3,
        markdown: "/js/exercises/markdown/10_css_id-selektor/tip_solution.md",
        contentIsMarkdown: true,
    }
]

let validationFuncs = [
    function () {
        return elementIsCorrectTag("benzinpreis-tabelle", "table");
    },
    function () {
        return hasSelectorStyleValue("#benzinpreis-tabelle", "width", "100%");
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
