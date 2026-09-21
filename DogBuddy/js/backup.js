// ==================================================
// DOGBUDDY - DATENSICHERUNG
// ==================================================

// Name der IndexedDB-Datenbank
const BACKUP_DATABASE_NAME = "DogBuddyDB";


// ==================================================
// HTML-ELEMENTE
// ==================================================

const createBackupButton =
    document.getElementById("create-backup");

const restoreBackupButton =
    document.getElementById("restore-backup");

const backupFileInput =
    document.getElementById("backup-file");


// ==================================================
// LOCALSTORAGE SICHERN
// ==================================================

function getLocalStorageBackup() {

    const backup = {};

    // Alle Einträge aus dem localStorage durchgehen
    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);

        backup[key] = localStorage.getItem(key);
    }

    return backup;
}


// ==================================================
// INDEXEDDB ÖFFNEN
// ==================================================

function openBackupDatabase() {

    return new Promise((resolve, reject) => {

        const request =
            indexedDB.open(BACKUP_DATABASE_NAME);

        request.onsuccess = function () {

            resolve(request.result);
        };

        request.onerror = function () {

            reject(request.error);
        };
    });
}


// ==================================================
// EINEN INDEXEDDB-BEREICH AUSLESEN
// ==================================================

function readObjectStore(database, storeName) {

    return new Promise((resolve, reject) => {

        const transaction =
            database.transaction(
                storeName,
                "readonly"
            );

        const store =
            transaction.objectStore(storeName);

        const request =
            store.getAll();

        request.onsuccess = function () {

            resolve(request.result);
        };

        request.onerror = function () {

            reject(request.error);
        };
    });
}


// ==================================================
// DATEIEN / BLOBS IN BASE64 UMWANDELN
// ==================================================

function blobToBase64(blob) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function () {

            resolve({
                __dogBuddyBlob: true,
                type: blob.type,
                data: reader.result
            });
        };

        reader.onerror = function () {

            reject(reader.error);
        };

        reader.readAsDataURL(blob);
    });
}


// ==================================================
// INDEXEDDB-DATEN FÜR JSON VORBEREITEN
// ==================================================

async function prepareValueForBackup(value) {

    // Blob oder Datei
    if (value instanceof Blob) {

        return await blobToBase64(value);
    }


    // Array
    if (Array.isArray(value)) {

        const newArray = [];

        for (const item of value) {

            newArray.push(
                await prepareValueForBackup(item)
            );
        }

        return newArray;
    }


    // Normales Objekt
    if (
        value !== null &&
        typeof value === "object"
    ) {

        const newObject = {};

        for (const key of Object.keys(value)) {

            newObject[key] =
                await prepareValueForBackup(
                    value[key]
                );
        }

        return newObject;
    }


    // String, Zahl, Boolean usw.
    return value;
}


// ==================================================
// KOMPLETTE INDEXEDDB SICHERN
// ==================================================

async function getIndexedDBBackup() {

    const database =
        await openBackupDatabase();

    const backup = {};

    // Alle vorhandenen Bereiche automatisch erkennen
    const storeNames =
        Array.from(database.objectStoreNames);

    for (const storeName of storeNames) {

        const entries =
            await readObjectStore(
                database,
                storeName
            );

        backup[storeName] =
            await prepareValueForBackup(entries);
    }

    database.close();

    return backup;
}


// ==================================================
// BACKUP ERSTELLEN
// ==================================================

async function createBackup() {

    try {

        // Alle DogBuddy-Daten einsammeln
        const backup = {

            app: "DogBuddy",

            version: 1,

            createdAt:
                new Date().toISOString(),

            localStorage:
                getLocalStorageBackup(),

            indexedDB:
                await getIndexedDBBackup()
        };


        // Backup in JSON umwandeln
        const json =
            JSON.stringify(
                backup,
                null,
                2
            );


        // Datei erzeugen
        const blob =
            new Blob(
                [json],
                {
                    type: "application/json"
                }
            );


        // Datum für Dateinamen
        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        // Download-Link erzeugen
        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `DogBuddy-Backup-${today}.json`;


        // Datei herunterladen
        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);


        alert(
            "DogBuddy wurde erfolgreich gesichert. 💾"
        );

    } catch (error) {

        console.error(
            "Fehler beim Erstellen des Backups:",
            error
        );

        alert(
            "Das Backup konnte nicht erstellt werden."
        );
    }
}


// ==================================================
// BASE64 WIEDER IN BLOB UMWANDELN
// ==================================================

async function base64ToBlob(base64, type) {

    const response =
        await fetch(base64);

    const blob =
        await response.blob();

    return new Blob(
        [blob],
        {
            type: type || blob.type
        }
    );
}


// ==================================================
// BACKUP-WERTE WIEDERHERSTELLEN
// ==================================================

