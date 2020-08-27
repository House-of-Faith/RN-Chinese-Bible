import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
import AppNavigation from "./AppNavigation";

const AppTheme = () => {
    const themeType = useSelector((state) => {
        return state.theme || "light";
    });
    const selectedTheme = theme[themeType];

    return (
        <ThemeProvider theme={selectedTheme}>
            <AppNavigation />
        </ThemeProvider>
    );
};

export default AppTheme;
