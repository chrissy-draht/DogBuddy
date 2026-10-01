// ==================================================
// DOGBUDDY - KOMMANDO ACHIEVEMENTS
// ==================================================


// ==================================================
// KOMMANDO-ACHIEVEMENT PRÜFEN
// ==================================================

function checkCommandAchievement(
    relaxedCount,
    totalCount
) {

        // ==================================================
        // VORHERIGEN KOMMANDO-FORTSCHRITT LADEN
        // ==================================================

        const previousRelaxedCount =
            Number(
                localStorage.getItem(
                    "previousCommandRelaxedCount"
                )
            );

        const previousTotalCount =
            Number(
                localStorage.getItem(
                    "previousCommandTotalCount"
                )
            );


        // ==================================================
        // PRÜFEN, OB DER FORTSCHRITT GEFALLEN IST
        // ==================================================

        const progressDropped =
            previousTotalCount > 0 &&
            relaxedCount * previousTotalCount <
            previousRelaxedCount * totalCount;


        // ==================================================
        // AKTUELLEN FORTSCHRITT FÜR NÄCHSTES MAL SPEICHERN
        // ==================================================

        localStorage.setItem(
            "previousCommandRelaxedCount",
            relaxedCount
        );

        localStorage.setItem(
            "previousCommandTotalCount",
            totalCount
        );


    // ==================================================
    // PRÜFEN, OB KOMMANDOS VORHANDEN SIND
    // ==================================================

    if (
        totalCount === undefined ||
        totalCount === null ||
        totalCount <= 0
    ) {

        return;

    }


    // ==================================================
    // AKTUELLEN MEILENSTEIN BESTIMMEN
    //
    // Es werden echte Stückzahlen verglichen.
    // Dadurch entstehen keine Rundungsprobleme
    // durch angezeigte Prozentwerte.
    // ==================================================

    let milestone = 0;


    if (
        relaxedCount === totalCount
    ) {

        milestone = 100;

    } else if (
        relaxedCount * 4 >=
        totalCount * 3
    ) {

        milestone = 75;

    } else if (
        relaxedCount * 2 >=
        totalCount
    ) {

        milestone = 50;

    } else if (
        relaxedCount * 4 >=
        totalCount
    ) {

        milestone = 25;

    }


    // ==================================================
    // LETZTEN ERREICHTEN MEILENSTEIN LADEN
    // ==================================================

    let lastMilestone =
        Number(
            localStorage.getItem(
                "lastCommandMilestone"
            )
        ) || 0;


    // ==================================================
    // GEFALLENEN FORTSCHRITT BEHANDELN
    //
    // Beispiel:
    // 25 % wurden bereits erreicht.
    // Durch ein neues Kommando fällt der Fortschritt
    // anschließend wieder unter 25 %.
    //
    // Dadurch wird der 25-%-Erfolg wieder freigegeben.
    //
    // Beim Fallen selbst wird KEIN Popup angezeigt.
    // ==================================================

    if (
        lastMilestone > milestone
    ) {

        if (milestone === 0) {

            localStorage.removeItem(
                "lastCommandMilestone"
            );

        } else {

            localStorage.setItem(
                "lastCommandMilestone",
                milestone
            );

        }

        return;

    }


    // ==================================================
    // NOCH KEIN MEILENSTEIN ERREICHT
    // ==================================================

    if (milestone === 0) {

        return;

    }


    // ==================================================
    // BEIM FALLEN KEIN ACHIEVEMENT ANZEIGEN
    //
    // Beispiel:
    // 51 % -> 50 % darf kein Popup auslösen.
    // ==================================================

    if (progressDropped === true) {

        return;

    }


    // ==================================================
    // MEILENSTEIN WURDE BEREITS ANGEZEIGT
    // ==================================================

    if (
        milestone <= lastMilestone
    ) {

        return;

    }


    // ==================================================
    // PASSENDES ERFOLGSBILD BESTIMMEN
    // ==================================================

    let imageName = "";


    if (milestone === 25) {

        imageName =
            "anfaenger.png";

    } else if (milestone === 50) {

        imageName =
            "fortgeschritten.png";

    } else if (milestone === 75) {

        imageName =
            "profi.png";

    } else if (milestone === 100) {

        imageName =
            "meister.png";

    }


    // ==================================================
    // NEUEN MEILENSTEIN SPEICHERN
    //
    // Das geschieht vor dem Popup.
    // Dadurch kann derselbe Erfolg nicht mehrfach
    // direkt hintereinander ausgelöst werden.
    // ==================================================

    localStorage.setItem(
        "lastCommandMilestone",
        milestone
    );


    // ==================================================
    // ERFOLGS-POPUP ANZEIGEN
    // ==================================================

    showCommandAchievementPopup(
        imageName
    );

}


