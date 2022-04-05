function getExerciseState(exerciseID) {
  let item = localStorage.getItem(exerciseID);
  if (item === null) {
      return item;
  }
  return JSON.parse(item);
}

function writeExerciseState(exerciseID, exerciseState) {
  localStorage.setItem(exerciseID, JSON.stringify(exerciseState))
}

function getPlayerGold() {
  let playerGold = localStorage.getItem("playerGold");
  if (playerGold === null) {
      playerGold = 0;
      localStorage.setItem("playerGold", playerGold);
  }
  return parseInt(playerGold);
}

function updatePlayerGold(amount) {
  let playerGold = getPlayerGold();
  playerGold += amount;
  localStorage.setItem("playerGold", playerGold);
}

export { getExerciseState, writeExerciseState, getPlayerGold, updatePlayerGold };