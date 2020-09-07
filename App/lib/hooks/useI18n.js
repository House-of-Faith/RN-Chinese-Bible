import { useSelector } from 'react-redux';
import get from 'lodash/get.js';

import { selectors } from 'store';
import translations from 'translations';

export default function useI18n() {
  const language = useSelector(selectors.language);

  function i18n(key) {
    return get(translations, `[${language}][${key}]`, 'xxx');
  }

  return { i18n, language };
}