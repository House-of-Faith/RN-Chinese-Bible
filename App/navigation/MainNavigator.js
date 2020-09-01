import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Share } from "react-native";
import * as MailComposer from "expo-mail-composer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "emotion-theming";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import styled from "@emotion/native";

import Bible from "screens/Bible";
import { useBible } from "lib/hooks";
import { selectors } from "store";

const Stack = createStackNavigator();

export default function MainNavigator({ navigation }) {
    const { background } = useTheme();
    const [showDropdown, setShowDropdown] = useState(false);
    const { books, setTestament } = useBible();
    const { testament, book, chapter } = useSelector(
        selectors.currentScripture
    );

    useEffect(() => {
        setTestament(testament);
    }, [testament]);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: background.navbar,
                        shadowColor: "transparent",
                    },
                    headerLeft: () => (
                        <HeaderLeft
                            navigation={navigation}
                            showDropdown={showDropdown}
                        />
                    ),
                    headerRight: () => (
                        <HeaderRight
                            navigation={navigation}
                            dropdownState={[showDropdown, setShowDropdown]}
                        />
                    ),
                    headerTitle: (
                        <Title>{`${books[book]} ${chapter + 1}`}</Title>
                    ),
                }}
            >
                <Stack.Screen name="Bible" component={Bible} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function HeaderRight({ dropdownState, navigation }) {
    const { text } = useTheme();
    const [showDropdown, setShowDropdown] = dropdownState;
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
        <HamburgerMenu
            onPress={() => {
                setShowDropdown(!showDropdown);
            }}
        >
            <Icon
                name={showDropdown ? "close-circle-outline" : "dots-vertical"}
                size={showDropdown ? 25 : 21}
                color={showDropdown ? text.reading : text.navbar}
                style={{ zIndex: 1 }}
            />
            {showDropdown && (
                <MenuContainer>
                    <MenuItem onPress={onShare}>
                        <MenuText>Share</MenuText>
                    </MenuItem>
                    <MenuItem onPress={() => navigation.navigate("Settings")}>
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

const HamburgerMenu = styled.TouchableOpacity(({ theme }) => ({
    paddingRight: 19,
}));

function HeaderLeft({ navigation }) {
    const { text } = useTheme();
    return (
        <DotMenu onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" size={22} color={text.navbar} />
        </DotMenu>
    );
}

const DotMenu = styled.TouchableOpacity(({ theme }) => ({
    marginLeft: 19,
}));

const Title = styled.Text(({ theme }) => ({
    fontSize: 22,
    color: "#ffffff",
}));

const MenuContainer = styled.View(({ theme }) => ({
    position: "absolute",
    top: -7,
    right: 12,
    height: 170,
    width: 125,
    backgroundColor: theme.background.card,
    paddingLeft: 20,
    paddingTop: 35,
}));

const MenuItem = styled.TouchableOpacity(({ theme }) => ({
    width: 88,
    marginBottom: 20,
}));

const MenuText = styled.Text(({ theme }) => ({
    fontSize: 20,
    color: theme.text.menu,
}));
