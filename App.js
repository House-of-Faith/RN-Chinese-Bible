
import * as React from 'react';
import { Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screens/Main';
import Drawer from './screens/Drawer';
import bible from './bible.json';

const Stack = createStackNavigator();

const MainNavigator = ({ navigation }) => {
  const book = navigation.state.params && navigation.state.params.book || bible[0].book;
  const chapter = navigation.state.params && navigation.state.params.chapter || '1';

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main"
          options={{
            headerLeft: () => <Button
              title="Menu"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />,
            headerTitle: book
          }}>
          {props => <Main {...props} book={book} chapter={chapter} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const drawerNavigator = createDrawerNavigator(
  {
    Main: MainNavigator
  },
  {
    initialRouteName: 'Main',
    drawerWidth: '85%',
    contentComponent: Drawer,
  }
);

const App = createAppContainer(
  createSwitchNavigator({
    Main: drawerNavigator,
  })
);

export default App;