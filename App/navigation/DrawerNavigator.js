import { createDrawerNavigator } from "react-navigation-drawer";

import Drawer from "screens/Drawer";
import MainNavigator from "navigation/MainNavigator"

const DrawerNavigator = createDrawerNavigator(
    {
        Main: MainNavigator,
    },
    {
        initialRouteName: "Main",
        drawerWidth: "86%",
        contentComponent: Drawer,
    }
);

export default DrawerNavigator;