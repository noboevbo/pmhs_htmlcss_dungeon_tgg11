import { getEmptyExerciseStateMessage, getEmptyInitInstructionsMessage, getEmptyInitTipsMessage } from "../core/event_message_factory.js";

class Exercise {
  constructor(exerciseID, instructions, tips, validationFuncs) {
    console.log(`Setup exercise ${exerciseID}`);
    this.exerciseID = exerciseID
    this.instructions = instructions;
    this.tips = tips;
    this.validationFuncs = validationFuncs;
  }

  init() {
    console.log(`Initialize exercise ${this.exerciseID}`);
    window.parent.postMessage(this.getInstructionsMsg(), window.origin);
    window.parent.postMessage(this.getTipsMsg(), window.origin);
    this.validate(this.exerciseID, this.validationFuncs);
  }

  getInstructionsMsg() {
    let initInstructionsMsg = getEmptyInitInstructionsMessage();
    initInstructionsMsg.exerciseID = this.exerciseID;
    initInstructionsMsg.content = this.instructions;
    return initInstructionsMsg;
  }

  getTipsMsg() {
    let initTipsMsg = getEmptyInitTipsMessage();
    initTipsMsg.exerciseID = this.exerciseID;
    initTipsMsg.content = this.tips;
    return initTipsMsg;
  }

  beforeSuccess() {}
  afterSuccess() {}
  beforeFail() {}
  afterFail() {}

  validate() {
    let finalResult = true;
    let errorMessages = [];
    for(let i = 0; i < this.validationFuncs.length; i++) {
      try {
        let resultObj = this.validationFuncs[i]();
        if (!resultObj.result) {
          finalResult = false;
          errorMessages.push(resultObj.errorMessage)
          // break; // TODO: support breaking and non breaking errors
        }
      } catch (e) {
        finalResult = false;
        console.log(e);
        // errorMessages.push(e);
      }
    }
    // let exerciseState = window.parent.getExerciseState(exerciseID);
    let exerciseSolvedMsg = getEmptyExerciseStateMessage();
    exerciseSolvedMsg.exerciseID = this.exerciseID;
    exerciseSolvedMsg.content = { 
      solved: finalResult, 
      solution: getSolutionHTMLCode(),
      errorMessages 
    };
    if (exerciseSolvedMsg.content.solved) {
      this.beforeSuccess();
      window.parent.postMessage(exerciseSolvedMsg, window.origin);
      this.afterSuccess();
    } else {
      this.beforeFail();
      window.parent.postMessage(exerciseSolvedMsg, window.origin);
      this.afterFail();
    }
  }
}

function getSolutionHTMLCode() {
  let doc = document.cloneNode(true);
  removeScriptTags(doc);
  let htmlCode = "<html>\n" + doc.documentElement.innerHTML;
  htmlCode = htmlCode.replace("<!-- ************ Den Code hier drunter nicht bearbeiten! ***************** -->", "");
  htmlCode = htmlCode.replace("<!-- Code injected by live-server -->", "");
  htmlCode = htmlCode.replace(/^\s*$(?:\r\n?|\n)/gm, "");
  htmlCode = htmlCode + "\n</html>";
  return htmlCode;
}

function removeScriptTags(doc) {
  var r = doc.getElementsByTagName('script');
  for (var i = (r.length-1); i >= 0; i--) {

      if(r[i].getAttribute('id') != 'a'){
          r[i].parentNode.removeChild(r[i]);
      }
  }
  return r;
}

// function removeScripts() {
//   var r = document.getElementsByTagName('script');
//   let scripts = [];
//   for (var i = (r.length-1); i >= 0; i--) {
//       if(r[i].getAttribute('id') != 'a'){
//           r[i].parentNode.removeChild(r[i]);
//           scripts.push(r[i]);
//       }
//   }
//   return scripts;
// }

// function addScripts() {
  
// }

export { Exercise };