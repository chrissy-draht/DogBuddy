// ==================================================
// DOGBUDDY - ENTDECKER-CHECKLISTE
// ==================================================


// ==================================================
// WOCHENPLAN - SPEICHER
// ==================================================

const WEEKLY_SELECTION_STORAGE_KEY =
    "weeklySelections";


const WEEKLY_TASK_STORAGE_KEY =
    "weeklyTasks";

// ==================================================
// ELEMENTE AUS DEM HTML HOLEN
// ==================================================

const pageDogName =
    document.getElementById("page-dog-name");

const discoveryChecklist =
    document.getElementById("discovery-checklist");

const progressSeen =
    document.getElementById("progress-seen");

const progressExperienced =
    document.getElementById("progress-experienced");

const progressRelaxed =
    document.getElementById("progress-relaxed");

// ==================================================
// MEILENSTEIN - ELEMENTE
// ==================================================

const discoveryMilestone =
    document.getElementById(
        "discovery-milestone"
    );

const discoveryMilestoneIcon =
    document.getElementById(
        "discovery-milestone-icon"
    );

const discoveryMilestoneTitle =
    document.getElementById(
        "discovery-milestone-title"
    );

const discoveryMilestoneText =
    document.getElementById(
        "discovery-milestone-text"
    );




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
// ENTDECKER-KATEGORIEN
// ==================================================