async function restorePreparedValue(value) {

    // Gesicherter Blob
    if (
        value &&
        typeof value === "object" &&
        value.__dogBuddyBlob === true
    ) {

        return await base64ToBlob(
            value.data,
            value.type
        );
    }


    // Array
    if (Array.isArray(value)) {

        const newArray = [];

        for (const item of value) {

            newArray.push(
                await restorePreparedValue(item)
            );
        }

        return newArray;
    }


    // Normales Objekt
    if (
        value !== null &&
        typeof value === "object"
    ) {

        const newObject = {};

        for (const key of Object.keys(value)) {

            newObject[key] =
                await restorePreparedValue(
                    value[key]
                );
        }

        return newObject;
    }


    return value;
}


// ==================================================
// LOCALSTORAGE WIEDERHERSTELLEN
// ==================================================

function restoreLocalStorage(data) {

    // Erst vorhandene DogBuddy-Daten entfernen
    localStorage.clear();


    // Danach Backup einspielen
    for (const key of Object.keys(data)) {

        localStorage.setItem(
            key,
            data[key]
        );
    }
}


// ==================================================
// INDEXEDDB-BEREICH WIEDERHERSTELLEN
// ==================================================

async function restoreObjectStore(
    database,
    storeName,
    entries
) {

    return new Promise(
        async (resolve, reject) => {

            try {

                const preparedEntries = [];

                // Fotos / Blobs zurückwandeln
                for (const entry of entries) {

                    preparedEntries.push(
                        await restorePreparedValue(
                            entry
                        )
                    );
                }


                const transaction =
                    database.transaction(
                        storeName,
                        "readwrite"
                    );

                const store =
                    transaction.objectStore(
                        storeName
                    );


                // Alten Inhalt entfernen
                store.clear();


                // Backup-Daten wieder einfügen
                for (
                    const entry
                    of preparedEntries
                ) {

                    store.put(entry);
                }


                transaction.oncomplete =
                    function () {

                        resolve();
                    };


                transaction.onerror =
                    function () {

                        reject(
                            transaction.error
                        );
                    };

            } catch (error) {

                reject(error);
            }
        }
    );
}


// ==================================================
// INDEXEDDB WIEDERHERSTELLEN
// ==================================================

async function restoreIndexedDB(data) {

    const database =
        await openBackupDatabase();


    for (
        const storeName
        of Object.keys(data)
    ) {

        // Nur Bereiche wiederherstellen,
        // die in DogBuddy tatsächlich existieren
        if (
            database.objectStoreNames.contains(
                storeName
            )
        ) {

            await restoreObjectStore(
                database,
                storeName,
                data[storeName]
            );
        }
    }


    database.close();
}


// ==================================================
// BACKUP-DATEI EINLESEN
// ==================================================

async function restoreBackup(file) {

    try {

        const text =
            await file.text();

        const backup =
            JSON.parse(text);


        // Prüfen, ob es wirklich ein DogBuddy-Backup ist
        if (
            !backup ||
            backup.app !== "DogBuddy" ||
            !backup.localStorage
        ) {

            alert(
                "Diese Datei ist kein gültiges DogBuddy-Backup."
            );

            return;
        }


        // Sicherheitsabfrage
        const confirmed =
            confirm(
                "Möchtest du dieses Backup wirklich wiederherstellen?\n\n" +
                "Die aktuell gespeicherten DogBuddy-Daten werden dabei ersetzt."
            );


        if (!confirmed) {

            return;
        }


        // localStorage wiederherstellen
        restoreLocalStorage(
            backup.localStorage
        );


        // IndexedDB wiederherstellen
        if (backup.indexedDB) {

            await restoreIndexedDB(
                backup.indexedDB
            );
        }


        alert(
            "Backup erfolgreich wiederhergestellt. 🐾\n\n" +
            "DogBuddy wird jetzt neu geladen."
        );


        // Seite neu laden,
        // damit alle Daten angezeigt werden
        location.reload();

    } catch (error) {

        console.error(
            "Fehler beim Wiederherstellen:",
            error
        );

        alert(
            "Das Backup konnte nicht wiederhergestellt werden."
        );
    }
}


// ==================================================
// BUTTON - BACKUP ERSTELLEN
// ==================================================

createBackupButton.addEventListener(
    "click",
    createBackup
);


// ==================================================
// BUTTON - BACKUP WIEDERHERSTELLEN
// ==================================================

restoreBackupButton.addEventListener(
    "click",
    function () {

        // Unsichtbare Dateiauswahl öffnen
        backupFileInput.click();
    }
);


// ==================================================
// AUSGEWÄHLTE BACKUP-DATEI LADEN
// ==================================================

backupFileInput.addEventListener(
    "change",
    function () {

        const file =
            backupFileInput.files[0];

        if (!file) {

            return;
        }


        restoreBackup(file);


        // Dateiauswahl wieder zurücksetzen
        backupFileInput.value = "";
    }
);