import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "Checkout now": "Checkout now",
                    "Total for": "Total for",
                    "ticket_one": "{{count}} ticket",
                    "ticket_other": "{{count}} tickets",
                    "CZK": "CZK",
                    "Loading event...": "Loading event...",
                    "Logout": "Logout",
                    "Login": "Login",
                    "Login to your account": "Login to your account",
                    "Loading event details...": "Loading event details...",
                    "Place": "Place",
                    "Start": "Start",
                    "End": "End",
                    "Add to Calendar": "Add to Calendar",
                    "Error loading event": "Error loading event",
                    "Choose your seats": "Choose your seats",
                    "Loading seats...": "Loading seats...",
                    "Row": "Row",
                    "VIP ticket": "VIP ticket",
                    "Regular ticket": "Regular ticket",
                    "Error loading seats": "Error loading seats",
                    "Are you registered?": "Are you registered?",
                    "Sign in to your account or continue as a guest.": "Sign in to your account or continue as a guest.",
                    "Sign in": "Sign in",
                    "Continue as a guest": "Continue as a guest",
                    "You're logged in. Proceed to payment.": "You're logged in. Proceed to payment.",
   
                },
            },
            cs: {
                translation: {
                    "Checkout now": "Dokončit objednávku",
                    "Total for": "Celkem za",
                    "ticket_one": "{{count}} vstupenku",
                    "ticket_few": "{{count}} vstupenky",
                    "ticket_many": "{{count}} vstupenek",
                    "ticket_other": "{{count}} vstupenek",
                    "CZK": "Kč",
                    "Loading event...": "Načítám událost...",
                    "Logout": "Odhlásit se", // fallback
                    "Login": "Přihlásit se",
                    "Login to your account": "Přihlášení do účtu",
                    "Loading event details...": "Načítám detaily události...",
                    "Place": "Místo",
                    "Start": "Začátek",
                    "End": "Konec",
                    "Add to Calendar": "Přidat do kalendáře",
                    "Error loading event": "Chyba při načítání události",
                    "Choose your seats": "Vyberte si sedadla",
                    "Loading seats...": "Načítání sedadel...",
                    "Row": "Řada",
                    "VIP ticket": "VIP vstupenka",
                    "Regular ticket": "Běžná vstupenka",
                    "Error loading seats": "Chyba při načítání sedadel",
                    "Are you registered?": "Jste registrováni?",
                    "Sign in to your account or continue as a guest.": "Přihlaste se do svého účtu nebo pokračujte jako host.",
                    "Sign in": "Přihlásit se",
                    "Continue as a guest": "Pokračovat jako host",
                    "You're logged in. Proceed to payment.": "Jste přihlášeni. Pokračujte k platbě.",
             
                },
            },
        },
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });

export default i18n;
