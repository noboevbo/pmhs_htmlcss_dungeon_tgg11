import { globalVarDoesNotExistMsg, localVarDoesNotExistMsg, isGlobalNotLocalMsg, wrongTypeMsg, stringIsEmptyMsg, isNotConstMsg, elDoesNotExistMsg, elWrongInnerTextMsg, elWrongStyleValueMsg, wrongValueMsg, logCallDoesNotExist, elWrongTagMsg, validationErrorPossibleUndefinedObjMsg } from './error_messages.js'

// Replace console.log with stub implementation and add.
window.console.stdlog = console.log.bind(console);
window.console.log = function(txt) {
    console.stdlog(txt);
    let logcalls = JSON.parse(localStorage.getItem("logcalls"));
    if (!logcalls) {
        logcalls = [];
    }
    logcalls.push(txt);
    localStorage.setItem("logcalls", JSON.stringify(logcalls));
}

export function getFailResultObj(errorMessage) {
  return {result: false, errorMessage}
}

export function getSuccessResultObj() {
  return {result: true, errorMessage: null}
}

export function globalVarExists(globalVarName) {
  if (typeof(window[globalVarName]) === "undefined") {
    return getFailResultObj(globalVarDoesNotExistMsg(globalVarName));
  }
  return getSuccessResultObj();
}

