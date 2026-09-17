// ==================================================
// DOGBUDDY - GALERIE
// ==================================================


// ==================================================
// HTML-ELEMENTE
// ==================================================

const galleryPhotoInput =
    document.getElementById("gallery-photo");

const galleryFileName =
    document.getElementById("gallery-file-name");

const galleryTitleInput =
    document.getElementById("gallery-title");

const galleryDateInput =
    document.getElementById("gallery-date");

const galleryCategoryInput =
    document.getElementById("gallery-category");

const galleryDescriptionInput =
    document.getElementById("gallery-description");

const galleryUploadPreview =
    document.getElementById("gallery-upload-preview");

const saveGalleryPhotoButton =
    document.getElementById("save-gallery-photo");

const galleryGrid =
    document.getElementById("gallery-grid");

const filterButtons =
    document.querySelectorAll(".gallery-filter-button");


// ==================================================
// POPUP
// ==================================================

const galleryFormModal =
    document.getElementById("gallery-form-modal");

const openGalleryFormButton =
    document.getElementById("open-gallery-form");

const closeGalleryFormButton =
    document.getElementById("close-gallery-form");

const cancelGalleryFormButton =
    document.getElementById("cancel-gallery-form");

const galleryFormTitle =
    document.getElementById("gallery-form-title");


// ==================================================
// LIGHTBOX
// ==================================================

const galleryLightbox =
    document.getElementById("gallery-lightbox");

const galleryLightboxMedia =
    document.getElementById("gallery-lightbox-media");

const galleryLightboxCategory =
    document.getElementById("gallery-lightbox-category");

const galleryLightboxTitle =
    document.getElementById("gallery-lightbox-title");

const galleryLightboxDate =
    document.getElementById("gallery-lightbox-date");

const galleryLightboxDescription =
    document.getElementById("gallery-lightbox-description");

const closeGalleryLightboxButton =
    document.getElementById("close-gallery-lightbox");


// ==================================================
// VARIABLEN
// ==================================================

let selectedGalleryFile = null;

let currentGalleryFilter = "Alle";

let galleryEntries = [];

let editingGalleryEntryId = null;

let galleryDatabase = null;


// ==================================================
// LOCALSTORAGE LADEN
// ==================================================

const savedGalleryEntries =
    localStorage.getItem("galleryEntries");

if (savedGalleryEntries !== null) {

    try {

        const parsedEntries =
            JSON.parse(savedGalleryEntries);

        if (Array.isArray(parsedEntries)) {
            galleryEntries = parsedEntries;
        }

    } catch (error) {

        console.error(
            "Galerieeinträge konnten nicht geladen werden.",
            error
        );

    }

}


// ==================================================
// HEUTIGES DATUM EINTRAGEN
// ==================================================

setGalleryToday();


// ==================================================
// INDEXEDDB ÖFFNEN
// ==================================================

const galleryDatabaseRequest =
    indexedDB.open(
        "DogBuddyDB",
        2
    );


// ==================================================
// DATENBANK BEI BEDARF ERSTELLEN
// ==================================================

