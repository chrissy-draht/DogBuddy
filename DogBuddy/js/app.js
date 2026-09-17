// ==================================================
// DOGBUDDY - JAVASCRIPT
// ==================================================


// ==================================================
// ELEMENTE AUS DEM HTML HOLEN
// ==================================================

// Button "Profil bearbeiten"
const editButton = document.getElementById("edit-profile-button");

// Bearbeitungsformular
const profileForm = document.getElementById("profile-form");

// Speichern-Button
const saveButton = document.getElementById("save-profile");

// Abbrechen-Button
const cancelButton = document.getElementById("cancel-profile");


// ==================================================
// EINGABEFELDER
// ==================================================

// Name
const dogNameInput = document.getElementById("dog-name");

// Rasse
const dogBreedInput = document.getElementById("dog-breed");

// Geschlecht
const dogGenderInput = document.getElementById("dog-gender");

// Geburtsdatum
const dogBirthdayInput = document.getElementById("dog-birthday");

// Einzugsdatum
const dogMoveInInput = document.getElementById("dog-move-in");


// ==================================================
// AUSGABEFELDER IM PROFIL
// ==================================================

// Name im Profil
const profileName = document.getElementById("profile-name");

// Rasse im Profil
const profileBreed = document.getElementById("profile-breed");

// Geschlecht im Profil
const profileGender = document.getElementById("profile-gender");

// Geburtstag im Profil
const profileBirthday = document.getElementById("profile-birthday");

// Einzugsdatum im Profil
const profileMoveIn = document.getElementById("profile-move-in");

// Alter auf dem Dashboard
const dogAge = document.getElementById("dog-age");


// ==================================================
// LOCALSTORAGE - GESPEICHERTE DATEN LADEN
// ==================================================

const savedDog = localStorage.getItem("dogProfile");

if (savedDog !== null) {

    // Gespeicherten Text wieder in ein Objekt umwandeln
    const dog = JSON.parse(savedDog);

    // Eingabefelder füllen
    dogNameInput.value = dog.name;
    dogBreedInput.value = dog.breed;
    dogGenderInput.value = dog.gender;
    dogBirthdayInput.value = dog.birthday;
    dogMoveInInput.value = dog.moveIn;

    // Daten im Profil anzeigen
    profileName.textContent = dog.name;
    profileBreed.textContent = dog.breed;

    if (dog.gender === "Rüde") {
        profileGender.textContent = "♂ Rüde";
    } else {
        profileGender.textContent = "♀ Hündin";
    }

    if (dog.birthday !== "") {
        profileBirthday.textContent = formatDate(dog.birthday);
        calculateAge(dog.birthday);
    }

    if (dog.moveIn !== "") {
        profileMoveIn.textContent = formatDate(dog.moveIn);
    }
}


// ==================================================
// PROFIL BEARBEITEN
// ==================================================

editButton.addEventListener("click", function () {

    // Formular anzeigen
    profileForm.style.display = "block";

});


// ==================================================
// ABBRECHEN
// ==================================================

cancelButton.addEventListener("click", function () {

    // Formular verstecken
    profileForm.style.display = "none";

});


// ==================================================
// SPEICHERN
// ==================================================

saveButton.addEventListener("click", function () {

    // Werte aus den Eingabefeldern holen
    const name = dogNameInput.value;
    const breed = dogBreedInput.value;
    const gender = dogGenderInput.value;
    const birthday = dogBirthdayInput.value;
    const moveIn = dogMoveInInput.value;


    // ==================================================
    // LOCALSTORAGE - DATEN SPEICHERN
    // ==================================================

    // Alle Hundedaten zusammenfassen
    const dog = {
        name: name,
        breed: breed,
        gender: gender,
        birthday: birthday,
        moveIn: moveIn
    };

    // Objekt in Text umwandeln und speichern
    localStorage.setItem(
        "dogProfile",
        JSON.stringify(dog)
    );


    // ==================================================
    // PROFIL AKTUALISIEREN
    // ==================================================

    // Name im Profil ändern
    profileName.textContent = name;

    // Rasse im Profil ändern
    profileBreed.textContent = breed;

    // Geschlecht im Profil ändern
    if (gender === "Rüde") {
        profileGender.textContent = "♂ Rüde";
    } else {
        profileGender.textContent = "♀ Hündin";
    }

    // Geburtsdatum anzeigen
    if (birthday !== "") {
        profileBirthday.textContent = formatDate(birthday);

        // Alter berechnen
        calculateAge(birthday);
    }

    // Einzugsdatum anzeigen
    if (moveIn !== "") {
        profileMoveIn.textContent = formatDate(moveIn);
    }

    // Formular nach dem Speichern schließen
    profileForm.style.display = "none";

});


