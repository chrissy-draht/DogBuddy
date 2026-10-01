# 🐾 DogBuddy – Gemeinsam wachsen

DogBuddy ist eine von mir entwickelte Webanwendung zur Organisation des Alltags, Trainings und der Entwicklung meines Hundes.

Das Projekt entstand im Rahmen meiner Umschulung zur **Fachinformatikerin für Anwendungsentwicklung**. Mein Ziel war es, HTML, CSS und JavaScript nicht nur anhand einzelner Übungen zu lernen, sondern daraus eine zusammenhängende und tatsächlich nutzbare Anwendung zu entwickeln.

Aus einer zunächst statischen Webseite ist Schritt für Schritt eine Anwendung mit mehreren miteinander verbundenen Bereichen, dynamischen Inhalten und dauerhafter Datenspeicherung entstanden.

---

## 📌 Projektstatus

### DogBuddy V1 – Lokaler MVP

Die erste Version von DogBuddy ist als lokale Browser-Anwendung umgesetzt.

Die Daten werden derzeit hauptsächlich über

- `localStorage`
- `IndexedDB`

direkt im Browser gespeichert.

Dadurch funktioniert die Anwendung vollständig ohne eigenes Backend.

### DogBuddy V2 – Webversion in Entwicklung

Aktuell entwickle ich DogBuddy zu einer online erreichbaren Webanwendung weiter.

Geplant bzw. bereits vorbereitet sind:

- öffentliche Startseite
- Benutzeranmeldung
- geschlossener Benutzerzugang
- zentrale Datenbank
- Speicherung von Bildern und Medien
- Zugriff von mehreren Geräten
- mehrere Benutzer und Hunde
- geschützte Benutzerdaten
- Deployment als Webanwendung

Für die Webversion ist **Supabase** mit Authentifizierung, PostgreSQL und Storage vorgesehen. Das Frontend bleibt weiterhin in HTML, CSS und JavaScript umgesetzt.

---

# ✨ Funktionen

## 🏠 Dashboard

Das Dashboard dient als zentrale Übersicht der Anwendung.

Es zeigt unter anderem:

- Hundedaten
- Alter
- aktuelle Entwicklungswerte
- kommende Termine
- offene Aufgaben aus dem Wochenplan
- direkten Zugriff auf wichtige Funktionen

Änderungen aus anderen Bereichen werden automatisch auf dem Dashboard übernommen.

---

## 📖 Tagebuch

Im Tagebuch können Erlebnisse und besondere Ereignisse festgehalten werden.

Einträge können unter anderem enthalten:

- Datum
- Titel
- Text
- Kategorie
- Bilder und Medien

Die Mediendaten werden über IndexedDB gespeichert.

---

## 🐕 Kommandos

Im Bereich Kommandos kann der Trainingsfortschritt dokumentiert werden.

Kommandos besitzen verschiedene Fortschrittsstufen und können zusätzlich in den Wochenplan übernommen werden.

Eigene Notizen ermöglichen es, den aktuellen Trainingsstand festzuhalten.

---

## 🗺️ Entdecker

Die Entdecker-Checkliste hilft dabei zu dokumentieren, welche Situationen und Umgebungen der Hund bereits kennengelernt hat.

Dazu gehören beispielsweise unterschiedliche Orte, Verkehrsmittel, Untergründe und Alltagssituationen.

Der Fortschritt wird automatisch berechnet.

---

## 🏆 Achievement-System

Für Kommandos und Entdecker gibt es ein eigenes Achievement-System.

Meilensteine werden bei

- 25 %
- 50 %
- 75 %
- 100 %

erkannt.

Beim Erreichen eines Meilensteins wird direkt ein entsprechender Erfolg angezeigt.

---

## 📅 Wochenplan

Im Wochenplan können eigene Aufgaben sowie Aufgaben aus anderen Bereichen geplant werden.

Unterstützt werden:

- eigene Aufgaben
- Kommandos
- Entdecker-Aufgaben
- Kategorien
- Notizen
- offene und erledigte Aufgaben

Beim Abschließen einer verknüpften Aufgabe kann der Fortschritt im ursprünglichen Bereich automatisch aktualisiert werden.

---

## ❤️ Gesundheit

Der Gesundheitsbereich dient zur Verwaltung wichtiger Termine und Informationen rund um den Hund.

Dazu gehören unter anderem Termine und Kalenderfunktionen.

Kommende Termine können zusätzlich auf dem Dashboard angezeigt werden.

---

## 📈 Entwicklung

Hier können Entwicklungsdaten des Hundes dokumentiert werden, beispielsweise:

- Gewicht
- Schulterhöhe
- weitere Entwicklungswerte

Dadurch lässt sich die körperliche Entwicklung über einen längeren Zeitraum nachvollziehen.

---

## 📸 Galerie

Die Galerie verwaltet Bilder und Videos des Hundes.

Sie bietet unter anderem:

- Kategorien
- Beschreibungen
- Datumsangaben
- Großansicht
- Navigation zwischen mehreren Medien

---

# 🎨 Benutzeroberfläche

DogBuddy besitzt mehrere zentrale Funktionen für eine einheitliche Bedienung:

