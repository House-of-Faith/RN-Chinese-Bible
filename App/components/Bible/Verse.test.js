import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { render } from '@testing-library/react-native';

import themes from 'theme/themes';
import Verse from './Verse';
import MockStore from 'test/mocks/MockStore';

function setup() {
  return render(
    <MockStore>
      <ThemeProvider theme={themes['light']}>
        <Verse number={1} text="And it came to pass..." />
      </ThemeProvider>
    </MockStore>
  );
}

test('renders a verse', () => {
  const { getByText } = setup();
  const verse = getByText(/1 and it came to pass/i);

  expect(verse).toBeDefined();
});
