// ==================================================
// DOGBUDDY - TAGEBUCH
// ==================================================


// ==================================================
// HTML-ELEMENTE
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
// POPUP-ELEMENTE
// ==================================================

const diaryModal =
    document.getElementById("diary-form-modal");

const openDiaryButton =
    document.getElementById("open-diary-form");

const closeDiaryButton =
    document.getElementById("close-diary-form");

const cancelDiaryButton =
    document.getElementById("cancel-diary-form");

const diaryFormTitle =
    document.getElementById("diary-form-title");


// ==================================================
// VARIABLEN
// ==================================================

let selectedPhotos = [];

let editingEntryId = null;

let database = null;

let diaryEntries = [];


// ==================================================
// EINTRÄGE AUS LOCALSTORAGE LADEN
// ==================================================

const savedDiaryEntries =
    localStorage.getItem("diaryEntries");


if (savedDiaryEntries !== null) {

    try {

        const parsedEntries =
            JSON.parse(savedDiaryEntries);


        if (Array.isArray(parsedEntries)) {

            diaryEntries =
                parsedEntries;
        }

    } catch (error) {

        console.error(
            "Tagebucheinträge konnten nicht geladen werden.",
            error
        );
    }
}


// ==================================================
// HEUTIGES DATUM
// ==================================================

setToday();


// ==================================================
// POPUP ÖFFNEN - NEUER EINTRAG
// ==================================================

openDiaryButton.addEventListener(
    "click",
    function () {

        editingEntryId = null;

        clearDiaryForm();

        diaryFormTitle.textContent =
            "Neuer Tagebucheintrag";

        saveDiaryButton.textContent =
            "Tagebucheintrag speichern";

        openDiaryModal();
    }
);


// ==================================================
// POPUP SCHLIESSEN
// ==================================================

closeDiaryButton.addEventListener(
    "click",
    closeDiaryModal
);


cancelDiaryButton.addEventListener(
    "click",
    closeDiaryModal
);


// Klick auf dunklen Hintergrund schließt Popup.

diaryModal.addEventListener(
    "click",
    function (event) {

        if (event.target === diaryModal) {

            closeDiaryModal();
        }
    }
);


// ESC schließt Popup.

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            diaryModal.classList.contains("show")
        ) {

            closeDiaryModal();
        }
    }
);


// ==================================================
// POPUP ÖFFNEN
// ==================================================

function openDiaryModal() {

    diaryModal.classList.add("show");

    document.body.classList.add(
        "modal-open"
    );
}


// ==================================================
// POPUP SCHLIESSEN
// ==================================================

function closeDiaryModal() {

    diaryModal.classList.remove("show");

    document.body.classList.remove(
        "modal-open"
    );

    editingEntryId = null;

    clearDiaryForm();
}


// ==================================================
// INDEXEDDB
// ==================================================

const databaseRequest =
    indexedDB.open(
        "DogBuddyDB",
        2
    );


// ==================================================
// DATENBANK ERSTELLEN / AKTUALISIEREN
// ==================================================

databaseRequest.onupgradeneeded =
    function (event) {

        database =
            event.target.result;


        // Tagebuch-Fotos

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


        // Galerie-Fotos und Videos

        if (
            !database.objectStoreNames.contains(
                "galleryPhotos"
            )
        ) {

            database.createObjectStore(
                "galleryPhotos",
                {
                    keyPath: "id"
                }
            );
        }
    };


// ==================================================
// DATENBANK GEÖFFNET
// ==================================================

databaseRequest.onsuccess =
    function (event) {

        database =
            event.target.result;

        displayDiaryEntries();
    };


// ==================================================
// DATENBANK-FEHLER
// ==================================================

databaseRequest.onerror =
    function (event) {

        console.error(
            "DogBuddyDB konnte nicht geöffnet werden.",
            event.target.error
        );

        // Texte trotzdem anzeigen.
        displayDiaryEntries();
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


        newPhotos.forEach(
            function (photo) {

                selectedPhotos.push(photo);
            }
        );


        displayPhotoPreview();

        diaryPhotoInput.value = "";
    }
);


// ==================================================
// FOTO-VORSCHAU
// ==================================================

