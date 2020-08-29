import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "emotion-theming";

import theme from "theme";
import AppNavigation from "AppNavigation";
import selectors from "store/selectors";

const AppTheme = () => {
    const themeType = useSelector(selectors.theme);
    const selectedTheme = theme[themeType];
    

    return (
        <ThemeProvider theme={selectedTheme}>
            <AppNavigation />
        </ThemeProvider>
    );
};

export default AppTheme;
