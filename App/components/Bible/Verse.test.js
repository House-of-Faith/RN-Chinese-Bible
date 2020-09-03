import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import { render } from '@testing-library/react-native';

import store from 'store';
import themes from 'theme/themes';
import Verse from './Verse';

function setup() {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={themes['light']}>
        <Verse number={1} text="And it came to pass..." />
      </ThemeProvider>
    </Provider>
  );
}

test('renders a verse', () => {
  const { getByText } = setup();
  const verse = getByText(/1 and it came to pass/i);

  expect(verse).toMatchSnapshot();
});
