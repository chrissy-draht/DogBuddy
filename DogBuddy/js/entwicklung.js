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
// POPUP ELEMENTE
// ==================================================

// Button "Neue Messung"
const openMeasurementFormButton =
    document.getElementById("open-measurement-form");


// Das Popup
const measurementFormModal =
    document.getElementById("measurement-form-modal");


// X oben rechts
const closeMeasurementFormButton =
    document.getElementById("close-measurement-form");


// Abbrechen-Button
const cancelMeasurementFormButton =
    document.getElementById("cancel-measurement-form");


// ==================================================
// GESPEICHERTE MESSUNGEN LADEN
// ==================================================

const savedMeasurements =
    localStorage.getItem("measurements");


// Hier speichern wir alle Messungen
let measurements = [];


// Wenn bereits Messungen vorhanden sind
if (savedMeasurements !== null) {

    measurements =
        JSON.parse(savedMeasurements);
}


// ==================================================
// HEUTIGES DATUM VOREINSTELLEN
// ==================================================

setToday();


// ==================================================
// VORHANDENE MESSUNGEN ANZEIGEN
// ==================================================

displayMeasurements();


// ==================================================
// POPUP ÖFFNEN
// ==================================================

openMeasurementFormButton.addEventListener(
    "click",
    function () {

        // Formular leeren
        resetMeasurementForm();

        // Popup anzeigen
        measurementFormModal.classList.add("show");

        // Hintergrundseite nicht scrollen lassen
        document.body.style.overflow = "hidden";

        // Gewichtsfeld auswählen
        measurementWeightInput.focus();
    }
);


// ==================================================
// POPUP SCHLIESSEN
// ==================================================

function closeMeasurementForm() {

    // Popup ausblenden
    measurementFormModal.classList.remove("show");

    // Scrollen der Seite wieder erlauben
    document.body.style.overflow = "";

    // Formular zurücksetzen
    resetMeasurementForm();
}


// ==================================================
// X OBEN RECHTS
// ==================================================

closeMeasurementFormButton.addEventListener(
    "click",
    closeMeasurementForm
);


// ==================================================
// ABBRECHEN
// ==================================================

cancelMeasurementFormButton.addEventListener(
    "click",
    closeMeasurementForm
);


// ==================================================
// KLICK AUF DUNKLEN HINTERGRUND
// ==================================================

measurementFormModal.addEventListener(
    "click",
    function (event) {

        if (event.target === measurementFormModal) {

            closeMeasurementForm();
        }
    }
);


// ==================================================
// ESC-TASTE SCHLIESST DAS POPUP
// ==================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            measurementFormModal.classList.contains("show")
        ) {

            closeMeasurementForm();
        }
    }
);


// ==================================================
// NEUE MESSUNG SPEICHERN
// ==================================================

saveMeasurementButton.addEventListener(
    "click",
    function () {

        // Werte aus den Eingabefeldern holen
        const date =
            measurementDateInput.value;


        const weight =
            measurementWeightInput.value
                .trim()
                .replace(",", ".");


        const height =
            measurementHeightInput.value
                .trim()
                .replace(",", ".");


        // ==================================================
        // PRÜFEN, OB ALLE FELDER AUSGEFÜLLT SIND
        // ==================================================

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


        // ==================================================
        // NEUE MESSUNG ERSTELLEN
        // ==================================================

        const newMeasurement = {

            date: date,

            weight: weight,

            height: height
        };


        // Neue Messung zur Liste hinzufügen
        measurements.push(
            newMeasurement
        );


        // ==================================================
        // MESSUNGEN NACH DATUM SORTIEREN
        // ==================================================

        measurements.sort(
            function (a, b) {

                return new Date(b.date) -
                    new Date(a.date);
            }
        );


        // ==================================================
        // IM LOCALSTORAGE SPEICHERN
        // ==================================================

        localStorage.setItem(
            "measurements",
            JSON.stringify(measurements)
        );


        // ==================================================
        // TABELLE AKTUALISIEREN
        // ==================================================

        displayMeasurements();


        // ==================================================
        // POPUP SCHLIESSEN
        // ==================================================

        closeMeasurementForm();
    }
);


// ==================================================
// FORMULAR ZURÜCKSETZEN
// ==================================================

function resetMeasurementForm() {

    // Gewicht leeren
    measurementWeightInput.value = "";

    // Schulterhöhe leeren
    measurementHeightInput.value = "";

    // Datum wieder auf heute setzen
    setToday();
}


// ==================================================
// MESSUNGEN IN DER TABELLE ANZEIGEN
// ==================================================

function displayMeasurements() {

    // Alte Tabellenzeilen entfernen
    measurementList.innerHTML = "";


    // ==================================================
    // ALLE GESPEICHERTEN MESSUNGEN DURCHGEHEN
    // ==================================================

    measurements.forEach(
        function (measurement) {


            // Neue Tabellenzeile erstellen
            const row =
                document.createElement("tr");


            // ==================================================
            // DATUM
            // ==================================================

            const dateCell =
                document.createElement("td");


            dateCell.textContent =
                formatDate(
                    measurement.date
                );


            // ==================================================
            // GEWICHT
            // ==================================================

            const weightCell =
                document.createElement("td");


            weightCell.textContent =
                String(measurement.weight)
                    .replace(".", ",") +
                " kg";


            // ==================================================
            // SCHULTERHÖHE
            // ==================================================

            const heightCell =
                document.createElement("td");


            heightCell.textContent =
                String(measurement.height)
                    .replace(".", ",") +
                " cm";


            // ==================================================
            // LÖSCHEN-BUTTON
            // ==================================================

            const deleteCell =
                document.createElement("td");


            const deleteButton =
                document.createElement("button");


            deleteButton.textContent =
                "Löschen";


            deleteButton.classList.add(
                "delete-measurement-button"
            );


            // ==================================================
            // MESSUNG LÖSCHEN
            // ==================================================

            deleteButton.addEventListener(
                "click",
                function () {

                    const reallyDelete =
                        confirm(
                            "Möchtest du diese Messung wirklich löschen?"
                        );


                    if (reallyDelete === true) {

                        // Position der Messung finden
                        const index =
                            measurements.indexOf(
                                measurement
                            );


                        // Messung aus der Liste löschen
                        measurements.splice(
                            index,
                            1
                        );


                        // Neue Liste speichern
                        localStorage.setItem(
                            "measurements",
                            JSON.stringify(
                                measurements
                            )
                        );


                        // Tabelle neu anzeigen
                        displayMeasurements();
                    }
                }
            );


            // Löschen-Button in die Zelle
            deleteCell.appendChild(
                deleteButton
            );


            // ==================================================
            // ZELLEN IN DIE TABELLENZEILE EINFÜGEN
            // ==================================================

            row.appendChild(
                dateCell
            );

            row.appendChild(
                weightCell
            );

            row.appendChild(
                heightCell
            );

            row.appendChild(
                deleteCell
            );


            // Tabellenzeile anzeigen
            measurementList.appendChild(
                row
            );
        }
    );
}


// ==================================================
// DATUM FORMATIEREN
// ==================================================

function formatDate(date) {

    // Datum zerlegen
    const parts =
        date.split("-");


    // Jahr
    const year =
        parts[0];


    // Monat
    const month =
        parts[1];


    // Tag
    const day =
        parts[2];


    // Deutsches Datumsformat zurückgeben
    return day + "." + month + "." + year;
}


// ==================================================
// HEUTIGES DATUM SETZEN
// ==================================================

function setToday() {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    measurementDateInput.value =
        year + "-" + month + "-" + day;
}