const discoveryCategories = [

    // ==================================================
    // VERKEHR & FORTBEWEGUNG
    // ==================================================

    {
        title: "🚗 Verkehr & Fortbewegung",

        items: [
            ["Auto fahren", true],
            ["Längere Autofahrt", true],
            ["Ein- und Aussteigen", false],
            ["Auto auf belebtem Parkplatz", false],
            ["Bus sehen", false],
            ["Bus fahren", false],
            ["Zug sehen", false],
            ["Zug fahren", false],
            ["Bahnhof", false],
            ["Bahnsteig", false],
            ["Einfahrender Zug", false],
            ["Fahrrad", true],
            ["E-Bike", false],
            ["Lastenrad", true],
            ["Motorrad", false],
            ["Roller", true],
            ["Kinderwagen", true],
            ["Rollstuhl", false],
            ["Einkaufswagen", true],
            ["Traktor", true],
            ["LKW", true],
            ["Baustellenfahrzeuge", false],
            ["Straßenverkehr", true],
            ["Stark befahrene Straße", true],
            ["Fußgängerampel", true],
            ["Unterführung", false],
            ["Brücke", false],

            // Ergänzungen
            ["Fahrradklingel", false],
            ["Schranke", false],
            ["Tunnel", false],
            ["Rückwärtsfahrendes Fahrzeug mit Warnton", false]
        ]
    },


    // ==================================================
    // GEBÄUDE & ÖFFENTLICHE ORTE
    // ==================================================

    {
        title: "🏙️ Gebäude & öffentliche Orte",

        items: [
            ["Café", false],
            ["Restaurant", false],
            ["Biergarten", false],
            ["Geschäft, in dem Hunde erlaubt sind", false],
            ["Einkaufszentrum", false],
            ["Tierbedarfsladen", true],
            ["Hotel / Ferienwohnung", false],
            ["Tierarztpraxis ohne Behandlung", false],
            ["Hundeschule", false],
            ["Bahnhof", false],
            ["Wartebereich", false],
            ["Öffentliche Toilette / Vorraum", false],
            ["Parkhaus", false],
            ["Tiefgarage", false],
            ["Tankstelle", false],
            ["Belebte Fußgängerzone", false],
            ["Wochenmarkt", false],

            // Ergänzungen
            ["Spielplatz auf Abstand", false],
            ["Sportplatz", false],
            ["Veranstaltung / Fest auf Abstand", false]
        ]
    },


    // ==================================================
    // DINGE IN GEBÄUDEN
    // ==================================================

    {
        title: "🛗 Dinge in Gebäuden",

        items: [
            ["Aufzug", false],
            ["Aufzugtüren", false],
            ["Treppen", true],
            ["Offene Treppen", false],
            ["Gittertreppen", false],
            ["Automatische Türen", true],
            ["Schiebetüren", false],
            ["Schwere Türen", true],
            ["Glastüren", true],
            ["Drehkreuz", false],
            ["Enge Räume", false],
            ["Langer Flur", false]
        ]
    },


    // ==================================================
    // UNTERSCHIEDLICHE MENSCHEN
    // ==================================================

    {
        title: "👨‍👩‍👧‍👦 Unterschiedliche Menschen",

        items: [
            ["Männer", true],
            ["Frauen", true],
            ["Kinder", true],
            ["Kleinkinder", true],
            ["Babys", false],
            ["Jugendliche", true],
            ["Ältere Menschen", false],
            ["Große Menschen", true],
            ["Menschen mit Bart", false],
            ["Menschen mit Kapuze", false],
            ["Menschen mit Hut", true],
            ["Menschen mit Sonnenbrille", true],
            ["Menschen mit Regenschirm", false],
            ["Menschen mit Rucksack", true],
            ["Menschen mit Wanderstöcken", false],
            ["Menschen mit Krücken", false],
            ["Menschen im Rollstuhl", false],
            ["Menschen mit Rollator", false],
            ["Jogger", true],
            ["Schnelle Läufer", true],
            ["Menschen, die laut lachen / rufen", true],
            ["Menschen in Arbeitskleidung", true],
            ["Post- / Paketboten", true],

            // Ergänzungen
            ["Menschen mit Helm", false],
            ["Menschen mit Warnweste", false],
            ["Menschen mit Koffer", false],
            ["Menschen mit großen Taschen", false],
            ["Menschen, die auf dem Boden sitzen", false],
            ["Menschen, die auf dem Boden liegen", false]
        ]
    },


    // ==================================================
    // TIERE
    // ==================================================

    {
        title: "🐕 Tiere",

        items: [
            ["Ruhiger erwachsener Hund", true],
            ["Kleiner Hund", true],
            ["Großer Hund", true],
            ["Welpen", true],
            ["Ältere Hunde", true],
            ["Hunde verschiedener Felltypen", true],
            ["Bellender Hund auf Entfernung", false],
            ["Hund hinter einem Zaun", false],
            ["Katze", true],
            ["Pferd", false],
            ["Kühe", false],
            ["Schafe", false],
            ["Ziegen", false],
            ["Hühner", false],
            ["Enten", false],
            ["Schwäne", false],
            ["Wildtiere auf Entfernung", false],

            // Ergänzungen
            ["Pferd mit Reiter", false],
            ["Pferd hinter einem Zaun", false],
            ["Kühe mit Glocken", false],
            ["Vögel, die plötzlich auffliegen", false],
            ["Eichhörnchen", false]
        ]
    },


    // ==================================================
    // NATUR & UMGEBUNG
    // ==================================================

    {
        title: "🌲 Natur & Umgebung",

        items: [
            ["Wald", false],
            ["Wiese", true],
            ["Feld", true],
            ["See", true],
            ["Bach", false],
            ["Fluss", false],
            ["Berge", false],
            ["Strand / Kiesufer", false],
            ["Waldweg", true],
            ["Schmaler Wanderweg", false],
            ["Steigung", true],
            ["Gefälle", true],
            ["Brücke über Wasser", false],
            ["Steg", false],
            ["Bootssteg", false],
            ["Boot", false],
            ["Wasser mit kleinen Wellen", true],
            ["Seichtes Wasser", true],
            ["Regen", true],
            ["Wind", false],
            ["Schnee", false],
            ["Dunkelheit", true],
            ["Nebel", false],

            // Ergänzungen
            ["Pfützen", false],
            ["Hohes Gras", false],
            ["Wurzeln", false],
            ["Felsen", false],
            ["Raschelndes Laub", false],
            ["Fließendes Wasser", false],
            ["Stärkerer Wind", false],
            ["Dämmerung", false]
        ]
    },


    // ==================================================
    // UNTERSCHIEDLICHE UNTERGRÜNDE
    // ==================================================

    {
        title: "👣 Unterschiedliche Untergründe",

        items: [
            ["Gras", true],
            ["Erde", true],
            ["Sand", false],
            ["Kies", true],
            ["Schotter", true],
            ["Asphalt", true],
            ["Pflastersteine", true],
            ["Fliesen", true],
            ["Laminat / Parkett", true],
            ["Teppich", true],
            ["Nasser Boden", true],
            ["Schlamm", false],
            ["Laub", true],
            ["Holz", true],
            ["Holzsteg", false],
            ["Metall", true],
            ["Gitter", true],
            ["Gummimatte", true],
            ["Plane", true],
            ["Wackeliger Untergrund", true],
            ["Niedrige Rampe", true],

            // Ergänzungen
            ["Gullydeckel", false],
            ["Metallplatte", false],
            ["Rutschiger Boden", false],
            ["Nasse Fliesen", false],
            ["Große Steine", false],
            ["Baumstamm", false],
            ["Wackelige Platte / Wippe", false]
        ]
    },


    // ==================================================
    // GERÄUSCHE
    // ==================================================

    {
        title: "🔊 Geräusche",

        items: [
            ["Staubsauger", true],
            ["Föhn", true],
            ["Waschmaschine", true],
            ["Trockner", false],
            ["Geschirrspüler", true],
            ["Mixer / Küchenmaschine", true],
            ["Kaffeemaschine", true],
            ["Türklingel", true],
            ["Telefonklingeln", true],
            ["Fernseher", true],
            ["Musik", true],
            ["Laute Stimmen", true],
            ["Kinderlärm", true],
            ["Hundegebell", true],
            ["Autohupe", true],
            ["Motorräder", true],
            ["LKW", true],
            ["Bus", false],
            ["Zug", false],
            ["Baustelle", false],
            ["Bohrmaschine", false],
            ["Rasenmäher", true],
            ["Müllabfuhr", false],
            ["Kirchenglocken", true],
            ["Gewitter", false],
            ["Feuerwerk auf Distanz", false],

            // Ergänzungen
            ["Sirene auf Entfernung", false],
            ["Martinshorn", false],
            ["Klappernde Einkaufswagen", false],
            ["Scheppernde Gegenstände", false],
            ["Herunterfallender Gegenstand", false],
            ["Quietschende Türen", false],
            ["Fahrradklingel", false],
            ["Babygeschrei", false],
            ["Jubel / Applaus", false]
        ]
    },


    // ==================================================
    // ALLTAG ZU HAUSE
    // ==================================================

    {
        title: "🏠 Alltag zu Hause",

        items: [
            ["Staubsaugen", true],
            ["Boden wischen", true],
            ["Kochen", true],
            ["Besuch kommt", true],
            ["Mehrere Besucher gleichzeitig", true],
            ["Türklingel", true],
            ["Paketbote", true],
            ["Menschen umarmen sich", true],
            ["Jemand trägt große Gegenstände", true],
            ["Regenschirm wird geöffnet", false],
            ["Jacke wird ausgeschüttelt", true],
            ["Möbel werden bewegt", true],
            ["Alleine in einem Raum bleiben", false],
            ["Ruhe, obwohl Menschen sich bewegen", false],
            ["Menschen essen, ohne dass Major beteiligt ist", false],
            ["Homeoffice / Menschen arbeiten", true],
            ["Fernsehabend", true],
            ["Haushaltsgeräte laufen", true],

            // Ergänzungen
            ["Klingeln, ohne zur Tür zu stürmen", false],
            ["Warten, während eine Tür geöffnet wird", false],
            ["Menschen verlassen den Raum", false],
            ["Besucher ignorieren", false],
            ["Ruhig warten, während Menschen sprechen", false]
        ]
    },


    // ==================================================
    // ANFASSEN & PFLEGE
    // ==================================================

    {
        title: "🩺 Anfassen & Pflege",

        items: [
            ["Pfoten anfassen", true],
            ["Einzelne Zehen anfassen", true],
            ["Krallen anschauen", true],
            ["Krallen schneiden / Schleifer kennenlernen", true],
            ["Ohren anschauen", true],
            ["Ohren reinigen", false],
            ["Maul öffnen", true],
            ["Zähne anschauen", true],
            ["Zähne putzen", false],
            ["Augen anschauen", false],
            ["Bauch anfassen", true],
            ["Rute anfassen", true],
            ["Beine abtasten", true],
            ["Fell bürsten", true],
            ["Zecke kontrollieren", true],
            ["Handtuch / Abtrocknen", true],
            ["Dusche kennenlernen", true],
            ["Auf eine Waage gehen", true],
            ["Tierarzttisch", false],
            ["Fremde Person untersucht ihn", true],

            // Ergänzungen
            ["Augenbereich mit einem Tuch berühren", false],
            ["Pfoten mit einem Handtuch reinigen", false],
            ["Augentropfen simulieren", false],
            ["Fiebermessen simulieren", false],
            ["Maulkorb kennenlernen", false]
        ]
    },


    // ==================================================
    // RUHE IN SCHWIERIGEN SITUATIONEN
    // ==================================================

    {
        title: "🍽️ Ruhe in schwierigen Situationen",

        items: [
            ["Unter einem Café- / Restauranttisch liegen", false],
            ["Menschen essen neben ihm", false],
            ["Andere Hunde vorbeigehen lassen", false],
            ["Jogger vorbeilassen", false],
            ["Fahrräder vorbeilassen", false],
            ["Kinder vorbeilaufen lassen", true],
            ["Wild beobachten, ohne hinterherzugehen", false],
            ["Warten", false],
            ["Auf seiner Decke entspannen", false],
            ["Draußen nichts tun", true],
            ["An einem belebten Ort einfach beobachten", false],
            ["Trotz Ablenkung ansprechbar sein", false],

            // Ergänzungen
            ["Ruhig im Auto warten", false],
            ["Besucher ruhig beobachten", false],
            ["Ruhe nach einer aufregenden Situation finden", false]
        ]
    },


    // ==================================================
    // MAJORS ZUKÜNFTIGER ALLTAG
    // ==================================================

    {
        title: "🏔️ Majors zukünftiger Alltag",

        items: [
            ["Chiemsee kennenlernen", true],
            ["Freiwillig ins Wasser gehen", true],
            ["Schwimmen", false],
            ["Boot kennenlernen", false],
            ["Boot fahren", false],
            ["Schwimmweste tragen", false],
            ["Bergumgebung kennenlernen", false],
            ["Wanderer vorbeilassen", false],
            ["Wanderstöcke kennenlernen", false],
            ["Mountainbikes vorbeilassen", false],
            ["Kühe auf sicherer Entfernung sehen", false],
            ["Berghütte", false],
            ["Gondel / Seilbahn", false],
            ["Urlaub", false],
            ["Fremde Unterkunft", false],
            ["Restaurant im Urlaub", false],
            ["Längere Autofahrt", true],

            // Ergänzungen
            ["Parkplatz am Wandergebiet", false],
            ["Schmaler Weg mit Gegenverkehr", false],
            ["Ausflugslokal nach einer Wanderung", false],
            ["Gondelstation von außen", false]
        ]
    },


    // ==================================================
    // BESONDERS WICHTIGE FÄHIGKEITEN
    // ==================================================

    {
        title: "⭐ Besonders wichtige Fähigkeiten",

        items: [
            ["Name bedeutet „Schau zu uns“", true],
            ["Sicherer Rückruf wird aufgebaut", true],
            ["Geschirr ruhig anziehen lassen", true],
            ["Halsband anziehen lassen", true],
            ["Leine akzeptieren", true],
            ["Ruhe auf einer Decke", false],
            ["Futter und Gegenstände abgeben", false],
            ["Tauschen", false],
            ["Kurze Trennung von Chrissy und Maik", false],
            ["Autofahren und anschließend entspannen", false],
            ["Alleine bleiben lernen", false],
            ["Frust aushalten lernen", false],
            ["Warten können", false],
            ["Nicht jeden Menschen begrüßen müssen", false],
            ["Nicht jeden Hund begrüßen müssen", false],
            ["Ruhe trotz Action", false]
        ]
    }

];


