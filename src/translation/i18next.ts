import { unstable_createI18nextMiddleware } from 'remix-i18next/middleware';
import { en, es, fr, ptBR } from '@translation/constants/Common';

// https://github.com/sergiodxa/remix-i18next?tab=readme-ov-file#get-the-locale
export const [i18nextMiddleware, getLocale, getInstance] = unstable_createI18nextMiddleware({
  detection: {
    supportedLanguages: ['en', 'es'],
    fallbackLanguage: 'en'
  },
  i18next: {
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
      escapeValue: false
    },
    nsSeparator: ':::',
    resources: {
      en: {
        translation: en
      },
      fr: {
        translation: fr
      },
      'pt-BR': {
        translation: ptBR
      },
      es: {
        translation: es
      }
    }
  }
});
