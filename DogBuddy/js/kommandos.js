// ==================================================
// DOGBUDDY - KOMMANDO-CHECKLISTE
// ==================================================


// ==================================================
// GRUNDEINSTELLUNGEN
// ==================================================

const COMMAND_STORAGE_KEY = "commandChecklist";

console.log("KOMMANDOS.JS NEU GELADEN", new Date().toLocaleTimeString());


// ==================================================
// BEARBEITBARE KOMMANDOS - SPEICHER
// ==================================================

const COMMAND_CUSTOMIZATION_STORAGE_KEY =
    "commandCustomizations";

const CUSTOM_COMMANDS_STORAGE_KEY =
    "customCommands";

const DELETED_COMMANDS_STORAGE_KEY =
    "deletedCommands";


// ==================================================
// WOCHENPLAN - SPEICHER
// ==================================================

const WEEKLY_SELECTION_STORAGE_KEY =
    "weeklySelections";


const WEEKLY_TASK_STORAGE_KEY =
    "weeklyTasks";


// ==================================================
// KOMMANDO-KATEGORIEN
// ==================================================

const commandCategories = [

    // ==================================================
    // SICHERHEITSKOMMANDOS
    // ==================================================

    {
        id: "sicherheit",
        title: "🔴 Wichtigste Kommandos / Sicherheitskommandos",

        commands: [

            {
                id: "hier",
                name: "Hier!",
                description: "Sofort zu uns kommen – unabhängig von Ablenkung."
            },

            {
                id: "stop",
                name: "Stop!",
                description: "Sofort stehen bleiben und nicht weiterlaufen."
            },

            {
                id: "bleib",
                name: "Bleib!",
                description: "An der aktuellen Stelle bzw. in der aktuellen Position bleiben, bis das Kommando aufgelöst wird."
            },

            {
                id: "aus",
                name: "Aus!",
                description: "Das, was er im Maul hat, sofort loslassen bzw. hergeben."
            },

            {
                id: "lass-es",
                name: "Lass es!",
                description: "Etwas gar nicht erst aufnehmen oder sich davon abwenden."
            },

            {
                id: "nein",
                name: "Nein!",
                description: "Das gerade begonnene bzw. beabsichtigte Verhalten unterlassen."
            },

            {
                id: "warte",
                name: "Warte!",
                description: "Kurz warten, bis es von uns weitergeht."
            },

            {
                id: "notfall-rueckruf",
                name: "Notfall-Rückruf",
                description: "Eigenes Signal: sofort und ohne Ausnahme zu uns kommen. Wird nur für Notfälle bzw. spezielles Training verwendet."
            }

        ]
    },


    // ==================================================
    // GRUNDKOMMANDOS
    // ==================================================

    {
        id: "grundkommandos",
        title: "🟠 Grundkommandos",

        commands: [

            {
                id: "chill",
                name: "Chill",
                description: "Hinlegen und entspannen. Er soll zur Ruhe kommen, darf aber seine Position verändern, sich auf die Seite legen, umdrehen oder auch wieder aufstehen."
            },

            {
                id: "platz",
                name: "Platz!",
                description: "Hinlegen und dort bleiben. Die Position darf erst verlassen werden, wenn das Kommando mit „Frei“ aufgelöst wird."
            },

            {
                id: "sitz",
                name: "Sitz!",
                description: "Hinsetzen."
            },

            {
                id: "fuss",
                name: "Fuß!",
                description: "Eng bei uns laufen."
            },

            {
                id: "bei-mir",
                name: "Bei mir!",
                description: "In unserer unmittelbaren Nähe bleiben."
            },

            {
                id: "schau",
                name: "Schau!",
                description: "Blickkontakt aufnehmen."
            },

            {
                id: "decke",
                name: "Decke!",
                description: "Auf die eigene Decke gehen und dort bleiben."
            },

            {
                id: "frei",
                name: "Frei!",
                description: "Freigabe – vorheriges Kommando ist beendet."
            },

            {
                id: "weiter",
                name: "Weiter!",
                description: "Wir gehen weiter."
            }

        ]
    },


    // ==================================================
    // PRAKTISCH IM ALLTAG
    // ==================================================

    {
        id: "alltag",
        title: "🟡 Praktisch im Alltag",

        commands: [

            {
                id: "langsam",
                name: "Langsam!",
                description: "Tempo reduzieren."
            },

            {
                id: "seite",
                name: "Seite!",
                description: "An den Rand bzw. zur Seite gehen."
            },

            {
                id: "zurueck",
                name: "Zurück!",
                description: "Ein Stück zurückgehen. Dreh um und komm aus dieser Richtung zurück."
            },

            {
                id: "rauf",
                name: "Rauf!",
                description: "Auf etwas hinaufgehen."
            },

            {
                id: "runter",
                name: "Runter!",
                description: "Von etwas heruntergehen."
            },

            {
                id: "rein",
                name: "Rein!",
                description: "Ins Auto, in die Box, ins Haus etc."
            },

            {
                id: "raus",
                name: "Raus!",
                description: "Herauskommen."
            },

            {
                id: "nimm",
                name: "Nimm!",
                description: "Du darfst etwas nehmen."
            },

            {
                id: "bring",
                name: "Bring!",
                description: "Gegenstand zu uns bringen."
            },

            {
                id: "such",
                name: "Such!",
                description: "Etwas mit der Nase suchen."
            },

            {
                id: "strasse",
                name: "Straße",
                description: "Vor jeder Bordsteinkante bzw. Straßenüberquerung automatisch stoppen und warten."
            }

        ]
    },


    // ==================================================
    // LÖSEN
    // ==================================================

    {
        id: "loesen",
        title: "💩 Lösen",

        commands: [

            {
                id: "pipi-machen",
                name: "Pipi machen!",
                description: "Aufforderung zum Pinkeln."
            },

            {
                id: "letzte-chance",
                name: "Letzte Chance!",
                description: "Jetzt noch einmal lösen – danach geht es rein, ins Bett oder ins Auto."
            }

        ]
    },


    // ==================================================
    // SPEZIALKOMMANDOS & TRICKS
    // ==================================================

    {
        id: "tricks",
        title: "🐒 Spezialkommandos & Tricks",

        commands: [

            {
                id: "aeffchen",
                name: "Äffchen",
                description: "Spring zu mir hoch auf den Arm – ich fange dich."
            },

            {
                id: "hopp",
                name: "Hopp",
                description: "Auf einen Gegenstand bzw. eine Erhöhung springen."
            },

            {
                id: "aua",
                name: "Aua",
                description: "Eine Pfote anheben und auf drei Beinen humpeln."
            },

            {
                id: "pfote",
                name: "Pfote",
                description: "Eine Pfote geben."
            },

            {
                id: "andere",
                name: "Andere",
                description: "Die andere Pfote geben."
            },

            {
                id: "high-five",
                name: "High Five",
                description: "Mit einer Pfote gegen die Hand schlagen."
            },

            {
                id: "high-ten",
                name: "High Ten",
                description: "Beide Pfoten gleichzeitig an die Hände."
            },

            {
                id: "winke",
                name: "Winke",
                description: "Eine Pfote heben und damit winken."
            },

            {
                id: "bitte-bitte",
                name: "Bitte bitte",
                description: "Auf dem Hinterteil sitzen und beide Vorderpfoten anheben."
            },

            {
                id: "peng",
                name: "Peng",
                description: "Auf die Seite fallen und „tot“ liegen bleiben."
            },

            {
                id: "rolle",
                name: "Rolle",
                description: "Einmal über den Rücken rollen."
            },

            {
                id: "dreh-dich",
                name: "Dreh dich",
                description: "Im Kreis drehen."
            },

            {
                id: "andere-seite",
                name: "Andere Seite",
                description: "In die andere Richtung drehen."
            },

            {
                id: "verbeugen",
                name: "Verbeugen",
                description: "Vorderkörper absenken, Hinterteil bleibt oben."
            },

            {
                id: "kriech",
                name: "Kriech",
                description: "Auf dem Bauch vorwärts kriechen."
            },

            {
                id: "slalom",
                name: "Slalom",
                description: "Während des Laufens durch meine Beine schlängeln."
            },

            {
                id: "mitte",
                name: "Mitte",
                description: "Von vorne zwischen meine Beine kommen und dort bleiben."
            },

            {
                id: "parken",
                name: "Parken",
                description: "Rückwärts zwischen meine Beine einparken."
            },

            {
                id: "rum",
                name: "Rum",
                description: "Einmal um mich herumlaufen."
            },

            {
                id: "drumherum",
                name: "Drumherum",
                description: "Einen bezeichneten Gegenstand umrunden."
            },

            {
                id: "touch",
                name: "Touch",
                description: "Mit der Nase meine Hand berühren."
            },

            {
                id: "kinn",
                name: "Kinn",
                description: "Kinn in meine Hand legen."
            },

            {
                id: "kuesschen",
                name: "Küsschen",
                description: "Mit der Schnauze bzw. Nase meine Wange berühren."
            },

            {
                id: "schaem-dich",
                name: "Schäm dich",
                description: "Eine Pfote über die Schnauze legen."
            },

            {
                id: "kuckuck",
                name: "Kuckuck",
                description: "Kopf zwischen meinen Beinen durchstecken und hochschauen."
            },

            {
                id: "sprich",
                name: "Sprich",
                description: "Einmal bzw. gezielt bellen."
            },

            {
                id: "fluestern",
                name: "Flüstern",
                description: "Sehr leise bellen."
            },

            {
                id: "ruhe",
                name: "Ruhe",
                description: "Bellen sofort beenden."
            },

            {
                id: "such-maik",
                name: "Such Maik",
                description: "Maik suchen und finden."
            },

            {
                id: "such-chrissy",
                name: "Such Chrissy",
                description: "Chrissy suchen und finden."
            },

            {
                id: "aufraeumen",
                name: "Aufräumen",
                description: "Spielzeug aufnehmen und in die Spielzeugkiste legen."
            },

            {
                id: "hol-name",
                name: "Hol [Name]",
                description: "Einen bestimmten Gegenstand anhand seines Namens holen."
            },

            {
                id: "bring-name",
                name: "Bring [Name]",
                description: "Einen bestimmten Gegenstand zu mir bringen."
            },

            {
                id: "zu",
                name: "Zu",
                description: "Tür oder Schublade mit Nase bzw. Pfote schließen."
            },

            {
                id: "auf",
                name: "Auf",
                description: "Tür oder Schublade öffnen."
            },

            {
                id: "licht",
                name: "Licht",
                description: "Lichtschalter betätigen."
            },

            {
                id: "zieh",
                name: "Zieh",
                description: "An einem Seil bzw. Gegenstand ziehen."
            },

            {
                id: "trag",
                name: "Trag",
                description: "Einen Gegenstand im Maul tragen."
            },

            {
                id: "tausch",
                name: "Tausch",
                description: "Gegenstand gegen einen anderen Gegenstand oder ein Guddie eintauschen."
            },

            {
                id: "fang",
                name: "Fang",
                description: "Geworfenen Gegenstand aus der Luft fangen."
            },

            {
                id: "nase",
                name: "Nase",
                description: "Nase gezielt irgendwo hineinstecken, zum Beispiel ins Geschirr."
            },

            {
                id: "links",
                name: "Links",
                description: "Nach links gehen bzw. drehen."
            },

            {
                id: "rechts",
                name: "Rechts",
                description: "Nach rechts gehen bzw. drehen."
            },

            {
                id: "rueckwaerts",
                name: "Rückwärts",
                description: "Mehrere Schritte rückwärtslaufen."
            },

            {
                id: "vorne",
                name: "Vorne",
                description: "Sich direkt vor mich stellen bzw. setzen."
            },

            {
                id: "hinten",
                name: "Hinten",
                description: "Sich hinter mich stellen."
            },

            {
                id: "wechsel",
                name: "Wechsel",
                description: "Von meiner linken auf die rechte Seite wechseln."
            },

            {
                id: "durch",
                name: "Durch",
                description: "Durch einen Reifen oder Tunnel laufen."
            },

            {
                id: "drueber",
                name: "Drüber",
                description: "Über einen Gegenstand steigen bzw. springen."
            },

            {
                id: "drunter",
                name: "Drunter",
                description: "Unter einem Gegenstand hindurchgehen."
            },

            {
                id: "balance",
                name: "Balance",
                description: "Mit allen vier Pfoten auf einer kleinen Fläche stehen."
            },

            {
                id: "vorne-hoch",
                name: "Vorne hoch",
                description: "Vorderpfoten auf einen Gegenstand stellen."
            },

            {
                id: "hinten-hoch",
                name: "Hinten hoch",
                description: "Hinterpfoten auf einen Gegenstand stellen."
            },

            {
                id: "kiste",
                name: "Kiste",
                description: "Mit allen vier Pfoten in eine Kiste steigen."
            },

            {
                id: "teppich",
                name: "Teppich",
                description: "Sich selbst in eine Decke bzw. Matte einrollen."
            },

            {
                id: "decke-zu",
                name: "Decke zu",
                description: "Eine Decke über sich ziehen."
            },

            {
                id: "socken",
                name: "Socken",
                description: "Socken ausziehen."
            },

            {
                id: "schuhe",
                name: "Schuhe",
                description: "Schuhe holen."
            },

            {
                id: "leine",
                name: "Leine",
                description: "Seine Leine holen."
            },

            {
                id: "tuer",
                name: "Tür",
                description: "Zu einer bestimmten Tür laufen."
            },

            {
                id: "post",
                name: "Post",
                description: "Gegenstand von einer Person zur anderen bringen."
            },

            {
                id: "handy",
                name: "Handy",
                description: "Handy suchen bzw. bringen – nur mit geeigneter Hülle."
            },

            {
                id: "wo-ist",
                name: "Wo ist …?",
                description: "Einen benannten Gegenstand suchen und anzeigen."
            },

            {
                id: "zeigs-mir",
                name: "Zeig's mir",
                description: "Zu einem gesuchten Gegenstand oder Ort führen und ihn anzeigen."
            },

            {
                id: "guck-weg",
                name: "Guck weg",
                description: "Kopf demonstrativ zur Seite drehen."
            },

            {
                id: "kopf-schief",
                name: "Kopf schief",
                description: "Kopf auf Signal zur Seite neigen."
            },

            {
                id: "ja",
                name: "Ja",
                description: "Kopfbewegung wie Nicken."
            },

            {
                id: "nein-nein",
                name: "Nein nein",
                description: "Kopf von links nach rechts bewegen."
            },

            {
                id: "bumm",
                name: "Bumm",
                description: "Auf den Rücken legen, Pfoten nach oben."
            },

            {
                id: "schlaf",
                name: "Schlaf",
                description: "Kopf ablegen und ruhig liegen."
            },

            {
                id: "foto",
                name: "Foto",
                description: "Position einnehmen und zur Kamera schauen."
            },

            {
                id: "selfie",
                name: "Selfie",
                description: "Vorderpfoten auf Schulter bzw. Arm und Kopf neben deinen."
            },

            {
                id: "umarmung",
                name: "Umarmung",
                description: "Vorderpfoten kontrolliert um dich legen."
            },

            {
                id: "toter-hund",
                name: "Toter Hund",
                description: "Komplett entspannt auf der Seite liegen bleiben."
            },

            {
                id: "schlange",
                name: "Schlange",
                description: "Rückwärts durch die Beine Slalom laufen."
            },

            {
                id: "orbit",
                name: "Orbit",
                description: "Rückwärts um dich herumlaufen."
            },

            {
                id: "pfoten-hoch",
                name: "Pfoten hoch",
                description: "Beide Vorderpfoten auf einen Gegenstand legen."
            },

            {
                id: "kreuz",
                name: "Kreuz",
                description: "Vorderpfoten im Liegen übereinanderlegen."
            },

            {
                id: "andere-kreuz",
                name: "Andere Kreuz",
                description: "Überkreuzte Pfoten wechseln."
            },

            {
                id: "nase-verstecken",
                name: "Nase verstecken",
                description: "Schnauze unter eine Pfote legen."
            },

            {
                id: "wo-ist-deine-nase",
                name: "Wo ist deine Nase?",
                description: "Nase mit der Pfote berühren."
            },

            {
                id: "glocke",
                name: "Glocke",
                description: "Eine Glocke mit Nase oder Pfote betätigen."
            },

            {
                id: "basket",
                name: "Basket",
                description: "Gegenstand gezielt in einen Korb werfen."
            },

            {
                id: "treffer",
                name: "Treffer",
                description: "Gegenstand mit Nase oder Pfote auf ein Ziel bewegen."
            }

        ]
    }

];


