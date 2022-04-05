function getEmptyInitInstructionsMessage() {
  return {
    subject: "initInstructions",
    exerciseID: -1,
    content: ""
  }
};

function getEmptyInitTipsMessage() {
  return {
    subject: "initTips",
    exerciseID: -1,
    content: ""
  };
};

function getEmptyExerciseStateMessage() {
  return {
    subject: "updatedExerciseState",
    exerciseID: -1,
    content: false
  }
}

function getEmptyUpdatePageVariablesMessage() {
  return {
    subject: "updatePageVariables"
  }
}

export {
  getEmptyInitInstructionsMessage,
  getEmptyInitTipsMessage,
  getEmptyExerciseStateMessage,
  getEmptyUpdatePageVariablesMessage};