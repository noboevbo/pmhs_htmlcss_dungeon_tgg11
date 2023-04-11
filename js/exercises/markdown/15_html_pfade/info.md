# Pfadangaben
Einige HTML-Elemente benötigen Ziele (z.B. href im a-Element) oder Quellen (z.B. src im img-Element). Diese können entweder eine URL (z.B. https://pmhs.de) sein, wenn das Element auf irgendeinem Webserver zugänglich ist, oft sind es aber HTML-Seiten, Bilder oder sonstige Elemente, die auf dem eigenen Server bzw. im eigenen Projektordner liegen. Um diese zu verlinken benötigt man **absolute** oder **relative** Pfade.

## Absolute Pfade
Ein absoluter Pfad ist immer ein vollständiger Pfad bzw. eine vollständige URL. In Windows gehen Pfade immer vom Laufwerksbuchstaben aus (z.B. C:\...). Daraufhin folgt der Pfad in Form von Ordnern, die jeweils durch einen **Backslash (\\)** voneinander getrennt werden, nach dem letzten Backslash folgt meist ein konkreter Dateiname.  Ein Beispiel für einen absoluten Pfad zur HTML-Datei dieser Aufgabe in Windows wäre:

```plain
C:\Benutzer\bug\Desktop\pmhs_htmlcss_dungeon_tgg11\aufgaben\15_html_pfade.html
```

## Relative Pfade
Ein relativer Pfad ist immer relativ zu einem bestimmten Ort. Meistens sind diese Pfade relativ zum Speicherort der HTML-Datei, in der sie verwendet werden. Wird beispielsweise in dieser Aufgabe in einem a-Element ein relativer Pfad für das href-Attribut verwendet wäre dieser ausgehend von folgendem Pfad:

```plan
C:\Benutzer\bug\Desktop\pmhs_htmlcss_dungeon_tgg11\aufgaben
```

Hier ein paar Beispiele:
- `href="16_html_medien.html"` entspricht `href="C:\Benutzer\bug\Desktop\pmhs_htmlcss_dungeon_tgg11\aufgaben\16_html_medien.html"`
- `src="static/ente.jpg"` entspricht `href="C:\Benutzer\bug\Desktop\pmhs_htmlcss_dungeon_tgg11\aufgaben\static\ente.jpg"`

Manchmal muss man ein Verzeichnis erreichen, das oberhalb des aktuellen Verzeichnisses liegt, dafür kann man ".." im Pfad verwenden, ein Beispiel wäre:

- `href="../index.html"` entspricht `href="C:\Benutzer\bug\Desktop\pmhs_htmlcss_dungeon_tgg11\index.html"`

Verwendet man einen Webserver (wie z.B. der Live Server in VS Code über den "Go Live" Button), kann man auch Pfade relativ zum Root-Verzeichnis dieses Webservers machen. Im Fall des Dungeons ist dies immer der Ordner "pmhs_htmlcss_dungeon_tgg11". Beispiele dafür wären:

- `href="/aufgaben/16_html_medien.html"` entspricht `href="C:\Benutzer\bug\Desktop\pmhs_htmlcss_dungeon_tgg11\aufgaben\16_html_medien.html`
- `href="/index.html"` entspricht `href="C:\Benutzer\bug\Desktop\pmhs_htmlcss_dungeon_tgg11\index.html`
- `src="/aufgaben/static/ente.jpg"` entspricht `href="C:\Benutzer\bug\Desktop\pmhs_htmlcss_dungeon_tgg11\aufgaben\static\ente.jpg"`

# Warum relative Pfade?
Relative Pfade funktionieren auch nach einem verschieben des Ordners an einen anderen Ort. Beispiel:

- `href="C:\Benutzer\bug\Desktop\pmhs_htmlcss_dungeon_tgg11\aufgaben\16_html_medien.html"` funktioniert nur auf einem Windows PC mit dem Laufwerk **C:**, auf dem der Benutzer **bug** das pmhs Dungeon auf dem **Desktop** abgelegt hat.
- `href="16_html_medien.html"` funktioniert auf allen Systemen, da der vordere Teil des Pfades dynamisch gesetzt wird.

# Weitere Infos zu Pfaden
Wenn dir noch etwas nicht ganz klar ist, sieh dir noch die Website der Uni Köln und/oder die Videoinfo dieser Aufgabe an.

## Weiterführende Informationen
- [https://lehre.idh.uni-koeln.de/lehrveranstaltungen/wisem20/basissysteme-der-informationsverarbeitung-1-bsi-4/web-technologien/html-1/relative-vs-absolute-pfade/](https://lehre.idh.uni-koeln.de/lehrveranstaltungen/wisem20/basissysteme-der-informationsverarbeitung-1-bsi-4/web-technologien/html-1/relative-vs-absolute-pfade/)
- [https://www.w3schools.com/html/html_filepaths.asp](https://www.w3schools.com/html/html_filepaths.asp)
- [https://www.w3schools.com/html/html_links.asp](https://www.w3schools.com/html/html_links.asp)