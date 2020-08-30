import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "emotion-theming";

import themes from "theme/themes";
import { selectors } from "store";

const AppTheme = ({ children }) => {
    const themeType = useSelector(selectors.theme);
    const selectedTheme = themes[themeType];
    
    return <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>;
};

export default AppTheme;
