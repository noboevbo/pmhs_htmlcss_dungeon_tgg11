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

function getUpdatePlayerNameMessage() {
  return {
    subject: "updatePlayerName",
    playerName: ""
  }
}

export {
  getEmptyInitInstructionsMessage,
  getEmptyInitTipsMessage,
  getEmptyExerciseStateMessage,
  getUpdatePlayerNameMessage};