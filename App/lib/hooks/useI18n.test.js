import React from 'react';
import {render} from '@testing-library/react-native';

import MockStore from 'test/mocks/MockStore';
import useI18n from './useI18n';

function setup({ language, translations }) {
  let returnVal = {};
  function TestComponent() {
    const { i18n } = useI18n({ language, translations });
    returnVal = Object.assign(returnVal, { i18n });
    return null;
  }
  render(<MockStore><TestComponent /></MockStore>);
  return returnVal;
}

describe('test for useI18n', () => {
  test('returns default translation xxx for bad key', () => {
    // GIVEN THIS
    const translations = {
      french: {
        yes: 'oui'
      }
    };
    const { i18n } = setup({ translations, language: 'badLanguage' });

    // WHEN THIS HAPPENS
    const result = i18n('badKey');

    // EXPECT THIS
    expect(result).toEqual('xxx');
  });

  test('returns translation for shallow key', () => {
    // GIVEN THIS
    const translations = {
      spanish: {
        yes: 'si'
      },
      french: {
        yes: 'oui'
      }
    };
    const { i18n } = setup({ translations, language: 'spanish' });

    // WHEN THIS HAPPENS
    const result = i18n('yes');

    // EXPECT THIS
    expect(result).toEqual('si');
  });

  test('returns translation for nested key', () => {
    // GIVEN THIS
    const translations = {
      spanish: {
        answers: {
          yes: 'si',
        },
      },
      french: {
        answers: {
          yes: 'oui',
        },
      }
    };
    const { i18n } = setup({ translations, language: 'spanish' });

    // WHEN THIS HAPPENS
    const result = i18n('answers.yes');

    // EXPECT THIS
    expect(result).toEqual('si');
  });
});