// ==================================================
// DATUM FORMATIEREN
// ==================================================

function formatDate(date) {

    // Datum in einzelne Teile zerlegen
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


// ==================================================
// ALTER IN WOCHEN BERECHNEN
// ==================================================

function calculateAge(birthday) {

    // Geburtsdatum erstellen
    const birthDate = new Date(birthday);

    // Heutiges Datum
    const today = new Date();

    // Unterschied zwischen heute und Geburtstag
    const difference = today - birthDate;

    // Millisekunden einer Woche
    const millisecondsPerWeek =
        1000 * 60 * 60 * 24 * 7;

    // Alter in Wochen berechnen
    const weeks = Math.floor(
        difference / millisecondsPerWeek
    );

    // Ergebnis auf dem Dashboard anzeigen
    dogAge.textContent = weeks + " Wochen";
}

// ==================================================
// AKTUELLE MESSUNG AUF DEM DASHBOARD ANZEIGEN
// ==================================================

// Gewicht auf dem Dashboard
const dashboardWeight =
    document.getElementById("dashboard-weight");

// Größe auf dem Dashboard
const dashboardHeight =
    document.getElementById("dashboard-height");

// Gespeicherte Messungen aus localStorage holen
const dashboardMeasurements =
    localStorage.getItem("measurements");

// Prüfen, ob Messungen gespeichert sind
if (dashboardMeasurements !== null) {

    // Gespeicherte Messungen wieder in ein Array umwandeln
    const measurements =
        JSON.parse(dashboardMeasurements);

    // Prüfen, ob mindestens eine Messung vorhanden ist
    if (measurements.length > 0) {

        // Messungen nach Datum sortieren
        measurements.sort(function (a, b) {

            return new Date(b.date) - new Date(a.date);

        });

        // Neueste Messung holen
        const latestMeasurement = measurements[0];

        // Gewicht auf dem Dashboard anzeigen
        dashboardWeight.textContent =
            latestMeasurement.weight.replace(".", ",") + " kg";

        // Größe auf dem Dashboard anzeigen
        dashboardHeight.textContent =
            latestMeasurement.height.replace(".", ",") + " cm";
    }
}

// ==================================================
// TRAINING AUF DEM DASHBOARD ANZEIGEN
// ==================================================

// Bereich für Training auf dem Dashboard holen
const dashboardTrainingList =
    document.getElementById("dashboard-training-list");

// Gespeicherte Trainingsdaten aus localStorage holen
const dashboardTrainings =
    localStorage.getItem("trainings");


// Prüfen, ob Trainingsdaten gespeichert sind
if (dashboardTrainings !== null) {

    // Gespeicherten Text wieder in ein Array umwandeln
    const trainings =
        JSON.parse(dashboardTrainings);


    // Prüfen, ob Trainings vorhanden sind
    if (trainings.length > 0) {

        // Platzhalter entfernen
        dashboardTrainingList.innerHTML = "";


        // ==================================================
        // TRAININGS NACH DATUM SORTIEREN
        // ==================================================

        trainings.sort(function (a, b) {

            return new Date(b.date) -
                new Date(a.date);

        });


        // ==================================================
        // NUR AKTUELLSTEN STAND JEDER ÜBUNG MERKEN
        // ==================================================

        const latestTrainings = [];


        trainings.forEach(function (training) {

            // Prüfen, ob diese Übung bereits
            // in latestTrainings vorhanden ist
            const alreadyExists =
                latestTrainings.some(
                    function (savedTraining) {

                        return savedTraining.name
                            .toLowerCase() ===
                            training.name
                                .toLowerCase();

                    }
                );


            // Nur hinzufügen, wenn die Übung
            // noch nicht vorhanden ist
            if (alreadyExists === false) {

                latestTrainings.push(
                    training
                );

            }

        });


        // ==================================================
        // MAXIMAL 3 ÜBUNGEN AUF DEM DASHBOARD
        // ==================================================

        const dashboardTrainingsToShow =
            latestTrainings.slice(0, 3);


        // ==================================================
        // TRAININGS ANZEIGEN
        // ==================================================

        dashboardTrainingsToShow.forEach(
            function (training) {

                // Zeile erstellen
                const trainingRow =
                    document.createElement("div");

                trainingRow.classList.add(
                    "skill"
                );


                // Name
                const trainingName =
                    document.createElement("span");

                trainingName.textContent =
                    training.name;


                // Sterne
                const trainingStars =
                    document.createElement("span");

                trainingStars.classList.add(
                    "stars"
                );

                trainingStars.textContent =
                    createDashboardStars(
                        training.rating
                    );


                // Name und Sterne in die Zeile
                trainingRow.appendChild(
                    trainingName
                );

                trainingRow.appendChild(
                    trainingStars
                );


                // Zeile auf Dashboard anzeigen
                dashboardTrainingList.appendChild(
                    trainingRow
                );

            }
        );

    }

}


// ==================================================
// STERNE FÜR DAS DASHBOARD ERSTELLEN
// ==================================================

function createDashboardStars(rating) {

    let starText = "";


    // Immer 5 Sterne erstellen
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
// LETZTEN TAGEBUCHEINTRAG AUF DEM DASHBOARD ANZEIGEN
// ==================================================


// ==================================================
// ELEMENTE AUS DEM DASHBOARD HOLEN
// ==================================================

const dashboardDiaryTitle =
    document.getElementById("dashboard-diary-title");

const dashboardDiaryDate =
    document.getElementById("dashboard-diary-date");

const dashboardDiaryText =
    document.getElementById("dashboard-diary-text");


// ==================================================
// TAGEBUCHEINTRÄGE AUS LOCALSTORAGE HOLEN
// ==================================================

const dashboardDiaryEntries =
    localStorage.getItem("diaryEntries");


// ==================================================
// PRÜFEN, OB TAGEBUCHEINTRÄGE VORHANDEN SIND
// ==================================================

if (
    dashboardDiaryEntries !== null &&
    dashboardDiaryTitle !== null
) {

    const diaryEntries =
        JSON.parse(
            dashboardDiaryEntries
        );


    if (diaryEntries.length > 0) {


        // ==================================================
        // NEUESTEN EINTRAG FINDEN
        // ==================================================

        diaryEntries.sort(
            function (a, b) {

                const dateDifference =
                    new Date(b.date) -
                    new Date(a.date);


                // Unterschiedliches Datum
                if (dateDifference !== 0) {

                    return dateDifference;

                }


                // Gleiches Datum:
                // zuletzt erstellter Eintrag zuerst
                return b.id - a.id;

            }
        );


        const latestDiaryEntry =
            diaryEntries[0];


        // ==================================================
        // TITEL ANZEIGEN
        // ==================================================

        dashboardDiaryTitle.textContent =
            latestDiaryEntry.title;


        // ==================================================
        // DATUM ANZEIGEN
        // ==================================================

        if (
            dashboardDiaryDate !== null
        ) {

            dashboardDiaryDate.textContent =
                formatDashboardDiaryDate(
                    latestDiaryEntry.date
                );

        }


        // ==================================================
        // KURZEN TEXT ANZEIGEN
        // ==================================================

        if (
            dashboardDiaryText !== null
        ) {

            let diaryText = "";


            // Besonderer Moment bevorzugen
            if (
                latestDiaryEntry.highlight !== undefined &&
                latestDiaryEntry.highlight !== ""
            ) {

                diaryText =
                    latestDiaryEntry.highlight;

            }


            // Sonst "Heute gelernt"
            else if (
                latestDiaryEntry.learned !== undefined &&
                latestDiaryEntry.learned !== ""
            ) {

                diaryText =
                    latestDiaryEntry.learned;

            }


            // Sonst "Das lief gut"
            else if (
                latestDiaryEntry.good !== undefined &&
                latestDiaryEntry.good !== ""
            ) {

                diaryText =
                    latestDiaryEntry.good;

            }


            // Sonst Notizen
            else if (
                latestDiaryEntry.note !== undefined &&
                latestDiaryEntry.note !== ""
            ) {

                diaryText =
                    latestDiaryEntry.note;

            }


            // Text auf Dashboard anzeigen
            dashboardDiaryText.textContent =
                diaryText;

        }

    }

}


// ==================================================
// DATUM FÜR TAGEBUCH AUF DASHBOARD FORMATIEREN
// ==================================================

function formatDashboardDiaryDate(date) {

    const parts =
        date.split("-");


    const year =
        parts[0];

    const month =
        parts[1];

    const day =
        parts[2];


    return day +
        "." +
        month +
        "." +
        year;

}