galleryDatabaseRequest.onupgradeneeded =
    function (event) {

        const database =
            event.target.result;


        // Fotos aus dem Tagebuch

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


        // Direkt in der Galerie gespeicherte Medien

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
// DATENBANK ERFOLGREICH GEÖFFNET
// ==================================================

galleryDatabaseRequest.onsuccess =
    function (event) {

        galleryDatabase =
            event.target.result;

        displayGallery();

    };


// ==================================================
// DATENBANKFEHLER
// ==================================================

galleryDatabaseRequest.onerror =
    function (event) {

        console.error(
            "DogBuddyDB konnte nicht geöffnet werden.",
            event.target.error
        );

        galleryGrid.innerHTML =
            '<p class="empty-gallery">' +
            'Die Galerie konnte nicht geladen werden.' +
            '</p>';

    };


// ==================================================
// POPUP ÖFFNEN
// ==================================================

openGalleryFormButton.addEventListener(
    "click",
    function () {

        editingGalleryEntryId = null;

        clearGalleryForm();

        galleryFormTitle.textContent =
            "Foto oder Video hinzufügen";

        saveGalleryPhotoButton.textContent =
            "Speichern";

        openGalleryModal();

    }
);


// ==================================================
// POPUP SCHLIESSEN
// ==================================================

closeGalleryFormButton.addEventListener(
    "click",
    closeGalleryModal
);

cancelGalleryFormButton.addEventListener(
    "click",
    closeGalleryModal
);


// Klick auf dunklen Hintergrund

galleryFormModal.addEventListener(
    "click",
    function (event) {

        if (event.target === galleryFormModal) {
            closeGalleryModal();
        }

    }
);


// ESC-Taste

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            if (
                galleryFormModal.classList.contains(
                    "show"
                )
            ) {

                closeGalleryModal();

            }

            if (
                galleryLightbox.classList.contains(
                    "show"
                )
            ) {

                closeGalleryLightbox();

            }

        }

    }
);


// ==================================================
// POPUP-FUNKTIONEN
// ==================================================

function openGalleryModal() {

    galleryFormModal.classList.add("show");

    document.body.classList.add(
        "gallery-modal-open"
    );

}


function closeGalleryModal() {

    galleryFormModal.classList.remove("show");

    document.body.classList.remove(
        "gallery-modal-open"
    );

    editingGalleryEntryId = null;

    clearGalleryForm();

}


// ==================================================
// FOTO ODER VIDEO AUSWÄHLEN
// ==================================================

galleryPhotoInput.addEventListener(
    "change",
    function () {

        if (
            galleryPhotoInput.files.length === 0
        ) {

            selectedGalleryFile = null;

            galleryFileName.textContent =
                "Keine Datei ausgewählt";

            galleryUploadPreview.innerHTML =
                "";

            return;

        }


        selectedGalleryFile =
            galleryPhotoInput.files[0];


        // Dateiname anzeigen

        galleryFileName.textContent =
            selectedGalleryFile.name;


        // Vorschau anzeigen

        displayUploadPreview(
            selectedGalleryFile
        );

    }
);


// ==================================================
// VORSCHAU
// ==================================================

function displayUploadPreview(file) {

    galleryUploadPreview.innerHTML = "";

    const fileUrl =
        URL.createObjectURL(file);


    // VIDEO

    if (
        file.type.startsWith("video/")
    ) {

        const video =
            document.createElement("video");

        video.src = fileUrl;

        video.controls = true;

        video.muted = true;

        video.classList.add(
            "gallery-preview-media"
        );

        video.onloadeddata =
            function () {

                URL.revokeObjectURL(
                    fileUrl
                );

            };

        galleryUploadPreview.appendChild(
            video
        );

    }


    // FOTO

    else {

        const image =
            document.createElement("img");

        image.src = fileUrl;

        image.alt =
            "Vorschau des ausgewählten Fotos";

        image.classList.add(
            "gallery-preview-media"
        );

        image.onload =
            function () {

                URL.revokeObjectURL(
                    fileUrl
                );

            };

        galleryUploadPreview.appendChild(
            image
        );

    }

}


// ==================================================
// SPEICHERN
// ==================================================

