// ==================================================
// DOGBUDDY - WOCHENPLAN
// ==================================================


// ==================================================
// HTML-ELEMENTE HOLEN
// ==================================================

// Hundename in Überschrift und Beschreibung
const pageDogName =
    document.getElementById("page-dog-name");

const pageDogNameText =
    document.getElementById("page-dog-name-text");



const weeklyCategoryInput =
    document.getElementById("weekly-category");

const weeklyTitleInput =
    document.getElementById("weekly-title");

const weeklyNoteInput =
    document.getElementById("weekly-note");

const saveWeeklyTaskButton =
    document.getElementById("save-weekly-task");

const openWeeklyTasksContainer =
    document.getElementById("open-weekly-tasks");

const completedWeeklyTasksContainer =
    document.getElementById("completed-weekly-tasks");

const openWeeklyCount =
    document.getElementById("open-weekly-count");

const completedWeeklyCount =
    document.getElementById("completed-weekly-count");


// ==================================================
// POPUP-ELEMENTE
// ==================================================

const openWeeklyFormButton =
    document.getElementById("open-weekly-form");

const weeklyFormModal =
    document.getElementById("weekly-form-modal");

const closeWeeklyFormButton =
    document.getElementById("close-weekly-form");

const cancelWeeklyFormButton =
    document.getElementById("cancel-weekly-form");

const weeklyFormTitle =
    document.getElementById("weekly-form-title");


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

let weeklyTasks = [];

let editingWeeklyTaskId = null;


// ==================================================
// WOCHENAUSWAHL AUS KOMMANDOS UND ENTDECKER
// ==================================================

const WEEKLY_SELECTION_STORAGE_KEY =
    "weeklySelections";

let weeklySelections = {
    commands: [],
    discoveries: []
};


// ==================================================
// GESPEICHERTE AUFGABEN LADEN
// ==================================================

const savedWeeklyTasks =
    localStorage.getItem("weeklyTasks");


if (savedWeeklyTasks !== null) {

    weeklyTasks =
        JSON.parse(savedWeeklyTasks);
}

// ==================================================
// WOCHENAUSWAHL LADEN
// ==================================================

const savedWeeklySelections =
    localStorage.getItem(
        WEEKLY_SELECTION_STORAGE_KEY
    );

if (savedWeeklySelections !== null) {

    try {

        const parsedWeeklySelections =
            JSON.parse(
                savedWeeklySelections
            );

        if (
            parsedWeeklySelections &&
            typeof parsedWeeklySelections === "object"
        ) {

            weeklySelections = {
                commands:
                    Array.isArray(
                        parsedWeeklySelections.commands
                    )
                        ? parsedWeeklySelections.commands
                        : [],

                discoveries:
                    Array.isArray(
                        parsedWeeklySelections.discoveries
                    )
                        ? parsedWeeklySelections.discoveries
                        : []
            };
        }

    } catch (error) {

        weeklySelections = {
            commands: [],
            discoveries: []
        };
    }
}


// ==================================================
// AUSGEWÄHLTE KOMMANDOS IN DEN WOCHENPLAN ÜBERNEHMEN
// ==================================================

function syncWeeklyCommands() {

    weeklySelections.commands.forEach(
        function (command) {

            // Prüfen, ob dieses Kommando bereits
            // als OFFENE Wochenaufgabe vorhanden ist
            const alreadyExists =
                weeklyTasks.some(
                    function (task) {

                        return (
                            task.source === "command" &&
                            task.sourceId === command.id &&
                            task.completed === false
                        );
                    }
                );


            // Nur hinzufügen, wenn es noch
            // keine offene Wochenaufgabe gibt
            if (alreadyExists === false) {

                const newWeeklyTask = {

                    id:
                        Date.now() +
                        Math.random(),

                    category:
                        "Kommando",

                    title:
                        command.name,

                    note:
                        command.description || "",

                    completed:
                        false,

                    source:
                        "command",

                    sourceId:
                        command.id
                };


                weeklyTasks.push(
                    newWeeklyTask
                );
            }
        }
    );


    // Neue Wochenaufgaben speichern
    saveWeeklyTasks();
}


// ==================================================
// AUSGEWÄHLTE ENTDECKER IN DEN WOCHENPLAN ÜBERNEHMEN
// ==================================================

