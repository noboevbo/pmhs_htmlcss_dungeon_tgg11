import {
    selectedExerciseEl,
    selectedExerciseNameEl,
    exerciseTipListEl} from './dom_selectors.js';
import { exerciseMessageHandler } from './event_handler.js';
import { exercises } from './exercise_setup.js';
import { getExerciseState, writeExerciseState } from './model.js';
import { updateExerciseState } from './experiment_state_handler.js';
import { updatePageVariables } from './view.js';

const emptyExerciseState = { solved: false, tipsPurchased: [], lastUpdate: Date.now(), exerciseNum: -1 };

function init() {
    console.log("Initialize Dungeon");
    initializeDatabase(exercises);
    initializePlayerGold();
    updatePageVariables();
    initializeExercises();
    initializeActiveExercise();
    window.addEventListener("message", exerciseMessageHandler, false);
}
init();

function initializePlayerGold() {
    let playerGold = localStorage.getItem("playerGold");
    if (playerGold !== null) {
        return
    }
    // playerGold = 50;
    playerGold = 0;
    localStorage.setItem("playerGold", playerGold);
}

function initializeDatabase(exercises) {
    for (let i = 0; i < exercises.length; i++) {
        let exercise = exercises[i];
        let item = localStorage.getItem(exercise.id);
        if (item !== null) {
            continue
        }
        let state = Object.assign({}, emptyExerciseState);
        state.exerciseNum = i;
        writeExerciseState(exercise.id, state);
    }
}

function exerciseSelectedDelegate(exerciseID) {
    return function() {
        exerciseSelected(exerciseID);
    }
}

function initializeExercises() {
    let exerciseListEl = document.getElementById("exerciseList");
    for (var i = 0; i < exercises.length; i++) {
        let exercise = exercises[i];
        let exerciseState = getExerciseState(exercise.id);
        const liNode = document.createElement("li");
        liNode.className = "nav-item";
        const linkNode = document.createElement("a");
        linkNode.id = exercise.id + "_link";
        linkNode.className = "nav-link";
        // linkNode.setAttribute('onclick', `exerciseSelected(${i})`);
        linkNode.addEventListener("click", exerciseSelectedDelegate(i));
        linkNode.href = "#";
        if (exerciseState.solved) {
            linkNode.innerHTML = `<strong><i class="nes-icon trophy is-small"></i> Level ` + `${i}`.padStart(2, "0") + `</strong><br><p>` + exercise.name + "</p>";
        } else {
            linkNode.innerHTML = `<strong><i class="nes-icon close is-small"></i> Level ` + `${i}`.padStart(2, "0") + "</strong><br><p>" + exercise.name + "</p>";
        }
        liNode.appendChild(linkNode);
        exerciseListEl.appendChild(liNode);
    }
}

function initializeActiveExercise() {
    let activeExerciseNumber = localStorage.getItem("selectedExercise");
    if (activeExerciseNumber !== null && exercises.length >= activeExerciseNumber) {
        setActiveExercise(exercises[activeExerciseNumber]);
    }
}

function exerciseSelected(exerciseNumber) {
    localStorage.setItem("selectedExercise", exerciseNumber);
    setActiveExercise(exercises[exerciseNumber]);
}


function setActiveExercise(exercise) {
    exerciseTipListEl.innerHTML = "";
    selectedExerciseNameEl.innerText = "Aufgabe: " + exercise.name;
    selectedExerciseEl.src = "aufgaben/" + exercise.id + ".html";

    let exerciseState = getExerciseState(exercise.id);
    updateExerciseState(exercise.id, exerciseState.solved);
}