// ==================================================
// DOGBUDDY - TAGEBUCH
// ==================================================


// ==================================================
// ELEMENTE AUS DEM HTML HOLEN
// ==================================================

const diaryDateInput =
    document.getElementById("diary-date");

const diaryTitleInput =
    document.getElementById("diary-title");

const diaryLearnedInput =
    document.getElementById("diary-learned");

const diaryGoodInput =
    document.getElementById("diary-good");

const diaryDifficultInput =
    document.getElementById("diary-difficult");

const diaryHighlightInput =
    document.getElementById("diary-highlight");

const diaryNoteInput =
    document.getElementById("diary-note");

const diaryPhotoInput =
    document.getElementById("diary-photos");

const photoPreview =
    document.getElementById("photo-preview");

const saveDiaryButton =
    document.getElementById("save-diary");

const diaryList =
    document.getElementById("diary-list");


// ==================================================
// AUSGEWÄHLTE NEUE FOTOS
// ==================================================

let selectedPhotos = [];


// ==================================================
// BEARBEITUNG
// ==================================================

// null bedeutet:
// Es wird gerade kein Eintrag bearbeitet
let editingEntryId = null;


// ==================================================
// TAGEBUCHEINTRÄGE LADEN
// ==================================================

const savedDiaryEntries =
    localStorage.getItem("diaryEntries");

let diaryEntries = [];

if (savedDiaryEntries !== null) {

    diaryEntries =
        JSON.parse(savedDiaryEntries);
}


// ==================================================
// HEUTIGES DATUM EINTRAGEN
// ==================================================

setToday();


// ==================================================
// INDEXEDDB
// ==================================================

let database;


// Datenbank öffnen
const databaseRequest =
    indexedDB.open(
        "DogBuddyDB",
        1
    );


// ==================================================
// DATENBANK ERSTELLEN
// ==================================================

databaseRequest.onupgradeneeded =
    function (event) {

        database =
            event.target.result;


        // Prüfen, ob der Fotospeicher
        // bereits vorhanden ist
        if (
            !database.objectStoreNames.contains(
                "diaryPhotos"
            )
        ) {

            database.createObjectStore(
                "diaryPhotos",
                {
                    keyPath: "id"
                }
            );

        }

    };


// ==================================================
// DATENBANK ERFOLGREICH GEÖFFNET
// ==================================================

databaseRequest.onsuccess =
    function (event) {

        database =
            event.target.result;

        displayDiaryEntries();

    };


// ==================================================
// FEHLER BEIM ÖFFNEN DER DATENBANK
// ==================================================

databaseRequest.onerror =
    function () {

        console.error(
            "Die DogBuddy-Datenbank konnte nicht geöffnet werden."
        );

    };


// ==================================================
// FOTOS AUSWÄHLEN
// ==================================================

diaryPhotoInput.addEventListener(
    "change",
    function () {

        const newPhotos =
            Array.from(
                diaryPhotoInput.files
            );


        // Neue Fotos zur bisherigen
        // Auswahl hinzufügen
        newPhotos.forEach(
            function (photo) {

                selectedPhotos.push(
                    photo
                );

            }
        );


        // Vorschau aktualisieren
        displayPhotoPreview();


        // Input zurücksetzen
        diaryPhotoInput.value = "";

    }
);


// ==================================================
// FOTO-VORSCHAU ANZEIGEN
// ==================================================

function displayPhotoPreview() {

    photoPreview.innerHTML = "";


    selectedPhotos.forEach(
        function (photo, index) {


            // Container erstellen
            const previewItem =
                document.createElement(
                    "div"
                );

            previewItem.classList.add(
                "photo-preview-item"
            );


            // Bild erstellen
            const image =
                document.createElement(
                    "img"
                );


            const imageUrl =
                URL.createObjectURL(
                    photo
                );


            image.src =
                imageUrl;

            image.alt =
                "Vorschau";


            // ==================================================
            // FOTO AUS AUSWAHL ENTFERNEN
            // ==================================================

            const removeButton =
                document.createElement(
                    "button"
                );

            removeButton.type =
                "button";

            removeButton.textContent =
                "×";

            removeButton.classList.add(
                "remove-photo-button"
            );


            removeButton.addEventListener(
                "click",
                function () {

                    selectedPhotos.splice(
                        index,
                        1
                    );

                    displayPhotoPreview();

                }
            );


            previewItem.appendChild(
                image
            );

            previewItem.appendChild(
                removeButton
            );

            photoPreview.appendChild(
                previewItem
            );

        }
    );

}


