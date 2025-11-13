/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/autoTranslate.ts
'use client'

import { useAppSelector } from "@/redux/hooks"
import { useState, useEffect, JSX } from "react"

interface TranslationCache {
    [key: string]: {
        [lang: string]: string
    }
}

// Cache to store translations
let translationCache: TranslationCache = {}

// Function to load cache from localStorage
const loadCache = () => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('autoTranslationCache')
        if (stored) {
            try {
                translationCache = JSON.parse(stored)
            } catch (e) {
                console.warn('Failed to load auto-translation cache')
                translationCache = {}
            }
        } else {
            translationCache = {}
        }
    }
}

// Load cache initially
loadCache()

// Save cache to localStorage
const saveCache = () => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('autoTranslationCache', JSON.stringify(translationCache))
    }
}

// Offline translations for common words (BACKUP)
const offlineTranslations: { [key: string]: { [lang: string]: string } } = {
    // Navigation
    "Home": { de: "Startseite" },
    "Browse jobs": { de: "Jobs durchsuchen" },
    "Post a Job": { de: "Job veröffentlichen" },
    "Pricing": { de: "Preise" },
    "Dashboard": { de: "Übersicht" },
    "Get Started": { de: "Loslegen" },
    "Log Out": { de: "Abmelden" },

    // Common actions
    "Accept": { de: "Annehmen" },
    "Make Offer": { de: "Angebot machen" },
    "Book Now": { de: "Jetzt buchen" },
    "Learn More": { de: "Mehr erfahren" },
    "Contact Us": { de: "Kontaktieren Sie uns" },
    "About Us": { de: "Über uns" },
    "View Profile": { "de": "Profil anzeigen" },
    "Give Order": { "de": "Auftrag erteilen" },


    // Job related
    "Price": { de: "Preis" },
    "Date": { de: "Datum" },
    "Time": { de: "Zeit" },
    "Location": { de: "Standort" },
    "Services": { de: "Dienstleistungen" },

    // Common phrases
    "Welcome": { de: "Willkommen" },
    "Loading": { de: "Wird geladen" },
    "Error": { de: "Fehler" },
    "Success": { de: "Erfolgreich" },
    "Cancel": { de: "Abbrechen" },
    "Save": { de: "Speichern" },
    "Delete": { de: "Löschen" },
    "Edit": { de: "Bearbeiten" },
}

