// ==================================================
// DOGBUDDY - ENTWICKLUNG
// ==================================================


// ==================================================
// ELEMENTE AUS DEM HTML HOLEN
// ==================================================

// Eingabefeld Datum
const measurementDateInput =
    document.getElementById("measurement-date");

// Eingabefeld Gewicht
const measurementWeightInput =
    document.getElementById("measurement-weight");

// Eingabefeld Schulterhöhe
const measurementHeightInput =
    document.getElementById("measurement-height");

// Speichern-Button
const saveMeasurementButton =
    document.getElementById("save-measurement");

// Tabelle für die bisherigen Messungen
const measurementList =
    document.getElementById("measurement-list");


// ==================================================
// GESPEICHERTE MESSUNGEN LADEN
// ==================================================

// Versuchen, vorhandene Messungen aus dem
// localStorage zu holen
const savedMeasurements =
    localStorage.getItem("measurements");

// Hier speichern wir alle Messungen
let measurements = [];

// Wenn bereits Messungen vorhanden sind
if (savedMeasurements !== null) {

    // Gespeicherten Text wieder in ein Array umwandeln
    measurements = JSON.parse(savedMeasurements);
}


// ==================================================
// HEUTIGES DATUM VOREINSTELLEN
// ==================================================

const today = new Date();

// Jahr holen
const year = today.getFullYear();

// Monat holen
const month = String(
    today.getMonth() + 1
).padStart(2, "0");

// Tag holen
const day = String(
    today.getDate()
).padStart(2, "0");

// Datum für das HTML-Datumsfeld erstellen
measurementDateInput.value =
    year + "-" + month + "-" + day;


// ==================================================
// VORHANDENE MESSUNGEN ANZEIGEN
// ==================================================

displayMeasurements();


// ==================================================
// NEUE MESSUNG SPEICHERN
// ==================================================

saveMeasurementButton.addEventListener(
    "click",
    function () {

        // Werte aus den Eingabefeldern holen
        const date = measurementDateInput.value;

        const weight = measurementWeightInput.value
            .trim()
            .replace(",", ".");
            
        const height = measurementHeightInput.value
            .trim()
            .replace(",", ".");


        // Prüfen, ob alle Felder ausgefüllt wurden
        if (
            date === "" ||
            weight === "" ||
            height === ""
        ) {

            alert(
                "Bitte fülle alle Felder aus."
            );

            return;
        }


        // Neue Messung erstellen
        const newMeasurement = {
            date: date,
            weight: weight,
            height: height
        };


        // Neue Messung zur Liste hinzufügen
        measurements.push(newMeasurement);


        // Messungen nach Datum sortieren
        measurements.sort(function (a, b) {

            return new Date(b.date) - new Date(a.date);

        });


        // Komplette Liste im localStorage speichern
        localStorage.setItem(
            "measurements",
            JSON.stringify(measurements)
        );


        // Tabelle neu anzeigen
        displayMeasurements();


        // Eingabefelder leeren
        measurementWeightInput.value = "";
        measurementHeightInput.value = "";

    }
);


// ==================================================
// MESSUNGEN IN DER TABELLE ANZEIGEN
// ==================================================

function displayMeasurements() {

    // Alte Tabellenzeilen entfernen
    measurementList.innerHTML = "";

    // Alle gespeicherten Messungen durchgehen
    measurements.forEach(function (measurement) {

        // Neue Tabellenzeile erstellen
        const row = document.createElement("tr");


        // ==================================================
        // DATUM
        // ==================================================

        const dateCell = document.createElement("td");

        dateCell.textContent =
            formatDate(measurement.date);


        // ==================================================
        // GEWICHT
        // ==================================================

        const weightCell = document.createElement("td");

        weightCell.textContent =
            measurement.weight.replace(".", ",") + " kg";


        // ==================================================
        // SCHULTERHÖHE
        // ==================================================

        const heightCell = document.createElement("td");

        heightCell.textContent =
            measurement.height.replace(".", ",") + " cm";


        // ==================================================
        // LÖSCHEN-BUTTON
        // ==================================================

        const deleteCell = document.createElement("td");

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Löschen";

        deleteButton.classList.add(
            "delete-measurement-button"
        );


        // Beim Klick auf Löschen
        deleteButton.addEventListener(
            "click",
            function () {

                // Sicherheitsabfrage
                const reallyDelete = confirm(
                    "Möchtest du diese Messung wirklich löschen?"
                );

                // Wenn OK gedrückt wurde
                if (reallyDelete === true) {

                    // Position der Messung finden
                    const index =
                        measurements.indexOf(measurement);

                    // Messung aus der Liste löschen
                    measurements.splice(index, 1);

                    // Neue Liste speichern
                    localStorage.setItem(
                        "measurements",
                        JSON.stringify(measurements)
                    );

                    // Tabelle neu anzeigen
                    displayMeasurements();
                }
            }
        );


        // Löschen-Button in die Zelle einfügen
        deleteCell.appendChild(deleteButton);


        // ==================================================
        // ALLE ZELLEN IN DIE TABELLENZEILE EINFÜGEN
        // ==================================================

        row.appendChild(dateCell);

        row.appendChild(weightCell);

        row.appendChild(heightCell);

        row.appendChild(deleteCell);


        // Tabellenzeile in die Tabelle einfügen
        measurementList.appendChild(row);

    });

}


// ==================================================
// DATUM FORMATIEREN
// ==================================================

function formatDate(date) {

    // Datum zerlegen
    const parts = date.split("-");

    // Jahr
    const year = parts[0];

    // Monat
    const month = parts[1];

    // Tag
    const day = parts[2];

    // Deutsches Datumsformat zurückgeben
    return day + "." + month + "." + year;

}