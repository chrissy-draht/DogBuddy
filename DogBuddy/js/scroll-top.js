// ==================================================
// NACH-OBEN-BUTTON ERSTELLEN
// ==================================================

const scrollTopButton =
    document.createElement(
        "button"
    );

scrollTopButton.classList.add(
    "scroll-top-button"
);

scrollTopButton.type =
    "button";

scrollTopButton.innerHTML =
    "↑";

scrollTopButton.setAttribute(
    "aria-label",
    "Zum Seitenanfang"
);

document.body.appendChild(
    scrollTopButton
);


// ==================================================
// BUTTON BEIM SCROLLEN EIN- UND AUSBLENDEN
// ==================================================

window.addEventListener(
    "scroll",
    function () {

        if (
            window.scrollY > 300
        ) {

            scrollTopButton.classList.add(
                "visible"
            );

        }

        else {

            scrollTopButton.classList.remove(
                "visible"
            );

        }

    }
);


// ==================================================
// ZUM SEITENANFANG SCROLLEN
// ==================================================

scrollTopButton.addEventListener(
    "click",
    function () {

        window.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            }
        );

    }
);