saveGalleryPhotoButton.addEventListener(
    "click",
    async function () {

        const title =
            galleryTitleInput.value.trim();

        const date =
            galleryDateInput.value;

        const category =
            galleryCategoryInput.value;

        const description =
            galleryDescriptionInput.value.trim();


        // ------------------------------------------
        // PRÜFEN
        // ------------------------------------------

        if (
            editingGalleryEntryId === null &&
            selectedGalleryFile === null
        ) {

            alert(
                "Bitte wähle zuerst ein Foto oder Video aus."
            );

            return;

        }


        if (title === "") {

            alert(
                "Bitte gib einen Titel ein."
            );

            return;

        }


        if (date === "") {

            alert(
                "Bitte wähle ein Datum aus."
            );

            return;

        }


        // ------------------------------------------
        // NEUER EINTRAG
        // ------------------------------------------

        if (
            editingGalleryEntryId === null
        ) {

            const entryId =
                Date.now();

            const mediaId =
                "gallery-" +
                entryId;


            try {

                await saveGalleryFileToDatabase(
                    mediaId,
                    selectedGalleryFile
                );


                galleryEntries.push({

                    id: entryId,

                    // Neuer Name
                    mediaId: mediaId,

                    // Alter Name bleibt ebenfalls erhalten.
                    // Dadurch bleiben ältere Teile von DogBuddy
                    // mit der Galerie kompatibel.
                    photoId: mediaId,

                    title: title,

                    date: date,

                    category: category,

                    description: description,

                    mediaType:
                        selectedGalleryFile.type.startsWith(
                            "video/"
                        )
                            ? "video"
                            : "image"

                });


                saveGalleryEntries();

                await displayGallery();

                closeGalleryModal();


            } catch (error) {

                console.error(
                    "Medium konnte nicht gespeichert werden.",
                    error
                );

                alert(
                    "Das Foto oder Video konnte nicht gespeichert werden."
                );

            }

        }


        // ------------------------------------------
        // EINTRAG BEARBEITEN
        // ------------------------------------------

        else {

            const entry =
                galleryEntries.find(
                    function (savedEntry) {

                        return (
                            savedEntry.id ===
                            editingGalleryEntryId
                        );

                    }
                );


            if (entry === undefined) {
                return;
            }


            entry.title = title;

            entry.date = date;

            entry.category = category;

            entry.description =
                description;


            // Wurde beim Bearbeiten
            // eine neue Datei ausgewählt?

            if (
                selectedGalleryFile !== null
            ) {

                const mediaId =
                    getEntryMediaId(entry);


                try {

                    await saveGalleryFileToDatabase(
                        mediaId,
                        selectedGalleryFile
                    );


                    entry.mediaType =
                        selectedGalleryFile.type.startsWith(
                            "video/"
                        )
                            ? "video"
                            : "image";


                } catch (error) {

                    console.error(
                        "Neue Datei konnte nicht gespeichert werden.",
                        error
                    );

                    return;

                }

            }


            saveGalleryEntries();

            await displayGallery();

            closeGalleryModal();

        }

    }
);


// ==================================================
// DATEI IN INDEXEDDB SPEICHERN
// ==================================================

