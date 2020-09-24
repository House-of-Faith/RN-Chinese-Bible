/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'emotion-theming';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import styled from '@emotion/native';

import Settings from 'screens/Settings';
import Bible from 'screens/Bible';
import { useBible, useI18n } from 'lib/hooks';
import { selectors } from 'store';

const Stack = createStackNavigator();

export default function MainNavigator({ navigation: drawerNavigation }) {
  const { i18n } = useI18n();
  const dispatch = useDispatch();
  const { background, text } = useTheme();

  const showDropdown = useSelector(selectors.showDropdown);
  const { books, setTestament } = useBible();
  const currentScripture = useSelector(selectors.currentScripture);
  const { testament, book, chapter } = currentScripture;

  const setShowDropdown = () => {
    if (showDropdown) dispatch({ type: 'HIDE_DROPDOWN' });
    else dispatch({ type: 'SHOW_DROPDOWN' });
  };

  useEffect(() => {
    setTestament(testament);
  }, [testament]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: background.navbar,
            shadowColor: 'transparent',
          },
        }}
      >
        <Stack.Screen
          name='Bible'
          component={Bible}
          options={() => ({
            headerLeft: () => <HeaderLeft navigation={drawerNavigation} />,
            headerRight: () => <HeaderRight setShowDropdown={setShowDropdown} />,
            headerTitle: () => <Title>{`${i18n(books[book])} ${chapter + 1}`}</Title>,
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={navigation.goBack}
                style={{ marginLeft: 19 }}
              >
                <Icon
                  name="arrow-left"
                  size={24}
                  color={text.navbar}
                />
              </TouchableOpacity>
            ),
            headerTitle: <Title>{i18n('settings')}</Title>,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

MainNavigator.propTypes = {
  navigation: PropTypes.object
};

const Title = styled.Text(() => ({
  fontSize: 22,
  color: '#ffffff',
}));

/*
 *
 *
 * HeaderRight
 *  
 * 
 */

function HeaderRight({ setShowDropdown }) {
  const { text } = useTheme();
  return (
    <DotMenu onPress={() => setShowDropdown(true)}>
      <Icon
        name='dots-vertical'
        size={21}
        color={text.navbar}
      />
    </DotMenu>
  );
}

HeaderRight.propTypes = {
  setShowDropdown: PropTypes.func.isRequired,
};

const DotMenu = styled.TouchableOpacity(() => ({
  paddingRight: 19,
}));

/*
 *
 *
 * HeaderLeft
 *  
 * 
 */

function HeaderLeft({ navigation }) {
  const { text } = useTheme();
  return (
    <LeftHeaderButton onPress={navigation.toggleDrawer}>
      <Icon name='menu' size={22} color={text.navbar} />
    </LeftHeaderButton>
  );
}

HeaderLeft.propTypes = {
  navigation: PropTypes.object
};

const LeftHeaderButton = styled.TouchableOpacity(() => ({
  marginLeft: 19,
}));
