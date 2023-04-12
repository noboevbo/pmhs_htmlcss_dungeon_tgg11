import {
    elDoesNotExistMsg,
    elWrongInnerTextMsg,
    elWrongStyleValueMsg, elWrongTagMsg, globalVarDoesNotExistMsg, isGlobalNotLocalMsg, isNotConstMsg, localVarDoesNotExistMsg, logCallDoesNotExist, stringIsEmptyMsg, wrongTypeMsg, wrongValueMsg
} from "./error_messages.js";


// window.console.stdlog = console.log.bind(console);
// window.console.logs = [];
// window.console.log = function(){
//     console.logs.push(Array.from(arguments));
//     console.stdlog.apply(console, arguments);
// }



export function getFailResultObj(errorMessage) {
    return { result: false, errorMessage };
}

export function getSuccessResultObj() {
    return { result: true, errorMessage: null };
}

export function globalVarExists(globalVarName) {
    if (typeof window[globalVarName] === "undefined") {
        return getFailResultObj(globalVarDoesNotExistMsg(globalVarName));
    }
    return getSuccessResultObj();
}

export function localVarError(varName) {
    return getFailResultObj(localVarDoesNotExistMsg(varName));
}
export function localVarExists(variable, varName) {
    console.warn(window[varName]);
    if (typeof window[varName] !== "undefined") {
        return getFailResultObj(isGlobalNotLocalMsg(varName));
    }
    if (typeof variable === "undefined") {
        return getFailResultObj(localVarDoesNotExistMsg(varName));
    }
    return getSuccessResultObj();
}

export function valueEquals(variable, varName, val) {
    if (variable !== val) {
        return getFailResultObj(wrongValueMsg(varName, val));
    }
    return getSuccessResultObj();
}

export function isNonEmptyString(variable, varName) {
    if (typeof variable !== "string") {
        return getFailResultObj(wrongTypeMsg(varName, "string"));
    }
    if (variable.length <= 0) {
        return getFailResultObj(stringIsEmptyMsg(varName));
    }
    return getSuccessResultObj();
}

export function scriptIncludes(requiredText, tip=null, scriptID="exercise-script") {
    let scriptEl = document.getElementById(scriptID);
    if (!scriptEl) {
        return getFailResultObj(elDoesNotExistMsg(scriptID));
    }
    if (!scriptEl.innerText.includes(requiredText)) {
        if (tip) {
            return getFailResultObj(`Dein Script enthält kein ${tip}!`);
        }
        return getFailResultObj(`Dein Script enthält kein ${requiredText}!`);
    }
    return getSuccessResultObj();
}

export function isConst(varName) {
    try {
        eval(`${varName} = 0`); // Not a const
    } catch (error) {
        if (error instanceof TypeError) {
            return getSuccessResultObj();
        }
    }
    return getFailResultObj(isNotConstMsg(varName));
}

export function isType(variable, varName, typeName) {
    if (typeof variable === typeName) {
        return getSuccessResultObj();
    }
    return getFailResultObj(wrongTypeMsg(varName, typeName));
}

export function consoleContains(strValue) {
    window.console.debug(console.logs);
    let lcalls = JSON.parse(localStorage.getItem("logcalls"));
    for (let c in lcalls) {
        if (c.includes(strValue)) {
            lcalls = [];
            localStorage.setItem("logcalls", JSON.stringify(lcalls));
            return getSuccessResultObj();
        }
    }
    return getFailResultObj(logCallDoesNotExist(strValue));
}

/* HTML Element exercises */
export function elementsExist(
    elTagName,
    numOfElements,
    allowMoreElements = false,
    inEl = null
) {
    let els = inEl
        ? inEl.getElementsByTagName(elTagName)
        : document.getElementsByTagName(elTagName);
    if (
        (allowMoreElements && els.length >= numOfElements) ||
        els.length === numOfElements
    ) {
        return getSuccessResultObj();
    }
    let searchedIn = inEl ? (inEl.id ? inEl.id : inEl.tagName) : "document";
    return getFailResultObj(
        `In ${searchedIn} wurde(n) <b>${els.length}</b> <em>${elTagName}</em> Tag(s) gefunden, gefordert sind <b>${numOfElements}</b>.`
    );
}

export class NavListItem {
    constructor(href, innerText) {
        this.href = href;
        this.innerText = innerText;
    }
}

