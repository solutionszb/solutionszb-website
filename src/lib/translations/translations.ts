import enTranslations from './en.json';

export type TranslationKeys = typeof enTranslations;
export type Language = 'en'; // Will expand to 'en' | 'fr' | 'es' etc. when adding more languages

class TranslationService {
  private currentLanguage: Language = 'en';
  private translations: Record<Language, TranslationKeys> = {
    en: enTranslations
  };

  setLanguage(lang: Language) {
    this.currentLanguage = lang;
  }

  getLanguage(): Language {
    return this.currentLanguage;
  }

  t(): TranslationKeys {
    return this.translations[this.currentLanguage];
  }
}

export const i18n = new TranslationService();
export const t = () => i18n.t();
