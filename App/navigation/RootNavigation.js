import { createAppContainer, createSwitchNavigator } from "react-navigation";

import SettingsNavigator from "navigation/SettingsNavigator";
import DrawerNavigator from "navigation/DrawerNavigator";

const App = createAppContainer(
    createSwitchNavigator({
        Main: DrawerNavigator,
        Settings: SettingsNavigator,
    })
);

const AppNavigation = createAppContainer(App);

export default AppNavigation;
