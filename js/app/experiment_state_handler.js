import { closeDialogOnOutsideClick } from '../core/helper.js';
import { exerciseResultEl, exerciseResultFooterEl, exerciseResultHeaderEl, exerciseResultMessageListEl } from './dom_selectors.js';
import { createOrUpdate, getDB, updatePlayerGold } from './model.js';
import { updatePageVariables } from './view.js';

async function updateExerciseState(exerciseID, exerciseData) {
  let db = getDB();
  db.get(exerciseID)
    .then((exerciseState) => {
      setLinkState(exerciseID, exerciseData.solved);
      if (exerciseState.solved) {
        showExperimentState(exerciseID, exerciseState, exerciseData.solved, exerciseData.errorMessages);
        return Promise.reject("State did not change, no need to update db");
      }
      return exerciseState;
    })
    .then((exerciseState) => {
      exerciseState.updated = Date.now();
      exerciseState.solution = exerciseData.solution;
      exerciseState.solved = exerciseData.solved;
      return createOrUpdate(exerciseState);
    }).then((exerciseState) => {
      showExperimentState(exerciseID, exerciseState, true, exerciseData.errorMessages);
    }).catch(() => { });
}

function setLinkState(exerciseID, solved) {
  let linkNode = document.getElementById(exerciseID + "_link");
  // console.debug(`Try get node: ${exerciseID}_link. Experiment solved: ${solved}`)
  let iconNode = linkNode.getElementsByTagName("i")[0];
  let stateSymbol = solved ? "nes-icon trophy is-small" : "nes-icon close is-small";
  iconNode.className = stateSymbol;
}

function showExperimentState(exerciseID, exerciseState, currentlySolved, messages = []) {
  // currentlySolved = may be solved but the exercise in "aufgaben" folder might be deleted / overwritten, thus not currently correct
  exerciseResultMessageListEl.innerHTML = "";
  exerciseResultFooterEl.innerHTML = "";
  if (exerciseState.solved) {
    if (currentlySolved) {
      exerciseResultEl.className = "alert alert-success";
      exerciseResultHeaderEl.innerHTML = `<span class="nes-text is-success">Aufgabe korrekt gelöst!</span>`;
    }
    else {
      exerciseResultEl.className = "alert alert-warning";
      exerciseResultHeaderEl.innerHTML = `<span class="nes-text is-warning">Aufgabe wurde bereits korrekt gelöst, der Code im Ordner aufgaben stimmt aber nichtmehr. Du musst nichts tun, kannst dir aber deine vorherige Lösung über den Lösungsbutton ansehen!</span>`;
    }
    const solutionDialogEl = getSolutionDialogElement(exerciseState.solution, exerciseState._id);
    exerciseResultFooterEl.appendChild(solutionDialogEl);
    const solutionButtonEl = getSolutionButtonElement(exerciseID);
    exerciseResultFooterEl.appendChild(solutionButtonEl);
    if (!exerciseState.rewardCollected) {
      let reward = getGoldAmountFromLevel(exerciseState.level);
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

function getSolutionButtonElement() {
  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("type", "button");
  buttonEl.id = "solutionButton";
  buttonEl.className = "nes-btn is-success tooltip";
  buttonEl.setAttribute("onclick", `document.getElementById('dialog-solution').showModal();`);
  const buttonTextEl = document.createElement("span");
  buttonTextEl.innerHTML = `Meine Lösung anzeigen`;
  buttonEl.appendChild(buttonTextEl);
  return buttonEl;
}

function getSolutionDialogElement(solutionText, exerciseName) {
  const dialogEl = document.createElement("dialog");
  dialogEl.addEventListener('click', closeDialogOnOutsideClick);
  dialogEl.id = `dialog-solution`;
  dialogEl.className = "nes-dialog is-rounded";
  const formEl = document.createElement("form");
  formEl.method = "dialog";
  const titleEl = document.createElement("h1");
  titleEl.class = "title";
  titleEl.innerText = `Meine Lösung zu Aufgabe: ${exerciseName}`;
  formEl.appendChild(titleEl);
  const contentEl = document.createElement("p");
  contentEl.innerHTML = `<xmp>${solutionText}</xmp>`
  formEl.appendChild(contentEl);
  const menuEl = document.createElement("menu");
  menuEl.className = "dialog-menu";
  const okButtonEl = document.createElement("button");
  okButtonEl.className = "nes-btn is-primary";
  okButtonEl.innerText = "Ok";
  menuEl.appendChild(okButtonEl);
  formEl.appendChild(menuEl);
  dialogEl.appendChild(formEl);
  return dialogEl;
}


function getRewardDelegate(exerciseID) {
  return async function () {
    await getReward(exerciseID);
  };
}

async function getReward(exerciseID) {
  let db = getDB();
  console.debug("Get Reward");
  db.get(exerciseID).then((exerciseState) => {
    if (!exerciseState.solved || exerciseState.rewardCollected) {
      return Promise.reject("Exercise not finished")
    }
    exerciseState.rewardCollected = true;
    return createOrUpdate(exerciseState);
  })
    .then((exerciseState) => {
      return updatePlayerGold(getGoldAmountFromLevel(exerciseState.level));
    })
    .then(() => {
      exerciseResultFooterEl.innerHTML = ``;
      updatePageVariables();
    })
    .then(() => {
      console.debug("Reward collected");
    })
    .catch((err) => {
      console.debug(`Reward collection rejected: ${err}`)
    });


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
