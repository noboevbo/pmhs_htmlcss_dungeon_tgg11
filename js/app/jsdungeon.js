import {
    selectedExerciseEl,
    selectedExerciseNameEl,
    exerciseTipListEl} from './dom_selectors.js';
import { exerciseMessageHandler } from './event_handler.js';
import { exercises } from './exercise_setup.js';
import { updateExerciseState } from './experiment_state_handler.js';
import { getAppData, getDB, initializeAppData, createOrUpdate, updateAppData } from './model.js';
import { updatePageVariables } from './view.js';

const emptyExerciseState = { type: "exerciseState", solved: false, rewardCollected: false, tipsPurchased: [], created: Date.now(), updated: Date.now(), exerciseNum: -1 };

var db = getDB();

async function init() {
    console.log("Initialize Dungeon");
    await initializeDatabase(exercises);
    await initializeAppData();
    await updatePageVariables();
    await initializeExercises();
    await initializeActiveExercise();
    window.addEventListener("message", exerciseMessageHandler, false);
}
init();

async function initializeDatabase(exercises) {
    // TODO: Save information about the exercise in the database (e.g. instructions, tipps, ...)
    db.createIndex({
        index: {fields: ['type']}
      });
    for (let i = 0; i < exercises.length; i++) {
        let exercise = exercises[i];
        try {
            exercise.state = await db.get(exercise.id);
        } catch {
            console.log(`Initialize DB entry for exercise ${exercise.id}`)
            let state = Object.assign({}, emptyExerciseState);
            state.exerciseNum = i;
            state.level = exercise.level;
            state._id = exercise.id
            exercise.state = await createOrUpdate(state);
        }
    }
}

function exerciseSelectedDelegate(exerciseID) {
    return async function() {
        exerciseSelected(exerciseID);
    }
}

async function initializeExercises() {
    let exerciseListEl = document.getElementById("exerciseList");
    for (var i = 0; i < exercises.length; i++) {
        let exercise = exercises[i];
        let exerciseState = await db.get(exercise.id);
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

async function initializeActiveExercise() {
    let activeExerciseNumber = await getAppData().activeExerciseNumber;
    if (activeExerciseNumber !== null && exercises.length >= activeExerciseNumber) {
        await setActiveExercise(exercises[activeExerciseNumber]);
    }
}

async function exerciseSelected(exerciseNumber) {
    await updateAppData({selectedExercise: exerciseNumber})
    await setActiveExercise(exercises[exerciseNumber]);
}


async function setActiveExercise(exercise) {
    let exerciseState = await db.get(exercise.id);
    await updateExerciseState(exercise.id, exerciseState.solved);
    exerciseTipListEl.innerHTML = "";
    selectedExerciseNameEl.innerText = "Aufgabe: " + exercise.name;
    selectedExerciseEl.src = "aufgaben/" + exercise.id + ".html";
}

function generateReport() {
    db.find({
        selector: {
          type: 'exerciseState'
        }
      })
      .then((result) => {
          console.log("Start result generation");
          console.log(result);
          saveReport(result.docs);
      })
      .catch((err) => console.log(err))
}
window.generateReport = generateReport;

async function saveReport(exerciseStates) {
    let appData = await getAppData();
    let rows = [["player_uuid", "playerGold", "exercise_id", "level", "solved", "rewardCollected", "created", "updated", "tip1_bought", "tip2_bought", "tip3_bought", "tip4_bought"]]
    for (let exerciseNum=0; exerciseNum < exerciseStates.length; exerciseNum++) {
        let exerciseState = exerciseStates[exerciseNum];
        let data = [appData.uuid, appData.playerGold ,exerciseState._id, exerciseState.level, exerciseState.solved, exerciseState.rewardCollected, exerciseState.created, exerciseState.updated, false, false, false, false]
        for (let i=0; i<exerciseState.tipsPurchased.length; i++) {
            data[data.length-4+i] = exerciseState.tipsPurchased[i]
        }
        rows.push(data);
    }

    let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dungeon_report_${appData.uuid}.csv`);
    document.body.appendChild(link); // Required for FF
    
    link.click();
}