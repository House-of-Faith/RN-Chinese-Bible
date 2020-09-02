import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';

import themes from 'theme/themes';
import { selectors } from 'store';

export default function AppTheme({ children }) {
  const themeType = useSelector(selectors.theme);
  const selectedTheme = themes[themeType];

  return <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>;
}

AppTheme.propTypes = {
  children: PropTypes.object
};
