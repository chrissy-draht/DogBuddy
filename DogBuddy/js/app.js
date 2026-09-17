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
// ALTER IN WOCHEN UND TAGEN BERECHNEN
// ==================================================

function calculateAge(birthday) {

    // Geburtsdatum erstellen
    const birthDate = new Date(birthday);

    // Heutiges Datum
    const today = new Date();

    // Uhrzeit entfernen, damit wirklich nur ganze Tage
    // miteinander verglichen werden
    birthDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Unterschied zwischen heute und Geburtstag
    const difference = today - birthDate;

    // Millisekunden eines Tages
    const millisecondsPerDay =
        1000 * 60 * 60 * 24;

    // Gesamtes Alter in Tagen berechnen
    const totalDays = Math.floor(
        difference / millisecondsPerDay
    );

    // Volle Wochen berechnen
    const weeks = Math.floor(
        totalDays / 7
    );

    // Übrige Tage nach den vollen Wochen berechnen
    const days = totalDays % 7;


    // ==================================================
    // TEXT FÜR WOCHEN
    // ==================================================

    let weekText = "";

    if (weeks === 1) {
        weekText = "1 Woche";
    } else {
        weekText = weeks + " Wochen";
    }


    // ==================================================
    // TEXT FÜR TAGE
    // ==================================================

    let dayText = "";

    if (days === 1) {
        dayText = "1 Tag";
    } else {
        dayText = days + " Tage";
    }


    // ==================================================
    // ALTER AUF DEM DASHBOARD ANZEIGEN
    // ==================================================

    // Wenn keine zusätzlichen Tage vorhanden sind
    if (days === 0) {

        dogAge.textContent = weekText;

    } else {

        dogAge.textContent =
            weekText + " & " + dayText;

    }
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

// ==================================================
// NÄCHSTER TERMIN AUF DEM DASHBOARD
// ==================================================

// HTML-Elemente auf dem Dashboard holen
const dashboardAppointmentTitle =
    document.getElementById("dashboard-appointment-title");

const dashboardAppointmentDate =
    document.getElementById("dashboard-appointment-date");

const dashboardAppointmentLocation =
    document.getElementById("dashboard-appointment-location");


// Gespeicherte Termine aus localStorage holen
const dashboardAppointments =
    localStorage.getItem("appointments");


// Nur ausführen, wenn wir uns auf dem Dashboard befinden
if (
    dashboardAppointmentTitle !== null &&
    dashboardAppointments !== null
) {

    // JSON wieder in ein JavaScript-Array umwandeln
    const appointments =
        JSON.parse(dashboardAppointments);


    // ==================================================
    // NUR AUSSTEHENDE TERMINE
    // ==================================================

    const openAppointments =
        appointments.filter(
            function (appointment) {

                return appointment.completed === false;

            }
        );


    // ==================================================
    // TERMINE SORTIEREN
    // ==================================================

    openAppointments.sort(
        function (a, b) {

            return getDashboardAppointmentDateTime(a) -
                getDashboardAppointmentDateTime(b);

        }
    );


    // ==================================================
    // NÄCHSTEN TERMIN ANZEIGEN
    // ==================================================

    if (openAppointments.length > 0) {

        const nextAppointment =
            openAppointments[0];


        // Kategorie + Titel anzeigen
        dashboardAppointmentTitle.textContent =
            getDashboardAppointmentIcon(
                nextAppointment.category
            ) +
            " " +
            nextAppointment.title;


        // Datum vorbereiten
        let appointmentDateText =
            formatDashboardAppointmentDate(
                nextAppointment.date
            );


        // Uhrzeit ergänzen, falls vorhanden
        if (nextAppointment.time !== "") {

            appointmentDateText +=
                " · " +
                nextAppointment.time +
                " Uhr";

        }


        dashboardAppointmentDate.textContent =
            appointmentDateText;


        // Ort anzeigen, falls vorhanden
        if (
            dashboardAppointmentLocation !== null &&
            nextAppointment.location !== ""
        ) {

            dashboardAppointmentLocation.textContent =
                "📍 " +
                nextAppointment.location;

        }

    }

}


// ==================================================
// DATUM UND UHRZEIT FÜR SORTIERUNG
// ==================================================

function getDashboardAppointmentDateTime(
    appointment
) {

    let time =
        appointment.time;


    // Falls keine Uhrzeit angegeben wurde
    if (time === "") {

        time = "00:00";

    }


    return new Date(
        appointment.date +
        "T" +
        time
    );

}


// ==================================================
// DATUM FÜR DASHBOARD FORMATIEREN
// ==================================================

function formatDashboardAppointmentDate(
    date
) {

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


// ==================================================
// ICON FÜR TERMIN-KATEGORIE
// ==================================================

function getDashboardAppointmentIcon(
    category
) {

    if (category === "Tierarzt") {

        return "🩺";

    }

    if (category === "Hundeschule") {

        return "🐕";

    }

    if (category === "Impfung") {

        return "💉";

    }

    if (category === "Untersuchung") {

        return "🔎";

    }

    if (category === "Pflege") {

        return "✂️";

    }


    return "📌";

}

// ==================================================
// WOCHENPLAN AUF DEM DASHBOARD
// ==================================================


// Bereich auf dem Dashboard holen
const dashboardWeeklyList =
    document.getElementById("dashboard-weekly-list");


// Gespeicherte Wochenaufgaben aus localStorage holen
const dashboardWeeklyTasks =
    localStorage.getItem("weeklyTasks");


// Nur ausführen, wenn wir uns auf dem Dashboard befinden
if (dashboardWeeklyList !== null) {


    // ==================================================
    // PRÜFEN, OB AUFGABEN GESPEICHERT SIND
    // ==================================================

    if (dashboardWeeklyTasks !== null) {


        // JSON-Text wieder in ein Array umwandeln
        const weeklyTasks =
            JSON.parse(dashboardWeeklyTasks);


        // ==================================================
        // NUR OFFENE AUFGABEN
        // ==================================================

        const openWeeklyTasks =
            weeklyTasks.filter(
                function (task) {

                    return task.completed === false;

                }
            );


        // ==================================================
        // ALTE ANZEIGE LÖSCHEN
        // ==================================================

        dashboardWeeklyList.innerHTML = "";


        // ==================================================
        // KEINE OFFENEN AUFGABEN
        // ==================================================

        if (openWeeklyTasks.length === 0) {

            const emptyText =
                document.createElement("p");

            emptyText.classList.add(
                "empty-info"
            );

            emptyText.textContent =
                "Alle Aufgaben für diese Woche sind erledigt. 🎉";

            dashboardWeeklyList.appendChild(
                emptyText
            );

        }


        // ==================================================
        // OFFENE AUFGABEN ANZEIGEN
        // ==================================================

        else {


            // Liste erstellen
            const taskList =
                document.createElement("ul");

            taskList.classList.add(
                "task-list"
            );


            // Maximal 4 Aufgaben auf dem Dashboard anzeigen
            const tasksToShow =
                openWeeklyTasks.slice(0, 4);


            tasksToShow.forEach(
                function (task) {


                    // Listeneintrag erstellen
                    const listItem =
                        document.createElement("li");


                    // Checkbox erstellen
                    const checkbox =
                        document.createElement("input");

                    checkbox.type =
                        "checkbox";


                    // ==================================================
                    // AUFGABE DIREKT AUF DASHBOARD ABHAKEN
                    // ==================================================

                    checkbox.addEventListener(
                        "change",
                        function () {


                            // Aufgabe als erledigt markieren
                            task.completed = true;


                            // Änderungen im localStorage speichern
                            localStorage.setItem(
                                "weeklyTasks",
                                JSON.stringify(weeklyTasks)
                            );


                            // Aufgabe optisch entfernen
                            listItem.remove();


                            // Prüfen, ob jetzt noch offene
                            // Aufgaben sichtbar sind
                            const remainingTasks =
                                taskList.querySelectorAll("li");


                            if (remainingTasks.length === 0) {

                                dashboardWeeklyList.innerHTML =
                                    "";


                                const finishedText =
                                    document.createElement("p");

                                finishedText.classList.add(
                                    "empty-info"
                                );

                                finishedText.textContent =
                                    "Alle Aufgaben für diese Woche sind erledigt. 🎉";


                                dashboardWeeklyList.appendChild(
                                    finishedText
                                );

                            }

                        }
                    );


                    // ==================================================
                    // TEXT DER AUFGABE
                    // ==================================================

                    const taskText =
                        document.createElement("span");


                    taskText.textContent =
                        getDashboardWeeklyIcon(
                            task.category
                        ) +
                        " " +
                        task.title;


                    // Checkbox und Text einfügen
                    listItem.appendChild(
                        checkbox
                    );

                    listItem.appendChild(
                        taskText
                    );


                    // Aufgabe in Liste einfügen
                    taskList.appendChild(
                        listItem
                    );

                }
            );


            // Liste auf Dashboard anzeigen
            dashboardWeeklyList.appendChild(
                taskList
            );


            // ==================================================
            // HINWEIS BEI MEHR ALS 4 AUFGABEN
            // ==================================================

            if (openWeeklyTasks.length > 4) {

                const moreTasks =
                    document.createElement("p");

                moreTasks.classList.add(
                    "dashboard-more-tasks"
                );


                const remainingNumber =
                    openWeeklyTasks.length - 4;


                moreTasks.textContent =
                    "+ " +
                    remainingNumber +
                    " weitere Aufgaben";


                dashboardWeeklyList.appendChild(
                    moreTasks
                );

            }

        }

    }

}


// ==================================================
// ICON FÜR WOCHENPLAN-KATEGORIE
// ==================================================

function getDashboardWeeklyIcon(category) {

    if (category === "Training") {

        return "⭐";

    }

    if (category === "Sozialisierung") {

        return "🐕";

    }

    if (category === "Ausflug") {

        return "🌲";

    }

    if (category === "Pflege") {

        return "✂️";

    }


    return "📌";

}

// ==================================================
// MINI-DIAGRAMME FÜR GEWICHT UND SCHULTERHÖHE
// ==================================================


// Die beiden Bereiche aus der index.html holen
const dashboardWeightChart =
    document.getElementById("dashboard-weight-chart");

const dashboardHeightChart =
    document.getElementById("dashboard-height-chart");


// Nur ausführen, wenn wir uns auf dem Dashboard befinden
if (
    dashboardWeightChart !== null ||
    dashboardHeightChart !== null
) {

    // Gespeicherte Messungen holen
    const savedChartMeasurements =
        localStorage.getItem("measurements");


    if (savedChartMeasurements !== null) {

        const chartMeasurements =
            JSON.parse(savedChartMeasurements);


        // Messungen nach Datum sortieren:
        // älteste Messung zuerst
        chartMeasurements.sort(
            function (a, b) {

                return new Date(a.date) -
                    new Date(b.date);

            }
        );


        // ==================================================
        // GEWICHT
        // ==================================================

        if (dashboardWeightChart !== null) {

            const weightValues =
                chartMeasurements
                    .filter(
                        function (measurement) {

                            return (
                                measurement.weight !== undefined &&
                                measurement.weight !== null &&
                                measurement.weight !== ""
                            );

                        }
                    )
                    .map(
                        function (measurement) {

                            return Number(
                                measurement.weight
                            );

                        }
                    );


            createMiniChart(
                dashboardWeightChart,
                weightValues
            );

        }


        // ==================================================
        // SCHULTERHÖHE
        // ==================================================

        if (dashboardHeightChart !== null) {

            const heightValues =
                chartMeasurements
                    .filter(
                        function (measurement) {

                            return (
                                measurement.height !== undefined &&
                                measurement.height !== null &&
                                measurement.height !== ""
                            );

                        }
                    )
                    .map(
                        function (measurement) {

                            return Number(
                                measurement.height
                            );

                        }
                    );


            createMiniChart(
                dashboardHeightChart,
                heightValues
            );

        }

    }

}


// ==================================================
// MINI-DIAGRAMM ERSTELLEN
// ==================================================

function createMiniChart(
    container,
    values
) {

    // Alten Inhalt entfernen
    container.innerHTML = "";


    // ==================================================
    // KEINE MESSWERTE
    // ==================================================

    if (values.length === 0) {

        const text =
            document.createElement("span");

        text.classList.add(
            "mini-chart-label"
        );

        text.textContent =
            "Noch keine Werte";

        container.appendChild(
            text
        );

        return;

    }


    // ==================================================
    // NUR EIN MESSWERT
    // ==================================================

    if (values.length === 1) {

        const svg =
            createSvgElement(
                "svg"
            );


        svg.setAttribute(
            "viewBox",
            "0 0 120 65"
        );


        // Grundlinie
        const baseline =
            createSvgElement(
                "line"
            );

        baseline.setAttribute(
            "x1",
            "10"
        );

        baseline.setAttribute(
            "y1",
            "50"
        );

        baseline.setAttribute(
            "x2",
            "110"
        );

        baseline.setAttribute(
            "y2",
            "50"
        );

        baseline.classList.add(
            "mini-chart-baseline"
        );


        // Ein einzelner Punkt
        const point =
            createSvgElement(
                "circle"
            );

        point.setAttribute(
            "cx",
            "60"
        );

        point.setAttribute(
            "cy",
            "32"
        );

        point.setAttribute(
            "r",
            "5"
        );

        point.classList.add(
            "mini-chart-current-point"
        );


        svg.appendChild(
            baseline
        );

        svg.appendChild(
            point
        );


        container.appendChild(
            svg
        );


        return;

    }


    // ==================================================
    // MEHRERE MESSWERTE
    // ==================================================

    const svgWidth =
        120;

    const svgHeight =
        65;


    // Abstand vom Rand
    const paddingX =
        10;

    const paddingY =
        10;


    // Kleinsten und größten Wert bestimmen
    const minimumValue =
        Math.min(...values);

    const maximumValue =
        Math.max(...values);


    // Unterschied zwischen kleinstem
    // und größtem Wert
    let valueRange =
        maximumValue - minimumValue;


    // Falls alle Werte gleich sind,
    // darf die Range nicht 0 sein.
    if (valueRange === 0) {

        valueRange = 1;

    }


    // Abstand zwischen den Punkten
    const xStep =
        (svgWidth - (paddingX * 2)) /
        (values.length - 1);


    const points =
        [];


    // ==================================================
    // POSITION JEDES MESSWERTES BERECHNEN
    // ==================================================

    values.forEach(
        function (value, index) {

            // X-Position
            const x =
                paddingX +
                (index * xStep);


            // Wert auf die Höhe des Diagramms umrechnen
            const normalizedValue =
                (value - minimumValue) /
                valueRange;


            // SVG beginnt oben bei 0.
            // Deshalb wird der Wert umgedreht.
            const y =
                svgHeight -
                paddingY -
                (
                    normalizedValue *
                    (
                        svgHeight -
                        (paddingY * 2)
                    )
                );


            points.push({
                x: x,
                y: y
            });

        }
    );


    // ==================================================
    // SVG ERSTELLEN
    // ==================================================

    const svg =
        createSvgElement(
            "svg"
        );


    svg.setAttribute(
        "viewBox",
        "0 0 120 65"
    );


    // ==================================================
    // GRUNDLINIE
    // ==================================================

    const baseline =
        createSvgElement(
            "line"
        );


    baseline.setAttribute(
        "x1",
        "10"
    );

    baseline.setAttribute(
        "y1",
        "55"
    );

    baseline.setAttribute(
        "x2",
        "110"
    );

    baseline.setAttribute(
        "y2",
        "55"
    );


    baseline.classList.add(
        "mini-chart-baseline"
    );


    svg.appendChild(
        baseline
    );


    // ==================================================
    // VERLAUFSLINIE
    // ==================================================

    const polyline =
        createSvgElement(
            "polyline"
        );


    const pointString =
        points
            .map(
                function (point) {

                    return (
                        point.x +
                        "," +
                        point.y
                    );

                }
            )
            .join(" ");


    polyline.setAttribute(
        "points",
        pointString
    );


    polyline.classList.add(
        "mini-chart-line"
    );


    svg.appendChild(
        polyline
    );


    // ==================================================
    // PUNKTE AUF DER LINIE
    // ==================================================

    points.forEach(
        function (point, index) {

            const circle =
                createSvgElement(
                    "circle"
                );


            circle.setAttribute(
                "cx",
                point.x
            );

            circle.setAttribute(
                "cy",
                point.y
            );


            // Der letzte Punkt ist größer,
            // weil er den aktuellen Wert darstellt.
            if (
                index ===
                points.length - 1
            ) {

                circle.setAttribute(
                    "r",
                    "5"
                );

                circle.classList.add(
                    "mini-chart-current-point"
                );

            } else {

                circle.setAttribute(
                    "r",
                    "3"
                );

                circle.classList.add(
                    "mini-chart-point"
                );

            }


            svg.appendChild(
                circle
            );

        }
    );


    // SVG in die Karte einfügen
    container.appendChild(
        svg
    );

}


// ==================================================
// SVG-ELEMENT ERSTELLEN
// ==================================================

function createSvgElement(elementName) {

    return document.createElementNS(
        "http://www.w3.org/2000/svg",
        elementName
    );

}