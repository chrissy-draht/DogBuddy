// ==================================================
// DOGBUDDY - LOGIN UND REGISTRIERUNG
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ==================================================
        // LOGIN-ELEMENTE LADEN
        // ==================================================

        const loginModal =
            document.getElementById(
                "login-modal"
            );

        const openLoginButtons =
            document.querySelectorAll(
                ".public-login-button, .login-main-button"
            );

        const closeLoginButton =
            document.getElementById(
                "close-login-modal"
            );

        const cancelLoginButton =
            document.getElementById(
                "cancel-login-modal"
            );


        // ==================================================
        // REGISTRIERUNGS-ELEMENTE LADEN
        // ==================================================

        const registerModal =
            document.getElementById(
                "register-modal"
            );

        const openRegisterButtons =
            document.querySelectorAll(
                ".login-register-button, .login-modal-register-button"
            );

        const closeRegisterButton =
            document.getElementById(
                "close-register-modal"
            );

        const cancelRegisterButton =
            document.getElementById(
                "cancel-register-modal"
            );

        const backToLoginButton =
            document.querySelector(
                ".register-login-button"
            );


        // ==================================================
        // PASSWORT-VERGESSEN-ELEMENTE LADEN
        // ==================================================
        
        const forgotPasswordModal =
            document.getElementById(
                "forgot-password-modal"
            );
        
        const openForgotPasswordButton =
            document.querySelector(
                ".login-forgot-password"
            );
        
        const closeForgotPasswordButton =
            document.getElementById(
                "close-forgot-password-modal"
            );
        
        const cancelForgotPasswordButton =
            document.getElementById(
                "cancel-forgot-password-modal"
            )


        // ==================================================
        // LOGIN-POPUP ÖFFNEN
        // ==================================================

        function openLoginModal() {

            loginModal.classList.add(
                "show"
            );

            loginModal.setAttribute(
                "aria-hidden",
                "false"
            );
        }


        // ==================================================
        // LOGIN-POPUP SCHLIESSEN
        // ==================================================

        function closeLoginModal() {

            loginModal.classList.remove(
                "show"
            );

            loginModal.setAttribute(
                "aria-hidden",
                "true"
            );
        }


        // ==================================================
        // REGISTRIERUNGS-POPUP ÖFFNEN
        // ==================================================

        function openRegisterModal() {

            registerModal.classList.add(
                "show"
            );

            registerModal.setAttribute(
                "aria-hidden",
                "false"
            );
        }


        // ==================================================
        // REGISTRIERUNGS-POPUP SCHLIESSEN
        // ==================================================

        function closeRegisterModal() {

            registerModal.classList.remove(
                "show"
            );

            registerModal.setAttribute(
                "aria-hidden",
                "true"
            );
        }


        // ==================================================
        // PASSWORT-VERGESSEN-POPUP ÖFFNEN
        // ==================================================

        function openForgotPasswordModal() {

            forgotPasswordModal.classList.add(
                "show"
            );

            forgotPasswordModal.setAttribute(
                "aria-hidden",
                "false"
            );
        }


        // ==================================================
        // PASSWORT-VERGESSEN-POPUP SCHLIESSEN
        // ==================================================

        function closeForgotPasswordModal() {

            forgotPasswordModal.classList.remove(
                "show"
            );

            forgotPasswordModal.setAttribute(
                "aria-hidden",
                "true"
            );
        }


        // ==================================================
        // ANMELDEN-BUTTONS
        // Beide Buttons öffnen dasselbe Login-Popup
        // ==================================================

        openLoginButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    openLoginModal
                );
            }
        );


        // ==================================================
        // REGISTRIEREN-BUTTONS
        // Startseite und Login-Popup
        // ==================================================

        openRegisterButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        closeLoginModal();

                        openRegisterModal();
                    }
                );
            }
        );


        // ==================================================
        // VON REGISTRIERUNG ZURÜCK ZUM LOGIN
        // ==================================================

        backToLoginButton.addEventListener(
            "click",
            function () {

                closeRegisterModal();

                openLoginModal();
            }
        );


        // ==================================================
        // LOGIN MIT X SCHLIESSEN
        // ==================================================

        closeLoginButton.addEventListener(
            "click",
            closeLoginModal
        );


        // ==================================================
        // LOGIN MIT ABBRECHEN SCHLIESSEN
        // ==================================================

        cancelLoginButton.addEventListener(
            "click",
            closeLoginModal
        );


        // ==================================================
        // REGISTRIERUNG MIT X SCHLIESSEN
        // ==================================================

        closeRegisterButton.addEventListener(
            "click",
            closeRegisterModal
        );


        // ==================================================
        // REGISTRIERUNG MIT ABBRECHEN SCHLIESSEN
        // ==================================================

        cancelRegisterButton.addEventListener(
            "click",
            closeRegisterModal
        );


        // ==================================================
        // PASSWORT VERGESSEN ÖFFNEN
        // Login schließen und Passwort-Popup öffnen
        // ==================================================

        openForgotPasswordButton.addEventListener(
            "click",
            function () {

                closeLoginModal();

                openForgotPasswordModal();
            }
        );


        // ==================================================
        // PASSWORT-POPUP MIT X SCHLIESSEN
        // ==================================================

        closeForgotPasswordButton.addEventListener(
            "click",
            closeForgotPasswordModal
        );


        // ==================================================
        // PASSWORT-POPUP MIT ABBRECHEN SCHLIESSEN
        // ==================================================

        cancelForgotPasswordButton.addEventListener(
            "click",
            closeForgotPasswordModal
        );


        // ==================================================
        // PASSWORT-POPUP DURCH HINTERGRUND SCHLIESSEN
        // ==================================================

        forgotPasswordModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === forgotPasswordModal
                ) {

                    closeForgotPasswordModal();
                }
            }
        );


        // ==================================================
        // LOGIN DURCH KLICK AUF HINTERGRUND SCHLIESSEN
        // ==================================================

        loginModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === loginModal
                ) {

                    closeLoginModal();
                }
            }
        );


        // ==================================================
        // REGISTRIERUNG DURCH KLICK AUF HINTERGRUND SCHLIESSEN
        // ==================================================

        registerModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === registerModal
                ) {

                    closeRegisterModal();
                }
            }
        );


        // ==================================================
        // POPUPS MIT ESC SCHLIESSEN
        // ==================================================

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key !== "Escape") {
                    return;
                }


                if (
                    loginModal.classList.contains(
                        "show"
                    )
                ) {

                    closeLoginModal();
                }


                if (
                    registerModal.classList.contains(
                        "show"
                    )
                ) {

                    closeRegisterModal();
                }
                if (
                    forgotPasswordModal.classList.contains(
                        "show"
                    )
                ) {

                    closeForgotPasswordModal();
                }
            }
        );

    }
);