// ==================================================
// ANGEPASSTE SIGNALWÖRTER LADEN
// ==================================================

let commandCustomizations = {};

const savedCommandCustomizations =
    localStorage.getItem(
        COMMAND_CUSTOMIZATION_STORAGE_KEY
    );

if (savedCommandCustomizations !== null) {

    try {

        commandCustomizations =
            JSON.parse(
                savedCommandCustomizations
            );

    } catch (error) {

        commandCustomizations = {};

    }

}


// ==================================================
// EIGENE WUNSCHKOMMANDOS LADEN
// ==================================================

let customCommands = [];

const savedCustomCommands =
    localStorage.getItem(
        CUSTOM_COMMANDS_STORAGE_KEY
    );

if (savedCustomCommands !== null) {

    try {

        const parsedCustomCommands =
            JSON.parse(
                savedCustomCommands
            );

        if (Array.isArray(parsedCustomCommands)) {

            customCommands =
                parsedCustomCommands;

        }

    } catch (error) {

        customCommands = [];

    }

}


// ==================================================
// GELÖSCHTE KOMMANDOS LADEN
// ==================================================

let deletedCommands = [];

const savedDeletedCommands =
    localStorage.getItem(
        DELETED_COMMANDS_STORAGE_KEY
    );

if (savedDeletedCommands !== null) {

    try {

        const parsedDeletedCommands =
            JSON.parse(
                savedDeletedCommands
            );

        if (Array.isArray(parsedDeletedCommands)) {

            deletedCommands =
                parsedDeletedCommands;

        }

    } catch (error) {

        deletedCommands = [];

    }

}


