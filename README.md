# Flensburg-Stil Geburtstagseinladung

Ein kleines statisches Einseitenprojekt, das zunaechst wie ein amtliches Schreiben zu einem fiktiven Verkehrs- und Lebensfortschrittsvorgang wirkt und sich nach Eingabe eines Zahlencodes als Geburtstagseinladung entpuppt.

## Projektstruktur

```text
.
|-- index.html
|-- style.css
|-- script.js
|-- README.md
`-- assets/
    `-- radar-placeholder.svg
```

## Lokal oeffnen

1. Den Projektordner im Dateimanager oder Editor oeffnen.
2. `index.html` direkt im Browser laden.
3. Fuer einen lokalen Static-Server kann im Projektordner zum Beispiel `python3 -m http.server 8000` verwendet werden und anschliessend `http://localhost:8000` im Browser geoeffnet werden.

Die Seite benoetigt keinen Build-Schritt und keinen Backend-Server.

## Statisch deployen

Die Dateien koennen unveraendert auf jedem statischen Hosting abgelegt werden, zum Beispiel:

- GitHub Pages
- Netlify
- Vercel Static Deployment
- beliebiger Webspace mit HTML/CSS/JS-Unterstuetzung

Wichtig ist nur, dass `index.html`, `style.css`, `script.js` und der Ordner `assets/` gemeinsam veroeffentlicht werden.

## Platzhalter anpassen

Alle zentralen Inhalte stehen oben in [script.js](/Users/Tony/Documents/New project 2/script.js):

- `birthdayPersonName`
- `age`
- `date`
- `time`
- `location`
- `dressCode`
- `rsvpLine`
- `unlockCode`
- `riddleText`

Nach Aenderungen an diesen Werten aktualisiert sich der sichtbare Text automatisch beim Neuladen der Seite.

## Interaktion

- Die Seite startet gesperrt.
- Der Zahlencode wird im Bereich "Freigabe des gesperrten Vorgangs" eingegeben.
- Bei korrektem Code werden die Einladung und die freigegebenen Hinweise sichtbar.
- Der freigegebene Zustand wird in `localStorage` gespeichert.
- Mit "Vorgang wieder sperren" wird der Eintrag geloescht und die Seite erneut gesperrt.

## Design-Notizen

- Die Gestaltung orientiert sich an der Anmutung eines deutschen Schreibens, verwendet aber ausschliesslich fiktive Bezeichnungen und eigene visuelle Elemente.
- Die Seite ist mobile-first aufgebaut und auf schmale iPhone-Screens ausgelegt.
- Die Animationen bleiben bewusst dezent: leichter Shake bei falschem Code, sanftes Einblenden bei Freigabe.
- Es werden keine externen Bibliotheken, keine Cookies, kein Tracking und keine Webfonts verwendet.
