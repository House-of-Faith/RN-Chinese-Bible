import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { render } from '@testing-library/react-native';

import themes from 'theme/themes';
import Chapter from './Chapter';

function setup() {
  return render(
    <ThemeProvider theme={themes['light']}>
      <Chapter verses={['Verse 1', 'Verse 2']} />
    </ThemeProvider>
  );
}

test('renders a chapter with two verses', () => {
  const { getAllByText } = setup();
  const verses = getAllByText(/\d Verse \d/i);

  expect(verses.length).toEqual(2);
});