// ==================================================
// URSPRÜNGLICHE NAMEN MERKEN
// ==================================================

commandCategories.forEach(
    function (category) {

        category.commands.forEach(
            function (command) {

                command.originalName =
                    command.name;

                const customizationKey =
                    category.id +
                    "|" +
                    command.id;

                // ==================================================
                // GESPEICHERTE ÄNDERUNGEN ÜBERNEHMEN
                // ==================================================

                const customization =
                    commandCustomizations[
                        customizationKey
                    ];
                
                
                if (
                    typeof customization === "string"
                ) {
                
                    // ==================================================
                    // ALTE SPEICHERUNG
                    //
                    // Bereits früher geänderte Signalwörter
                    // bleiben dadurch weiterhin erhalten.
                    // ==================================================
                
                    command.name =
                        customization;
                
                } else if (
                    customization &&
                    typeof customization === "object"
                ) {
                
                    // ==================================================
                    // NEUE SPEICHERUNG
                    //
                    // Signalwort und Notiz werden übernommen.
                    // ==================================================
                
                    command.name =
                        customization.name ||
                        command.name;
                
                    command.description =
                        customization.description || "";
                
                }

            }
        );

    }
);


// ==================================================
// WUNSCHKOMMANDOS ALS ERSTE KATEGORIE
// ==================================================

const customCommandCategory = {

    id: "wunschkommandos",

    title: "⭐ Wunschkommandos",

    commands: customCommands

};

commandCategories.unshift(
    customCommandCategory
);


// ==================================================
// ELEMENTE AUS DEM HTML HOLEN
// ==================================================

const pageDogName =
    document.getElementById("page-dog-name");

const commandChecklist =
    document.getElementById("command-checklist");

// ==================================================
// KOMMANDOS - POSITION DES STICKY KATEGORIEKOPFS
// ==================================================

const commandProgress =
    document.querySelector(
        ".discovery-progress"
    );

function updateCommandStickyPosition() {

    const progressHeight =
        commandProgress.offsetHeight;

    document.documentElement.style.setProperty(
        "--command-sticky-top",
        progressHeight + "px"
    );
}

updateCommandStickyPosition();

window.addEventListener(
    "resize",
    updateCommandStickyPosition
);

const progressSeen =
    document.getElementById("progress-seen");

const progressExperienced =
    document.getElementById("progress-experienced");

const progressRelaxed =
    document.getElementById("progress-relaxed");


// ==================================================
// KOMMANDO-EDITOR - ELEMENTE
// ==================================================

const addCommandButton =
    document.getElementById(
        "add-command-button"
    );

const commandEditorModal =
    document.getElementById(
        "command-editor-modal"
    );

const commandEditorTitle =
    document.getElementById(
        "command-editor-title"
    );

const commandEditorName =
    document.getElementById(
        "command-editor-name"
    );

const commandEditorNoteArea =
    document.getElementById(
        "command-editor-note-area"
    );

const commandEditorNote =
    document.getElementById(
        "command-editor-note"
    );

const commandEditorCancel =
    document.getElementById(
        "command-editor-cancel"
    );

const closeCommandEditorButton =
    document.getElementById(
        "close-command-editor"
    );

const commandEditorDelete =
    document.getElementById(
        "command-editor-delete"
    );

const commandEditorSave =
    document.getElementById(
        "command-editor-save"
    );


// ==================================================
// ÄHNLICHE KOMMANDOS - ELEMENTE
// ==================================================

const commandSuggestions =
    document.getElementById(
        "command-suggestions"
    );

const commandSuggestionsList =
    document.getElementById(
        "command-suggestions-list"
    );


let editedCommand = null;
let editedCategory = null;
let editorMode = null;


// ==================================================
// HUNDENAME AUS DEM PROFIL LADEN
// ==================================================

const savedDog =
    localStorage.getItem("dogProfile");

if (savedDog !== null) {

    const dog =
        JSON.parse(savedDog);

    if (
        dog.name &&
        pageDogName
    ) {

        pageDogName.textContent =
            dog.name;

    }

}


// ==================================================
// GESPEICHERTE KOMMANDOLISTE LADEN
// ==================================================

const savedCommands =
    localStorage.getItem(
        "commandChecklist"
    );

let commandState = {};

if (savedCommands !== null) {

    try {

        commandState =
            JSON.parse(savedCommands);

    } catch (error) {

        commandState = {};

    }

}

// ==================================================
// WOCHENPLAN-AUSWAHL LADEN
// ==================================================

const savedWeeklySelections =
    localStorage.getItem(
        WEEKLY_SELECTION_STORAGE_KEY
    );

let weeklySelections = {

    commands: [],
    discoveries: []

};


