// ==================================================
// DARK MODE
// ==================================================

document.addEventListener("DOMContentLoaded", function () {

    const savedTheme = localStorage.getItem("dogBuddyTheme");
    const darkModeButton = document.getElementById("dark-mode-toggle");


    // ==================================================
    // GESPEICHERTEN DARK MODE LADEN
    // ==================================================

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }


    // ==================================================
    // BUTTON AKTUALISIEREN
    // ==================================================

    function updateDarkModeButton() {

        if (!darkModeButton) {
            return;
        }

        const darkModeIsActive =
            document.body.classList.contains("dark-mode");

        if (darkModeIsActive) {
            darkModeButton.textContent = "☀️";
            darkModeButton.title = "Light Mode aktivieren";
            darkModeButton.setAttribute(
                "aria-label",
                "Light Mode aktivieren"
            );
        } else {
            darkModeButton.textContent = "🌙";
            darkModeButton.title = "Dark Mode aktivieren";
            darkModeButton.setAttribute(
                "aria-label",
                "Dark Mode aktivieren"
            );
        }
    }


    // ==================================================
    // DARK MODE UMSCHALTEN
    // ==================================================

    if (darkModeButton) {

        darkModeButton.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            const darkModeIsActive =
                document.body.classList.contains("dark-mode");

            if (darkModeIsActive) {
                localStorage.setItem("dogBuddyTheme", "dark");
            } else {
                localStorage.setItem("dogBuddyTheme", "light");
            }

            updateDarkModeButton();
        });
    }


    // ==================================================
    // BUTTON BEIM LADEN RICHTIG ANZEIGEN
    // ==================================================

    updateDarkModeButton();
});