export function localVarExists(variable, varName) {
  if (typeof(window[varName]) !== "undefined") {
    return getFailResultObj(isGlobalNotLocalMsg(varName));
  }
  if (typeof(variable) === "undefined") {
    return getFailResultObj(localVarDoesNotExistMsg(varName))
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
  if (typeof (variable) !== "string") {
    return getFailResultObj(wrongTypeMsg(varName, "string"));
  }
  if (variable.length <= 0) {
    return getFailResultObj(stringIsEmptyMsg(varName));
  }
  return getSuccessResultObj();
}

export function scriptIncludes(requiredText) {
  let scriptEl = document.getElementById("exerciseScript");
  if (!scriptEl.innerText.includes(requiredText)) {
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
  if (typeof (variable) === typeName) {
    return getSuccessResultObj();
  }
  return getFailResultObj(wrongTypeMsg(varName, typeName));
}


export function consoleContains(strValue){
  let lcalls = JSON.parse(localStorage.getItem("logcalls"));
    for(let c in lcalls){
      if(c.includes(strValue)){
        lcalls = [];
        localStorage.setItem("logcalls", JSON.stringify(lcalls));
        return getSuccessResultObj();
      }
    }
    return getFailResultObj(logCallDoesNotExist(strValue));
}

/* HTML Element exercises */
export function elementsExist(elTagName, numOfElements, allowMoreElements=false, inEl=null) {
  let els = inEl ? inEl.getElementsByTagName(elTagName) : document.getElementsByTagName(elTagName);
  if ((allowMoreElements && els.length >= numOfElements) || els.length === numOfElements) {
    return getSuccessResultObj();
  }
  let searchedIn = inEl ? (inEl.id ? inEl.id : inEl.tagName) : "document";
  return getFailResultObj(`In ${searchedIn} wurde(n) <b>${els.length}</b> <em>${elTagName}</em> Tag(s) gefunden, gefordert sind <b>${numOfElements}</b>.`);
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
  return getFailResultObj(`Das Element ${elID} ist kein Kindelement von ${parentID}.`);
}


export function elementIsDirectChildOf(elID, parentID) {
  let el = document.getElementById(elID);
  if (el && el.parentElement && el.parentElement.id === parentID) {
    return getSuccessResultObj();
  } 
  return getFailResultObj(`Das Element ${elID} ist kein direktes Kindelement von ${parentID}.`);
}

export function linkTargetIsCorrect(elID, target) {
  let el = document.getElementById(elID);
  if (el && el.getAttribute("href") === target) {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Das Ziel des Links <em>${elID}</em> ist nicht korrekt!`);
}

export function linkContentIsCorrect(elID, content) {
  let el = document.getElementById(elID);
  if (el && el.innerHTML === content) {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Der Inhalt des Links <em>${elID}</em> ist nicht korrekt!`);
}

export function elSrcAttributeIs(elID, path) {
  let el = document.getElementById(elID);
  if (el && el.getAttribute("src") === path) {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Der Pfad des Elements <em>${elID}</em> ist nicht korrekt!`);
}

export function checkTableContent(elID, tableContent) {
  // tableContent: Nested List rows->columns
  let el = document.getElementById(elID);
  let rows = el.getElementsByTagName("tr");
  let errors = "";
  for(let row=0; row < tableContent.length; row++) {
    let column_descriptions = tableContent[row];
    let curr_row = rows[row];
    let columns = curr_row.querySelectorAll('th,td');
    for(let column=0; column < column_descriptions.length; column++) {
      let column_description = column_descriptions[column];
      let column_type = column_description.type;
      let column_value = column_description.value;
      let curr_column = columns[column];
      if (curr_column.tagName.toUpperCase() !== column_type.toUpperCase()) {
        errors += `Der Zellentyp von Zeile ${row+1} Spalte ${column+1} (Wert: ${column_value}) ist nicht korrekt!<br>`;
      }
      if (curr_column.innerText !== column_value) {
        errors += `Der Wert in Zeile ${row+1} Spalte ${column+1} ist nicht korrekt!<br>`
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
    return getFailResultObj(`Der HTML-Element <em>${elID}</em> existiert nicht!`);
  }
  let myRe = new RegExp(pattern)
  let attribute = el.attributes[attributeName];
  if (el && attribute && myRe.exec(attribute.value)) {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Der Pfad des Elements <em>${el.id}</em> ist nicht korrekt!`);
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
  return getFailResultObj(`Das Attribut ${attributeName} des HTML-Elements ${elID} hat den falschen Wert!`);
}

// export function elementInnerHTMLCorrect(el, elName, requiredContent) {
//   if (el.innerHTML === requiredContent) {
//     return getSuccessResultObj();
//   }
//   return getFailResultObj(`Der Inhalt des Tags ${elName} ist ${el.innerHTML}, sollte aber ${el.innerHTML} sein.`)
// }

export const cssBorderColorNames = ["border-top-color", "border-left-color", "border-bottom-color", "border-right-color"]
export const cssBorderWidthNames = ["border-top-width", "border-left-width", "border-bottom-width", "border-right-width"]
export const cssBorderStyleNames = ["border-top-style", "border-left-style", "border-bottom-style", "border-right-style"]
export const cssMarginNames = ["margin-top", "margin-left", "margin-bottom", "margin-right"]
export const cssPaddingNames = ["padding-top", "padding-left", "padding-bottom", "padding-right"]

export function elCheckStyleSameValue(elName, styleNames, styleValue) {
  let el = document.getElementById(elName);
  for (let i=0; i<styleNames.length; i++) {
    let result = elHasCorrectStyleValue(el, elName, styleNames[i], styleValue)
    if (!result.result) {
      return result
    }
  }
  return getSuccessResultObj();
}
export function classCheckStyleSameValue(className, names, value) {
  return classCheckStyleValues(className, names, Array(names.length).fill(value))
}

export function classCheckStyleValues(className, names, values) {
  for (let i=0; i<names.length; i++) {
    let result = classHasCorrectStyleValue(className, names[i], values[i]);
    if (!result.result) {
      return result;
    }
  }
  return getSuccessResultObj();
}

export function classHasCorrectStyleValue(className, styleName, styleValue) {
  let els = document.getElementsByClassName(className);
  if (els.length === 0) {
    return getFailResultObj(`Keine Elemente gefunden, die die CSS Klasse <em>${className}</em> nutzen.`);
  } 
  for(let i=0; i< els.length; i++) {
    let result = elHasCorrectStyleValue(els[i], className, styleName, styleValue);
    if (!result.result) {
      return result
    }
  }
  return getSuccessResultObj();
}

function getAllCSSRules() {
  return [...document.styleSheets]
  .map(styleSheet => {
    try {
      return [...styleSheet.cssRules]
        .map(rule => rule.cssText)
        .join('');
    } catch (e) {
      console.log('Access to stylesheet %s is denied. Ignoring...', styleSheet.href);
    }
  })
  .filter(Boolean)
  .join('\n');
}

export function cssContains(requiredText) {
  let scriptEl = document.getElementById("meinStyle");
  console.log(scriptEl);
  if (!scriptEl.innerText.toUpperCase().includes(requiredText.toUpperCase())) {
    return getFailResultObj(`Dein Script enthält kein ${requiredText}!`);
  }
  return getSuccessResultObj();
}

export function checkMediaQueries(selektor, conditionTexts, stylesForBreakpoints) {
  let styleSheets = document.styleSheets;
  if (styleSheets.length !== 1) {
    return getFailResultObj("Mehr als ein StyleSheet gefunden, dies wird aktuell nicht unterstützt!")
  }
  let styleSheet = styleSheets[0];
  let corrects = Array(conditionTexts.length).fill(false);
  for (let ruleNum=0; ruleNum<styleSheet.cssRules.length; ruleNum++) {
    console.log(styleSheet);
    let rule = styleSheet.cssRules[ruleNum];
    console.log(rule.constructor.name)
    if (rule.constructor.name === "CSSMediaRule") {
      let returnValues = checkMediaRule(rule, selektor, conditionTexts, stylesForBreakpoints, Array(conditionTexts.length).fill(false), 0);
      console.log(returnValues);
      for (let i=0; i<corrects.length; i++) {
        if (returnValues[i] && !corrects[i]) {
          corrects[i] = true;
        }
      }
    }
  }
  for (let i=0; i<corrects.length; i++) {
    if (!corrects[i]) {
      console.log(corrects);
      return getFailResultObj(`Media Query oder Style für ${selektor} (${conditionTexts[i]}) nicht korrekt.`);
    }
  }
  return getSuccessResultObj();
}

function checkMediaRule(rule, selektor, conditionTexts, values, returnValues, currentDepth) {
  console.log(`Current Depth: ${currentDepth}`);
  if (rule.conditionText !== conditionTexts[currentDepth]) {
    console.log(`Ist: ${rule.conditionText}; Soll: ${conditionTexts[currentDepth]};`)
    return returnValues;
  }
  console.log("Check subrules");
  for (let ruleNum=0; ruleNum<rule.cssRules.length; ruleNum++) {
    let childRule = rule.cssRules[ruleNum];
    if (childRule.constructor.name === "CSSMediaRule") {
      if(!checkMediaRule(childRule, selektor, conditionTexts, values, returnValues, currentDepth+1)) {
        return false;
      }
    } else {
      returnValues[currentDepth] = checkCSSStyleRule(childRule, selektor, values[currentDepth]);
    }
  }

  return returnValues;
}

function checkCSSStyleRule(rule, selektor, values) {
  if (rule.selectorText === selektor) {
    let correctStyles = true;
    for (let i=0; i<values.length; i++) {
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

export function hasClassStyleValue(className, styleName, styleValue) {
  let styleSheets = document.styleSheets;
  console.log(styleSheets);
  for (let i=0; i<styleSheets.length; i++) {
    let styleSheet = styleSheets[0];
    for (let ruleNum=0; ruleNum<styleSheet.cssRules.length; ruleNum++) {
      let rule = styleSheet.cssRules[ruleNum];
      if (rule.selectorText === className) {
        if (rule.style[styleName] === styleValue) {
          return getSuccessResultObj();
        }
      }
    }
  }
  return getFailResultObj(`Im CSS Style ${className} fehlt noch etwas oder ein Wert ist nicht korrekt!`);
}

export function hasQuerySelectorCorrectStyleValue(querySelector, styleName, styleValue) {
  let el = document.querySelector(querySelector);
  return elHasCorrectStyleValue(el, querySelector, styleName, styleValue);
}

export function hasCorrectStyleValue(elName, styleName, styleValue) {
  let el = document.getElementById(elName);
  return elHasCorrectStyleValue(el, elName, styleName, styleValue);
}

export function elHasCorrectStyleValue(el, elName, styleName, styleValue) {
  if (!el) {
    return getFailResultObj(elDoesNotExistMsg(elName));
  } 
  let compStyles = window.getComputedStyle(el);
  let currentValue = compStyles.getPropertyValue(styleName);
  console.log(`${styleName} Ist: ${currentValue} / Soll: ${styleValue}`);
  if (currentValue !== styleValue) {
    return getFailResultObj(elWrongStyleValueMsg(elName, styleName, styleValue));
  }
  return getSuccessResultObj();
}

export function hasMinBlockOrInlineElements(minNumElements, inline = false) {
  let els = document.body.getElementsByTagName("*");
  let found = [];
  for(let i=0; i<els.length; i++) {
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
  return getFailResultObj(`Es sind erst ${found.length} von ${minNumElements} ${inline ? "Inline" : "Block"}-Elemente vorhanden!`)
}

export function isBlockElement(elName) {
  let el = document.getElementById(elName);
  if (!el) {
    return getFailResultObj(elDoesNotExistMsg(elName));
  } 
  if (el.style.display === "block") {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Das Element ${elName} ist kein Block Element`)
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
  return getFailResultObj(`Das Element ${elName} ist kein Inline Element`)
}

export function listHasMinElements(elName, numElements) {
  let el = document.getElementById(elName);
  let children = el.getElementsByTagName("li");
  if (children.length >= numElements) {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Die Liste ${elName} hat nicht genug Elemente (mindestens: ${numElements}).`)
}

export function or(resultObjects) {
  let errorMessage = "";
  for (let i=0; i<resultObjects.length; i++) {
    let resultObj = resultObjects[i];
    if (resultObj.result) {
      return resultObj;
    }
    errorMessage += resultObj.errorMessage + " oder: <br>";
  }
  return getFailResultObj(errorMessage);
}