function syncWeeklyDiscoveries() {

    weeklySelections.discoveries.forEach(
        function (discovery) {

            // Prüfen, ob dieser Entdecker-Punkt bereits
            // als OFFENE Wochenaufgabe vorhanden ist
            const alreadyExists =
                weeklyTasks.some(
                    function (task) {

                        return (
                            task.source === "discovery" &&
                            task.sourceId === discovery.id &&
                            task.completed === false
                        );
                    }
                );


            // Nur hinzufügen, wenn noch keine
            // offene Wochenaufgabe vorhanden ist
            if (alreadyExists === false) {

                const newWeeklyTask = {

                    id:
                        Date.now() +
                        Math.random(),

                    category:
                        "Entdecker",

                    title:
                        discovery.name,

                    note:
                        discovery.category,

                    completed:
                        false,

                    source:
                        "discovery",

                    sourceId:
                        discovery.id
                };


                weeklyTasks.push(
                    newWeeklyTask
                );
            }
        }
    );


    // Wochenaufgaben speichern
    saveWeeklyTasks();
}


// ==================================================
// AUSWAHL IN DEN WOCHENPLAN ÜBERNEHMEN
// ==================================================

// Ausgewählte Kommandos übernehmen
syncWeeklyCommands();

// Ausgewählte Entdecker übernehmen
syncWeeklyDiscoveries();


// Aufgaben direkt anzeigen
displayWeeklyTasks();


// ==================================================
// POPUP ÖFFNEN - NEUE AUFGABE
// ==================================================

openWeeklyFormButton.addEventListener(
    "click",
    function () {

        // Formular zurücksetzen
        clearWeeklyForm();

        // Überschrift setzen
        weeklyFormTitle.textContent =
            "Neue Aufgabe";

        // Popup anzeigen
        openWeeklyModal();

        // Aufgabe direkt anklickbar machen
        weeklyTitleInput.focus();
    }
);


// ==================================================
// POPUP ÖFFNEN
// ==================================================

function openWeeklyModal() {

    weeklyFormModal.classList.add("show");

    document.body.style.overflow =
        "hidden";
}


// ==================================================
// POPUP SCHLIESSEN
// ==================================================

function closeWeeklyModal() {

    weeklyFormModal.classList.remove("show");

    document.body.style.overflow =
        "";

    clearWeeklyForm();
}


// ==================================================
// X OBEN RECHTS
// ==================================================

closeWeeklyFormButton.addEventListener(
    "click",
    closeWeeklyModal
);


// ==================================================
// ABBRECHEN
// ==================================================

cancelWeeklyFormButton.addEventListener(
    "click",
    closeWeeklyModal
);


// ==================================================
// KLICK AUF DUNKLEN HINTERGRUND
// ==================================================

weeklyFormModal.addEventListener(
    "click",
    function (event) {

        if (event.target === weeklyFormModal) {

            closeWeeklyModal();
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
            weeklyFormModal.classList.contains("show")
        ) {

            closeWeeklyModal();
        }
    }
);


// ==================================================
// SPEICHERN-BUTTON
// ==================================================

saveWeeklyTaskButton.addEventListener(
    "click",
    function () {

        // Eingaben holen
        const category =
            weeklyCategoryInput.value;

        const title =
            weeklyTitleInput.value.trim();

        const note =
            weeklyNoteInput.value.trim();


        // Ausgewählten Status holen
        const selectedStatus =
            document.querySelector(
                'input[name="weekly-status"]:checked'
            );


        // Ohne Aufgabe soll nichts gespeichert werden
        if (title === "") {

            alert(
                "Bitte gib zuerst eine Aufgabe ein."
            );

            weeklyTitleInput.focus();

            return;
        }


        // Status in true / false umwandeln
        const completed =
            selectedStatus.value === "completed";


        // ==================================================
        // NEUE AUFGABE
        // ==================================================

        if (editingWeeklyTaskId === null) {

            const newWeeklyTask = {

                id: Date.now(),

                category: category,

                title: title,

                note: note,

                completed: completed
            };


            weeklyTasks.push(
                newWeeklyTask
            );
        }


        // ==================================================
        // BESTEHENDE AUFGABE ÄNDERN
        // ==================================================

        else {

            const task =
                weeklyTasks.find(
                    function (weeklyTask) {

                        return weeklyTask.id ===
                            editingWeeklyTaskId;
                    }
                );


            if (task !== undefined) {

                task.category =
                    category;

                task.title =
                    title;

                task.note =
                    note;

                task.completed =
                    completed;
            }
        }


        // Speichern
        saveWeeklyTasks();


        // Liste neu anzeigen
        displayWeeklyTasks();


        // Popup schließen
        closeWeeklyModal();
    }
);


