# Videodateien einbinden
Videodateien können über das **video**-Element eingebunden werden. Dieses hat dann ein oder mehrere **source**-Kindelemente. Ein Beispiel wäre:

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4"> <!-- Videodatei 1 -->
  <source src="movie.ogg" type="video/ogg"> <!-- Alternative Datei -->
  Dein Browser unterstützt dieses Video nicht. <!-- Alternativtext, wenn die Videos nicht abgespielt werden können -->
</video>
```

Die source-Elemente benötigen folgende Attribute:

- **src**: Pfad/URL zur Videodatei. 
- **type**: Angabe des **MIME-Types** der Videodatei. MIME-Types zu allen möglichen Dateitypen findest du in den weiterführenden Links oder über eine Suchmaschine (Suchbegriff z.B. **.mp4 Video MIME-Type**).


Das video-Element im Beispiel hat noch folgende Attribute:

- **width**: Gibt die **Breite** an, in der das Video auf der Seite angezeigt wird.
- **height**: Gibt die **Höhe** an, in der das Video auf der Seite angezeigt wird.
- **controls**: Ist dieses Attribut vorhanden werden im Videoplayer im Browser Kontrollelemente für z.B. Play und Pause angezeigt. Dieses Attribut hat keinen Wert (also kein ="true" o.Ä.).

**Wichtig**: Ein video-Element kann mehrere source-Kindelemente haben, das bedeutet **nicht**, dass mehrere Videos angezeigt werden, hierbei handelt es sich um alternativen des selben Videos, z.B. in unterschiedlichen Formaten, falls ein bestimmtes Format vom Browser nicht unterstützt wird. Der Browser zeigt nur das erste unterstützte Video an!

# Audiodateien einbinden
Audiodateien können wie Videodateien eingebunden werden, nur wird stattdessen das **audio**-Element benötigt. Beispiel:

```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  Dein Browser unterstützt diese Audiodatei nicht.
</audio>
```


# Externe Inhalte (z.B. YouTube) einbinden
Externe Inhalte (wie z.B. von YouTube) können über iframes eingebunden werden. Anbieter wie YouTube haben dafür schon vorgefertigten Code, den man dort z.B. über das Teilen Menü erreichen kann.

![Beispiel wie man an den iframe Code für YouTube Videos kommt](/img/yt_einbetten.png)