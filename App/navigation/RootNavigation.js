import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Settings from "screens/Settings";
import DrawerNavigator from "navigation/DrawerNavigator";

const App = createAppContainer(
    createSwitchNavigator({
        Main: DrawerNavigator,
        Settings: Settings,
    })
);

const AppNavigation = createAppContainer(App);

export default AppNavigation;