export function navListContainsElements(el, listElId, navListItems) {
    // let el = document.getElementById(listElId);
    if (!el) {
        return getFailResultObj(elDoesNotExistMsg(listElId));
    }

    let children = el.getElementsByTagName("li");

    if (children.length !== navListItems.length) {
        return getFailResultObj(
            `Liste ${listElId} enthält ${children.length} Elemente. Gefordert sind ${navListItems.length}.`
        );
    }
    for (let i = 0; i < navListItems.length; i++) {
        let target = navListItems[i];
        let child = children[i].children[0];
        console.trace(child);
        if (child == undefined || child.tagName !== "A") {
            return getFailResultObj(
                `Das ${i}te ListItem der Liste ${listElId} enthält keinen Link.`
            );
        }
        if (target.href !== child.getAttribute("href")) {
            return getFailResultObj(
                `Das ${i}te ListItem der Liste ${listElId} verweist auf die Website '${child.href}', gefordert ist '${target.href}'.`
            );
        }
        if (target.innerText !== child.innerText) {
            return getFailResultObj(
                `Das ${i}te ListItem der Liste ${listElId} enthält den Text ${child.innerText}, gefordert ist ${target.innerText}.`
            );
        }
    }
    return getSuccessResultObj();
}

export function innerTextEquals(elID, innerText) {
    let h1El = document.getElementById(elID);
    if (!h1El) {
        return getFailResultObj(elDoesNotExistMsg(elID));
    }
    if (h1El.innerText !== innerText) {
        return getFailResultObj(elWrongInnerTextMsg(elID, innerText));
    }
    return getSuccessResultObj();
}

export function elContainsInnerHTML(elID, innerText) {
    let el = document.getElementById(elID);
    if (!el) {
        return getFailResultObj(elDoesNotExistMsg(elID));
    }
    if (!el.innerHTML.includes(innerText)) {
        return getFailResultObj(`Das HTML-Element ${elID} beinhaltet nicht <strong>${innerText}</strong>.`);
    }
    return getSuccessResultObj();
}


export function innerTextStartsWith(elID, innerText) {
    let h1El = document.getElementById(elID);
    if (!h1El) {
        return getFailResultObj(elDoesNotExistMsg(elID));
    }
    if (!h1El.innerText.startsWith(innerText)) {
        return getFailResultObj(elWrongInnerTextMsg(elID, innerText));
    }
    return getSuccessResultObj();
}

export function elementIsCorrectTag(elID, requiredTag) {
    let el = document.getElementById(elID);
    if (!el) {
        return getFailResultObj(elDoesNotExistMsg(elID));
    }
    if (el.tagName.toUpperCase() !== requiredTag.toUpperCase()) {
        return getFailResultObj(elWrongTagMsg(elID, el.tagName, requiredTag));
    }
    return getSuccessResultObj();
}

export function elementIsChildOf(elID, parentID) {
    let el = document.getElementById(elID);
    while (el.parentNode) {
        el = el.parentNode;
        if (el.id === parentID) {
            return getSuccessResultObj();
        }
    }
    return getFailResultObj(
        `Das Element ${elID} ist kein Kindelement von ${parentID}.`
    );
}

export function elementIsDirectChildOf(elID, parentID) {
    let el = document.getElementById(elID);
    if (el && el.parentElement && el.parentElement.id === parentID) {
        return getSuccessResultObj();
    }
    return getFailResultObj(
        `Das Element ${elID} ist kein direktes Kindelement von ${parentID}.`
    );
}

export function linkTargetIsCorrect(elID, target) {
    return elAttributeIs(elID, "href", target)
}

export function linkContentIsCorrect(elID, content) {
    let el = document.getElementById(elID);
    if (el && el.innerHTML === content) {
        return getSuccessResultObj();
    }
    return getFailResultObj(
        `Der Inhalt des Links <em>${elID}</em> ist nicht korrekt!`
    );
}

export function linkContentContains(elID, content) {
    let el = document.getElementById(elID);
    if (el && el.innerHTML.includes(content)) {
        return getSuccessResultObj();
    }
    return getFailResultObj(
        `Der Inhalt des Links <em>${elID}</em> ist nicht korrekt!`
    );
}

export function elSrcAttributeIs(elID, path) {
    return elAttributeIs(elID, "src", path)
}

