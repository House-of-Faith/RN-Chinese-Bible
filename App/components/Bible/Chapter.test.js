import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import { render } from '@testing-library/react-native';

import store from 'store';
import themes from 'theme/themes';
import Chapter from './Chapter';

function setup() {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={themes['light']}>
        <Chapter verses={['Verse 1', 'Verse 2']} />
      </ThemeProvider>
    </Provider>
  );
}

test('renders a chapter with two verses', () => {
  const { getAllByText } = setup();
  const verses = getAllByText(/\d Verse \d/i);

  expect(verses.length).toEqual(2);
});