function saveGalleryFileToDatabase(
    mediaId,
    file
) {

    return new Promise(
        function (resolve, reject) {

            if (galleryDatabase === null) {

                reject(
                    "Datenbank ist noch nicht verfügbar."
                );

                return;

            }


            const transaction =
                galleryDatabase.transaction(
                    ["galleryPhotos"],
                    "readwrite"
                );


            const store =
                transaction.objectStore(
                    "galleryPhotos"
                );


            const request =
                store.put({

                    id: mediaId,

                    file: file

                });


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
// LOCALSTORAGE SPEICHERN
// ==================================================

function saveGalleryEntries() {

    localStorage.setItem(
        "galleryEntries",
        JSON.stringify(
            galleryEntries
        )
    );

}


// ==================================================
// GALERIE ANZEIGEN
// ==================================================

async function displayGallery() {

    galleryGrid.innerHTML = "";


    // ==================================================
    // DIREKT IN DER GALERIE HOCHGELADENE MEDIEN
    // ==================================================

    const directGalleryMedia = [];


    for (
        const entry of galleryEntries
    ) {

        const mediaId =
            getEntryMediaId(entry);


        if (!mediaId) {
            continue;
        }


        const mediaData =
            await getFileFromDatabase(
                "galleryPhotos",
                mediaId
            );


        if (
            mediaData !== null &&
            mediaData.file
        ) {

            directGalleryMedia.push({

                id: entry.id,

                mediaId: mediaId,

                photoId: mediaId,

                title:
                    entry.title ||
                    "Ohne Titel",

                date:
                    entry.date ||
                    "",

                category:
                    entry.category ||
                    "Alltag",

                description:
                    entry.description ||
                    "",

                source:
                    "gallery",

                file:
                    mediaData.file,

                mediaType:
                    getMediaType(
                        mediaData.file,
                        entry.mediaType
                    )

            });

        }

    }


    // ==================================================
    // TAGEBUCHFOTOS LADEN
    // ==================================================

    const diaryMedia =
        await getDiaryPhotosForGallery();


    // ==================================================
    // BEIDE QUELLEN ZUSAMMENFÜHREN
    // ==================================================

    let allMedia = [

        ...directGalleryMedia,

        ...diaryMedia

    ];


    // Neueste zuerst

    allMedia.sort(
        function (a, b) {

            return (
                new Date(b.date) -
                new Date(a.date)
            );

        }
    );


    // ==================================================
    // FILTER
    // ==================================================

    if (
        currentGalleryFilter !== "Alle"
    ) {

        allMedia =
            allMedia.filter(
                function (media) {

                    if (
                        currentGalleryFilter ===
                        "Tagebuch"
                    ) {

                        return (
                            media.source ===
                            "diary"
                        );

                    }


                    return (
                        media.category ===
                        currentGalleryFilter
                    );

                }
            );

    }


    // ==================================================
    // NICHTS VORHANDEN
    // ==================================================

    if (allMedia.length === 0) {

        galleryGrid.innerHTML =
            '<p class="empty-gallery">' +
            'Noch keine Fotos oder Videos vorhanden.' +
            '</p>';

        return;

    }


    // ==================================================
    // KARTEN ERSTELLEN
    // ==================================================

    allMedia.forEach(
        function (media) {

            createGalleryCard(
                media
            );

        }
    );

}


// ==================================================
// ALTE UND NEUE ID UNTERSTÜTZEN
// ==================================================

function getEntryMediaId(entry) {

    return (
        entry.mediaId ||
        entry.photoId ||
        null
    );

}


// ==================================================
// MEDIENTYP ERMITTELN
// ==================================================

function getMediaType(
    file,
    savedMediaType
) {

    if (
        savedMediaType === "video"
    ) {

        return "video";

    }


    if (
        file &&
        file.type &&
        file.type.startsWith("video/")
    ) {

        return "video";

    }


    return "image";

}


// ==================================================
// TAGEBUCHFOTOS FÜR GALERIE
// ==================================================

async function getDiaryPhotosForGallery() {

    const result = [];


    // Tagebucheinträge laden

    let diaryEntries = [];

    const savedDiaryEntries =
        localStorage.getItem(
            "diaryEntries"
        );


    if (
        savedDiaryEntries !== null
    ) {

        try {

            const parsedDiaryEntries =
                JSON.parse(
                    savedDiaryEntries
                );


            if (
                Array.isArray(
                    parsedDiaryEntries
                )
            ) {

                diaryEntries =
                    parsedDiaryEntries;

            }

        } catch (error) {

            console.error(
                "Tagebucheinträge konnten nicht für die Galerie geladen werden.",
                error
            );

        }

    }


    // Jeden Tagebucheintrag prüfen

    for (
        const diaryEntry of diaryEntries
    ) {

        if (
            !Array.isArray(
                diaryEntry.photos
            )
        ) {

            continue;

        }


        for (
            const photoId of diaryEntry.photos
        ) {

            const photoData =
                await getFileFromDatabase(
                    "diaryPhotos",
                    photoId
                );


            if (
                photoData !== null &&
                photoData.file
            ) {

                result.push({

                    id:
                        "diary-" +
                        photoId,

                    photoId:
                        photoId,

                    title:
                        diaryEntry.title ||
                        "Tagebuch",

                    date:
                        diaryEntry.date ||
                        "",

                    category:
                        "Tagebuch",

                    description:
                        diaryEntry.highlight ||
                        diaryEntry.note ||
                        "",

                    source:
                        "diary",

                    file:
                        photoData.file,

                    mediaType:
                        "image"

                });

            }

        }

    }


    return result;

}


// ==================================================
// DATEI AUS INDEXEDDB HOLEN
// ==================================================

function getFileFromDatabase(
    storeName,
    id
) {

    return new Promise(
        function (resolve) {

            if (
                galleryDatabase === null
            ) {

                resolve(null);

                return;

            }


            if (
                !galleryDatabase.objectStoreNames.contains(
                    storeName
                )
            ) {

                resolve(null);

                return;

            }


            const transaction =
                galleryDatabase.transaction(
                    [storeName],
                    "readonly"
                );


            const store =
                transaction.objectStore(
                    storeName
                );


            const request =
                store.get(id);


            request.onsuccess =
                function () {

                    if (
                        request.result ===
                        undefined
                    ) {

                        resolve(null);

                    } else {

                        resolve(
                            request.result
                        );

                    }

                };


            request.onerror =
                function () {

                    resolve(null);

                };

        }
    );

}


// ==================================================
// GALERIE-KARTE ERSTELLEN
// ==================================================

function createGalleryCard(media) {

    const card =
        document.createElement("article");

    card.classList.add(
        "gallery-card"
    );


    // ==================================================
    // MEDIENBEREICH
    // ==================================================

    const mediaArea =
        document.createElement("div");

    mediaArea.classList.add(
        "gallery-card-image"
    );


    const mediaUrl =
        URL.createObjectURL(
            media.file
        );


    // VIDEO

    if (
        media.mediaType === "video"
    ) {

        const video =
            document.createElement("video");

        video.src =
            mediaUrl;

        video.muted = true;

        video.preload =
            "metadata";

        video.classList.add(
            "gallery-card-media"
        );

        mediaArea.appendChild(
            video
        );

    }


    // FOTO

    else {

        const image =
            document.createElement("img");

        image.src =
            mediaUrl;

        image.alt =
            media.title;

        image.classList.add(
            "gallery-card-media"
        );

        mediaArea.appendChild(
            image
        );

    }


    // ==================================================
    // BADGE FÜR VIDEO
    // ==================================================

    if (
        media.mediaType === "video"
    ) {

        const videoBadge =
            document.createElement("span");

        videoBadge.classList.add(
            "gallery-video-badge"
        );

        videoBadge.textContent =
            "▶ Video";

        mediaArea.appendChild(
            videoBadge
        );

    }


    // ==================================================
    // INFORMATIONEN
    // ==================================================

    const info =
        document.createElement("div");

    info.classList.add(
        "gallery-card-info"
    );


    const category =
        document.createElement("p");

    category.classList.add(
        "gallery-card-category"
    );

    category.textContent =
        getCategoryLabel(
            media.category
        );


    const title =
        document.createElement("h3");

    title.textContent =
        media.title;


    const date =
        document.createElement("p");

    date.classList.add(
        "gallery-card-date"
    );

    date.textContent =
        formatGalleryDate(
            media.date
        );


    info.appendChild(
        category
    );

    info.appendChild(
        title
    );

    info.appendChild(
        date
    );


    // ==================================================
    // BUTTONS NUR BEI DIREKTEN GALERIE-EINTRÄGEN
    // ==================================================

    if (
        media.source === "gallery"
    ) {

        const buttonArea =
            document.createElement("div");

        buttonArea.classList.add(
            "gallery-card-buttons"
        );


        // BEARBEITEN

        const editButton =
            document.createElement("button");

        editButton.type =
            "button";

        editButton.textContent =
            "✏ Ändern";

        editButton.classList.add(
            "gallery-edit-button"
        );


        editButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                editGalleryEntry(
                    media.id
                );

            }
        );


        // LÖSCHEN

        const deleteButton =
            document.createElement("button");

        deleteButton.type =
            "button";

        deleteButton.textContent =
            "Löschen";

        deleteButton.classList.add(
            "gallery-delete-button"
        );


        deleteButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                deleteGalleryEntry(
                    media.id
                );

            }
        );


        buttonArea.appendChild(
            editButton
        );

        buttonArea.appendChild(
            deleteButton
        );

        info.appendChild(
            buttonArea
        );

    }


    // ==================================================
    // LIGHTBOX BEIM ANKLICKEN
    // ==================================================

    mediaArea.addEventListener(
        "click",
        function () {

            openGalleryLightbox(
                media
            );

        }
    );


    mediaArea.style.cursor =
        "pointer";


    // URL erst freigeben,
    // wenn das Element geladen wurde

    const displayedMedia =
        mediaArea.querySelector(
            "img, video"
        );


    if (
        displayedMedia.tagName === "IMG"
    ) {

        displayedMedia.onload =
            function () {

                URL.revokeObjectURL(
                    mediaUrl
                );

            };

    } else {

        displayedMedia.onloadeddata =
            function () {

                URL.revokeObjectURL(
                    mediaUrl
                );

            };

    }


    card.appendChild(
        mediaArea
    );

    card.appendChild(
        info
    );

    galleryGrid.appendChild(
        card
    );

}


