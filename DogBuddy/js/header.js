// ==================================================
// DOGBUDDY - ZENTRALER HEADER
// ==================================================


// ==================================================
// AKTUELLE SEITE ERMITTELN
// ==================================================

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

const isSubpage =
    window.location.pathname.includes("/html/");

const basePath = isSubpage ? "../" : "";


// ==================================================
// HEADER ERSTELLEN
// ==================================================

const header = document.createElement("header");

header.className = "header";


// ==================================================
// HEADER INHALT
// ==================================================

header.innerHTML = `

    <!-- ========================================== -->
    <!-- LOGO                                       -->
    <!-- ========================================== -->

    <a
        href="${basePath}index.html"
        class="logo-link"
    >
        <img
            src="${basePath}images/logo/dogbuddy-logo-full-blank.png"
            alt="DogBuddy Logo"
            class="logo"
        >
    </a>


    <!-- ========================================== -->
    <!-- NAVIGATION                                 -->
    <!-- ========================================== -->

    <nav
        class="navigation"
        id="main-navigation"
    >

        <a
            href="${basePath}index.html"
            data-page="index.html"
        >
            Dashboard
        </a>


        <a
            href="${basePath}html/tagebuch.html"
            data-page="tagebuch.html"
        >
            Tagebuch
        </a>


        <!-- ====================================== -->
        <!-- TRAINING                               -->
        <!-- ====================================== -->

        <div class="nav-dropdown">

            <span
                class="nav-dropdown-button"
                id="training-navigation-button"
            >
                Training
            </span>


            <div class="nav-dropdown-menu">

                <a
                    href="${basePath}html/kommandos.html"
                    data-page="kommandos.html"
                >
                    Kommandos
                </a>

                <a
                    href="${basePath}html/entdecker.html"
                    data-page="entdecker.html"
                >
                    Entdecker-Checkliste
                </a>

            </div>

        </div>


        <a
            href="${basePath}html/entwicklung.html"
            data-page="entwicklung.html"
        >
            Entwicklung
        </a>


        <a
            href="${basePath}html/wochenplan.html"
            data-page="wochenplan.html"
        >
            Wochenplan
        </a>


        <a
            href="${basePath}html/gesundheit.html"
            data-page="gesundheit.html"
        >
            Gesundheit
        </a>


        <a
            href="${basePath}html/galerie.html"
            data-page="galerie.html"
        >
            Galerie
        </a>

    </nav>


    <!-- ========================================== -->
    <!-- HEADER BUTTONS                             -->
    <!-- ========================================== -->

    <div class="header-actions">


        <!-- ====================================== -->
        <!-- DARK MODE                              -->
        <!-- ====================================== -->

        <button
            type="button"
            id="dark-mode-toggle"
            class="dark-mode-toggle"
            aria-label="Dark Mode aktivieren"
            title="Dark Mode aktivieren"
        >
            🌙
        </button>


        <!-- ====================================== -->
        <!-- TABLET MENÜ                            -->
        <!-- ====================================== -->

        <button
            type="button"
            id="mobile-menu-toggle"
            class="mobile-menu-toggle"
            aria-label="Navigation öffnen"
            aria-expanded="false"
        >
            <span></span>
            <span></span>
            <span></span>
        </button>

    </div>
`;


// ==================================================
// HEADER AM SEITENANFANG EINFÜGEN
// ==================================================

document.body.prepend(header);


// ==================================================
// AKTIVE SEITE MARKIEREN
// ==================================================

const navigationLinks =
    header.querySelectorAll("[data-page]");

navigationLinks.forEach(function (link) {

    if (link.dataset.page === currentPage) {
        link.classList.add("active");
    }

});


// ==================================================
// TRAINING ALS AKTIV MARKIEREN
// ==================================================

const trainingPages = [
    "kommandos.html",
    "entdecker.html"
];

const trainingButton =
    document.getElementById("training-navigation-button");

if (trainingPages.includes(currentPage)) {
    trainingButton.classList.add("active");
}


// ==================================================
// TABLET MENÜ
// ==================================================

const mobileMenuButton =
    document.getElementById("mobile-menu-toggle");

const navigation =
    document.getElementById("main-navigation");


// ==================================================
// TABLET MENÜ ÖFFNEN / SCHLIESSEN
// ==================================================

mobileMenuButton.addEventListener("click", function () {

    navigation.classList.toggle("mobile-open");

    const menuIsOpen =
        navigation.classList.contains("mobile-open");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        menuIsOpen
    );

    if (menuIsOpen) {

        mobileMenuButton.setAttribute(
            "aria-label",
            "Navigation schließen"
        );

    } else {

        mobileMenuButton.setAttribute(
            "aria-label",
            "Navigation öffnen"
        );

    }

});


// ==================================================
// MENÜ NACH KLICK AUF LINK SCHLIESSEN
// ==================================================

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navigation.classList.remove("mobile-open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});