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


## Aktueller Projektstand

DogBuddy liegt inzwischen als funktionsfähiger lokaler MVP vor.

Die Anwendung umfasst mehrere miteinander verbundene Bereiche und speichert
die Daten derzeit hauptsächlich über `localStorage` und `IndexedDB` direkt
im Browser.

Zum aktuellen Funktionsumfang gehören unter anderem:

- dynamisches Dashboard
- Hundprofil
- automatische Altersberechnung
- Entwicklungsdaten wie Gewicht und Schulterhöhe
- Tagebuch mit mehreren Fotos
- Galerie
- Gesundheitsbereich mit Terminverwaltung
- Wochen- und Monatskalender
- Anzeige kommender Termine auf dem Dashboard
- Wochenplan
- Kommandos mit mehreren Fortschrittsstufen
- Entdecker-Checkliste
- Verbindung von Kommandos und Entdecker-Checkliste mit dem Wochenplan
- Backup-Funktion
- seitenübergreifender Nach-oben-Button

Die Daten werden in der aktuellen Version lokal gespeichert. Strukturierte
Daten liegen hauptsächlich in `localStorage`, während größere Bilddateien
über `IndexedDB` gespeichert werden.

Der aktuelle Stand soll bewusst als eigenständige **DogBuddy Version 1**
erhalten und als Portfolio-Projekt auf GitHub gesichert werden.

Für die weitere Entwicklung soll das bestehende Projekt anschließend
dupliziert werden.

Die neue **DogBuddy Version 2** soll aus der bisherigen lokalen Anwendung
eine online erreichbare Mehrbenutzer-Webanwendung machen.

Geplant sind unter anderem:

- öffentliche DogBuddy-Frontpage
- Registrierung
- Login und Logout
- geschützter Benutzerbereich
- Benutzerkonten
- mehrere Hunde pro Benutzer
- gemeinsamer Zugriff mehrerer Benutzer auf einen Hund
- zentrale Datenspeicherung
- zentraler Speicher für Fotos und weitere Medien
- Synchronisierung zwischen mehreren Geräten
- HTTPS
- Responsive Design
- Progressive Web App (PWA)

Für Hosting, Benutzerverwaltung, Datenbank und Medienspeicherung soll geprüft
werden, welche technische Lösung sich am besten für DogBuddy eignet.

Dabei werden unter anderem `systeme.io`, Supabase und die Möglichkeit eines
eigenen Backends betrachtet.

Die bestehende lokale Anwendung wird dabei nicht verworfen.

```text
DogBuddy Version 1
        ↓
lokaler MVP
        ↓
Portfolio-Version sichern
        ↓
Projekt duplizieren
        ↓
DogBuddy Version 2
        ↓
Online-Webanwendung
        ↓
Benutzerkonten + zentrale Daten
        ↓
geräteübergreifende Nutzung
        ↓
PWA
```

---

