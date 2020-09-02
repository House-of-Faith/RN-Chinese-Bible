import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'emotion-theming';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import styled from '@emotion/native';

import Settings from 'screens/Settings';

const Stack = createStackNavigator();

export default function SettingsNavigator({ navigation }) {
  const { background, text } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // eslint-disable-next-line react/display-name
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Main');
              }}
              style={{ marginLeft: 19 }}
            >
              <Icon
                name="arrow-left"
                size={24}
                color={text.navbar}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: background.navbar,
            shadowColor: 'transparent',
          },
          headerTitle: <Title>Settings</Title>,
        }}
      >
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

SettingsNavigator.propTypes = {
  navigation: PropTypes.object
};

const Title = styled.Text(({ theme }) => ({
  fontSize: 22,
  color: theme.text.navbar,
}));
