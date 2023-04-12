import { Exercise } from "../exercise/exercise_base.js";
import {
    cssBorderColorNames, cssBorderStyleNames, cssBorderWidthNames, elCheckStyleSameValue
} from "../exercise/validation_helper.js";

let exerciseID = "06_css_tabellen";

let instructions = {
    content: "/js/exercises/markdown/06_css_tabellen/description.md",
    isMarkdown: true
  }
  
let infos = [
{
    markdown: "/js/exercises/markdown/06_css_tabellen/info.md",
    contentIsMarkdown: true,
},
]

let tips = [
{
    level: 1,
    markdown: "/js/exercises/markdown/06_css_tabellen/tip_1.md",
    contentIsMarkdown: true,
},
{
    level: 3,
    markdown: "/js/exercises/markdown/06_css_tabellen/tip_solution.md",
    contentIsMarkdown: true,
}
]
  

let validationFuncs = [
    function () {
        return elCheckStyleSameValue(
            `tabelle1`,
            cssBorderColorNames,
            "rgb(255, 0, 0)"
        );
    },
    function () {
        return elCheckStyleSameValue(`tabelle1`, cssBorderWidthNames, "2px");
    },
    function () {
        return elCheckStyleSameValue(`tabelle1`, cssBorderStyleNames, "solid");
    },
];

for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 4; j++) {
        validationFuncs.push(function () {
            return elCheckStyleSameValue(
                `td_${i}_${j}`,
                cssBorderColorNames,
                "rgb(0, 0, 0)"
            );
        });
        validationFuncs.push(function () {
            return elCheckStyleSameValue(
                `td_${i}_${j}`,
                cssBorderWidthNames,
                "1px"
            );
        });
        validationFuncs.push(function () {
            return elCheckStyleSameValue(
                `td_${i}_${j}`,
                cssBorderStyleNames,
                "solid"
            );
        });
    }
}

let exerciseBase = new Exercise(
    exerciseID,
    instructions,
    infos,
    tips,
    validationFuncs
);
exerciseBase.init();