- dynamisch erzeugter Header
- zentraler Footer
- Dark Mode
- Speicherung des gewählten Farbschemas
- schwebendes Navigationsmenü
- Scroll-to-Top-Funktion
- einheitliches Popup-System
- Hamburger-Menü für kleinere Bildschirmgrößen

Wiederkehrende Bestandteile werden möglichst zentral verwaltet, damit Änderungen nicht auf jeder HTML-Seite einzeln durchgeführt werden müssen.

---

# 💾 Datenspeicherung

DogBuddy V1 arbeitet vollständig im Browser.

### localStorage

Strukturierte Daten wie Aufgaben, Einstellungen und Fortschritte werden überwiegend im `localStorage` gespeichert.

### IndexedDB

Größere Daten wie Bilder und Medien werden über `IndexedDB` verwaltet.

Dadurch konnte ich eine funktionsfähige Anwendung entwickeln, ohne bereits während der ersten Version ein Backend aufbauen zu müssen.

---

# 🛠️ Verwendete Technologien

### Frontend

- HTML5
- CSS3
- JavaScript

### Datenspeicherung V1

- localStorage
- IndexedDB
- JSON

### Geplant für V2

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Row Level Security (RLS)
- GitHub
- Vercel

---

# 📂 Projektstruktur

```text
DogBuddy/
│
├── index.html
├── dashboard.html
├── README.md
│
├── css/
│   └── styles.css
│
├── html/
│   ├── tagebuch.html
│   ├── kommandos.html
│   ├── entdecker.html
│   ├── entwicklung.html
│   ├── wochenplan.html
│   ├── gesundheit.html
│   └── galerie.html
│
├── js/
│   ├── app.js
│   ├── database.js
│   ├── header.js
│   ├── footer.js
│   ├── dark-mode.js
│   ├── floating-menu.js
│   ├── scroll-top.js
│   ├── backup.js
│   ├── login.js
│   ├── tagebuch.js
│   ├── kommandos.js
│   ├── kommandos-achievements.js
│   ├── entdecker.js
│   ├── entdecker-achievements.js
│   ├── entwicklung.js
│   ├── wochenplan.js
│   ├── gesundheit.js
│   └── galerie.js
│
└── images/
```

---

# 🧠 Was ich mit diesem Projekt gelernt habe

DogBuddy ist während meiner Ausbildung kontinuierlich gewachsen.

Dabei habe ich insbesondere gelernt:

- HTML-Seiten sinnvoll zu strukturieren
- größere CSS-Dateien zu organisieren
- JavaScript zur Manipulation des DOM einzusetzen
- Events und Formulare zu verarbeiten
- Daten als Objekte und Arrays zu verwalten
- JSON zu verwenden
- Daten dauerhaft im Browser zu speichern
- CRUD-Funktionen umzusetzen
- Daten zwischen verschiedenen Bereichen einer Anwendung zu verknüpfen
- wiederkehrende Komponenten zu zentralisieren
- größere Funktionen in einzelne JavaScript-Dateien aufzuteilen
- Fehler systematisch zu suchen und zu beheben
- eine bestehende Anwendung schrittweise weiterzuentwickeln

Besonders interessant war für mich die zunehmende Verknüpfung der einzelnen Bereiche. Eine Änderung im Wochenplan kann beispielsweise Auswirkungen auf Kommandos oder Entdecker haben und gleichzeitig auf dem Dashboard sichtbar werden.

Dadurch ist aus einzelnen HTML-Seiten zunehmend eine zusammenhängende Anwendung entstanden.

---

# 🚀 DogBuddy V2

Der nächste große Entwicklungsschritt ist die Umstellung von der lokalen Anwendung auf eine Webanwendung.

Die geplante Architektur:

```text
Browser
   │
   │ HTML / CSS / JavaScript
   ▼
Supabase
   │
   ├── Authentifizierung
   ├── PostgreSQL-Datenbank
   └── Storage
```

Die bisher über `localStorage` und `IndexedDB` gespeicherten Daten sollen schrittweise migriert werden.

Dabei sollen Benutzer ausschließlich auf ihre eigenen Daten zugreifen können. Dafür sind Authentifizierung und entsprechende Datenbankregeln vorgesehen.

Bilder sollen vor dem Upload im Browser komprimiert werden, um Speicherplatz und Datenübertragung zu reduzieren.

---

## 🔜 Nächste Schritte

Aktuell stehen für DogBuddy V2 unter anderem folgende Schritte an:

- Supabase mit dem Projekt verbinden
- Benutzeranmeldung umsetzen
- öffentlichen Zugriff auf die Anwendung schützen
- Passwort-Reset umsetzen
- Datenbanktabellen erstellen
- Row Level Security einrichten
- bestehende lokale Daten schrittweise migrieren
- Medien-Upload anbinden
- mehrere Benutzer und Hunde unterstützen
- Responsive Design weiter optimieren
- mobile Darstellung fertigstellen
- Deployment über GitHub und Vercel
- Anwendung vollständig testen

---

## 👩‍💻 Entwicklerin

DogBuddy wird von mir im Rahmen meiner Umschulung zur

**Fachinformatikerin für Anwendungsentwicklung**

entwickelt.

Das Projekt dient sowohl als praktische Lernanwendung als auch als Teil meines persönlichen Entwickler-Portfolios.

---

**DogBuddy – Gemeinsam wachsen 🐾**