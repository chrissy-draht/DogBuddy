// ==================================================
// DOGBUDDY - TRAINING
// ==================================================


// ==================================================
// ELEMENTE AUS DEM HTML HOLEN
// ==================================================

// Hundename in der Seitenüberschrift
const pageDogName =
    document.getElementById("page-dog-name");

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

// Button zum Öffnen
const openTrainingFormButton =
    document.getElementById("open-training-form");


// Das Popup
const trainingFormModal =
    document.getElementById("training-form-modal");


// X oben rechts
const closeTrainingFormButton =
    document.getElementById("close-training-form");


// Abbrechen-Button
const cancelTrainingFormButton =
    document.getElementById("cancel-training-form");


// ==================================================
// AKTUELLE STERNEBEWERTUNG
// ==================================================

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

    trainings =
        JSON.parse(savedTrainings);
}


// ==================================================
// VORHANDENE ÜBUNGEN ANZEIGEN
// ==================================================

displayTrainings();


// ==================================================
// POPUP ÖFFNEN
// ==================================================

openTrainingFormButton.addEventListener(
    "click",
    function () {

        resetTrainingForm();

        trainingFormModal.classList.add("show");

        document.body.style.overflow = "hidden";

        trainingNameInput.focus();
    }
);


// ==================================================
// POPUP SCHLIESSEN
// ==================================================

function closeTrainingForm() {

    trainingFormModal.classList.remove("show");

    document.body.style.overflow = "";

    resetTrainingForm();
}


// X oben rechts
closeTrainingFormButton.addEventListener(
    "click",
    closeTrainingForm
);


// Abbrechen
cancelTrainingFormButton.addEventListener(
    "click",
    closeTrainingForm
);


// ==================================================
// KLICK AUF DUNKLEN HINTERGRUND
// ==================================================

trainingFormModal.addEventListener(
    "click",
    function (event) {

        if (event.target === trainingFormModal) {

            closeTrainingForm();
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
            trainingFormModal.classList.contains("show")
        ) {

            closeTrainingForm();
        }
    }
);


// ==================================================
// STERNE ANKLICKBAR MACHEN
// ==================================================

stars.forEach(function (star) {

    star.addEventListener(
        "click",
        function () {

            selectedRating =
                Number(star.dataset.value);

            updateStars();
        }
    );
});


// ==================================================
// STERNE AKTUALISIEREN
// ==================================================

function updateStars() {

    stars.forEach(function (star) {

        const starValue =
            Number(star.dataset.value);


        if (starValue <= selectedRating) {

            star.textContent = "★";

        } else {

            star.textContent = "☆";
        }
    });


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


        // ==================================================
        // EINGABEN PRÜFEN
        // ==================================================

        if (name === "") {

            alert(
                "Bitte gib eine Übung ein."
            );

            trainingNameInput.focus();

            return;
        }


        if (date === "") {

            alert(
                "Bitte wähle ein Datum aus."
            );

            trainingDateInput.focus();

            return;
        }


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


        // Popup schließen
        closeTrainingForm();
    }
);


// ==================================================
// FORMULAR ZURÜCKSETZEN
// ==================================================

function resetTrainingForm() {

    trainingNameInput.value = "";

    trainingNoteInput.value = "";

    selectedRating = 0;

    updateStars();

    setToday();
}


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


        trainingHeader.appendChild(
            trainingName
        );

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


        deleteButton.addEventListener(
            "click",
            function () {

                const reallyDelete =
                    confirm(
                        "Möchtest du diesen Trainingseintrag wirklich löschen?"
                    );


                if (reallyDelete === true) {

                    const index =
                        trainings.indexOf(training);


                    trainings.splice(
                        index,
                        1
                    );


                    localStorage.setItem(
                        "trainings",
                        JSON.stringify(trainings)
                    );


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


    for (let i = 1; i <= 5; i++) {

        if (i <= rating) {

            starText += "★";

        } else {

            starText += "☆";
        }
    }


    return starText;
}


// ==================================================
// DATUM FORMATIEREN
// ==================================================

function formatTrainingDate(date) {

    const parts =
        date.split("-");

    const year =
        parts[0];

    const month =
        parts[1];

    const day =
        parts[2];


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