export function elChildElAttributeIs(elID, childEl, attributeName, attributeValue) {
    let el = document.getElementById(elID);
    if (!el) {
        return getFailResultObj(elDoesNotExistMsg(elID));
    }
    let children = el.getElementsByTagName(childEl);
    if (children.length < 1) {
        return `Es wurden keine Kindelemente vom Typ ${childEl} in ${elID} gefunden`;
    }
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.getAttribute(attributeName) === attributeValue) {
            return getSuccessResultObj();
        }
    }
    return getFailResultObj(
        `Der Wert des Attributs <em>${attributeName}</em> im HTML-Element <em>${elID}</em> ist nicht korrekt!`
    );
}

export function elChildElInnerTextIs(elID, childEl, innerText) {
    let el = document.getElementById(elID);
    if (!el) {
        return getFailResultObj(elDoesNotExistMsg(elID));
    }
    let children = el.getElementsByTagName(childEl);
    if (children.length < 1) {
        return `Es wurden keine Kindelemente vom Typ ${childEl} in ${elID} gefunden`;
    }
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.innerText === innerText) {
            return getSuccessResultObj();
        }
    }
    return getFailResultObj(
        `Der Inhalt des Elements <em>${childEl}</em> im HTML-Element <em>${elID}</em> ist nicht korrekt!`
    );
}

export function elAttributeIs(elID, attributeName, attributeValue) {
    let el = document.getElementById(elID);
    if (el && el.getAttribute(attributeName) === attributeValue) {
        return getSuccessResultObj();
    }
    return getFailResultObj(
        `Der Wert des Attributs <em>${attributeName}</em> im HTML-Element <em>${elID}</em> ist nicht korrekt!`
    );
}

export function checkTableContent(elID, tableContent) {
    // tableContent: Nested List rows->columns
    let el = document.getElementById(elID);
    let rows = el.getElementsByTagName("tr");
    let errors = "";
    for (let row = 0; row < tableContent.length; row++) {
        let column_descriptions = tableContent[row];
        let curr_row = rows[row];
        let columns = curr_row.querySelectorAll("th,td");
        for (let column = 0; column < column_descriptions.length; column++) {
            let column_description = column_descriptions[column];
            let column_type = column_description.type;
            let column_value = column_description.value;
            let curr_column = columns[column];
            if (
                curr_column.tagName.toUpperCase() !== column_type.toUpperCase()
            ) {
                errors += `Der Zellentyp von Zeile ${row + 1} Spalte ${column + 1
                    } (Wert: ${column_value}) ist nicht korrekt!<br>`;
            }
            if (curr_column.innerText !== column_value) {
                errors += `Der Wert in Zeile ${row + 1} Spalte ${column + 1
                    } ist nicht korrekt!<br>`;
            }
        }
    }
    if (errors === "") {
        return getSuccessResultObj();
    }
    return getFailResultObj(errors);
}
export function elAttributeValueRegex(elID, attributeName, pattern) {
    let el = document.getElementById(elID);
    if (!el) {
        return getFailResultObj(
            `Der HTML-Element <em>${elID}</em> existiert nicht!`
        );
    }
    let myRe = new RegExp(pattern);
    let attribute = el.attributes[attributeName];
    if (el && attribute && myRe.exec(attribute.value)) {
        return getSuccessResultObj();
    }
    return getFailResultObj(
        `Der Pfad des Elements <em>${el.id}</em> ist nicht korrekt!`
    );
}

export function elCheckAttributeValue(elID, attributeName, value) {
    let el = document.getElementById(elID);
    if (el) {
        let attribute = el.attributes[attributeName];
        if (attribute && attribute.value === value) {
            return getSuccessResultObj();
        }
    } else {
        return getFailResultObj(`Das HTML-Elements ${elID} existiert nicht!`);
    }
    return getFailResultObj(
        `Das Attribut ${attributeName} des HTML-Elements ${elID} hat den falschen Wert!`
    );
}

// export function elementInnerHTMLCorrect(el, elName, requiredContent) {
//   if (el.innerHTML === requiredContent) {
//     return getSuccessResultObj();
//   }
//   return getFailResultObj(`Der Inhalt des Tags ${elName} ist ${el.innerHTML}, sollte aber ${el.innerHTML} sein.`)
// }

