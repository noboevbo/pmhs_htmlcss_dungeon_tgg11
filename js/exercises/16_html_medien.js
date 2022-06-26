import { Exercise } from '../exercise/exercise_base.js';
import { elAttributeValueRegex, elCheckAttributeValue, elementIsCorrectTag, elSrcAttributeIs } from '../exercise/validation_helper.js';

let exerciseID = "16_html_embedded";

let instructions = {
  content: "/js/exercises/markdown/16_html_embedded/aufgabe_html_embedded.md",
  isMarkdown: true
}

let infos = []

let tips = [
  {
    level: 1, title: "Benötigte Tags.", content: `Externe Inhalte (wie z.B. von YouTube) können über iframes eingebunden werden. Anbieter wie YouTube haben dafür schon vorgefertigten Code, den man dort z.B. über das Teilen Menü erreichen kann.
  <figure><img src="img/yt_einbetten.png" alt="Beispiel wie man an den iframe Code für YouTube Videos kommt"></figure>
  Für die direkte Wiedergabe von Video- oder Audiodateien bietet HTML seit Version 5 viele Tags um komfortabel Multimediainhalte einzubetten. Benötigt wird das &lt;video&gt;- und das &lt;audio&gt;-Tag. Weitere Infos findest du auf den verlinkten Websites!`, weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Elemente/video", "https://wiki.selfhtml.org/wiki/HTML/Elemente/audio", "https://wiki.selfhtml.org/wiki/HTML/Elemente/iframe"], contentIsHTML: true
  },
  { level: 2, title: "Kontrollelemente zum Video- oder Audioplayer hinzufügen", content: `Standardmäßig werden keine Kontrollelemente im &lt;video&gt;- oder &lt;audio&gt;-Tag angezeigt, daher kann ein Benutzer ein Video nicht starten oder stoppen. Beide Elemente unterstützen das Attribut controls, ist dieses angegeben, werden Kontrollelemente hinzugefügt! Das Element benötigt keinen Wert. Beispiel: <xmp><video src=".." controls>Dieser Text wird angezeigt, wenn das Video, das im src Attribut angegeben ist nicht angezeigt werden kann.</video></xmp>`, weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Tutorials/Multimedia/video"], contentIsHTML: true },
  {
    level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <video id="video1" src="static/sample.mp4" width="100%" controls></video>
  <audio id="audio1" src="static/airtone_-_shimmer_1.mp3" controls></audio>
  <iframe id="youtube1" width="560" height="315" src="https://www.youtube-nocookie.com/embed/nra1yvVlZwA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </xmp>`, contentIsHTML: true
  }
]

let validationFuncs = [
  function () { return elementIsCorrectTag("video1", "video"); },
  function () { return elSrcAttributeIs("video1", "static/sample.mp4") },
  function () { return elCheckAttributeValue("video1", "width", "100%") },
  function () { return elCheckAttributeValue("video1", "controls", "") },
  function () { return elementIsCorrectTag("audio1", "audio"); },
  function () { return elSrcAttributeIs("audio1", "static/airtone_-_shimmer_1.mp3") },
  function () { return elCheckAttributeValue("audio1", "controls", "") },
  function () { return elementIsCorrectTag("youtube1", "iframe"); },
  function () { return elAttributeValueRegex("youtube1", "src", "http.*youtube"); },
]

let exerciseBase = new Exercise(exerciseID, instructions, infos, tips, validationFuncs);
window.onload = exerciseBase.init();