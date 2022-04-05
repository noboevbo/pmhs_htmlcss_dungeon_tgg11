import {exerciseResultEl,
  exerciseResultHeaderEl,
  exerciseResultFooterEl,
  exerciseResultMessageListEl,
  } from './dom_selectors.js';
import { exercises } from './exercise_setup.js';
import { getExerciseState, updatePlayerGold, writeExerciseState } from './model.js';
import { updatePageVariables } from './view.js';

function updateExerciseState(exerciseID, solved, errorMessages = []) {
  let linkNode = document.getElementById(exerciseID + "_link");
  console.log(`Try get node: ${exerciseID}_link. Experiment solved: ${solved}`)
  let iconNode = linkNode.getElementsByTagName("i")[0];
  let stateSymbol = solved ? "nes-icon trophy is-small" : "nes-icon close is-small";
  iconNode.className = stateSymbol;
  let exerciseState = getExerciseState(exerciseID);
  exerciseState.solved = solved;
  writeExerciseState(exerciseID, exerciseState);
  setExperimentState(exerciseID, exerciseState, errorMessages);
}

function setExperimentState(exerciseID, exerciseState, messages = []) {
  exerciseResultMessageListEl.innerHTML = "";
  exerciseResultFooterEl.innerHTML = "";
  if (exerciseState.solved) {
      exerciseResultEl.className = "alert alert-success";
      exerciseResultHeaderEl.innerHTML = `<span class="nes-text is-success">Aufgabe korrekt gelöst!</span>`;
      if (!exerciseState.rewardCollected) {
          let reward = getGoldAmountFromLevel(exercises[exerciseState.exerciseNum].level);
          const h3El = document.createElement("h3");
          h3El.innerText = "Belohnung abholen";
          exerciseResultFooterEl.appendChild(h3El);
          const buttonEl = document.createElement("button");
          buttonEl.setAttribute("type", "button");
          buttonEl.id = "collectRewardButton";
          buttonEl.className = "nes-btn is-warning tooltip";
          buttonEl.addEventListener("click", getRewardDelegate(exerciseID));
          buttonEl.innerHTML = `<span><i class="nes-icon coin is-small"></i> ${reward}g</span>`;
          exerciseResultFooterEl.appendChild(buttonEl);
      }
  } else {
      exerciseResultEl.className = "alert alert-danger";
      exerciseResultHeaderEl.innerHTML = `<span class="nes-text is-error">Aufgabe noch nicht korrekt gelöst!</span>`;
      exerciseResultFooterEl.innerHTML = ``;
  }
  for (let i = 0; i < messages.length; i++) {
      exerciseResultMessageListEl.appendChild(getResultMessageListItem(messages[i]))
  }
}

function getRewardDelegate(exerciseID) {
  return function() {
    getReward(exerciseID);
  };
}

function getReward(exerciseID) {
  let exerciseState = getExerciseState(exerciseID);
  if (!exerciseState.solved || exerciseState.rewardCollected) {
      return;
  }
  exerciseState.rewardCollected = true;
  writeExerciseState(exerciseID, exerciseState);
  updatePlayerGold(getGoldAmountFromLevel(exercises[exerciseState.exerciseNum].level));
  exerciseResultFooterEl.innerHTML = ``;
  updatePageVariables();
}

function getGoldAmountFromLevel(level) {
  switch (level) {
      case 0:
          return 10;
      case 1:
          return 25;
      case 2:
          return 50;
      case 3:
          return 75;
      default:
          return 0;
  }
}

function getResultMessageListItem(message) {
  var li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = message;
  return li
}


export { updateExerciseState };