// ==================================================
// AUFGABEN IM LOCALSTORAGE SPEICHERN
// ==================================================

function saveWeeklyTasks() {

    localStorage.setItem(
        "weeklyTasks",
        JSON.stringify(weeklyTasks)
    );
}


// ==================================================
// ALLE AUFGABEN ANZEIGEN
// ==================================================

function displayWeeklyTasks() {

    // Alte Anzeige löschen
    openWeeklyTasksContainer.innerHTML =
        "";

    completedWeeklyTasksContainer.innerHTML =
        "";


    // Offene Aufgaben
    const openTasks =
        weeklyTasks.filter(
            function (task) {

                return task.completed === false;
            }
        );


    // Erledigte Aufgaben
    const completedTasks =
        weeklyTasks.filter(
            function (task) {

                return task.completed === true;
            }
        );


    // ==================================================
    // ZÄHLER AKTUALISIEREN
    // ==================================================

    openWeeklyCount.textContent =
        openTasks.length;

    completedWeeklyCount.textContent =
        completedTasks.length;


    // ==================================================
    // OFFENE AUFGABEN
    // ==================================================

    if (openTasks.length === 0) {

        openWeeklyTasksContainer.innerHTML =
            '<p class="empty-weekly">' +
            'Noch keine Aufgaben geplant.' +
            '</p>';

    } else {

        openTasks.forEach(
            function (task) {

                const taskCard =
                    createWeeklyTaskCard(
                        task
                    );

                openWeeklyTasksContainer.appendChild(
                    taskCard
                );
            }
        );
    }


    // ==================================================
    // ERLEDIGTE AUFGABEN
    // ==================================================

    if (completedTasks.length === 0) {

        completedWeeklyTasksContainer.innerHTML =
            '<p class="empty-weekly">' +
            'Noch keine Aufgabe erledigt.' +
            '</p>';

    } else {

        completedTasks.forEach(
            function (task) {

                const taskCard =
                    createWeeklyTaskCard(
                        task
                    );

                completedWeeklyTasksContainer.appendChild(
                    taskCard
                );
            }
        );
    }
}

// ==================================================
// KOMMANDO ALS ERLEDIGT VERARBEITEN
// ==================================================

function completeWeeklyCommand(task) {

    // ==================================================
    // KOMMANDO-FORTSCHRITT LADEN
    // ==================================================

    const savedCommandChecklist =
        localStorage.getItem(
            "commandChecklist"
        );

    let commandChecklist = {};

    if (savedCommandChecklist !== null) {

        try {

            commandChecklist =
                JSON.parse(
                    savedCommandChecklist
                );

        } catch (error) {

            commandChecklist = {};
        }
    }


    // ==================================================
    // AUSGEWÄHLTES KOMMANDO FINDEN
    // ==================================================

    const selectedCommand =
        weeklySelections.commands.find(
            function (command) {

                return command.id ===
                    task.sourceId;
            }
        );


    if (selectedCommand !== undefined) {

        // ==================================================
        // SCHLÜSSEL WIE IN KOMMANDOS.JS ERSTELLEN
        // ==================================================

        const commandKey =
            selectedCommand.category +
            "|" +
            selectedCommand.name;


        const commandState =
            commandChecklist[
                commandKey
            ];


        // ==================================================
        // NÄCHSTEN FORTSCHRITT SETZEN
        // 👀 -> 🐾 -> 😌
        // ==================================================

        if (commandState !== undefined) {

            if (commandState.seen !== true) {

                commandState.seen = true;

            } else if (
                commandState.experienced !== true
            ) {

                commandState.experienced = true;

            } else if (
                commandState.relaxed !== true
            ) {

                commandState.relaxed = true;
            }


            // Fortschritt speichern
            localStorage.setItem(
                "commandChecklist",
                JSON.stringify(
                    commandChecklist
                )
            );
        }
    }


    // ==================================================
    // KALENDER-AUSWAHL ENTFERNEN
    // ==================================================

    weeklySelections.commands =
        weeklySelections.commands.filter(
            function (command) {

                return command.id !==
                    task.sourceId;
            }
        );


    localStorage.setItem(
        WEEKLY_SELECTION_STORAGE_KEY,
        JSON.stringify(
            weeklySelections
        )
    );
}


// ==================================================
// ENTDECKER ALS ERLEDIGT VERARBEITEN
// ==================================================

