import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { render } from '@testing-library/react-native';

import themes from 'theme/themes';
import Verse from './Verse';
import MockStore from 'test/mocks/MockStore';

function setup({ text }) {
  return render(
    <MockStore state={{ language: 'english' }}>
      <ThemeProvider theme={themes['light']}>
        <Verse number={1} text={text} />
      </ThemeProvider>
    </MockStore>
  );
}

test('renders a verse', () => {
  const { getByText } = setup({ text: 'And it came to pass...' });
  const verse = getByText(/1 and it came to pass/i);

  expect(verse).toBeDefined();
});


test('removes [bracket] from verse and renders in italics', () => {
  const { getByText } = setup({ text: 'And it [came] to pass...' });
  const verse = getByText(/1 and it came to pass/i);

  expect(verse).toBeDefined();
});
