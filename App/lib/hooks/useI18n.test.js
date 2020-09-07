import React from 'react';
import {render} from '@testing-library/react';

import useI18n from './useI18n';

function setup({ language, translations, key }) {
  const returnVal = {};
  function TestComponent() {
    const { i18n } = useI18n({ language, translations });
    Object.assign(returnVal, i18n(key));
    return null;
  }
  render(<TestComponent />);
  return returnVal;
}

describe('test for useI18n', () => {
  test.todo('returns default translation for bad key');

  test.todo('returns translation for shallow key');

  test.todo('returns translation for nested key');
});