// ==================================================
// TAGEBUCHEINTRAG SPEICHERN ODER ÄNDERN
// ==================================================

saveDiaryButton.addEventListener(
    "click",
    async function () {


        // ==================================================
        // WERTE AUS DEM FORMULAR HOLEN
        // ==================================================

        const date =
            diaryDateInput.value;

        const title =
            diaryTitleInput.value.trim();

        const learned =
            diaryLearnedInput.value.trim();

        const good =
            diaryGoodInput.value.trim();

        const difficult =
            diaryDifficultInput.value.trim();

        const highlight =
            diaryHighlightInput.value.trim();

        const note =
            diaryNoteInput.value.trim();


        // ==================================================
        // EINGABEN PRÜFEN
        // ==================================================

        if (date === "") {

            alert(
                "Bitte wähle ein Datum aus."
            );

            return;
        }


        if (title === "") {

            alert(
                "Bitte gib deinem Tagebucheintrag einen Titel."
            );

            return;
        }


        // ==================================================
        // NEUEN EINTRAG ERSTELLEN
        // ==================================================

        if (editingEntryId === null) {

            const entryId =
                Date.now();


            const photoIds = [];


            // ==================================================
            // FOTOS SPEICHERN
            // ==================================================

            for (
                let i = 0;
                i < selectedPhotos.length;
                i++
            ) {

                const photo =
                    selectedPhotos[i];


                const photoId =
                    entryId +
                    "-" +
                    Date.now() +
                    "-" +
                    i;


                await savePhotoToDatabase(
                    photoId,
                    entryId,
                    photo
                );


                photoIds.push(
                    photoId
                );

            }


            // ==================================================
            // NEUEN EINTRAG ERSTELLEN
            // ==================================================

            const newEntry = {

                id: entryId,

                date: date,

                title: title,

                learned: learned,

                good: good,

                difficult: difficult,

                highlight: highlight,

                note: note,

                photos: photoIds

            };


            diaryEntries.push(
                newEntry
            );

        }


        // ==================================================
        // VORHANDENEN EINTRAG ÄNDERN
        // ==================================================

        else {

            const entry =
                diaryEntries.find(
                    function (savedEntry) {

                        return savedEntry.id ===
                            editingEntryId;

                    }
                );


            if (entry !== undefined) {

                // Texte aktualisieren
                entry.date =
                    date;

                entry.title =
                    title;

                entry.learned =
                    learned;

                entry.good =
                    good;

                entry.difficult =
                    difficult;

                entry.highlight =
                    highlight;

                entry.note =
                    note;


                // Falls alter Eintrag
                // noch kein photos-Array hat
                if (
                    entry.photos === undefined
                ) {

                    entry.photos = [];

                }


                // ==================================================
                // NEUE FOTOS ZUM EINTRAG HINZUFÜGEN
                // ==================================================

                for (
                    let i = 0;
                    i < selectedPhotos.length;
                    i++
                ) {

                    const photo =
                        selectedPhotos[i];


                    const photoId =
                        entry.id +
                        "-" +
                        Date.now() +
                        "-" +
                        i;


                    await savePhotoToDatabase(
                        photoId,
                        entry.id,
                        photo
                    );


                    entry.photos.push(
                        photoId
                    );

                }

            }

        }


        // ==================================================
        // LOCALSTORAGE AKTUALISIEREN
        // ==================================================

        saveDiaryEntries();


        // ==================================================
        // BEARBEITUNG BEENDEN
        // ==================================================

        editingEntryId = null;


        saveDiaryButton.textContent =
            "+ Tagebucheintrag speichern";


        // ==================================================
        // FORMULAR LEEREN
        // ==================================================

        clearDiaryForm();


        // ==================================================
        // ANZEIGE AKTUALISIEREN
        // ==================================================

        displayDiaryEntries();

    }
);


// ==================================================
// FOTO IN INDEXEDDB SPEICHERN
// ==================================================

function savePhotoToDatabase(
    photoId,
    entryId,
    photo
) {

    return new Promise(
        function (resolve, reject) {


            const transaction =
                database.transaction(
                    ["diaryPhotos"],
                    "readwrite"
                );


            const photoStore =
                transaction.objectStore(
                    "diaryPhotos"
                );


            const photoData = {

                id: photoId,

                entryId: entryId,

                file: photo

            };


            const request =
                photoStore.put(
                    photoData
                );


            request.onsuccess =
                function () {

                    resolve();

                };


            request.onerror =
                function () {

                    reject(
                        "Foto konnte nicht gespeichert werden."
                    );

                };

        }
    );

}


