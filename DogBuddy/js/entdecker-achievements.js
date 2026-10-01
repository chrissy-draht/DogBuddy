// ==================================================
// DOGBUDDY - ENTDECKER ACHIEVEMENTS
// ==================================================


// ==================================================
// ENTDECKER-ACHIEVEMENT PRÜFEN
// ==================================================

function checkDiscoveryAchievement() {


    // ==================================================
    // GESAMTANZAHL LADEN
    // ==================================================

    const totalCount =
        Number(
            localStorage.getItem(
                "discoveryTotalCount"
            )
        );


    if (
        Number.isFinite(totalCount) === false ||
        totalCount <= 0
    ) {

        return;
    }


        // ==================================================
        // AKTUELLE ANZAHL "ENTSPANNT DABEI" LADEN
        // ==================================================

        const relaxedCount =
            Number(
                localStorage.getItem(
                    "discoveryRelaxedCount"
                )
            );


    // ==================================================
    // GÜLTIGEN WERT PRÜFEN
    // ==================================================

    if (
        Number.isFinite(relaxedCount) === false ||
        relaxedCount < 0
    ) {
        return;
    }


    // ==================================================
    // ERREICHTEN MEILENSTEIN BESTIMMEN
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
    // LETZTEN MEILENSTEIN LADEN
    // ==================================================

    let lastMilestone =
        Number(
            localStorage.getItem(
                "lastDiscoveryMilestone"
            )
        ) || 0;


    // ==================================================
    // FORTSCHRITT IST WIEDER GESUNKEN
    // ==================================================
        
    // Wenn der Fortschritt unter einen bereits
    // erreichten Meilenstein fällt, wird der höhere
    // Meilenstein wieder freigegeben.
    //
    // Beispiel:
    // 25 % -> 24 %
    //
    // Wird später wieder 25 % erreicht,
    // kann das Achievement erneut erscheinen.
        
    if (
        lastMilestone > milestone
    ) {
    
        if (
            milestone === 0
        ) {
        
            localStorage.removeItem(
                "lastDiscoveryMilestone"
            );
        
            lastMilestone = 0;
        
        } else {
        
            localStorage.setItem(
                "lastDiscoveryMilestone",
                milestone
            );
        
            lastMilestone = milestone;
        }
    
        return;
    }
    
    
    // ==================================================
    // NOCH KEIN MEILENSTEIN ERREICHT
    // ==================================================
    
    if (
        milestone === 0
    ) {
    
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
    // PASSENDES ACHIEVEMENT-BILD FESTLEGEN
    // ==================================================

    let achievementImage = "";


    if (
        milestone === 25
    ) {

        achievementImage =
            "entdecker_anfaenger.png";

    } else if (
        milestone === 50
    ) {

        achievementImage =
            "entdecker_fortgeschrittener.png";

    } else if (
        milestone === 75
    ) {

        achievementImage =
            "entdecker_profi.png";

    } else if (
        milestone === 100
    ) {

        achievementImage =
            "entdecker_meister.png";

    }


    // ==================================================
    // SICHERHEITSPRÜFUNG
    // ==================================================

    if (
        achievementImage === ""
    ) {
        return;
    }


    // ==================================================
    // MEILENSTEIN SPEICHERN
    // ==================================================

    localStorage.setItem(
        "lastDiscoveryMilestone",
        milestone
    );


    // ==================================================
    // POPUP ANZEIGEN
    // ==================================================

    showDiscoveryAchievementPopup(
        achievementImage
    );

}


// ==================================================
// ENTDECKER-ACHIEVEMENT POPUP ANZEIGEN
// ==================================================

function showDiscoveryAchievementPopup(
    achievementImage
) {


    // ==================================================
    // EVENTUELL VORHANDENES POPUP ENTFERNEN
    // ==================================================

    const oldPopup =
        document.getElementById(
            "global-discovery-achievement"
        );


    if (
        oldPopup !== null
    ) {

        oldPopup.remove();

    }


    // ==================================================
    // POPUP-HINTERGRUND ERSTELLEN
    // ==================================================

    const popup =
        document.createElement(
            "div"
        );


    popup.id =
        "global-discovery-achievement";


    popup.style.position =
        "fixed";

    popup.style.inset =
        "0";

    popup.style.backgroundColor =
        "rgba(0, 0, 0, 0.55)";

    popup.style.display =
        "flex";

    popup.style.alignItems =
        "center";

    popup.style.justifyContent =
        "center";

    popup.style.padding =
        "20px";

    popup.style.boxSizing =
        "border-box";

    popup.style.zIndex =
        "99999";


    // ==================================================
    // POPUP-INHALT ERSTELLEN
    // ==================================================

    const popupContent =
        document.createElement(
            "div"
        );


    popupContent.style.position =
        "relative";

    popupContent.style.width =
        "min(500px, calc(100vw - 40px))";

    popupContent.style.borderRadius =
        "20px";

    popupContent.style.overflow =
        "hidden";


    // ==================================================
    // ACHIEVEMENT-BILD ERSTELLEN
    // ==================================================

    const image =
        document.createElement(
            "img"
        );


    image.src =
        getDiscoveryAchievementImagePath(
            achievementImage
        );


    image.alt =
        "Entdecker-Erfolg";


    image.style.display =
        "block";

    image.style.width =
        "100%";

    image.style.height =
        "auto";


    // ==================================================
    // SCHLIESSEN-BUTTON ERSTELLEN
    // ==================================================

    const closeButton =
        document.createElement(
            "button"
        );


    closeButton.type =
        "button";

    closeButton.textContent =
        "×";


    closeButton.setAttribute(
        "aria-label",
        "Popup schließen"
    );


    closeButton.style.position =
        "absolute";

    closeButton.style.top =
        "14px";

    closeButton.style.right =
        "14px";

    closeButton.style.width =
        "38px";

    closeButton.style.height =
        "38px";

    closeButton.style.padding =
        "0";

    closeButton.style.border =
        "none";

    closeButton.style.borderRadius =
        "50%";

    closeButton.style.backgroundColor =
        "rgba(255, 255, 255, 0.35)";

    closeButton.style.color =
        "#302a26";

    closeButton.style.fontSize =
        "26px";

    closeButton.style.lineHeight =
        "38px";

    closeButton.style.cursor =
        "pointer";


    // ==================================================
    // POPUP ÜBER X SCHLIESSEN
    // ==================================================

    closeButton.addEventListener(
        "click",
        function () {

            popup.remove();

        }
    );


    // ==================================================
    // POPUP DURCH KLICK AUSSERHALB SCHLIESSEN
    // ==================================================

    popup.addEventListener(
        "click",
        function (event) {

            if (
                event.target === popup
            ) {

                popup.remove();

            }

        }
    );


    // ==================================================
    // POPUP ZUSAMMENBAUEN
    // ==================================================

    popupContent.appendChild(
        image
    );

    popupContent.appendChild(
        closeButton
    );

    popup.appendChild(
        popupContent
    );

    document.body.appendChild(
        popup
    );

}


// ==================================================
// PFAD ZUM ACHIEVEMENT-BILD BESTIMMEN
// ==================================================

function getDiscoveryAchievementImagePath(
    achievementImage
) {


    // ==================================================
    // DASHBOARD / STARTSEITE
    // ==================================================

    if (
        window.location.pathname.endsWith(
            "/dashboard.html"
        )
    ) {
    
        return (
            "images/achievements/" +
            achievementImage
        );
    }


    // ==================================================
    // SEITEN IM HTML-ORDNER
    // ==================================================

    return (
        "../images/achievements/" +
        achievementImage
    );

}