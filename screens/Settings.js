import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { connect, useDispatch } from "react-redux";
import { useTheme } from "emotion-theming";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
    MaterialCommunityIcons as Icon,
    Ionicons as Icon2,
} from "@expo/vector-icons";
import styled from "@emotion/native";

const Stack = createStackNavigator();

const Settings = ({ navigation, theme }) => {
    console.log({ theme });
    const dispatch = useDispatch();
    const { background, text } = useTheme();
    const [language, setLanguage] = useState("eng");

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Main");
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
                    },
                    headerTitle: <Title>Settings</Title>,
                }}
            >
                <Stack.Screen name="Settings">
                    {() => {
                        return (
                            <Container>
                                <SubContainer borderBottom>
                                    <SubTitle>THEME</SubTitle>
                                    <ButtonContainer>
                                        <Button
                                            onPress={() =>
                                                dispatch({
                                                    type: "LIGHT_THEME",
                                                })
                                            }
                                        >
                                            <Option>Light Theme</Option>
                                        </Button>
                                        {theme !== "dark" && (
                                            <Icon2
                                                name="md-checkmark-circle"
                                                size={20}
                                                color={text.reading}
                                            />
                                        )}
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <Button
                                            onPress={() =>
                                                dispatch({ type: "DARK_THEME" })
                                            }
                                        >
                                            <Option>Dark Theme</Option>
                                        </Button>
                                        {theme === "dark" && (
                                            <Icon2
                                                name="md-checkmark-circle"
                                                size={20}
                                                color={text.reading}
                                            />
                                        )}
                                    </ButtonContainer>
                                </SubContainer>
                                <SubContainer borderBottom>
                                    <SubTitle>LANGUAGE</SubTitle>
                                    <ButtonContainer>
                                        <Button
                                            onPress={() => setLanguage("eng")}
                                        >
                                            <Option>English</Option>
                                        </Button>
                                        {language === "eng" && (
                                            <Icon2
                                                name="md-checkmark-circle"
                                                size={20}
                                                color={text.reading}
                                            />
                                        )}
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <Button>
                                            <Option>Traditional Chinese</Option>
                                        </Button>
                                        {language === "trad" && (
                                            <Icon2
                                                name="md-checkmark-circle"
                                                size={20}
                                                color={text.reading}
                                            />
                                        )}
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <Button>
                                            <Option>Simplified Chinese</Option>
                                        </Button>
                                        {language === "simp" && (
                                            <Icon2
                                                name="md-checkmark-circle"
                                                size={20}
                                                color={text.reading}
                                            />
                                        )}
                                    </ButtonContainer>
                                </SubContainer>
                                <SubContainer>
                                    <SubTitle>ADDITIONAL INFO</SubTitle>
                                    <Button>
                                        <Option>About Us</Option>
                                    </Button>
                                </SubContainer>
                            </Container>
                        );
                    }}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const mapStateToProps = ({ theme }) => ({
    theme,
});

export default connect(mapStateToProps, {})(Settings);

const Container = styled.View(({ theme }) => ({
    backgroundColor: theme.background.menu,
    height: "100%",
    paddingVertical: 32,
    paddingHorizontal: 30,
}));

const SubContainer = styled.View(
    ({ theme, borderBottom }) => {
        if (borderBottom)
            return {
                borderBottomWidth: 1,
                borderBottomColor: theme.border.color,
            };
    },
    {
        marginBottom: 20,
    }
);

const SubTitle = styled.Text(({ theme }) => ({
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 20,
    color: theme.text.menu,
}));

const ButtonContainer = styled.View(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
}));

const Button = styled.TouchableOpacity(({ theme }) => ({
    marginRight: 20,
}));

const Option = styled.Text(({ theme }) => ({
    fontSize: 19,
    marginLeft: 20,
    marginBottom: 20,
    color: theme.text.menu,
}));

const Title = styled.Text(({ theme }) => ({
    fontSize: 22,
    color: theme.text.navbar,
}));
