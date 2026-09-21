// ==================================================
// DOGBUDDY - GESUNDHEIT & TERMINE
// ==================================================


// ==================================================
// HTML-ELEMENTE HOLEN
// ==================================================

// Hundename in Überschrift und Beschreibung
const pageDogName =
    document.getElementById("page-dog-name");

const pageDogNameText =
    document.getElementById("page-dog-name-text");

const appointmentCategoryInput =
    document.getElementById("appointment-category");

const appointmentTitleInput =
    document.getElementById("appointment-title");

const appointmentDateInput =
    document.getElementById("appointment-date");

const appointmentTimeInput =
    document.getElementById("appointment-time");

const appointmentLocationInput =
    document.getElementById("appointment-location");

const appointmentNoteInput =
    document.getElementById("appointment-note");

const saveAppointmentButton =
    document.getElementById("save-appointment");

const openAppointmentsContainer =
    document.getElementById("open-appointments");

const completedAppointmentsContainer =
    document.getElementById("completed-appointments");

const openAppointmentCount =
    document.getElementById("open-appointment-count");

const completedAppointmentCount =
    document.getElementById("completed-appointment-count");


// ==================================================
// POPUP-ELEMENTE
// ==================================================

const openAppointmentFormButton =
    document.getElementById("open-appointment-form");

const appointmentFormModal =
    document.getElementById("appointment-form-modal");

const closeAppointmentFormButton =
    document.getElementById("close-appointment-form");

const cancelAppointmentFormButton =
    document.getElementById("cancel-appointment-form");

const appointmentFormTitle =
    document.getElementById("appointment-form-title");


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

    pageDogNameText.textContent =
        dog.name;
}


// ==================================================
// VARIABLEN
// ==================================================

let appointments = [];

let editingAppointmentId = null;


// ==================================================
// GESPEICHERTE TERMINE LADEN
// ==================================================

const savedAppointments =
    localStorage.getItem("appointments");


if (savedAppointments !== null) {

    appointments =
        JSON.parse(savedAppointments);
}


// ==================================================
// HEUTIGES DATUM EINTRAGEN
// ==================================================

setToday();


// ==================================================
// TERMINE DIREKT ANZEIGEN
// ==================================================

displayAppointments();


// ==================================================
// POPUP FÜR NEUEN TERMIN ÖFFNEN
// ==================================================

openAppointmentFormButton.addEventListener(
    "click",
    function () {

        // Formular zurücksetzen
        clearAppointmentForm();

        // Überschrift
        appointmentFormTitle.textContent =
            "Neuer Termin";

        // Popup öffnen
        openAppointmentModal();

        // Cursor direkt in die Bezeichnung
        appointmentTitleInput.focus();
    }
);


// ==================================================
// POPUP ÖFFNEN
// ==================================================

function openAppointmentModal() {

    appointmentFormModal.classList.add("show");

    document.body.style.overflow =
        "hidden";
}


// ==================================================
// POPUP SCHLIESSEN
// ==================================================

function closeAppointmentModal() {

    appointmentFormModal.classList.remove("show");

    document.body.style.overflow =
        "";

    clearAppointmentForm();
}


// ==================================================
// X OBEN RECHTS
// ==================================================

closeAppointmentFormButton.addEventListener(
    "click",
    closeAppointmentModal
);


// ==================================================
// ABBRECHEN
// ==================================================

cancelAppointmentFormButton.addEventListener(
    "click",
    closeAppointmentModal
);


// ==================================================
// KLICK AUF DUNKLEN HINTERGRUND
// ==================================================

appointmentFormModal.addEventListener(
    "click",
    function (event) {

        if (event.target === appointmentFormModal) {

            closeAppointmentModal();
        }
    }
);


// ==================================================
// ESC-TASTE
// ==================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            appointmentFormModal.classList.contains("show")
        ) {

            closeAppointmentModal();
        }
    }
);


// ==================================================
// TERMIN SPEICHERN
// ==================================================

