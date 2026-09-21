// ==================================================
// DOGBUDDY - ENTWICKLUNG
// ==================================================


// ==================================================
// ELEMENTE AUS DEM HTML HOLEN
// ==================================================

// Hundename in der Seitenüberschrift
const pageDogName =
    document.getElementById("page-dog-name");

// Eingabefeld Datum
const measurementDateInput =
    document.getElementById("measurement-date");


// Eingabefeld Gewicht
const measurementWeightInput =
    document.getElementById("measurement-weight");


// Eingabefeld Schulterhöhe
const measurementHeightInput =
    document.getElementById("measurement-height");

    // Eingabefeld Brustumfang
const measurementChestInput =
    document.getElementById("measurement-chest");


// Eingabefeld Halsumfang
const measurementNeckInput =
    document.getElementById("measurement-neck");


// Eingabefeld Rückenlänge
const measurementBackInput =
    document.getElementById("measurement-back");


// Speichern-Button
const saveMeasurementButton =
    document.getElementById("save-measurement");


// Tabelle für die bisherigen Messungen
const measurementList =
    document.getElementById("measurement-list");

// ==================================================
// HTML-ELEMENTE FÜR DEN SOLL-IST-VERGLEICH
// ==================================================

// Zeichenfläche für die Wachstumskurve
const growthChart =
    document.getElementById("growth-chart");

// Popup für die große Wachstumskurve
const growthChartModal =
    document.getElementById(
        "growth-chart-modal"
    );

// Große Wachstumskurve im Popup
const growthChartLarge =
    document.getElementById(
        "growth-chart-large"
    );

// Schließen-Button des Grafik-Popups
const closeGrowthChartButton =
    document.getElementById(
        "close-growth-chart"
    );

// Endgewicht in der Popup-Überschrift
const growthModalWeight =
    document.getElementById(
        "growth-modal-weight"
    );

// Auswahl für das erwartete Endgewicht
const growthFinalWeight =
    document.getElementById("growth-final-weight");

// Gewicht in der Überschrift der Wachstumskurve
const growthHeadingWeight =
    document.getElementById(
        "growth-heading-weight"
    );

// Gewicht im Beschreibungstext
const growthDescriptionWeight =
    document.getElementById(
        "growth-description-weight"
    );

// Aktuelles Alter
const growthCurrentAge =
    document.getElementById("growth-current-age");

// Aktuelles Gewicht
const growthCurrentWeight =
    document.getElementById("growth-current-weight");

// Erwartetes Soll-Gewicht
const growthTargetWeight =
    document.getElementById("growth-target-weight");

// Abweichung vom Soll-Gewicht
const growthDifference =
    document.getElementById("growth-difference");

// Bewertung des aktuellen Gewichts
const growthStatus =
    document.getElementById("growth-status");


// ==================================================
// HUNDENAME AUS DEM PROFIL LADEN
// ==================================================

const savedDog =
    localStorage.getItem("dogProfile");

if (savedDog !== null) {

    const dog =
        JSON.parse(savedDog);

    pageDogName.textContent =
        dog.name;
}


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

// Speichert, welche Messung gerade bearbeitet wird
// null bedeutet: Es wird eine neue Messung angelegt
let editingMeasurement = null;

// ==================================================
// GESPEICHERTE MESSUNGEN WIEDER LADEN
// ==================================================

if (savedMeasurements !== null) {

    measurements =
        JSON.parse(savedMeasurements);
}


// ==================================================
// REFERENZWERTE FÜR DIE WACHSTUMSKURVE
// ==================================================

/*
    Hier werden die Soll-Gewichte für die
    Wachstumskurve gespeichert.

    age = Alter in Monaten
    weight = Soll-Gewicht in kg
*/

// ==================================================
// REFERENZWERTE DER WACHSTUMSKURVE
// ==================================================

/*
    Als Grundlage verwenden wir die Wachstumskurve
    für ein Endgewicht von 20 kg.

    Die Werte wurden näherungsweise aus der
    Napfcheck-Wachstumskurve übernommen.

    Für Endgewichte von 21 bis 24 kg wird
    diese Grundkurve anschließend proportional
    angepasst.
*/

