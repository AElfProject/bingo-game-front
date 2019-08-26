/**
 * @file i18n translation
 * @author atom-yang
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './langs';

i18n.use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'zh',
    keySeparator: false,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
