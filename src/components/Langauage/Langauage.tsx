"use client";

import React, { useEffect, useState, useRef } from "react";

import Script from "next/script";

import Cookies from "js-cookie";

import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";

declare global {

    interface Window {

        googleTranslateElementInit?: () => void;

        google?: {

            translate: {

                TranslateElement: {

                    new(

                        options: {

                            pageLanguage?: string;

                            includedLanguages?: string;

                            autoDisplay?: boolean;

                            layout?: number;

                            multilanguagePage?: boolean;

                            gaTrack?: boolean;

                            gaId?: string | null;

                        },

                        container: string

                    ): void;

                    InlineLayout: {
                        HORIZONTAL: number | undefined;

                        SIMPLE: number;

                    };

                };

            };

        };

    }

}

export const languages = [

    { label: "English", value: "en", src: "https://flagcdn.com/us.svg" },

    { label: "German", value: "de", src: "https://flagcdn.com/de.svg" },

];

export default function GoogleTranslate() {

    const [selected, setSelected] = useState("en");

    const [isClient, setIsClient] = useState(false);

    const [open, setOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        setIsClient(true);

        const cookieValue = Cookies.get("googtrans");

        if (cookieValue && cookieValue !== "/auto/en") {

            const parts = cookieValue.split("/");

            const target = parts[2];

            const match = languages.find((l) => l.value === target);

            if (match) setSelected(match.value);

        } else {

            setSelected("en");

            Cookies.set("googtrans", "/auto/en", { path: "/" });

        }

    }, []);

    useEffect(() => {

        window.googleTranslateElementInit = () => {

            if (window.google?.translate?.TranslateElement) {

                new window.google.translate.TranslateElement(

                    {

                        pageLanguage: "en",

                        includedLanguages: languages.map((l) => l.value).join(","),

                        autoDisplay: false,

                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,

                        multilanguagePage: false,

                    },

                    "google_translate_element"

                );

            }

        };

    }, []);

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {

            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {

                setOpen(false);

            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    const handleSelect = (newLanguage: string) => {

        setSelected(newLanguage);

        setOpen(false);

        // Clean cookies

        const paths = ["/", "/en", "/de"];

        const domains = [

            window.location.hostname,

            "." + window.location.hostname.split(".").slice(-2).join("."),

        ];

        paths.forEach((path) => {

            domains.forEach((domain) => {

                Cookies.remove("googtrans", { path, domain });

            });

        });

        Cookies.remove("googtrans");

        if (newLanguage === "en") {

            Cookies.set("googtrans", "/auto/en", { path: "/" });

        } else {

            Cookies.set("googtrans", `/auto/${newLanguage}`, { path: "/" });

        }

        window.location.reload();

    };

    if (!isClient) return null;

    const currentLang = languages.find((l) => l.value === selected);

    return (
        <div className="relative notranslate" ref={dropdownRef}>
            <div id="google_translate_element" className="hidden" />

            {/* Selected Flag */}
            <button

                onClick={() => setOpen(!open)}

                className="w-10 h-10 flex items-center justify-center transition-all duration-300"
            >
                <Image

                    src={currentLang?.src || ""}

                    alt={currentLang?.label || ""}

                    width={28}

                    height={20}

                    className="rounded object-cover"

                />
            </button>

            {/* Dropdown */}
            <AnimatePresence>

                {open && (
                    <motion.div

                        initial={{ opacity: 0, y: -8 }}

                        animate={{ opacity: 1, y: 0 }}

                        exit={{ opacity: 0, y: -8 }}

                        transition={{ duration: 0.2 }}

                        className="absolute top-12 left-0 w-12 border border-gray-200 rounded-md shadow-xl z-50 overflow-hidden"
                    >

                        {languages.map((lang) => (
                            <button

                                key={lang.value}

                                onClick={() => handleSelect(lang.value)}

                                className={`w-full flex items-center justify-center py-2 transition-colors duration-200 hover:bg-gray-100 ${lang.value === selected ? "bg-gray-50" : ""

                                    }`}
                            >
                                <Image

                                    src={lang.src}

                                    alt={lang.label}

                                    width={28}

                                    height={20}

                                    className="rounded object-cover"

                                />
                            </button>

                        ))}
                    </motion.div>

                )}
            </AnimatePresence>

            <Script

                src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"

                strategy="lazyOnload"

            />
        </div>

    );

}