saveAppointmentButton.addEventListener(
    "click",
    function () {


        // ==================================================
        // EINGABEN HOLEN
        // ==================================================

        const category =
            appointmentCategoryInput.value;

        const title =
            appointmentTitleInput.value.trim();

        const date =
            appointmentDateInput.value;

        const time =
            appointmentTimeInput.value;

        const location =
            appointmentLocationInput.value.trim();

        const note =
            appointmentNoteInput.value.trim();


        const selectedStatus =
            document.querySelector(
                'input[name="appointment-status"]:checked'
            );


        // ==================================================
        // EINGABEN PRÜFEN
        // ==================================================

        if (title === "") {

            alert(
                "Bitte gib eine Bezeichnung für den Termin ein."
            );

            appointmentTitleInput.focus();

            return;
        }


        if (date === "") {

            alert(
                "Bitte wähle ein Datum aus."
            );

            appointmentDateInput.focus();

            return;
        }


        // ==================================================
        // STATUS
        // ==================================================

        const completed =
            selectedStatus.value === "completed";


        // ==================================================
        // NEUER TERMIN
        // ==================================================

        if (editingAppointmentId === null) {

            const newAppointment = {

                id: Date.now(),

                category: category,

                title: title,

                date: date,

                time: time,

                location: location,

                note: note,

                completed: completed
            };


            appointments.push(
                newAppointment
            );
        }


        // ==================================================
        // VORHANDENEN TERMIN ÄNDERN
        // ==================================================

        else {

            const appointment =
                appointments.find(
                    function (savedAppointment) {

                        return savedAppointment.id ===
                            editingAppointmentId;
                    }
                );


            if (appointment !== undefined) {

                appointment.category =
                    category;

                appointment.title =
                    title;

                appointment.date =
                    date;

                appointment.time =
                    time;

                appointment.location =
                    location;

                appointment.note =
                    note;

                appointment.completed =
                    completed;
            }
        }


        // ==================================================
        // SPEICHERN
        // ==================================================

        saveAppointments();


        // Anzeige aktualisieren
        displayAppointments();


        // Popup schließen
        closeAppointmentModal();
    }
);


// ==================================================
// TERMINE SPEICHERN
// ==================================================

function saveAppointments() {

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );
}


// ==================================================
// TERMINE ANZEIGEN
// ==================================================

function displayAppointments() {

    // Alte Anzeige entfernen
    openAppointmentsContainer.innerHTML =
        "";

    completedAppointmentsContainer.innerHTML =
        "";


    // ==================================================
    // AUSSTEHENDE TERMINE
    // ==================================================

    const openAppointments =
        appointments.filter(
            function (appointment) {

                return appointment.completed ===
                    false;
            }
        );


    // Nächster Termin zuerst
    openAppointments.sort(
        function (a, b) {

            return getAppointmentDateTime(a) -
                getAppointmentDateTime(b);
        }
    );


    // ==================================================
    // ERLEDIGTE TERMINE
    // ==================================================

    const completedAppointments =
        appointments.filter(
            function (appointment) {

                return appointment.completed ===
                    true;
            }
        );


    // Neuester erledigter Termin zuerst
    completedAppointments.sort(
        function (a, b) {

            return getAppointmentDateTime(b) -
                getAppointmentDateTime(a);
        }
    );


    // ==================================================
    // ZÄHLER
    // ==================================================

    openAppointmentCount.textContent =
        openAppointments.length;

    completedAppointmentCount.textContent =
        completedAppointments.length;


    // ==================================================
    // LEERE LISTEN
    // ==================================================

    if (openAppointments.length === 0) {

        openAppointmentsContainer.innerHTML =
            '<p class="empty-appointments">' +
            'Noch keine ausstehenden Termine.' +
            '</p>';
    }


    if (completedAppointments.length === 0) {

        completedAppointmentsContainer.innerHTML =
            '<p class="empty-appointments">' +
            'Noch keine erledigten Termine.' +
            '</p>';
    }


    // ==================================================
    // AUSSTEHENDE TERMINE ANZEIGEN
    // ==================================================

    openAppointments.forEach(
        function (appointment) {

            const card =
                createAppointmentCard(
                    appointment
                );

            openAppointmentsContainer.appendChild(
                card
            );
        }
    );


    // ==================================================
    // ERLEDIGTE TERMINE ANZEIGEN
    // ==================================================

    completedAppointments.forEach(
        function (appointment) {

            const card =
                createAppointmentCard(
                    appointment
                );

            completedAppointmentsContainer.appendChild(
                card
            );
        }
    );
}


