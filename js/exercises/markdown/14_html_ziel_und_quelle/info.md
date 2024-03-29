# Info: HTML Links
HTML Links werden über das a-Element (anchor) erstellt. Dieses benötigt das Attribut **href**, in dem das Ziel (z.B. eine URL oder ein Dateipfad) angegeben wird. Der Inhalt des Elements ist dann der Text, der auf der Website angezeigt werden soll. 

## Beispiel
```html
<a href="https://www.pmhs.de/">PMHS Nürtingen</a>
```

# Links in neuen Tabs öffnen
Um einen Link (a-Element) in einem neuen Browser-Tab zu öffnen muss man den Wert des Attributs **target** auf **_blank** setzen.

## Beispiel
```html
<a href="https://www.pmhs.de/" target="_blank">PMHS Nürtingen</a>
```

# Bilder
Bilder werden in HTML über das img-Element (image) eingebunden. Dieses benötigt eine Angabe zur Quelle des Bildes (**src-Attribut**) sowie einen alternativen Text (**alt-Attribut**), der benötigt wird, wenn das Bild nicht geladen werden kann oder die Website über einen Screenreader vorgelesen wird. **Wichtig**: Das img-Element ist ein Standalone-Tag, d.h. es hat keinen Inhalt und damit kein End-Tag!

## Beispiel
```html
<img src="https://www.pmhs.de/logo.png" alt="Das Logo der PMHS Nürtingen">.
```

## Weiterführende Informationen
- [https://www.w3schools.com/tags/tag_a.asp](https://www.w3schools.com/tags/tag_a.asp)
- [https://www.w3schools.com/tags/tag_img.asp](https://www.w3schools.com/tags/tag_img.asp)