function displayPhotoPreview() {

    photoPreview.innerHTML = "";


    selectedPhotos.forEach(
        function (photo, index) {

            const previewItem =
                document.createElement("div");

            previewItem.classList.add(
                "photo-preview-item"
            );


            const image =
                document.createElement("img");

            const imageUrl =
                URL.createObjectURL(photo);

            image.src =
                imageUrl;

            image.alt =
                "Vorschau";

            image.onload =
                function () {

                    URL.revokeObjectURL(
                        imageUrl
                    );
                };


            const removeButton =
                document.createElement("button");

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


            previewItem.appendChild(image);

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
// SPEICHERN
// ==================================================

saveDiaryButton.addEventListener(
    "click",
    async function () {

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


        // Pflichtfelder prüfen.

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
        // NEUER EINTRAG
        // ==================================================

        if (editingEntryId === null) {

            const entryId =
                Date.now();

            const photoIds = [];


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


                try {

                    await savePhotoToDatabase(
                        photoId,
                        entryId,
                        photo
                    );

                    photoIds.push(photoId);

                } catch (error) {

                    console.error(
                        "Foto konnte nicht gespeichert werden.",
                        error
                    );
                }
            }


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
        // EINTRAG BEARBEITEN
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


                if (
                    !Array.isArray(
                        entry.photos
                    )
                ) {

                    entry.photos = [];
                }


                // Neue Fotos hinzufügen.

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


                    try {

                        await savePhotoToDatabase(
                            photoId,
                            entry.id,
                            photo
                        );

                        entry.photos.push(
                            photoId
                        );

                    } catch (error) {

                        console.error(
                            "Foto konnte nicht gespeichert werden.",
                            error
                        );
                    }
                }
            }
        }


        // Änderungen sichern.

        saveDiaryEntries();


        // Liste aktualisieren.

        displayDiaryEntries();


        // Popup schließen.

        closeDiaryModal();
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

            if (database === null) {

                reject(
                    "Datenbank ist noch nicht verfügbar."
                );

                return;
            }


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
                        request.error
                    );
                };
        }
    );
}


// ==================================================
// TAGEBUCHEINTRÄGE ANZEIGEN
// ==================================================

