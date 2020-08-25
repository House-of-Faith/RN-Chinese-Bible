
import React, { useState } from 'react';
import { View, Share } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import * as MailComposer from 'expo-mail-composer';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'emotion-theming'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import styled from '@emotion/native';
import Main from 'screens/Main';
import Settings from 'screens/Settings';
import Drawer from 'screens/Drawer';
import bible from 'translations/english.json';

const Stack = createStackNavigator();

const MainNavigator = ({ navigation }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const bibleJoined = [...bible.oldTestament, ...bible.newTestament];
  const book = navigation.state.params?.book || bible.oldTestament[0].book;
  const chapter = navigation.state.params?.chapter || '1';
  const bookObj = bibleJoined.filter(obj => obj.book === book);
  const chapterInt = parseInt(chapter);
  const chapterLength = bookObj[0].chapters.length;

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

  const swipeLeft = () => {
    let newChapter;
    if (chapterInt < chapterLength) {
      newChapter = chapterInt + 1;
      navigation.setParams({ chapter: newChapter.toString() });
    } else {
      if (book === 'Revelation') return;
      const index = bibleJoined.findIndex((obj) => obj.book === book);
      const newBook = bibleJoined[index + 1].book;
      navigation.setParams({ book: newBook, chapter: '1' });
    }
  };

  const swipeRight = () => {
    let newChapter;
    if (chapterInt > 1) {
      newChapter = chapterInt - 1;
      navigation.setParams({ chapter: newChapter.toString() });
    } else {
      if (book === 'Genesis') return;
      const index = bibleJoined.findIndex((obj) => obj.book === book);
      const newBook = bibleJoined[index - 1].book;
      newChapter = chapterLength.toString();
      navigation.setParams({ book: newBook, chapter: newChapter });
    }
  };

  return (
    <ThemeProvider theme={{ color: 'blue' }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#333131',
            },
            headerLeft: () => <HeaderLeft onPress={() => navigation.toggleDrawer()}>
              <Icon name="menu" size={22} color='#ffffff' /></HeaderLeft>,
            headerRight: () => (
              <View>
                <HeaderRight
                  onPress={() => {
                    setShowDropdown(!showDropdown);
                  }}
                >
                  <Icon name="dots-vertical" size={21} color='#ffffff' />
                  {showDropdown && (
                    <MenuContainer>
                      <MenuItem onPress={onShare}><MenuText>Share</MenuText></MenuItem>
                      <MenuItem onPress={() => navigation.navigate('Settings')}><MenuText>Settings</MenuText></MenuItem>
                      <MenuItem onPress={onFeedback}><MenuText>Feedback</MenuText></MenuItem>
                    </MenuContainer>
                  )}
                </HeaderRight>
              </View>),
            headerTitle: <Title>{`${book} ${chapter}`}</Title>
          }}
        >
          <Stack.Screen name="Main">
            {props => <Main {...props} book={book} chapter={chapter} swipeLeft={swipeLeft} swipeRight={swipeRight} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}

const drawerNavigator = createDrawerNavigator(
  {
    Main: MainNavigator
  },
  {
    initialRouteName: 'Main',
    drawerWidth: '86%',
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

const HeaderLeft = styled.TouchableOpacity(({ theme }) => ({
  marginLeft: 19
}));

const HeaderRight = styled.TouchableOpacity(({ theme }) => ({
  paddingRight: 19
}));

const Title = styled.Text(({ theme }) => ({
  fontSize: 22,
  color: '#ffffff'
}));

const MenuContainer = styled.View(({ theme }) => ({
  position: 'absolute',
  top: -7,
  right: 10,
  height: 153,
  width: 125,
  backgroundColor: '#f1f1f1',
  paddingLeft: 20,
  paddingTop: 20
}));

const MenuItem = styled.TouchableOpacity(({ theme }) => ({
  width: 88,
  marginBottom: 20,
}));

const MenuText = styled.Text(({ theme }) => ({
  fontSize: 20,
}))