const growthReference20 = [

    { age: 2, weight: 4.3 },
    { age: 3, weight: 7.2 },
    { age: 4, weight: 9.8 },
    { age: 5, weight: 12.0 },
    { age: 6, weight: 14.0 },
    { age: 7, weight: 15.6 },
    { age: 8, weight: 17.0 },
    { age: 9, weight: 18.0 },
    { age: 10, weight: 18.7 },
    { age: 11, weight: 19.2 },
    { age: 12, weight: 19.5 },
    { age: 13, weight: 19.7 },
    { age: 14, weight: 19.8 },
    { age: 15, weight: 19.9 }

];

// ==================================================
// REFERENZWERTE AN DAS ENDGEWICHT ANPASSEN
// ==================================================

function getGrowthReference() {

    // Ausgewähltes Endgewicht auslesen
    const finalWeight =
        Number(growthFinalWeight.value);


    /*
        Unsere Grundkurve basiert auf 20 kg.

        Beispiel:

        20 kg = Faktor 1,00
        21 kg = Faktor 1,05
        22 kg = Faktor 1,10
        23 kg = Faktor 1,15
        24 kg = Faktor 1,20

        Dadurch wird die komplette Kurve
        passend zum gewählten Endgewicht skaliert.
    */

    const factor =
        finalWeight / 20;


    // Angepasste Wachstumskurve erzeugen
    return growthReference20.map(
        function (point) {

            return {

                age: point.age,

                weight:
                    point.weight * factor

            };

        }
    );
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
// SOLL-IST-VERGLEICH ANZEIGEN
// ==================================================

displayGrowthComparison();

// ==================================================
// WACHSTUMSKURVE ANZEIGEN
// ==================================================

drawGrowthChart();

// ==================================================
// ENDGEWICHT ÄNDERN
// ==================================================

/*
    Sobald ein anderes erwartetes Endgewicht
    ausgewählt wird, wird der Soll-Ist-Vergleich
    automatisch neu berechnet.
*/

growthFinalWeight.addEventListener(
    "change",
    function () {

        // Soll-Ist-Vergleich neu berechnen
        displayGrowthComparison();

        // Wachstumskurve neu zeichnen
        drawGrowthChart();

        // Endgewicht in den Texten aktualisieren
        growthHeadingWeight.textContent =
            growthFinalWeight.value;

        growthDescriptionWeight.textContent =
            growthFinalWeight.value;
    }
);

// ==================================================
// WACHSTUMSKURVE ALS POPUP ÖFFNEN
// ==================================================

growthChart.addEventListener(
    "click",
    function () {

        // Aktuelles Endgewicht übernehmen
        growthModalWeight.textContent =
            growthFinalWeight.value;

        // Popup anzeigen
        growthChartModal.classList.add(
            "show"
        );

        // Hintergrund nicht scrollen lassen
        document.body.style.overflow =
            "hidden";

        // Große Wachstumskurve zeichnen
        drawGrowthChart(
            growthChartLarge
        );
    }
);


// ==================================================
// WACHSTUMSKURVEN-POPUP SCHLIESSEN
// ==================================================

function closeGrowthChartModal() {

    growthChartModal.classList.remove(
        "show"
    );

    document.body.style.overflow = "";
}


// X OBEN RECHTS

closeGrowthChartButton.addEventListener(
    "click",
    closeGrowthChartModal
);


// KLICK AUF DEN HINTERGRUND

growthChartModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            growthChartModal
        ) {
            closeGrowthChartModal();
        }
    }
);

// ==================================================
// POPUP ÖFFNEN
// ==================================================

