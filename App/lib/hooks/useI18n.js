import { useSelector } from 'react-redux';
import get from 'lodash/get.js';

import { selectors } from 'store';
import defaultTranslations from 'translations';

export default function useI18n(args) {
  const defaultLanguage = useSelector(selectors.language);
  const language = args?.language || defaultLanguage;
  const translations = args?.translations || defaultTranslations;

  function i18n(key) {
    if ('string' !== typeof key) return JSON.stringify(key); 
    return get(translations, `${language}.${key}`, key);
  }

  return { i18n, language };
}