// ==================================================
// TERMIN-KARTE ERSTELLEN
// ==================================================

function createAppointmentCard(appointment) {

    const card =
        document.createElement("article");

    card.classList.add(
        "appointment-item"
    );


    // Erledigte Termine bekommen Zusatzklasse
    if (appointment.completed === true) {

        card.classList.add(
            "appointment-completed"
        );
    }


    // ==================================================
    // KOPFBEREICH
    // ==================================================

    const header =
        document.createElement("div");

    header.classList.add(
        "appointment-item-header"
    );


    const headerText =
        document.createElement("div");


    // Kategorie
    const category =
        document.createElement("p");

    category.classList.add(
        "appointment-category"
    );

    category.textContent =
        getCategoryIcon(
            appointment.category
        ) +
        " " +
        appointment.category;


    // Titel
    const title =
        document.createElement("h3");

    title.textContent =
        appointment.title;


    headerText.appendChild(
        category
    );

    headerText.appendChild(
        title
    );


    // Status
    const status =
        document.createElement("span");

    status.classList.add(
        "appointment-status"
    );


    if (appointment.completed === true) {

        status.textContent =
            "✓ Erledigt";

        status.classList.add(
            "status-completed"
        );

    } else {

        status.textContent =
            "Ausstehend";

        status.classList.add(
            "status-open"
        );
    }


    header.appendChild(
        headerText
    );

    header.appendChild(
        status
    );

    card.appendChild(
        header
    );


    // ==================================================
    // DATUM UND UHRZEIT
    // ==================================================

    const date =
        document.createElement("p");

    date.classList.add(
        "appointment-info"
    );


    let dateText =
        "📅 " +
        formatAppointmentDate(
            appointment.date
        );


    if (
        appointment.time !== undefined &&
        appointment.time !== ""
    ) {

        dateText +=
            " · " +
            appointment.time +
            " Uhr";
    }


    date.textContent =
        dateText;


    card.appendChild(
        date
    );


    // ==================================================
    // ORT
    // ==================================================

    if (
        appointment.location !== undefined &&
        appointment.location !== ""
    ) {

        const location =
            document.createElement("p");

        location.classList.add(
            "appointment-info"
        );

        location.textContent =
            "📍 " +
            appointment.location;

        card.appendChild(
            location
        );
    }


    // ==================================================
    // NOTIZ
    // ==================================================

    if (
        appointment.note !== undefined &&
        appointment.note !== ""
    ) {

        const note =
            document.createElement("p");

        note.classList.add(
            "appointment-note"
        );

        note.textContent =
            appointment.note;

        card.appendChild(
            note
        );
    }


    // ==================================================
    // BUTTON-BEREICH
    // ==================================================

    const buttonArea =
        document.createElement("div");

    buttonArea.classList.add(
        "appointment-button-area"
    );


    // ==================================================
    // ERLEDIGT / WIEDER ÖFFNEN
    // ==================================================

    const statusButton =
        document.createElement("button");

    statusButton.type =
        "button";

    statusButton.classList.add(
        "appointment-status-button"
    );


    if (appointment.completed === false) {

        statusButton.textContent =
            "✓ Erledigt";

    } else {

        statusButton.textContent =
            "↩ Wieder öffnen";
    }


    statusButton.addEventListener(
        "click",
        function () {

            appointment.completed =
                !appointment.completed;

            saveAppointments();

            displayAppointments();
        }
    );


    // ==================================================
    // ÄNDERN
    // ==================================================

    const editButton =
        document.createElement("button");

    editButton.type =
        "button";

    editButton.classList.add(
        "edit-appointment-button"
    );

    editButton.textContent =
        "✏ Ändern";


    editButton.addEventListener(
        "click",
        function () {

            editAppointment(
                appointment.id
            );
        }
    );


    // ==================================================
    // LÖSCHEN
    // ==================================================

    const deleteButton =
        document.createElement("button");

    deleteButton.type =
        "button";

    deleteButton.classList.add(
        "delete-appointment-button"
    );

    deleteButton.textContent =
        "🗑 Löschen";


    deleteButton.addEventListener(
        "click",
        function () {

            deleteAppointment(
                appointment.id
            );
        }
    );


    buttonArea.appendChild(
        statusButton
    );

    buttonArea.appendChild(
        editButton
    );

    buttonArea.appendChild(
        deleteButton
    );


    card.appendChild(
        buttonArea
    );


    return card;
}


