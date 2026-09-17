// ==================================================
// DOGBUDDY - TRAINING
// ==================================================


// ==================================================
// ELEMENTE AUS DEM HTML HOLEN
// ==================================================

// Eingabefeld für den Namen der Übung
const trainingNameInput =
    document.getElementById("training-name");

// Eingabefeld für das Datum
const trainingDateInput =
    document.getElementById("training-date");

// Eingabefeld für die Notiz
const trainingNoteInput =
    document.getElementById("training-note");

// Alle Sterne holen
const stars =
    document.querySelectorAll(".star");

// Text unter den Sternen
const ratingText =
    document.getElementById("rating-text");

// Speichern-Button
const saveTrainingButton =
    document.getElementById("save-training");

// Bereich für gespeicherte Übungen
const trainingList =
    document.getElementById("training-list");


// ==================================================
// AKTUELLE STERNEBEWERTUNG
// ==================================================

// Am Anfang wurde noch kein Stern ausgewählt
let selectedRating = 0;


// ==================================================
// HEUTIGES DATUM EINTRAGEN
// ==================================================

setToday();


// ==================================================
// GESPEICHERTE ÜBUNGEN LADEN
// ==================================================

const savedTrainings =
    localStorage.getItem("trainings");

// Hier werden alle Übungen gespeichert
let trainings = [];

// Wenn bereits Übungen gespeichert wurden
if (savedTrainings !== null) {

    // Gespeicherten Text wieder in ein Array umwandeln
    trainings = JSON.parse(savedTrainings);
}


// ==================================================
// VORHANDENE ÜBUNGEN ANZEIGEN
// ==================================================

displayTrainings();


// ==================================================
// STERNE ANKLICKBAR MACHEN
// ==================================================

stars.forEach(function (star) {

    star.addEventListener("click", function () {

        // Wert des angeklickten Sterns holen
        selectedRating =
            Number(star.dataset.value);

        // Sterne aktualisieren
        updateStars();

    });

});


// ==================================================
// STERNE AKTUALISIEREN
// ==================================================

function updateStars() {

    stars.forEach(function (star) {

        const starValue =
            Number(star.dataset.value);

        // Prüfen, ob der Stern ausgefüllt sein soll
        if (starValue <= selectedRating) {

            star.textContent = "★";

        } else {

            star.textContent = "☆";
        }

    });


    // Text unter den Sternen ändern
    if (selectedRating === 0) {

        ratingText.textContent =
            "Noch keine Bewertung";

    } else {

        ratingText.textContent =
            selectedRating + " von 5 Sternen";
    }
}


// ==================================================
// NEUE ÜBUNG SPEICHERN
// ==================================================

saveTrainingButton.addEventListener(
    "click",
    function () {

        // Werte aus den Eingabefeldern holen
        const name =
            trainingNameInput.value.trim();

        const date =
            trainingDateInput.value;

        const note =
            trainingNoteInput.value.trim();


        // Prüfen, ob eine Übung eingetragen wurde
        if (name === "") {

            alert(
                "Bitte gib eine Übung ein."
            );

            return;
        }


        // Prüfen, ob ein Datum eingetragen wurde
        if (date === "") {

            alert(
                "Bitte wähle ein Datum aus."
            );

            return;
        }


        // Prüfen, ob Sterne ausgewählt wurden
        if (selectedRating === 0) {

            alert(
                "Bitte wähle eine Bewertung aus."
            );

            return;
        }


        // ==================================================
        // NEUEN TRAININGSEINTRAG ERSTELLEN
        // ==================================================

        const newTraining = {

            name: name,

            date: date,

            rating: selectedRating,

            note: note

        };


        // Neue Übung zur Liste hinzufügen
        trainings.push(newTraining);


        // ==================================================
        // NACH DATUM SORTIEREN
        // ==================================================

        // Neueste Einträge stehen oben
        trainings.sort(function (a, b) {

            return new Date(b.date) -
                new Date(a.date);

        });


        // ==================================================
        // IM LOCALSTORAGE SPEICHERN
        // ==================================================

        localStorage.setItem(
            "trainings",
            JSON.stringify(trainings)
        );


        // Liste neu anzeigen
        displayTrainings();


        // ==================================================
        // FORMULAR ZURÜCKSETZEN
        // ==================================================

        trainingNameInput.value = "";

        trainingNoteInput.value = "";

        selectedRating = 0;

        updateStars();

        // Datum wieder auf heute setzen
        setToday();

    }
);


// ==================================================
// GESPEICHERTE ÜBUNGEN ANZEIGEN
// ==================================================

