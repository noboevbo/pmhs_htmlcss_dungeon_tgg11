import { checkMediaQueries, classCheckStyleSameValue, classCheckStyleValues, classHasCorrectStyleValue, cssBorderColorNames, cssBorderStyleNames, cssBorderWidthNames, cssMarginNames, cssPaddingNames, hasClassStyleValue as hasStyleValue, hasCorrectStyleValue, hasQuerySelectorCorrectStyleValue} from '../exercise/validation_helper.js';
import { Exercise } from '../exercise/exercise_base.js';

let exerciseID = "15_css_responsive_img";


let instructions = `
Setze in dieser Aufgabe Typselektoren ein!
<ol>
<li>Das erste Bild (<em>imgA</em>) soll seine Größe fließend an die verfügbare Breite anpassen. Das Seitenverhältnis des Bildes soll dabei konstent bleiben.</li>
<li>Das zweite Bild (<em>imgB</em>) soll seine Breite stufenweise wie folgt anpassen (Tipp: Nutze max-width Media Queries die nur für <em>screen</em> gültig sind!):<ul>
<li>max-width 240px -> Breite: 100px</li>
<li>max-width 480px -> Breite: 200px</li>
<li>max-width 720px -> Breite: 300px</li>
<li>max-width 960px -> Breite: 400px</li>
</ul></li>
</ol>
`

let tips = [
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <style id="meinStyle">
    #imgA {
      width: 100%;
    }

    @media only screen and (min-width: 240px) {
    /* Probably some parent element that limits the img width */
    #imgB {
      width: 100px;
    }

    @media only screen and (min-width: 480px) {
    /* Probably some parent element that limits the img width */
    #imgB {
      width: 200px;
    }

    @media only screen and (min-width: 720px) {
    /* Probably some parent element that limits the img width */
    #imgB {
      width: 300px;
    }

    @media only screen and (min-width: 960px) {
    /* Probably some parent element that limits the img width */
    #imgB {
      width: 400px;
    }
  }
  </style>
  </xmp>`, contentIsHTML: true}
]

let conditionTexts = [
  "only screen and (min-width: 240px)",
  "only screen and (min-width: 480px)",
  "only screen and (min-width: 720px)",
  "only screen and (min-width: 960px)",  
]

let styleValuesForBreakpoints = [
  [{name: "width", value: "100px"}],
  [{name: "width", value: "200px"}],
  [{name: "width", value: "300px"}],
  [{name: "width", value: "400px"}],
]

let validationFuncs = [
  function() { return hasCorrectStyleValue("imgA", "width", "100%"); },
  function() { return checkMediaQueries("#imgB", conditionTexts, styleValuesForBreakpoints); },
]

let exerciseBase = new Exercise(exerciseID, instructions, tips, validationFuncs);
window.onload = exerciseBase.init();