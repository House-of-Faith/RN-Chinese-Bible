import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Share } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'emotion-theming';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import styled from '@emotion/native';

import Bible from 'screens/Bible';
import { useBible } from 'lib/hooks';
import { selectors } from 'store';

const Stack = createStackNavigator();

export default function MainNavigator({ navigation }) {
  const dispatch = useDispatch();
  const { background } = useTheme();

  const showDropdown = useSelector(selectors.showDropdown);
  const { books, setTestament } = useBible();
  const { testament, book, chapter } = useSelector(selectors.currentScripture);

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
          // eslint-disable-next-line react/display-name
          headerLeft: () => <HeaderLeft navigation={navigation} showDropdown={showDropdown} />,
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            <HeaderRight navigation={navigation} dropdownState={[showDropdown, setShowDropdown]} />
          ),
          headerTitle: <Title>{`${books[book]} ${chapter + 1}`}</Title>,
        }}
      >
        <Stack.Screen name='Bible' component={Bible} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

MainNavigator.propTypes = {
  navigation: PropTypes.object
};

function HeaderRight({ dropdownState, navigation }) {
  const { text } = useTheme();
  const [showDropdown, setShowDropdown] = dropdownState;
  const onShare = async () => {
    try {
      const result = await Share.share({
        url: 'https://github.com/House-of-Faith/RN-Chinese-Bible',
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
      console.log(result);

      if (result) {
        MailComposer.composeAsync({
          recipients: ['feedback@houseof.faith'],
          subject: '',
          body: '',
        });
      } else {
        alert('Error');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <HamburgerMenu
      onPress={() => {
        setShowDropdown(!showDropdown);
      }}
    >
      <Icon
        name='dots-vertical'
        size={21}
        color={text.navbar}
      />
      {showDropdown && (
        <MenuContainer>
          <MenuItem onPress={onShare}>
            <MenuText>Share</MenuText>
          </MenuItem>
          <MenuItem
            onPress={() =>
              navigation.navigate('Settings')
            }
          >
            <MenuText>Settings</MenuText>
          </MenuItem>
          <MenuItem onPress={onFeedback}>
            <MenuText>Feedback</MenuText>
          </MenuItem>
        </MenuContainer>
      )}
    </HamburgerMenu>
  );
}

HeaderRight.propTypes = {
  dropdownState: PropTypes.arrayOf(([val, func], _key, componentName, _location, propFullName) => {
    if (!(typeof val === 'boolean' && typeof func === 'function')) {
      return new Error(`Invalid prop ${propFullName} supplied to ${componentName}!`);
    }
  }).isRequired,
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired
};

const HamburgerMenu = styled.TouchableOpacity(() => ({
  paddingRight: 19,
}));

function HeaderLeft({ navigation }) {
  const { text } = useTheme();
  return (
    <DotMenu onPress={() => navigation.toggleDrawer()}>
      <Icon name='menu' size={22} color={text.navbar} />
    </DotMenu>
  );
}

HeaderLeft.propTypes = {
  navigation: PropTypes.object
};

const DotMenu = styled.TouchableOpacity(() => ({
  marginLeft: 19,
}));

const Title = styled.Text(() => ({
  fontSize: 22,
  color: '#ffffff',
}));

const MenuContainer = styled.View(({ theme }) => ({
  position: 'absolute',
  top: -7,
  right: 10,
  height: 153,
  width: 125,
  backgroundColor: theme.background.menu,
  paddingLeft: 20,
  paddingTop: 20,
}));

const MenuItem = styled.TouchableOpacity(() => ({
  width: 88,
  marginBottom: 20,
}));

const MenuText = styled.Text(({ theme }) => ({
  fontSize: 20,
  color: theme.text.menu,
}));
