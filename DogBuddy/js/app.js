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


// ==================================================
// KÖRPERMASSE - WECHSELANZEIGE
// ==================================================

const bodyMeasurementTitle =
    document.getElementById("body-measurement-title");

const bodyMeasurementValue =
    document.getElementById("body-measurement-value");

const bodyMeasurementIcon =
    document.getElementById("body-measurement-icon");

const bodyMeasurementPrev =
    document.getElementById("body-measurement-prev");

const bodyMeasurementNext =
    document.getElementById("body-measurement-next");


// Die vier Körpermaße
const bodyMeasurements = [

    {
        title: "Schulterhöhe",
        property: "height",
        icon: "📏"
    },

    {
        title: "Brustumfang",
        property: "chest",
        icon: "📐"
    },

    {
        title: "Halsumfang",
        property: "neck",
        icon: "📏"
    },

    {
        title: "Rückenlänge",
        property: "back",
        icon: "📐"
    }

];


// Schulterhöhe ist beim Start ausgewählt
let currentBodyMeasurementIndex = 0;


// Gespeicherte Messungen aus localStorage holen
const dashboardMeasurements =
    localStorage.getItem("measurements");

let measurements = [];


// ==================================================
// MESSUNGEN LADEN
// ==================================================

if (dashboardMeasurements !== null) {

    measurements =
        JSON.parse(dashboardMeasurements);

    // Neueste Messung zuerst
    measurements.sort(function (a, b) {

        return new Date(b.date) -
            new Date(a.date);

    });


    // Gewicht anzeigen
    if (measurements.length > 0) {

        const latestMeasurement =
            measurements[0];

        if (
            latestMeasurement.weight !== undefined &&
            latestMeasurement.weight !== ""
        ) {

            dashboardWeight.textContent =
                String(latestMeasurement.weight)
                    .replace(".", ",") +
                " kg";

        }

    }

}


// ==================================================
// AUSGEWÄHLTES KÖRPERMASS ANZEIGEN
// ==================================================

function displayBodyMeasurement() {

    const selectedMeasurement =
        bodyMeasurements[
            currentBodyMeasurementIndex
        ];

    // Überschrift ändern
    bodyMeasurementTitle.textContent =
        selectedMeasurement.title;

    // Icon ändern
    bodyMeasurementIcon.textContent =
        selectedMeasurement.icon;


    // ==================================================
    // NEUESTEN VORHANDENEN WERT FINDEN
    // ==================================================

    const measurementWithValue =
        measurements.find(
            function (measurement) {

                const value =
                    measurement[
                        selectedMeasurement.property
                    ];

                return (
                    value !== undefined &&
                    value !== null &&
                    value !== ""
                );

            }
        );


    // Wert anzeigen
    if (measurementWithValue !== undefined) {

        const value =
            measurementWithValue[
                selectedMeasurement.property
            ];

        bodyMeasurementValue.textContent =
            String(value)
                .replace(".", ",") +
            " cm";

    } else {

        bodyMeasurementValue.textContent =
            "– cm";

    }


    // Passendes Diagramm anzeigen
    updateBodyMeasurementChart(
        selectedMeasurement.property
    );

}


// ==================================================
// PFEIL NACH LINKS
// ==================================================

bodyMeasurementPrev.addEventListener(
    "click",
    function () {

        currentBodyMeasurementIndex--;

        if (currentBodyMeasurementIndex < 0) {

            currentBodyMeasurementIndex =
                bodyMeasurements.length - 1;

        }

        displayBodyMeasurement();

    }
);


// ==================================================
// PFEIL NACH RECHTS
// ==================================================

bodyMeasurementNext.addEventListener(
    "click",
    function () {

        currentBodyMeasurementIndex++;

        if (
            currentBodyMeasurementIndex >=
            bodyMeasurements.length
        ) {

            currentBodyMeasurementIndex = 0;

        }

        displayBodyMeasurement();

    }
);

// ==================================================
// TRAININGSFORTSCHRITT AUF DEM DASHBOARD
// ==================================================


// ==================================================
// ELEMENTE AUS DEM HTML HOLEN
// ==================================================

const dashboardCommandSeen =
    document.getElementById(
        "dashboard-command-seen"
    );

const dashboardCommandExperienced =
    document.getElementById(
        "dashboard-command-experienced"
    );

const dashboardCommandRelaxed =
    document.getElementById(
        "dashboard-command-relaxed"
    );


const dashboardDiscoverySeen =
    document.getElementById(
        "dashboard-discovery-seen"
    );

