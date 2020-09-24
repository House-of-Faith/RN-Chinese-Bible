import { createAppContainer } from 'react-navigation';

import DrawerNavigator from 'navigation/DrawerNavigator';

const App = createAppContainer(DrawerNavigator);

const AppNavigation = createAppContainer(App);

export default AppNavigation;