// ==================================================
// ALLE TAGEBUCHEINTRÄGE ANZEIGEN
// ==================================================

function displayDiaryEntries() {

    diaryList.innerHTML = "";


    // ==================================================
    // KEINE EINTRÄGE
    // ==================================================

    if (diaryEntries.length === 0) {

        const emptyText =
            document.createElement(
                "p"
            );

        emptyText.textContent =
            "Noch kein Tagebucheintrag vorhanden.";


        diaryList.appendChild(
            emptyText
        );

        return;
    }


    // ==================================================
    // NEUESTE EINTRÄGE ZUERST
    // ==================================================

    const sortedEntries =
        [...diaryEntries];


    sortedEntries.sort(
        function (a, b) {

            const dateDifference =
                new Date(b.date) -
                new Date(a.date);


            // Unterschiedliches Datum
            if (dateDifference !== 0) {

                return dateDifference;
            }


            // Gleiches Datum:
            // zuletzt angelegter Eintrag zuerst
            return b.id - a.id;

        }
    );


    // ==================================================
    // EINTRÄGE DURCHGEHEN
    // ==================================================

    sortedEntries.forEach(
        function (entry) {


            // Ganze Karte
            const diaryItem =
                document.createElement(
                    "article"
                );

            diaryItem.classList.add(
                "diary-item"
            );


            // ==================================================
            // DATUM
            // ==================================================

            const date =
                document.createElement(
                    "p"
                );

            date.classList.add(
                "diary-item-date"
            );

            date.textContent =
                formatDiaryDate(
                    entry.date
                );


            // ==================================================
            // TITEL
            // ==================================================

            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
                entry.title;


            diaryItem.appendChild(
                date
            );

            diaryItem.appendChild(
                title
            );


            // ==================================================
            // HEUTE GELERNT
            // ==================================================

            if (
                entry.learned !== undefined &&
                entry.learned !== ""
            ) {

                diaryItem.appendChild(
                    createDiarySection(
                        "Heute gelernt",
                        entry.learned
                    )
                );

            }


            // ==================================================
            // DAS LIEF GUT
            // ==================================================

            if (
                entry.good !== undefined &&
                entry.good !== ""
            ) {

                diaryItem.appendChild(
                    createDiarySection(
                        "Das lief gut",
                        entry.good
                    )
                );

            }


            // ==================================================
            // DAS WAR SCHWIERIG
            // ==================================================

            if (
                entry.difficult !== undefined &&
                entry.difficult !== ""
            ) {

                diaryItem.appendChild(
                    createDiarySection(
                        "Das war schwierig",
                        entry.difficult
                    )
                );

            }


            // ==================================================
            // BESONDERER MOMENT
            // ==================================================

            if (
                entry.highlight !== undefined &&
                entry.highlight !== ""
            ) {

                diaryItem.appendChild(
                    createDiarySection(
                        "Besonderer Moment",
                        entry.highlight
                    )
                );

            }


            // ==================================================
            // SONSTIGE NOTIZEN
            // ==================================================

            if (
                entry.note !== undefined &&
                entry.note !== ""
            ) {

                diaryItem.appendChild(
                    createDiarySection(
                        "Sonstige Notizen",
                        entry.note
                    )
                );

            }


            // ==================================================
            // FOTO-BEREICH
            // ==================================================

            if (
                entry.photos !== undefined &&
                entry.photos.length > 0
            ) {

                const photoArea =
                    document.createElement(
                        "div"
                    );

                photoArea.classList.add(
                    "diary-item-photos"
                );


                diaryItem.appendChild(
                    photoArea
                );


                // Fotos aus IndexedDB holen
                entry.photos.forEach(
                    function (photoId) {

                        loadPhotoFromDatabase(
                            photoId,
                            photoArea,
                            entry
                        );

                    }
                );

            }


            // ==================================================
            // BUTTON-BEREICH
            // ==================================================

            const buttonArea =
                document.createElement(
                    "div"
                );

            buttonArea.classList.add(
                "diary-button-area"
            );


            // ==================================================
            // ÄNDERN-BUTTON
            // ==================================================

            const editButton =
                document.createElement(
                    "button"
                );

            editButton.type =
                "button";

            editButton.textContent =
                "✏ Ändern";

            editButton.classList.add(
                "edit-diary-button"
            );


            editButton.addEventListener(
                "click",
                function () {

                    editDiaryEntry(
                        entry
                    );

                }
            );


            // ==================================================
            // LÖSCHEN-BUTTON
            // ==================================================

            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.type =
                "button";

            deleteButton.textContent =
                "Tagebucheintrag löschen";

            deleteButton.classList.add(
                "delete-diary-button"
            );


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteDiaryEntry(
                        entry
                    );

                }
            );


            // Buttons einfügen
            buttonArea.appendChild(
                editButton
            );

            buttonArea.appendChild(
                deleteButton
            );


            diaryItem.appendChild(
                buttonArea
            );


            // Karte anzeigen
            diaryList.appendChild(
                diaryItem
            );

        }
    );

}


