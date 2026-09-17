# 🐾 DogBuddy – Gemeinsam wachsen

DogBuddy ist eine von mir entwickelte Webanwendung zur Organisation des Alltags, Trainings und der Entwicklung meines Hundes.

Das Projekt entsteht im Rahmen meiner Umschulung zur **Fachinformatikerin für Anwendungsentwicklung**. Ich nutze DogBuddy, um die Themen **HTML, CSS und JavaScript** nicht nur einzeln zu üben, sondern in einer zusammenhängenden Anwendung praktisch miteinander zu verbinden.

Aus einer zunächst überwiegend statischen Webseite ist Schritt für Schritt eine Anwendung entstanden, die inzwischen Daten entgegennimmt, verarbeitet, speichert, verändert, löscht und auf mehreren Seiten wiederverwendet.

Aktuell arbeitet DogBuddy als **lokale Browser-Anwendung bzw. MVP (Minimum Viable Product)**.

Die Daten werden derzeit hauptsächlich über:

- `localStorage`
- `IndexedDB`

direkt im Browser gespeichert.

Ein eigenes Backend oder eine externe Datenbank wird für den aktuellen Stand noch nicht benötigt.

> **Ziel dieser Dokumentation**
>
> Diese README beschreibt nicht nur die fertige Struktur des Projekts.  
> Ich dokumentiere auch, **wie ich die einzelnen Funktionen umgesetzt habe, warum ich bestimmte Lösungen gewählt habe, welche Probleme während der Entwicklung aufgetreten sind und wie ich diese gelöst habe**.

---

# 📑 Inhaltsverzeichnis

