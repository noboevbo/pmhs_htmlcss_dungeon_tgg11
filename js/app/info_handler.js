import { closeDialogOnOutsideClick } from "../core/helper.js";
import { getMdTitle, getTitleAndContentFromMarkdown } from "../core/markdown_helper.js";
import {
    exerciseInfoListEl, infoDialogWrapperEl
} from "./dom_selectors.js";

var currentInfos = []
var currentInfoNodes = []

async function setInfos(initInfosMsg) {
    let infos = initInfosMsg.content;
    currentInfos = infos;
    currentInfoNodes = [];
    infoDialogWrapperEl.innerHTML = ""; // Reset dialogs
    exerciseInfoListEl.innerHTML = "";
    for (let i = 0; i < infos.length; i++) {
        let info = await getTitleAndContentFromMarkdown(infos[i]);
        let id = `info-${i}`;
        let aNode = getInfoButtonElement(id, info.title)
        let dialog = await getInfoDialogElement(id, info);
        infoDialogWrapperEl.appendChild(dialog);
        exerciseInfoListEl.appendChild(aNode.buttonEl);
        currentInfoNodes.push(aNode);
    }
    console.debug("Load infos");
    await Prism.highlightAllUnder(infoDialogWrapperEl);
}

function getInfoButtonElement(infoID, infoTitle) {
    const buttonEl = document.createElement("button");
    buttonEl.setAttribute("type", "button");
    buttonEl.id = infoID;
    buttonEl.className = "nes-btn is-primary tooltip";
    buttonEl.setAttribute("onclick", `document.getElementById('dialog-info${infoID}').showModal();`);
    const buttonTextEl = document.createElement("span");
    buttonTextEl.innerHTML = `${infoTitle}`;
    buttonEl.appendChild(buttonTextEl);
    return {
        buttonEl,
        buttonTextEl
    };
}

async function getInfoDialogElement(infoID, info) {
    const dialogEl = document.createElement("dialog");
    dialogEl.addEventListener('click', closeDialogOnOutsideClick);
    dialogEl.id = `dialog-info${infoID}`;
    dialogEl.className = "nes-dialog is-rounded";
    const formEl = document.createElement("form");
    formEl.method = "dialog";
    const titleEl = document.createElement("h1");
    titleEl.class = "title";
    titleEl.innerText = `Info`;
    formEl.appendChild(titleEl);
    const contentEl = document.createElement("p");
    if (info.contentIsHTML) {
        contentEl.innerHTML = info.content;
    } else {
        contentEl.innerText = info.content;
    }
    formEl.appendChild(contentEl);
    if (info.weblinks && info.weblinks.length > 0) {
        const linkTitleEl = document.createElement("h2");
        linkTitleEl.innerText = "Weiterführende Links";
        formEl.appendChild(linkTitleEl);
        const linkListEl = document.createElement("ul");
        formEl.appendChild(linkListEl);

        for (let i = 0; i < info.weblinks.length; i++) {
            let link = info.weblinks[i];
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

export {
    setInfos
};
