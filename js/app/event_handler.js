import {
  selectedExerciseInstructionsEl
} from "./dom_selectors.js";
import {
  setTips
} from "./tip_handler.js";
import { updateExerciseState } from "./experiment_state_handler.js";
import { updatePageVariables } from "./view.js";

function exerciseMessageHandler(event) {
  if (event.origin !== window.origin) {
    console.log(`Message from origin: ${event.origin} but window is ${window.origin} - abort!`);
    return;
  }
  let msg = event.data;
  switch (msg.subject) {
    case "initInstructions":
      setInstructions(msg);
      break;
    case "initTips":
      setTips(msg);
      break;
    case "updatedExerciseState":
      updateExerciseState(msg.exerciseID, msg.content.solved, msg.content.errorMessages);
      break;
    case "updatePageVariables":
      updatePageVariables();
      break;
    default:
      console.log(`Received msg with unknown subject: ${msg.subject}`);
      break;
  }
}

function setInstructions(msg) {
  selectedExerciseInstructionsEl.innerHTML = msg.content;
}


export {
  exerciseMessageHandler
};