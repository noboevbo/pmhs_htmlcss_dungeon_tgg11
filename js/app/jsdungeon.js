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

function saveToFile() {
    db.allDocs({include_docs: true}, (error, doc) => {
        if (error) console.error(error);
        else {
            console.log(btoa(JSON.stringify(doc.rows.map(({doc}) => doc))));
        };
      });
}
window.saveToFile = saveToFile;

function load() {
    db.bulkDocs(JSON.parse(atob("W3sidHlwZSI6ImV4ZXJjaXNlU3RhdGUiLCJ0aXBzUHVyY2hhc2VkIjpbdHJ1ZV0sImNyZWF0ZWQiOjE2NTAwOTY3MTQ5OTQsInVwZGF0ZWQiOjE2NTAxMDE4OTIxMTgsImV4ZXJjaXNlTnVtIjowLCJsZXZlbCI6MywicmV3YXJkQ29sbGVjdGVkIjp0cnVlLCJzb2x1dGlvbiI6IjxodG1sPlxuPGhlYWQ+XG4gICAgPG1ldGEgY2hhcnNldD1cIlVURi04XCI+XG4gICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIj5cbiAgICA8dGl0bGU+SmF2YVNjcmlwdCBEdW5nZW9uPC90aXRsZT5cbjwvaGVhZD5cbjxib2R5PlxuICAgIDxwPkluIGRpZXNlbSBDb2RlLUR1bmdlb24ga2FubnN0IGR1IGRpY2ggdm9uIGVpbmVyIEF1ZmdhYmUgenVyIG7kY2hzdGVuIGFyYmVpdGVuIHVuZCBkaWUgd2ljaHRpZ3N0ZW4gQmVmZWhsZSBpbiBIVE1MIHVuZCBDU1MgenUg/GJlbi4g1mZmbmUgZGF6dSBkYXMgUHJvamVrdCBtaXQgZWluZW0gQ29kZS1FZGl0b3IsIGRlbiBkdSBkaXIgaW5zdGFsbGllcnN0IHouQi4gPGEgaHJlZj1cImh0dHBzOi8vY29kZS52aXN1YWxzdHVkaW8uY29tL1wiPlZpc3VhbCBTdHVkaW8gQ29kZSA8L2E+LjwvcD5cbiAgICA8cD5JbSBQcm9qZWt0IGZpbmRlc3QgZHUgbWVocmVyZSBPcmRuZXIuIFVtIGRpZSBBdWZnYWJlbiB6dSBs9nNlbiBtdXNzdCBkdSBpbiBkaWUgRGF0ZWllbiBpbSBPcmRuZXIgPGk+YXVmZ2FiZW48L2k+IGRpcmVrdCBiZWFyYmVpdGVuIHVuZCBhYnNwZWljaGVybi4gU2NocmVpYmUgZGVpbmUgTPZzdW5nIGluIGRlbiBkYWb8ciB2b3JnZXNlaGVuZW4gQmVyZWljaCAoei5CLiBpbSBib2R5IG9kZXIgaW0gaGVhZCkuXG4gICAgPC9wPjxwPkRlciA8aT5TdGF0dXM8L2k+IGluIGRlciBTZWl0ZW5sZWlzdGUgcmVjaHRzIGRlciBBdWZnYWJlIORuZGVydCBzZWluZW4gSW5oYWx0IHVuZCBzZWluZSBGYXJiZSwgdW0gZGlyIHp1IGhlbGZlbi48L3A+XG4gICAgPHA+V2VubiBkdSBUaXBwcyBiZW72dGlnc3QsIGthbm5zdCBkdSBkaWVzZSBpbiBkZXIgU2VpdGVubGVpc3RlIHVudGVuIFwia2F1ZmVuXCIuIFByb2JpZXJlIGVzIGVpbm1hbCBhdXMsIGRlciBUaXBwIGltIFR1dG9yaWFsIGtvc3RldCBuaWNodHMhIE5vcm1hbGVyd2Vpc2UgYmVu9nRpZ3N0IGR1IEdvbGQgdW0gVGlwcHMgenUga2F1ZmVuLiBEaWVzZXMgZXJo5GxzdCBkdSBiZWltIEFic2NobGll32VuIHZvbiBBdWZnYWJlbiwgaW4gZGVyIFNlaXRlbmxlaXN0ZSByZWNodHMgZXJzY2hlaW50IGRhbm4gZWluZSBCZWxvaG51bmdzZnVua3Rpb24uIFByb2JpZXJlIHNpZSBoaWVyIGltIFR1dG9yaWFsIGF1cyB1bSBkZWluIGVyc3RlcyBHb2xkIHp1IGVyaGFsdGVuITwvcD5cbjwvYm9keT5cbjwvaHRtbD4iLCJzb2x2ZWQiOnRydWUsIl9pZCI6IjAwX3R1dG9yaWFsIiwiX3JldiI6IjU2LTdmYjZhMDI0OTI5MDdhYjg5ZjMxNjgwZTAyNzk4ODQ2In0seyJ0eXBlIjoiZXhlcmNpc2VTdGF0ZSIsInRpcHNQdXJjaGFzZWQiOlt0cnVlLHRydWUsdHJ1ZV0sImNyZWF0ZWQiOjE2NTAwOTY3MTQ5OTQsInVwZGF0ZWQiOjE2NTAxMDIzOTc3NjIsImV4ZXJjaXNlTnVtIjoxLCJsZXZlbCI6MSwic29sdXRpb24iOiI8aHRtbD5cbjxoZWFkPlxuICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIj5cbiAgPHRpdGxlPkphdmFTY3JpcHQgRHVuZ2VvbjwvdGl0bGU+XG4gIDwhLS0gxG5kZXJ1bmdlbiBpbSBIZWFkIGFiIGhpZXIgZWluZvxnZW4gLS0+XG48L2hlYWQ+XG48Ym9keT5cbiAgPCEtLSDEbmRlcnVuZ2VuIGltIEJvZHkgYWIgaGllciBlaW5m/GdlbiAtLT5cbiAgPGgxIGlkPVwiaGF1cHR1ZWJlcnNjaHJpZnRcIj5EdW5nZW9uIFJ1biAxPC9oMT4gXG4gIDxwIGlkPVwic3BpZWxlcnRleHRcIj5TcGllbGVybmFtZTogPHN0cm9uZz5Gcml0ejwvc3Ryb25nPjwvcD5cbjwvYm9keT5cbjwvaHRtbD4iLCJzb2x2ZWQiOnRydWUsInJld2FyZENvbGxlY3RlZCI6dHJ1ZSwiX2lkIjoiMDFfaHRtbF90YWdzIiwiX3JldiI6IjIyLTQ4NjU2OTE1MmY1NTFlOTE2NGI4NWMwMjBkMGQwYWY0In0seyJ0eXBlIjoiZXhlcmNpc2VTdGF0ZSIsInRpcHNQdXJjaGFzZWQiOltmYWxzZSxmYWxzZSx0cnVlXSwiY3JlYXRlZCI6MTY1MDA5NjcxNDk5NCwidXBkYXRlZCI6MTY1MDEwMjQwOTg0MSwiZXhlcmNpc2VOdW0iOjIsImxldmVsIjoxLCJzb2x1dGlvbiI6IjxodG1sPlxuPGhlYWQ+XG4gIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPlxuICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiPlxuICA8dGl0bGU+SmF2YVNjcmlwdCBEdW5nZW9uPC90aXRsZT5cbiAgPCEtLSDEbmRlcnVuZ2VuIGltIEhlYWQgYWIgaGllciBlaW5m/GdlbiAtLT5cbjwvaGVhZD5cbjxib2R5PlxuICA8IS0tIMRuZGVydW5nZW4gaW0gQm9keSBhYiBoaWVyIGVpbmb8Z2VuIC0tPlxuPC9ib2R5PlxuPC9odG1sPiIsInNvbHZlZCI6ZmFsc2UsIl9pZCI6IjAyX2h0bWxfdHlwbyIsIl9yZXYiOiIxMC1kZWE4YjUyZTk5NDRlZTkwYTE0ODI4OTQ1NjhjOGYxYyJ9LHsidHlwZSI6ImV4ZXJjaXNlU3RhdGUiLCJzb2x2ZWQiOmZhbHNlLCJ0aXBzUHVyY2hhc2VkIjpbZmFsc2UsZmFsc2UsZmFsc2VdLCJjcmVhdGVkIjoxNjUwMDk2NzE0OTk0LCJ1cGRhdGVkIjoxNjUwMDk3NDYxOTEwLCJleGVyY2lzZU51bSI6MywibGV2ZWwiOjIsIl9pZCI6IjAzX2h0bWxfbGlzdGVuIiwiX3JldiI6IjUtZjJhOGE1OTJiZTU0OGJlNzZiYTY4ZDA3NzBiYmQyZjQifSx7InR5cGUiOiJleGVyY2lzZVN0YXRlIiwic29sdmVkIjpmYWxzZSwidGlwc1B1cmNoYXNlZCI6W2ZhbHNlLGZhbHNlLGZhbHNlXSwiY3JlYXRlZCI6MTY1MDA5NjcxNDk5NCwidXBkYXRlZCI6MTY1MDA5NzQ1ODQ2NiwiZXhlcmNpc2VOdW0iOjQsImxldmVsIjoyLCJfaWQiOiIwNF9odG1sX3RhYmVsbGVuIiwiX3JldiI6IjUtZDljZjZjZWIzNDJlMTliNmFhOTg5OWYzODU4MjllYmIifSx7InR5cGUiOiJleGVyY2lzZVN0YXRlIiwic29sdmVkIjpmYWxzZSwidGlwc1B1cmNoYXNlZCI6W2ZhbHNlLGZhbHNlLGZhbHNlXSwiY3JlYXRlZCI6MTY1MDA5NjcxNDk5NCwidXBkYXRlZCI6MTY1MDA5NzQ1ODkxNiwiZXhlcmNpc2VOdW0iOjUsImxldmVsIjoyLCJfaWQiOiIwNV9odG1sX2Zvcm11bGFyZSIsIl9yZXYiOiI1LTNmNzkyMjRhNGI4MzNjZGJiY2YxZGIwZjU0YjU4YjEyIn0seyJsYW5ndWFnZSI6InF1ZXJ5Iiwidmlld3MiOnsiaWR4LTlmM2U5MDIzZjhiZGY3YWIzNzM5MWNkYjI1MjUyZTRkIjp7Im1hcCI6eyJmaWVsZHMiOnsidHlwZSI6ImFzYyJ9fSwicmVkdWNlIjoiX2NvdW50Iiwib3B0aW9ucyI6eyJkZWYiOnsiZmllbGRzIjpbInR5cGUiXX19fX0sIl9pZCI6Il9kZXNpZ24vaWR4LTlmM2U5MDIzZjhiZGY3YWIzNzM5MWNkYjI1MjUyZTRkIiwiX3JldiI6IjEtMjE4MGU0OTc1YTg2ZmE0Y2Q2YzU3ZWMzMjhhZGE2MmUifSx7InV1aWQiOiJiMTRlZDczOC03ZWFhLTRlNDItYWMyNC1hNDVmY2QyODkyZDYiLCJwbGF5ZXJHb2xkIjo1LCJzZWxlY3RlZEV4ZXJjaXNlIjowLCJwbGF5ZXJOYW1lIjoiRnJpdHoiLCJfaWQiOiJhcHBEYXRhIiwiX3JldiI6IjYyLWJiOWRkNmVkM2ZmZDhhOTc4NWEwNDJkYTIxNDg0ZGYyIn1d")),
        {new_edits: false}, // not change revision
        (...args) => console.log('DONE', args));
    // if (file) {
    //     const reader = new FileReader();
    //     reader.onload = ({target: {result}}) => {
    //       db.bulkDocs(
    //         JSON.parse(result),
    //         {new_edits: false}, // not change revision
    //         (...args) => console.log('DONE', args)
    //       );
    //     };
    //     reader.readAsText(file);
    //   }
}
window.load = load