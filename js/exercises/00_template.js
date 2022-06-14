import { Exercise } from '../exercise/exercise_base.js';
import {
  TODO
} from '../exercise/validation_helper.js';

let exerciseID = "TODO: insert id";

let instructions = `
<ol>
    <li>TODO</li>
</ol>`

let validationFuncs = [
  // TODO: add exercises and return {result: xy, errorMessage: xy}, see validation_helper for examples
  function () { return TODO }
]

let infos = [
  {
    title: "",
    content: ``,
    weblinks: [""],
    contentIsHTML: true
  }
]

let tips = [
  {
    level: 0,
    title: "",
    content: ``,
    weblinks: [""],
    contentIsHTML: true
  }
]

let exerciseBase = new Exercise(exerciseID, instructions, infos, tips, validationFuncs);
window.onload = exerciseBase.init();