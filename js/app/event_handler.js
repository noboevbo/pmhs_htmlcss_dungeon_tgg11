import {
  selectedExerciseInstructionsEl
} from "./dom_selectors.js";
import { updateExerciseState } from "./experiment_state_handler.js";
import { setInfos } from "./info_handler.js";
import { updateAppData } from "./model.js";
import {
  setTips
} from "./tip_handler.js";
import { updatePageVariables } from "./view.js";
var converter = new showdown.Converter({
  openLinksInNewWindow: true,
  parseImgDimensions: true,
});

async function exerciseMessageHandler(event) {
  if (event.origin !== window.origin) {
    console.debug(`Message from origin: ${event.origin} but window is ${window.origin} - abort!`);
    return;
  }
  console.debug("Got message")
  let msg = event.data;
  switch (msg.subject) {
    case "initInstructions":
      await setInstructions(msg.content);
      break;
    case "initInfos":
      await setInfos(msg);
      break;
    case "initTips":
      await setTips(msg);
      break;
    case "updatedExerciseState":
      await updateExerciseState(msg.exerciseID, msg.content);
      break;
    case "updatePlayerName":
      await updateAppData({ playerName: msg.playerName })
      await updatePageVariables();
      break;
    default:
      console.debug(`Received msg with unknown subject: ${msg.subject}`);
      break;
  }
}

async function setInstructions(instructionData) {
  if (instructionData.isMarkdown) {
    let data = await fetch(instructionData.content)
      .then(response => response.text())
    // console.debug("Loaded markdown");
    // console.debug(data);
    selectedExerciseInstructionsEl.innerHTML = converter.makeHtml(data);
    return
  }
  selectedExerciseInstructionsEl.innerHTML = instructionData.content;
}


export {
  exerciseMessageHandler
};