if (savedWeeklySelections !== null) {

    try {

        const parsedWeeklySelections =
            JSON.parse(
                savedWeeklySelections
            );


        if (
            parsedWeeklySelections &&
            typeof parsedWeeklySelections ===
                "object"
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
// STARTWERTE ERSTELLEN
// ==================================================

commandCategories.forEach(
    function (category) {

        category.commands.forEach(
            function (command) {

                // ==================================================
                // GELÖSCHTE KOMMANDOS ÜBERSPRINGEN
                // ==================================================

                const deletedCommandId =
                    category.id +
                    "|" +
                    command.id;

                if (
                    deletedCommands.includes(
                        deletedCommandId
                    )
                ) {
                    return;
                }

                const key =
                    getCommandStateKey(
                        category,
                        command
                    );

                if (
                    commandState[key] ===
                    undefined
                ) {

                    commandState[key] = {

                        seen: false,
                        experienced: false,
                        relaxed: false

                    };

                }

            }
        );

    }
);


// ==================================================
// STARTWERTE SPEICHERN
// ==================================================

saveCommandState();


// ==================================================
// KOMMANDOLISTE ANZEIGEN
// ==================================================

displayCommandChecklist();


// ==================================================
// KOMMANDOLISTE ERSTELLEN
// ==================================================

function displayCommandChecklist() {

    commandChecklist.innerHTML = "";


    commandCategories.forEach(
        function (category) {


            // ==================================================
            // KATEGORIE-KARTE
            // ==================================================

            const categoryCard =
                document.createElement(
                    "section"
                );

            categoryCard.classList.add(
                "discovery-category"
            );


            // ==================================================
            // KATEGORIE-KOPF
            // ==================================================

            const categoryHeader =
                document.createElement(
                    "button"
                );

            categoryHeader.type =
                "button";

            categoryHeader.classList.add(
                "discovery-category-header"
            );


            // ==================================================
            // KATEGORIE-TITEL
            // ==================================================

            const categoryTitle =
                document.createElement(
                    "h2"
                );

            categoryTitle.textContent =
                category.title;


            // ==================================================
            // RECHTER BEREICH
            // ==================================================

            const categoryRight =
                document.createElement(
                    "div"
                );

            categoryRight.classList.add(
                "discovery-category-right"
            );


            // ==================================================
            // FORTSCHRITT DER KATEGORIE
            // ==================================================

            const categoryProgress =
                document.createElement(
                    "span"
                );

            categoryProgress.classList.add(
                "discovery-category-progress"
            );

            categoryProgress.textContent =
                getCommandCategoryProgress(
                    category
                );


            // ==================================================
            // AUFKLAPP-PFEIL
            // ==================================================

            const categoryArrow =
                document.createElement(
                    "span"
                );

            categoryArrow.classList.add(
                "discovery-category-arrow"
            );

            categoryArrow.textContent =
                "⌄";


            categoryRight.appendChild(
                categoryProgress
            );

            categoryRight.appendChild(
                categoryArrow
            );


            categoryHeader.appendChild(
                categoryTitle
            );

            categoryHeader.appendChild(
                categoryRight
            );


            // ==================================================
            // INHALT DER KATEGORIE
            // ==================================================

            const categoryContent =
                document.createElement(
                    "div"
                );

            categoryContent.classList.add(
                "discovery-category-content"
            );


            // ==================================================
            // ÜBERSCHRIFT DER DREI SPALTEN
            // ==================================================

            // ==================================================
            // ÜBERSCHRIFT DER SPALTEN
            // ==================================================

            const columnHeader =
                document.createElement(
                    "div"
                );
            
            columnHeader.classList.add(
                "discovery-column-header"
            );

            columnHeader.innerHTML = `
                <span></span>
                <span>👀</span>
                <span>🐾</span>
                <span>😌</span>
                <span class="weekly-column-icon">📅</span>
            `;

            categoryContent.appendChild(
                columnHeader
            );


            // ==================================================
            // EINZELNE KOMMANDOS
            // ==================================================

            [...category.commands]
                .sort(
                    function (a, b) {
                    
                        return a.name.localeCompare(
                            b.name,
                            "de",
                            {
                                sensitivity: "base"
                            }
                        );
                    
                    }
                )
                .forEach(
                    function (command) {
                
                    const deletedCommandId =
                        category.id +
                        "|" +
                        command.id;
                
                    if (
                        deletedCommands.includes(
                            deletedCommandId
                        )
                    ) {
                    
                        return;
                    
                    }
                
                    const key =
                        getCommandStateKey(
                            category,
                            command
                        );


                    const row =
                        document.createElement(
                            "div"
                        );

                    row.classList.add(
                        "discovery-row"
                    );


                    // ==================================================
                    // KOMMANDO UND BESCHREIBUNG
                    // ==================================================

                    const nameArea =
                        document.createElement(
                            "div"
                        );

                    nameArea.classList.add(
                        "command-item-text"
                    );


                    const name =
                        document.createElement(
                            "strong"
                        );

                    name.classList.add(
                        "discovery-item-name"
                    );

                    name.textContent =
                        command.name;

                    name.dataset.commandId =
                        command.id;

                    name.dataset.categoryId =
                        category.id;

                    // ==================================================
                    // KOMMANDO BEARBEITEN
                    // ==================================================

                    name.classList.add(
                        "editable-command-name"
                    );

                    name.title =
                        "Kommando bearbeiten";

                    name.addEventListener(
                        "click",
                        function (event) {
                        
                            event.stopPropagation();
                        
                            openCommandEditor(
                                category,
                                command
                            );
                        
                        }
                    );


                    const description =
                        document.createElement(
                            "small"
                        );

                    description.classList.add(
                        "command-description"
                    );

                    description.textContent =
                        command.description;


                    nameArea.appendChild(
                        name
                    );

                    nameArea.appendChild(
                        description
                    );

                    row.appendChild(
                        nameArea
                    );


                    // ==================================================
                    // FORTSCHRITT - 👀 🐾 😌
                    // ==================================================

                    const seenButton =
                        createCommandCheckbox(
                            key,
                            "seen",
                            "👀"
                        );
                    
                    const experiencedButton =
                        createCommandCheckbox(
                            key,
                            "experienced",
                            "🐾"
                        );
                    
                    const relaxedButton =
                        createCommandCheckbox(
                            key,
                            "relaxed",
                            "😌"
                        );
                    
                    
                    // Die drei Buttons gehören zusammen.
                    // Dadurch können bei einem Klick alle drei
                    // aktualisiert werden, ohne die Kategorie
                    // neu aufzubauen.
                    
                    const progressButtons = {
                        seen: seenButton,
                        experienced: experiencedButton,
                        relaxed: relaxedButton
                    };


                    seenButton.progressButtons =
                        progressButtons;

                    experiencedButton.progressButtons =
                        progressButtons;

                    relaxedButton.progressButtons =
                        progressButtons;


                    row.appendChild(
                        seenButton
                    );

                    row.appendChild(
                        experiencedButton
                    );

                    row.appendChild(
                        relaxedButton
                    );


            // ==================================================
            // 📅 DIESE WOCHE
            // ==================================================

            row.appendChild(
                createWeeklyCommandButton(
                    category,
                    command
                )
            );


            categoryContent.appendChild(
                row
            );

                    }
                );



            // ==================================================
            // AUF- UND ZUKLAPPEN
            // ==================================================

            categoryHeader.addEventListener(
                "click",
                function () {

                    categoryCard.classList.toggle(
                        "open"
                    );

                }
            );


            categoryCard.appendChild(
                categoryHeader
            );

            categoryCard.appendChild(
                categoryContent
            );

            commandChecklist.appendChild(
                categoryCard
            );

        }
    );


    // ==================================================
    // GESAMTFORTSCHRITT
    // ==================================================

    updateCommandProgress();

}


// ==================================================
// CHECKBOX ERSTELLEN
// ==================================================

function createCommandCheckbox(
    key,
    type,
    emoji
) {

    const button =
        document.createElement(
            "button"
        );

    button.type =
        "button";

    button.classList.add(
        "discovery-check-button"
    );


    // ==================================================
    // FÜR SCREENREADER
    // ==================================================

    button.setAttribute(
        "aria-label",
        emoji
    );


    // ==================================================
    // AKTUELLEN ZUSTAND ANZEIGEN
    // ==================================================

    updateCommandButton(
        button,
        commandState[key][type]
    );


    // ==================================================
    // HAKEN SETZEN ODER ENTFERNEN
    // ==================================================

    button.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            // ==================================================
            // 👀 GESEHEN
            // ==================================================

            if (type === "seen") {

                if (
                    commandState[key].seen ===
                    true
                ) {

                    commandState[key].seen =
                        false;

                    commandState[key].experienced =
                        false;

                    commandState[key].relaxed =
                        false;

                } else {

                    commandState[key].seen =
                        true;
                }
            }


            // ==================================================
            // 🐾 SELBST ERLEBT
            // ==================================================

            else if (
                type === "experienced"
            ) {

                if (
                    commandState[key].experienced ===
                    true
                ) {

                    commandState[key].experienced =
                        false;

                    commandState[key].relaxed =
                        false;

                } else {

                    commandState[key].seen =
                        true;

                    commandState[key].experienced =
                        true;
                }
            }


            // ==================================================
            // 😌 ENTSPANNT DABEI
            // ==================================================

            else if (
                type === "relaxed"
            ) {

                if (
                    commandState[key].relaxed ===
                    true
                ) {

                    commandState[key].relaxed =
                        false;

                } else {

                    commandState[key].seen =
                        true;

                    commandState[key].experienced =
                        true;

                    commandState[key].relaxed =
                        true;
                }
            }


            // ==================================================
            // SPEICHERN
            // ==================================================

            saveCommandState();


            // ==================================================
            // NUR DIE DREI BUTTONS AKTUALISIEREN
            // ==================================================

            if (button.progressButtons) {

                updateCommandButton(
                    button.progressButtons.seen,
                    commandState[key].seen
                );

                updateCommandButton(
                    button.progressButtons.experienced,
                    commandState[key].experienced
                );

                updateCommandButton(
                    button.progressButtons.relaxed,
                    commandState[key].relaxed
                );
            }


            // ==================================================
            // FORTSCHRITT AKTUALISIEREN
            // ==================================================

            updateCommandProgress();


            // ==================================================
            // FORTSCHRITT FÜR ERFOLGE ERMITTELN
            //
            // Die Erfolgsprüfung wird nach jeder Änderung
            // eines Fortschrittshakens ausgeführt.
            //
            // Das ist wichtig, weil beim Entfernen von 👀 oder 🐾
            // auch 😌 automatisch entfernt werden kann.
            //
            // Für die Erfolge werden nur aktuell vorhandene
            // Kommandos gezählt.
            // Gelöschte Kommandos werden nicht berücksichtigt.
            // ==================================================

            let relaxedCount = 0;
            let totalCount = 0;

            commandCategories.forEach(
                function (category) {
                
                    category.commands.forEach(
                        function (command) {
                        
                            const deletedCommandId =
                                category.id +
                                "|" +
                                command.id;
                        
                        
                            // ==================================================
                            // GELÖSCHTE KOMMANDOS ÜBERSPRINGEN
                            // ==================================================
                        
                            if (
                                deletedCommands.includes(
                                    deletedCommandId
                                )
                            ) {
                            
                                return;
                            
                            }
                        
                        
                            // ==================================================
                            // FORTSCHRITTSSCHLÜSSEL HOLEN
                            // ==================================================
                        
                            const commandKey =
                                getCommandStateKey(
                                    category,
                                    command
                                );
                            
                            
                            // ==================================================
                            // NUR VORHANDENE KOMMANDOS ZÄHLEN
                            // ==================================================
                            
                            if (
                                commandState[
                                    commandKey
                                ] === undefined
                            ) {
                            
                                return;
                            
                            }
                        
                        
                            // ==================================================
                            // GESAMTMENGE ERHÖHEN
                            // ==================================================
                        
                            totalCount++;
                        
                        
                            // ==================================================
                            // 😌 ENTSPANNT DABEI ZÄHLEN
                            // ==================================================
                        
                            if (
                                commandState[
                                    commandKey
                                ].relaxed === true
                            ) {
                            
                                relaxedCount++;
                            
                            }
                        
                        }
                    );
                
                }
            );


            // ==================================================
            // KOMMANDO-ACHIEVEMENT PRÜFEN
            // ==================================================

            checkCommandAchievement(
                relaxedCount,
                totalCount
            );


            // ==================================================
            // KATEGORIE-FORTSCHRITT AKTUALISIEREN
            // ==================================================

            updateCommandCategoryProgressTexts();
        }
    );


    return button;
}


// ==================================================
// WOCHENPLAN-BUTTON ERSTELLEN
// ==================================================

function createWeeklyCommandButton(
    category,
    command
) {

    const button =
        document.createElement(
            "button"
        );

    button.type =
        "button";

    button.classList.add(
        "discovery-check-button",
        "weekly-check-button"
    );


    // ==================================================
    // EINDEUTIGE ID
    // ==================================================

    const weeklyId =
        category.id +
        "|" +
        command.id;


    // ==================================================
    // PRÜFEN, OB DAS KOMMANDO BEREITS
    // FÜR DIESE WOCHE AUSGEWÄHLT IST
    // ==================================================

    const isSelected =
        weeklySelections.commands.some(
            function (entry) {

                return (
                    entry.id ===
                    weeklyId
                );

            }
        );


    updateWeeklyCommandButton(
        button,
        isSelected
    );


    button.setAttribute(
        "aria-label",
        "Zum Wochenplan hinzufügen"
    );


    // ==================================================
    // KLICK AUF DEN KALENDER-BUTTON
    // ==================================================

    button.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            const existingIndex =
                weeklySelections.commands.findIndex(
                    function (entry) {

                        return (
                            entry.id ===
                            weeklyId
                        );

                    }
                );


            // ==================================================
            // BEREITS AUSGEWÄHLT
            // -> AUS WOCHENPLAN ENTFERNEN
            // ==================================================

            if (existingIndex !== -1) {

                weeklySelections.commands.splice(
                    existingIndex,
                    1
                );

                updateWeeklyCommandButton(
                    button,
                    false
                );

            }


            // ==================================================
            // NOCH NICHT AUSGEWÄHLT
            // -> ZUM WOCHENPLAN HINZUFÜGEN
            // ==================================================

            else {

                weeklySelections.commands.push(
                    {
                    
                        id: weeklyId,
                    
                        commandId:
                            command.id,
                    
                        categoryId:
                            category.id,
                    
                        category:
                            category.title,
                    
                        originalName:
                            command.originalName ||
                            command.name,
                    
                        name:
                            command.name,
                    
                        description:
                            command.description
                    
                    }
                );


                updateWeeklyCommandButton(
                    button,
                    true
                );

            }


            saveWeeklySelections();

            syncCommandWithWeeklyTasks(
                weeklyId,
                category,
                command,
                existingIndex === -1
            );

        }
    );


    return button;

}


