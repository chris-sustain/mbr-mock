import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';

import EN_COMMON from './constants/Common/en.json';
import ES_COMMON from './constants/Common/es.json';
import FR_COMMON from './constants/Common/fr.json';
import BPT_COMMON from './constants/Common/pt-BR.json';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .use(i18nextPlugin)
  // init i18next²
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    // If browser has no default language, set in french language by default
    fallbackLng: 'en',
    // saveMissing: true, // Send missing keys to the backend or save them
    // saveMissingTo: 'all', // Save missing keys to all languages
    missingKeyHandler: function (lng, ns, key, fallbackValue) {
      if (key !== '') {
        console.warn(`Missing translation key: ${key} for language: ${lng}`, {
          lng,
          ns,
          key,
          fallbackValue
        });
      }
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    nsSeparator: ':::',
    resources: {
      en: {
        translation: EN_COMMON
      },
      fr: {
        translation: FR_COMMON
      },
      'pt-BR': {
        translation: BPT_COMMON
      },
      es: {
        translation: ES_COMMON
      }
    },
    transKeepBasicHtmlNodesFor: ['span', 'br', 'strong', 'i', 'p']
  });

//eslint-disable-next-line import/no-default-export
export default i18n;