// FREE Translation API with better error handling
const translateWithAPI = async (text: string, targetLang: string): Promise<any> => {
    try {
        console.log('🌐 API Request:', { text: text.substring(0, 50), targetLang })

        const langPair = `en|${targetLang}`
        const encodedText = encodeURIComponent(text.trim())

        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langPair}`,
            {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible)',
                }
            }
        )

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        console.log('📡 API Response:', {
            status: data.responseStatus,
            translation: data.responseData?.translatedText?.substring(0, 50),
            matches: data.matches?.length || 0
        })

        // Check if translation is valid and different from original
        if (data.responseStatus === 200 &&
            data.responseData?.translatedText &&
            data.responseData.translatedText !== text &&
            data.responseData.translatedText.trim() !== '') {

            return data.responseData.translatedText
        }

        // Try alternative translation from matches if available
        if (data.matches && data.matches.length > 0) {
            const bestMatch = data.matches[0]
            if (bestMatch.translation && bestMatch.translation !== text) {
                console.log('📡 Using match translation')
                return bestMatch.translation
            }
        }



    } catch (error) {
        console.error('❌ Translation API error:', error)

    }
}

// Alternative free API
const translateWithLibreTranslate = async (text: string, targetLang: string): Promise<any> => {
    try {
        console.log('🔄 Trying LibreTranslate as fallback')

        const response = await fetch('https://libretranslate.de/translate', {
            method: 'POST',
            body: JSON.stringify({
                q: text,
                source: 'en',
                target: targetLang,
                format: 'text'
            }),
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (compatible)'
            }
        })

        if (!response.ok) {
            throw new Error(`LibreTranslate HTTP ${response.status}`)
        }

        const data = await response.json()

        if (data.translatedText && data.translatedText !== text) {
            console.log('✅ LibreTranslate success')
            return data.translatedText
        }

    } catch (error) {
        console.error('❌ LibreTranslate error:', error)
    }
}

// Main translation function
export const translateText = async (text: string, targetLang: string): Promise<string> => {
    // If English or empty, return as is
    if (targetLang === 'en' || !text.trim()) {
        return text
    }

    // Check cache first
    if (translationCache[text] && translationCache[text][targetLang]) {
        console.log('📦 Cache hit:', translationCache[text][targetLang].substring(0, 30))
        return translationCache[text][targetLang]
    }

    // Check offline translations first
    if (offlineTranslations[text] && offlineTranslations[text][targetLang]) {
        console.log('🔧 Using offline translation')
        const translation = offlineTranslations[text][targetLang]

        // Cache the offline translation
        if (!translationCache[text]) {
            translationCache[text] = {}
        }
        translationCache[text][targetLang] = translation
        saveCache()

        return translation
    }

    console.log('🚫 Not in cache or offline, calling APIs...')

    try {
        let translatedText: string | null = null

        // Try MyMemory first
        translatedText = await translateWithAPI(text, targetLang)

        // If MyMemory fails, try LibreTranslate
        if (!translatedText) {
            translatedText = await translateWithLibreTranslate(text, targetLang)
        }

        // If both APIs fail, use original text but don't cache it
        if (!translatedText) {
            console.warn('⚠️ Both APIs failed, using original text (not caching)')
            return text
        }

        // Only cache successful translations
        console.log('✅ Translation successful, caching result')
        if (!translationCache[text]) {
            translationCache[text] = {}
        }
        translationCache[text][targetLang] = translatedText
        saveCache()

        return translatedText
    } catch (error) {
        console.error('Translation failed:', error)
        return text
    }
}

// React Component for Auto-Translation
interface AutoTranslateProps {
    children: string
    className?: string
    as?: keyof JSX.IntrinsicElements
}

export const T: React.FC<AutoTranslateProps> = ({
    children,
    className = "",
    as: Component = 'span'
}) => {
    const currentLanguage = useAppSelector((state: any) => state.language?.current || 'en')
    const [translatedText, setTranslatedText] = useState(children)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const translate = async () => {
            if (currentLanguage === 'en') {
                setTranslatedText(children)
                return
            }

            setIsLoading(true)
            try {
                const translated = await translateText(children, currentLanguage)
                setTranslatedText(translated)
            } catch (error) {
                console.error('Auto-translate failed:', error)
                setTranslatedText(children)
            } finally {
                setIsLoading(false)
            }
        }

        translate()
    }, [children, currentLanguage])

    return (
        <Component className={`${className} ${isLoading ? 'opacity-75' : ''}`}>
            {translatedText}
        </Component>
    )
}

// Hook for programmatic translations
export const useAutoTranslate = () => {
    const currentLanguage = useAppSelector((state: any) => state.language?.current || 'en')

    const translate = async (text: string): Promise<string> => {
        if (currentLanguage === 'en') return text
        return await translateText(text, currentLanguage)
    }

    return { translate, currentLanguage }
}

// Enhanced utility to clear cache
export const clearTranslationCache = () => {
    console.log('🗑️ Clearing translation cache...')

    translationCache = {}

    if (typeof window !== 'undefined') {
        localStorage.removeItem('autoTranslationCache')
        localStorage.removeItem('translationCache')
    }

    console.log('✅ Translation cache cleared completely')

    // Force reload to reset everything
    if (typeof window !== 'undefined') {
        window.location.reload()
    }
}

// Test function to verify API is working
export const testTranslation = async () => {
    console.log('🧪 Testing translation APIs...')

    const testTexts = ['Hello', 'Welcome', 'Thank you', 'Get Started']

    for (const text of testTexts) {
        console.log(`Testing: "${text}"`)
        const result = await translateWithAPI(text, 'de')
        console.log(`Result: "${result}"`)

        if (result && result !== text) {
            console.log('✅ API is working correctly')
            return true
        }
    }

    console.log('❌ API test failed')
    return false
}