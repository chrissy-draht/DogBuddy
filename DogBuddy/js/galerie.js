// ==================================================
// DOGBUDDY - GALERIE
// ==================================================


// ==================================================
// HTML-ELEMENTE
// ==================================================

// Hundename in der Seitenüberschrift
const pageDogName =
    document.getElementById("page-dog-name");

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

const galleryLightboxPreviousButton =
    document.getElementById("gallery-lightbox-previous");

const galleryLightboxNextButton =
    document.getElementById("gallery-lightbox-next");

const galleryLightboxCounter =
    document.getElementById("gallery-lightbox-counter");



// ==================================================
// HUNDENAME AUS DEM PROFIL LADEN
// ==================================================

const savedDog =
    localStorage.getItem("dogProfile");

if (savedDog !== null) {

    const dog =
        JSON.parse(savedDog);

    pageDogName.textContent =
        dog.name;
}


// ==================================================
// VARIABLEN
// ==================================================


let selectedGalleryFile = null;

let currentGalleryFilter = "Alle";

let galleryEntries = [];

let editingGalleryEntryId = null;

let galleryDatabase = null;


// Für mehrere Bilder in einem Tagebucheintrag
let currentLightboxMedia = [];

let currentLightboxIndex = 0;

let currentLightboxEntry = null;


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


// ==================================================
// TASTATUR
// ==================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            if (
                galleryFormModal.classList.contains("show")
            ) {
                closeGalleryModal();
            }

            if (
                galleryLightbox.classList.contains("show")
            ) {
                closeGalleryLightbox();
            }

        }


        // Mit Pfeiltasten durch Tagebuchfotos blättern

        if (
            galleryLightbox.classList.contains("show") &&
            currentLightboxMedia.length > 1
        ) {

            if (event.key === "ArrowLeft") {
                showPreviousLightboxImage();
            }

            if (event.key === "ArrowRight") {
                showNextLightboxImage();
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

            galleryUploadPreview.innerHTML = "";

            return;

        }


        selectedGalleryFile =
            galleryPhotoInput.files[0];

        galleryFileName.textContent =
            selectedGalleryFile.name;

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

    } else {

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


        // ==================================================
        // EINGABEN PRÜFEN
        // ==================================================

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


        // ==================================================
        // NEUER GALERIEEINTRAG
        // ==================================================

        if (
            editingGalleryEntryId === null
        ) {

            const entryId =
                Date.now();

            const mediaId =
                "gallery-" + entryId;


            try {

                await saveGalleryFileToDatabase(
                    mediaId,
                    selectedGalleryFile
                );


                galleryEntries.push({

                    id: entryId,

                    mediaId: mediaId,

                    // Alter Name bleibt für ältere Daten erhalten
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


        // ==================================================
        // GALERIEEINTRAG BEARBEITEN
        // ==================================================

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


            // Wurde beim Bearbeiten eine neue Datei gewählt?

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
                    ),

                // Normale Galerieeinträge haben nur ein Medium
                mediaFiles: [
                    {
                        file: mediaData.file,
                        mediaType:
                            getMediaType(
                                mediaData.file,
                                entry.mediaType
                            )
                    }
                ]

            });

        }

    }


    // ==================================================
    // TAGEBUCHEINTRÄGE MIT FOTOS LADEN
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
// WICHTIG:
// Früher wurde hier für JEDES Foto eine eigene
// Galeriekarte erzeugt.
//
// Jetzt wird pro TAGEBUCHEINTRAG nur noch
// EIN Galerieobjekt erzeugt.
// Alle zugehörigen Fotos liegen in "mediaFiles".
// ==================================================

