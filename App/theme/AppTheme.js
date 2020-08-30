import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "emotion-theming";

import themes from "theme/themes";
import AppNavigation from "navigation/AppNavigation";
import { selectors } from "store";

const AppTheme = () => {
    const themeType = useSelector(selectors.theme);
    const selectedTheme = themes[themeType];
    

    return (
        <ThemeProvider theme={selectedTheme}>
            <AppNavigation />
        </ThemeProvider>
    );
};

export default AppTheme;
