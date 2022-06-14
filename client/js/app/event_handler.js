import {
  selectedExerciseInstructionsEl
} from "./dom_selectors.js";
import {
  setTips
} from "./tip_handler.js";
import { updateExerciseState } from "./experiment_state_handler.js";
import { updatePageVariables } from "./view.js";
import { updateAppData } from "./model.js";

async function exerciseMessageHandler(event) {
  if (event.origin !== window.origin) {
    console.log(`Message from origin: ${event.origin} but window is ${window.origin} - abort!`);
    return;
  }
  console.log("Got message")
  let msg = event.data;
  switch (msg.subject) {
    case "initInstructions":
      await setInstructions(msg);
      break;
    case "initTips":
      await setTips(msg);
      break;
    case "updatedExerciseState":
      await updateExerciseState(msg.exerciseID, msg.content);
      break;
    case "updatePlayerName":
      await updateAppData({playerName: msg.playerName})
      await updatePageVariables();
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