// ==================================================
// TERMIN BEARBEITEN
// ==================================================

function editAppointment(appointmentId) {

    const appointment =
        appointments.find(
            function (savedAppointment) {

                return savedAppointment.id ===
                    appointmentId;
            }
        );


    if (appointment === undefined) {

        return;
    }


    // Bearbeitungs-ID merken
    editingAppointmentId =
        appointment.id;


    // Werte ins Formular schreiben
    appointmentCategoryInput.value =
        appointment.category;

    appointmentTitleInput.value =
        appointment.title;

    appointmentDateInput.value =
        appointment.date;

    appointmentTimeInput.value =
        appointment.time || "";

    appointmentLocationInput.value =
        appointment.location || "";

    appointmentNoteInput.value =
        appointment.note || "";


    // Status setzen
    if (appointment.completed === true) {

        document.querySelector(
            'input[name="appointment-status"][value="completed"]'
        ).checked = true;

    } else {

        document.querySelector(
            'input[name="appointment-status"][value="open"]'
        ).checked = true;
    }


    // Popup-Überschrift ändern
    appointmentFormTitle.textContent =
        "Termin bearbeiten";


    // Speichern-Button ändern
    saveAppointmentButton.textContent =
        "Änderungen speichern";


    // Popup öffnen
    openAppointmentModal();


    // Cursor ins Titelfeld
    appointmentTitleInput.focus();
}


// ==================================================
// TERMIN LÖSCHEN
// ==================================================

function deleteAppointment(appointmentId) {

    const reallyDelete =
        confirm(
            "Möchtest du diesen Termin wirklich löschen?"
        );


    if (reallyDelete === false) {

        return;
    }


    appointments =
        appointments.filter(
            function (appointment) {

                return appointment.id !==
                    appointmentId;
            }
        );


    saveAppointments();

    displayAppointments();


    // Falls genau dieser Termin
    // gerade bearbeitet wurde
    if (
        editingAppointmentId ===
        appointmentId
    ) {

        closeAppointmentModal();
    }
}


// ==================================================
// FORMULAR LEEREN
// ==================================================

function clearAppointmentForm() {

    appointmentCategoryInput.value =
        "Tierarzt";

    appointmentTitleInput.value =
        "";

    appointmentTimeInput.value =
        "";

    appointmentLocationInput.value =
        "";

    appointmentNoteInput.value =
        "";


    // Status zurück auf Ausstehend
    document.querySelector(
        'input[name="appointment-status"][value="open"]'
    ).checked = true;


    // Bearbeitungsmodus beenden
    editingAppointmentId =
        null;


    // Button zurücksetzen
    saveAppointmentButton.textContent =
        "Termin speichern";


    // Überschrift zurücksetzen
    appointmentFormTitle.textContent =
        "Neuer Termin";


    // Datum wieder auf heute
    setToday();
}


// ==================================================
// KATEGORIE-ICON
// ==================================================