// ==================================================
// GALERIE-EINTRAG BEARBEITEN
// ==================================================

function editGalleryEntry(entryId) {

    const entry =
        galleryEntries.find(
            function (savedEntry) {

                return (
                    savedEntry.id ===
                    entryId
                );

            }
        );


    if (
        entry === undefined
    ) {

        return;

    }


    editingGalleryEntryId =
        entry.id;


    galleryTitleInput.value =
        entry.title || "";

    galleryDateInput.value =
        entry.date || "";

    galleryCategoryInput.value =
        entry.category || "Alltag";

    galleryDescriptionInput.value =
        entry.description || "";


    selectedGalleryFile = null;

    galleryPhotoInput.value = "";

    galleryFileName.textContent =
        "Aktuelle Datei bleibt erhalten";

    galleryUploadPreview.innerHTML =
        "";


    galleryFormTitle.textContent =
        "Foto oder Video bearbeiten";

    saveGalleryPhotoButton.textContent =
        "Änderungen speichern";


    openGalleryModal();

}


// ==================================================
// GALERIE-EINTRAG LÖSCHEN
// ==================================================

async function deleteGalleryEntry(
    entryId
) {

    const entry =
        galleryEntries.find(
            function (savedEntry) {

                return (
                    savedEntry.id ===
                    entryId
                );

            }
        );


    if (
        entry === undefined
    ) {

        return;

    }


    const reallyDelete =
        confirm(
            "Möchtest du diesen Galerieeintrag wirklich löschen?"
        );


    if (!reallyDelete) {
        return;
    }


    const mediaId =
        getEntryMediaId(entry);


    if (mediaId) {

        await deleteGalleryFileFromDatabase(
            mediaId
        );

    }


    galleryEntries =
        galleryEntries.filter(
            function (savedEntry) {

                return (
                    savedEntry.id !==
                    entryId
                );

            }
        );


    saveGalleryEntries();

    await displayGallery();

}


