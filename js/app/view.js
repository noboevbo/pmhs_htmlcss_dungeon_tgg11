import { playerGoldEl, playerNameEl } from "./dom_selectors.js";
import { getPlayerGold } from "./model.js";

function updatePageVariables() {
  /* 
  Some results from individual experiments may influence elements on the main page
  For example the first two experiments provide playerNames, which should be shown in the Header bar.
  Such influences on the main page should be handled here.
  */
  showPlayerName();
  showPlayerGold();
}

function showPlayerName() {
  let playerName = localStorage.getItem("02_playerName"); // Exercise 02 solved
  if (playerName === null) {
      playerName = localStorage.getItem("01_playerName");
  }
  if (playerName !== null) {
      playerNameEl.innerText = playerName;
  } else {
      playerNameEl.innerText = "Playername undefined.";
  }
}

function showPlayerGold() {
  let playerGold = getPlayerGold();
  playerGoldEl.innerText = `${playerGold}`;
}

export { updatePageVariables };