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
// EIGENE ENTDECKUNGEN - SPEICHER
// ==================================================

const CUSTOM_DISCOVERIES_STORAGE_KEY =
    "customDiscoveries";


// ==================================================
// ELEMENTE AUS DEM HTML HOLEN
// ==================================================

const pageDogName =
    document.getElementById("page-dog-name");

const discoveryChecklist =
    document.getElementById("discovery-checklist");

// ==================================================
// FORTSCHRITTSBEREICH FÜR STICKY HEADER
// ==================================================

const discoveryProgress =
    document.querySelector(
        ".discovery-progress"
    );

// ==================================================
// POSITION DER STICKY-KATEGORIE BERECHNEN
// ==================================================

function updateDiscoveryStickyPosition() {

    if (discoveryProgress === null) {
        return;
    }


    const progressHeight =
        discoveryProgress.offsetHeight;


    document.documentElement.style.setProperty(
        "--discovery-sticky-top",
        progressHeight + "px"
    );
}


updateDiscoveryStickyPosition();


window.addEventListener(
    "resize",
    updateDiscoveryStickyPosition
);

const progressSeen =
    document.getElementById("progress-seen");

const progressExperienced =
    document.getElementById("progress-experienced");

const progressRelaxed =
    document.getElementById("progress-relaxed");


// ==================================================
// EIGENE ENTDECKUNGEN - ELEMENTE
// ==================================================

const addDiscoveryButton =
    document.getElementById(
        "add-discovery-button"
    );

const discoveryEditorModal =
    document.getElementById(
        "discovery-editor-modal"
    );

const discoveryEditorTitle =
    document.getElementById(
        "discovery-editor-title"
    );

const discoveryEditorName =
    document.getElementById(
        "discovery-editor-name"
    );

const discoveryEditorNote =
    document.getElementById(
        "discovery-editor-note"
    );

const discoveryEditorCancel =
    document.getElementById(
        "discovery-editor-cancel"
    );

const closeDiscoveryEditorButton =
    document.getElementById(
        "close-discovery-editor"
    );

const discoveryEditorDelete =
    document.getElementById(
        "discovery-editor-delete"
    );

const discoveryEditorSave =
    document.getElementById(
        "discovery-editor-save"
    );

const discoverySuggestions =
    document.getElementById(
        "discovery-suggestions"
    );

const discoverySuggestionsList =
    document.getElementById(
        "discovery-suggestions-list"
    );


// ==================================================
// ALTER INHALT DES ENTDECKER-ERFOLGS-POPUPS
// ==================================================


// ==================================================
// ENTDECKER - ERFOLGS-POPUP
// ==================================================

const discoveryMilestone =
    document.getElementById(
        "discovery-achievement-modal"
    );

const discoveryMilestoneContent =
    discoveryMilestone.querySelector(
        ".achievement-content"
    );


// ==================================================
// ENTDECKER - NEUES ERFOLGSBILD
// ==================================================

const discoveryMilestoneImage =
    document.getElementById(
        "discovery-achievement-image"
    );


/*

// Profilbild im Erfolgs-Popup
const discoveryMilestoneProfileImage =
    document.getElementById(
        "discovery-achievement-profile-image"
    );

// Gespeichertes Profilbild laden
const savedDiscoveryProfileImage =
    localStorage.getItem(
        "dogProfileImage"
    );

if (savedDiscoveryProfileImage !== null) {

    discoveryMilestoneProfileImage.src =
        savedDiscoveryProfileImage;

} else {

    discoveryMilestoneProfileImage.src =
        "../images/profile/major-profil.png";

}

const discoveryMilestoneIcon =
    document.getElementById(
        "achievement-icon"
    );

const discoveryMilestoneTitle =
    document.getElementById(
        "achievement-title"
    );

const discoveryMilestoneText =
    document.getElementById(
        "achievement-text"
    );

const discoveryMilestonePercent =
    document.getElementById(
        "achievement-percent"
    );

*/

const closeDiscoveryMilestone =
    document.getElementById(
        "close-achievement-modal"
    );

