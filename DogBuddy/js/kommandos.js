// ==================================================
// DOGBUDDY - KOMMANDO-CHECKLISTE
// ==================================================


// ==================================================
// GRUNDEINSTELLUNGEN
// ==================================================

const COMMAND_STORAGE_KEY = "commandChecklist";

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
// ELEMENTE AUS DEM HTML HOLEN
// ==================================================

const pageDogName =
    document.getElementById("page-dog-name");

const commandChecklist =
    document.getElementById("command-checklist");

const progressSeen =
    document.getElementById("progress-seen");

const progressExperienced =
    document.getElementById("progress-experienced");

const progressRelaxed =
    document.getElementById("progress-relaxed");


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

                const key =
                    category.title +
                    "|" +
                    command.name;

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

            category.commands.forEach(
                function (command) {

                    const key =
                        category.title +
                        "|" +
                        command.name;


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
                    // 👀 KENNENGELERNT
                    // ==================================================

                    row.appendChild(
                        createCommandCheckbox(
                            key,
                            "seen",
                            "👀"
                        )
                    );


                    // ==================================================
                    // 🐾 SELBST ERLEBT
                    // ==================================================

                    row.appendChild(
                        createCommandCheckbox(
                            key,
                            "experienced",
                            "🐾"
                        )
                    );


                    // ==================================================
                    // 😌 ENTSPANNT DABEI
                    // ==================================================

                    row.appendChild(
                        createCommandCheckbox(
                            key,
                            "relaxed",
                            "😌"
                        )
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


    // Für Screenreader
    button.setAttribute(
        "aria-label",
        emoji
    );


    // Aktuellen Zustand anzeigen
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


            commandState[key][type] =
                !commandState[key][type];


            updateCommandButton(
                button,
                commandState[key][type]
            );


            saveCommandState();

            updateCommandProgress();

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

    let total = 0;

    let seen = 0;

    let experienced = 0;

    let relaxed = 0;


    Object.values(
        commandState
    ).forEach(
        function (state) {

            total++;


            if (state.seen === true) {

                seen++;

            }


            if (
                state.experienced === true
            ) {

                experienced++;

            }


            if (
                state.relaxed === true
            ) {

                relaxed++;

            }

        }
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
        "👀 Kennengelernt: " +
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


    return Math.round(
        value / total * 100
    );

}


// ==================================================
// FORTSCHRITT EINER KATEGORIE
// ==================================================

function getCommandCategoryProgress(
    category
) {

    let relaxedCount = 0;


    category.commands.forEach(
        function (command) {

            const key =
                category.title +
                "|" +
                command.name;


            if (
                commandState[key] &&
                commandState[key].relaxed === true
            ) {

                relaxedCount++;

            }

        }
    );


    return (
        relaxedCount +
        " / " +
        category.commands.length
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