export const cssBorderColorNames = [
    "border-top-color",
    "border-left-color",
    "border-bottom-color",
    "border-right-color",
];
export const cssBorderWidthNames = [
    "border-top-width",
    "border-left-width",
    "border-bottom-width",
    "border-right-width",
];
export const cssBorderStyleNames = [
    "border-top-style",
    "border-left-style",
    "border-bottom-style",
    "border-right-style",
];
export const cssBorderRadiusNames = [
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius"
];
export const cssMarginNames = [
    "margin-top",
    "margin-left",
    "margin-bottom",
    "margin-right",
];
export const cssPaddingNames = [
    "padding-top",
    "padding-left",
    "padding-bottom",
    "padding-right",
];

export const cssPaddingNamesLR = [
    "padding-left",
    "padding-right",
];

export function elCheckStyleSameValue(elName, styleNames, styleValue) {
    let el = document.getElementById(elName);
    for (let i = 0; i < styleNames.length; i++) {
        let result = elHasCorrectStyleValue(
            el,
            elName,
            styleNames[i],
            styleValue
        );
        if (!result.result) {
            return result;
        }
    }
    return getSuccessResultObj();
}

export function classCheckStyleSameValue(className, names, value, round=null) {
    return classCheckStyleValues(
        className,
        names,
        Array(names.length).fill(value),
        round
    );
}

export function classCheckStyleValues(className, names, values, round=null) {
    for (let i = 0; i < names.length; i++) {
        let result = classHasCorrectStyleValue(className, names[i], values[i], round);
        if (!result.result) {
            return result;
        }
    }
    return getSuccessResultObj();
}

export function classHasCorrectStyleValue(className, styleName, styleValue, round=null) {
    let els = document.getElementsByClassName(className);
    if (els.length === 0) {
        return getFailResultObj(
            `Keine Elemente gefunden, die die CSS Klasse <em>${className}</em> nutzen.`
        );
    }
    for (let i = 0; i < els.length; i++) {
        let result = elHasCorrectStyleValue(
            els[i],
            className,
            styleName,
            styleValue,
            round
        );
        if (!result.result) {
            return result;
        }
    }
    return getSuccessResultObj();
}

function getAllCSSRules() {
    return [...document.styleSheets]
        .map((styleSheet) => {
            try {
                return [...styleSheet.cssRules]
                    .map((rule) => rule.cssText)
                    .join("");
            } catch (e) {
                console.debug(
                    "Access to stylesheet %s is denied. Ignoring...",
                    styleSheet.href
                );
            }
        })
        .filter(Boolean)
        .join("\n");
}

export function cssContains(requiredText) {
    let scriptEl = document.getElementById("meinStyle");
    console.debug(scriptEl);
    if (
        !scriptEl.innerText.toUpperCase().includes(requiredText.toUpperCase())
    ) {
        return getFailResultObj(`Dein Script enthält kein ${requiredText}!`);
    }
    return getSuccessResultObj();
}

export function checkMediaQueries(
    selektor,
    conditionTexts,
    stylesForBreakpoints
) {
    let styleSheets = document.styleSheets;
    if (styleSheets.length !== 1) {
        return getFailResultObj(
            "Mehr als ein StyleSheet gefunden, dies wird aktuell nicht unterstützt!"
        );
    }
    let styleSheet = styleSheets[0];
    let corrects = Array(conditionTexts.length).fill(false);
    for (let ruleNum = 0; ruleNum < styleSheet.cssRules.length; ruleNum++) {
        console.debug(styleSheet);
        let rule = styleSheet.cssRules[ruleNum];
        console.debug(rule.constructor.name);
        if (rule.constructor.name === "CSSMediaRule") {
            let returnValues = checkMediaRule(
                rule,
                selektor,
                conditionTexts,
                stylesForBreakpoints,
                Array(conditionTexts.length).fill(false),
                0
            );
            console.debug(returnValues);
            for (let i = 0; i < corrects.length; i++) {
                if (returnValues[i] && !corrects[i]) {
                    corrects[i] = true;
                }
            }
        }
    }
    for (let i = 0; i < corrects.length; i++) {
        if (!corrects[i]) {
            console.debug(corrects);
            return getFailResultObj(
                `Media Query oder Style für ${selektor} (${conditionTexts[i]}) nicht korrekt.`
            );
        }
    }
    return getSuccessResultObj();
}