// ==================================================
// WOCHENPLAN-BUTTON OPTISCH AKTUALISIEREN
// ==================================================

function updateWeeklyCommandButton(
    button,
    selected
) {

    if (selected === true) {

        button.textContent =
            "✓";

        button.classList.add(
            "checked"
        );

        button.setAttribute(
            "aria-pressed",
            "true"
        );

    } else {

        button.textContent =
            "";

        button.classList.remove(
            "checked"
        );

        button.setAttribute(
            "aria-pressed",
            "false"
        );

    }

}


// ==================================================
// WOCHENPLAN-AUSWAHL SPEICHERN
// ==================================================

function saveWeeklySelections() {

    localStorage.setItem(
        WEEKLY_SELECTION_STORAGE_KEY,
        JSON.stringify(
            weeklySelections
        )
    );

}

// ==================================================
// WOCHENAUFGABEN DIREKT AKTUALISIEREN
// ==================================================

function syncCommandWithWeeklyTasks(
    weeklyId,
    category,
    command,
    selected
) {

    const savedWeeklyTasks =
        localStorage.getItem(
            WEEKLY_TASK_STORAGE_KEY
        );

    let weeklyTasks = [];

    if (savedWeeklyTasks !== null) {

        try {

            weeklyTasks =
                JSON.parse(
                    savedWeeklyTasks
                );

        } catch (error) {

            weeklyTasks = [];

        }

    }


    // ==================================================
    // ZUM WOCHENPLAN HINZUFÜGEN
    // ==================================================

    if (selected === true) {

        const alreadyExists =
            weeklyTasks.some(
                function (task) {

                    return (
                        task.source === "command" &&
                        task.sourceId === weeklyId &&
                        task.completed === false
                    );

                }
            );


        if (alreadyExists === false) {

            weeklyTasks.push(
                {
                    id:
                        Date.now() +
                        Math.random(),
                
                    category:
                        "Kommando",
                
                    sourceCategory:
                        category.title || "",
                
                    title:
                        command.name,
                
                    note:
                        command.description || "",
                
                    completed:
                        false,
                
                    source:
                        "command",
                
                    sourceId:
                        weeklyId
                }
            );

        }

    }


    // ==================================================
    // AUS DEM WOCHENPLAN ENTFERNEN
    // ==================================================

    else {

        weeklyTasks =
            weeklyTasks.filter(
                function (task) {

                    return !(
                        task.source === "command" &&
                        task.sourceId === weeklyId &&
                        task.completed === false
                    );

                }
            );

    }


    localStorage.setItem(
        WEEKLY_TASK_STORAGE_KEY,
        JSON.stringify(
            weeklyTasks
        )
    );

}


// ==================================================
// CHECKBOX OPTISCH AKTUALISIEREN
// ==================================================

function updateCommandButton(
    button,
    checked
) {

    if (checked === true) {

        button.textContent =
            "✓";

        button.classList.add(
            "checked"
        );

        button.setAttribute(
            "aria-pressed",
            "true"
        );

    } else {

        button.textContent =
            "";

        button.classList.remove(
            "checked"
        );

        button.setAttribute(
            "aria-pressed",
            "false"
        );

    }

}


// ==================================================
// IM LOCALSTORAGE SPEICHERN
// ==================================================

function saveCommandState() {

    localStorage.setItem(
        "commandChecklist",
        JSON.stringify(
            commandState
        )
    );

}


// ==================================================
// GESAMTFORTSCHRITT BERECHNEN
// ==================================================

function updateCommandProgress() {

    // ==================================================
    // ZÄHLER VORBEREITEN
    // ==================================================

    let total = 0;

    let seen = 0;

    let experienced = 0;

    let relaxed = 0;


    // ==================================================
    // ALLE AKTUELL VORHANDENEN KOMMANDOS DURCHGEHEN
    // ==================================================

    commandCategories.forEach(
        function (category) {

            category.commands.forEach(
                function (command) {


                    // ==================================================
                    // EINDEUTIGE ID DES KOMMANDOS ERSTELLEN
                    // ==================================================

                    const deletedCommandId =
                        category.id +
                        "|" +
                        command.id;


                    // ==================================================
                    // GELÖSCHTE KOMMANDOS NICHT MITZÄHLEN
                    // ==================================================

                    if (
                        deletedCommands.includes(
                            deletedCommandId
                        )
                    ) {

                        return;

                    }


                    // ==================================================
                    // FORTSCHRITTSSCHLÜSSEL DES KOMMANDOS HOLEN
                    // ==================================================

                    const key =
                        getCommandStateKey(
                            category,
                            command
                        );


                    // ==================================================
                    // NUR KOMMANDOS MIT FORTSCHRITTSSTATUS ZÄHLEN
                    // ==================================================

                    if (
                        commandState[key] ===
                        undefined
                    ) {

                        return;

                    }


                    // ==================================================
                    // KOMMANDO ZÄHLT ZUR GESAMTMENGE
                    // ==================================================

                    total++;


                    // ==================================================
                    // 👀 GESEHEN
                    // ==================================================

                    if (
                        commandState[key].seen ===
                        true
                    ) {

                        seen++;

                    }


                    // ==================================================
                    // 🐾 SELBST ERLEBT
                    // ==================================================

                    if (
                        commandState[key].experienced ===
                        true
                    ) {

                        experienced++;

                    }


                    // ==================================================
                    // 😌 ENTSPANNT DABEI
                    // ==================================================

                    if (
                        commandState[key].relaxed ===
                        true
                    ) {

                        relaxed++;

                    }

                }
            );

        }
    );

    // ==================================================
    // AKTUELLE KOMMANDO-GESAMTZAHL SPEICHERN
    //
    // Der Wochenplan kennt die vollständige
    // Kommandoliste nicht.
    // Deshalb wird die hier korrekt berechnete
    // Gesamtzahl für den Wochenplan gespeichert.
    // ==================================================

    localStorage.setItem(
        "commandTotalCount",
        total
    );


    // ==================================================
    // PROZENTWERTE
    // ==================================================

    const seenPercent =
        calculateCommandPercent(
            seen,
            total
        );

    const experiencedPercent =
        calculateCommandPercent(
            experienced,
            total
        );

    const relaxedPercent =
        calculateCommandPercent(
            relaxed,
            total
        );


    // ==================================================
    // OBEN ANZEIGEN
    // ==================================================

    progressSeen.textContent =
        "👀 Gesehen: " +
        seenPercent +
        " %";


    progressExperienced.textContent =
        "🐾 Selbst erlebt: " +
        experiencedPercent +
        " %";


    progressRelaxed.textContent =
        "😌 Entspannt dabei: " +
        relaxedPercent +
        " %";

}


// ==================================================
// PROZENT BERECHNEN
// ==================================================

function calculateCommandPercent(
    value,
    total
) {

    if (total === 0) {

        return 0;

    }


    return Math.floor(
        value / total * 100
    );

}


// ==================================================
// FORTSCHRITT EINER KATEGORIE
// ==================================================

