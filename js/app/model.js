import { extend } from '../underscore-esm-min.js';

var appData;
var db = new PouchDB('dungeon_db');

function getDB() {
  return db;
}

async function initializeAppData() {
  let defaultAppData =  {
      playerGold: 0,
      selectedExercise: 0,
  };
  appData = await getOrCreate("appData", defaultAppData);
  return appData;
}

async function getAppData() {
  return appData;
}

async function updateAppData(appDataNew) {
  extend(appData, appDataNew);
  appData = await createOrUpdate(appData);
  return appData;
}

async function getPlayerGold() {
  return appData.playerGold;
}

async function updatePlayerGold(amount) {
  appData.playerGold += amount;
  await createOrUpdate(appData);
}

async function createOrUpdate(dbObject) {
  try {
      let response = await db.put(dbObject);
      console.log(response)
      dbObject._rev = response.rev;
      return dbObject;
  } catch (err) {
      console.log(`Error during updating object: ${dbObject} (${err})`);
      return false;
  }
}

async function getOrCreate(id, defaultObject) {
  try {
      return await db.get(id);
  } catch {
      defaultObject._id = id;
      return await createOrUpdate(defaultObject)
  }
}


export { getDB, createOrUpdate, getOrCreate, getAppData, updateAppData, initializeAppData, getPlayerGold, updatePlayerGold };