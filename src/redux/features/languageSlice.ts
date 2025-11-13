// redux/features/languageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LanguageState {
    current: 'en' | 'de'
}

const initialState: LanguageState = {
    current: 'en' // Default to English
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<'en' | 'de'>) => {
            state.current = action.payload
            // Save to localStorage so language persists across sessions
            if (typeof window !== 'undefined') {
                localStorage.setItem('preferred-language', action.payload)
            }
        },
        initializeLanguage: (state) => {
            // Load saved language from localStorage or browser language
            if (typeof window !== 'undefined') {
                const savedLanguage = localStorage.getItem('preferred-language')
                const browserLanguage = navigator.language.slice(0, 2)

                if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
                    state.current = savedLanguage as 'en' | 'de'
                } else if (browserLanguage === 'de') {
                    state.current = 'de'
                } else {
                    state.current = 'en'
                }
            }
        }
    },
})

export const { setLanguage, initializeLanguage } = languageSlice.actions
export default languageSlice.reducer