function checkMediaRule(
    rule,
    selektor,
    conditionTexts,
    values,
    returnValues,
    currentDepth
) {
    console.debug(`Current Depth: ${currentDepth}`);
    if (rule.conditionText !== conditionTexts[currentDepth]) {
        console.debug(
            `Ist: ${rule.conditionText}; Soll: ${conditionTexts[currentDepth]};`
        );
        return returnValues;
    }
    console.debug("Check subrules");
    for (let ruleNum = 0; ruleNum < rule.cssRules.length; ruleNum++) {
        let childRule = rule.cssRules[ruleNum];
        if (childRule.constructor.name === "CSSMediaRule") {
            if (
                !checkMediaRule(
                    childRule,
                    selektor,
                    conditionTexts,
                    values,
                    returnValues,
                    currentDepth + 1
                )
            ) {
                return false;
            }
        } else {
            returnValues[currentDepth] = checkCSSStyleRule(
                childRule,
                selektor,
                values[currentDepth]
            );
        }
    }

    return returnValues;
}

function checkCSSStyleRule(rule, selector, values) {
    if (rule.selectorText === selector) {
        let correctStyles = true;
        for (let i = 0; i < values.length; i++) {
            let style = values[i];
            if (rule.style[style.name] !== style.value) {
                correctStyles = false;
            }
        }
        if (!correctStyles) {
            return false;
        }
    }
    return true;
}

export function elHasCSSClass(elName, className) {
    console.debug(elName)
    let el = document.getElementById(elName);
    console.debug(el)
    if (!el) {
        return getFailResultObj(
            `Der HTML-Element <em>${elName}</em> existiert nicht!`
        );
    }
    if (el && el.classList.contains(className)) {
        return getSuccessResultObj();
    }
    console.debug(el);
    console.debug(el.classList);
    return getFailResultObj(
        `Das Element <em>${elName}</em> nutzt nicht die CSS Klasse <em>${className}</em>!`
    );
}

export function hasSelectorStyleValue(selectorName, styleName, styleValue) {
    let styleSheets = document.styleSheets;
    console.debug(styleSheets);
    for (let i = 0; i < styleSheets.length; i++) {
        let styleSheet = styleSheets[0];
        for (let ruleNum = 0; ruleNum < styleSheet.cssRules.length; ruleNum++) {
            let rule = styleSheet.cssRules[ruleNum];
            if (rule.selectorText.includes(selectorName)) {
                console.debug(rule);
                if (rule.style[styleName] === styleValue) {
                    return getSuccessResultObj();
                }
            }
        }
    }
    return getFailResultObj(
        `Im CSS Style ${selectorName} fehlt noch etwas oder ein Wert ist nicht korrekt!`
    );
}

export function hasQuerySelectorCorrectStyleValue(
    querySelector,
    styleName,
    styleValue
) {
    let el = document.querySelector(querySelector);
    return elHasCorrectStyleValue(el, querySelector, styleName, styleValue);
}

export function hasCorrectStyleValue(elName, styleName, styleValue) {
    let el = document.getElementById(elName);
    return elHasCorrectStyleValue(el, elName, styleName, styleValue);
}

export function elHasCorrectStyleValue(el, elName, styleName, styleValue, round=null) {
    if (!el) {
        return getFailResultObj(elDoesNotExistMsg(elName));
    }
    let compStyles = window.getComputedStyle(el);
    let currentValue = compStyles.getPropertyValue(styleName);
    console.debug(`${styleName} Ist: ${currentValue} / Soll: ${styleValue}`);
    let success = false
    if (round != null) {
        success = parseFloat(currentValue).toFixed(round) === parseFloat(styleValue).toFixed(round);
    } else {
        success = currentValue === styleValue;
    }
    if (!success) {
        return getFailResultObj(
            elWrongStyleValueMsg(elName, styleName, styleValue)
        );
    }
    return getSuccessResultObj();
}

export function hasMinBlockOrInlineElements(minNumElements, inline = false) {
    let els = document.body.getElementsByTagName("*");
    let found = [];
    for (let i = 0; i < els.length; i++) {
        let el = els[i];
        if (el.tagName.toUpperCase() === "SCRIPT") {
            continue;
        }
        let isBlock = window.getComputedStyle(el, null).display === "block";
        if ((!inline && isBlock) || (inline && !isBlock)) {
            if (!found.includes(el.tagName)) {
                found.push(el.tagName);
            }
        }
        if (found.length >= minNumElements) {
            return getSuccessResultObj();
        }
    }
    return getFailResultObj(
        `Es sind erst ${found.length} von ${minNumElements} ${inline ? "Inline" : "Block"
        }-Elemente vorhanden!`
    );
}

