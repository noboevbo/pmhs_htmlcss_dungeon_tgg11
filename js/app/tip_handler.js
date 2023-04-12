import { closeDialogOnOutsideClick } from "../core/helper.js";
import { getTitleAndContentFromMarkdown } from "../core/markdown_helper.js";
import {
    dialogWrapperEl,
    exerciseTipListEl
} from "./dom_selectors.js";
import {
    createOrUpdate,
    getDB, updatePlayerGold
} from './model.js';
import {
    updatePageVariables
} from "./view.js";

var currentTips = []
var currentTipNodes = []

async function setTips(initTipMsg) {
    console.debug("setTips");
    console.debug(initTipMsg);
    let db = getDB();

    let exerciseID = initTipMsg.exerciseID;

    let tips = initTipMsg.content;

    currentTips = tips;
    currentTipNodes = [];
    dialogWrapperEl.innerHTML = ""; // Reset dialogs
    exerciseTipListEl.innerHTML = "";

    let exerciseState = await db.get(exerciseID);

    for (let i = 0; i < tips.length; i++) {
        let tip = await getTitleAndContentFromMarkdown(tips[i])
        let isPurchased = await tipIsPurchased(exerciseID, exerciseState, i);
        let aNode = getTipButtonElement(exerciseID, i, getTipPrice(tip.level), tip.title)
        let dialog = await getTipDialogElement(exerciseID, i, tip);
        dialogWrapperEl.appendChild(dialog);
        if (isPurchased || tip.level == 0) {
            setTipPurchasedState(aNode, i);
        }
        exerciseTipListEl.appendChild(aNode.buttonEl);
        currentTipNodes.push(aNode);
    }
    await Prism.highlightAllUnder(dialogWrapperEl);
    // hljs.highlightAll();
}

function getTipButtonElement(exerciseID, tipID, tipCost, tipTitle) {
    const buttonEl = document.createElement("button");
    buttonEl.setAttribute("type", "button");
    buttonEl.id = tipID;
    buttonEl.className = "nes-btn is-warning tooltip";
    buttonEl.addEventListener("click", buyTipDelegate(exerciseID, tipID));
    // buttonEl.setAttribute("onclick", `buyTip("${exerciseID}", ${tipID})`);
    const buttonTextEl = document.createElement("span");
    buttonTextEl.innerHTML = `Tipp ${tipID + 1} (<i class="nes-icon coin is-small"></i> ${tipCost}g)`;
    const tooltipSpanEl = document.createElement("span");
    tooltipSpanEl.className = "tooltiptext";
    const tooltipPEl = document.createElement("p");
    tooltipPEl.className = "nes-balloon from-left nes-pointer tooltip-content";
    tooltipPEl.innerHTML = tipTitle;
    tooltipSpanEl.appendChild(tooltipPEl);
    buttonEl.appendChild(buttonTextEl);
    buttonEl.appendChild(tooltipSpanEl);
    return {
        buttonEl,
        buttonTextEl,
        tooltipSpanEl,
        tooltipPEl
    };
}

async function getTipDialogElement(exerciseID, tipID, tip) {
    const dialogEl = document.createElement("dialog");
    dialogEl.addEventListener('click', closeDialogOnOutsideClick);
    dialogEl.id = `dialog-tip${tipID}`;
    dialogEl.className = "nes-dialog is-rounded";
    const formEl = document.createElement("form");
    formEl.method = "dialog";
    const titleEl = document.createElement("h1");
    titleEl.class = "title";
    titleEl.innerText = `Tipp ${tipID + 1}`;
    formEl.appendChild(titleEl);
    const contentEl = document.createElement("p");

    if (tip.contentIsHTML) {
        contentEl.innerHTML = tip.content;
    } else {
        contentEl.innerText = tip.content;
    }
    formEl.appendChild(contentEl);
    if (tip.weblinks && tip.weblinks.length > 0) {
        const linkTitleEl = document.createElement("h2");
        linkTitleEl.innerText = "Weiterführende Links";
        formEl.appendChild(linkTitleEl);
        const linkListEl = document.createElement("ul");
        formEl.appendChild(linkListEl);

        for (let i = 0; i < tip.weblinks.length; i++) {
            let link = tip.weblinks[i];
            const listItemEl = document.createElement("li");
            linkListEl.appendChild(listItemEl);
            const linkEl = document.createElement("a");
            linkEl.setAttribute("href", link);
            linkEl.setAttribute("target", "_blank")
            linkEl.innerText = link;
            listItemEl.appendChild(linkEl);
        }
    }
    const menuEl = document.createElement("menu");
    menuEl.className = "dialog-menu";
    const okButtonEl = document.createElement("button");
    okButtonEl.className = "nes-btn is-primary";
    okButtonEl.innerText = "Ok";
    menuEl.appendChild(okButtonEl);

    formEl.appendChild(menuEl);
    dialogEl.appendChild(formEl);
    return dialogEl;
}

function setTipPurchasedState(button, tipID) {
    button.buttonEl.className = "nes-btn is-success tooltip";
    button.buttonEl.setAttribute("onclick", `document.getElementById('dialog-tip${tipID}').showModal();`);
    button.buttonTextEl.innerHTML = `Tipp ${tipID + 1}`;
}

function buyTipDelegate(exerciseID, tipNum) {
    return async function () {
        await buyTip(exerciseID, tipNum);
    };
}

async function buyTip(exerciseID, tipNum) {
    let db = getDB();
    let tip = currentTips[tipNum];
    let exerciseState = await db.get(exerciseID);
    if (exerciseState.tipsPurchased[tipNum]) {
        return
    }
    exerciseState.tipsPurchased[tipNum] = true;
    await createOrUpdate(exerciseState);
    await updatePlayerGold(-getTipPrice(tip.level));
    revealTip(tipNum, tip);
    updatePageVariables();
}

function revealTip(tipNum, tip) {
    let currentTipNode = currentTipNodes[tipNum];
    setTipPurchasedState(currentTipNode, tipNum);
}

async function tipIsPurchased(exerciseID, exerciseState, tipNum) {
    if (exerciseState.tipsPurchased.length > tipNum) {
        return exerciseState.tipsPurchased[tipNum];
    }
    let db = getDB();
    await db.get(exerciseState._id).then((exerciseState) => {
        exerciseState.tipsPurchased = Array(currentTips.length).fill(false);
        return createOrUpdate(exerciseState);
    });

    return false;
}

function getTipPrice(tipLevel) {
    switch (tipLevel) {
        case 0:
            return 0;
        case 1:
            return 10;
        case 2:
            return 25;
        case 3:
            return 50;
        case 4:
            return 100;
        default:
            return 5000;
    }
}

export {
    setTips
};