function getCommandCategoryProgress(
    category
) {

    // ==================================================
    // ZÄHLER VORBEREITEN
    // ==================================================

    let relaxedCount = 0;
    let totalCount = 0;


    // ==================================================
    // ALLE KOMMANDOS DER KATEGORIE DURCHGEHEN
    // ==================================================

    category.commands.forEach(
        function (command) {

            // ==================================================
            // EINDEUTIGE ID DES KOMMANDOS ERSTELLEN
            // ==================================================

            const deletedCommandId =
                category.id +
                "|" +
                command.id;


            // ==================================================
            // GELÖSCHTE KOMMANDOS NICHT MITZÄHLEN
            // ==================================================

            if (
                deletedCommands.includes(
                    deletedCommandId
                )
            ) {

                return;

            }


            // ==================================================
            // KOMMANDO ZÄHLT ZUR GESAMTMENGE
            // ==================================================

            totalCount++;


            // ==================================================
            // FORTSCHRITTSSCHLÜSSEL HOLEN
            // ==================================================

            const key =
                getCommandStateKey(
                    category,
                    command
                );


            // ==================================================
            // "ENTSPANNT DABEI" ZÄHLEN
            // ==================================================

            if (
                commandState[key] &&
                commandState[key].relaxed === true
            ) {

                relaxedCount++;

            }

        }
    );


    // ==================================================
    // ANZEIGE ZURÜCKGEBEN
    //
    // Beispiel:
    // 12 / 80
    // ==================================================

    return (
        relaxedCount +
        " / " +
        totalCount
    );

}


// ==================================================
// KATEGORIE-FORTSCHRITT AKTUALISIEREN
// ==================================================

function updateCommandCategoryProgressTexts() {

    const progressTexts =
        document.querySelectorAll(
            ".discovery-category-progress"
        );


    commandCategories.forEach(
        function (
            category,
            index
        ) {

            if (
                progressTexts[index]
            ) {

                progressTexts[
                    index
                ].textContent =
                    getCommandCategoryProgress(
                        category
                    );

            }

        }
    );

}


// ==================================================
// KOMMANDO - STABILER FORTSCHRITTS-SCHLÜSSEL
// ==================================================

function getCommandStateKey(
    category,
    command
) {

    if (
        category.id === "wunschkommandos"
    ) {

        return (
            category.title +
            "|" +
            command.id
        );

    }

    return (
        category.title +
        "|" +
        (
            command.originalName ||
            command.name
        )
    );

}


// ==================================================
// KOMMANDO-EDITOR ÖFFNEN
// ==================================================

function openCommandEditor(
    category,
    command
) {

    if (
        !commandEditorModal ||
        !commandEditorName ||
        !commandEditorTitle
    ) {

        return;

    }

    editedCategory =
        category;

    editedCommand =
        command;

    editorMode =
        category.id === "wunschkommandos"
            ? "custom"
            : "existing";


    commandEditorTitle.textContent =
        editorMode === "custom"
            ? "Wunschkommando bearbeiten"
            : "Signalwort bearbeiten";

    commandEditorSave.textContent =
        "Ändern";


    commandEditorName.value =
        command.name;


    // ==================================================
    // VORHANDENES KOMMANDO
    // ==================================================
    
    if (editorMode === "existing") {
    
        commandEditorNoteArea.hidden =
            false;
    
        commandEditorNote.value =
            command.description || "";
    
        commandEditorDelete.hidden =
            false;
    
    }
    

    // ==================================================
    // EIGENES WUNSCHKOMMANDO
    // ==================================================

    else {

        commandEditorNoteArea.hidden =
            false;

        commandEditorNote.value =
            command.description || "";

            displayCommandSuggestions();

        commandEditorDelete.hidden =
            false;

    }


    commandEditorModal.classList.add(
        "show"
    );

    commandEditorName.focus();

}


// ==================================================
// NEUES WUNSCHKOMMANDO
// ==================================================

function openNewCommandEditor() {

    editedCategory =
        customCommandCategory;

    editedCommand =
        null;

    editorMode =
        "new";


    commandEditorTitle.textContent =
        "Kommando hinzufügen";

    commandEditorSave.textContent =
        "🐾 Speichern";

    commandEditorName.value =
        "";

    commandEditorNote.value =
        "";
        if (
            commandSuggestions &&
            commandSuggestionsList
        ) {

        
    commandSuggestions.hidden =
        true;

    commandSuggestionsList.innerHTML =
        "";
}

    commandEditorNoteArea.hidden =
        false;

    commandEditorDelete.hidden =
        true;


    commandEditorModal.classList.add(
        "show"
    );

    commandEditorName.focus();

}


// ==================================================
// EDITOR SCHLIESSEN
// ==================================================

function closeCommandEditor() {

    commandEditorModal.classList.remove(
        "show"
    );

    editedCategory =
        null;

    editedCommand =
        null;

    editorMode =
        null;

}


// ==================================================
// KOMMANDO SPEICHERN
// ==================================================

function saveCommandEditor() {

    const wasNewCommand =
        editorMode === "new";

    const newName =
        commandEditorName.value.trim();

    const newNote =
        commandEditorNote.value.trim();


    if (newName === "") {

        alert(
            "Bitte gib ein Signalwort ein."
        );

        return;

    }


    // ==================================================
    // NEUES WUNSCHKOMMANDO
    // ==================================================

    if (editorMode === "new") {

        const newCommand = {

            id:
                "custom-" +
                Date.now(),

            name:
                newName,

            description:
                newNote

        };


        customCommands.push(
            newCommand
        );


        customCommandCategory.commands =
            customCommands;


        const stateKey =
            getCommandStateKey(
                customCommandCategory,
                newCommand
            );


        commandState[stateKey] = {

            seen: false,
            experienced: false,
            relaxed: false

        };


        saveCustomCommands();

        saveCommandState();

        

    }


    // ==================================================
    // VORHANDENES KOMMANDO UMBENENNEN
    // ==================================================

    else if (
        editorMode === "existing" &&
        editedCommand &&
        editedCategory
    ) {

        const customizationKey =
            editedCategory.id +
            "|" +
            editedCommand.id;


        // ==================================================
        // SIGNALWORT UND NOTIZ SPEICHERN
        // ==================================================

        commandCustomizations[
            customizationKey
        ] = {
            name: newName,
            description: newNote
        };


        // ==================================================
        // KOMMANDO DIREKT AKTUALISIEREN
        // ==================================================

        editedCommand.name =
            newName;

        editedCommand.description =
            newNote;


        // ==================================================
        // ÄNDERUNGEN SPEICHERN
        // ==================================================

        saveCommandCustomizations();


        // ==================================================
        // WOCHENPLAN EBENFALLS AKTUALISIEREN
        // ==================================================

        updateOpenWeeklyCommandName(
            editedCategory,
            editedCommand
        );

    }


    // ==================================================
    // WUNSCHKOMMANDO BEARBEITEN
    // ==================================================

    else if (
        editorMode === "custom" &&
        editedCommand
    ) {

        editedCommand.name =
            newName;

        editedCommand.description =
            newNote;


        saveCustomCommands();

        updateOpenWeeklyCommandName(
            customCommandCategory,
            editedCommand
        );

    }

    // ==================================================
    // SICHTBARES KOMMANDO DIREKT AKTUALISIEREN
    // ==================================================

    if (
        editedCommand &&
        editedCategory
    ) {

        const commandNameElement =
            document.querySelector(
                '[data-command-id="' +
                editedCommand.id +
                '"][data-category-id="' +
                editedCategory.id +
                '"]'
            );


        if (commandNameElement) {

            // ==================================================
            // SIGNALWORT DIREKT AKTUALISIEREN
            // ==================================================

            commandNameElement.textContent =
                editedCommand.name;


            // ==================================================
            // ZUGEHÖRIGE NOTIZ DIREKT AKTUALISIEREN
            // ==================================================

            const commandRow =
                commandNameElement.closest(
                    ".discovery-row"
                );

            if (commandRow) {

                const descriptionElement =
                    commandRow.querySelector(
                        ".command-description"
                    );

                if (descriptionElement) {

                    descriptionElement.textContent =
                        editedCommand.description || "";

                }

            }

        }

    }

    // ==================================================
    // ERFOLGSSTAND NACH NEUEM WUNSCHKOMMANDO
    // AKTUALISIEREN
    // ==================================================

    if (wasNewCommand === true) {

        let relaxedCount = 0;
        let totalCount = 0;

        commandCategories.forEach(
            function (category) {

                category.commands.forEach(
                    function (command) {

                        const deletedCommandId =
                            category.id +
                            "|" +
                            command.id;

                        if (
                            deletedCommands.includes(
                                deletedCommandId
                            )
                        ) {
                            return;
                        }

                        const commandKey =
                            getCommandStateKey(
                                category,
                                command
                            );

                        if (
                            commandState[
                                commandKey
                            ] === undefined
                        ) {
                            return;
                        }

                        totalCount++;

                        if (
                            commandState[
                                commandKey
                            ].relaxed === true
                        ) {
                            relaxedCount++;
                        }

                    }
                );

            }
        );

        // ==================================================
        // KOMMANDO-ACHIEVEMENT PRÜFEN
        // ==================================================

        checkCommandAchievement(
            relaxedCount,
            totalCount
        );

    }

    // ==================================================
    // NEUES WUNSCHKOMMANDO DIREKT ANZEIGEN
    // ==================================================

    if (wasNewCommand === true) {

        displayCommandChecklist();

        const customCategoryCard =
            commandChecklist.querySelector(
                ".discovery-category"
            );

        if (customCategoryCard) {

            customCategoryCard.classList.add(
                "open"
            );

        }

    }

    // ==================================================
    // EDITOR SCHLIESSEN
    // ==================================================

    closeCommandEditor();

    }


// ==================================================
// VORHANDENES KOMMANDO LÖSCHEN
// ==================================================