const dashboardDiscoveryExperienced =
    document.getElementById(
        "dashboard-discovery-experienced"
    );

const dashboardDiscoveryRelaxed =
    document.getElementById(
        "dashboard-discovery-relaxed"
    );


// ==================================================
// FORTSCHRITT BERECHNEN
// ==================================================

function calculateDashboardProgress(
    storageKey
) {

    const savedState =
        localStorage.getItem(
            storageKey
        );


    // Keine Daten vorhanden
    if (savedState === null) {

        return {
            seen: 0,
            experienced: 0,
            relaxed: 0
        };
    }


    let state = {};

    try {

        state =
            JSON.parse(
                savedState
            );

    } catch (error) {

        return {
            seen: 0,
            experienced: 0,
            relaxed: 0
        };
    }


    const entries =
        Object.values(
            state
        );


    // Keine Einträge vorhanden
    if (entries.length === 0) {

        return {
            seen: 0,
            experienced: 0,
            relaxed: 0
        };
    }


    // ==================================================
    // HAKEN ZÄHLEN
    // ==================================================

    const seenCount =
        entries.filter(
            function (entry) {

                return entry.seen === true;
            }
        ).length;


    const experiencedCount =
        entries.filter(
            function (entry) {

                return entry.experienced === true;
            }
        ).length;


    const relaxedCount =
        entries.filter(
            function (entry) {

                return entry.relaxed === true;
            }
        ).length;


    // ==================================================
    // PROZENTE BERECHNEN
    // ==================================================

    return {

        seen:
            Math.round(
                seenCount /
                entries.length *
                100
            ),

        experienced:
            Math.round(
                experiencedCount /
                entries.length *
                100
            ),

        relaxed:
            Math.round(
                relaxedCount /
                entries.length *
                100
            )
    };
}


// ==================================================
// KOMMANDOS
// ==================================================

const commandProgress =
    calculateDashboardProgress(
        "commandChecklist"
    );


// ==================================================
// ENTDECKER
// ==================================================

const discoveryProgress =
    calculateDashboardProgress(
        "discoveryChecklist"
    );


// ==================================================
// FORTSCHRITT ANZEIGEN
// ==================================================

if (
    dashboardCommandSeen !== null
) {

    dashboardCommandSeen.textContent =
        commandProgress.seen +
        " %";

    dashboardCommandExperienced.textContent =
        commandProgress.experienced +
        " %";

    dashboardCommandRelaxed.textContent =
        commandProgress.relaxed +
        " %";


    dashboardDiscoverySeen.textContent =
        discoveryProgress.seen +
        " %";

    dashboardDiscoveryExperienced.textContent =
        discoveryProgress.experienced +
        " %";

    dashboardDiscoveryRelaxed.textContent =
        discoveryProgress.relaxed +
        " %";
}

// ==================================================
// LETZTE TAGEBUCHEINTRÄGE AUF DEM DASHBOARD
// ==================================================


// ==================================================
// BEREICH AUS DEM HTML HOLEN
// ==================================================

const dashboardDiaryList =
    document.getElementById(
        "dashboard-diary-list"
    );


// ==================================================
// TAGEBUCHEINTRÄGE AUS LOCALSTORAGE HOLEN
// ==================================================

const dashboardDiaryEntries =
    localStorage.getItem(
        "diaryEntries"
    );


// ==================================================
// TAGEBUCHEINTRÄGE ANZEIGEN
// ==================================================

