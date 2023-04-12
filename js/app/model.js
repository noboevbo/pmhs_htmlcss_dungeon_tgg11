import { extend } from '../underscore-esm-min.js';
import { v4 as uuidv4 } from '../uuid.min.js';

var appData;
var db = new PouchDB('dungeon_db');

function getDB() {
  return db;
}

async function resetDB() {
  await db.destroy().then(() => db = new PouchDB('dungeon_db'));
  return db;
}

async function initializeAppData() {
  let defaultAppData = {
    uuid: uuidv4(),
    playerGold: 0,
    selectedExercise: 0,
    playerName: "Erscheint nach Lvl 2"
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
  console.debug("Update appdata");
  console.debug(appData);
  appData.playerGold += amount;
  appData = await createOrUpdate(appData);
}

async function createOrUpdate(dbObject) {
  try {
    let response = await db.put(dbObject);
    dbObject._rev = response.rev;
    return dbObject;
  } catch (err) {
    return false;
  }
}

async function getOrCreate(id, defaultObject) {
  try {
    return await db.get(id);
  } catch {
    console.debug(`GetCreate: Create ${id}`);
    defaultObject._id = id;
    return await createOrUpdate(defaultObject)
  }
}


export {
  getDB,
  createOrUpdate,
  getOrCreate,
  getAppData,
  updateAppData,
  initializeAppData,
  getPlayerGold,
  updatePlayerGold,
  resetDB
};