function deleteExistingCommand() {

    // ==================================================
    // PRÜFEN, OB WIRKLICH EIN FESTES KOMMANDO
    // BEARBEITET WIRD
    // ==================================================

    if (
        editorMode !== "existing" ||
        !editedCommand ||
        !editedCategory
    ) {

        return;

    }


    // ==================================================
    // SICHERHEITSABFRAGE VOR DEM LÖSCHEN
    // ==================================================

    const shouldDelete =
        confirm(
            "Dieses Kommando wirklich löschen?"
        );

    if (shouldDelete === false) {

        return;

    }


    // ==================================================
    // EINDEUTIGE ID DES KOMMANDOS ERSTELLEN
    //
    // Beispiel:
    // tricks|peng
    // ==================================================

    const deletedCommandId =
        editedCategory.id +
        "|" +
        editedCommand.id;


    // ==================================================
    // KOMMANDO ZUR LISTE DER GELÖSCHTEN
    // KOMMANDOS HINZUFÜGEN
    // ==================================================

    deletedCommands.push(
        deletedCommandId
    );


    // ==================================================
    // GELÖSCHTE KOMMANDOS IM LOCALSTORAGE SPEICHERN
    // ==================================================

    saveDeletedCommands();


    // ==================================================
    // PASSENDEN SCHLÜSSEL FÜR DEN FORTSCHRITT HOLEN
    // ==================================================

    const stateKey =
        getCommandStateKey(
            editedCategory,
            editedCommand
        );


    // ==================================================
    // FORTSCHRITT DES GELÖSCHTEN KOMMANDOS ENTFERNEN
    //
    // Dadurch zählt das Kommando nicht mehr bei
    // Gesehen, Selbst erlebt und Entspannt dabei mit.
    // ==================================================

    delete commandState[
        stateKey
    ];


    // ==================================================
    // NEUEN KOMMANDO-FORTSCHRITT SPEICHERN
    // ==================================================

    saveCommandState();


    // ==================================================
    // KOMMANDO AUS DEM WOCHENPLAN ENTFERNEN
    // ==================================================

    const weeklyId =
        editedCategory.id +
        "|" +
        editedCommand.id;


    // Auswahl für "Diese Woche" entfernen.

    weeklySelections.commands =
        weeklySelections.commands.filter(
            function (entry) {

                return (
                    entry.id !==
                    weeklyId
                );

            }
        );

    saveWeeklySelections();


    // Auch eine noch offene Aufgabe im Wochenplan
    // entfernen.

    syncCommandWithWeeklyTasks(
        weeklyId,
        editedCategory,
        editedCommand,
        false
    );


    // ==================================================
    // BEARBEITUNGSFENSTER SCHLIESSEN
    // ==================================================

    closeCommandEditor();


    // ==================================================
    // KOMMANDOLISTE NEU AUFBAUEN
    //
    // Das gelöschte Kommando verschwindet dadurch
    // direkt aus der sichtbaren Liste.
    // Der angezeigte Fortschritt wird ebenfalls
    // neu berechnet.
    // ==================================================

    displayCommandChecklist();


    // ==================================================
    // ERFOLGSSTAND NACH GELÖSCHTEM KOMMANDO
    // AKTUALISIEREN
    //
    // Es werden nur Kommandos gezählt,
    // die aktuell noch vorhanden sind.
    // Gelöschte Kommandos zählen nicht mehr mit.
    // ==================================================

    let relaxed = 0;
    let total = 0;

    commandCategories.forEach(
        function (category) {

            category.commands.forEach(
                function (command) {

                    const deletedCommandId =
                        category.id +
                        "|" +
                        command.id;

                    if (
                        deletedCommands.includes(
                            deletedCommandId
                        )
                    ) {
                        return;
                    }

                    const commandKey =
                        getCommandStateKey(
                            category,
                            command
                        );

                    if (
                        commandState[
                            commandKey
                        ] === undefined
                    ) {
                        return;
                    }

                    total++;

                    if (
                        commandState[
                            commandKey
                        ].relaxed === true
                    ) {
                        relaxed++;
                    }

                }
            );

        }
    );

    // ==================================================
    // KOMMANDO-ACHIEVEMENT PRÜFEN
    // ==================================================
    
    checkCommandAchievement(
        relaxed,
        total
    );

}


// ==================================================
// WUNSCHKOMMANDO LÖSCHEN
// ==================================================

function deleteCustomCommand() {

    if (
        editorMode !== "custom" ||
        !editedCommand
    ) {

        return;

    }


    const shouldDelete =
        confirm(
            "Dieses Wunschkommando wirklich löschen?"
        );


    if (shouldDelete === false) {

        return;

    }


    const weeklyId =
        customCommandCategory.id +
        "|" +
        editedCommand.id;

    const stateKey =
        getCommandStateKey(
            customCommandCategory,
            editedCommand
        );


    customCommands =
        customCommands.filter(
            function (command) {

                return (
                    command.id !==
                    editedCommand.id
                );

            }
        );


    customCommandCategory.commands =
        customCommands;


    delete commandState[
        stateKey
    ];


    // ==================================================
    // WOCHENAUSWAHL ENTFERNEN
    // ==================================================

    weeklySelections.commands =
        weeklySelections.commands.filter(
            function (entry) {

                return (
                    entry.id !==
                    weeklyId
                );

            }
        );


    // ==================================================
    // OFFENE WOCHENAUFGABE ENTFERNEN
    // ==================================================

    const savedWeeklyTasks =
        localStorage.getItem(
            WEEKLY_TASK_STORAGE_KEY
        );

    let weeklyTasks = [];


    if (savedWeeklyTasks !== null) {

        try {

            weeklyTasks =
                JSON.parse(
                    savedWeeklyTasks
                );

        } catch (error) {

            weeklyTasks = [];

        }

    }


    weeklyTasks =
        weeklyTasks.filter(
            function (task) {

                return !(
                    task.source === "command" &&
                    task.sourceId === weeklyId &&
                    task.completed === false
                );

            }
        );


    localStorage.setItem(
        WEEKLY_TASK_STORAGE_KEY,
        JSON.stringify(
            weeklyTasks
        )
    );


    saveCustomCommands();

    saveCommandState();

    saveWeeklySelections();

    closeCommandEditor();

    displayCommandChecklist();

    // ==================================================
    // ERFOLGSSTAND NACH GELÖSCHTEM WUNSCHKOMMANDO
    // AKTUALISIEREN
    // ==================================================

    let relaxedCount = 0;
    let totalCount = 0;

    commandCategories.forEach(
        function (category) {

            category.commands.forEach(
                function (command) {

                    const deletedCommandId =
                        category.id +
                        "|" +
                        command.id;

                    if (
                        deletedCommands.includes(
                            deletedCommandId
                        )
                    ) {
                        return;
                    }

                    const commandKey =
                        getCommandStateKey(
                            category,
                            command
                        );

                    if (
                        commandState[
                            commandKey
                        ] === undefined
                    ) {
                        return;
                    }

                    totalCount++;

                    if (
                        commandState[
                            commandKey
                        ].relaxed === true
                    ) {
                        relaxedCount++;
                    }

                }
            );

        }
    );

    // ==================================================
    // KOMMANDO-ACHIEVEMENT PRÜFEN
    // ==================================================

    checkCommandAchievement(
        relaxedCount,
        totalCount
    );

}


// ==================================================
// GELÖSCHTE KOMMANDOS SPEICHERN
// ==================================================

function saveDeletedCommands() {

    localStorage.setItem(
        DELETED_COMMANDS_STORAGE_KEY,
        JSON.stringify(
            deletedCommands
        )
    );

}


// ==================================================
// ANGEPASSTE SIGNALWÖRTER SPEICHERN
// ==================================================

function saveCommandCustomizations() {

    localStorage.setItem(
        COMMAND_CUSTOMIZATION_STORAGE_KEY,
        JSON.stringify(
            commandCustomizations
        )
    );

}


// ==================================================
// WUNSCHKOMMANDOS SPEICHERN
// ==================================================

function saveCustomCommands() {

    localStorage.setItem(
        CUSTOM_COMMANDS_STORAGE_KEY,
        JSON.stringify(
            customCommands
        )
    );

}


// ==================================================
// WOCHENPLAN NACH UMBENENNEN AKTUALISIEREN
// ==================================================

function updateOpenWeeklyCommandName(
    category,
    command
) {

    const weeklyId =
        category.id +
        "|" +
        command.id;


    const weeklyEntry =
        weeklySelections.commands.find(
            function (entry) {

                return (
                    entry.id ===
                    weeklyId
                );

            }
        );


    if (weeklyEntry) {

        weeklyEntry.name =
            command.name;

        weeklyEntry.description =
            command.description;

        saveWeeklySelections();

    }


    const savedWeeklyTasks =
        localStorage.getItem(
            WEEKLY_TASK_STORAGE_KEY
        );


    if (savedWeeklyTasks === null) {

        return;

    }


    let weeklyTasks = [];


    try {

        weeklyTasks =
            JSON.parse(
                savedWeeklyTasks
            );

    } catch (error) {

        return;

    }


    weeklyTasks.forEach(
        function (task) {

            if (
                task.source === "command" &&
                task.sourceId === weeklyId &&
                task.completed === false
            ) {

                task.title =
                    command.name;

                task.note =
                    command.description || "";

            }

        }
    );


    localStorage.setItem(
        WEEKLY_TASK_STORAGE_KEY,
        JSON.stringify(
            weeklyTasks
        )
    );

}