async function getDiaryPhotosForGallery() {

    const result = [];

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


    // ==================================================
    // JEDEN TAGEBUCHEINTRAG PRÜFEN
    // ==================================================

    for (
        const diaryEntry of diaryEntries
    ) {

        if (
            !Array.isArray(
                diaryEntry.photos
            ) ||
            diaryEntry.photos.length === 0
        ) {

            continue;

        }


        // Alle Fotos DIESES Tagebucheintrags sammeln

        const mediaFiles = [];


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

                mediaFiles.push({

                    photoId: photoId,

                    file: photoData.file,

                    mediaType: "image"

                });

            }

        }


        // Wenn kein Foto gefunden wurde:
        // Eintrag überspringen

        if (mediaFiles.length === 0) {
            continue;
        }


        // ==================================================
        // NUR EIN OBJEKT PRO TAGEBUCHEINTRAG
        // ==================================================

        result.push({

            id:
                "diary-" +
                (
                    diaryEntry.id ||
                    diaryEntry.date ||
                    result.length
                ),

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

            // Erstes Foto wird Vorschaubild
            file:
                mediaFiles[0].file,

            mediaType:
                "image",

            // Alle Fotos des Tagebucheintrags
            mediaFiles:
                mediaFiles

        });

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
    // VIDEO-BADGE
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
    // MEHRERE TAGEBUCHFOTOS: +X ANZEIGEN
    // ==================================================

    if (
        media.source === "diary" &&
        Array.isArray(media.mediaFiles) &&
        media.mediaFiles.length > 1
    ) {

        const morePhotosBadge =
            document.createElement("span");

        morePhotosBadge.classList.add(
            "gallery-more-photos"
        );


        // Beispiel:
        // insgesamt 4 Bilder
        // 1 ist sichtbar
        // also +3

        morePhotosBadge.textContent =
            "+" +
            (
                media.mediaFiles.length - 1
            );


        mediaArea.appendChild(
            morePhotosBadge
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


    // Object-URL nach dem Laden freigeben

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

    currentLightboxEntry =
        media;


    // Wenn mehrere Medien vorhanden sind,
    // verwenden wir das komplette Array.

    if (
        Array.isArray(media.mediaFiles) &&
        media.mediaFiles.length > 0
    ) {

        currentLightboxMedia =
            media.mediaFiles;

    } else {

        currentLightboxMedia = [
            {
                file: media.file,
                mediaType: media.mediaType
            }
        ];

    }


    currentLightboxIndex = 0;


    // Informationen eintragen

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


    // Erstes Bild anzeigen

    displayCurrentLightboxMedia();


    galleryLightbox.classList.add(
        "show"
    );


    document.body.classList.add(
        "gallery-modal-open"
    );

}


// ==================================================
// AKTUELLES LIGHTBOX-BILD ANZEIGEN
// ==================================================

function displayCurrentLightboxMedia() {

    // Alte Object-URL freigeben

    const oldObjectUrl =
        galleryLightboxMedia.dataset.objectUrl;


    if (oldObjectUrl) {

        URL.revokeObjectURL(
            oldObjectUrl
        );

    }


    galleryLightboxMedia.innerHTML =
        "";


    const currentMedia =
        currentLightboxMedia[
            currentLightboxIndex
        ];


    if (!currentMedia) {
        return;
    }


    const mediaUrl =
        URL.createObjectURL(
            currentMedia.file
        );


    galleryLightboxMedia.dataset.objectUrl =
        mediaUrl;


    // VIDEO

    if (
        currentMedia.mediaType === "video"
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
            currentLightboxEntry
                ? currentLightboxEntry.title
                : "Galeriefoto";

        image.classList.add(
            "gallery-lightbox-file"
        );

        galleryLightboxMedia.appendChild(
            image
        );

    }


    // ==================================================
    // ZÄHLER UND PFEILE
    // ==================================================

    if (
        currentLightboxMedia.length > 1
    ) {

        galleryLightboxCounter.textContent =
            (
                currentLightboxIndex + 1
            ) +
            " / " +
            currentLightboxMedia.length;


        galleryLightboxCounter.hidden =
            false;

        galleryLightboxPreviousButton.hidden =
            false;

        galleryLightboxNextButton.hidden =
            false;

    } else {

        galleryLightboxCounter.textContent =
            "";

        galleryLightboxCounter.hidden =
            true;

        galleryLightboxPreviousButton.hidden =
            true;

        galleryLightboxNextButton.hidden =
            true;

    }

}


// ==================================================
// VORHERIGES BILD
// ==================================================

function showPreviousLightboxImage() {

    if (
        currentLightboxMedia.length <= 1
    ) {
        return;
    }


    currentLightboxIndex--;


    // Beim ersten Bild wieder zum letzten springen

    if (
        currentLightboxIndex < 0
    ) {

        currentLightboxIndex =
            currentLightboxMedia.length - 1;

    }


    displayCurrentLightboxMedia();

}


// ==================================================
// NÄCHSTES BILD
// ==================================================

function showNextLightboxImage() {

    if (
        currentLightboxMedia.length <= 1
    ) {
        return;
    }


    currentLightboxIndex++;


    // Nach dem letzten wieder zum ersten springen

    if (
        currentLightboxIndex >=
        currentLightboxMedia.length
    ) {

        currentLightboxIndex = 0;

    }


    displayCurrentLightboxMedia();

}


// ==================================================
// LIGHTBOX-PFEILE
// ==================================================

galleryLightboxPreviousButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        showPreviousLightboxImage();

    }
);


galleryLightboxNextButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        showNextLightboxImage();

    }
);


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


    // Lightbox zurücksetzen

    currentLightboxMedia = [];

    currentLightboxIndex = 0;

    currentLightboxEntry = null;

}


// X-BUTTON

closeGalleryLightboxButton.addEventListener(
    "click",
    closeGalleryLightbox
);


// Klick auf dunklen Hintergrund

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
