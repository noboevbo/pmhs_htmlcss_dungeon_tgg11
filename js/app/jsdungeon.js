import {
    exerciseTipListEl,
    loadModalEl,
    loadZoneEl, selectedExerciseEl,
    selectedExerciseNameEl
} from './dom_selectors.js';
import { exerciseMessageHandler } from './event_handler.js';
import { exercises } from './exercise_setup.js';
import { updateExerciseState } from './experiment_state_handler.js';
import { createOrUpdate, getAppData, getDB, initializeAppData, resetDB, updateAppData } from './model.js';
import { updatePageVariables } from './view.js';

const emptyExerciseState = { type: "exerciseState", solved: false, rewardCollected: false, tipsPurchased: [], created: Date.now(), updated: Date.now(), exerciseNum: -1 };

var db = getDB();

async function init() {
    console.debug("Initialize Dungeon");
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
        index: { fields: ['type'] }
    });
    for (let i = 0; i < exercises.length; i++) {
        let exercise = exercises[i];
        try {
            exercise.state = await db.get(exercise.id);
        } catch {
            console.debug(`Initialize DB entry for exercise ${exercise.id}`)
            let state = Object.assign({}, emptyExerciseState);
            state.exerciseNum = i;
            state.level = exercise.level;
            state._id = exercise.id
            exercise.state = await createOrUpdate(state);
        }
    }
}

function exerciseSelectedDelegate(exerciseID) {
    return async function () {
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

async function updateExerciseLinks() {
    for (var i = 0; i < exercises.length; i++) {
        let exercise = exercises[i];
        let exerciseState = await db.get(exercise.id);
        setLinkState(exercise.id, exerciseState)
    }
}

function setLinkState(exerciseID, exerciseState) {
    let linkNode = document.getElementById(exerciseID + "_link");
    console.debug(`Try get node: ${exerciseID}_link. Experiment solved: ${exerciseState.solved}`)
    let iconNode = linkNode.getElementsByTagName("i")[0];
    let stateSymbol = exerciseState.solved ? "nes-icon trophy is-small" : "nes-icon close is-small";
    iconNode.className = stateSymbol;
}

async function initializeActiveExercise() {
    console.debug("Search for active exerise.")
    let appData = await getAppData();
    let selectedExercise = appData.selectedExercise
    console.debug(appData);
    if (selectedExercise !== null && exercises.length >= selectedExercise) {
        console.debug("Active exercise found.")
        await setActiveExercise(exercises[selectedExercise]);
    }
}

async function exerciseSelected(exerciseNumber) {
    await updateAppData({ selectedExercise: exerciseNumber })
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
            console.debug("Start result generation");
            console.debug(result);
            saveReport(result.docs);
        })
        .catch((err) => console.debug(err))
}
window.generateReport = generateReport;

async function saveReport(exerciseStates) {
    let appData = await getAppData();
    let rows = [["player_uuid", "playerGold", "exercise_id", "level", "solved", "rewardCollected", "created", "updated", "tip1_bought", "tip2_bought", "tip3_bought", "tip4_bought"]]
    for (let exerciseNum = 0; exerciseNum < exerciseStates.length; exerciseNum++) {
        let exerciseState = exerciseStates[exerciseNum];
        let data = [appData.uuid, appData.playerGold, exerciseState._id, exerciseState.level, exerciseState.solved, exerciseState.rewardCollected, exerciseState.created, exerciseState.updated, false, false, false, false]
        for (let i = 0; i < exerciseState.tipsPurchased.length; i++) {
            data[data.length - 4 + i] = exerciseState.tipsPurchased[i]
        }
        rows.push(data);
    }
    let csvContent = "data:text/csv;charset=utf-8,"
        + rows.map(e => e.join(",")).join("\n");
    initiateFileDownload(csvContent, `dungeon_report_${appData.uuid}.csv`);
}

function initiateFileDownload(fileContent, fileName) {
    console.debug(fileContent);
    var encodedUri = encodeURI(fileContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link); // Required for FF 
    link.click();
    document.body.removeChild(link);
}

function saveToFile() {
    db.allDocs({ include_docs: true })
        .then((docs) => {
            let date = new Date();
            let saveGame = "data:text/text;charset=utf-8," + btoa(JSON.stringify(docs.rows.map(({ doc }) => doc)))
            initiateFileDownload(saveGame, `dungeon_savegame_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.txt`);
        })
        .catch((err) => console.debug(err));
}
window.saveToFile = saveToFile;

function loadHandler(e) {
    e.preventDefault();
    let files = [];
    if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < e.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (e.dataTransfer.items[i].kind === 'file') {
                var file = e.dataTransfer.items[i].getAsFile();
                console.debug('... file[' + i + '].name = ' + file.name);
                files.push(file);
            }
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < e.dataTransfer.files.length; i++) {
            console.debug('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
            files.push(file);
        }
    }

    console.debug(files);
    if (files.length !== 1) {
        console.debug("Expected one pmhs[...].txt file, got f{files.length}! Aborting.");
        return;
    }
    resetDB().then((newDb) => {
        db = newDb;
        return readFile(files[0]);
    })
        .then((content) => {
            return db.bulkDocs(JSON.parse(atob(content)), { new_edits: false });
        })
        .then(() => initializeAppData())
        .then(() => updatePageVariables())
        .then(() => updateExerciseLinks())
        .then(() => console.debug("Successfully loaded"))
        .then(() => loadModalEl.close())
        .catch((err) => console.debug(err));
}
window.loadHandler = loadHandler

function dragOverHandler(e) {
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
}

function dragEnterHandler(e) {
    loadZoneEl.classList.add("highlight");
}

function dragLeaveHandler(e) {
    loadZoneEl.classList.remove("highlight");
}

window.dragOverHandler = dragOverHandler
window.dragEnterHandler = dragEnterHandler;
window.dragLeaveHandler = dragLeaveHandler;

function readFile(file) {
    console.debug(file);
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result)
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
}