1. [Projektidee und Ziel](#1-projektidee-und-ziel)
2. [Planung und Projektstruktur](#2-planung-und-projektstruktur)
3. [Warum HTML, CSS und JavaScript getrennt sind](#3-warum-html-css-und-javascript-getrennt-sind)
4. [Warum JavaScript und nicht Java?](#4-warum-javascript-und-nicht-java)
5. [Erster Aufbau der Benutzeroberfläche](#5-erster-aufbau-der-benutzeroberfläche)
6. [Dashboard – von statisch zu dynamisch](#6-dashboard--von-statisch-zu-dynamisch)
7. [Hundprofil und automatische Altersberechnung](#7-hundprofil-und-automatische-altersberechnung)
8. [Entwicklung – Gewicht und Schulterhöhe](#8-entwicklung--gewicht-und-schulterhöhe)
9. [Training und Sternebewertung](#9-training-und-sternebewertung)
10. [Tagebuch – vom einfachen Eintrag zum CRUD-Bereich](#10-tagebuch--vom-einfachen-eintrag-zum-crud-bereich)
11. [Fotos – warum IndexedDB notwendig wurde](#11-fotos--warum-indexeddb-notwendig-wurde)
12. [Verbindung zwischen localStorage und IndexedDB](#12-verbindung-zwischen-localstorage-und-indexeddb)
13. [localStorage – aktuelle Datenspeicherung](#13-localstorage--aktuelle-datenspeicherung)
14. [JSON und Datenformate](#14-json-und-datenformate)
15. [DOM und Event Listener](#15-dom-und-event-listener)
16. [CRUD-Prinzip](#16-crud-prinzip)
17. [Fehler und Problemlösungen während der Entwicklung](#17-fehler-und-problemlösungen-während-der-entwicklung)
18. [Wochenplan](#18-wochenplan)
19. [Gesundheit](#19-gesundheit)
20. [Galerie](#20-galerie)
21. [database.js und Trennung der Speicherlogik](#21-databasejs-und-trennung-der-speicherlogik)
22. [Mögliche spätere Anbindung an Supabase](#22-mögliche-spätere-anbindung-an-supabase)
23. [Alternative mit SQL Server Express und API](#23-alternative-mit-sql-server-express-und-api)
24. [Bilder, Logo und Dateiformate](#24-bilder-logo-und-dateiformate)
25. [Git und GitHub](#25-git-und-github)
26. [Was ich durch das Projekt gelernt habe](#26-was-ich-durch-das-projekt-gelernt-habe)
27. [Aktueller Stand und nächste Schritte](#27-aktueller-stand-und-nächste-schritte)

---

# 1. Projektidee und Ziel

Die Grundidee von DogBuddy ist, Informationen aus dem Alltag mit meinem Hund an einer zentralen Stelle zusammenzuführen.

Im Alltag entstehen viele unterschiedliche Informationen:

- Stammdaten
- Gewicht
- Schulterhöhe
- Trainingsfortschritte
- Tagebucheinträge
- Fotos
- Wochenaufgaben
- Tierarzttermine
- Gesundheitsinformationen

Statt diese Informationen an unterschiedlichen Stellen zu verwalten, soll DogBuddy sie langfristig in einer Anwendung zusammenführen.

Das zentrale Element ist das **Dashboard**:

👉 [`index.html`](index.html)

Dort sollen die wichtigsten Informationen aus den verschiedenen Bereichen automatisch zusammenlaufen.

Das Grundprinzip lautet:

```text
Daten einmal eingeben
        ↓
Daten speichern
        ↓
an mehreren Stellen verwenden
```

Beispielsweise wird das Gewicht nicht zusätzlich auf dem Dashboard eingetragen.

Es wird im Bereich **Entwicklung** gespeichert und anschließend vom Dashboard automatisch ausgelesen.

---

# 2. Planung und Projektstruktur

Zu Beginn habe ich das Projekt in verschiedene Bereiche aufgeteilt.

Meine aktuelle Struktur ist:

```text
DogBuddy/
│
├── css/
│   └── styles.css
│
├── html/
│   ├── entwicklung.html
│   ├── galerie.html
│   ├── gesundheit.html
│   ├── tagebuch.html
│   ├── training.html
│   └── wochenplan.html
│
├── images/
│   ├── demo/
│   ├── logo/
│   └── profile/
│       └── major-profil.png
│
├── js/
│   ├── database.js
│   ├── gesundheit.js
│   ├── wochenplan.js
│   ├── app.js
│   ├── entwicklung.js
│   ├── tagebuch.js
│   └── training.js
│
├── index.html
└── README.md
```

## Warum habe ich Ordner angelegt?

Ich wollte vermeiden, dass später beispielsweise:

```text
index.html
tagebuch.html
training.html
styles.css
app.js
tagebuch.js
training.js
Bild1.png
Bild2.png
Bild3.png
```

ungeordnet nebeneinander liegen.

Deshalb habe ich die Dateien nach ihrem Zweck sortiert.

### HTML-Seiten

👉 [`html/`](html/)

Hier befinden sich die einzelnen Unterseiten.

### CSS

👉 [`css/styles.css`](css/styles.css)

Hier befindet sich das zentrale Styling.

### JavaScript

👉 [`js/`](js/)

Hier befindet sich die Programmlogik.

### Bilder

👉 [`images/`](images/)

Hier befinden sich Logo-, Profil- und Demo-Bilder.

---

# 3. Warum HTML, CSS und JavaScript getrennt sind

Ich habe bewusst eine Trennung zwischen:

```text
HTML
CSS
JavaScript
```

vorgenommen.

## HTML

HTML beschreibt die **Struktur und den Inhalt**.

Beispiel:

```html
<button id="save-training">
    Training speichern
</button>
```

## CSS

CSS beschreibt das **Aussehen**.

Beispiel:

```css
button {
    border-radius: 8px;
    padding: 10px;
}
```

## JavaScript

JavaScript beschreibt das **Verhalten**.

Beispiel:

```javascript
saveButton.addEventListener("click", function () {
    // Daten speichern
});
```

Dadurch kann ich bei Änderungen besser unterscheiden:

```text
Was ist vorhanden?
→ HTML

Wie sieht es aus?
→ CSS

Was soll passieren?
→ JavaScript
```

Das macht das Projekt übersichtlicher und wartbarer.

---

# 4. Warum JavaScript und nicht Java?

Java und JavaScript haben ähnliche Namen, sind aber unterschiedliche Programmiersprachen.

Für DogBuddy benötige ich im Browser vor allem **JavaScript**.

JavaScript kann direkt vom Browser ausgeführt werden.

Damit kann ich beispielsweise:

- Formulare auslesen
- auf Buttons reagieren
- Berechnungen durchführen
- Daten speichern
- Daten laden
- HTML verändern
- Elemente dynamisch erstellen
- Einträge bearbeiten
- Einträge löschen

Java würde für diese Frontend-Aufgaben nicht direkt innerhalb der Webseite ausgeführt.

Java könnte später beispielsweise für ein Backend eingesetzt werden:

```text
Browser
HTML + CSS + JavaScript
        ↓
       API
        ↓
Java-Backend
        ↓
Datenbank
```

Damit würde JavaScript weiterhin die Benutzeroberfläche steuern und Java könnte serverseitige Aufgaben übernehmen.

---

# 5. Erster Aufbau der Benutzeroberfläche

Zu Beginn bestand DogBuddy hauptsächlich aus der visuellen Oberfläche.

Die zentrale Startseite ist:

👉 [`index.html`](index.html)

Das Styling befindet sich in:

👉 [`css/styles.css`](css/styles.css)

Ich habe zunächst folgende Grundelemente aufgebaut:

- Header
- Logo
- Navigation
- Dashboard
- Profilkarte
- Informationskarten
- Buttons
- Footer

Das Design verwendet hauptsächlich:

- Creme
- Weiß
- Braun
- Bronze/Kupfer

Damit sollte die Anwendung freundlich und ruhig wirken und gleichzeitig zum DogBuddy-Logo passen.

Für Kartenlayouts verwende ich unter anderem **CSS Grid**.

Für die Ausrichtung einzelner Elemente verwende ich **Flexbox**.

---

# 6. Dashboard – von statisch zu dynamisch

Das Dashboard war zunächst hauptsächlich eine statische Oberfläche.

Das bedeutete:

```text
HTML zeigt Beispielwerte
```

Diese Werte waren jedoch noch nicht mit den Unterseiten verbunden.

Der nächste Entwicklungsschritt bestand deshalb darin, das Dashboard **dynamisch** zu machen.

Die Hauptlogik befindet sich in:

👉 [`js/app.js`](js/app.js)

Heute liest das Dashboard bereits Daten aus verschiedenen Speicherbereichen.

Beispielsweise:

```text
measurements
trainings
diaryEntries
```

Dadurch ist aus:

```text
statische Anzeige
```

nach und nach:

```text
gespeicherte Daten
        ↓
JavaScript
        ↓
Dashboard
```

geworden.

---

# 7. Hundprofil und automatische Altersberechnung

Auf dem Dashboard befindet sich Majors Profil.

Das Profil enthält unter anderem:

- Name
- Rasse
- Geschlecht
- Geburtsdatum
- Einzugsdatum
- Profilbild

Das Profilbild liegt unter:

👉 [`images/profile/major-profil.png`](images/profile/major-profil.png)

## Profil bearbeiten

Die Profildaten können bearbeitet werden.

Dadurch müssen Stammdaten nicht direkt im HTML-Code geändert werden.

---

## Automatische Altersberechnung

Eine wichtige Funktion ist die automatische Berechnung des Alters.

Statt:

```text
12 Wochen
```

fest zu speichern, wird das Geburtsdatum verwendet.

Warum?

Ein fest gespeichertes Alter wäre bereits eine Woche später falsch.

Das Geburtsdatum dagegen bleibt unverändert.

JavaScript berechnet daraus das aktuelle Alter.

Das Prinzip ist:

```text
Geburtsdatum
     ↓
JavaScript berechnet Differenz
     ↓
aktuelles Alter
```

Dadurch muss ich das Alter nicht manuell aktualisieren.

---

# 8. Entwicklung – Gewicht und Schulterhöhe

Für die körperliche Entwicklung gibt es:

👉 [`html/entwicklung.html`](html/entwicklung.html)

Die Logik befindet sich in:

👉 [`js/entwicklung.js`](js/entwicklung.js)

Hier können aktuell Messwerte gespeichert werden.

Dazu gehören:

- Datum
- Gewicht
- Schulterhöhe

Die Daten werden im Browser gespeichert.

Der verwendete Speicherbereich heißt:

```text
measurements
```

---

## Warum wird das Datum gespeichert?

Ein Gewicht allein:

```text
6,9 kg
```

sagt wenig über eine Entwicklung aus.

Zusammen mit dem Datum:

```text
13.09.2026
6,9 kg
```

kann später nachvollzogen werden, wie sich Major entwickelt.

---

## Verbindung zum Dashboard

Nachdem die Speicherung der Messwerte funktioniert hat, habe ich das Dashboard damit verbunden.

Der Ablauf ist:

```text
Messwert eintragen
       ↓
entwicklung.js
       ↓
localStorage
"measurements"
       ↓
app.js
       ↓
neuesten Messwert bestimmen
       ↓
Dashboard
```

Dadurch werden Gewicht und Schulterhöhe automatisch auf der Startseite angezeigt.

---

# 9. Training und Sternebewertung

Der Trainingsbereich besteht aus:

👉 [`html/training.html`](html/training.html)

und:

👉 [`js/training.js`](js/training.js)

Ein Training enthält aktuell:

- Name der Übung
- Datum
- Sternebewertung
- Notiz

Die Daten werden unter:

```text
trainings
```

im localStorage gespeichert.

---

## Sternebewertung

Ich habe mich für eine Bewertung mit fünf Sternen entschieden.

Beispiel:

```text
Rückruf   ★★★★★
Nein      ★★★★☆
Stopp     ★★★☆☆
```

Damit kann ich einen Trainingsstand schnell einschätzen.

---

## Umsetzung der Sterne

Die Sterne besitzen Werte von:

```text
1
2
3
4
5
```

JavaScript erkennt, welcher Stern ausgewählt wurde und speichert die entsprechende Bewertung.

---

## Training auf dem Dashboard

Nachdem das Speichern auf der Trainingsseite funktioniert hat, wurde auch das Dashboard mit den Trainingsdaten verbunden.

Dabei sollte das Dashboard nicht einfach die letzten drei Datensätze anzeigen.

Wenn dieselbe Übung mehrfach trainiert wurde, würde sonst beispielsweise entstehen:

```text
Rückruf
Rückruf
Rückruf
```

Für das Dashboard ist das wenig hilfreich.

Deshalb werden dort die **letzten unterschiedlichen Übungen** verwendet.

Aktuell werden maximal drei Übungen als kompakte Übersicht angezeigt.

Die Trainingsseite bleibt die Detailansicht.

Das Dashboard ist die Zusammenfassung.

---

# 10. Tagebuch – vom einfachen Eintrag zum CRUD-Bereich

Das Tagebuch wurde schrittweise deutlich umfangreicher.

HTML:

👉 [`html/tagebuch.html`](html/tagebuch.html)

JavaScript:

👉 [`js/tagebuch.js`](js/tagebuch.js)

Ein Eintrag kann aktuell enthalten:

- Datum
- Titel
- Heute gelernt
- Das lief gut
- Das war schwierig
- Besonderer Moment
- Sonstige Notizen
- mehrere Fotos

---

## Schritt 1 – Tagebucheinträge speichern

Zunächst wurden die Textinformationen gespeichert.

Vereinfacht sieht ein Eintrag so aus:

```javascript
{
    id: 123456789,
    date: "2026-09-13",
    title: "Erstes Mal schwimmen",
    learned: "...",
    good: "...",
    difficult: "...",
    highlight: "...",
    note: "...",
    photos: []
}
```

Die Tagebucheinträge werden unter:

```text
diaryEntries
```

im localStorage gespeichert.

---

## Schritt 2 – Fotos ergänzen

Danach sollte ein Tagebucheintrag nicht nur Text, sondern auch mehrere Bilder enthalten können.

Dafür reichte localStorage als Lösung nicht mehr sinnvoll aus.

Deshalb kam **IndexedDB** hinzu.

Die Fotos werden dort separat gespeichert.

---

## Schritt 3 – Fotovorschau

Ausgewählte Fotos werden bereits vor dem endgültigen Speichern als Vorschau angezeigt.

Dadurch kann ich kontrollieren, welche Bilder ausgewählt wurden.

Ein Foto kann bereits aus der Vorschau entfernt werden, bevor der Tagebucheintrag gespeichert wird.

---

## Schritt 4 – Tagebucheintrag löschen

Danach wurde eine Löschfunktion ergänzt.

Beim Löschen reicht es nicht, nur den Text aus localStorage zu entfernen.

Auch die dazugehörigen Fotos müssen aus IndexedDB gelöscht werden.

Der Ablauf ist deshalb:

```text
Tagebucheintrag löschen
        ↓
zugehörige Foto-IDs ermitteln
        ↓
Fotos aus IndexedDB löschen
        ↓
Eintrag aus localStorage entfernen
        ↓
Anzeige aktualisieren
```

---

## Schritt 5 – Tagebucheintrag bearbeiten

Ursprünglich konnten Einträge erstellt und gelöscht werden.

Danach habe ich eine **Bearbeiten-Funktion** ergänzt.

Jeder Eintrag besitzt dafür:

```text
✏ Ändern
```

Beim Anklicken passiert:

```text
Eintrag suchen
      ↓
Daten in Formular einsetzen
      ↓
ID des Eintrags merken
      ↓
Benutzer verändert Daten
      ↓
Änderungen speichern
```

Dafür wird unter anderem eine Variable verwendet:

```javascript
let editingEntryId = null;
```

Wenn:

```text
editingEntryId = null
```

ist, wird ein neuer Eintrag erstellt.

Wenn dort eine ID steht, wird ein vorhandener Eintrag aktualisiert.

---

## Schritt 6 – Fotos beim Bearbeiten erhalten

Beim Bearbeiten sollten bereits vorhandene Fotos nicht verloren gehen.

Deshalb werden die vorhandenen Foto-IDs beibehalten.

Neue Bilder können zusätzlich ergänzt werden.

Dadurch können alte und neue Bilder gemeinsam zu einem Tagebucheintrag gehören.

---

## Schritt 7 – einzelne Fotos löschen

Zusätzlich zum Löschen eines kompletten Tagebucheintrags können einzelne Fotos entfernt werden.

Dafür besitzt jedes Bild einen `×`-Button.

Beim Löschen passiert:

```text
× anklicken
      ↓
Foto aus IndexedDB löschen
      ↓
Foto-ID aus dem Tagebucheintrag entfernen
      ↓
localStorage aktualisieren
      ↓
Anzeige aktualisieren
```

Dadurch bleiben localStorage und IndexedDB synchron.

---

# 11. Fotos – warum IndexedDB notwendig wurde

Für die Bilder verwende ich:

```text
IndexedDB
```

und nicht:

```text
localStorage
```

Der Grund ist die Art und Größe der Daten.

localStorage eignet sich hauptsächlich für kleine String-Daten.

Bilder wären dort nur umständlich speicherbar, beispielsweise als sehr lange Base64-Zeichenketten.

Das würde:

- mehr Speicher benötigen
- localStorage schnell füllen
- bei mehreren Bildern unpraktisch werden

IndexedDB kann dagegen auch:

- `Blob`
- `File`
- komplexere Objekte

speichern.

Deshalb ist IndexedDB für die Tagebuchbilder die sinnvollere Browser-Lösung.

---

# 12. Verbindung zwischen localStorage und IndexedDB

Eine wichtige Besonderheit des Tagebuchs ist, dass die Daten an zwei Stellen gespeichert werden.

## Textinformationen

```text
localStorage
```

## Bilder

```text
IndexedDB
```

Damit beide zusammengehören, verwende ich IDs.

Vereinfacht:

```text
localStorage
│
└── Tagebucheintrag 123
       │
       └── photos
            ├── Bild-ID A
            └── Bild-ID B


IndexedDB
│
├── Bild-ID A
│      └── Bilddatei
│
└── Bild-ID B
       └── Bilddatei
```

Dadurch weiß JavaScript:

```text
Welche Bilder gehören zu welchem Tagebucheintrag?
```

---

# 13. localStorage – aktuelle Datenspeicherung

Für die strukturierten Daten verwende ich momentan localStorage.

Beispiele:

```text
measurements
trainings
diaryEntries
```

localStorage speichert Daten direkt im Browser.

---

## Warum habe ich localStorage gewählt?

Für den aktuellen MVP ist die Lösung praktisch, weil ich:

- keinen Server installieren muss
- keine Datenbank konfigurieren muss
- keine API programmieren muss
- Daten trotzdem nach einem Reload behalten kann

Dadurch konnte ich mich zunächst auf:

```text
HTML
CSS
JavaScript
DOM
Programmlogik
```

konzentrieren.

---

## Problem: localStorage speichert Strings

localStorage kann nicht einfach ein JavaScript-Array unverändert speichern.

Deshalb benötige ich:

```javascript
JSON.stringify()
```

Beispiel:

```javascript
localStorage.setItem(
    "trainings",
    JSON.stringify(trainings)
);
```

Beim Laden wird daraus wieder ein JavaScript-Objekt bzw. Array:

```javascript
JSON.parse()
```

Beispiel:

```javascript
const trainings =
    JSON.parse(
        localStorage.getItem("trainings")
    );
```

---

## Grenzen

localStorage ist trotzdem keine endgültige Datenbanklösung.

Die Daten:

- liegen nur lokal im Browser
- werden nicht automatisch zwischen Geräten synchronisiert
- können durch Löschen der Browserdaten verloren gehen
- besitzen keinen zentralen Benutzerzugriff
- sind für große Datenmengen ungeeignet

Deshalb sehe ich localStorage als **MVP-Lösung**.

---

# 14. JSON und Datenformate

JSON bedeutet:

**JavaScript Object Notation**

Beispiel:

```json
{
    "name": "Major",
    "geschlecht": "Rüde"
}
```

JSON wird verwendet, um strukturierte Daten als Text darzustellen.

Das benötige ich aktuell bei localStorage.

Es wäre später aber auch bei einer API wichtig, weil APIs häufig JSON senden und empfangen.

---

## Datumsformat

Intern werden Datumswerte beispielsweise so gespeichert:

```text
2026-09-13
```

also:

```text
YYYY-MM-DD
```

Für die Anzeige kann daraus:

```text
13.09.2026
```

werden.

Dadurch trenne ich:

```text
technisches Datenformat
```

und:

```text
benutzerfreundliche Darstellung
```

Das technische Format lässt sich außerdem gut sortieren.

---

# 15. DOM und Event Listener

Damit JavaScript meine HTML-Seite verändern kann, verwende ich den DOM.

DOM bedeutet:

**Document Object Model**

Beispiel in HTML:

```html
<p id="dashboard-diary-title"></p>
```

JavaScript findet das Element über:

```javascript
document.getElementById("dashboard-diary-title");
```

Danach kann JavaScript beispielsweise den Text verändern.

---

## Event Listener

Für Benutzeraktionen verwende ich Event Listener.

Beispiel:

```javascript
button.addEventListener("click", function () {
    // Aktion
});
```

Dadurch entsteht:

```text
Benutzeraktion
      ↓
Event
      ↓
JavaScript-Funktion
      ↓
Daten / Anzeige ändern
```

---

# 16. CRUD-Prinzip

Mit DogBuddy habe ich das CRUD-Prinzip praktisch umgesetzt.

CRUD bedeutet:

| Kürzel | Bedeutung | Beispiel |
|---|---|---|
| C | Create | Tagebucheintrag erstellen |
| R | Read | Einträge anzeigen |
| U | Update | Eintrag bearbeiten |
| D | Delete | Eintrag löschen |

Besonders im Tagebuch ist inzwischen der vollständige Ablauf vorhanden.

```text
CREATE
   ↓
READ
   ↓
UPDATE
   ↓
DELETE
```

Dieses Prinzip ist auch für spätere Datenbank- und API-Anwendungen wichtig.

---

# 17. Fehler und Problemlösungen während der Entwicklung

Während der Entwicklung sind mehrere Probleme aufgetreten.

Diese Fehler waren für mich besonders hilfreich, weil ich dadurch nicht nur Funktionen umgesetzt, sondern auch systematische Fehlersuche gelernt habe.

---

## Problem 1 – Dashboard zeigte Tagebucheintrag nicht an

### Ausgangssituation

Die Tagebucheinträge wurden bereits gespeichert und auf der Tagebuchseite korrekt angezeigt.

Auf dem Dashboard erschien der letzte Eintrag jedoch zunächst nicht dynamisch.

### Ursache

Das JavaScript benötigte eindeutige HTML-Elemente, in die:

- Titel
- Datum
- Text

geschrieben werden konnten.

Die entsprechenden IDs fehlten zunächst auf dem Dashboard.

### Lösung

In [`index.html`](index.html) wurden eindeutige IDs ergänzt:

```html
id="dashboard-diary-title"
id="dashboard-diary-date"
id="dashboard-diary-text"
```

Anschließend wurde [`js/app.js`](js/app.js) erweitert.

JavaScript liest jetzt:

```text
localStorage["diaryEntries"]
```

aus, sortiert die Einträge und schreibt den neuesten Eintrag in diese HTML-Elemente.

---

## Problem 2 – Welcher Tagebucheintrag ist der neueste?

Ein Tagebuch kann mehrere Einträge enthalten.

Deshalb musste festgelegt werden, welcher Eintrag auf dem Dashboard erscheint.

Die Einträge werden zunächst nach Datum sortiert.

Zusätzlich wird die ID verwendet, wenn mehrere Einträge dasselbe Datum besitzen.

Vereinfacht:

```text
1. Datum vergleichen
2. bei gleichem Datum ID vergleichen
```

Dadurch kann auch bei mehreren Einträgen am selben Tag der zuletzt erstellte Eintrag bestimmt werden.

---

## Problem 3 – Tagebuch konnte zunächst nicht bearbeitet werden

Die erste Tagebuchversion konnte Einträge:

```text
erstellen
anzeigen
löschen
```

aber noch nicht verändern.

### Lösung

Ich habe eine Bearbeitungs-ID eingeführt:

```javascript
editingEntryId
```

Damit kann das Programm unterscheiden:

```text
Neuer Eintrag
oder
vorhandener Eintrag
```

Der Button:

```text
✏ Ändern
```

lädt die vorhandenen Daten wieder in das Formular.

Der Speichern-Button wird währenddessen entsprechend für das Speichern der Änderungen verwendet.

---

## Problem 4 – vorhandene Bilder beim Bearbeiten

Beim Bearbeiten eines Tagebucheintrags durften die bereits gespeicherten Bilder nicht einfach verschwinden.

### Lösung

Die vorhandenen Foto-IDs bleiben mit dem Eintrag verbunden.

Neue Fotos erhalten zusätzliche IDs.

Dadurch kann ein bearbeiteter Eintrag sowohl:

```text
bereits gespeicherte Fotos
+
neu hinzugefügte Fotos
```

enthalten.

---

## Problem 5 – Bilder und Texte liegen in verschiedenen Speichern

Die Tagebuchtexte befinden sich in localStorage.

Die Bilder befinden sich in IndexedDB.

Dadurch entstand die Frage:

```text
Wie weiß das Programm, welches Foto zu welchem Eintrag gehört?
```

### Lösung

Ich verwende eindeutige IDs.

Jeder Tagebucheintrag besitzt eine ID.

Auch jedes Foto besitzt eine eigene ID und eine Zuordnung zum Eintrag.

Dadurch können beide Speicher miteinander verbunden werden.

---

## Problem 6 – einzelnes Bild löschen

Ein Bild nur aus der HTML-Anzeige zu entfernen hätte nicht gereicht.

Dann wäre die eigentliche Datei weiterhin in IndexedDB gespeichert.

### Lösung

Beim Löschen wird:

1. das Foto aus IndexedDB entfernt,
2. die Foto-ID aus dem Tagebucheintrag entfernt,
3. der Tagebucheintrag erneut gespeichert,
4. die Anzeige neu aufgebaut.

Damit bleiben die gespeicherten Daten konsistent.

---

## Problem 7 – Dashboard-Training sollte keine Übung mehrfach anzeigen

Wenn beispielsweise „Rückruf“ mehrmals trainiert wurde, existieren mehrere Trainingseinträge.

Würde ich einfach die letzten drei Datensätze anzeigen, könnte das Dashboard so aussehen:

```text
Rückruf
Rückruf
Rückruf
```

### Lösung

Für das Dashboard werden die zuletzt gespeicherten **unterschiedlichen Übungsnamen** verwendet.

Dadurch zeigt die Übersicht mehrere verschiedene Trainingsbereiche.

Aktuell werden maximal drei angezeigt.

---

## Problem 8 – Footer war plötzlich nur eine Spalte breit

Dieses Problem war besonders interessant.

### Sichtbarer Fehler

Der Footer erschien nur so breit wie die linke Spalte des Dashboard-Grids.

### Erster Verdacht

Zunächst lag die Vermutung nahe, dass die CSS-Regel des Footers falsch war.

Deshalb wurde unter anderem geprüft:

```css
footer {
    width: 100%;
}
```

Das änderte das eigentliche Problem jedoch nicht.

### Tatsächliche Ursache

In [`index.html`](index.html) fehlten vor dem Footer die schließenden HTML-Tags:

```html
</section>
</main>
```

Dadurch interpretierte der Browser den Footer weiterhin als Bestandteil des Dashboard-Grids.

### Lösung

Die fehlenden Tags wurden vor dem Footer ergänzt:

```html
</article>

</section>

</main>

<footer>
```

Danach befand sich der Footer wieder außerhalb des Grid-Layouts.

### Erkenntnis

Dieser Fehler hat sehr gut gezeigt:

> Ein CSS-Problem kann seine eigentliche Ursache in HTML haben.

---

## Problem 9 – Logo hatte sichtbaren Hintergrund

Beim Logo war im Header ein Hintergrund bzw. ein rechteckiger Bereich sichtbar.

Das eigentliche Design sollte sich aber sauber in den hellen Header einfügen.

### Lösung

Für das Logo wurde eine angepasste Variante ohne störenden Hintergrund vorgesehen.

Für solche Logos eignet sich insbesondere PNG, weil das Format transparente Bildbereiche unterstützen kann.

Die Logo-Dateien befinden sich unter:

👉 [`images/logo/`](images/logo/)

---

## Was ich aus diesen Fehlern mitgenommen habe

Bei einem Fehler prüfe ich inzwischen nicht mehr nur die Stelle, an der das Problem sichtbar ist.

Ein sinnvoller Ablauf ist:

```text
Problem beobachten
      ↓
HTML-Struktur prüfen
      ↓
CSS prüfen
      ↓
IDs und Klassen prüfen
      ↓
JavaScript prüfen
      ↓
gespeicherte Daten prüfen
      ↓
Browser-Speicher prüfen
```

---

# 18. Wochenplan

Der Wochenplan ist bereits als eigener Bereich vorhanden.

HTML:

👉 [`html/wochenplan.html`](html/wochenplan.html)

JavaScript:

👉 [`js/wochenplan.js`](js/wochenplan.js)

Auch auf dem Dashboard ist bereits ein Wochenplan-Bereich vorgesehen.

Dieser Bereich wird im weiteren Projektverlauf noch stärker dynamisch mit den gespeicherten Daten verbunden.

---

# 19. Gesundheit

Der Gesundheitsbereich besitzt ebenfalls bereits eigene Dateien.

HTML:

👉 [`html/gesundheit.html`](html/gesundheit.html)

JavaScript:

👉 [`js/gesundheit.js`](js/gesundheit.js)

Langfristig soll dieser Bereich beispielsweise für:

- Tierarzttermine
- Impfungen
- Untersuchungen
- weitere Gesundheitsinformationen

verwendet werden.

Ein Ziel ist, den nächsten relevanten Termin automatisch auf dem Dashboard anzuzeigen.

---

# 20. Galerie

Die Galerie besitzt bereits eine eigene HTML-Seite:

👉 [`html/galerie.html`](html/galerie.html)

Die eigentliche dynamische Verbindung zu den Tagebuchfotos ist als nächster Entwicklungsschritt vorgesehen.

Dabei möchte ich die Fotos nicht doppelt speichern.

Das geplante Prinzip ist:

```text
Tagebuch
   ↓
Foto hochladen
   ↓
IndexedDB
   ↓
Tagebuch zeigt Foto
   ↓
Galerie liest dasselbe Foto
```

Dadurch wäre die Galerie keine zweite unabhängige Fotosammlung, sondern eine weitere Ansicht der bereits vorhandenen Tagebuchbilder.

---

# 21. database.js und Trennung der Speicherlogik

Im JavaScript-Ordner befindet sich:

👉 [`js/database.js`](js/database.js)

Damit habe ich einen eigenen Bereich für Datenbank- bzw. Speicherlogik vorgesehen.

Mit wachsendem Projekt ist eine solche Trennung sinnvoll.

Statt Datenbankfunktionen später über viele Dateien zu verteilen, kann gemeinsame Speicherlogik zentraler organisiert werden.

Langfristig kann daraus beispielsweise entstehen:

```text
HTML
 ↓
JavaScript der jeweiligen Seite
 ↓
database.js
 ↓
Speicher / Datenbank
```

---

# 22. Mögliche spätere Anbindung an Supabase

Die aktuelle Lösung mit localStorage und IndexedDB funktioniert für den lokalen MVP.

Langfristig könnte DogBuddy an **Supabase** angebunden werden.

Eine mögliche Architektur wäre:

```text
DogBuddy Frontend
HTML + CSS + JavaScript
        ↓
     Supabase
        ↓
    PostgreSQL
```

Dadurch könnten Daten zentral gespeichert werden.

Vorteile wären beispielsweise:

- Zugriff von mehreren Geräten
- zentrale Datenhaltung
- Benutzerkonten
- Authentifizierung
- PostgreSQL
- Cloud-Speicher für Bilder

Damit wären die Daten nicht mehr nur an den Browser gebunden.

---

# 23. Alternative mit SQL Server Express und API

Eine weitere Möglichkeit wäre **SQL Server Express**.

Auch diese Lösung wäre grundsätzlich möglich gewesen.

Allerdings sollte meine Browser-Anwendung nicht direkt mit SQL Server Express kommunizieren.

Dazwischen wäre ein Backend bzw. eine API notwendig.

Die Architektur könnte so aussehen:

```text
Browser
HTML + CSS + JavaScript
        ↓
       API
        ↓
SQL Server Express
```

Die API müsste von mir zusätzlich programmiert werden.

Mögliche Technologien wären beispielsweise:

- Java
- C# / ASP.NET Core
- Node.js

Da ich auch mit **C# und SQL** arbeite, wäre beispielsweise eine ASP.NET-Core-Web-API mit SQL Server Express eine mögliche spätere Erweiterung.

---

## Warum eine API?

Die Datenbank sollte nicht direkt aus dem Browser erreichbar sein.

Eine API übernimmt unter anderem:

- Daten empfangen
- Daten validieren
- Datenbankabfragen
- Speichern
- Ändern
- Löschen
- Zugriffssteuerung
- Rückgabe der Ergebnisse

Beispielsweise:

```text
GET    /api/diary
POST   /api/diary
PUT    /api/diary/123
DELETE /api/diary/123
```

Damit taucht auch das bereits gelernte CRUD-Prinzip wieder auf.

---

# 24. Bilder, Logo und Dateiformate

Meine Bilder befinden sich unter:

👉 [`images/`](images/)

Die Unterteilung lautet:

```text
images/
├── demo/
├── logo/
└── profile/
```

Dadurch bleiben unterschiedliche Bildtypen getrennt.

---

## Logo

Die Logo-Dateien befinden sich unter:

👉 [`images/logo/`](images/logo/)

Das DogBuddy-Logo verwendet unter anderem:

- Hund
- Berge
- Wasser
- Herz
- Pfote
- Bronze-/Kupferoptik

Diese Farben werden im Webdesign wieder aufgegriffen.

---

## Profilbild

Majors Profilbild befindet sich unter:

👉 [`images/profile/major-profil.png`](images/profile/major-profil.png)

---

## PNG

Für Logos ist PNG besonders praktisch, wenn Transparenz benötigt wird.

Dadurch kann ein Logo ohne sichtbaren rechteckigen Hintergrund auf dem Header dargestellt werden.

---

# 25. Git und GitHub

Das Projekt wird mit Git versioniert und auf GitHub gespeichert.

Die `README.md` liegt direkt neben `index.html`:

```text
DogBuddy/
├── README.md
├── index.html
├── css/
├── html/
├── images/
└── js/
```

Dadurch zeigt GitHub die README automatisch auf der Repository-Seite an.

---

## Typischer Ablauf

```bash
git status
```

zeigt mir die geänderten Dateien.

Anschließend:

```bash
git add .
```

Danach erstelle ich einen Commit:

```bash
git commit -m "Tagebuch und Dashboard erweitert"
```

Und über:

```bash
git push
```

werden die Änderungen zu GitHub übertragen.

---

## Warum Git für dieses Projekt wichtig ist

DogBuddy verändert sich ständig.

Mit Git kann ich nachvollziehen:

```text
Was wurde geändert?
Wann wurde es geändert?
Welche Funktion kam hinzu?
```

Sinnvolle Commit-Nachrichten sind deshalb beispielsweise:

```text
Entwicklung mit Dashboard verbunden
```

```text
Training um Sternebewertung erweitert
```

```text
Tagebuch um Fotofunktion ergänzt
```

```text
Tagebuch um Bearbeiten und Löschen erweitert
```

```text
Dashboard mit letztem Tagebucheintrag verbunden
```

---

# 26. Was ich durch das Projekt gelernt habe

DogBuddy verbindet inzwischen viele Themen aus meiner Umschulung.

## HTML

Ich habe unter anderem praktisch angewendet:

- semantische Struktur
- Navigation
- Formulare
- Inputs
- Buttons
- Bilder
- Links
- IDs
- Klassen
- relative Pfade
- mehrere miteinander verbundene Seiten

---

## CSS

Ich habe unter anderem angewendet:

- Grid
- Flexbox
- Kartenlayouts
- Farben
- Abstände
- Rahmen
- Border Radius
- Schatten
- Hover-Effekte
- Formulare
- Buttons
- Navigation
- Footer

---

## JavaScript

Ich habe unter anderem angewendet:

- Variablen
- Konstanten
- Arrays
- Objekte
- Funktionen
- Bedingungen
- Schleifen
- Event Listener
- DOM-Manipulation
- Datumsverarbeitung
- Sortierung
- `find()`
- `filter()`
- `forEach()`
- localStorage
- JSON
- IndexedDB
- `async`
- `await`
- Promises

---

## Besonders wichtig: Datenfluss

Ein großer Lernschritt war für mich zu verstehen, wie Daten durch eine Anwendung fließen.

Beispiel:

```text
Benutzer
   ↓
Formular
   ↓
JavaScript
   ↓
localStorage / IndexedDB
   ↓
JavaScript
   ↓
HTML
   ↓
Benutzer sieht gespeicherte Daten
```

---

## Mehrere Seiten – dieselben Daten

Ich habe außerdem gelernt, dass verschiedene Seiten dieselben Daten verwenden können.

Beispiel:

```text
entwicklung.html
      ↓
entwicklung.js
      ↓
measurements
      ↓
app.js
      ↓
index.html
```

Dasselbe Grundprinzip gilt inzwischen auch für Training und Tagebuch.

---

## Fehlersuche

Neben der eigentlichen Programmierung habe ich gelernt, Fehler systematischer einzugrenzen.

Ein Fehler kann beispielsweise entstehen durch:

```text
HTML
CSS
JavaScript
falsche ID
falschen Pfad
localStorage
IndexedDB
falsches Datenformat
```

Der Footer-Fehler war dafür ein gutes Beispiel:

```text
sichtbar:
CSS-Layout falsch

tatsächlich:
HTML-Tags fehlten
```

---

# 27. Aktueller Stand und nächste Schritte

DogBuddy ist aktuell ein funktionsfähiger lokaler MVP, wird aber weiterentwickelt.

## Bereits umgesetzt

- Grundstruktur des Projekts
- Navigation
- einheitliches Design
- Dashboard
- Hundprofil
- Profilbearbeitung
- automatische Altersberechnung
- Gewicht speichern
- Schulterhöhe speichern
- Messwerte auf Dashboard anzeigen
- Trainingsübungen speichern
- Sternebewertung
- Trainingsnotizen
- Trainingseinträge löschen
- Trainingsübersicht auf Dashboard
- Tagebucheinträge erstellen
- mehrere Tagebuchfelder
- mehrere Fotos pro Eintrag
- Fotovorschau
- Fotos über IndexedDB speichern
- Tagebucheinträge löschen
- Tagebucheinträge bearbeiten
- vorhandene Fotos beim Bearbeiten erhalten
- neue Fotos beim Bearbeiten ergänzen
- einzelne Fotos löschen
- letzten Tagebucheintrag auf Dashboard anzeigen
- localStorage
- IndexedDB
- JSON
- Git/GitHub

## Vorbereitet bzw. noch weiter auszubauen

- Galerie
- automatische Galerie aus Tagebuchfotos
- Wochenplan
- dynamische Wochenplan-Daten auf dem Dashboard
- Gesundheit
- Tierarzttermine
- nächster Termin auf dem Dashboard
- weitere Datenbankabstraktion über `database.js`
- Responsive Design
- mögliche zentrale Datenhaltung

---

# 🐾 Fazit

DogBuddy hat sich schrittweise von einer statischen HTML-/CSS-Seite zu einer datenverarbeitenden Anwendung entwickelt.

Der aktuelle Aufbau kann vereinfacht so dargestellt werden:

```text
                         DogBuddy
                            │
             ┌──────────────┼──────────────┐
             │              │              │
            HTML           CSS        JavaScript
             │              │              │
             ▼              ▼              ▼
          Struktur        Design          Logik
                                           │
                             ┌─────────────┴─────────────┐
                             │                           │
                             ▼                           ▼
                       localStorage                  IndexedDB
                             │                           │
                             ▼                           ▼
                    strukturierte Daten                Fotos
```

Die einzelnen Bereiche arbeiten dabei zunehmend zusammen:

```text
Entwicklung ───────┐
                   │
Training ──────────┼──────► Dashboard
                   │
Tagebuch ──────────┘
```

Dadurch habe ich nicht nur HTML, CSS und JavaScript einzeln eingesetzt, sondern gelernt, wie aus diesen Bestandteilen eine Anwendung entsteht.

Besonders wichtig waren für mich dabei:

```text
Strukturierung
      +
Benutzeroberfläche
      +
Programmlogik
      +
Datenspeicherung
      +
Datenverknüpfung
      +
CRUD
      +
Fehlersuche
      +
Versionsverwaltung
```

Die aktuelle Speicherung über localStorage und IndexedDB ermöglicht es mir, DogBuddy zunächst vollständig im Browser zu entwickeln.

Später kann die Architektur erweitert werden:

```text
DogBuddy Frontend
HTML + CSS + JavaScript
        │
        ▼
   API / Supabase
        │
        ▼
zentrale Datenbank
```

Damit ist DogBuddy für mich nicht nur eine HTML-/CSS-Übung, sondern ein Projekt, an dem ich Schritt für Schritt nachvollziehen kann, **wie eine echte Anwendung geplant, aufgebaut, erweitert, getestet und bei Fehlern verbessert wird**.