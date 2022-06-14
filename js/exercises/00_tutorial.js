import { Exercise } from '../exercise/exercise_base.js';
import {
    getSuccessResultObj
} from '../exercise/validation_helper.js';

let exerciseID = "00_tutorial";

function visited() {
    return getSuccessResultObj();
}

let validationFuncs = [
    function () {
        return visited()
    }
]

let instructions = `
<ol>
    <li>Im Feld <em>Auftrag</em> stehen immer die Arbeitsaufträge</li>
    <li>Lies dir den Text im Feld <em>Ergebnis</em> durch. Dort wird die HTML Datei aus dem ordner <em>Aufgaben</em> so angezeigt, wie sie bearbeitet wurde. In diesem Tutorial findest du dort noch einige Infos.</li>
</ol>`

let infos = []

let tips = [{
    level: 0,
    title: "Beispieltipp - kauf mich!",
    content: `Gut gemacht! Du hast deinen ersten Tipp gekauft. Hier gibt es dann Informationen in Form von Texten, Videos oder Audiodateien, die dir bei den Aufgaben helfen!`,
    weblinks: ["https://www.pmhs.de"],
    contentIsHTML: true
},]

let exerciseBase = new Exercise(exerciseID, instructions, infos, tips, validationFuncs);
window.onload = exerciseBase.init();