function completeWeeklyDiscovery(task) {

    // ==================================================
    // ENTDECKER-FORTSCHRITT LADEN
    // ==================================================

    const savedDiscoveryChecklist =
        localStorage.getItem(
            "discoveryChecklist"
        );

    let discoveryChecklist = {};

    if (savedDiscoveryChecklist !== null) {

        try {

            discoveryChecklist =
                JSON.parse(
                    savedDiscoveryChecklist
                );

        } catch (error) {

            discoveryChecklist = {};
        }
    }


    // ==================================================
    // AUSGEWÄHLTEN ENTDECKER FINDEN
    // ==================================================

    const selectedDiscovery =
        weeklySelections.discoveries.find(
            function (discovery) {

                return discovery.id ===
                    task.sourceId;
            }
        );


    if (selectedDiscovery !== undefined) {

        // ==================================================
        // SCHLÜSSEL WIE IN ENTDECKER.JS
        // ==================================================

        const discoveryKey =
            selectedDiscovery.category +
            "|" +
            selectedDiscovery.name;


        const discoveryState =
            discoveryChecklist[
                discoveryKey
            ];


        // ==================================================
        // NÄCHSTEN FORTSCHRITT SETZEN
        // 👀 -> 🐾 -> 😌
        // ==================================================

        if (discoveryState !== undefined) {

            if (discoveryState.seen !== true) {

                discoveryState.seen = true;

            } else if (
                discoveryState.experienced !== true
            ) {

                discoveryState.experienced = true;

            } else if (
                discoveryState.relaxed !== true
            ) {

                discoveryState.relaxed = true;
            }


            // Fortschritt speichern
            localStorage.setItem(
                "discoveryChecklist",
                JSON.stringify(
                    discoveryChecklist
                )
            );
        }
    }


    // ==================================================
    // KALENDER-AUSWAHL ENTFERNEN
    // ==================================================

    weeklySelections.discoveries =
        weeklySelections.discoveries.filter(
            function (discovery) {

                return discovery.id !==
                    task.sourceId;
            }
        );


    localStorage.setItem(
        WEEKLY_SELECTION_STORAGE_KEY,
        JSON.stringify(
            weeklySelections
        )
    );
}


// ==================================================
// EINZELNE AUFGABENKARTE ERSTELLEN
// ==================================================

