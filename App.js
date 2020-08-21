
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Share } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import * as MailComposer from 'expo-mail-composer';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screens/Main';
import Settings from './screens/Settings';
import Drawer from './screens/Drawer';
import bible from './bible.json';

const Stack = createStackNavigator();

const MainNavigator = ({ navigation }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const book = navigation.state.params && navigation.state.params.book || bible.oldTestament[0].book;
  const chapter = navigation.state.params && navigation.state.params.chapter || '1';

  const onShare = async () => {
    try {
      const result = await Share.share({
        url:
          "https://github.com/House-of-Faith/RN-Chinese-Bible",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onFeedback = async () => {
    try {
      const result = await MailComposer.isAvailableAsync();
      console.log(result)

      if (result) {
        MailComposer.composeAsync({
          recipients: ['spencer@email.com'],
          subject: 'feedback',
          body: 'more feedback'
        });
      } else {
        alert('Error');
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLeft: () => <Button
            title="="
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />,
          headerRight: () => (
            <View>
              <Button
                title=":"
                onPress={() => {
                  setShowDropdown(!showDropdown);
                }}
              />
              {showDropdown && <View style={{ position: 'absolute', top: 10, right: 15, height: 100, width: 100, borderWidth: 1, borderColor: 'blue', backgroundColor: 'white' }}>
                <TouchableOpacity onPress={onShare}><Text>Share</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}><Text>Settings</Text></TouchableOpacity>
                <TouchableOpacity onPress={onFeedback}><Text>Feedback</Text></TouchableOpacity>
              </View>}
            </View>),
          headerTitle: `${book} ${chapter}`
        }}
      >
        <Stack.Screen name="Main">
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
    Settings: Settings
  })
);

export default App;