function getCategoryIcon(category) {

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
// DATUM + UHRZEIT FÜR SORTIERUNG
// ==================================================

function getAppointmentDateTime(appointment) {

    let time =
        appointment.time;


    // Alte Termine ohne gespeicherte Uhrzeit
    // ebenfalls berücksichtigen
    if (
        time === undefined ||
        time === ""
    ) {

        time =
            "00:00";
    }


    return new Date(
        appointment.date +
        "T" +
        time
    );
}


// ==================================================
// DATUM DEUTSCH FORMATIEREN
// ==================================================

function formatAppointmentDate(date) {

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


    appointmentDateInput.value =
        year +
        "-" +
        month +
        "-" +
        day;
}


// ==================================================
// GESUNDHEIT - KALENDER
// ==================================================


// ==================================================
// KALENDER - HTML-ELEMENTE
// ==================================================

const healthCalendar =
    document.getElementById("health-calendar");

const calendarTitle =
    document.getElementById("calendar-title");

const calendarPreviousButton =
    document.getElementById("calendar-previous");

const calendarNextButton =
    document.getElementById("calendar-next");

const calendarTodayButton =
    document.getElementById("calendar-today");

const calendarWeekViewButton =
    document.getElementById("calendar-week-view");

const calendarMonthViewButton =
    document.getElementById("calendar-month-view");

const calendarSelectedDate =
    document.getElementById("calendar-selected-date");

const calendarDayAppointments =
    document.getElementById("calendar-day-appointments");


// ==================================================
// KALENDER - VARIABLEN
// ==================================================

let calendarCurrentDate =
    new Date();

let calendarSelectedDay =
    new Date();

let calendarView =
    "week";

calendarTodayButton.textContent =
    "Diese Woche";

// ==================================================
// KALENDER DIREKT ANZEIGEN
// ==================================================

displayHealthCalendar();

displayCalendarDayAppointments();


// ==================================================
// VORHERIGER ZEITRAUM
// ==================================================

calendarPreviousButton.addEventListener(
    "click",
    function () {

        if (calendarView === "week") {

            calendarCurrentDate.setDate(
                calendarCurrentDate.getDate() - 7
            );

        } else {

            calendarCurrentDate.setMonth(
                calendarCurrentDate.getMonth() - 1
            );
        }


        displayHealthCalendar();
    }
);


// ==================================================
// NÄCHSTER ZEITRAUM
// ==================================================

calendarNextButton.addEventListener(
    "click",
    function () {

        if (calendarView === "week") {

            calendarCurrentDate.setDate(
                calendarCurrentDate.getDate() + 7
            );

        } else {

            calendarCurrentDate.setMonth(
                calendarCurrentDate.getMonth() + 1
            );
        }


        displayHealthCalendar();
    }
);


// ==================================================
// HEUTE
// ==================================================

calendarTodayButton.addEventListener(
    "click",
    function () {

        calendarCurrentDate =
            new Date();

        calendarSelectedDay =
            new Date();


        displayHealthCalendar();

        displayCalendarDayAppointments();
    }
);


// ==================================================
// WOCHENANSICHT
// ==================================================

calendarWeekViewButton.addEventListener(
    "click",
    function () {

        calendarView =
            "week";

        calendarTodayButton.textContent =
            "Diese Woche";


        calendarWeekViewButton.classList.add(
            "active"
        );

        calendarMonthViewButton.classList.remove(
            "active"
        );


        displayHealthCalendar();
    }
);


// ==================================================
// MONATSANSICHT
// ==================================================

calendarMonthViewButton.addEventListener(
    "click",
    function () {

        calendarView =
            "month";

        calendarTodayButton.textContent =
            "Aktueller Monat";


        calendarMonthViewButton.classList.add(
            "active"
        );

        calendarWeekViewButton.classList.remove(
            "active"
        );


        displayHealthCalendar();
    }
);


// ==================================================
// KALENDER ANZEIGEN
// ==================================================

function displayHealthCalendar() {

    healthCalendar.innerHTML =
        "";


    if (calendarView === "week") {

        displayCalendarWeek();

    } else {

        displayCalendarMonth();
    }
}


// ==================================================
// WOCHENANSICHT ANZEIGEN
// ==================================================

function displayCalendarWeek() {

    healthCalendar.className =
        "health-calendar calendar-week";


    const monday =
        getCalendarMonday(
            calendarCurrentDate
        );


    const sunday =
        new Date(monday);

    sunday.setDate(
        monday.getDate() + 6
    );


    calendarTitle.textContent =
        formatCalendarPeriod(
            monday,
            sunday
        );


    for (
        let dayIndex = 0;
        dayIndex < 7;
        dayIndex++
    ) {

        const date =
            new Date(monday);

        date.setDate(
            monday.getDate() + dayIndex
        );


        const day =
            createCalendarDay(
                date,
                false
            );


        healthCalendar.appendChild(
            day
        );
    }
}


// ==================================================
// MONATSANSICHT ANZEIGEN
// ==================================================

function displayCalendarMonth() {

    healthCalendar.className =
        "health-calendar calendar-month";


    const year =
        calendarCurrentDate.getFullYear();

    const month =
        calendarCurrentDate.getMonth();


    calendarTitle.textContent =
        new Intl.DateTimeFormat(
            "de-DE",
            {
                month: "long",
                year: "numeric"
            }
        ).format(
            calendarCurrentDate
        );


    // ==================================================
    // WOCHENTAGE
    // ==================================================

    const weekdays = [
        "Mo",
        "Di",
        "Mi",
        "Do",
        "Fr",
        "Sa",
        "So"
    ];


    weekdays.forEach(
        function (weekday) {

            const weekdayElement =
                document.createElement("div");

            weekdayElement.classList.add(
                "calendar-weekday"
            );

            weekdayElement.textContent =
                weekday;


            healthCalendar.appendChild(
                weekdayElement
            );
        }
    );


    // ==================================================
    // ERSTER TAG IM KALENDER
    // ==================================================

    const firstMonthDay =
        new Date(
            year,
            month,
            1
        );


    let firstWeekday =
        firstMonthDay.getDay();


    if (firstWeekday === 0) {

        firstWeekday =
            7;
    }


    const calendarStart =
        new Date(
            year,
            month,
            1 - (firstWeekday - 1)
        );


    // 6 Wochen anzeigen
    for (
        let dayIndex = 0;
        dayIndex < 42;
        dayIndex++
    ) {

        const date =
            new Date(calendarStart);

        date.setDate(
            calendarStart.getDate() +
            dayIndex
        );


        const outsideMonth =
            date.getMonth() !== month;


        const day =
            createCalendarDay(
                date,
                outsideMonth
            );


        healthCalendar.appendChild(
            day
        );
    }
}


// ==================================================
// EINEN KALENDERTAG ERSTELLEN
// ==================================================

function createCalendarDay(
    date,
    outsideMonth
) {

    const day =
        document.createElement("button");

    day.type =
        "button";

    day.classList.add(
        "calendar-day"
    );


    if (outsideMonth === true) {

        day.classList.add(
            "calendar-day-outside"
        );
    }


    // ==================================================
    // HEUTE
    // ==================================================

    if (
        isSameCalendarDay(
            date,
            new Date()
        )
    ) {

        day.classList.add(
            "calendar-day-today"
        );
    }


    // ==================================================
    // AUSGEWÄHLTER TAG
    // ==================================================

    if (
        isSameCalendarDay(
            date,
            calendarSelectedDay
        )
    ) {

        day.classList.add(
            "calendar-day-selected"
        );
    }


    // ==================================================
    // WOCHENTAG
    // ==================================================

    if (calendarView === "week") {

        const weekday =
            document.createElement("span");

        weekday.classList.add(
            "calendar-day-weekday"
        );

        weekday.textContent =
            new Intl.DateTimeFormat(
                "de-DE",
                {
                    weekday: "short"
                }
            ).format(
                date
            );


        day.appendChild(
            weekday
        );
    }


    // ==================================================
    // TAGNUMMER
    // ==================================================

    const number =
        document.createElement("span");

    number.classList.add(
        "calendar-day-number"
    );

    number.textContent =
        date.getDate();


    day.appendChild(
        number
    );


    // ==================================================
    // TERMINE DES TAGES
    // ==================================================

    const dayAppointments =
        getCalendarAppointmentsForDate(
            date
        );


    if (calendarView === "week") {

        const appointmentArea =
            document.createElement("span");

        appointmentArea.classList.add(
            "calendar-day-appointment-area"
        );


        dayAppointments
            .slice(0, 3)
            .forEach(
                function (appointment) {

                    const appointmentElement =
                        document.createElement("span");

                    appointmentElement.classList.add(
                        "calendar-mini-appointment"
                    );


                    if (
                        appointment.completed ===
                        true
                    ) {

                        appointmentElement.classList.add(
                            "calendar-mini-completed"
                        );
                    }


                    appointmentElement.textContent =
                        getCategoryIcon(
                            appointment.category
                        ) +
                        " " +
                        (
                            appointment.time ||
                            ""
                        ) +
                        (
                            appointment.time
                                ? " "
                                : ""
                        ) +
                        appointment.title;


                    appointmentArea.appendChild(
                        appointmentElement
                    );
                }
            );


        if (dayAppointments.length > 3) {

            const more =
                document.createElement("span");

            more.classList.add(
                "calendar-more-appointments"
            );

            more.textContent =
                "+" +
                (
                    dayAppointments.length -
                    3
                ) +
                " weitere";


            appointmentArea.appendChild(
                more
            );
        }


        day.appendChild(
            appointmentArea
        );

        } else if (
            dayAppointments.length > 0
        ) {
        
            // ==================================================
            // TERMINE IN DER MONATSANSICHT
            // ==================================================
        
            const monthAppointmentArea =
                document.createElement("span");
        
            monthAppointmentArea.classList.add(
                "calendar-month-appointments"
            );
        
        
            dayAppointments.forEach(
                function (appointment) {
                
                    const appointmentElement =
                        document.createElement("span");
                
                    appointmentElement.classList.add(
                        "calendar-month-appointment"
                    );
                
                
                    if (
                        appointment.completed === true
                    ) {
                    
                        appointmentElement.classList.add(
                            "calendar-mini-completed"
                        );
                    }
                
                
                    appointmentElement.textContent =
                        appointment.title;
                
                
                    monthAppointmentArea.appendChild(
                        appointmentElement
                    );
                }
            );
        
        
            day.appendChild(
                monthAppointmentArea
            );
        }


    // ==================================================
    // KLICK AUF TAG
    // ==================================================

    day.addEventListener(
        "click",
        function () {

            calendarSelectedDay =
                new Date(date);

            calendarCurrentDate =
                new Date(date);


            displayHealthCalendar();

            displayCalendarDayAppointments();
        }
    );


    return day;
}


// ==================================================
// TERMINE FÜR AUSGEWÄHLTEN TAG
// ==================================================

function displayCalendarDayAppointments() {

    calendarDayAppointments.innerHTML =
        "";


    calendarSelectedDate.textContent =
        new Intl.DateTimeFormat(
            "de-DE",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        ).format(
            calendarSelectedDay
        );


    const dayAppointments =
        getCalendarAppointmentsForDate(
            calendarSelectedDay
        );


    // ==================================================
    // KEIN TERMIN
    // ==================================================

    if (dayAppointments.length === 0) {

        const emptyText =
            document.createElement("p");

        emptyText.classList.add(
            "empty-appointments"
        );

        emptyText.textContent =
            "Keine Termine an diesem Tag.";


        calendarDayAppointments.appendChild(
            emptyText
        );


        const addButton =
            document.createElement("button");

        addButton.type =
            "button";

        addButton.classList.add(
            "calendar-add-appointment"
        );

        addButton.textContent =
            "＋ Termin für diesen Tag";


        addButton.addEventListener(
            "click",
            function () {

                openCalendarAppointmentForm(
                    calendarSelectedDay
                );
            }
        );


        calendarDayAppointments.appendChild(
            addButton
        );


        return;
    }


    // ==================================================
    // TERMINE ANZEIGEN
    // ==================================================

    dayAppointments.forEach(
        function (appointment) {

            const item =
                document.createElement("button");

            item.type =
                "button";

            item.classList.add(
                "calendar-detail-appointment"
            );


            if (
                appointment.completed === true
            ) {

                item.classList.add(
                    "calendar-detail-completed"
                );
            }


            const icon =
                document.createElement("span");

            icon.classList.add(
                "calendar-detail-icon"
            );

            icon.textContent =
                getCategoryIcon(
                    appointment.category
                );


            const text =
                document.createElement("span");

            text.classList.add(
                "calendar-detail-text"
            );


            const title =
                document.createElement("strong");

            title.textContent =
                appointment.title;


            const information =
                document.createElement("small");


            let informationText =
                appointment.category;


            if (
                appointment.time !== undefined &&
                appointment.time !== ""
            ) {

                informationText +=
                    " · " +
                    appointment.time +
                    " Uhr";
            }


            information.textContent =
                informationText;


            text.appendChild(
                title
            );

            text.appendChild(
                information
            );


            item.appendChild(
                icon
            );

            item.appendChild(
                text
            );


            item.addEventListener(
                "click",
                function () {

                    editAppointment(
                        appointment.id
                    );
                }
            );


            calendarDayAppointments.appendChild(
                item
            );
        }
    );


    // ==================================================
    // WEITEREN TERMIN HINZUFÜGEN
    // ==================================================

    const addButton =
        document.createElement("button");

    addButton.type =
        "button";

    addButton.classList.add(
        "calendar-add-appointment"
    );

    addButton.textContent =
        "＋ Weiteren Termin hinzufügen";


    addButton.addEventListener(
        "click",
        function () {

            openCalendarAppointmentForm(
                calendarSelectedDay
            );
        }
    );


    calendarDayAppointments.appendChild(
        addButton
    );
}


// ==================================================
// NEUEN TERMIN AUS KALENDER ÖFFNEN
// ==================================================

function openCalendarAppointmentForm(
    date
) {

    clearAppointmentForm();


    appointmentDateInput.value =
        getCalendarDateString(
            date
        );


    appointmentFormTitle.textContent =
        "Neuer Termin";


    openAppointmentModal();


    appointmentTitleInput.focus();
}


// ==================================================
// TERMINE EINES DATUMS HOLEN
// ==================================================

function getCalendarAppointmentsForDate(
    date
) {

    const dateString =
        getCalendarDateString(
            date
        );


    return appointments
        .filter(
            function (appointment) {

                return appointment.date ===
                    dateString;
            }
        )
        .sort(
            function (a, b) {

                return getAppointmentDateTime(a) -
                    getAppointmentDateTime(b);
            }
        );
}


// ==================================================
// MONTAG DER WOCHE ERMITTELN
// ==================================================

function getCalendarMonday(date) {

    const monday =
        new Date(date);

    const weekday =
        monday.getDay();


    const difference =
        weekday === 0
            ? -6
            : 1 - weekday;


    monday.setDate(
        monday.getDate() +
        difference
    );


    monday.setHours(
        0,
        0,
        0,
        0
    );


    return monday;
}


// ==================================================
// DATUM FÜR LOCALSTORAGE
// ==================================================

function getCalendarDateString(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return year +
        "-" +
        month +
        "-" +
        day;
}


// ==================================================
// PRÜFEN, OB ZWEI DATEN GLEICH SIND
// ==================================================

function isSameCalendarDay(
    firstDate,
    secondDate
) {

    return (
        firstDate.getFullYear() ===
            secondDate.getFullYear() &&

        firstDate.getMonth() ===
            secondDate.getMonth() &&

        firstDate.getDate() ===
            secondDate.getDate()
    );
}


// ==================================================
// ZEITRAUM DER WOCHE FORMATIEREN
// ==================================================

function formatCalendarPeriod(
    startDate,
    endDate
) {

    const start =
        new Intl.DateTimeFormat(
            "de-DE",
            {
                day: "2-digit",
                month: "2-digit"
            }
        ).format(
            startDate
        );


    const end =
        new Intl.DateTimeFormat(
            "de-DE",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        ).format(
            endDate
        );


    return start +
        " – " +
        end;
}