// ==================================================
// DOGBUDDY - GESUNDHEIT & TERMINE
// ==================================================


// ==================================================
// HTML-ELEMENTE HOLEN
// ==================================================

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