if (
    dashboardDiaryList !== null &&
    dashboardDiaryEntries !== null
) {

    const diaryEntries =
        JSON.parse(
            dashboardDiaryEntries
        );


    // ==================================================
    // NEUESTE EINTRÄGE ZUERST
    // ==================================================

    diaryEntries.sort(
        function (a, b) {

            const dateDifference =
                new Date(b.date) -
                new Date(a.date);


            if (
                dateDifference !== 0
            ) {

                return dateDifference;

            }


            return b.id - a.id;

        }
    );


    // ==================================================
    // ALTE ANZEIGE LEEREN
    // ==================================================

    dashboardDiaryList.innerHTML = "";


    // ==================================================
    // MAXIMAL 2 EINTRÄGE ANZEIGEN
    // ==================================================

    const diaryEntriesToShow =
        diaryEntries.slice(
            0,
            2
        );


    diaryEntriesToShow.forEach(
        function (entry) {

            // ==================================================
            // KASTEN FÜR EINEN EINTRAG
            // ==================================================

            const diaryBox =
                document.createElement(
                    "div"
                );

            diaryBox.classList.add(
                "dashboard-diary-box"
            );


            // ==================================================
            // DATUM
            // ==================================================

            const diaryDate =
                document.createElement(
                    "span"
                );

            diaryDate.classList.add(
                "dashboard-diary-box-date"
            );

            diaryDate.textContent =
                formatDashboardDiaryDate(
                    entry.date
                );


            // ==================================================
            // TITEL
            // ==================================================

            const diaryTitle =
                document.createElement(
                    "strong"
                );

            diaryTitle.classList.add(
                "dashboard-diary-box-title"
            );

            diaryTitle.textContent =
                entry.title;


            // ==================================================
            // IN DEN KASTEN EINFÜGEN
            // ==================================================

            diaryBox.appendChild(
                diaryDate
            );

            diaryBox.appendChild(
                diaryTitle
            );


            dashboardDiaryList.appendChild(
                diaryBox
            );

        }
    );

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
// NÄCHSTE TERMINE AUF DEM DASHBOARD
// ==================================================

// Bereich für die Termine aus dem HTML holen
const dashboardAppointmentList =
    document.getElementById(
        "dashboard-appointment-list"
    );


// Gespeicherte Termine aus localStorage holen
const dashboardAppointments =
    localStorage.getItem(
        "appointments"
    );


// Nur ausführen, wenn wir uns auf dem Dashboard befinden
if (
    dashboardAppointmentList !== null &&
    dashboardAppointments !== null
) {

    // JSON wieder in ein JavaScript-Array umwandeln
    const appointments =
        JSON.parse(
            dashboardAppointments
        );


    // ==================================================
    // NUR AUSSTEHENDE TERMINE
    // ==================================================

    const openAppointments =
        appointments.filter(
            function (appointment) {

                return appointment.completed !== true;

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
    // ALTE ANZEIGE LEEREN
    // ==================================================

    dashboardAppointmentList.innerHTML = "";


    // ==================================================
    // MAXIMAL 3 TERMINE ANZEIGEN
    // ==================================================

    const appointmentsToShow =
        openAppointments.slice(
            0,
            3
        );


    appointmentsToShow.forEach(
        function (appointment) {

            // ==================================================
            // KASTEN FÜR EINEN TERMIN
            // ==================================================

            const appointmentBox =
                document.createElement(
                    "div"
                );

            appointmentBox.classList.add(
                "dashboard-appointment-box"
            );


            // ==================================================
            // TITEL
            // ==================================================

            const appointmentTitle =
                document.createElement(
                    "strong"
                );

            appointmentTitle.classList.add(
                "dashboard-appointment-box-title"
            );

            appointmentTitle.textContent =
                appointment.title;


            // ==================================================
            // DATUM UND UHRZEIT
            // ==================================================

            const appointmentDate =
                document.createElement(
                    "span"
                );

            appointmentDate.classList.add(
                "dashboard-appointment-box-date"
            );


            let appointmentDateText =
                formatDashboardAppointmentDate(
                    appointment.date
                );


            if (
                appointment.time !== ""
            ) {

                appointmentDateText +=
                    " · " +
                    appointment.time +
                    " Uhr";

            }


            appointmentDate.textContent =
                appointmentDateText;


            // ==================================================
            // TERMIN IN DEN KASTEN EINFÜGEN
            // ==================================================

            appointmentBox.appendChild(
                appointmentTitle
            );

            appointmentBox.appendChild(
                appointmentDate
            );


            // Kasten auf dem Dashboard anzeigen
            dashboardAppointmentList.appendChild(
                appointmentBox
            );

        }
    );

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
    }

}


// ==================================================
// DIAGRAMM FÜR AUSGEWÄHLTES KÖRPERMASS
// ==================================================

function updateBodyMeasurementChart(
    property
) {

    if (dashboardHeightChart === null) {
        return;
    }


    // Messungen chronologisch sortieren
    const sortedMeasurements =
        [...measurements].sort(
            function (a, b) {

                return new Date(a.date) -
                    new Date(b.date);

            }
        );


    // Nur Werte des ausgewählten Körpermaßes
    const values =
        sortedMeasurements
            .filter(
                function (measurement) {

                    return (
                        measurement[property] !== undefined &&
                        measurement[property] !== null &&
                        measurement[property] !== ""
                    );

                }
            )
            .map(
                function (measurement) {

                    return Number(
                        measurement[property]
                    );

                }
            );


    createMiniChart(
        dashboardHeightChart,
        values
    );

}

// Beim Laden zuerst Schulterhöhe anzeigen
displayBodyMeasurement();

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