// ==================================================
// GESPEICHERTE CHECKLISTE LADEN
// ==================================================

const savedDiscovery =
    localStorage.getItem(
        "discoveryChecklist"
    );

let discoveryState = {};


// Wenn bereits Daten vorhanden sind,
// werden diese wieder geladen.

if (savedDiscovery !== null) {

    discoveryState =
        JSON.parse(savedDiscovery);
}


// ==================================================
// STARTWERTE ERSTELLEN
// ==================================================

discoveryCategories.forEach(
    function (category) {

        category.items.forEach(
            function (item) {

                const itemName = item[0];
                const alreadyKnown = item[1];

                // Für jeden Eintrag brauchen wir
                // einen eindeutigen Schlüssel.
                const key =
                    category.title +
                    "|" +
                    itemName;


                // Nur wenn dieser Punkt noch nie
                // gespeichert wurde, setzen wir
                // den Startwert.
                //
                // Dadurch werden später gesetzte
                // oder entfernte Haken NICHT
                // überschrieben.

                if (
                    discoveryState[key] ===
                    undefined
                ) {

                    discoveryState[key] = {

                        // Die Punkte mit "ü"
                        // wurden bereits erlebt.
                        seen: alreadyKnown,

                        experienced:
                            alreadyKnown,

                        // Entspannt setzen wir
                        // bewusst nicht automatisch.
                        relaxed: false
                    };
                }
            }
        );
    }
);


