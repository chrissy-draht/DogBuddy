// ==================================================
// DOGBUDDY - SCHWEBENDES NAVIGATIONSMENÜ
// ==================================================


document.addEventListener(
    "DOMContentLoaded",
    function () {

// ==================================================
// SCHWEBENDEN MENÜ-BUTTON ERSTELLEN
// ==================================================

const floatingMenuButton =
    document.createElement(
        "button"
    );

floatingMenuButton.classList.add(
    "floating-menu-button"
);

floatingMenuButton.type =
    "button";

floatingMenuButton.innerHTML =
    "☰";

floatingMenuButton.setAttribute(
    "aria-label",
    "Navigation öffnen"
);

floatingMenuButton.setAttribute(
    "title",
    "Menü"
);

document.body.appendChild(
    floatingMenuButton
);


// ==================================================
// AKTUELLE SEITE ERMITTELN
// ==================================================

const currentPage =
    window.location.pathname
        .split("/")
        .pop() ||
    "dashboard.html";

const isIndexPage =
    currentPage ===
    "dashboard.html";


// ==================================================
// SCHWEBENDES NAVIGATIONSMENÜ ERSTELLEN
// ==================================================

const floatingMenu =
    document.createElement(
        "nav"
    );

floatingMenu.classList.add(
    "floating-menu"
);

floatingMenu.setAttribute(
    "aria-label",
    "Schnellnavigation"
);


// ==================================================
// MENÜPUNKTE
// ==================================================

const floatingMenuItems = [
    {
        name: "Dashboard",
        page: "dashboard.html"
    },
    {
        name: "Tagebuch",
        page: "html/tagebuch.html"
    },
    {
        name: "Kommandos",
        page: "html/kommandos.html"
    },
    {
        name: "Entdecker",
        page: "html/entdecker.html"
    },
    {
        name: "Entwicklung",
        page: "html/entwicklung.html"
    },
    {
        name: "Wochenplan",
        page: "html/wochenplan.html"
    },
    {
        name: "Gesundheit",
        page: "html/gesundheit.html"
    },
    {
        name: "Galerie",
        page: "html/galerie.html"
    }
];


// ==================================================
// MENÜPUNKTE ERSTELLEN
// ==================================================

floatingMenuItems.forEach(
    function (item) {

        const link =
            document.createElement(
                "a"
            );


        // ==================================================
        // PASSENDEN LINK ERSTELLEN
        // ==================================================

        if (isIndexPage) {

            link.href =
                item.page;

        }

        else {

            if (
                item.page ===
                "dashboard.html"
            ) {

                link.href =
                    "../dashboard.html";

            }

            else {

                link.href =
                    item.page.replace(
                        "html/",
                        ""
                    );

            }

        }


        link.textContent =
            item.name;


        // ==================================================
        // AKTUELLE SEITE MARKIEREN
        // ==================================================

        const itemPage =
            item.page
                .split("/")
                .pop();

        if (
            itemPage ===
            currentPage
        ) {

            link.classList.add(
                "active"
            );

        }


        floatingMenu.appendChild(
            link
        );

    }
);


document.body.appendChild(
    floatingMenu
);


// ==================================================
// MENÜ-BUTTON BEIM SCROLLEN EIN- UND AUSBLENDEN
// ==================================================

function updateFloatingMenuButton() {

    const header =
        document.querySelector(
            ".header"
        );

    if (!header) {
        return;
    }


    const headerPosition =
        header.getBoundingClientRect();


    // Button erst anzeigen,
    // wenn der normale Header verschwunden ist
    if (
        headerPosition.bottom <= 0
    ) {

        floatingMenuButton.classList.add(
            "visible"
        );

    }

    else {

        floatingMenuButton.classList.remove(
            "visible"
        );

        floatingMenu.classList.remove(
            "open"
        );

    }

}


// ==================================================
// MENÜ-BUTTON BEIM SCROLLEN PRÜFEN
// ==================================================

window.addEventListener(
    "scroll",
    updateFloatingMenuButton
);


// ==================================================
// POSITION BEIM LADEN PRÜFEN
// ==================================================

updateFloatingMenuButton();

// ==================================================
// MENÜ ÖFFNEN UND SCHLIESSEN
// ==================================================

floatingMenuButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        floatingMenu.classList.toggle(
            "open"
        );


        // ==================================================
        // ARIA-LABEL AKTUALISIEREN
        // ==================================================

        if (
            floatingMenu.classList.contains(
                "open"
            )
        ) {

            floatingMenuButton.setAttribute(
                "aria-label",
                "Navigation schließen"
            );

        }

        else {

            floatingMenuButton.setAttribute(
                "aria-label",
                "Navigation öffnen"
            );

        }

    }
);


// ==================================================
// KLICK IM MENÜ NICHT ALS AUSSENKLICK WERTEN
// ==================================================

floatingMenu.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

    }
);


// ==================================================
// MENÜ BEI KLICK AUSSERHALB SCHLIESSEN
// ==================================================

document.addEventListener(
    "click",
    function () {

        floatingMenu.classList.remove(
            "open"
        );

        floatingMenuButton.setAttribute(
            "aria-label",
            "Navigation öffnen"
        );

    }
);


// ==================================================
// MENÜ MIT ESC-TASTE SCHLIESSEN
// ==================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            floatingMenu.classList.remove(
                "open"
            );

            floatingMenuButton.setAttribute(
                "aria-label",
                "Navigation öffnen"
            );

        }

    }
);

}
);