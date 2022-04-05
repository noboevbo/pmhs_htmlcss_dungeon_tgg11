import { hasMinBlockOrInlineElements } from '../exercise/validation_helper.js';;
import { Exercise } from '../exercise/exercise_base.js';

let exerciseID = "10_html_block_elemente";
let instructions = `
<ol>
<li>Füge mindestens drei unterschiedliche HTML Block-Elemente ein.</li>
</ol>
`

let tips = [
  {level: 1, title: "Video: HTML Block- vs Inline-Elemente.", content: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/rmkPU84RaY4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, weblinks: ["https://developer.mozilla.org/de/docs/Web/HTML/Block-level_elements"], contentIsHTML: true},
  {level: 1, title: "Wie finde ich heraus was HTML Block-Elemente sind?.", content: "Du kannst einfach nach HTML Block-Elemente googlen! Dort solltest du schnell Informationen finden. Ansonsten findest du hier zwei Links, die dir sicherlich weiterhelfen!", weblinks: ["https://developer.mozilla.org/de/docs/Web/HTML/Block-level_elements", "https://www.w3schools.com/htmL/html_blocks.asp"]},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung kann z.B. so aussehen, es gibt aber noch viel mehr Block-Elemente! <xmp>
  <h1>Überschrift</h1>
  <p>Paragraph</p>
  <blockquote>Zitat</blockquote>
  </xmp>`, contentIsHTML: true}
]

let validationFuncs = [
  function() { return hasMinBlockOrInlineElements(3, false); },
]

let exerciseBase = new Exercise(exerciseID, instructions, tips, validationFuncs);
window.onload = exerciseBase.init();