// ==================================================
// KOMMANDO-ACHIEVEMENT POPUP ANZEIGEN
//
// Das Popup wird vollständig mit JavaScript erstellt.
// Dadurch funktioniert es nicht nur auf der
// Kommandoseite, sondern später auch im Wochenplan.
// ==================================================

function showCommandAchievementPopup(
    imageName
) {


    // ==================================================
    // POPUP-HINTERGRUND ERSTELLEN
    // ==================================================

    const overlay =
        document.createElement(
            "div"
        );

    overlay.classList.add(
        "app-modal",
        "show"
    );


    // ==================================================
    // POPUP-INHALT ERSTELLEN
    // ==================================================

    const content =
        document.createElement(
            "div"
        );

    content.classList.add(
        "command-achievement-content"
    );


    // ==================================================
    // ERFOLGSBILD ERSTELLEN
    // ==================================================

    const image =
        document.createElement(
            "img"
        );

    image.classList.add(
        "command-achievement-image"
    );

    image.src =
        getCommandAchievementImagePath(
            imageName
        );

    image.alt =
        "Kommando-Erfolg";


    // ==================================================
    // SCHLIESSEN-BUTTON ERSTELLEN
    // ==================================================

    const closeButton =
        document.createElement(
            "button"
        );

    closeButton.type =
        "button";

    closeButton.classList.add(
        "command-achievement-close"
    );

    closeButton.textContent =
        "×";

    closeButton.setAttribute(
        "aria-label",
        "Popup schließen"
    );


    // ==================================================
    // POPUP ZUSAMMENBAUEN
    // ==================================================

    content.appendChild(
        image
    );

    content.appendChild(
        closeButton
    );

    overlay.appendChild(
        content
    );

    document.body.appendChild(
        overlay
    );


    // ==================================================
    // POPUP SCHLIESSEN
    // ==================================================

    function closePopup() {

        overlay.remove();

    }


    // ==================================================
    // SCHLIESSEN ÜBER X
    // ==================================================

    closeButton.addEventListener(
        "click",
        closePopup
    );


    // ==================================================
    // SCHLIESSEN DURCH KLICK AUF HINTERGRUND
    // ==================================================

    overlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target === overlay
            ) {

                closePopup();

            }

        }
    );

}


// ==================================================
// PFAD ZUM ERFOLGSBILD ERMITTELN
//
// Die Achievement-Datei wird später sowohl auf
// Seiten im HTML-Ordner als auch außerhalb davon
// verwendet.
// ==================================================

function getCommandAchievementImagePath(
    imageName
) {

    const currentPath =
        window.location.pathname;


    // ==================================================
    // DASHBOARD 
    // ==================================================

    if (
        currentPath.endsWith(
            "/dashboard.html"
        )
    ) {

        return (
            "images/achievements/" +
            imageName
        );
    }


    // ==================================================
    // SEITEN IM HTML-ORDNER
    // ==================================================

    return (
        "../images/achievements/" +
        imageName
    );

}