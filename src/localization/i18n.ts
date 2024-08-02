import i18n from "i18next";
import { initReactI18next } from "react-i18next";



const resources = {
    es: {
        translation: {
            "general-tab": "General",
            "by-country-tab": "Por paises",
            "help-img-tab": "Ayuda",
            "year": "año",
            "total-events": "Eventos totales",
            "repository": "Repositorio",
            "views": "Vistas",
            "downloads": "Descargas",
            "outlinks": "Enlaces",
            "conversions": "Conversiones",
            "month": "mes"
        },
    },
    pt: {
        translation: {
            "general-tab": "Geral",
            "by-country-tab": "Por países",
            "help-img-tab": "Ajuda",
            "year": "ano",
            "total-events": "Eventos totais",
            "repository": "Repositório",
            "views": "Visualizações",
            "downloads": "Descargas",
            "outlinks": "Links",
            "conversions": "Conversões",
            "month": "mês"
        }
    },
    en: {
        translation: {
            "general-tab": "General",
            "by-country-tab": "By countries",
            "help-img-tab": "Help",
            "year": "year",
            "total-events": "Total events",
            "repository": "Repository",
            "views": "Views",
            "downloads": "Downloads",
            "outlinks": "Outlinks",
            "conversions": "Conversions",
            "month": "month"

        }
    }
}


i18n.use(initReactI18next)
    .init({
        resources: resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;