export function isBlockElement(elName) {
    let el = document.getElementById(elName);
    if (!el) {
        return getFailResultObj(elDoesNotExistMsg(elName));
    }
    if (el.style.display === "block") {
        return getSuccessResultObj();
    }
    return getFailResultObj(`Das Element ${elName} ist kein Block Element`);
}

export function isInlineElement(elName) {
    // inline-block is considered inline
    let el = document.getElementById(elName);
    if (!el) {
        return getFailResultObj(elDoesNotExistMsg(elName));
    }
    if (el.style.display !== "block") {
        return getSuccessResultObj();
    }
    return getFailResultObj(`Das Element ${elName} ist kein Inline Element`);
}

export function listHasMinElements(elName, numElements) {
    let el = document.getElementById(elName);
    let children = el.getElementsByTagName("li");
    if (children.length >= numElements) {
        return getSuccessResultObj();
    }
    return getFailResultObj(
        `Die Liste ${elName} hat nicht genug Elemente (mindestens: ${numElements}).`
    );
}

/* Horizontal Distance */

export function checkHorizontalDistanceBetweenElementsBetween(elName1, elName2, targetDistanceFrom, targetDistanceTo, decimals=0) {
    const distance = getHorizontalDistanceBetweenElements(elName1, elName2).toFixed(decimals);
    console.debug(`Distanz Ist: ${distance} / Soll: ${targetDistanceFrom} - ${targetDistanceTo}`);
    if (distance >= targetDistanceFrom.toFixed(decimals) && distance <= targetDistanceTo.toFixed(decimals)) {
        return getSuccessResultObj();
    }
    return getFailResultObj(`Die horizontale Entfernung von ${elName1} und ${elName2} ist nicht korrekt.`)
}

export function checkHorizontalDistanceBetweenElements(elName1, elName2, targetDistance, decimals=0) {
    const distance = getHorizontalDistanceBetweenElements(elName1, elName2).toFixed(decimals);
    console.debug(`Distanz Ist: ${distance} / Soll: ${targetDistance}`);
    if (distance === targetDistance.toFixed(decimals)) {
        return getSuccessResultObj();
    }
    return getFailResultObj(`Die horizontale Entfernung von ${elName1} und ${elName2} ist nicht korrekt.`)
}

export function getHorizontalDistanceBetweenElements(elName1, elName2) {
    let el1 = document.getElementById(elName1);
    if (!el1) {
        return getFailResultObj(elDoesNotExistMsg(elName1));
    }
    let el2 = document.getElementById(elName2);
    if (!el2) {
        return getFailResultObj(elDoesNotExistMsg(elName2));
    }
    const bb1 = el1.getBoundingClientRect();
    const bb2 = el2.getBoundingClientRect();
    return bb2.left-bb1.right;
}

export function getVerticalDistanceBetweenElements(elName1, elName2) {
    let el1 = document.getElementById(elName1);
    if (!el1) {
        return getFailResultObj(elDoesNotExistMsg(elName1));
    }
    let el2 = document.getElementById(elName2);
    if (!el2) {
        return getFailResultObj(elDoesNotExistMsg(elName2));
    }
    const bb1 = el1.getBoundingClientRect();
    const bb2 = el2.getBoundingClientRect();
    return bb2.top-bb1.bottom;
}

export function checkVerticalDistanceBetweenElements(elName1, elName2, targetDistance, decimals=0) {
    const distance = getVerticalDistanceBetweenElements(elName1, elName2).toFixed(decimals);
    console.debug(`Distanz Ist: ${distance} / Soll: ${targetDistance}`);
    if (distance === targetDistance.toFixed(decimals)) {
        return getSuccessResultObj();
    }
    return getFailResultObj(`Die vertikale Entfernung von ${elName1} und ${elName2} ist nicht korrekt.`)
}

export function or(resultObjects) {
    let errorMessage = "";
    for (let i = 0; i < resultObjects.length; i++) {
        let resultObj = resultObjects[i];
        if (resultObj.result) {
            return resultObj;
        }
        errorMessage += resultObj.errorMessage + " oder: <br>";
    }
    return getFailResultObj(errorMessage);
}