function createWeeklyTaskCard(task) {

    const article =
        document.createElement("article");

    article.classList.add(
        "weekly-task-item"
    );


    // Erledigte Aufgabe bekommt zusätzliche Klasse
    if (task.completed === true) {

        article.classList.add(
            "weekly-task-completed"
        );
    }


    // ==================================================
    // KOPFBEREICH
    // ==================================================

    const header =
        document.createElement("div");

    header.classList.add(
        "weekly-task-header"
    );


    const titleArea =
        document.createElement("div");


    // Kategorie
    const category =
        document.createElement("p");

    category.classList.add(
        "weekly-task-category"
    );

    category.textContent =
        getWeeklyCategoryIcon(
            task.category
        ) +
        " " +
        task.category;


    // Titel
    const title =
        document.createElement("h3");

    title.textContent =
        task.title;


    titleArea.appendChild(
        category
    );

    titleArea.appendChild(
        title
    );


    // Status
    const status =
        document.createElement("span");

    status.classList.add(
        "weekly-task-status"
    );


    if (task.completed === true) {

        status.textContent =
            "Erledigt";

        status.classList.add(
            "weekly-status-completed"
        );

    } else {

        status.textContent =
            "Offen";

        status.classList.add(
            "weekly-status-open"
        );
    }


    header.appendChild(
        titleArea
    );

    header.appendChild(
        status
    );

    article.appendChild(
        header
    );


    // ==================================================
    // NOTIZ
    // ==================================================

    if (
        task.note !== undefined &&
        task.note !== ""
    ) {

        const note =
            document.createElement("p");

        note.classList.add(
            "weekly-task-note"
        );

        note.textContent =
            task.note;

        article.appendChild(
            note
        );
    }


    // ==================================================
    // BUTTONBEREICH
    // ==================================================

    const buttonArea =
        document.createElement("div");

    buttonArea.classList.add(
        "weekly-task-buttons"
    );


    // ==================================================
    // ERLEDIGT / WIEDER ÖFFNEN
    // ==================================================

    const statusButton =
        document.createElement("button");

    statusButton.type =
        "button";

    statusButton.classList.add(
        "weekly-status-button"
    );


    if (task.completed === true) {

        statusButton.textContent =
            "↩ Wieder öffnen";

    } else {

        statusButton.textContent =
            "✓ Erledigt";
    }


    statusButton.addEventListener(
        "click",
        function () {

            // ==================================================
            // KOMMANDO AUS DEM KALENDER
            // ==================================================

            if (
                task.source === "command" &&
                task.completed === false
            ) {

                task.completed = true;

                completeWeeklyCommand(
                    task
                );

                saveWeeklyTasks();

                displayWeeklyTasks();

                return;
            }


            // ==================================================
            // ENTDECKER AUS DEM KALENDER
            // ==================================================
                    
            if (
                task.source === "discovery" &&
                task.completed === false
            ) {
            
                task.completed = true;
            
                completeWeeklyDiscovery(
                    task
                );
            
                saveWeeklyTasks();
            
                displayWeeklyTasks();
            
                return;
            }


            // ==================================================
            // NORMALE WOCHENAUFGABE
            // ==================================================

            task.completed =
                !task.completed;

            saveWeeklyTasks();

            displayWeeklyTasks();
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
        "weekly-edit-button"
    );

    editButton.textContent =
        "✏ Ändern";


    editButton.addEventListener(
        "click",
        function () {

            editWeeklyTask(
                task.id
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
        "weekly-delete-button"
    );

    deleteButton.textContent =
        "🗑 Löschen";


    deleteButton.addEventListener(
        "click",
        function () {

            deleteWeeklyTask(
                task.id
            );
        }
    );


    // Buttons einfügen
    buttonArea.appendChild(
        statusButton
    );

    buttonArea.appendChild(
        editButton
    );

    buttonArea.appendChild(
        deleteButton
    );


    article.appendChild(
        buttonArea
    );


    return article;
}


// ==================================================
// AUFGABE BEARBEITEN
// ==================================================

function editWeeklyTask(id) {

    const task =
        weeklyTasks.find(
            function (weeklyTask) {

                return weeklyTask.id === id;
            }
        );


    if (task === undefined) {

        return;
    }


    // Werte ins Formular schreiben
    weeklyCategoryInput.value =
        task.category;

    weeklyTitleInput.value =
        task.title;

    weeklyNoteInput.value =
        task.note || "";


    // Status setzen
    if (task.completed === true) {

        document.querySelector(
            'input[name="weekly-status"][value="completed"]'
        ).checked = true;

    } else {

        document.querySelector(
            'input[name="weekly-status"][value="open"]'
        ).checked = true;
    }


    // Merken, welche Aufgabe geändert wird
    editingWeeklyTaskId =
        id;


    // Überschrift ändern
    weeklyFormTitle.textContent =
        "Aufgabe bearbeiten";


    // Buttontext ändern
    saveWeeklyTaskButton.textContent =
        "Änderungen speichern";


    // Popup öffnen
    openWeeklyModal();


    // Cursor direkt ins Aufgabenfeld
    weeklyTitleInput.focus();
}


// ==================================================
// AUFGABE LÖSCHEN
// ==================================================

function deleteWeeklyTask(id) {

    const reallyDelete =
        confirm(
            "Möchtest du diese Aufgabe wirklich löschen?"
        );


    if (reallyDelete === false) {

        return;
    }


    weeklyTasks =
        weeklyTasks.filter(
            function (task) {

                return task.id !== id;
            }
        );


    saveWeeklyTasks();

    displayWeeklyTasks();


    // Falls gerade genau diese Aufgabe
    // bearbeitet wurde
    if (editingWeeklyTaskId === id) {

        closeWeeklyModal();
    }
}


// ==================================================
// FORMULAR LEEREN
// ==================================================

function clearWeeklyForm() {

    weeklyCategoryInput.value =
        "Training";

    weeklyTitleInput.value =
        "";

    weeklyNoteInput.value =
        "";


    document.querySelector(
        'input[name="weekly-status"][value="open"]'
    ).checked = true;


    // Bearbeitungsmodus beenden
    editingWeeklyTaskId =
        null;


    // Button wieder zurücksetzen
    saveWeeklyTaskButton.textContent =
        "Aufgabe speichern";


    // Überschrift wieder zurücksetzen
    weeklyFormTitle.textContent =
        "Neue Aufgabe";
}


// ==================================================
// ICON FÜR KATEGORIE
// ==================================================

function getWeeklyCategoryIcon(category) {

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