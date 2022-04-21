import LocalizedStrings from 'react-localization';
import { EN } from './en';
import { ES } from './es';
import React, { useState, useContext } from "react";

const LanguageContext = React.createContext();
export const useLanguageContext = () => useContext(LanguageContext);

export default function useTranslation() {
    const { language } = useLanguageContext();
    let translations = new LocalizedStrings({ en: EN, es: ES });


    translations.setLanguage(language);
    return translations;
}

export function LanguageContextProvider({ children }) {
    const [language, changeLanguage] = useState(process.env.REACT_APP_LANGUAGE);
    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}