// Startwerte speichern
saveDiscoveryState();


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
// CHECKLISTE ANZEIGEN
// ==================================================

displayDiscoveryChecklist();


// ==================================================
// CHECKLISTE ERSTELLEN
// ==================================================

function displayDiscoveryChecklist() {

    // Alten Inhalt entfernen
    discoveryChecklist.innerHTML = "";


    discoveryCategories.forEach(
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


            const categoryTitle =
                document.createElement(
                    "h2"
                );

            categoryTitle.textContent =
                category.title;


            const categoryRight =
                document.createElement(
                    "div"
                );

            categoryRight.classList.add(
                "discovery-category-right"
            );


            // Fortschritt der Kategorie
            const categoryProgress =
                document.createElement(
                    "span"
                );

            categoryProgress.classList.add(
                "discovery-category-progress"
            );

            categoryProgress.textContent =
                getCategoryProgress(
                    category
                );


            // Pfeil
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


            // Überschrift über den drei Spalten
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
            // EINZELNE ERFAHRUNGEN
            // ==================================================

            category.items.forEach(
                function (item) {

                    const itemName =
                        item[0];

                    const key =
                        category.title +
                        "|" +
                        itemName;


                    const row =
                        document.createElement(
                            "div"
                        );

                    row.classList.add(
                        "discovery-row"
                    );


                    // Name der Erfahrung
                    const name =
                        document.createElement(
                            "span"
                        );

                    name.classList.add(
                        "discovery-item-name"
                    );

                    name.textContent =
                        itemName;

                    row.appendChild(name);


                    // 👀 kennengelernt
                    row.appendChild(
                        createDiscoveryCheckbox(
                            key,
                            "seen",
                            "👀"
                        )
                    );


                    // 🐾 selbst erlebt
                    row.appendChild(
                        createDiscoveryCheckbox(
                            key,
                            "experienced",
                            "🐾"
                        )
                    );


                    // 😌 entspannt
                    row.appendChild(
                        createDiscoveryCheckbox(
                            key,
                            "relaxed",
                            "😌"
                        )
                    );


                    // ==================================================
                    // 📅 DIESE WOCHE
                    // ==================================================

                    row.appendChild(
                        createWeeklyDiscoveryButton(
                            category,
                            itemName
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

            discoveryChecklist.appendChild(
                categoryCard
            );
        }
    );


    // Gesamtfortschritt aktualisieren
    updateDiscoveryProgress();
}


// ==================================================
// CHECKBOX ERSTELLEN
// ==================================================

function createDiscoveryCheckbox(
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
    updateDiscoveryButton(
        button,
        discoveryState[key][type]
    );


    // ==================================================
    // HAKEN SETZEN ODER ENTFERNEN
    // ==================================================

    button.addEventListener(
        "click",
        function (event) {

            // Verhindert, dass andere
            // Klick-Events ausgelöst werden.
            event.stopPropagation();


            // true wird false
            // false wird true
            discoveryState[key][type] =
                !discoveryState[key][type];


            // Button optisch aktualisieren
            updateDiscoveryButton(
                button,
                discoveryState[key][type]
            );


            // Speichern
            saveDiscoveryState();


            // Fortschritt neu berechnen
            updateDiscoveryProgress();


            // Fortschrittszahlen in den
            // Kategorien ebenfalls erneuern
            updateCategoryProgressTexts();
        }
    );


    return button;
}


// ==================================================
// WOCHENPLAN-BUTTON ERSTELLEN
// ==================================================

function createWeeklyDiscoveryButton(
    category,
    itemName
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
        category.title +
        "|" +
        itemName;


    // ==================================================
    // PRÜFEN, OB BEREITS AUSGEWÄHLT
    // ==================================================

    const isSelected =
        weeklySelections.discoveries.some(
            function (entry) {

                return (
                    entry.id ===
                    weeklyId
                );
            }
        );


    updateWeeklyDiscoveryButton(
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
                weeklySelections.discoveries.findIndex(
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

                weeklySelections.discoveries.splice(
                    existingIndex,
                    1
                );

                updateWeeklyDiscoveryButton(
                    button,
                    false
                );

            } else {

                // ==================================================
                // NOCH NICHT AUSGEWÄHLT
                // -> ZUM WOCHENPLAN HINZUFÜGEN
                // ==================================================

                weeklySelections.discoveries.push(
                    {
                        id: weeklyId,

                        category:
                            category.title,

                        name:
                            itemName
                    }
                );

                updateWeeklyDiscoveryButton(
                    button,
                    true
                );
            }


            saveWeeklySelections();

            syncDiscoveryWithWeeklyTasks(
                weeklyId,
                category,
                itemName,
                existingIndex === -1
            );
        }
    );


    return button;
}


// ==================================================
// WOCHENPLAN-BUTTON OPTISCH AKTUALISIEREN
// ==================================================

function updateWeeklyDiscoveryButton(
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

function syncDiscoveryWithWeeklyTasks(
    weeklyId,
    category,
    itemName,
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
                        task.source === "discovery" &&
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
                        "Entdecker",

                    title:
                        itemName,

                    note:
                        category.title,

                    completed:
                        false,

                    source:
                        "discovery",

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
                        task.source === "discovery" &&
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

function updateDiscoveryButton(
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

function saveDiscoveryState() {

    localStorage.setItem(
        "discoveryChecklist",
        JSON.stringify(
            discoveryState
        )
    );
}


// ==================================================
// GESAMTFORTSCHRITT BERECHNEN
// ==================================================

function updateDiscoveryProgress() {

    let total = 0;

    let seen = 0;

    let experienced = 0;

    let relaxed = 0;


    Object.values(
        discoveryState
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


    // Prozentwerte berechnen
    const seenPercent =
        calculatePercent(
            seen,
            total
        );

    const experiencedPercent =
        calculatePercent(
            experienced,
            total
        );

    const relaxedPercent =
        calculatePercent(
            relaxed,
            total
        );


    // Im HTML anzeigen
    progressSeen.textContent =
        "👀 Kennengelernt: " + seenPercent + " %";
        
    progressExperienced.textContent =
        "🐾 Selbst erlebt: " + experiencedPercent + " %";
        
    progressRelaxed.textContent =
        "😌 Entspannt dabei: " + relaxedPercent + " %";
        
        
    // Meilenstein passend zum
    // Entdeckerfortschritt anzeigen
    updateDiscoveryMilestone(
        relaxedPercent
    );
    
    }


// ==================================================
// PROZENT BERECHNEN
// ==================================================

function calculatePercent(
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

function getCategoryProgress(
    category
) {

    let relaxedCount = 0;


    category.items.forEach(
        function (item) {

            const key =
                category.title +
                "|" +
                item[0];


            if (
                discoveryState[key]
                    .relaxed === true
            ) {

                relaxedCount++;
            }
        }
    );


    return (
        relaxedCount +
        " / " +
        category.items.length
    );
}


// ==================================================
// KATEGORIE-FORTSCHRITT AKTUALISIEREN
// ==================================================

function updateCategoryProgressTexts() {

    const progressTexts =
        document.querySelectorAll(
            ".discovery-category-progress"
        );


    discoveryCategories.forEach(
        function (
            category,
            index
        ) {

            progressTexts[
                index
            ].textContent =
                getCategoryProgress(
                    category
                );
        }
    );
}

// ==================================================
// ENTDECKER - MEILENSTEINE
// ==================================================

function updateDiscoveryMilestone(
    percent
) {

    // Unter 25 % noch keine Meldung
    if (percent < 25) {

        discoveryMilestone.classList.remove(
            "show"
        );

        return;
    }


    // ==================================================
    // 100 %
    // ==================================================

    if (percent >= 100) {

        discoveryMilestoneIcon.textContent =
            "🌕🚀";

        discoveryMilestoneTitle.textContent =
            "Mission erfüllt!";

        discoveryMilestoneText.textContent =
            "Ein kleiner Schritt für Major, ein riesiger Schritt für DogBuddy! Major ist jetzt offiziell der Neil Armstrong unter den Entdeckern.";

    }


    // ==================================================
    // 75 %
    // ==================================================

    else if (percent >= 75) {

        discoveryMilestoneIcon.textContent =
            "🚀";

        discoveryMilestoneTitle.textContent =
            "Fast schon ein Profi-Entdecker!";

        discoveryMilestoneText.textContent =
            "Nur noch ein Stück bis zur großen Entdecker-Mission.";

    }


    // ==================================================
    // 50 %
    // ==================================================

    else if (percent >= 50) {

        discoveryMilestoneIcon.textContent =
            "🧭";

        discoveryMilestoneTitle.textContent =
            "Halbzeit, Entdecker!";

        discoveryMilestoneText.textContent =
            "Major hat bereits die Hälfte seiner Abenteuer entspannt gemeistert.";

    }


    // ==================================================
    // 25 %
    // ==================================================

    else {

        discoveryMilestoneIcon.textContent =
            "🐾";

        discoveryMilestoneTitle.textContent =
            "Du bist ein echter Entdecker!";

        discoveryMilestoneText.textContent =
            "Major hat schon ein Viertel seiner Entdeckerwelt gemeistert.";
    }


    discoveryMilestone.classList.add(
        "show"
    );
}