import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { render } from '@testing-library/react-native';

import Verse from './Verse';
import themes from 'theme/themes';

function setup() {
  return render(
    <ThemeProvider theme={themes['light']}>
      <Verse number={1} text="And it came to pass..." />
    </ThemeProvider>
  );
}

test('renders a verse', () => {
  const { getByText } = setup();
  const verse = getByText(/1 and it came to pass/i);

  expect(verse).toMatchSnapshot();
});
