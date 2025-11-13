import { useEffect } from "react";
import en from "../../locales/en.json";
import de from "../../locales/de.json";

const translations: Record<string, Record<string, string>> = { en, de };

export function useGlobalLanguage(language: "en" | "de") {
    useEffect(() => {
        const replaceText = () => {
            document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
                if (el.children.length === 0) { // only leaf nodes
                    const text = el.innerText.trim();
                    if (translations[language][text]) {
                        el.innerText = translations[language][text];
                    }
                }
            });
        };

        replaceText(); // initial translation
        window.addEventListener("languageChange", replaceText);

        return () => {
            window.removeEventListener("languageChange", replaceText);
        };
    }, [language]);
}