// ==================================================
// DATEI AUS INDEXEDDB LÖSCHEN
// ==================================================

function deleteGalleryFileFromDatabase(
    mediaId
) {

    return new Promise(
        function (resolve) {

            if (
                galleryDatabase === null
            ) {

                resolve();

                return;

            }


            const transaction =
                galleryDatabase.transaction(
                    ["galleryPhotos"],
                    "readwrite"
                );


            const store =
                transaction.objectStore(
                    "galleryPhotos"
                );


            const request =
                store.delete(
                    mediaId
                );


            request.onsuccess =
                function () {

                    resolve();

                };


            request.onerror =
                function () {

                    resolve();

                };

        }
    );

}


// ==================================================
// FILTER
// ==================================================

filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (filterButton) {

                        filterButton.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentGalleryFilter =
                    button.dataset.category;


                displayGallery();

            }
        );

    }
);


// ==================================================
// LIGHTBOX ÖFFNEN
// ==================================================

function openGalleryLightbox(
    media
) {

    galleryLightboxMedia.innerHTML =
        "";


    const mediaUrl =
        URL.createObjectURL(
            media.file
        );


    // VIDEO

    if (
        media.mediaType === "video"
    ) {

        const video =
            document.createElement("video");

        video.src =
            mediaUrl;

        video.controls =
            true;

        video.autoplay =
            true;

        video.classList.add(
            "gallery-lightbox-file"
        );

        galleryLightboxMedia.appendChild(
            video
        );

    }


    // FOTO

    else {

        const image =
            document.createElement("img");

        image.src =
            mediaUrl;

        image.alt =
            media.title;

        image.classList.add(
            "gallery-lightbox-file"
        );

        galleryLightboxMedia.appendChild(
            image
        );

    }


    galleryLightboxMedia.dataset.objectUrl =
        mediaUrl;


    galleryLightboxCategory.textContent =
        getCategoryLabel(
            media.category
        );


    galleryLightboxTitle.textContent =
        media.title;


    galleryLightboxDate.textContent =
        formatGalleryDate(
            media.date
        );


    galleryLightboxDescription.textContent =
        media.description || "";


    galleryLightbox.classList.add(
        "show"
    );


    document.body.classList.add(
        "gallery-modal-open"
    );

}