// ==================================================
// ÄHNLICHE KOMMANDOS SUCHEN
// ==================================================

function normalizeCommandText(text) {

    return String(text || "")
        .toLowerCase()
        .trim()
        .replace(/[.,!?;:()[\]{}"'/-]/g, " ")
        .replace(/\s+/g, " ");
}


// ==================================================
// ÄHNLICHKEIT PRÜFEN
// ==================================================

function commandTextsAreSimilar(
    searchText,
    existingText
) {

    const normalizedSearch =
        normalizeCommandText(
            searchText
        );

    const normalizedExisting =
        normalizeCommandText(
            existingText
        );


    if (
        normalizedSearch.length < 3 ||
        normalizedExisting.length < 3
    ) {

        return false;
    }


    // ==================================================
    // GENAUER ODER TEILWEISER TREFFER
    // ==================================================

    if (
        normalizedSearch ===
            normalizedExisting ||
        normalizedExisting.includes(
            normalizedSearch
        ) ||
        normalizedSearch.includes(
            normalizedExisting
        )
    ) {

        return true;
    }


    // ==================================================
    // GEMEINSAME WÖRTER
    // ==================================================

    const searchWords =
        normalizedSearch
            .split(" ")
            .filter(
                function (word) {

                    return (
                        word.length >= 3
                    );
                }
            );


    return searchWords.some(
        function (word) {

            return (
                normalizedExisting.includes(
                    word
                )
            );
        }
    );
}


// ==================================================
// PASSENDE KOMMANDOS FINDEN
// ==================================================

function findSimilarCommands(
    searchName,
    searchNote
) {

    const matches = [];


    commandCategories.forEach(
        function (category) {

            category.commands.forEach(
                function (command) {

                    // ==================================================
                    // GELÖSCHTE KOMMANDOS NICHT VORSCHLAGEN
                    // ==================================================

                    const deletedCommandId =
                        category.id +
                        "|" +
                        command.id;

                    if (
                        deletedCommands.includes(
                            deletedCommandId
                        )
                    ) {
                        return;
                    }

                    // ==================================================
                    // AKTUELL BEARBEITETES WUNSCHKOMMANDO
                    // NICHT MIT SICH SELBST VERGLEICHEN
                    // ==================================================

                    if (
                        editorMode === "custom" &&
                        editedCommand &&
                        command === editedCommand
                    ) {

                        return;
                    }


                    // ==================================================
                    // SIGNALWORT VERGLEICHEN
                    // ==================================================

                    const nameMatch =
                        commandTextsAreSimilar(
                            searchName,
                            command.name
                        );


                    // ==================================================
                    // NOTIZ / BESCHREIBUNG VERGLEICHEN
                    // ==================================================

                    const noteMatch =
                        commandTextsAreSimilar(
                            searchNote,
                            command.description
                        );


                    // ==================================================
                    // MINDESTENS EIN TREFFER
                    // ==================================================

                    if (
                        nameMatch === true ||
                        noteMatch === true
                    ) {

                        matches.push(
                            {
                                category:
                                    category,

                                command:
                                    command,

                                nameMatch:
                                    nameMatch,

                                noteMatch:
                                    noteMatch
                            }
                        );
                    }
                }
            );
        }
    );


    return matches;
}


// ==================================================
// WOCHENPLAN-BUTTON FÜR SUCHTREFFER
// ==================================================

function createCommandSuggestionWeeklyButton(
    category,
    command
) {

    const weeklyId =
        category.id +
        "|" +
        command.id;


    const button =
        document.createElement(
            "button"
        );

    button.type =
        "button";

    button.classList.add(
        "secondary-button",
        "discovery-suggestion-weekly-button"
    );


    // ==================================================
    // BUTTON-TEXT AKTUALISIEREN
    // ==================================================

    function updateButtonText() {

        const isSelected =
            weeklySelections.commands.some(
                function (entry) {

                    return (
                        entry.id ===
                        weeklyId
                    );
                }
            );


        button.textContent =
            isSelected
                ? "✓ Diese Woche eingeplant"
                : "📅 Für diese Woche einplanen";
    }


    updateButtonText();


    // ==================================================
    // KLICK AUF DEN BUTTON
    // ==================================================

    button.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            const existingIndex =
                weeklySelections.commands.findIndex(
                    function (entry) {

                        return (
                            entry.id ===
                            weeklyId
                        );
                    }
                );


            // ==================================================
            // BEREITS EINGEPLANT -> ENTFERNEN
            // ==================================================

            if (existingIndex !== -1) {

                weeklySelections.commands.splice(
                    existingIndex,
                    1
                );

                saveWeeklySelections();

                syncCommandWithWeeklyTasks(
                    weeklyId,
                    category,
                    command,
                    false
                );

            }


            // ==================================================
            // NOCH NICHT EINGEPLANT -> HINZUFÜGEN
            // ==================================================

            else {

                weeklySelections.commands.push(
                    {
                        id:
                            weeklyId,

                        commandId:
                            command.id,

                        categoryId:
                            category.id,

                        category:
                            category.title,

                        originalName:
                            command.originalName ||
                            command.name,

                        name:
                            command.name,

                        description:
                            command.description
                    }
                );


                saveWeeklySelections();


                syncCommandWithWeeklyTasks(
                    weeklyId,
                    category,
                    command,
                    true
                );
            }


            updateButtonText();
        }
    );


    return button;

}


// ==================================================
// ÄHNLICHE KOMMANDOS ANZEIGEN
// ==================================================

function displayCommandSuggestions() {

    // ==================================================
    // BEI FESTEN KOMMANDOS KEINE VORSCHLÄGE
    // ==================================================

    if (editorMode === "existing") {

        commandSuggestions.hidden =
            true;

        commandSuggestionsList.innerHTML =
            "";

        return;
    }


    // ==================================================
    // ÄHNLICHE KOMMANDOS SUCHEN
    // ==================================================

    const matches =
        findSimilarCommands(
            commandEditorName.value,
            commandEditorNote.value
        );


    commandSuggestionsList.innerHTML =
        "";


    if (matches.length === 0) {

        commandSuggestions.hidden =
            true;

        return;
    }


    commandSuggestions.hidden =
        false;


    matches.forEach(
        function (match) {

            const suggestion =
                document.createElement(
                    "div"
                );

            suggestion.classList.add(
                "discovery-suggestion-item"
            );


            // ==================================================
            // TEXT
            // ==================================================

            const textArea =
                document.createElement(
                    "div"
                );


            const name =
                document.createElement(
                    "strong"
                );

            name.textContent =
                match.command.name;


            const category =
                document.createElement(
                    "span"
                );

            category.classList.add(
                "discovery-suggestion-category"
            );

            category.textContent =
                match.category.title;


            textArea.appendChild(
                name
            );

            textArea.appendChild(
                category
            );


            // ==================================================
            // BESCHREIBUNG / NOTIZ
            // ==================================================

            if (
                match.command.description !== ""
            ) {

                const description =
                    document.createElement(
                        "span"
                    );

                description.classList.add(
                    "discovery-suggestion-description"
                );

                description.textContent =
                    match.command.description;


                textArea.appendChild(
                    description
                );
            }


            // ==================================================
            // WOCHENPLAN-BUTTON
            // ==================================================

            const weeklyButton =
                createCommandSuggestionWeeklyButton(
                    match.category,
                    match.command
                );


            suggestion.appendChild(
                textArea
            );

            suggestion.appendChild(
                weeklyButton
            );


            commandSuggestionsList.appendChild(
                suggestion
            );
        }
    );
}


// ==================================================
// BEIM SCHREIBEN VERGLEICHEN
// ==================================================

if (commandEditorName) {

    commandEditorName.addEventListener(
        "input",
        displayCommandSuggestions
    );
}


if (commandEditorNote) {

    commandEditorNote.addEventListener(
        "input",
        displayCommandSuggestions
    );
}


// ==================================================
// KOMMANDO-EDITOR - EVENTS
// ==================================================

if (addCommandButton) {

    addCommandButton.addEventListener(
        "click",
        openNewCommandEditor
    );

}


if (commandEditorCancel) {

    commandEditorCancel.addEventListener(
        "click",
        closeCommandEditor
    );

}


if (closeCommandEditorButton) {

    closeCommandEditorButton.addEventListener(
        "click",
        closeCommandEditor
    );

}


if (commandEditorSave) {

    commandEditorSave.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            saveCommandEditor();

        }
    );

}


if (commandEditorDelete) {

    commandEditorDelete.addEventListener(
        "click",
        function () {

            if (editorMode === "existing") {

                deleteExistingCommand();

            } else if (editorMode === "custom") {

                deleteCustomCommand();

            }

        }
    );

}


if (commandEditorModal) {

    commandEditorModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                commandEditorModal
            ) {

                closeCommandEditor();

            }

        }
    );

}