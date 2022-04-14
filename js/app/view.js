import { playerGoldEl, playerNameEl } from "./dom_selectors.js";
import { getAppData, getPlayerGold } from "./model.js";

async function updatePageVariables() {
  /* 
  Some results from individual experiments may influence elements on the main page
  For example the first two experiments provide playerNames, which should be shown in the Header bar.
  Such influences on the main page should be handled here.
  */
  await showPlayerName();
  await showPlayerGold();
}

async function showPlayerName() {
  playerNameEl.innerText = await getAppData().playerName; // Exercise 02 solved
}

async function showPlayerGold() {
  let playerGold = await getPlayerGold();
  playerGoldEl.innerText = `${playerGold}`;
}

export { updatePageVariables };