function displayTrainings() {

    // Alten Inhalt entfernen
    trainingList.innerHTML = "";


    // Wenn noch keine Trainings vorhanden sind
    if (trainings.length === 0) {

        const emptyText =
            document.createElement("p");

        emptyText.textContent =
            "Noch kein Training eingetragen.";

        trainingList.appendChild(
            emptyText
        );

        return;
    }


    // ==================================================
    // NACH DATUM SORTIEREN
    // ==================================================

    trainings.sort(function (a, b) {

        return new Date(b.date) -
            new Date(a.date);

    });


    // ==================================================
    // ALLE TRAININGSEINTRÄGE DURCHGEHEN
    // ==================================================

    trainings.forEach(function (training) {


        // Karte für eine Übung erstellen
        const trainingItem =
            document.createElement("div");

        trainingItem.classList.add(
            "training-item"
        );


        // ==================================================
        // KOPFBEREICH
        // ==================================================

        const trainingHeader =
            document.createElement("div");

        trainingHeader.classList.add(
            "training-item-header"
        );


        // Name der Übung
        const trainingName =
            document.createElement("h3");

        trainingName.textContent =
            training.name;


        // Sterne der gespeicherten Übung
        const trainingStars =
            document.createElement("span");

        trainingStars.classList.add(
            "training-item-stars"
        );

        trainingStars.textContent =
            createStarText(training.rating);


        // Name einfügen
        trainingHeader.appendChild(
            trainingName
        );

        // Sterne einfügen
        trainingHeader.appendChild(
            trainingStars
        );


        // ==================================================
        // DATUM
        // ==================================================

        const trainingDate =
            document.createElement("p");

        trainingDate.classList.add(
            "training-item-date"
        );


        // Alte Trainings ohne Datum berücksichtigen
        if (
            training.date !== undefined &&
            training.date !== ""
        ) {

            trainingDate.textContent =
                formatTrainingDate(
                    training.date
                );

        } else {

            trainingDate.textContent =
                "Kein Datum gespeichert";
        }


        // ==================================================
        // NOTIZ
        // ==================================================

        const trainingNote =
            document.createElement("p");

        trainingNote.classList.add(
            "training-item-note"
        );


        // Wenn eine Notiz vorhanden ist
        if (
            training.note !== undefined &&
            training.note !== ""
        ) {

            trainingNote.textContent =
                training.note;

        } else {

            trainingNote.textContent =
                "Keine Notiz vorhanden.";
        }


        // ==================================================
        // LÖSCHEN-BUTTON
        // ==================================================

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "Löschen";

        deleteButton.classList.add(
            "delete-training-button"
        );


        // Beim Klick auf Löschen
        deleteButton.addEventListener(
            "click",
            function () {

                const reallyDelete =
                    confirm(
                        "Möchtest du diesen Trainingseintrag wirklich löschen?"
                    );


                // Nur löschen, wenn OK gedrückt wurde
                if (reallyDelete === true) {

                    // Position des Eintrags finden
                    const index =
                        trainings.indexOf(training);


                    // Eintrag aus der Liste entfernen
                    trainings.splice(
                        index,
                        1
                    );


                    // Neue Liste speichern
                    localStorage.setItem(
                        "trainings",
                        JSON.stringify(trainings)
                    );


                    // Anzeige aktualisieren
                    displayTrainings();

                }

            }
        );


        // ==================================================
        // ALLES IN DIE KARTE EINFÜGEN
        // ==================================================

        trainingItem.appendChild(
            trainingHeader
        );

        trainingItem.appendChild(
            trainingDate
        );

        trainingItem.appendChild(
            trainingNote
        );

        trainingItem.appendChild(
            deleteButton
        );


        // Karte auf der Seite anzeigen
        trainingList.appendChild(
            trainingItem
        );

    });

}


// ==================================================
// STERNETEXT ERSTELLEN
// ==================================================

function createStarText(rating) {

    let starText = "";


    // Fünf Sterne durchgehen
    for (let i = 1; i <= 5; i++) {

        // Ausgefüllter Stern
        if (i <= rating) {

            starText += "★";

        } else {

            // Leerer Stern
            starText += "☆";
        }

    }


    return starText;
}


// ==================================================
// DATUM FORMATIEREN
// ==================================================

function formatTrainingDate(date) {

    // Datum aufteilen
    const parts =
        date.split("-");

    const year =
        parts[0];

    const month =
        parts[1];

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
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    trainingDateInput.value =
        year + "-" + month + "-" + day;
}