// ==================================================
// TEXTBEREICH FÜR EINEN EINTRAG ERSTELLEN
// ==================================================

function createDiarySection(
    heading,
    text
) {

    const section =
        document.createElement(
            "div"
        );

    section.classList.add(
        "diary-item-section"
    );


    const sectionHeading =
        document.createElement(
            "h4"
        );

    sectionHeading.textContent =
        heading;


    const sectionText =
        document.createElement(
            "p"
        );

    sectionText.textContent =
        text;


    section.appendChild(
        sectionHeading
    );

    section.appendChild(
        sectionText
    );


    return section;

}


// ==================================================
// TAGEBUCHEINTRAG BEARBEITEN
// ==================================================

function editDiaryEntry(entry) {

    // ==================================================
    // ID DES EINTRAGS MERKEN
    // ==================================================

    editingEntryId =
        entry.id;


    // ==================================================
    // DATEN INS FORMULAR LADEN
    // ==================================================

    diaryDateInput.value =
        entry.date;

    diaryTitleInput.value =
        entry.title;

    diaryLearnedInput.value =
        entry.learned || "";

    diaryGoodInput.value =
        entry.good || "";

    diaryDifficultInput.value =
        entry.difficult || "";

    diaryHighlightInput.value =
        entry.highlight || "";

    diaryNoteInput.value =
        entry.note || "";


    // ==================================================
    // NEUE FOTOAUSWAHL ZURÜCKSETZEN
    // ==================================================

    selectedPhotos = [];

    photoPreview.innerHTML = "";

    diaryPhotoInput.value = "";


    // ==================================================
    // SPEICHERN-BUTTON ÄNDERN
    // ==================================================

    saveDiaryButton.textContent =
        "Änderungen speichern";


    // ==================================================
    // ZUM FORMULAR SCROLLEN
    // ==================================================

    const formCard =
        document.querySelector(
            ".diary-form-card"
        );


    if (formCard !== null) {

        formCard.scrollIntoView(
            {
                behavior: "smooth",
                block: "start"
            }
        );

    }

}


// ==================================================
// FOTO AUS INDEXEDDB LADEN
// ==================================================

function loadPhotoFromDatabase(
    photoId,
    photoArea,
    entry
) {

    const transaction =
        database.transaction(
            ["diaryPhotos"],
            "readonly"
        );


    const photoStore =
        transaction.objectStore(
            "diaryPhotos"
        );


    const request =
        photoStore.get(
            photoId
        );


    request.onsuccess =
        function () {


            // Foto nicht gefunden
            if (
                request.result === undefined
            ) {

                return;
            }


            const photoData =
                request.result;


            // ==================================================
            // FOTO-CONTAINER
            // ==================================================

            const photoContainer =
                document.createElement(
                    "div"
                );

            photoContainer.classList.add(
                "diary-photo"
            );


            // ==================================================
            // BILD
            // ==================================================

            const image =
                document.createElement(
                    "img"
                );


            const imageUrl =
                URL.createObjectURL(
                    photoData.file
                );


            image.src =
                imageUrl;

            image.alt =
                entry.title;


            // Speicher der temporären URL
            // nach dem Laden wieder freigeben
            image.onload =
                function () {

                    URL.revokeObjectURL(
                        imageUrl
                    );

                };


            // ==================================================
            // EINZELNES FOTO LÖSCHEN
            // ==================================================

            const deletePhotoButton =
                document.createElement(
                    "button"
                );

            deletePhotoButton.type =
                "button";

            deletePhotoButton.textContent =
                "×";

            deletePhotoButton.classList.add(
                "delete-photo-button"
            );


            deletePhotoButton.addEventListener(
                "click",
                function () {

                    const reallyDelete =
                        confirm(
                            "Möchtest du dieses Foto wirklich löschen?"
                        );


                    if (
                        reallyDelete === true
                    ) {

                        deleteSinglePhoto(
                            photoId,
                            entry
                        );

                    }

                }
            );


            photoContainer.appendChild(
                image
            );

            photoContainer.appendChild(
                deletePhotoButton
            );


            photoArea.appendChild(
                photoContainer
            );

        };

}