// ==================================================
// LIGHTBOX SCHLIESSEN
// ==================================================

function closeGalleryLightbox() {

    const objectUrl =
        galleryLightboxMedia.dataset.objectUrl;


    if (objectUrl) {

        URL.revokeObjectURL(
            objectUrl
        );

    }


    galleryLightboxMedia.innerHTML =
        "";

    delete galleryLightboxMedia.dataset.objectUrl;


    galleryLightbox.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "gallery-modal-open"
    );

}


// X-BUTTON

closeGalleryLightboxButton.addEventListener(
    "click",
    closeGalleryLightbox
);


// Klick auf Hintergrund

galleryLightbox.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            galleryLightbox
        ) {

            closeGalleryLightbox();

        }

    }
);


// ==================================================
// FORMULAR LEEREN
// ==================================================

function clearGalleryForm() {

    selectedGalleryFile = null;

    galleryPhotoInput.value = "";

    galleryFileName.textContent =
        "Keine Datei ausgewählt";

    galleryTitleInput.value = "";

    galleryDescriptionInput.value = "";

    galleryCategoryInput.value =
        "Alltag";

    galleryUploadPreview.innerHTML =
        "";

    setGalleryToday();

}


// ==================================================
// KATEGORIE MIT SYMBOL
// ==================================================

function getCategoryLabel(
    category
) {

    switch (category) {

        case "Alltag":
            return "🐾 Alltag";

        case "Ausflug":
            return "🌲 Ausflug";

        case "Training":
            return "🎓 Training";

        case "Wasser":
            return "💦 Wasser";

        case "Zuhause":
            return "💤 Zuhause";

        case "Besonderer Moment":
            return "❤️ Besonderer Moment";

        case "Tagebuch":
            return "📖 Tagebuch";

        default:
            return category || "";

    }

}


// ==================================================
// DATUM FORMATIEREN
// ==================================================

function formatGalleryDate(
    date
) {

    if (!date) {
        return "";
    }


    const parts =
        date.split("-");


    if (
        parts.length !== 3
    ) {

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
// HEUTIGES DATUM
// ==================================================

function setGalleryToday() {

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


    galleryDateInput.value =
        year +
        "-" +
        month +
        "-" +
        day;

}