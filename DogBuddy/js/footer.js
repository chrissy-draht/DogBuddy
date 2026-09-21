// ==================================================
// DOGBUDDY - ZENTRALER FOOTER
// ==================================================

document.addEventListener("DOMContentLoaded", function () {


    // ==================================================
    // FOOTER ERSTELLEN
    // ==================================================

    const footer = document.createElement("div");

    footer.className = "footer-area";


    // ==================================================
    // FOOTER INHALT
    // ==================================================

    footer.innerHTML = `
        <!-- ====================================== -->
        <!-- DOGBUDDY FOOTER-TEXT                   -->
        <!-- ====================================== -->

        <p class="footer-text">
            DogBuddy 🐾 Gemeinsam wachsen 🐾
        </p>


        <!-- ====================================== -->
        <!-- DATENSICHERUNG                         -->
        <!-- ====================================== -->

        <details class="footer-backup">

            <summary class="footer-backup-summary">

                <span class="footer-backup-arrow">›</span>

                💾 Datensicherung

            </summary>


            <!-- ================================== -->
            <!-- BACKUP BUTTONS                     -->
            <!-- ================================== -->

            <div class="footer-backup-actions">

                <button
                    type="button"
                    id="export-backup"
                    class="footer-backup-button"
                >
                    💾 Backup erstellen
                </button>


                <button
                    type="button"
                    id="import-backup"
                    class="footer-backup-button"
                >
                    📁 Backup wiederherstellen
                </button>


                <!-- Versteckter Datei-Upload -->
                <input
                    type="file"
                    id="backup-file-input"
                    accept=".json,application/json"
                    hidden
                >

            </div>

        </details>
    `;


    // ==================================================
    // FOOTER AM SEITENENDE EINFÜGEN
    // ==================================================

    document.body.appendChild(footer);

});