// ==================================================
// EINZELNES FOTO LÖSCHEN
// ==================================================

function deleteSinglePhoto(
    photoId,
    entry
) {

    const transaction =
        database.transaction(
            ["diaryPhotos"],
            "readwrite"
        );


    const photoStore =
        transaction.objectStore(
            "diaryPhotos"
        );


    const request =
        photoStore.delete(
            photoId
        );


    request.onsuccess =
        function () {


            // Foto-ID auch aus dem
            // Tagebucheintrag entfernen
            entry.photos =
                entry.photos.filter(
                    function (id) {

                        return id !==
                            photoId;

                    }
                );


            // Änderungen speichern
            saveDiaryEntries();


            // Anzeige aktualisieren
            displayDiaryEntries();

        };

}


// ==================================================
// GANZEN TAGEBUCHEINTRAG LÖSCHEN
// ==================================================

function deleteDiaryEntry(entry) {

    const reallyDelete =
        confirm(
            "Möchtest du diesen Tagebucheintrag wirklich löschen?"
        );


    if (reallyDelete === false) {

        return;
    }


    // ==================================================
    // ZUGEHÖRIGE FOTOS LÖSCHEN
    // ==================================================

    if (
        entry.photos !== undefined
    ) {

        entry.photos.forEach(
            function (photoId) {

                deletePhotoFromDatabase(
                    photoId
                );

            }
        );

    }


    // ==================================================
    // EINTRAG AUS ARRAY ENTFERNEN
    // ==================================================

    diaryEntries =
        diaryEntries.filter(
            function (savedEntry) {

                return savedEntry.id !==
                    entry.id;

            }
        );


    // ==================================================
    // FALLS DIESER EINTRAG GERADE BEARBEITET WIRD
    // ==================================================

    if (
        editingEntryId === entry.id
    ) {

        editingEntryId = null;

        clearDiaryForm();

        saveDiaryButton.textContent =
            "+ Tagebucheintrag speichern";

    }


    // ==================================================
    // SPEICHERN
    // ==================================================

    saveDiaryEntries();


    // ==================================================
    // ANZEIGE AKTUALISIEREN
    // ==================================================

    displayDiaryEntries();

}


// ==================================================
// FOTO AUS INDEXEDDB LÖSCHEN
// ==================================================

function deletePhotoFromDatabase(
    photoId
) {

    const transaction =
        database.transaction(
            ["diaryPhotos"],
            "readwrite"
        );


    const photoStore =
        transaction.objectStore(
            "diaryPhotos"
        );


    photoStore.delete(
        photoId
    );

}


// ==================================================
// TAGEBUCHEINTRÄGE IM LOCALSTORAGE SPEICHERN
// ==================================================

function saveDiaryEntries() {

    localStorage.setItem(
        "diaryEntries",
        JSON.stringify(
            diaryEntries
        )
    );

}


// ==================================================
// FORMULAR LEEREN
// ==================================================

function clearDiaryForm() {

    diaryTitleInput.value = "";

    diaryLearnedInput.value = "";

    diaryGoodInput.value = "";

    diaryDifficultInput.value = "";

    diaryHighlightInput.value = "";

    diaryNoteInput.value = "";

    diaryPhotoInput.value = "";


    // Neue ausgewählte Fotos entfernen
    selectedPhotos = [];


    // Vorschau leeren
    photoPreview.innerHTML = "";


    // Datum wieder auf heute
    setToday();

}


// ==================================================
// DATUM FORMATIEREN
// ==================================================

function formatDiaryDate(date) {

    const parts =
        date.split("-");


    const year =
        parts[0];

    const month =
        parts[1];

    const day =
        parts[2];


    return day +
        "." +
        month +
        "." +
        year;

}


// ==================================================
// HEUTIGES DATUM SETZEN
// ==================================================

function setToday() {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    diaryDateInput.value =
        year +
        "-" +
        month +
        "-" +
        day;

}