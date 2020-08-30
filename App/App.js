import React from "react";
import { Provider } from "react-redux";
import { registerRootComponent } from 'expo';

import store from "store";
import AppTheme from "theme/AppTheme";

const App = () => {
    return (
        <Provider store={store}>
            <AppTheme />
        </Provider>
    );
};

export default registerRootComponent(App);
