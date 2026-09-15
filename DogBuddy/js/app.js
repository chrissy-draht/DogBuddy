// ==================================================
// DOGBUDDY - JAVASCRIPT
// ==================================================


// ==================================================
// ELEMENTE AUS DEM HTML HOLEN
// ==================================================

// Button "Profil bearbeiten"
const editButton = document.getElementById("edit-profile-button");

// Bearbeitungsformular
const profileForm = document.getElementById("profile-form");

// Speichern-Button
const saveButton = document.getElementById("save-profile");

// Abbrechen-Button
const cancelButton = document.getElementById("cancel-profile");


// ==================================================
// EINGABEFELDER
// ==================================================

// Name
const dogNameInput = document.getElementById("dog-name");

// Rasse
const dogBreedInput = document.getElementById("dog-breed");

// Geschlecht
const dogGenderInput = document.getElementById("dog-gender");

// Geburtsdatum
const dogBirthdayInput = document.getElementById("dog-birthday");

// Einzugsdatum
const dogMoveInInput = document.getElementById("dog-move-in");


// ==================================================
// AUSGABEFELDER IM PROFIL
// ==================================================

// Name im Profil
const profileName = document.getElementById("profile-name");

// Rasse im Profil
const profileBreed = document.getElementById("profile-breed");

// Geschlecht im Profil
const profileGender = document.getElementById("profile-gender");

// Geburtstag im Profil
const profileBirthday = document.getElementById("profile-birthday");

// Einzugsdatum im Profil
const profileMoveIn = document.getElementById("profile-move-in");

// Alter auf dem Dashboard
const dogAge = document.getElementById("dog-age");


// ==================================================
// PROFIL BEARBEITEN
// ==================================================

// Beim Klick auf "Profil bearbeiten"
editButton.addEventListener("click", function () {

    // Formular anzeigen
    profileForm.style.display = "block";

});


// ==================================================
// ABBRECHEN
// ==================================================

// Beim Klick auf "Abbrechen"
cancelButton.addEventListener("click", function () {

    // Formular verstecken
    profileForm.style.display = "none";

});


// ==================================================
// SPEICHERN
// ==================================================

saveButton.addEventListener("click", function () {

    // Werte aus den Eingabefeldern holen
    const name = dogNameInput.value;
    const breed = dogBreedInput.value;
    const gender = dogGenderInput.value;
    const birthday = dogBirthdayInput.value;
    const moveIn = dogMoveInInput.value;


    // Name im Profil ändern
    profileName.textContent = name;


    // Rasse im Profil ändern
    profileBreed.textContent = breed;


    // Geschlecht im Profil ändern
    if (gender === "Rüde") {

        profileGender.textContent = "♂ Rüde";

    } else {

        profileGender.textContent = "♀ Hündin";

    }


    // Geburtsdatum anzeigen
    if (birthday !== "") {

        profileBirthday.textContent = formatDate(birthday);

        // Alter berechnen
        calculateAge(birthday);

    }


    // Einzugsdatum anzeigen
    if (moveIn !== "") {

        profileMoveIn.textContent = formatDate(moveIn);

    }


    // Formular nach dem Speichern schließen
    profileForm.style.display = "none";

});


// ==================================================
// DATUM FORMATIEREN
// ==================================================

function formatDate(date) {

    // Datum in einzelne Teile zerlegen
    const parts = date.split("-");

    // Jahr
    const year = parts[0];

    // Monat
    const month = parts[1];

    // Tag
    const day = parts[2];


    // Deutsches Datumsformat zurückgeben
    return day + "." + month + "." + year;

}


// ==================================================
// ALTER IN WOCHEN BERECHNEN
// ==================================================

function calculateAge(birthday) {

    // Geburtsdatum erstellen
    const birthDate = new Date(birthday);

    // Heutiges Datum
    const today = new Date();


    // Unterschied zwischen heute und Geburtstag
    const difference = today - birthDate;


    // Millisekunden einer Woche
    const millisecondsPerWeek =
        1000 * 60 * 60 * 24 * 7;


    // Alter in Wochen berechnen
    const weeks = Math.floor(
        difference / millisecondsPerWeek
    );


    // Ergebnis auf dem Dashboard anzeigen
    dogAge.textContent = weeks + " Wochen";

}