let lastDiscoveryMilestone =
    Number(
        localStorage.getItem(
            "lastDiscoveryMilestone"
        )
    ) || 0;


// ==================================================
// HUNDENAME AUS DEM PROFIL LADEN
// ==================================================

const savedDog =
    localStorage.getItem("dogProfile");

let dogName = "Hund";

if (savedDog !== null) {

    const dog =
        JSON.parse(savedDog);

    dogName =
        dog.name;

    pageDogName.textContent =
        dogName;
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
        title: "🎯 Besonders wichtige Fähigkeiten",

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
// EIGENE ENTDECKUNGEN LADEN
// ==================================================

const savedCustomDiscoveries =
    localStorage.getItem(
        CUSTOM_DISCOVERIES_STORAGE_KEY
    );

let customDiscoveries = [];


if (savedCustomDiscoveries !== null) {

    try {

        const parsedCustomDiscoveries =
            JSON.parse(
                savedCustomDiscoveries
            );


        if (
            Array.isArray(
                parsedCustomDiscoveries
            )
        ) {

            customDiscoveries =
                parsedCustomDiscoveries;
        }

    } catch (error) {

        customDiscoveries = [];
    }
}


// ==================================================
// KATEGORIE FÜR EIGENE ENTDECKUNGEN
// ==================================================

const customDiscoveryCategory = {

    id: "eigene-entdeckungen",

    title:
        "⭐ Eigene Entdeckungen",

    custom: true,

    items:
        customDiscoveries
};

// Eigene Entdeckungen stehen immer ganz oben.
discoveryCategories.unshift(
    customDiscoveryCategory
);


// ==================================================
// ENTDECKER - HILFSFUNKTIONEN
// ==================================================

function getDiscoveryName(item) {

    if (
        typeof item === "object" &&
        !Array.isArray(item)
    ) {

        return item.name;
    }


    return item[0];
}


function getDiscoveryDescription(item) {

    if (
        typeof item === "object" &&
        !Array.isArray(item)
    ) {

        return item.description || "";
    }


    return "";
}


function getDiscoveryKey(
    category,
    item
) {

    // Eigene Entdeckungen behalten immer
    // ihre feste ID.
    //
    // Dadurch bleiben Fortschritt und
    // Wochenplan auch beim Umbenennen erhalten.

    if (category.custom === true) {

        return (
            category.title +
            "|" +
            item.id
        );
    }


    // Normale Entdeckungen verwenden
    // weiterhin ihren bisherigen Namen.

    return (
        category.title +
        "|" +
        getDiscoveryName(item)
    );
}


// ==================================================
// ENTDECKUNGEN ALPHABETISCH SORTIEREN
// ==================================================

function sortDiscoveriesAlphabetically(
    items
) {

    return [...items].sort(
        function (itemA, itemB) {

            const nameA =
                getDiscoveryName(
                    itemA
                );

            const nameB =
                getDiscoveryName(
                    itemB
                );


            return nameA.localeCompare(
                nameB,
                "de",
                {
                    sensitivity: "base"
                }
            );
        }
    );
}


// ==================================================
// EIGENE ENTDECKUNGEN IM HTML
// ALPHABETISCH SORTIEREN
// ==================================================

function sortCustomDiscoveryRows() {

    const customCategory =
        discoveryChecklist.querySelector(
            '[data-category-id="eigene-entdeckungen"]'
        );


    if (customCategory === null) {
        return;
    }


    const categoryContent =
        customCategory.querySelector(
            ".discovery-category-content"
        );


    if (categoryContent === null) {
        return;
    }


    const rows =
        Array.from(
            categoryContent.querySelectorAll(
                ".discovery-row"
            )
        );


    rows.sort(
        function (rowA, rowB) {

            const nameA =
                rowA.querySelector(
                    ".discovery-item-name"
                )?.textContent || "";

            const nameB =
                rowB.querySelector(
                    ".discovery-item-name"
                )?.textContent || "";


            return nameA.localeCompare(
                nameB,
                "de",
                {
                    sensitivity: "base"
                }
            );
        }
    );


    rows.forEach(
        function (row) {

            categoryContent.appendChild(
                row
            );
        }
    );
}


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

                const itemName =
                    getDiscoveryName(item);

                const alreadyKnown =
                    category.custom === true
                        ? false
                        : item[1];


                // Für jeden Eintrag brauchen wir
                // einen eindeutigen Schlüssel.
                const key =
                    getDiscoveryKey(
                        category,
                        item
                    );


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
            // KATEGORIE IM HTML KENNZEICHNEN
            // ==================================================

            if (category.custom === true) {
            
                categoryCard.dataset.categoryId =
                    category.id;
            }


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

            sortDiscoveriesAlphabetically(
                category.items
            ).forEach(
                function (item) {

                    const itemName =
                        getDiscoveryName(item);

                    const itemDescription =
                        getDiscoveryDescription(item);

                    const key =
                        getDiscoveryKey(
                            category,
                            item
                        );


                    const row =
                        document.createElement(
                            "div"
                        );

                    row.classList.add(
                        "discovery-row"
                    );

                    // ==================================================
                    // EIGENE ENTDECKUNG IM HTML KENNZEICHNEN
                    // ==================================================
                                    
                    if (category.custom === true) {
                    
                        row.dataset.discoveryId =
                            item.id;
                    }


                    // ==================================================
                    // NAME UND NOTIZ DER ENTDECKUNG
                    // ==================================================

                    const itemText =
                        document.createElement(
                            "div"
                        );
                    
                    itemText.classList.add(
                        "command-item-text"
                    );


                    const name =
                        document.createElement(
                            "span"
                        );
                    
                    name.classList.add(
                        "discovery-item-name"
                    );

                    name.textContent =
                        itemName;

                    // ==================================================
                    // EIGENE ENTDECKUNG BEARBEITEN
                    // ==================================================

                    if (category.custom === true) {
                    
                        name.classList.add(
                            "editable-command-name"
                        );
                    
                        name.title =
                            "Entdeckung bearbeiten";
                    
                        name.addEventListener(
                            "click",
                            function (event) {
                            
                                event.stopPropagation();
                            
                                openDiscoveryEditorForEdit(
                                    item
                                );
                            }
                        );
                    }


                    itemText.appendChild(
                        name
                    );


                    // ==================================================
                    // NOTIZ BEI EIGENEN ENTDECKUNGEN
                    // ==================================================

                    if (
                        category.custom === true &&
                        itemDescription !== ""
                    ) {
                    
                        const description =
                            document.createElement(
                                "span"
                            );
                        
                        description.classList.add(
                            "command-description"
                        );
                    
                        description.textContent =
                            itemDescription;
                    
                        itemText.appendChild(
                            description
                        );
                    }


                    row.appendChild(
                        itemText
                    );


                    // ==================================================
                    // FORTSCHRITT - 👀 🐾 😌
                    // ==================================================

                    const seenButton =
                        createDiscoveryCheckbox(
                            key,
                            "seen",
                            "👀"
                        );
                    
                    const experiencedButton =
                        createDiscoveryCheckbox(
                            key,
                            "experienced",
                            "🐾"
                        );
                    
                    const relaxedButton =
                        createDiscoveryCheckbox(
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
                        createWeeklyDiscoveryButton(
                            category,
                            item
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

            event.stopPropagation();


            // ==================================================
            // 👀 GESEHEN
            // ==================================================

            if (type === "seen") {

                if (
                    discoveryState[key].seen ===
                    true
                ) {

                    discoveryState[key].seen =
                        false;

                    discoveryState[key].experienced =
                        false;

                    discoveryState[key].relaxed =
                        false;

                } else {

                    discoveryState[key].seen =
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
                    discoveryState[key].experienced ===
                    true
                ) {

                    discoveryState[key].experienced =
                        false;

                    discoveryState[key].relaxed =
                        false;

                } else {

                    discoveryState[key].seen =
                        true;

                    discoveryState[key].experienced =
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
                    discoveryState[key].relaxed ===
                    true
                ) {

                    discoveryState[key].relaxed =
                        false;

                } else {

                    discoveryState[key].seen =
                        true;

                    discoveryState[key].experienced =
                        true;

                    discoveryState[key].relaxed =
                        true;
                }
            }


            // ==================================================
            // SPEICHERN
            // ==================================================

            saveDiscoveryState();


            // ==================================================
            // NUR DIE DREI BUTTONS AKTUALISIEREN
            // ==================================================

            if (button.progressButtons) {

                updateDiscoveryButton(
                    button.progressButtons.seen,
                    discoveryState[key].seen
                );

                updateDiscoveryButton(
                    button.progressButtons.experienced,
                    discoveryState[key].experienced
                );

                updateDiscoveryButton(
                    button.progressButtons.relaxed,
                    discoveryState[key].relaxed
                );
            }


            // ==================================================
            // FORTSCHRITT AKTUALISIEREN
            // ==================================================

            updateDiscoveryProgress();

            
            // ==================================================
            // ENTDECKER-ACHIEVEMENT PRÜFEN
            // ==================================================
                    
            checkDiscoveryAchievement();

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
    item
) {

    const itemName =
        getDiscoveryName(item);

    const itemDescription =
        getDiscoveryDescription(item);


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

    let weeklyId;


    if (category.custom === true) {

        weeklyId =
            category.id +
            "|" +
            item.id;

    } else {

        weeklyId =
            category.title +
            "|" +
            itemName;
    }


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
                // ZUM WOCHENPLAN HINZUFÜGEN
                // ==================================================

                weeklySelections.discoveries.push(
                    {
                        id:
                            weeklyId,

                        discoveryId:
                            category.custom === true
                                ? item.id
                                : null,

                        categoryId:
                            category.id || null,

                        category:
                            category.title,

                        name:
                            itemName,

                        description:
                            itemDescription,

                        custom:
                            category.custom === true
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
                itemDescription,
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
    itemDescription,
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
                        itemDescription !== ""
                            ? itemDescription
                            : category.title,

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


    // ==================================================
    // NUR AKTUELL VORHANDENE ENTDECKUNGEN ZÄHLEN
    // ==================================================

    discoveryCategories.forEach(
        function (category) {

            category.items.forEach(
                function (item) {

                    const key =
                        getDiscoveryKey(
                            category,
                            item
                        );

                    // ==================================================
                    // JEDE VORHANDENE ENTDECKUNG ZÄHLEN
                    // ==================================================

                    // Jede Entdeckung gehört zur Gesamtzahl.
                    // Auch dann, wenn für sie noch kein
                    // Fortschrittszustand gespeichert wurde.

                    total++;


                    const state =
                        discoveryState[key];


                    // ==================================================
                    // FORTSCHRITTSZUSTAND PRÜFEN
                    // ==================================================

                    // Fehlt der Zustand, zählt die Entdeckung trotzdem
                    // zur Gesamtzahl, aber noch nicht als erledigt.

                    if (state === undefined) {
                        return;
                    }


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

        }
    );

    // ==================================================
    // AKTUELLE GESAMTZAHL DER ENTDECKER SPEICHERN
    // ==================================================

    localStorage.setItem(
        "discoveryTotalCount",
        total
    );

    localStorage.setItem(
        "discoveryRelaxedCount",
        relaxed
    );


    // ==================================================
    // PROZENTWERTE FÜR DIE ANZEIGE
    // ==================================================

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


    // ==================================================
    // IM HTML ANZEIGEN
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

function calculatePercent(
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

function getCategoryProgress(
    category
) {

    let relaxedCount = 0;


    category.items.forEach(
        function (item) {

            const key =
                getDiscoveryKey(
                    category,
                    item
                );


            if (
                discoveryState[key] !==
                    undefined &&
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
// ÄHNLICHE ENTDECKUNGEN SUCHEN
// ==================================================

function normalizeDiscoveryText(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/[.,!?;:()[\]{}"'/-]/g, " ")
        .replace(/\s+/g, " ");
}


function findSimilarDiscoveries(searchText) {

    const normalizedSearch =
        normalizeDiscoveryText(
            searchText
        );


    if (normalizedSearch.length < 3) {
        return [];
    }


    const searchWords =
        normalizedSearch
            .split(" ")
            .filter(
                function (word) {
                    return word.length >= 3;
                }
            );


    const matches = [];


    discoveryCategories.forEach(
        function (category) {

            category.items.forEach(
                function (item) {

                    const itemName =
                        getDiscoveryName(item);

                    const normalizedName =
                        normalizeDiscoveryText(
                            itemName
                        );


                    // ==================================================
                    // GENAUER ODER TEILWEISER TREFFER
                    // ==================================================

                    let similar =
                        normalizedName ===
                        normalizedSearch;


                    if (
                        similar === false &&
                        (
                            normalizedName.includes(
                                normalizedSearch
                            ) ||
                            normalizedSearch.includes(
                                normalizedName
                            )
                        )
                    ) {
                        similar = true;
                    }


                    // ==================================================
                    // GEMEINSAME WÖRTER
                    // ==================================================

                    if (
                        similar === false &&
                        searchWords.length > 0
                    ) {

                        similar =
                            searchWords.some(
                                function (word) {

                                    return (
                                        normalizedName.includes(
                                            word
                                        )
                                    );
                                }
                            );
                    }


                    if (similar === true) {

                        matches.push(
                            {
                                category:
                                    category,

                                item:
                                    item,

                                name:
                                    itemName,

                                description:
                                    getDiscoveryDescription(
                                        item
                                    )
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

function createSuggestionWeeklyButton(
    category,
    item
) {

    const itemName =
        getDiscoveryName(item);

    const itemDescription =
        getDiscoveryDescription(item);


    // ==================================================
    // EINDEUTIGE ID
    // ==================================================

    let weeklyId;


    if (category.custom === true) {

        weeklyId =
            category.id +
            "|" +
            item.id;

    } else {

        weeklyId =
            category.title +
            "|" +
            itemName;
    }


    // ==================================================
    // BUTTON ERSTELLEN
    // ==================================================

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
    // AKTUELLEN ZUSTAND ANZEIGEN
    // ==================================================

    function updateButtonText() {

        const isSelected =
            weeklySelections.discoveries.some(
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
                weeklySelections.discoveries.findIndex(
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

                weeklySelections.discoveries.splice(
                    existingIndex,
                    1
                );

                saveWeeklySelections();

                syncDiscoveryWithWeeklyTasks(
                    weeklyId,
                    category,
                    itemName,
                    itemDescription,
                    false
                );

            }


            // ==================================================
            // NOCH NICHT EINGEPLANT -> HINZUFÜGEN
            // ==================================================

            else {

                weeklySelections.discoveries.push(
                    {
                        id:
                            weeklyId,

                        discoveryId:
                            category.custom === true
                                ? item.id
                                : null,

                        categoryId:
                            category.id || null,

                        category:
                            category.title,

                        name:
                            itemName,

                        description:
                            itemDescription,

                        custom:
                            category.custom === true
                    }
                );


                saveWeeklySelections();


                syncDiscoveryWithWeeklyTasks(
                    weeklyId,
                    category,
                    itemName,
                    itemDescription,
                    true
                );
            }


            updateButtonText();
        }
    );


    return button;
}


// ==================================================
// ÄHNLICHE ENTDECKUNGEN ANZEIGEN
// ==================================================

function displayDiscoverySuggestions() {

    const searchText =
        discoveryEditorName.value;


    // ==================================================
    // ÄHNLICHE ENTDECKUNGEN SUCHEN
    // ==================================================

    let matches =
        findSimilarDiscoveries(
            searchText
        );


    // ==================================================
    // AKTUELL BEARBEITETE ENTDECKUNG AUSSCHLIESSEN
    // ==================================================
        
    if (editingCustomDiscoveryId !== null) {
    
        matches =
            matches.filter(
                function (match) {
                
                    return !(
                        match.category.custom === true &&
                        match.item.id === editingCustomDiscoveryId
                    );
                }
            );
    }


    discoverySuggestionsList.innerHTML =
        "";


    if (matches.length === 0) {

        discoverySuggestions.hidden =
            true;

        return;
    }


    discoverySuggestions.hidden =
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
                match.name;


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
            // NOTIZ BEI EIGENEN ENTDECKUNGEN
            // ==================================================

            if (
                match.description !== ""
            ) {

                const description =
                    document.createElement(
                        "span"
                    );

                description.classList.add(
                    "discovery-suggestion-description"
                );

                description.textContent =
                    match.description;

                textArea.appendChild(
                    description
                );
            }


            // ==================================================
            // WOCHENPLAN-BUTTON
            // ==================================================

            const weeklyButton =
                createSuggestionWeeklyButton(
                    match.category,
                    match.item
                );


            suggestion.appendChild(
                textArea
            );

            suggestion.appendChild(
                weeklyButton
            );


            discoverySuggestionsList.appendChild(
                suggestion
            );
        }
    );
}


// ==================================================
// BEIM SCHREIBEN VERGLEICHEN
// ==================================================

discoveryEditorName.addEventListener(
    "input",
    function () {

        displayDiscoverySuggestions();
    }
);


// ==================================================
// EIGENE ENTDECKUNGEN - EDITOR
// ==================================================

let editingCustomDiscoveryId =
    null;


// ==================================================
// EIGENE ENTDECKUNG BEARBEITEN
// ==================================================

function openDiscoveryEditorForEdit(
    discovery
) {

    editingCustomDiscoveryId =
        discovery.id;

    discoveryEditorTitle.textContent =
        "Entdeckung bearbeiten";

    discoveryEditorName.value =
        discovery.name;

    discoveryEditorNote.value =
        discovery.description || "";

    discoveryEditorDelete.hidden =
        false;

    discoverySuggestions.hidden =
    true;

    discoverySuggestionsList.innerHTML =
        "";

    displayDiscoverySuggestions();

    discoveryEditorModal.hidden =
        false;

    discoveryEditorModal.classList.add(
        "show"
    );

    document.body.classList.add(
        "modal-open"
    );

    discoveryEditorName.focus();
}


// ==================================================
// EDITOR ÖFFNEN
// ==================================================

function openDiscoveryEditor() {

    editingCustomDiscoveryId =
        null;

    discoveryEditorTitle.textContent =
        "Entdeckung hinzufügen";

    discoveryEditorName.value =
        "";

    discoveryEditorNote.value =
        "";

    discoveryEditorDelete.hidden =
        true;

    discoverySuggestions.hidden =
        true;

    discoverySuggestionsList.innerHTML =
        "";

    discoveryEditorModal.hidden =
        false;

    discoveryEditorModal.classList.add(
        "show"
    );

    document.body.classList.add(
        "modal-open"
    );

    discoveryEditorName.focus();
}


// ==================================================
// EDITOR SCHLIESSEN
// ==================================================

function closeDiscoveryEditor() {

    discoveryEditorModal.classList.remove(
        "show"
    );

    discoveryEditorModal.hidden =
        true;

    document.body.classList.remove(
        "modal-open"
    );

    editingCustomDiscoveryId =
        null;
}


// ==================================================
// EIGENE ENTDECKUNGEN SPEICHERN
// ==================================================

function saveCustomDiscoveries() {

    localStorage.setItem(
        CUSTOM_DISCOVERIES_STORAGE_KEY,
        JSON.stringify(
            customDiscoveries
        )
    );
}


// ==================================================
// EIGENE ENTDECKUNG SPEICHERN
// ==================================================

discoveryEditorSave.addEventListener(
    "click",
    function () {

        const name =
            discoveryEditorName.value.trim();

        const description =
            discoveryEditorNote.value.trim();


        // ==================================================
        // NAME MUSS EINGETRAGEN SEIN
        // ==================================================

        if (name === "") {

            discoveryEditorName.focus();

            return;
        }


        // ==================================================
        // NEUE ENTDECKUNG
        // ==================================================

        if (
            editingCustomDiscoveryId ===
            null
        ) {

            const newDiscovery = {

                id:
                    "custom-" +
                    Date.now(),

                name:
                    name,

                description:
                    description
            };


            customDiscoveries.push(
                newDiscovery
            );


            // Fortschritt für die neue
            // Entdeckung anlegen.

            const key =
                getDiscoveryKey(
                    customDiscoveryCategory,
                    newDiscovery
                );


            discoveryState[key] = {

                seen: false,

                experienced: false,

                relaxed: false
            };
        }


        // ==================================================
        // VORHANDENE EIGENE ENTDECKUNG ÄNDERN
        // ==================================================

        else {

            const discovery =
                customDiscoveries.find(
                    function (item) {

                        return (
                            item.id ===
                            editingCustomDiscoveryId
                        );
                    }
                );


            if (discovery !== undefined) {

                // ==================================================
                // DATEN DER ENTDECKUNG ÄNDERN
                // ==================================================

                discovery.name =
                    name;

                discovery.description =
                    description;

                // ==================================================
                // WOCHENPLAN BEIM BEARBEITEN AKTUALISIEREN
                // ==================================================

                const weeklyId =
                    customDiscoveryCategory.id +
                    "|" +
                    discovery.id;


                const weeklyEntry =
                    weeklySelections.discoveries.find(
                        function (entry) {
                        
                            return (
                                entry.id ===
                                weeklyId
                            );
                        }
                    );
                
                
                if (weeklyEntry !== undefined) {
                
                    weeklyEntry.name =
                        name;
                
                    weeklyEntry.description =
                        description;
                
                    saveWeeklySelections();
                }


                // ==================================================
                // OFFENE WOCHENAUFGABE AKTUALISIEREN
                // ==================================================

                const savedWeeklyTasks =
                    localStorage.getItem(
                        WEEKLY_TASK_STORAGE_KEY
                    );
                
                
                if (savedWeeklyTasks !== null) {
                
                    const weeklyTasks =
                        JSON.parse(
                            savedWeeklyTasks
                        );
                    
                    
                    weeklyTasks.forEach(
                        function (task) {
                        
                            if (
                                task.source === "discovery" &&
                                task.sourceId === weeklyId &&
                                task.completed !== true
                            ) {
                            
                                task.title =
                                    name;
                            
                                task.note =
                                    description !== ""
                                        ? description
                                        : customDiscoveryCategory.title;
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
                // PASSENDE ZEILE IM HTML FINDEN
                // ==================================================

                const discoveryRow =
                    discoveryChecklist.querySelector(
                        '[data-discovery-id="' +
                        discovery.id +
                        '"]'
                    );
                
                
                if (discoveryRow !== null) {
                
                    // ==================================================
                    // NAME DIREKT AKTUALISIEREN
                    // ==================================================
                
                    const discoveryName =
                        discoveryRow.querySelector(
                            ".discovery-item-name"
                        );
                    
                    if (discoveryName !== null) {
                    
                        discoveryName.textContent =
                            name;
                    }
                
                
                    // ==================================================
                    // NOTIZ DIREKT AKTUALISIEREN
                    // ==================================================
                
                    const itemText =
                        discoveryRow.querySelector(
                            ".command-item-text"
                        );
                    
                    let discoveryDescription =
                        discoveryRow.querySelector(
                            ".command-description"
                        );
                    
                    
                    // Neue Notiz wurde eingetragen
                    if (description !== "") {
                    
                        if (
                            discoveryDescription ===
                            null
                        ) {
                        
                            discoveryDescription =
                                document.createElement(
                                    "span"
                                );
                            
                            discoveryDescription.classList.add(
                                "command-description"
                            );
                        
                            itemText.appendChild(
                                discoveryDescription
                            );
                        }
                    
                    
                        discoveryDescription.textContent =
                            description;
                    
                    } else if (
                        discoveryDescription !== null
                    ) {
                    
                        // Vorhandene Notiz wurde gelöscht
                        discoveryDescription.remove();
                    }
                }

                // ==================================================
                // NACH DEM UMBENENNEN ALPHABETISCH EINSORTIEREN
                // ==================================================

                sortCustomDiscoveryRows();

            }
        }



        // ==================================================
        // SPEICHERN
        // ==================================================

        saveCustomDiscoveries();

        saveDiscoveryState();


        // ==================================================
        // ANZEIGE AKTUALISIEREN
        // ==================================================

        if (
            editingCustomDiscoveryId ===
            null
        ) {
        
            // ==================================================
            // ANZEIGE NACH NEUER ENTDECKUNG AKTUALISIEREN
            // ==================================================
        
            displayDiscoveryChecklist();
        
        
            // ==================================================
            // ENTDECKER-ACHIEVEMENT NACH DEM HINZUFÜGEN PRÜFEN
            // ==================================================
        
            checkDiscoveryAchievement();

            
            // ==================================================
            // EIGENE ENTDECKUNGEN WIEDER ÖFFNEN
            // ==================================================

            const customCategory =
                discoveryChecklist.querySelector(
                    '[data-category-id="eigene-entdeckungen"]'
                );
            
            
            if (customCategory !== null) {
            
                customCategory.classList.add(
                    "open"
                );
            }
        }


        // ==================================================
        // POPUP SCHLIESSEN
        // ==================================================

        closeDiscoveryEditor();
    }
);


// ==================================================
// ENTDECKUNG HINZUFÜGEN
// ==================================================

addDiscoveryButton.addEventListener(
    "click",
    function () {

        openDiscoveryEditor();
    }
);


// ==================================================
// POPUP SCHLIESSEN
// ==================================================

discoveryEditorCancel.addEventListener(
    "click",
    function () {

        closeDiscoveryEditor();
    }
);


closeDiscoveryEditorButton.addEventListener(
    "click",
    function () {

        closeDiscoveryEditor();
    }
);


// ==================================================
// KLICK AUSSERHALB DES POPUPS
// ==================================================

discoveryEditorModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            discoveryEditorModal
        ) {

            closeDiscoveryEditor();
        }
    }
);


// ==================================================
// EIGENE ENTDECKUNG LÖSCHEN
// ==================================================

discoveryEditorDelete.addEventListener(
    "click",
    function () {

        if (
            editingCustomDiscoveryId ===
            null
        ) {
            return;
        }


        const discovery =
            customDiscoveries.find(
                function (item) {

                    return (
                        item.id ===
                        editingCustomDiscoveryId
                    );
                }
            );


        if (discovery === undefined) {
            return;
        }


        // ==================================================
        // EINDEUTIGE SCHLÜSSEL
        // ==================================================

        const discoveryKey =
            getDiscoveryKey(
                customDiscoveryCategory,
                discovery
            );

        const weeklyId =
            customDiscoveryCategory.id +
            "|" +
            discovery.id;


        // ==================================================
        // FORTSCHRITT ENTFERNEN
        // ==================================================

        delete discoveryState[
            discoveryKey
        ];


        // ==================================================
        // AUS WOCHENPLAN-AUSWAHL ENTFERNEN
        // ==================================================

        weeklySelections.discoveries =
            weeklySelections.discoveries.filter(
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

        syncDiscoveryWithWeeklyTasks(
            weeklyId,
            customDiscoveryCategory,
            discovery.name,
            discovery.description || "",
            false
        );


        // ==================================================
        // ENTDECKUNG ENTFERNEN
        // ==================================================

        const discoveryIndex =
            customDiscoveries.findIndex(
                function (item) {

                    return (
                        item.id ===
                        editingCustomDiscoveryId
                    );
                }
            );


        if (discoveryIndex !== -1) {

            customDiscoveries.splice(
                discoveryIndex,
                1
            );
        }


        // ==================================================
        // ALLES SPEICHERN
        // ==================================================

        saveCustomDiscoveries();

        saveDiscoveryState();

        saveWeeklySelections();


        // ==================================================
        // ANZEIGE AKTUALISIEREN
        // ==================================================

        displayDiscoveryChecklist();

        // ==================================================
        // ENTDECKER-ACHIEVEMENT NACH DEM LÖSCHEN PRÜFEN
        // ==================================================

        checkDiscoveryAchievement();

        // ==================================================
        // EIGENE ENTDECKUNGEN WIEDER ÖFFNEN
        // ==================================================

        const customCategory =
            discoveryChecklist.querySelector(
                '[data-category-id="eigene-entdeckungen"]'
            );
        
        
        if (customCategory !== null) {
        
            customCategory.classList.add(
                "open"
            );
        }

        closeDiscoveryEditor();
    }
);