function displayDiaryEntries() {

    diaryList.innerHTML = "";


    // Keine Einträge.

    if (diaryEntries.length === 0) {

        const emptyText =
            document.createElement("p");

        emptyText.classList.add(
            "empty-info"
        );

        emptyText.textContent =
            "Noch kein Tagebucheintrag vorhanden.";

        diaryList.appendChild(
            emptyText
        );

        return;
    }


    // Neueste zuerst.

    const sortedEntries =
        [...diaryEntries];


    sortedEntries.sort(
        function (a, b) {

            const dateDifference =
                new Date(b.date) -
                new Date(a.date);


            if (dateDifference !== 0) {

                return dateDifference;
            }


            return b.id - a.id;
        }
    );


    // Karten erzeugen.

    sortedEntries.forEach(
        function (entry) {

            const diaryItem =
                document.createElement(
                    "article"
                );

            diaryItem.classList.add(
                "diary-item"
            );


            // Datum.

            const date =
                document.createElement("p");

            date.classList.add(
                "diary-item-date"
            );

            date.textContent =
                formatDiaryDate(
                    entry.date
                );


            // Titel.

            const title =
                document.createElement("h3");

            title.textContent =
                entry.title;


            diaryItem.appendChild(date);

            diaryItem.appendChild(title);


            // Texte.

            if (entry.learned) {

                diaryItem.appendChild(
                    createDiarySection(
                        "Heute gelernt",
                        entry.learned
                    )
                );
            }


            if (entry.good) {

                diaryItem.appendChild(
                    createDiarySection(
                        "Das lief gut",
                        entry.good
                    )
                );
            }


            if (entry.difficult) {

                diaryItem.appendChild(
                    createDiarySection(
                        "Das war schwierig",
                        entry.difficult
                    )
                );
            }


            if (entry.highlight) {

                diaryItem.appendChild(
                    createDiarySection(
                        "Besonderer Moment",
                        entry.highlight
                    )
                );
            }


            if (entry.note) {

                diaryItem.appendChild(
                    createDiarySection(
                        "Sonstige Notizen",
                        entry.note
                    )
                );
            }


            // ==================================================
            // FOTOS
            // ==================================================

            if (
                Array.isArray(entry.photos) &&
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
            // BUTTONS
            // ==================================================

            const buttonArea =
                document.createElement(
                    "div"
                );

            buttonArea.classList.add(
                "diary-button-area"
            );


            // Bearbeiten.

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


            // Löschen.

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


            buttonArea.appendChild(
                editButton
            );

            buttonArea.appendChild(
                deleteButton
            );

            diaryItem.appendChild(
                buttonArea
            );

            diaryList.appendChild(
                diaryItem
            );
        }
    );
}


// ==================================================
// TEXTABSCHNITT ERSTELLEN
// ==================================================

function createDiarySection(
    heading,
    text
) {

    const section =
        document.createElement("div");

    section.classList.add(
        "diary-item-section"
    );


    const sectionHeading =
        document.createElement("h4");

    sectionHeading.textContent =
        heading;


    const sectionText =
        document.createElement("p");

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
// EINTRAG BEARBEITEN
// ==================================================

function editDiaryEntry(entry) {

    editingEntryId =
        entry.id;


    // Vorhandene Werte eintragen.

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


    // Nur NEU ausgewählte Fotos landen hier.
    selectedPhotos = [];

    photoPreview.innerHTML = "";

    diaryPhotoInput.value = "";


    // Popup auf Bearbeiten umstellen.

    diaryFormTitle.textContent =
        "Tagebucheintrag bearbeiten";

    saveDiaryButton.textContent =
        "Änderungen speichern";


    // Popup öffnen.

    openDiaryModal();
}


// ==================================================
// FOTO AUS INDEXEDDB LADEN
// ==================================================

function loadPhotoFromDatabase(
    photoId,
    photoArea,
    entry
) {

    if (database === null) {

        return;
    }


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

            if (
                request.result === undefined
            ) {

                return;
            }


            const photoData =
                request.result;


            const photoContainer =
                document.createElement(
                    "div"
                );

            photoContainer.classList.add(
                "diary-photo"
            );


            // Bild.

            const image =
                document.createElement("img");

            const imageUrl =
                URL.createObjectURL(
                    photoData.file
                );

            image.src =
                imageUrl;

            image.alt =
                entry.title;

            image.onload =
                function () {

                    URL.revokeObjectURL(
                        imageUrl
                    );
                };


            // Foto löschen.

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


                    if (reallyDelete) {

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

    if (database === null) {

        return;
    }


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

            entry.photos =
                entry.photos.filter(
                    function (id) {

                        return id !==
                            photoId;
                    }
                );


            saveDiaryEntries();

            displayDiaryEntries();
        };
}


// ==================================================
// TAGEBUCHEINTRAG LÖSCHEN
// ==================================================

function deleteDiaryEntry(entry) {

    const reallyDelete =
        confirm(
            "Möchtest du diesen Tagebucheintrag wirklich löschen?"
        );


    if (!reallyDelete) {

        return;
    }


    // Fotos löschen.

    if (Array.isArray(entry.photos)) {

        entry.photos.forEach(
            function (photoId) {

                deletePhotoFromDatabase(
                    photoId
                );
            }
        );
    }


    // Eintrag entfernen.

    diaryEntries =
        diaryEntries.filter(
            function (savedEntry) {

                return savedEntry.id !==
                    entry.id;
            }
        );


    saveDiaryEntries();

    displayDiaryEntries();
}


// ==================================================
// FOTO AUS INDEXEDDB LÖSCHEN
// ==================================================

function deletePhotoFromDatabase(
    photoId
) {

    if (database === null) {

        return;
    }


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
// LOCALSTORAGE SPEICHERN
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

    selectedPhotos = [];

    photoPreview.innerHTML = "";

    setToday();
}


// ==================================================
// DATUM FORMATIEREN
// ==================================================

function formatDiaryDate(date) {

    if (!date) {

        return "";
    }


    const parts =
        date.split("-");


    if (parts.length !== 3) {

        return date;
    }


    return (
        parts[2] +
        "." +
        parts[1] +
        "." +
        parts[0]
    );
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