import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { View, Share } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import * as MailComposer from "expo-mail-composer";
import { createDrawerNavigator } from "react-navigation-drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "emotion-theming";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import styled from "@emotion/native";

import Main from "screens/Main";
import Settings from "screens/Settings";
import Drawer from "screens/Drawer";
import { useBible, useIsMounted } from 'lib/hooks';
import selectors from "store/selectors";

const Stack = createStackNavigator();

const MainNavigator = ({ navigation }) => {
    const isMounted = useIsMounted();
    const dispatch = useDispatch()
    const { background, text } = useTheme();
    const [showDropdown, setShowDropdown] = useState(false);
    const {
      testament: testGlobal,
      book: bookGlobal,
      chapter: chapterGlobal,
    } = useSelector(selectors.currentScripture);

    const {
      testament, // old/new
      setTestament,
      book, // index
      books, // array of book names
      setBook,
      chapter, // index
      setChapter,
      verses, // array of verses
      nextChapter,
      prevChapter,
    } = useBible({ testament: 'old', book: bookGlobal, chapter: chapterGlobal });

    console.log('book: ', book, bookGlobal)
    console.log('chapter: ', chapter, chapterGlobal)
    console.log(`${books[book]} ${chapter + 1} ${verses?.[0]}`)

    useEffect(() => {
      if (testament === testGlobal) return;
      setTestament(testGlobal)
    }, [testGlobal])
    
    useEffect(() => {
      if (book === bookGlobal) return;
      setBook(bookGlobal)
    }, [bookGlobal])

    useEffect(() => {
      if (chapter === chapterGlobal) return;
      setChapter(chapterGlobal)
    }, [chapterGlobal])

    useEffect(() => {
      if (!isMounted) return
      setCurrentScripture({ testament, book, chapter })
    }, [testament, book, chapter])

    function setCurrentScripture({ testament = testament, book = book, chapter = chapter}) {
      dispatch({ type: "SET_CURRENT_SCRIPTURE", payload: { testament, book, chapter }})
    }

    // console.log({ testament, book, chapter })

    const onShare = async () => {
        try {
            const result = await Share.share({
                url: "https://github.com/House-of-Faith/RN-Chinese-Bible",
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
                    recipients: ["feedback@houseof.faith"],
                    subject: "",
                    body: "",
                });
            } else {
                alert("Error");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: background.navbar,
                    },
                    headerLeft: () => (
                        <HeaderLeft onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" size={22} color={text.navbar} />
                        </HeaderLeft>
                    ),
                    headerRight: () => (
                        <View>
                            <HeaderRight
                                onPress={() => {
                                    setShowDropdown(!showDropdown);
                                }}
                            >
                                <Icon
                                    name="dots-vertical"
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
                                                navigation.navigate("Settings")
                                            }
                                        >
                                            <MenuText>Settings</MenuText>
                                        </MenuItem>
                                        <MenuItem onPress={onFeedback}>
                                            <MenuText>Feedback</MenuText>
                                        </MenuItem>
                                    </MenuContainer>
                                )}
                            </HeaderRight>
                        </View>
                    ),
                    headerTitle: <Title>{`${books[book]} ${chapter + 1}`}</Title>,
                }}
            >
                <Stack.Screen name="Main">
                    {(props) => (
                        <Main
                            {...props}
                            verses={verses}
                            swipeLeft={nextChapter}
                            swipeRight={prevChapter}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const drawerNavigator = createDrawerNavigator(
    {
        Main: MainNavigator,
    },
    {
        initialRouteName: "Main",
        drawerWidth: "86%",
        contentComponent: Drawer,
    }
);

const App = createAppContainer(
    createSwitchNavigator({
        Main: drawerNavigator,
        Settings: Settings,
    })
);

const AppNavigation = createAppContainer(App);

export default AppNavigation;

const HeaderLeft = styled.TouchableOpacity(({ theme }) => ({
    marginLeft: 19,
}));

const HeaderRight = styled.TouchableOpacity(({ theme }) => ({
    paddingRight: 19,
}));

const Title = styled.Text(({ theme }) => ({
    fontSize: 22,
    color: "#ffffff",
}));

const MenuContainer = styled.View(({ theme }) => ({
    position: "absolute",
    top: -7,
    right: 10,
    height: 153,
    width: 125,
    backgroundColor: theme.background.menu,
    paddingLeft: 20,
    paddingTop: 20,
}));

const MenuItem = styled.TouchableOpacity(({ theme }) => ({
    width: 88,
    marginBottom: 20,
}));

const MenuText = styled.Text(({ theme }) => ({
    fontSize: 20,
    color: theme.text.menu,
}));