openMeasurementFormButton.addEventListener(
    "click",
    function () {

        // Keine vorhandene Messung bearbeiten
        editingMeasurement = null;
            
        // Button wieder auf normales Speichern stellen
        saveMeasurementButton.textContent =
            "Messung speichern";

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

    // Bearbeitungsmodus beenden
    editingMeasurement = null;

    // Speichern-Button wieder zurücksetzen
    saveMeasurementButton.textContent =
        "Messung speichern";
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

        const chest =
            measurementChestInput.value
                .trim()
                .replace(",", ".");


        const neck =
            measurementNeckInput.value
                .trim()
                .replace(",", ".");


        const back =
            measurementBackInput.value
                .trim()
                .replace(",", ".");


        // ==================================================
        // PRÜFEN, OB ALLE FELDER AUSGEFÜLLT SIND
        // ==================================================

        if (
            date === "" ||
            weight === "" ||
            height === "" ||
            chest === "" ||
            neck === "" ||
            back === ""
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

            height: height,

            chest: chest,

            neck: neck,

            back: back
        };


        // Neue Messung zur Liste hinzufügen
        // Prüfen, ob eine vorhandene Messung bearbeitet wird
        if (editingMeasurement !== null) {
        
            // Position der alten Messung suchen
            const index =
                measurements.indexOf(
                    editingMeasurement
                );
            
            // Alte Messung durch die geänderte ersetzen
            measurements[index] =
                newMeasurement;
            
            // Bearbeitungsmodus beenden
            editingMeasurement = null;
            
        } else {
        
            // Neue Messung zur Liste hinzufügen
            measurements.push(
                newMeasurement
            );
        }


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

    // Brustumfang leeren
    measurementChestInput.value = "";

    // Halsumfang leeren
    measurementNeckInput.value = "";

    // Rückenlänge leeren
    measurementBackInput.value = "";

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
            // BRUSTUMFANG
            // ==================================================

            const chestCell =
                document.createElement("td");

            chestCell.textContent =
                measurement.chest
                    ? String(measurement.chest).replace(".", ",") + " cm"
                    : "–";


            // ==================================================
            // HALSUMFANG
            // ==================================================

            const neckCell =
                document.createElement("td");

            neckCell.textContent =
                measurement.neck
                    ? String(measurement.neck).replace(".", ",") + " cm"
                    : "–";


            // ==================================================
            // RÜCKENLÄNGE
            // ==================================================

            const backCell =
                document.createElement("td");

            backCell.textContent =
                measurement.back
                    ? String(measurement.back).replace(".", ",") + " cm"
                    : "–";

            // ==================================================
// ÄNDERN-BUTTON
// ==================================================

const editButton =
    document.createElement("button");

editButton.textContent =
    "Ändern";

editButton.classList.add(
    "edit-measurement-button"
);


            // ==================================================
            // MESSUNG ÄNDERN
            // ==================================================

            editButton.addEventListener(
                "click",
                function () {
                
                    // Merken, welche Messung bearbeitet wird
                    editingMeasurement =
                        measurement;
                
                
                    // Gespeicherte Werte ins Formular eintragen
                    measurementDateInput.value =
                        measurement.date;
                
                    measurementWeightInput.value =
                        String(measurement.weight)
                            .replace(".", ",");
                
                    measurementHeightInput.value =
                        String(measurement.height)
                            .replace(".", ",");
                
                    measurementChestInput.value =
                        measurement.chest
                            ? String(measurement.chest).replace(".", ",")
                            : "";
                
                    measurementNeckInput.value =
                        measurement.neck
                            ? String(measurement.neck).replace(".", ",")
                            : "";
                
                    measurementBackInput.value =
                        measurement.back
                            ? String(measurement.back).replace(".", ",")
                            : "";
                
                
                    // Speichern-Button umbenennen
                    saveMeasurementButton.textContent =
                        "Änderung speichern";
                
                
                    // Popup öffnen
                    measurementFormModal.classList.add(
                        "show"
                    );
                
                    // Hintergrundseite nicht scrollen lassen
                    document.body.style.overflow =
                        "hidden";
                }
            );


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


            // Ändern-Button in die Aktionszelle
            deleteCell.appendChild(
                editButton
            );

            // Löschen-Button in die Aktionszelle
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
                chestCell
            );

            row.appendChild(
                neckCell
            );

            row.appendChild(
                backCell
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
// ALTER BEI EINER MESSUNG BERECHNEN
// ==================================================

/*
    Diese Funktion berechnet,
    wie alt der Hund am Tag der Messung war.

    Dafür werden das Geburtsdatum
    und das Datum der Messung miteinander verglichen.

    Das Ergebnis wird in Monaten zurückgegeben.
*/

function calculateAgeInMonths(
    birthDate,
    measurementDate
) {

    // Geburtsdatum in ein JavaScript-Datum umwandeln
    const birth =
        new Date(birthDate);


    // Messdatum in ein JavaScript-Datum umwandeln
    const measurement =
        new Date(measurementDate);


    // Unterschied zwischen beiden Daten
    // in Millisekunden berechnen
    const difference =
        measurement - birth;


    // Millisekunden in Tage umrechnen
    const days =
        difference /
        (1000 * 60 * 60 * 24);


    // Tage in Monate umrechnen
    // Ein Monat hat durchschnittlich 30,44 Tage
    const months =
        days / 30.44;


    // Berechnetes Alter zurückgeben
    return months;
}

// ==================================================
// SOLL-GEWICHT FÜR DAS ALTER BERECHNEN
// ==================================================

/*
    Diese Funktion sucht das passende Soll-Gewicht
    aus unserer Wachstumskurve.

    Liegt das Alter zwischen zwei Monaten,
    wird automatisch ein Zwischenwert berechnet.

    Beispiel:
    Der Hund ist 3,5 Monate alt.

    Dann wird ein Wert zwischen dem Soll-Gewicht
    für 3 Monate und dem Soll-Gewicht
    für 4 Monate berechnet.
*/

function calculateTargetWeight(age) {

    // Aktuelle Wachstumskurve laden
    const growthReference =
        getGrowthReference();

    // Prüfen, ob das Alter kleiner
    // als der erste Wert der Wachstumskurve ist
    if (age < growthReference[0].age) {

        return null;
    }


    // Alle Werte der Wachstumskurve durchgehen
    for (
        let i = 0;
        i < growthReference.length - 1;
        i++
    ) {

        // Aktueller Monatswert
        const current =
            growthReference[i];


        // Nächster Monatswert
        const next =
            growthReference[i + 1];


        // Prüfen, ob das Alter zwischen
        // diesen beiden Monatswerten liegt
        if (
            age >= current.age &&
            age <= next.age
        ) {

            // Berechnen, wie weit das Alter
            // zwischen beiden Monaten liegt
            const progress =
                (age - current.age) /
                (next.age - current.age);


            // Passendes Soll-Gewicht berechnen
            const targetWeight =
                current.weight +
                (
                    next.weight -
                    current.weight
                ) * progress;


            // Berechnetes Soll-Gewicht zurückgeben
            return targetWeight;
        }
    }


    // Ist der Hund älter als der letzte Wert
    // unserer Wachstumskurve,
    // wird das Endgewicht zurückgegeben
    return growthReference[
        growthReference.length - 1
    ].weight;
}

// ==================================================
// SOLL-IST-VERGLEICH ANZEIGEN
// ==================================================

/*
    Diese Funktion verwendet die neueste Messung
    und vergleicht das tatsächliche Gewicht
    mit dem erwarteten Gewicht der Wachstumskurve.

    Dafür brauchen wir:

    - das Geburtsdatum aus dem Hundeprofil
    - das Datum der neuesten Messung
    - das tatsächliche Gewicht
    - das berechnete Soll-Gewicht
*/

function displayGrowthComparison() {


    // ==================================================
    // PRÜFEN, OB MESSUNGEN VORHANDEN SIND
    // ==================================================

    if (measurements.length === 0) {

        growthCurrentAge.textContent =
            "–";

        growthCurrentWeight.textContent =
            "–";

        growthTargetWeight.textContent =
            "–";

        growthDifference.textContent =
            "–";

        growthStatus.textContent =
            "Noch keine Messung vorhanden.";

        return;
    }


    // ==================================================
    // HUNDEPROFIL LADEN
    // ==================================================

    const savedDog =
        localStorage.getItem("dogProfile");


    // Prüfen, ob ein Hundeprofil vorhanden ist
    if (savedDog === null) {

        growthStatus.textContent =
            "Kein Hundeprofil vorhanden.";

        return;
    }


    // Gespeichertes Profil wieder
    // in ein JavaScript-Objekt umwandeln
    const dog =
        JSON.parse(savedDog);


    // Prüfen, ob ein Geburtsdatum vorhanden ist
    if (!dog.birthday) {

        growthStatus.textContent =
            "Kein Geburtsdatum vorhanden.";

        return;
    }


    // ==================================================
    // NEUESTE MESSUNG ERMITTELN
    // ==================================================

    /*
        Die Messungen werden nach Datum sortiert.

        Die neueste Messung steht danach
        an erster Stelle.
    */

    const sortedMeasurements =
        [...measurements].sort(
            function (a, b) {

                return new Date(b.date) -
                    new Date(a.date);
            }
        );


    const latestMeasurement =
        sortedMeasurements[0];


    // Gewicht in eine Zahl umwandeln
    const currentWeight =
        Number(
            String(latestMeasurement.weight)
                .replace(",", ".")
        );


    // ==================================================
    // ALTER BEI DER MESSUNG BERECHNEN
    // ==================================================

    const age =
        calculateAgeInMonths(
            dog.birthday,
            latestMeasurement.date
        );


    // ==================================================
    // SOLL-GEWICHT BERECHNEN
    // ==================================================

    const targetWeight =
        calculateTargetWeight(age);


    // Wenn noch kein Soll-Wert berechnet werden kann
    if (targetWeight === null) {

        growthCurrentAge.textContent =
            age.toFixed(1)
                .replace(".", ",") +
            " Monate";

        growthCurrentWeight.textContent =
            currentWeight.toFixed(1)
                .replace(".", ",") +
            " kg";

        growthTargetWeight.textContent =
            "–";

        growthDifference.textContent =
            "–";

        growthStatus.textContent =
            "Für dieses Alter ist noch kein Soll-Wert hinterlegt.";

        return;
    }


    // ==================================================
    // ABWEICHUNG BERECHNEN
    // ==================================================

    const difference =
        currentWeight -
        targetWeight;


    const differencePercent =
        (
            difference /
            targetWeight
        ) * 100;


    // Untere Grenze des normalen Bereichs
    const lowerLimit =
        targetWeight * 0.95;


    // Obere Grenze des normalen Bereichs
    const upperLimit =
        targetWeight * 1.05;


    // ==================================================
    // WERTE AUF DER SEITE ANZEIGEN
    // ==================================================

    growthCurrentAge.textContent =
        age.toFixed(1)
            .replace(".", ",") +
        " Monate";


    growthCurrentWeight.textContent =
        currentWeight.toFixed(1)
            .replace(".", ",") +
        " kg";


    growthTargetWeight.textContent =
        targetWeight.toFixed(1)
            .replace(".", ",") +
        " kg";


    // Pluszeichen bei positiver Abweichung anzeigen
    const differenceSign =
        difference > 0
            ? "+"
            : "";


    growthDifference.innerHTML =
        differenceSign +
        difference.toFixed(1)
            .replace(".", ",") +
        " kg<br>" +
        "(" +
        differenceSign +
        differencePercent.toFixed(1)
            .replace(".", ",") +
        " %)";


    // ==================================================
    // GEWICHT BEWERTEN
    // ==================================================
        
    /*
        Ampelsystem:
        
        bis ±5 %       = grün
        über ±5–10 %   = orange
        über ±10 %     = rot
        
        Da die Abweichung prozentual vom jeweiligen
        Soll-Gewicht berechnet wird, funktioniert das
        automatisch für jedes ausgewählte Endgewicht.
    */
        
    // Betrag verwenden:
    // -6,2 % wird dadurch zu 6,2 %
    const absoluteDifferencePercent =
        Math.abs(differencePercent);
        
        
    // Alte Farbe entfernen
    growthStatus.classList.remove(
        "status-good",
        "status-warning",
        "status-alert"
    );
    
    
    // ==================================================
    // GRÜN - BIS 5 % ABWEICHUNG
    // ==================================================
    
    if (absoluteDifferencePercent <= 5) {
    
        growthStatus.classList.add(
            "status-good"
        );
    
        growthStatus.textContent =
            "Das Gewicht liegt innerhalb des erwarteten ±5-%-Bereichs.";
    
    
    // ==================================================
    // ORANGE - ÜBER 5 % BIS 10 %
    // ==================================================
    
    } else if (
        absoluteDifferencePercent <= 10
    ) {
    
        growthStatus.classList.add(
            "status-warning"
        );
    
        if (difference < 0) {
        
            growthStatus.textContent =
                "Das Gewicht liegt leicht unterhalb des erwarteten Bereichs.";
        
        } else {
        
            growthStatus.textContent =
                "Das Gewicht liegt leicht oberhalb des erwarteten Bereichs.";
        }
    
    
    // ==================================================
    // ROT - ÜBER 10 % ABWEICHUNG
    // ==================================================
    
    } else {
    
        growthStatus.classList.add(
            "status-alert"
        );
    
        if (difference < 0) {
        
            growthStatus.textContent =
                "Das Gewicht liegt deutlich unterhalb des erwarteten Bereichs.";
        
        } else {
        
            growthStatus.textContent =
                "Das Gewicht liegt deutlich oberhalb des erwarteten Bereichs.";
        }
    }
    }
    
    // ==================================================
    // WACHSTUMSKURVE ZEICHNEN
    // ==================================================
    
    /*
        Diese Funktion zeichnet die Wachstumskurve
        direkt in das Canvas.
    
        Angezeigt werden:
    
        - Soll-Kurve
        - obere +5-%-Grenze
        - untere -5-%-Grenze
        - Majors tatsächliche Messungen
    */
    
    function drawGrowthChart(
        canvas = growthChart
    ) {
    
        // Prüfen, ob das Canvas vorhanden ist
        if (!growthChart) {
            return;
        }


    // ==================================================
    // CANVAS VORBEREITEN
    // ==================================================

    const context =
        canvas.getContext("2d");

        context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    


    // Aktuelle Referenzkurve holen
    const growthReference =
        getGrowthReference();


    // ==================================================
    // GRÖSSE DES DIAGRAMMS
    // ==================================================

    const paddingLeft = 65;
    const paddingRight = 25;
    const paddingTop = 45;
    const paddingBottom = 65;

    const chartWidth =
        canvas.width -
        paddingLeft -
        paddingRight;

    const chartHeight =
        canvas.height -
        paddingTop -
        paddingBottom;


    // ==================================================
    // ACHSENWERTE
    // ==================================================

    const minAge = 2;
    const maxAge = 15;

    const minWeight = 0;

    const selectedFinalWeight =
        Number(growthFinalWeight.value);

    const maxWeight =
        Math.ceil(
            selectedFinalWeight * 1.15
        );


    // ==================================================
    // POSITION AUF DER X-ACHSE BERECHNEN
    // ==================================================

    function getX(age) {

        return paddingLeft +
            (
                (age - minAge) /
                (maxAge - minAge)
            ) * chartWidth;
    }


    // ==================================================
    // POSITION AUF DER Y-ACHSE BERECHNEN
    // ==================================================

    function getY(weight) {

        return paddingTop +
            chartHeight -
            (
                (weight - minWeight) /
                (maxWeight - minWeight)
            ) * chartHeight;
    }


    // ==================================================
    // HINTERGRUND
    // ==================================================

    context.fillStyle = "#ffffff";

    context.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // ==================================================
    // WAAGERECHTE GITTERLINIEN
    // ==================================================

    context.font = "12px Arial";

    context.textAlign = "right";
    context.textBaseline = "middle";


    for (
        let weight = 0;
        weight <= maxWeight;
        weight += 2
    ) {

        const y =
            getY(weight);

        context.beginPath();

        context.strokeStyle =
            "#eee7e1";

        context.lineWidth = 1;

        context.moveTo(
            paddingLeft,
            y
        );

        context.lineTo(
            canvas.width - paddingRight,
            y
        );

        context.stroke();


        // Gewicht links anzeigen
        context.fillStyle =
            "#6f675f";

        context.fillText(
            weight + " kg",
            paddingLeft - 10,
            y
        );
    }


    // ==================================================
    // SENKRECHTE GITTERLINIEN
    // ==================================================

    context.textAlign = "center";
    context.textBaseline = "top";


    for (
        let age = minAge;
        age <= maxAge;
        age++
    ) {

        const x =
            getX(age);

        context.beginPath();

        context.strokeStyle =
            "#f1ece8";

        context.lineWidth = 1;

        context.moveTo(
            x,
            paddingTop
        );

        context.lineTo(
            x,
            paddingTop + chartHeight
        );

        context.stroke();


        // Monatszahl anzeigen
        context.fillStyle =
            "#6f675f";

        context.fillText(
            age,
            x,
            paddingTop +
            chartHeight +
            10
        );
    }


    // ==================================================
    // BESCHRIFTUNG DER X-ACHSE
    // ==================================================

    context.fillStyle =
        "#514941";

    context.font =
        "13px Arial";

    context.textAlign =
        "center";

    context.fillText(
        "Alter in Monaten",
        paddingLeft +
            chartWidth / 2,
        canvas.height - 20
    );


    // ==================================================
    // HILFSFUNKTION FÜR DIE KURVEN
    // ==================================================

    function drawReferenceLine(
        factor,
        color,
        lineWidth,
        dashed
    ) {

        context.beginPath();

        context.strokeStyle =
            color;

        context.lineWidth =
            lineWidth;


        if (dashed) {

            context.setLineDash(
                [7, 5]
            );

        } else {

            context.setLineDash([]);
        }


        growthReference.forEach(
            function (point, index) {

                const x =
                    getX(point.age);

                const y =
                    getY(
                        point.weight * factor
                    );


                if (index === 0) {

                    context.moveTo(
                        x,
                        y
                    );

                } else {

                    context.lineTo(
                        x,
                        y
                    );
                }
            }
        );


        context.stroke();

        context.setLineDash([]);
    }


    // ==================================================
    // +5-%-GRENZE
    // ==================================================

    drawReferenceLine(
        1.05,
        "#b9aaa0",
        2,
        true
    );


    // ==================================================
    // -5-%-GRENZE
    // ==================================================

    drawReferenceLine(
        0.95,
        "#b9aaa0",
        2,
        true
    );


    // ==================================================
    // SOLL-KURVE
    // ==================================================

    drawReferenceLine(
        1,
        "#b87333",
        4,
        false
    );


    // ==================================================
    // TATSÄCHLICHE MESSUNGEN VORBEREITEN
    // ==================================================

    const savedProfile =
        localStorage.getItem(
            "dogProfile"
        );


    if (
        savedProfile !== null &&
        measurements.length > 0
    ) {

        const dog =
            JSON.parse(savedProfile);


        if (dog.birthday) {

            const actualMeasurements =
                measurements
                    .map(
                        function (measurement) {

                            return {

                                age:
                                    calculateAgeInMonths(
                                        dog.birthday,
                                        measurement.date
                                    ),

                                weight:
                                    Number(
                                        String(
                                            measurement.weight
                                        ).replace(
                                            ",",
                                            "."
                                        )
                                    )
                            };
                        }
                    )

                    .filter(
                        function (measurement) {

                            return (
                                measurement.age >= minAge &&
                                measurement.age <= maxAge
                            );
                        }
                    )

                    .sort(
                        function (a, b) {

                            return (
                                a.age -
                                b.age
                            );
                        }
                    );


            // ==================================================
            // LINIE DER ECHTEN MESSUNGEN
            // ==================================================

            if (
                actualMeasurements.length > 0
            ) {

                context.beginPath();

                context.strokeStyle =
                    "#302a26";

                context.lineWidth = 2;

                context.setLineDash([]);


                actualMeasurements.forEach(
                    function (
                        measurement,
                        index
                    ) {

                        const x =
                            getX(
                                measurement.age
                            );

                        const y =
                            getY(
                                measurement.weight
                            );


                        if (index === 0) {

                            context.moveTo(
                                x,
                                y
                            );

                        } else {

                            context.lineTo(
                                x,
                                y
                            );
                        }
                    }
                );


                context.stroke();


                // ==================================================
                // EINZELNE MESSPUNKTE
                // ==================================================

                actualMeasurements.forEach(
                    function (measurement) {

                        const x =
                            getX(
                                measurement.age
                            );

                        const y =
                            getY(
                                measurement.weight
                            );


                        context.beginPath();

                        context.arc(
                            x,
                            y,
                            6,
                            0,
                            Math.PI * 2
                        );

                        context.fillStyle =
                            "#302a26";

                        context.fill();

                        context.lineWidth = 2;

                        context.strokeStyle =
                            "#ffffff";

                        context.stroke();
                    }
                );
            }
        }
    }


    // ==================================================
    // LEGENDE
    // ==================================================

    context.font =
        "12px Arial";

    context.textAlign =
        "left";

    context.textBaseline =
        "middle";


    const legendY =
        paddingTop - 20;


    // Soll-Kurve
    context.fillStyle =
        "#b87333";

    context.fillRect(
        paddingLeft,
        legendY,
        22,
        4
    );

    context.fillStyle =
        "#514941";

    context.fillText(
        "Soll",
        paddingLeft + 30,
        legendY + 2
    );


    // ±5 %
    context.beginPath();

    context.strokeStyle =
        "#b9aaa0";

    context.lineWidth = 2;

    context.setLineDash(
        [7, 5]
    );

    context.moveTo(
        paddingLeft + 80,
        legendY + 2
    );

    context.lineTo(
        paddingLeft + 105,
        legendY + 2
    );

    context.stroke();

    context.setLineDash([]);


    context.fillStyle =
        "#514941";

    context.fillText(
        "±5 %",
        paddingLeft + 113,
        legendY + 2
    );


    // Echte Messungen
    context.beginPath();

    context.arc(
        paddingLeft + 175,
        legendY + 2,
        5,
        0,
        Math.PI * 2
    );

    context.fillStyle =
        "#302a26";

    context.fill();


    context.fillStyle =
        "#514941";

    context.fillText(
        "Majors Messungen",
        paddingLeft + 187,
        legendY + 2
    );
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