# Inhaltsverzeichnis

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
   - [20.1 Kommandos](#201-kommandos)
   - [20.2 Entdecker-Checkliste](#202-entdecker-checkliste)
21. [database.js und Trennung der Speicherlogik](#21-databasejs-und-trennung-der-speicherlogik)
22. [Mögliche spätere Anbindung an Supabase](#22-mögliche-spätere-anbindung-an-supabase)
23. [Alternative mit SQL Server Express und API](#23-alternative-mit-sql-server-express-und-api)
24. [Bilder, Logo und Dateiformate](#24-bilder-logo-und-dateiformate)
25. [Git und GitHub](#25-git-und-github)
26. [Was ich durch das Projekt gelernt habe](#26-was-ich-durch-das-projekt-gelernt-habe)
27. [Aktueller Stand und nächste Schritte](#27-aktueller-stand-und-nächste-schritte)
28. [Mögliche Erweiterungen und Zukunftsaussichten](#28-mögliche-erweiterungen-und-zukunftsaussichten)
29. [DogBuddy als echte Webanwendung](#29-dogbuddy-als-echte-webanwendung)
30. [Supabase als mögliche Backend-Lösung](#30-supabase-als-mögliche-backend-lösung)
31. [Benutzerkonten](#31-benutzerkonten)
32. [Synchronisierung zwischen Geräten](#32-synchronisierung-zwischen-geräten)
33. [Cloud-Speicher für Fotos und Videos](#33-cloud-speicher-für-fotos-und-videos)
34. [DogBuddy als Progressive Web App (PWA)](#34-dogbuddy-als-progressive-web-app-pwa)
35. [Spätere echte Smartphone-App](#35-spätere-echte-smartphone-app)
36. [Erinnerungen und Benachrichtigungen](#36-erinnerungen-und-benachrichtigungen)
37. [Erweiterung des Gesundheitsbereichs](#37-erweiterung-des-gesundheitsbereichs)
38. [Erweiterung der Entwicklungsdaten](#38-erweiterung-der-entwicklungsdaten)
39. [Erweiterung des Trainingsbereichs](#39-erweiterung-des-trainingsbereichs)
40. [Ziele und Meilensteine](#40-ziele-und-meilensteine)
41. [Entdecker-Checkliste](#41-entdecker-checkliste)
42. [Orte und Ausflüge](#42-orte-und-ausflüge)
43. [Erweiterung des Dashboards](#43-erweiterung-des-dashboards)
44. [Suche, Filter und Sortierung](#44-suche-filter-und-sortierung)
45. [Backup und Datenexport](#45-backup-und-datenexport)
46. [PDF-Berichte](#46-pdf-berichte)
47. [Datenschutz und Sicherheit](#47-datenschutz-und-sicherheit)
48. [Validierung und Tests](#48-validierung-und-tests)
49. [Barrierefreiheit](#49-barrierefreiheit)
50. [Performance](#50-performance)
51. [Wiederverwendbare Komponenten und weitere Code-Strukturierung](#51-wiederverwendbare-komponenten-und-weitere-code-strukturierung)
52. [Migration der bisherigen Browserdaten](#52-migration-der-bisherigen-browserdaten)
53. [Alternative Backend-Architektur](#53-alternative-backend-architektur)
54. [DogBuddy als Anwendung für andere Hundebesitzer](#54-dogbuddy-als-anwendung-für-andere-hundebesitzer)
55. [Mögliche Entwicklungs-Roadmap](#55-mögliche-entwicklungs-roadmap)
56. [Langfristige Vision](#56-langfristige-vision)

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
│   ├── entdecker.html
│   ├── galerie.html
│   ├── gesundheit.html
│   ├── kommandos.html
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
│   ├── app.js
│   ├── backup.js
│   ├── database.js
│   ├── entwicklung.js
│   ├── entdecker.js
│   ├── galerie.js
│   ├── gesundheit.js
│   ├── kommandos.js
│   ├── scroll-top.js
│   ├── tagebuch.js
│   ├── training.js
│   └── wochenplan.js
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

> **Hinweis zum aktuellen Stand:**  
> Dieses Kapitel beschreibt den ursprünglichen Trainingsbereich von DogBuddy.
> Die Dateien `training.html` und `training.js` bleiben als Teil der
> Entwicklungsgeschichte im Projekt erhalten, sind über die aktuelle Navigation
> jedoch nicht mehr direkt erreichbar.
>
> Das Trainingskonzept wurde inzwischen durch die Bereiche **Kommandos** und
> **Entdecker-Checkliste** erweitert. Beide Bereiche sind mit dem Wochenplan
> verbunden und ermöglichen eine gezielte Auswahl von Aufgaben für die
> aktuelle Woche.

Der ursprüngliche Trainingsbereich besteht aus:

👉 [`html/training.html`](html/training.html)

und:

👉 [`js/training.js`](js/training.js)

Ein Training enthält:

- Name der Übung
- Datum
- Sternebewertung
- Notiz

Die Daten werden unter:

```text
trainings
```

in `localStorage` gespeichert.

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

JavaScript erkennt, welcher Stern ausgewählt wurde und speichert die
entsprechende Bewertung.

---

## Training auf dem Dashboard

Nachdem das Speichern auf der Trainingsseite funktioniert hat, wurde auch
das Dashboard mit den Trainingsdaten verbunden.

Dabei sollte das Dashboard nicht einfach die letzten drei Datensätze anzeigen.

Wenn dieselbe Übung mehrfach trainiert wurde, würde sonst beispielsweise
entstehen:

```text
Rückruf
Rückruf
Rückruf
```

Für das Dashboard ist das wenig hilfreich.

Deshalb werden dort die **letzten unterschiedlichen Übungen** verwendet.

Aktuell werden maximal drei Übungen als kompakte Übersicht angezeigt.

Die Trainingsseite bleibt dabei die Detailansicht.

Das Dashboard ist die Zusammenfassung.

---

## Weiterentwicklung des Trainingsbereichs

Im weiteren Projektverlauf wurde das ursprüngliche Trainingssystem
weiterentwickelt.

Neben der bisherigen Sternebewertung besitzt DogBuddy inzwischen zwei
umfangreichere Bereiche:

```text
Training
   │
   ├── Kommandos
   │
   └── Entdecker-Checkliste
```

### Kommandos

Der Bereich **Kommandos** enthält eine umfangreiche Sammlung verschiedener
Kommandos und Übungen.

Für jedes Kommando können drei Fortschrittsstufen dokumentiert werden:

```text
👀 kennengelernt
        ↓
🐾 selbst erlebt / ausgeführt
        ↓
😌 sicher bzw. entspannt
```

### Entdecker-Checkliste

Die **Entdecker-Checkliste** dient dazu, Alltagserfahrungen,
Umwelteindrücke und die Sozialisierung des Hundes zu dokumentieren.

Auch hier werden drei Fortschrittsstufen verwendet:

```text
👀 kennengelernt
        ↓
🐾 selbst erlebt
        ↓
😌 entspannt dabei
```

### Verbindung mit dem Wochenplan

Sowohl Kommandos als auch Einträge der Entdecker-Checkliste besitzen eine
📅-Auswahl.

Damit kann eine bestimmte Aufgabe für die aktuelle Woche ausgewählt werden.

```text
Kommandos ──────┐
                │
                ├────► Wochenplan
                │
Entdecker ──────┘
```

Wird eine solche Aufgabe im Wochenplan als erledigt markiert, wird die
Wochenmarkierung wieder freigegeben und der zugehörige Fortschritt kann
weitergeführt werden.

Der ursprüngliche Trainingsbereich bleibt weiterhin im Projekt erhalten.

Dadurch dokumentiert das Projekt auch die Entwicklung vom ersten einfachen
Trainingssystem mit Sternebewertung hin zu einem umfangreicheren System aus
Kommandos, Alltagserfahrungen, Fortschrittsstufen und Wochenplanung.

---

# 10. Tagebuch – vom einfachen Eintrag zum CRUD-Bereich

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

Der Wochenplan ist ein eigener dynamischer Bereich von DogBuddy.

HTML:

👉 [`html/wochenplan.html`](html/wochenplan.html)

JavaScript:

👉 [`js/wochenplan.js`](js/wochenplan.js)

Im Wochenplan können Aufgaben für die aktuelle Woche organisiert werden.

Dabei gibt es zwei Arten von Aufgaben:

- selbst erstellte Wochenaufgaben
- automatisch aus anderen DogBuddy-Bereichen übernommene Aufgaben

Aktuell sind die Bereiche **Kommandos** und **Entdecker-Checkliste**
direkt mit dem Wochenplan verbunden.

Dort besitzt jeder Eintrag eine 📅-Auswahl.

Wird diese aktiviert, erscheint die entsprechende Aufgabe automatisch
im Wochenplan.

```text
Kommandos ──────┐
                ├────► Wochenplan
Entdecker ──────┘
```

Selbst erstellte Aufgaben können ebenfalls direkt im Wochenplan angelegt
und anschließend als erledigt markiert werden.

Übernommene Aufgaben bleiben mit ihrem ursprünglichen Bereich verbunden.

Wird eine Aufgabe aus **Kommandos** oder der **Entdecker-Checkliste** im
Wochenplan als erledigt markiert:

1. wird die Aufgabe in den erledigten Verlauf übernommen,
2. wird die 📅-Auswahl im ursprünglichen Bereich wieder freigegeben,
3. wird automatisch die nächste noch fehlende Fortschrittsstufe gesetzt.

Das Prinzip lautet:

```text
👀 kennengelernt
        ↓
🐾 selbst erlebt
        ↓
😌 sicher / entspannt
```

Ist ein Eintrag bereits vollständig abgeschlossen, bleibt der vorhandene
Fortschritt unverändert.

Ein Kommando oder eine Erfahrung kann später erneut für eine andere Woche
ausgewählt werden.

Bereits erledigte Wochenaufgaben bleiben dabei im Verlauf erhalten.

Zusätzlich werden die aktuellen Wochenaufgaben auf dem Dashboard
zusammengefasst.

Dort werden maximal vier Aufgaben direkt angezeigt.

Sind weitere Aufgaben vorhanden, erscheint zusätzlich ein Hinweis wie:

```text
+ 2 weitere Aufgaben
```

---

# 19. Gesundheit

Der Gesundheitsbereich besitzt eine eigene Termin- und Kalenderverwaltung.

HTML:

👉 [`html/gesundheit.html`](html/gesundheit.html)

JavaScript:

👉 [`js/gesundheit.js`](js/gesundheit.js)

Hier können gesundheitsbezogene Termine eingetragen und verwaltet werden.

Dazu gehören beispielsweise:

- Tierarzttermine
- Impfungen
- Untersuchungen
- weitere gesundheitliche Termine

Die Termine werden gespeichert und anschließend automatisch im Kalender
dargestellt.

## Kalender

Der Gesundheitsbereich besitzt zwei Kalenderansichten:

- Wochenansicht
- Monatsansicht

Die Wochenansicht zeigt jeweils eine Woche von Montag bis Sonntag.

Über die Navigation kann zwischen vorherigen und nächsten Wochen gewechselt
und direkt zur aktuellen Woche zurückgekehrt werden.

Die Monatsansicht zeigt den vollständigen Monat.

Auch hier kann zwischen Monaten gewechselt und direkt zum aktuellen Monat
zurückgekehrt werden.

Ein Tag kann ausgewählt werden, um die dazugehörigen Termine anzuzeigen.

Sind an einem Tag mehrere Termine vorhanden, werden diese einzeln dargestellt.

## Verbindung mit dem Dashboard

Offene zukünftige Termine werden zusätzlich automatisch auf dem Dashboard
angezeigt.

Dabei werden die Termine chronologisch sortiert und die nächsten drei
Termine dargestellt.

```text
Gesundheit
    ↓
Termin speichern
    ↓
localStorage
    ↓
app.js
    ↓
Dashboard
```

Dadurch muss ein Termin nur einmal im Gesundheitsbereich gespeichert werden
und kann anschließend automatisch an weiteren Stellen der Anwendung
verwendet werden.

---

# 20. Galerie

Die Galerie besitzt eine eigene HTML-Seite und eine eigene JavaScript-Datei.

HTML:

👉 [`html/galerie.html`](html/galerie.html)

JavaScript:

👉 [`js/galerie.js`](js/galerie.js)

Die Galerie wurde inzwischen dynamisch in DogBuddy eingebunden.

Fotos können innerhalb der Anwendung gespeichert und anschließend in der
Galerie angezeigt werden.

Für die Bildspeicherung wird – wie bereits beim Tagebuch – **IndexedDB**
verwendet.

Die zugehörigen Bilddaten werden dabei nicht direkt in `localStorage`
gespeichert, da Bilddateien deutlich größer als normale Textdaten sind.

Das Grundprinzip lautet:

```text
Foto hinzufügen
      ↓
JavaScript
      ↓
IndexedDB
      ↓
Galerie lädt gespeicherte Fotos
      ↓
Foto wird angezeigt
```

---

## 20.1 Kommandos

Der Bereich **Kommandos** erweitert das ursprüngliche Trainingssystem von
DogBuddy.

HTML:

👉 [`html/kommandos.html`](html/kommandos.html)

JavaScript:

👉 [`js/kommandos.js`](js/kommandos.js)

Aktuell stehen insgesamt **114 Kommandos und Übungen** aus fünf verschiedenen
Kategorien zur Verfügung.

Zu jedem Kommando wird zusätzlich eine kurze Beschreibung angezeigt.

### Fortschrittsstufen

Für jedes Kommando können drei Fortschrittsstufen unabhängig voneinander
dokumentiert werden:

```text
👀 kennengelernt
🐾 selbst erlebt / ausgeführt
😌 sicher bzw. entspannt
```

Jeder Status kann gesetzt und bei Bedarf wieder entfernt werden.

Die Fortschritte werden in `localStorage` unter:

```text
commandChecklist
```

gespeichert.

### Verbindung mit dem Wochenplan

Jedes Kommando besitzt zusätzlich eine 📅-Auswahl.

Damit kann ein Kommando gezielt für die aktuelle Woche ausgewählt werden.

Wird die Auswahl aktiviert, erscheint das Kommando automatisch als Aufgabe
im Wochenplan.

Die Auswahl für die aktuelle Woche wird unter:

```text
weeklySelections
```

gespeichert.

Wird die Aufgabe im Wochenplan als erledigt markiert, wird die 📅-Auswahl
wieder freigegeben und die nächste noch fehlende Fortschrittsstufe gesetzt.

Dadurch können langfristiger Trainingsfortschritt und konkrete Wochenziele
miteinander verbunden werden.

---

## 20.2 Entdecker-Checkliste

Die **Entdecker-Checkliste** dient dazu, Alltagserfahrungen,
Umwelteindrücke und die Sozialisierung des Hundes zu dokumentieren.

HTML:

👉 [`html/entdecker.html`](html/entdecker.html)

JavaScript:

👉 [`js/entdecker.js`](js/entdecker.js)

Die verschiedenen Erfahrungen sind in **13 Kategorien** gegliedert.

### Fortschrittsstufen

Wie bei den Kommandos besitzt jeder Eintrag drei mögliche Fortschrittsstufen:

```text
👀 kennengelernt
🐾 selbst erlebt
😌 entspannt dabei
```

Jeder Status kann unabhängig gesetzt und wieder entfernt werden.

Die Fortschritte werden in `localStorage` unter:

```text
discoveryChecklist
```

gespeichert.

Die erreichten Fortschritte werden zusätzlich zusammengefasst dargestellt:

```text
👀 Kennengelernt
🐾 Selbst erlebt
😌 Entspannt dabei
```

### Verbindung mit dem Wochenplan

Auch jeder Eintrag der Entdecker-Checkliste besitzt eine 📅-Auswahl.

Damit kann eine bestimmte Erfahrung gezielt für die aktuelle Woche geplant
und automatisch in den Wochenplan übernommen werden.

Die Auswahl wird ebenfalls über:

```text
weeklySelections
```

gespeichert.

Wird eine Entdecker-Aufgabe im Wochenplan als erledigt markiert, wird die
📅-Auswahl wieder freigegeben und die nächste noch fehlende
Fortschrittsstufe gesetzt.

Dadurch arbeiten die drei Bereiche direkt zusammen:

```text
Kommandos ──────┐
                ├────► Wochenplan
Entdecker ──────┘
```

Ein bereits verwendeter Eintrag kann später erneut für eine andere Woche
eingeplant werden.

Bereits erledigte Wochenaufgaben bleiben dabei im Verlauf erhalten.

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

DogBuddy ist aktuell ein funktionsfähiger lokaler MVP, bei dem die einzelnen
Bereiche inzwischen zunehmend miteinander verbunden sind.

Die Anwendung läuft vollständig im Browser und verwendet derzeit
`localStorage` und `IndexedDB` zur Datenspeicherung.

## Bereits umgesetzt

### Grundaufbau

- Grundstruktur des Projekts
- Navigation zwischen den verschiedenen Bereichen
- einheitliches Design
- Dashboard
- Hundprofil
- Profilbearbeitung
- automatische Altersberechnung
- seitenübergreifender Nach-oben-Button

### Entwicklung

- Gewicht speichern
- Schulterhöhe speichern
- Messwerte verwalten
- Messwerte automatisch auf dem Dashboard anzeigen
- Entwicklung des Hundes dokumentieren

### Tagebuch

- Tagebucheinträge erstellen
- mehrere Tagebuchfelder
- mehrere Fotos pro Eintrag
- Fotovorschau
- Fotos über IndexedDB speichern
- Tagebucheinträge bearbeiten
- vorhandene Fotos beim Bearbeiten erhalten
- neue Fotos beim Bearbeiten ergänzen
- einzelne Fotos löschen
- Tagebucheinträge löschen
- letzte Tagebucheinträge auf dem Dashboard anzeigen

### Galerie

- eigene Galerie-Seite
- dynamische Galerie
- Fotos innerhalb der Anwendung speichern
- Bildspeicherung über IndexedDB
- gespeicherte Fotos automatisch anzeigen

### Gesundheit

- Gesundheitstermine erstellen und verwalten
- Speicherung der Termine
- Wochenkalender
- Monatskalender
- Navigation zwischen Wochen und Monaten
- Rückkehr zur aktuellen Woche bzw. zum aktuellen Monat
- Termine direkt im Kalender anzeigen
- mehrere Termine an einem Tag einzeln darstellen
- Tag auswählen und zugehörige Termine anzeigen
- kommende Termine automatisch auf dem Dashboard anzeigen
- chronologische Sortierung der kommenden Termine

### Wochenplan

- eigene Wochenplan-Seite
- selbst erstellte Wochenaufgaben
- Aufgaben als erledigt markieren
- erledigte Aufgaben im Verlauf behalten
- Verbindung mit Kommandos
- Verbindung mit der Entdecker-Checkliste
- aktuelle Wochenaufgaben auf dem Dashboard anzeigen
- bei mehr als vier Aufgaben die Anzahl weiterer Aufgaben anzeigen

### Kommandos

- eigener Kommandos-Bereich
- 114 Kommandos und Übungen
- fünf Kategorien
- Beschreibungen zu den einzelnen Kommandos
- drei Fortschrittsstufen
- Fortschritt speichern
- Fortschrittsstatus wieder entfernen
- Kommandos über 📅 für die aktuelle Woche auswählen
- automatische Übernahme in den Wochenplan
- Fortschritt beim Abschließen einer Wochenaufgabe weiterführen

### Entdecker-Checkliste

- eigene Entdecker-Seite
- 13 Kategorien
- Alltagserfahrungen und Umwelteindrücke dokumentieren
- drei Fortschrittsstufen
- Fortschritt speichern
- Fortschrittsstatus wieder entfernen
- Fortschrittsübersicht
- Einträge über 📅 für die aktuelle Woche auswählen
- automatische Übernahme in den Wochenplan
- Fortschritt beim Abschließen einer Wochenaufgabe weiterführen

### Speicherung und Datensicherung

- `localStorage`
- `IndexedDB`
- JSON-Daten
- Trennung größerer Bilddaten von normalen Textdaten
- eigene `database.js`
- Backup-Funktion über `backup.js`

### Entwicklung und Versionsverwaltung

- Git
- GitHub
- schrittweise Erweiterung des Projekts
- bestehende Funktionen über mehrere Bereiche miteinander verknüpft

---

## Noch weiter auszubauen

Die aktuelle Version soll zunächst als eigenständige **DogBuddy Version 1**
erhalten bleiben.

Weitere größere Änderungen sollen anschließend in einer Kopie des Projekts
als **DogBuddy Version 2** entwickelt werden.

Geplant bzw. zu prüfen sind insbesondere:

- Responsive Design
- bessere Nutzung auf Smartphone und Tablet
- öffentliche Frontpage
- Registrierung
- Login und Logout
- Benutzerkonten
- geschützter DogBuddy-Bereich
- mehrere Hunde pro Benutzer
- gemeinsamer Zugriff mehrerer Benutzer auf einen Hund
- zentrale Datenspeicherung
- zentrale Speicherung von Fotos und Medien
- Synchronisierung zwischen mehreren Geräten
- Migration vorhandener lokaler Daten
- HTTPS
- Datenschutz und Zugriffsrechte
- Progressive Web App (PWA)
- Installation auf dem Smartphone über den Browser
- weitere Backup- und Exportmöglichkeiten
- Tests und Validierung
- mögliche PDF-Berichte

Welche technische Lösung für Benutzerkonten, Datenbank, Hosting und
Medienspeicherung verwendet wird, ist noch nicht endgültig entschieden.

Unter anderem sollen dafür `systeme.io`, Supabase und die Möglichkeit eines
eigenen Backends geprüft werden.

---

# Fazit

DogBuddy hat sich schrittweise von einer statischen HTML-/CSS-Seite zu einer
datenverarbeitenden Anwendung entwickelt.

Der aktuelle technische Aufbau kann vereinfacht so dargestellt werden:

```text
                    DogBuddy
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
       HTML           CSS         JavaScript
        ↓              ↓              ↓
     Struktur        Design          Logik
                                      │
                         ┌────────────┴────────────┐
                         ↓                         ↓
                   localStorage                IndexedDB
                         ↓                         ↓
                strukturierte Daten              Fotos
```

Die einzelnen Bereiche arbeiten dabei zunehmend zusammen.

```text
Entwicklung ───────────────────────┐
                                  │
Tagebuch ─────────────────────────┤
                                  │
Gesundheit ───────────────────────┼────► Dashboard
                                  │
Wochenplan ───────────────────────┤
                                  │
Kommandos ───────┐                │
                 ├──► Wochenplan ─┘
Entdecker ───────┘

Tagebuch / Galerie ───────────────► IndexedDB
```

Dadurch habe ich nicht nur HTML, CSS und JavaScript einzeln eingesetzt,
sondern gelernt, wie aus diesen Bestandteilen eine zusammenhängende Anwendung
entsteht.

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

Die aktuelle Speicherung über `localStorage` und `IndexedDB` ermöglicht es,
DogBuddy zunächst vollständig lokal im Browser zu verwenden.

Gleichzeitig bildet Version 1 die Grundlage für die geplante Weiterentwicklung.

```text
DogBuddy Version 1
lokaler Browser-MVP
        ↓
Portfolio-Version sichern
        ↓
Projekt duplizieren
        ↓
DogBuddy Version 2
        ↓
Responsive Webanwendung
        ↓
Benutzerkonten
        ↓
zentrale Datenspeicherung
        ↓
geräteübergreifende Nutzung
        ↓
PWA
```

Damit ist DogBuddy für mich nicht nur eine HTML-/CSS-Übung, sondern ein
Projekt, an dem ich Schritt für Schritt nachvollziehen kann, **wie eine
Anwendung geplant, aufgebaut, erweitert, miteinander verknüpft, getestet
und bei Fehlern verbessert wird**.

---

# 28. Mögliche Erweiterungen und Zukunftsaussichten

DogBuddy ist aktuell als lokaler MVP umgesetzt. Die Anwendung funktioniert bereits vollständig im Browser und verbindet mehrere Bereiche miteinander.

Der jetzige Stand ist jedoch gleichzeitig eine gute Grundlage, um DogBuddy später zu einer deutlich umfangreicheren Webanwendung weiterzuentwickeln.

Dabei möchte ich nicht alle folgenden Punkte zwingend umsetzen. Sie stellen vielmehr mögliche Entwicklungsrichtungen dar, die zeigen, wie aus dem aktuellen Projekt Schritt für Schritt eine vollständige Anwendung entstehen könnte.

Die Weiterentwicklung könnte beispielsweise in mehreren Stufen erfolgen:

```text
Aktueller DogBuddy-MVP
        ↓
Responsive Design
        ↓
online erreichbare Webanwendung
        ↓
zentrale Datenbank
        ↓
Benutzerkonten
        ↓
Synchronisierung mehrerer Geräte
        ↓
PWA / Smartphone-Version
        ↓
umfangreiche DogBuddy-Anwendung
```

---

## 28.1 Responsive Design für Smartphone und Tablet

Aktuell wurde DogBuddy hauptsächlich für die Verwendung auf einem Desktop-PC entwickelt.

Ein wichtiger nächster Schritt wäre deshalb ein vollständig responsives Design.

Dabei soll sich die Benutzeroberfläche automatisch an unterschiedliche Bildschirmgrößen anpassen.

Beispielsweise:

```text
Desktop
   ↓
große Karten nebeneinander

Tablet
   ↓
weniger Spalten

Smartphone
   ↓
Elemente untereinander
```

Dafür könnten CSS Media Queries eingesetzt werden.

Besonders angepasst werden müssten:

- Navigation
- Dashboard
- Profilbereich
- Karten
- Tabellen
- Diagramme
- Galerie
- Formulare
- Popups
- Buttons
- Abstände und Schriftgrößen

Auf einem Smartphone müsste außerdem darauf geachtet werden, dass Buttons und Eingabefelder groß genug für die Bedienung per Touchscreen sind.

---

## 28.2 Mobile Navigation

Die aktuelle Navigation ist für einen großen Bildschirm ausgelegt.

Auf einem Smartphone könnte sie beispielsweise durch ein sogenanntes Hamburger-Menü ersetzt werden.

```text
Desktop:

Dashboard | Tagebuch | Training | Entwicklung | ...


Smartphone:

☰ DogBuddy
```

Beim Antippen könnte sich anschließend ein Menü mit den einzelnen Bereichen öffnen.

Dadurch würde auch auf kleinen Displays genügend Platz für den eigentlichen Inhalt bleiben.

---

## 28.3 Einheitliches Popup-System

Während der Entwicklung wurden Eingabeformulare zunehmend in Popups bzw. Modals verschoben.

Dieses Prinzip könnte langfristig vollständig vereinheitlicht werden.

Beispielsweise für:

- Tagebucheinträge
- Trainingsübungen
- Messungen
- Wochenaufgaben
- Termine
- Fotos und Videos
- Profilbearbeitung

Dadurch würde sich die Bedienung auf allen Seiten ähnlich anfühlen.

Ein langfristiges Ziel könnte deshalb sein, gemeinsame Komponenten und CSS-Klassen zu verwenden, anstatt für jeden Bereich eigene Popup-Regeln zu erstellen.

Das würde den Code reduzieren und die Wartbarkeit verbessern.

---

# 29. DogBuddy als echte Webanwendung

Der aktuelle DogBuddy-MVP funktioniert vollständig lokal im Browser.

Die Daten befinden sich momentan hauptsächlich in:

```text
localStorage
+
IndexedDB
```

Dadurch gehören die gespeicherten Daten immer zu dem Browser und dem Gerät,
auf dem sie angelegt wurden.

Für die weitere Entwicklung soll deshalb zwischen zwei Versionen unterschieden
werden.

## DogBuddy Version 1

Die aktuelle Version soll bewusst erhalten bleiben.

Sie dokumentiert den bisherigen Entwicklungsstand und kann als eigenständiges
Portfolio-Projekt auf GitHub verwendet werden.

```text
DogBuddy Version 1
        ↓
lokaler Browser-MVP
        ↓
localStorage + IndexedDB
        ↓
Portfolio-Projekt
```

Die bestehende Anwendung soll deshalb nicht für die neue Architektur
auseinandergenommen werden.

Stattdessen wird das Projekt kopiert und auf dieser Grundlage eine zweite
Version weiterentwickelt.

## DogBuddy Version 2

DogBuddy Version 2 soll aus dem bisherigen lokalen MVP eine online erreichbare
Webanwendung machen.

Das Grundprinzip könnte folgendermaßen aussehen:

```text
DogBuddy Version 1
        ↓
Projekt kopieren
        ↓
DogBuddy Version 2
        ↓
Responsive Design
        ↓
öffentliche Webanwendung
        ↓
Benutzerkonten
        ↓
zentrale Datenspeicherung
        ↓
Synchronisierung mehrerer Geräte
        ↓
PWA
```

Die vorhandenen Funktionen aus Version 1 sollen dabei möglichst weiterverwendet
und schrittweise an die neue Architektur angepasst werden.

---

## 29.1 Frontpage, Registrierung und Login

Die bisherige `index.html` ist direkt das Dashboard von DogBuddy.

Bei einer öffentlichen Webanwendung wäre das nicht mehr sinnvoll, da Besucher
nicht unmittelbar Zugriff auf persönliche Hundedaten erhalten sollen.

Version 2 soll deshalb zunächst eine öffentliche Frontpage erhalten.

Der geplante Ablauf ist:

```text
DogBuddy aufrufen
        ↓
öffentliche Frontpage
        ↓
┌───────────────────┐
│                   │
↓                   ↓
Registrieren       Login
│                   │
└─────────┬─────────┘
          ↓
   Benutzer anmelden
          ↓
geschützter DogBuddy-Bereich
          ↓
       Dashboard
```

Neue Benutzer sollen ein eigenes Benutzerkonto anlegen können.

Bereits registrierte Benutzer sollen sich anmelden können.

Erst nach erfolgreicher Anmeldung soll der persönliche DogBuddy-Bereich
erreichbar sein.

Dadurch wird die bisherige Anwendung von einer rein lokalen Einzelanwendung
zu einer Anwendung mit getrennten Benutzerbereichen weiterentwickelt.

---

## 29.2 Benutzer und Hunde

Die Daten sollen langfristig nicht nur einem Browser, sondern einem
Benutzerkonto zugeordnet werden.

Ein Benutzer soll dabei auch mehrere Hunde verwalten können.

Beispielsweise:

```text
Benutzer
   │
   ├── Hund 1
   │
   ├── Hund 2
   │
   └── Hund 3
```

Zusätzlich soll ein Hund nicht zwingend nur einem einzigen Benutzer gehören.

Mehrere Benutzer sollen gemeinsam Zugriff auf denselben Hund erhalten können.

```text
Benutzer A ─────┐
                │
                ├────► Hund Major
                │
Benutzer B ─────┘
```

Dadurch könnten beispielsweise mehrere Personen eines Haushalts gemeinsam
Termine, Training, Entwicklung, Tagebuch und andere Daten eines Hundes
verwalten.

Die Datenstruktur muss deshalb später zwischen mindestens folgenden
Bereichen unterscheiden:

```text
Benutzer
   ↓
Berechtigungen
   ↓
Hund
   ↓
DogBuddy-Daten
```

---

## 29.3 Zentrale Datenspeicherung

Die lokale Speicherung über `localStorage` und `IndexedDB` ist für Version 1
ausreichend.

Für eine Mehrbenutzer-Webanwendung wird jedoch eine zentrale Speicherung
benötigt.

Langfristig könnte die Architektur beispielsweise so aussehen:

```text
DogBuddy Frontend
HTML + CSS + JavaScript
        ↓
Authentifizierung
        ↓
Backend / Dienst
        ↓
zentrale Datenbank
        ↓
┌──────────────────────┐
↓                      ↓
strukturierte Daten   Bilder / Medien
```

Dadurch wären die Daten nicht mehr ausschließlich an einen einzelnen Browser
gebunden.

---

## 29.4 Synchronisierung zwischen Geräten

Durch die zentrale Datenspeicherung könnte ein Benutzer DogBuddy auf
verschiedenen Geräten verwenden.

Beispielsweise:

```text
PC ────────────┐
               │
Notebook ──────┤
               │
Tablet ────────┼────► DogBuddy-Konto
               │
Smartphone ────┘
```

Änderungen könnten dadurch auf allen Geräten mit demselben Benutzerkonto
verfügbar sein.

---

## 29.5 Hosting der Anwendung

Damit DogBuddy von verschiedenen Geräten erreichbar ist, muss die Anwendung
online bereitgestellt werden.

Die Anwendung würde dann nicht mehr beispielsweise über:

```text
file:///D:/...
```

geöffnet, sondern über eine Webadresse.

Beispielsweise:

```text
https://dogbuddy...
```

DogBuddy könnte dadurch von:

- PC
- Notebook
- Tablet
- Smartphone

aufgerufen werden.

Für die Online-Version soll HTTPS verwendet werden.

---

## 29.6 Technische Lösung noch offen

Welche Plattform bzw. technische Architektur für DogBuddy Version 2 verwendet
wird, ist noch nicht endgültig entschieden.

Geprüft werden sollen unter anderem:

- `systeme.io`
- Supabase
- ein eigenes Backend
- eine Kombination verschiedener Dienste

Dabei müssen insbesondere folgende Punkte geprüft werden:

- Hosting der Webanwendung
- Registrierung und Login
- Benutzerverwaltung
- Zugriff auf den angemeldeten Benutzer
- zentrale Speicherung strukturierter Daten
- Speicherung von Bildern und anderen Dateien
- Zuordnung der Daten zu Benutzern und Hunden
- gemeinsame Nutzung eines Hundes durch mehrere Benutzer
- Zugriffsrechte
- Datenschutz
- HTTPS
- Backup und Datenexport
- mögliche Kosten bei wachsender Datenmenge

`systeme.io` ist dabei besonders interessant, weil bereits ein vorhandenes
Konto genutzt werden kann.

Vor einer Entscheidung muss jedoch geprüft werden, ob sich dort nicht nur
Seiten und Benutzerbereiche erstellen lassen, sondern ob DogBuddy auch die
benötigten individuellen Daten und Bilder programmgesteuert speichern,
abrufen, zuordnen und gegebenenfalls löschen kann.

Supabase bleibt ebenfalls eine mögliche Lösung und wird deshalb im folgenden
Kapitel separat betrachtet.

---

# 30. Supabase als mögliche Backend-Lösung
Eine besonders interessante Weiterentwicklung wäre die Anbindung von DogBuddy an Supabase.

Supabase könnte mehrere Aufgaben übernehmen, für die aktuell Browser-Speicher verwendet werden.

Dazu gehören beispielsweise:

- PostgreSQL-Datenbank
- Benutzerverwaltung
- Authentifizierung
- Speicherung von Bildern und Videos
- Zugriffsregeln
- zentrale Speicherung der DogBuddy-Daten

Die Architektur könnte dann beispielsweise so aussehen:

```text
DogBuddy Frontend
HTML + CSS + JavaScript
        │
        ▼
    Supabase
        │
 ┌──────┼───────────┐
 │      │           │
 ▼      ▼           ▼
Auth  PostgreSQL   Storage
 │      │           │
 │      │           └── Fotos / Videos
 │      │
 │      └── Training / Termine / Messungen / Tagebuch
 │
 └── Benutzerkonten
```

---

## 30.1 Datenbanktabellen

Die bisherigen JavaScript-Datenstrukturen könnten später in richtige Datenbanktabellen übertragen werden.

Beispielsweise:

```text
users
dogs
measurements
trainings
diary_entries
diary_photos
weekly_tasks
appointments
gallery_entries
```

Eine Messung könnte dann beispielsweise nicht mehr nur als JavaScript-Objekt im Browser gespeichert werden, sondern als Datensatz in einer Datenbank.

---

## 30.2 Beziehungen zwischen den Daten

Mit einer relationalen Datenbank könnten die einzelnen Daten miteinander verbunden werden.

Beispielsweise:

```text
Benutzer
   │
   └── Hund
        │
        ├── Messungen
        ├── Training
        ├── Tagebuch
        │     └── Fotos
        ├── Termine
        └── Wochenplan
```

Damit könnte DogBuddy später auch problemlos mehrere Hunde verwalten.

---

# 31. Benutzerkonten

Eine weitere mögliche Erweiterung wären Benutzerkonten.

Beim Öffnen von DogBuddy könnte dann zunächst eine Anmeldung erfolgen.

Beispielsweise:

```text
DogBuddy

E-Mail
[________________]

Passwort
[________________]

[ Anmelden ]
```

Dadurch könnten die gespeicherten Daten eindeutig einem Benutzer zugeordnet werden.

Mögliche Funktionen wären:

- Registrierung
- Anmeldung
- Abmeldung
- Passwort zurücksetzen
- Benutzerprofil
- geschützter Zugriff auf persönliche Daten

---

## 31.1 Mehrere Hunde pro Benutzer

Der aktuelle DogBuddy ist speziell auf Major ausgerichtet.

Langfristig könnte die Anwendung jedoch mehrere Hunde unterstützen.

Beispielsweise:

```text
Meine Hunde

🐕 Major
🐕 Lou
🐕 Luna
```

Nach der Auswahl eines Hundes würden dann nur dessen:

- Profil
- Messungen
- Trainings
- Tagebuch
- Termine
- Fotos
- Wochenaufgaben

angezeigt.

Damit könnte DogBuddy von einer persönlichen Anwendung zu einer allgemein nutzbaren Hunde-App weiterentwickelt werden.

---

## 31.2 Gemeinsamer Zugriff mehrerer Personen

Eine weitere mögliche Funktion wäre, einen Hund mit mehreren Personen zu verwalten.

Beispielsweise könnten zwei Personen Zugriff auf dasselbe Hundeprofil besitzen.

```text
Major
 │
 ├── Benutzer A
 │
 └── Benutzer B
```

Dadurch könnten beispielsweise beide Personen:

- Termine eintragen
- Training dokumentieren
- Fotos hinzufügen
- Gewicht aktualisieren
- Wochenaufgaben abhaken

Die Daten wären für beide Benutzer synchron.

---

# 32. Synchronisierung zwischen Geräten

Einer der größten Vorteile einer zentralen Datenbank wäre die Synchronisierung.

Aktuell gilt:

```text
PC
│
└── eigene Browserdaten

Smartphone
│
└── eigene Browserdaten
```

Mit einer zentralen Datenbank könnte daraus werden:

```text
          Datenbank
             │
      ┌──────┼──────┐
      │      │      │
      ▼      ▼      ▼
     PC    Tablet  Handy
```

Wird beispielsweise auf dem Smartphone Majors Gewicht eingetragen, könnte der neue Wert unmittelbar auch auf dem PC verfügbar sein.

Dasselbe würde für:

- Tagebucheinträge
- Training
- Termine
- Wochenplan
- Fotos
- Videos
- Profildaten

gelten.

---

# 33. Cloud-Speicher für Fotos und Videos

Aktuell werden Bilder über IndexedDB direkt im Browser gespeichert.

Für eine echte Webanwendung wäre ein Cloud-Speicher sinnvoller.

Supabase Storage könnte beispielsweise verwendet werden für:

```text
Profilbilder
Tagebuchbilder
Galeriebilder
Videos
```

In der Datenbank müsste dann nicht die komplette Bilddatei gespeichert werden.

Stattdessen könnte dort eine Zuordnung bzw. ein Pfad zur Datei gespeichert werden.

Beispielsweise:

```text
Tagebucheintrag
     │
     └── Foto-ID
             │
             ▼
       Cloud Storage
             │
             └── major-see.jpg
```

Dadurch könnten dieselben Fotos weiterhin an mehreren Stellen der Anwendung verwendet werden, ohne sie mehrfach speichern zu müssen.

---

# 34. DogBuddy als Progressive Web App (PWA)

Nach der Umsetzung eines responsiven Designs könnte DogBuddy als Progressive Web App erweitert werden.

Eine PWA ist weiterhin eine Webanwendung, kann sich auf einem Smartphone aber teilweise wie eine installierte App verhalten.

Der Benutzer könnte DogBuddy beispielsweise auf dem Smartphone öffnen und anschließend zum Startbildschirm hinzufügen.

Danach könnte dort ein eigenes DogBuddy-App-Symbol erscheinen.

```text
Smartphone

┌──────────────┐
│   🐾         │
│  DogBuddy    │
└──────────────┘
```

Beim Start könnte DogBuddy anschließend ohne die typische Browserdarstellung geöffnet werden.

---

## 34.1 Voraussetzungen für eine PWA

Dafür wären unter anderem folgende Erweiterungen notwendig:

```text
manifest.json
service-worker.js
App-Icons
HTTPS
Responsive Design
```

Die `manifest.json` könnte Informationen enthalten wie:

- Name der Anwendung
- Kurzname
- App-Icon
- Startseite
- Hintergrundfarbe
- Theme-Farbe
- Darstellungsmodus

---

## 34.2 Offline-Funktionen

Ein Service Worker könnte bestimmte Dateien zwischenspeichern.

Dadurch könnte DogBuddy teilweise auch funktionieren, wenn vorübergehend keine Internetverbindung vorhanden ist.

Beispielsweise könnten:

- HTML
- CSS
- JavaScript
- Logo
- bestimmte statische Inhalte

lokal zwischengespeichert werden.

Für Datenbankänderungen wäre zusätzlich zu überlegen, wie offline erstellte Daten später mit der Online-Datenbank synchronisiert werden.

Das wäre bereits eine deutlich anspruchsvollere Erweiterung.

---

# 35. Spätere echte Smartphone-App

Neben einer PWA wäre langfristig auch eine richtige Smartphone-App denkbar.

Dabei müsste entschieden werden, ob DogBuddy weiterhin hauptsächlich auf Webtechnologien basiert oder ob eine eigene mobile Anwendung entwickelt wird.

Eine Möglichkeit wäre, das vorhandene Webprojekt als Grundlage zu behalten und mit einer geeigneten Technologie als mobile Anwendung bereitzustellen.

Alternativ könnte später ein separates mobiles Frontend entstehen.

Das Grundprinzip könnte trotzdem gleich bleiben:

```text
             zentrale DogBuddy-Daten
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
        Webanwendung      Smartphone-App
             │                 │
             └────────┬────────┘
                      │
                      ▼
               gleiche Datenbank
```

Damit könnten Webanwendung und Smartphone-App dieselben Daten verwenden.

---

# 36. Erinnerungen und Benachrichtigungen

Für DogBuddy wären Benachrichtigungen eine besonders interessante Erweiterung.

Beispiele:

```text
💉 Morgen: Impftermin um 15:30 Uhr

🐕 Heute: Welpengruppe um 18:00 Uhr

⚖️ Major wurde seit 7 Tagen nicht gewogen.

⭐ Wochenziel „Rückruf üben“ ist noch offen.
```

Mögliche Erinnerungen wären:

- Tierarzttermine
- Impfungen
- Medikamente
- Hundeschule
- Training
- Wiegetermine
- Pflege
- Wochenaufgaben

Bei einer späteren PWA oder App könnten dafür Push-Benachrichtigungen untersucht werden.

---

# 37. Erweiterung des Gesundheitsbereichs

Der Gesundheitsbereich könnte langfristig deutlich umfangreicher werden.

Neben normalen Terminen könnten beispielsweise gespeichert werden:

- Impfungen
- Entwurmungen
- Zeckenschutz
- Medikamente
- Allergien
- Krankheiten
- Operationen
- Tierarztberichte
- Laborwerte
- Röntgenergebnisse
- HD-/ED-Ergebnisse
- Gewicht beim Tierarzt
- Versicherungsinformationen

Auch Dokumente könnten eventuell hinterlegt werden.

Beispielsweise:

```text
Gesundheit
   │
   ├── Impfpass
   ├── Untersuchungen
   ├── Medikamente
   ├── Röntgen
   └── Dokumente
```

---

# 38. Erweiterung der Entwicklungsdaten

Der Bereich Entwicklung könnte später zusätzliche Messwerte aufnehmen.

Beispielsweise:

- Gewicht
- Schulterhöhe
- Halsumfang
- Brustumfang
- Körperlänge

Aus den gespeicherten Werten könnten automatisch Diagramme erstellt werden.

Beispielsweise:

```text
Gewicht

20 kg |                         ●
18 kg |                    ●
16 kg |               ●
14 kg |          ●
12 kg |     ●
      +----------------------------
        Aug  Sep  Okt  Nov  Dez
```

Dadurch wäre die körperliche Entwicklung von Major über einen längeren Zeitraum direkt sichtbar.

---

# 39. Erweiterung des Trainingsbereichs

Der ursprüngliche Trainingsbereich von DogBuddy wurde inzwischen deutlich
weiterentwickelt.

Die frühere Idee einer einfachen Sternebewertung wurde durch einen eigenen
Bereich für **Kommandos und Übungen** ersetzt.

Der aktuelle Bereich befindet sich in:

HTML:

👉 [`html/kommandos.html`](html/kommandos.html)

JavaScript:

👉 [`js/kommandos.js`](js/kommandos.js)

Aktuell stehen insgesamt **114 Kommandos und Übungen** aus fünf verschiedenen
Kategorien zur Verfügung.

Zu jedem Kommando wird zusätzlich eine kurze Beschreibung angezeigt.

## Aktuelles Fortschrittssystem

Anstelle einer Sternebewertung werden drei konkrete Fortschrittsstufen
verwendet:

```text
👀 kennengelernt
🐾 selbst erlebt / ausgeführt
😌 sicher bzw. entspannt
```

Dadurch wird nicht nur bewertet, wie gut ein Kommando funktioniert.

Stattdessen kann nachvollzogen werden, ob Major ein Kommando zunächst
kennengelernt, bereits selbst ausgeführt und schließlich sicher bzw.
entspannt beherrscht hat.

Die einzelnen Fortschrittsstufen können unabhängig voneinander gesetzt und
bei Bedarf wieder entfernt werden.

Die Daten werden unter:

```text
commandChecklist
```

im `localStorage` gespeichert.

## Verbindung mit dem Wochenplan

Der Kommandos-Bereich ist inzwischen direkt mit dem Wochenplan verbunden.

Jedes Kommando besitzt dafür eine 📅-Auswahl.

```text
Kommando auswählen
        ↓
📅 für diese Woche
        ↓
Wochenplan
        ↓
Aufgabe erledigen
        ↓
nächste Fortschrittsstufe
```

Wird ein Kommando für die aktuelle Woche ausgewählt, erscheint es automatisch
im Wochenplan.

Wird die Aufgabe dort als erledigt markiert:

1. wird die Wochenaufgabe als erledigt gespeichert,
2. wird die 📅-Auswahl beim Kommando wieder freigegeben,
3. wird automatisch die nächste noch fehlende Fortschrittsstufe gesetzt.

Die Reihenfolge lautet:

```text
👀
↓
🐾
↓
😌
```

Ist ein Kommando bereits vollständig abgeschlossen, bleibt der vorhandene
Fortschritt unverändert.

Dasselbe Kommando kann später erneut für eine andere Woche eingeplant werden.

Bereits erledigte Wochenaufgaben bleiben dabei im Verlauf erhalten.

## Mögliche spätere Erweiterungen

Obwohl der Trainingsbereich bereits deutlich erweitert wurde, könnten später
noch zusätzliche Funktionen ergänzt werden.

Denkbar wären beispielsweise:

- persönliche Notizen zu einzelnen Kommandos
- Datum des ersten erfolgreichen Ausführens
- Trainingshistorie
- Filter nach Kategorien und Fortschritt
- Suchfunktion für Kommandos
- eigene Kommandos ergänzen
- Statistiken über Trainingsfortschritte
- Diagramme über längere Trainingszeiträume

Damit könnte sich der heutige Kommandos-Bereich langfristig von einer
Fortschritts-Checkliste zu einer umfangreicheren Trainingsdokumentation
weiterentwickeln.

---

# 40. Ziele und Meilensteine

Viele ursprünglich für einen eigenen Ziele-Bereich vorgesehene Funktionen
wurden inzwischen auf andere Bereiche von DogBuddy verteilt.

Konkrete Übungen und Kommandos werden heute über den Bereich **Kommandos**
verwaltet.

Alltagserfahrungen und Sozialisierung werden über die
**Entdecker-Checkliste** dokumentiert.

Beide Bereiche können zusätzlich mit dem **Wochenplan** verbunden werden.

```text
Kommandos ─────────────┐
                      │
Entdecker-Checkliste ──┼────► Wochenplan
                      │
eigene Wochenaufgaben ─┘
```

Dadurch können bereits konkrete kurzfristige Ziele für eine Woche festgelegt
und anschließend als erledigt dokumentiert werden.

## Möglicher späterer Ziele-Bereich

Ein eigener Bereich für **größere und längerfristige Ziele** könnte DogBuddy
später trotzdem sinnvoll ergänzen.

Dabei würde es nicht um einzelne Kommandos oder Alltagserfahrungen gehen,
sondern um übergeordnete Ziele.

Beispiele könnten sein:

```text
○ zuverlässig ohne Leine laufen
○ längere Zeit entspannt alleine bleiben
○ sicher im Auto mitfahren
○ erste größere Bergtour
○ zuverlässig aus dem Wasser abrufbar sein
○ bestimmtes Trainingsziel erreichen
```

Ein Ziel könnte zusätzliche Informationen erhalten:

- Titel
- Beschreibung
- Kategorie
- Startdatum
- gewünschtes Zieldatum
- aktueller Status
- persönliche Notizen

## Status eines Ziels

Für längerfristige Ziele könnte beispielsweise zwischen verschiedenen
Zuständen unterschieden werden:

```text
○ geplant
◐ in Arbeit
✓ erreicht
```

Dadurch wäre direkt sichtbar, welche Ziele noch geplant sind, an welchen
aktuell gearbeitet wird und welche bereits erreicht wurden.

## Verbindung mit bestehenden Bereichen

Langfristig könnten Ziele zusätzlich mit bereits vorhandenen Bereichen
verknüpft werden.

```text
größeres Ziel
      ↓
┌─────────────┬─────────────┬─────────────┐
↓             ↓             ↓
Kommandos   Entdecker    Wochenplan
```

Ein größeres Ziel könnte dadurch aus mehreren kleineren Übungen,
Erfahrungen oder Wochenaufgaben bestehen.

So würde der mögliche Ziele-Bereich die bestehenden Funktionen nicht
ersetzen, sondern als übergeordnete Planung ergänzen.

---

# 41. Entdecker-Checkliste

Die ursprünglich geplante Sozialisierungs-Checkliste wurde inzwischen
umgesetzt und zu einer umfangreicheren **Entdecker-Checkliste** weiterentwickelt.

Der Bereich befindet sich in:

HTML:

👉 [`html/entdecker.html`](html/entdecker.html)

JavaScript:

👉 [`js/entdecker.js`](js/entdecker.js)

Die Entdecker-Checkliste dient dazu, Erfahrungen, Alltagssituationen,
Umwelteindrücke und wichtige Erlebnisse des Hundes übersichtlich zu
dokumentieren.

Die einzelnen Einträge sind in insgesamt **13 Kategorien** gegliedert.

Dazu gehören beispielsweise Erfahrungen mit:

- Verkehr und Transportmitteln
- Menschen
- anderen Tieren
- verschiedenen Orten
- Geräuschen
- Untergründen
- Wasser
- Natur
- Alltagssituationen
- neuen Umgebungen

Dadurch lässt sich nicht nur festhalten, **ob** der Hund etwas bereits
kennengelernt hat, sondern auch, wie weit die Erfahrung inzwischen
gefestigt ist.

## Fortschrittsstufen

Für jeden Eintrag können drei verschiedene Fortschrittsstufen dokumentiert
werden:

```text
👀 Kennengelernt
🐾 Selbst erlebt
😌 Entspannt dabei
```

Die drei Zustände können unabhängig voneinander gesetzt und bei Bedarf
wieder entfernt werden.

Dadurch kann beispielsweise unterschieden werden, ob Major etwas bisher nur
gesehen hat, bereits selbst erlebt hat oder in der jeweiligen Situation
schon entspannt reagieren kann.

Die Fortschritte werden unter:

```text
discoveryChecklist
```

im `localStorage` gespeichert.

## Fortschrittsübersicht

Die Entdecker-Seite zeigt zusätzlich eine Übersicht über den aktuellen
Fortschritt.

Dabei werden die erreichten Zustände getrennt ausgewertet:

```text
👀 Kennengelernt
🐾 Selbst erlebt
😌 Entspannt dabei
```

So lässt sich auf einen Blick erkennen, wie viele Erfahrungen bereits
gesammelt und wie viele davon schon gefestigt wurden.

## Verbindung mit dem Wochenplan

Die Entdecker-Checkliste wurde zusätzlich mit dem Wochenplan verbunden.

Jeder Eintrag besitzt dafür eine 📅-Auswahl.

Wird diese aktiviert, wird die entsprechende Erfahrung für die aktuelle
Woche eingeplant und automatisch in den Wochenplan übernommen.

```text
Entdecker-Checkliste
        ↓
    📅 auswählen
        ↓
     Wochenplan
```

Wird die Aufgabe im Wochenplan als erledigt markiert, wird die
📅-Auswahl wieder freigegeben.

Zusätzlich wird automatisch die nächste noch fehlende Fortschrittsstufe
gesetzt:

```text
👀
↓
🐾
↓
😌
```

Ist ein Eintrag bereits vollständig abgeschlossen, bleibt der vorhandene
Fortschritt unverändert.

Ein Eintrag kann später erneut für eine andere Woche ausgewählt werden.
Bereits erledigte Wochenaufgaben bleiben dabei im Verlauf erhalten.

Damit ist aus der ursprünglichen Idee einer einfachen
Sozialisierungs-Checkliste inzwischen ein mit dem Wochenplan verbundenes
System zur Dokumentation von Alltagserfahrungen und Entwicklungsfortschritten
entstanden.

---

# 42. Orte und Ausflüge

Eine weitere mögliche Erweiterung wäre ein eigener Bereich für Ausflugsziele.

Dort könnten beispielsweise gespeichert werden:

- Seen
- Wanderungen
- Hundewiesen
- Trainingsplätze
- Restaurants
- hundefreundliche Orte

Zusätzlich wären Bewertungen oder persönliche Notizen denkbar.

Beispielsweise:

```text
Ort: Mustersee
Wasserzugang: ★★★★★
Hundefreundlich: ★★★★☆
Parken: ★★★☆☆
Besucht: 14.09.2026
```

Langfristig wäre auch eine Kartenansicht denkbar.

---

# 43. Erweiterung des Dashboards

Das Dashboard wurde während der Entwicklung mehrfach erweitert und dient
inzwischen als zentrale Übersicht von DogBuddy.

Viele Informationen aus den einzelnen Bereichen werden dort automatisch
zusammengeführt.

## Aktuell angezeigte Informationen

Das Dashboard zeigt unter anderem:

- das Profil von Major
- automatisch berechnete Altersinformationen
- aktuelle Entwicklungsdaten
- die nächsten anstehenden Termine
- aktuelle Wochenaufgaben
- die letzten Tagebucheinträge
- direkte Verknüpfungen zu den verschiedenen DogBuddy-Bereichen

Dadurch müssen wichtige Informationen nicht erst auf den jeweiligen
Unterseiten gesucht werden.

Mehrere Bereiche liefern ihre Daten direkt an das Dashboard.

```text
Hundeprofil ──────────┐
                     │
Entwicklung ──────────┤
                     │
Gesundheit ───────────┤
                     ├────► Dashboard
Wochenplan ───────────┤
                     │
Tagebuch ─────────────┘
```

## Termine auf dem Dashboard

Die im Gesundheitsbereich gespeicherten Termine werden automatisch
ausgewertet.

Auf dem Dashboard werden die nächsten **drei offenen zukünftigen Termine**
chronologisch angezeigt.

Dabei werden jeweils:

```text
Titel
Datum
Uhrzeit
```

dargestellt.

Die eigentliche Verwaltung der Termine bleibt im Gesundheitsbereich.

## Wochenplan auf dem Dashboard

Auch die aktuellen Wochenaufgaben werden auf dem Dashboard zusammengefasst.

Dabei werden maximal vier Aufgaben direkt angezeigt.

Sind mehr Aufgaben vorhanden, erscheint zusätzlich ein Hinweis wie:

```text
+ 2 weitere Aufgaben
```

Die eigentliche Bearbeitung und das Abschließen der Aufgaben erfolgt weiterhin
im Wochenplan.

## Tagebuch auf dem Dashboard

Das Dashboard zeigt zusätzlich die letzten **zwei Tagebucheinträge** an.

Dabei werden jeweils:

```text
Datum
Titel
```

angezeigt.

Die vollständigen Einträge und die dazugehörigen Bilder befinden sich weiterhin
im Tagebuch.

## Mögliche spätere Erweiterungen

Das Dashboard könnte langfristig noch stärker personalisiert werden.

Denkbar wären beispielsweise:

- frei anordenbare Dashboard-Karten
- ein- und ausblendbare Bereiche
- zusätzliche Statistiken
- Fortschrittsanzeigen für Kommandos
- Fortschrittsanzeigen für die Entdecker-Checkliste
- Hinweise auf bald fällige Termine
- Geburtstags- oder Altersmeilensteine
- Zusammenfassungen der Entwicklung
- individuelle Dashboard-Einstellungen pro Benutzer

Gerade mit der geplanten Mehrbenutzer-Version könnte später jeder Benutzer
selbst festlegen, welche Informationen auf seinem Dashboard besonders
prominent angezeigt werden sollen.

Damit würde sich das Dashboard von einer festen Übersicht zu einer
personalisierbaren Startseite von DogBuddy weiterentwickeln.

---

# 44. Suche, Filter und Sortierung

Mit zunehmender Datenmenge wäre eine Suchfunktion sinnvoll.

Beispielsweise könnte im Tagebuch nach:

```text
schwimmen
Tierarzt
Rückruf
Chiemsee
```

gesucht werden.

Auch Filter wären denkbar.

Zum Beispiel:

```text
Zeitraum
Kategorie
Bewertung
Status
```

Damit könnten ältere Informationen schneller gefunden werden.

---

# 45. Backup und Datenexport

Da DogBuddy Version 1 seine Daten lokal im Browser speichert, wurde inzwischen
eine eigene Backup-Funktion umgesetzt.

Die zugehörige JavaScript-Datei ist:

👉 [`js/backup.js`](js/backup.js)

Die Backup-Funktion ermöglicht es, die lokal gespeicherten DogBuddy-Daten
zusätzlich zu sichern.

Das ist besonders wichtig, da Daten aus `localStorage` und `IndexedDB`
ansonsten an den jeweiligen Browser bzw. das verwendete Gerät gebunden sind.

Das Grundprinzip lautet:

```text
DogBuddy
    ↓
lokal gespeicherte Daten
    ↓
Backup-Funktion
    ↓
zusätzliche Datensicherung
```

---

# 46. PDF-Berichte

Eine interessante spätere Funktion wäre die automatische Erstellung von Berichten.

Beispielsweise könnte ein Gesundheitsbericht erzeugt werden:

```text
DogBuddy – Major

Geburtsdatum
Gewichtsentwicklung
Impfungen
Medikamente
Tierarzttermine
Untersuchungen
```

Dieser könnte beispielsweise für einen Tierarztbesuch verwendet werden.

Auch ein Entwicklungstagebuch oder Jahresrückblick wäre denkbar.

---

# 47. Datenschutz und Sicherheit

Mit der geplanten DogBuddy Version 2 werden Datenschutz und Sicherheit
deutlich wichtiger, da persönliche Daten nicht mehr ausschließlich lokal
im eigenen Browser gespeichert werden.

Besonders relevant sind dabei:

- Benutzerkonten und persönliche Daten
- Gesundheitsinformationen des Hundes
- Tagebucheinträge
- private Fotos und weitere Medien
- gemeinsam verwaltete Hunde

## HTTPS

Die Online-Version von DogBuddy soll ausschließlich über HTTPS erreichbar sein.

Dadurch wird die Datenübertragung zwischen Browser und Server verschlüsselt.

```text
Browser
   ↓
 HTTPS
   ↓
DogBuddy
```

HTTPS allein reicht jedoch nicht aus, um die Anwendung vollständig zu schützen.

## Authentifizierung

DogBuddy Version 2 soll eine öffentliche Frontpage mit Registrierung und
Login erhalten.

Das eigentliche Dashboard und die persönlichen Hundedaten sollen erst nach
einer erfolgreichen Anmeldung erreichbar sein.

```text
öffentliche Frontpage
        ↓
Registrieren / Login
        ↓
Authentifizierung
        ↓
geschützter DogBuddy-Bereich
        ↓
Dashboard
```

Passwörter dürfen dabei niemals im Klartext gespeichert werden.

## Autorisierung und Zugriffsrechte

Neben der Anmeldung muss geprüft werden, auf welche Daten ein Benutzer
tatsächlich zugreifen darf.

Ein Benutzer soll grundsätzlich nur die Hunde und Daten sehen können, für
die er eine Berechtigung besitzt.

Gleichzeitig soll es möglich sein, einen Hund mit mehreren Benutzern zu
verknüpfen.

```text
Benutzer A ─────┐
                ├────► Hund Major
Benutzer B ─────┘
```

Dadurch könnten beispielsweise mehrere Personen eines Haushalts gemeinsam
denselben Hund verwalten.

Die Berechtigungsprüfung darf nicht nur über die sichtbare Oberfläche
erfolgen, sondern muss auch beim Zugriff auf die zentral gespeicherten
Daten berücksichtigt werden.

## Weitere Sicherheitsanforderungen

Für die Online-Version müssen unter anderem folgende Punkte berücksichtigt
werden:

- sichere Authentifizierung
- sichere Passwortverwaltung
- korrekte Zugriffsrechte
- Trennung der Daten verschiedener Benutzer
- geschützter Zugriff auf private Fotos und Dateien
- keine sensiblen Zugangsdaten im öffentlichen JavaScript
- Validierung von Benutzereingaben
- sichere Datei-Uploads
- Backup-Möglichkeiten
- Datenschutz
- Möglichkeit zur Löschung eines Benutzerkontos und der zugehörigen Daten

Welche technische Lösung dafür verwendet wird, ist noch nicht endgültig
festgelegt.

Mögliche Lösungen wie **systeme.io**, **Supabase** oder ein eigenes Backend
müssen hinsichtlich Authentifizierung, Datenbank, Dateispeicherung und
Zugriffsrechten geprüft und miteinander verglichen werden.

Dieser Bereich bildet einen wichtigen nächsten Lernschritt von der lokalen
DogBuddy Version 1 zur geplanten Mehrbenutzer-Webanwendung.

---

# 48. Validierung und Tests

Mit zunehmendem Umfang müsste DogBuddy stärker getestet werden.

Beispiele:

```text
Was passiert bei leerem Titel?

Was passiert bei falschen Werten?

Kann ein Gewicht negativ sein?

Was passiert bei sehr großen Bildern?

Was passiert ohne Internet?

Was passiert, wenn Daten nicht geladen werden können?
```

Denkbar wären später:

- Eingabevalidierung
- Fehlermeldungen
- automatische Tests
- Tests verschiedener Browser
- Smartphone-Tests
- Tests unterschiedlicher Bildschirmgrößen

---

# 49. Barrierefreiheit

Auch die Barrierefreiheit könnte weiter verbessert werden.

Dazu gehören beispielsweise:

- ausreichende Farbkontraste
- gut lesbare Schriftgrößen
- Tastaturbedienung
- sichtbare Fokuszustände
- sinnvolle `aria`-Attribute
- Alternativtexte für Bilder
- verständliche Beschriftungen von Formularfeldern

Damit würde die Anwendung nicht nur optisch, sondern auch technisch benutzerfreundlicher.

---

# 50. Performance

Mit vielen Fotos, Videos und Datensätzen könnte später auch die Performance wichtiger werden.

Mögliche Optimierungen wären:

- Bilder verkleinern
- Vorschaubilder erzeugen
- Bilder erst laden, wenn sie benötigt werden
- Videos begrenzen oder komprimieren
- Daten nicht unnötig mehrfach laden
- größere Listen schrittweise anzeigen

Gerade für die Nutzung auf einem Smartphone und über mobile Daten wäre dies wichtig.

---

# 51. Wiederverwendbare Komponenten und weitere Code-Strukturierung

Mit zunehmendem Projektumfang wurde die JavaScript-Struktur von DogBuddy
bereits schrittweise auf mehrere Dateien aufgeteilt.

Die einzelnen Bereiche besitzen weitgehend eigene JavaScript-Dateien.

Die aktuelle Struktur umfasst unter anderem:

```text
js/
├── app.js
├── backup.js
├── database.js
├── entdecker.js
├── entwicklung.js
├── galerie.js
├── gesundheit.js
├── kommandos.js
├── scroll-top.js
├── tagebuch.js
├── training.js
└── wochenplan.js
```

Dadurch befindet sich nicht die gesamte Programmlogik in einer einzigen
JavaScript-Datei.

Stattdessen können die verschiedenen Bereiche von DogBuddy getrennt
weiterentwickelt und übersichtlicher verwaltet werden.

## Bereits gemeinsam verwendete Funktionen

Ein Beispiel für eine bereichsübergreifende Funktion ist der
**Nach-oben-Button**.

Die Funktion befindet sich zentral in:

👉 [`js/scroll-top.js`](js/scroll-top.js)

Die Datei kann auf verschiedenen HTML-Seiten eingebunden werden, ohne dass
die gleiche JavaScript-Logik auf jeder Seite erneut geschrieben werden muss.

Das Grundprinzip lautet:

```text
scroll-top.js
      ↓
┌─────────────┬─────────────┬─────────────┐
↓             ↓             ↓
Seite 1     Seite 2       Seite 3
```

Dadurch kann dieselbe Funktion von mehreren Bereichen verwendet werden.

## Weitere mögliche Strukturierung

Mit wachsendem Projektumfang könnten später noch weitere gemeinsam verwendete
Funktionen aus den einzelnen Dateien ausgelagert werden.

Denkbar wären beispielsweise zentrale Funktionen für:

- Datumsformatierung
- Validierung von Eingaben
- Meldungen
- Popups
- wiederkehrende DOM-Funktionen
- gemeinsame Speicherfunktionen
- Datei- und Bildverarbeitung

Eine spätere Struktur könnte beispielsweise so aussehen:

```text
js/
├── app.js
├── backup.js
├── database.js
├── entdecker.js
├── entwicklung.js
├── galerie.js
├── gesundheit.js
├── kommandos.js
├── scroll-top.js
├── tagebuch.js
├── training.js
├── wochenplan.js
│
└── gemeinsame Funktionen
    ├── utils.js
    ├── validation.js
    └── modal.js
```

Diese zusätzlichen Dateien existieren aktuell noch nicht, zeigen aber eine
mögliche spätere Weiterentwicklung der Code-Struktur.

## Ziel der weiteren Strukturierung

Gemeinsam verwendete Funktionen sollten langfristig möglichst nur einmal
programmiert werden.

Statt:

```text
gleiche Funktion in Datei A
gleiche Funktion in Datei B
gleiche Funktion in Datei C
```

wäre das Ziel:

```text
zentrale Funktion
      ↓
von mehreren Bereichen verwenden
```

Dadurch könnte:

- doppelter Code reduziert werden,
- die Wartbarkeit verbessert werden,
- die Fehlersuche einfacher werden,
- das Projekt übersichtlicher bleiben,
- eine spätere Erweiterung von DogBuddy erleichtert werden.

Die bereits vorhandene Aufteilung der einzelnen DogBuddy-Bereiche bildet
dafür eine gute Grundlage.

---

# 52. Migration der bisherigen Browserdaten

Wenn DogBuddy später auf Supabase oder eine andere Datenbank umgestellt wird, stellt sich eine weitere interessante Frage:

```text
Was passiert mit den bereits vorhandenen localStorage-
und IndexedDB-Daten?
```

Eine mögliche Lösung wäre eine Import- bzw. Migrationsfunktion.

```text
localStorage
      │
IndexedDB
      │
      ▼
Daten auslesen
      │
      ▼
Daten umwandeln
      │
      ▼
Supabase
```

Dadurch könnten bereits vorhandene DogBuddy-Daten in die neue Datenbank übernommen werden.

Dieser Schritt wäre gleichzeitig eine praktische Übung für Datenmigration.

---

# 53. Alternative Backend-Architektur

Supabase ist nur eine mögliche Weiterentwicklung.

Eine andere Variante wäre ein selbst entwickeltes Backend.

Da ich im Rahmen meiner Ausbildung auch mit C# und SQL arbeite, könnte beispielsweise folgende Architektur interessant sein:

```text
DogBuddy Frontend
HTML + CSS + JavaScript
        │
        ▼
REST API
ASP.NET Core / C#
        │
        ▼
SQL-Datenbank
```

Damit könnte ich zusätzlich lernen:

- HTTP
- REST
- GET
- POST
- PUT
- DELETE
- Controller
- Models
- Datenbankzugriffe
- serverseitige Validierung
- Authentifizierung

Diese Variante wäre aufwendiger als Supabase, würde dafür aber zusätzliche Backend-Erfahrung ermöglichen.

---

# 54. DogBuddy als Anwendung für andere Hundebesitzer

DogBuddy Version 1 wurde ursprünglich speziell für Major entwickelt.

Dadurch konnten die verschiedenen Funktionen zunächst anhand eines konkreten
Hundes entwickelt und getestet werden.

Mit **DogBuddy Version 2** soll daraus langfristig eine Webanwendung entstehen,
die auch von anderen Hundebesitzern verwendet werden kann.

## Eigene Benutzerkonten

Jeder Hundebesitzer soll sich über die öffentliche Frontpage registrieren und
anschließend mit seinem eigenen Benutzerkonto anmelden können.

```text
DogBuddy
    ↓
öffentliche Frontpage
    ↓
Registrieren / Login
    ↓
Benutzerkonto
    ↓
persönlicher DogBuddy-Bereich
```

Die persönlichen Daten eines Benutzers sollen erst nach erfolgreicher
Anmeldung erreichbar sein.

## Eigene Hunde

Nach der Anmeldung soll ein Benutzer seine eigenen Hunde anlegen und verwalten
können.

```text
Benutzer
   │
   ├── Hund 1
   │
   ├── Hund 2
   │
   └── Hund 3
```

Dadurch wären die bisherigen DogBuddy-Funktionen nicht mehr fest mit Major
verbunden.

Stattdessen würden die jeweiligen Daten dem ausgewählten Hund zugeordnet.

Dazu gehören beispielsweise:

- Hundeprofil
- Entwicklung
- Gesundheit und Termine
- Tagebuch
- Galerie
- Kommandos
- Entdecker-Checkliste
- Wochenplan

## Mehrere Benutzer für einen Hund

Zusätzlich soll ein Hund nicht zwingend nur einem Benutzer zugeordnet sein.

Mehrere Benutzer sollen gemeinsam Zugriff auf denselben Hund erhalten können.

Beispielsweise:

```text
Benutzer A ─────┐
                │
                ├────► Hund Major
                │
Benutzer B ─────┘
```

Dadurch könnten beispielsweise mehrere Personen eines Haushalts gemeinsam
die Daten eines Hundes verwalten.

Gleichzeitig könnte ein Benutzer mehrere Hunde besitzen.

Dadurch entsteht langfristig eine Beziehung zwischen Benutzern und Hunden:

```text
Benutzer
   ↕
Berechtigungen
   ↕
Hunde
   ↓
DogBuddy-Daten
```

## Trennung der Daten

Für eine solche Mehrbenutzer-Anwendung ist es besonders wichtig, dass die
Daten verschiedener Benutzer und Hunde sauber voneinander getrennt werden.

Ein Benutzer darf nur auf Hunde und Daten zugreifen, für die er eine
entsprechende Berechtigung besitzt.

Die Prüfung darf dabei nicht ausschließlich über die sichtbare
Benutzeroberfläche erfolgen.

Auch beim Zugriff auf die zentral gespeicherten Daten müssen die jeweiligen
Berechtigungen berücksichtigt werden.

## Technische Voraussetzungen

Für diese Weiterentwicklung werden unter anderem folgende Bestandteile
benötigt:

- öffentliche Webanwendung
- Registrierung und Login
- Authentifizierung
- Benutzerverwaltung
- Hundeverwaltung
- Berechtigungen zwischen Benutzern und Hunden
- zentrale Datenbank
- Speicherung von Bildern und Medien
- sichere Zugriffsrechte
- HTTPS
- Responsive Design
- geräteübergreifende Synchronisierung
- Datenschutz
- Backup- und Exportmöglichkeiten

Welche technische Lösung dafür verwendet wird, ist noch nicht endgültig
entschieden.

Geprüft werden sollen unter anderem:

- `systeme.io`
- Supabase
- ein eigenes Backend
- eine Kombination verschiedener Dienste

## Ziel

Aus dem ursprünglich für Major entwickelten lokalen DogBuddy könnte dadurch
schrittweise eine Anwendung für verschiedene Hundebesitzer entstehen.

```text
DogBuddy Version 1
        ↓
lokaler MVP für Major
        ↓
DogBuddy Version 2
        ↓
Benutzerkonten
        ↓
eigene Hunde
        ↓
gemeinsam verwaltete Hunde
        ↓
zentrale Datenspeicherung
        ↓
Webanwendung für mehrere Hundebesitzer
```

Die vorhandene Version 1 bleibt dabei als eigenständiges Portfolio-Projekt
erhalten.

---

# 55. Mögliche Entwicklungs-Roadmap

DogBuddy Version 1 ist inzwischen als lokaler MVP funktionsfähig.

Die weitere Entwicklung soll nicht direkt in dieser Version erfolgen. Stattdessen soll der aktuelle Stand als eigenständiges Portfolio-Projekt erhalten bleiben.

Für die Weiterentwicklung ist eine Kopie des Projekts als **DogBuddy Version 2** vorgesehen.

Dadurch bleibt nachvollziehbar, wie sich das Projekt von einer lokalen HTML-/CSS-/JavaScript-Anwendung zu einer vollständigen Webanwendung weiterentwickeln kann.

---

## Stufe 1 – DogBuddy Version 1 abschließen

Bereits umgesetzt:

```text
✓ Dashboard
✓ Hundeprofil
✓ Entwicklung und Wachstum
✓ Tagebuch
✓ Galerie
✓ Gesundheit und Kalender
✓ Wochenplan
✓ Kommandos
✓ Entdecker-Checkliste
✓ Verknüpfung von Kommandos mit dem Wochenplan
✓ Verknüpfung der Entdecker-Checkliste mit dem Wochenplan
✓ automatische Fortschrittsübernahme aus dem Wochenplan
✓ Anzeige der nächsten Termine auf dem Dashboard
✓ Anzeige der letzten Tagebucheinträge auf dem Dashboard
✓ Speicherung strukturierter Daten über localStorage
✓ Speicherung von Bildern über IndexedDB
✓ Backup-Funktion
✓ Nach-oben-Button
```

Anschließend soll Version 1 noch einmal getestet und auf kleinere Fehler überprüft werden.

Danach bleibt dieser Stand als **lokale Version und Portfolio-Projekt** erhalten.

---

## Stufe 2 – DogBuddy Version 2 anlegen

Für die weitere Entwicklung soll das bestehende Projekt kopiert werden.

```text
DogBuddy Version 1
        ↓
Portfolio-Version bleibt erhalten
        ↓
Projekt kopieren
        ↓
DogBuddy Version 2
        ↓
Weiterentwicklung zur Webanwendung
```

Dadurch kann Version 2 verändert werden, ohne den bisherigen Projektstand zu überschreiben.

---

## Stufe 3 – Responsive Design

DogBuddy Version 2 soll zunächst für unterschiedliche Bildschirmgrößen optimiert werden.

```text
Desktop
Tablet
Smartphone
```

Dazu gehören unter anderem:

- responsive Navigation
- mobile Navigation
- Touch-Bedienung
- responsive Karten
- responsive Tabellen
- responsive Formulare
- angepasste Popups
- geeignete Abstände und Schriftgrößen

Ziel ist, DogBuddy sowohl am PC als auch auf dem Smartphone komfortabel verwenden zu können.

---

## Stufe 4 – Öffentliche Frontpage

Die bisherige Startseite ist gleichzeitig das persönliche Dashboard.

Für Version 2 soll davor eine öffentliche Frontpage entstehen.

```text
öffentliche Frontpage
        ↓
Registrieren / Login
        ↓
Authentifizierung
        ↓
persönlicher DogBuddy-Bereich
        ↓
Dashboard
```

Die persönlichen Hunde- und Benutzerdaten sollen ohne Anmeldung nicht erreichbar sein.

---

## Stufe 5 – Webanwendung veröffentlichen

DogBuddy soll anschließend online bereitgestellt werden.

Dazu gehören:

```text
Hosting
HTTPS
öffentliche Webadresse
```

Damit wäre die Anwendung nicht mehr an den lokalen Projektordner gebunden und könnte über verschiedene Geräte aufgerufen werden.

---

## Stufe 6 – Zentrale Datenspeicherung

Die bisherige lokale Speicherung über `localStorage` und `IndexedDB` soll langfristig durch eine zentrale Datenspeicherung ergänzt bzw. ersetzt werden.

Mögliche Bestandteile:

```text
zentrale Datenbank
        +
Dateispeicher für Bilder
        +
Backend / API
```

Als mögliche technische Lösungen sollen unter anderem **systeme.io**, **Supabase** oder ein eigenes Backend geprüft und miteinander verglichen werden.

Dabei muss insbesondere untersucht werden, welche Lösung folgende Anforderungen unterstützt:

- strukturierte DogBuddy-Daten
- Benutzerkonten
- Authentifizierung
- Zugriffsrechte
- Speicherung von Fotos
- Zugriff von mehreren Geräten
- Datensicherung
- möglichst geringe laufende Kosten

---

## Stufe 7 – Benutzerkonten

Nach Einführung einer zentralen Datenspeicherung sollen Benutzerkonten umgesetzt werden.

Geplant sind beispielsweise:

```text
Registrierung
Login
Logout
Benutzerprofil
Passwortverwaltung
Zugriffsrechte
```

Jeder Benutzer soll ausschließlich auf die Daten zugreifen können, für die er eine Berechtigung besitzt.

---

## Stufe 8 – Hunde und Benutzer verknüpfen

Ein Benutzer soll einen oder mehrere Hunde verwalten können.

Gleichzeitig soll ein Hund mit mehreren Benutzern verbunden werden können.

Beispiel:

```text
Benutzer A ───┐
              ├── Hund Major
Benutzer B ───┘
```

Dadurch könnten beispielsweise mehrere Personen eines Haushalts gemeinsam denselben Hund verwalten.

---

## Stufe 9 – Synchronisierung mehrerer Geräte

Durch die zentrale Speicherung könnten dieselben Daten auf unterschiedlichen Geräten verwendet werden.

```text
PC ───────────┐
Tablet ───────┼── zentrale DogBuddy-Daten
Smartphone ───┘
```

Änderungen wären dadurch nicht mehr nur auf einem einzelnen Browser gespeichert.

---

## Stufe 10 – PWA / Smartphone-Nutzung

DogBuddy soll anschließend als **Progressive Web App (PWA)** erweitert werden.

Dazu könnten beispielsweise gehören:

```text
manifest.json
Service Worker
App-Icon
Installation auf dem Homescreen
Offline-Grundfunktionen
```

Dadurch könnte DogBuddy auf einem Smartphone ähnlich wie eine installierte App verwendet werden, ohne zunächst eine eigenständige App über einen App Store veröffentlichen zu müssen.

---

## Stufe 11 – Migration vorhandener Daten

Die bereits in Version 1 gespeicherten Daten sollen nach Möglichkeit nicht verloren gehen.

Deshalb könnte eine Import- bzw. Migrationsfunktion entwickelt werden.

```text
localStorage
      +
IndexedDB
      ↓
Daten auslesen
      ↓
Daten umwandeln
      ↓
zentrale Datenbank / Dateispeicher
```

Damit könnten bereits vorhandene DogBuddy-Daten später in Version 2 übernommen werden.

---

## Stufe 12 – Weitere Funktionen

Wenn die technische Grundlage stabil funktioniert, könnten weitere Funktionen ergänzt werden.

Denkbar wären beispielsweise:

- Benachrichtigungen
- Gesundheitsakte
- Ausflugsziele
- Karten
- Statistiken
- PDF-Berichte
- Datenexport
- erweiterte Backups
- Such-, Filter- und Sortierfunktionen
- weitere Auswertungen zur Entwicklung des Hundes

---

## Stufe 13 – mögliche eigenständige Smartphone-App

Erst wenn Webanwendung, Benutzerverwaltung und zentrale Datenspeicherung zuverlässig funktionieren, könnte geprüft werden, ob zusätzlich eine eigenständige Smartphone-App sinnvoll ist.

Die zentrale Datenbank könnte dabei weiterhin gemeinsam von Webanwendung und App verwendet werden.

Die PWA wäre jedoch zunächst der geplante Weg für die mobile Nutzung.

---

# 💡 56. Langfristige Vision

DogBuddy hat sich von einer zunächst einfachen HTML-/CSS-/JavaScript-Anwendung
zu einem umfangreicheren lokalen MVP entwickelt.

Die aktuelle Version soll dabei bewusst als **DogBuddy Version 1** erhalten
bleiben.

Sie dokumentiert den bisherigen Entwicklungsstand und dient gleichzeitig als
Portfolio-Projekt.

```text
DogBuddy Version 1
        ↓
lokaler MVP
        ↓
HTML + CSS + JavaScript
        ↓
localStorage + IndexedDB
        ↓
Portfolio-Projekt
```

Für die weitere Entwicklung soll das bestehende Projekt nicht ersetzt,
sondern kopiert werden.

Auf Grundlage dieser Kopie kann anschließend **DogBuddy Version 2**
weiterentwickelt werden.

```text
DogBuddy Version 1
        ↓
Projektstand erhalten
        ↓
Projekt kopieren
        ↓
DogBuddy Version 2
        ↓
Weiterentwicklung
```

## Von der lokalen Anwendung zur Webanwendung

DogBuddy Version 2 soll schrittweise von einer lokal gespeicherten Anwendung
zu einer online erreichbaren Webanwendung weiterentwickelt werden.

Das langfristige Grundprinzip könnte folgendermaßen aussehen:

```text
DogBuddy Version 2
        ↓
Responsive Frontend
        ↓
öffentliche Frontpage
        ↓
Registrierung / Login
        ↓
Authentifizierung
        ↓
persönlicher DogBuddy-Bereich
        ↓
zentrale Datenspeicherung
        ↓
Benutzer + Hunde + Medien
        ↓
geräteübergreifende Synchronisierung
        ↓
PWA
```

Dadurch könnte DogBuddy später auf verschiedenen Geräten verwendet werden,
ohne dass die Daten ausschließlich an einen bestimmten Browser gebunden sind.

## Benutzer und Hunde

Version 2 soll langfristig nicht mehr ausschließlich für Major funktionieren.

Andere Hundebesitzer sollen eigene Benutzerkonten erstellen und ihre eigenen
Hunde verwalten können.

```text
Benutzer
   │
   ├── Hund 1
   │
   ├── Hund 2
   │
   └── Hund 3
```

Zusätzlich soll es möglich sein, einen Hund mit mehreren Benutzern zu
verknüpfen.

```text
Benutzer A ─────┐
                │
                ├────► Hund Major
                │
Benutzer B ─────┘
```

Dadurch könnten beispielsweise mehrere Personen eines Haushalts gemeinsam
Termine, Training, Entwicklung, Tagebuch und andere Daten desselben Hundes
verwalten.

## Zentrale Datenspeicherung

Die bisherige lokale Speicherung über:

```text
localStorage
+
IndexedDB
```

ist für Version 1 ausreichend.

Für Version 2 soll geprüft werden, wie die Daten zentral gespeichert werden
können.

Langfristig könnte die Architektur beispielsweise folgendermaßen aussehen:

```text
DogBuddy Frontend
        ↓
Authentifizierung
        ↓
Backend / Dienst
        ↓
zentrale Datenspeicherung
        ↓
┌──────────────────────┐
↓                      ↓
strukturierte Daten   Bilder / Medien
```

Welche technische Lösung dafür verwendet wird, ist noch nicht endgültig
festgelegt.

Geprüft werden sollen unter anderem:

- `systeme.io`
- Supabase
- ein eigenes Backend
- eine Kombination verschiedener Dienste

Dabei müssen insbesondere Benutzerverwaltung, Datenbank, Dateispeicherung,
Zugriffsrechte, Datenschutz, technische Möglichkeiten und mögliche laufende
Kosten miteinander verglichen werden.

## Bereits vorhandene Grundlagen

Viele der bisher im Projekt verwendeten Konzepte werden auch für die weitere
Entwicklung benötigt.

Dazu gehören unter anderem:

- HTML für die Struktur
- CSS für das Design
- JavaScript für Benutzeroberfläche und Programmlogik
- DOM-Manipulation
- Events und Event Listener
- Arrays und Objekte
- JSON
- CRUD
- IDs und Beziehungen zwischen Daten
- Datenvalidierung
- lokale Datenspeicherung
- IndexedDB
- asynchrone Programmierung
- Aufteilung der Programmlogik auf mehrere JavaScript-Dateien
- Git und GitHub

Die bisherige Entwicklung bildet damit die Grundlage für Version 2.

## Neue Lernbereiche

Für die geplante Online-Version würden weitere Themen hinzukommen.

Dazu gehören beispielsweise:

- Responsive Webdesign
- HTTP und HTTPS
- APIs
- REST
- SQL
- PostgreSQL oder eine andere Datenbank
- Authentifizierung
- Autorisierung
- Benutzer- und Rechteverwaltung
- Cloud- bzw. Dateispeicherung
- Deployment
- Datenschutz
- sichere Datenübertragung
- Synchronisierung
- PWA-Technologien
- Service Worker
- Tests

Dadurch könnte DogBuddy langfristig verschiedene Bereiche der
Anwendungsentwicklung in einem einzigen Projekt miteinander verbinden.

## Langfristige Entwicklungsrichtung

Die Entwicklung von DogBuddy lässt sich damit ungefähr folgendermaßen
zusammenfassen:

```text
HTML-/CSS-Webseite
        ↓
JavaScript-Anwendung
        ↓
lokaler MVP
        ↓
DogBuddy Version 1
        ↓
Portfolio-Projekt
        ↓
Projekt kopieren
        ↓
DogBuddy Version 2
        ↓
responsive Webanwendung
        ↓
öffentliche Frontpage
        ↓
Registrierung und Login
        ↓
zentrale Datenspeicherung
        ↓
Benutzerkonten und mehrere Hunde
        ↓
gemeinsam verwaltete Hunde
        ↓
geräteübergreifende Synchronisierung
        ↓
PWA
        ↓
optional später eigenständige Smartphone-App
```

Eine eigenständige Smartphone-App ist dabei kein notwendiger Bestandteil der
nächsten Entwicklungsstufe.

Zunächst soll geprüft werden, wie weit sich DogBuddy als **Progressive Web App**
umsetzen lässt.

Dadurch könnte die Anwendung auf einem Smartphone ähnlich wie eine App genutzt
und auf dem Homescreen abgelegt werden, ohne dass Version 2 zunächst über einen
App Store veröffentlicht werden muss.

## Fazit

DogBuddy Version 1 ist damit nicht nur ein abgeschlossenes Übungsprojekt,
sondern gleichzeitig die technische und fachliche Grundlage für eine mögliche
Weiterentwicklung.

Die bestehende Version bleibt als nachvollziehbarer Entwicklungsstand und
Portfolio-Projekt erhalten.

DogBuddy Version 2 kann darauf aufbauen und schrittweise neue Themen wie
Responsive Design, Benutzerkonten, zentrale Datenspeicherung,
Synchronisierung und PWA-Technologien ergänzen.

Dadurch bleibt sichtbar, wie sich das Projekt von einer lokalen
HTML-/CSS-/JavaScript-Anwendung zu einer deutlich umfangreicheren
Webanwendung weiterentwickeln kann.