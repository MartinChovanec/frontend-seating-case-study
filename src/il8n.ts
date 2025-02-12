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
                    "Loading event...": "Načítám událost...",
                    "Logout": "Odhlásit se", // fallback
                    "Login": "Přihlásit se",
                    "CZK": "Kč",
                },
            },
        },
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });

export default i18n;
