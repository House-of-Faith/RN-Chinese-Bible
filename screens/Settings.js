import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons as Icon, Ionicons as Icon2 } from '@expo/vector-icons';
import styled from '@emotion/native';

const Stack = createStackNavigator();

const Settings = ({ navigation }) => {
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('eng');

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerLeft: () => <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Main');
                        }}
                        style={{ marginLeft: 19 }}
                    ><Icon name="arrow-left" size={24} color="#ffffff" /></TouchableOpacity>,
                    headerStyle: {
                        backgroundColor: '#333131',
                    },
                    headerTitle: <Title>Settings</Title>
                }}
            >
                <Stack.Screen name='Settings'>
                    {() => (
                        <Container>
                            <SubContainer borderBottom>
                                <SubTitle>THEME</SubTitle>
                                <ButtonContainer><Button onPress={() => setTheme('light')}><Option>Light Theme</Option></Button>{theme === 'light' && <Icon2 name="md-checkmark-circle" size={20} color="black" />}</ButtonContainer>
                                <ButtonContainer><Button><Option>Dark Theme</Option></Button>{theme === 'dark' && <Icon2 name="md-checkmark-circle" size={20} color="black" />}</ButtonContainer>
                            </SubContainer>
                            <SubContainer borderBottom>
                                <SubTitle>LANGUAGE</SubTitle>
                                <ButtonContainer><Button onPress={() => setLanguage('eng')}><Option>English</Option></Button>{language === 'eng' && <Icon2 name="md-checkmark-circle" size={20} color="black" />}</ButtonContainer>
                                <ButtonContainer><Button><Option>Traditional Chinese</Option></Button>{language === 'trad' && <Icon2 name="md-checkmark-circle" size={20} color="black" />}</ButtonContainer>
                                <ButtonContainer><Button><Option>Simplified Chinese</Option></Button>{language === 'simp' && <Icon2 name="md-checkmark-circle" size={20} color="black" />}</ButtonContainer>
                            </SubContainer>
                            <SubContainer>
                                <SubTitle>ADDITIONAL INFO</SubTitle>
                                <Button><Option>About Us</Option></Button>
                            </SubContainer>
                        </Container>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Settings;

const Container = styled.View(({ theme }) => ({
    backgroundColor: '#ffffff',
    height: '100%',
    paddingVertical: 32,
    paddingHorizontal: 30
}));

const SubContainer = styled.View(({ theme, borderBottom }) => {
    if (borderBottom) return {
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    }
}, ({
    marginBottom: 20
}));

const SubTitle = styled.Text(({ theme }) => ({
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20
}));

const ButtonContainer = styled.View(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
}));

const Button = styled.TouchableOpacity(({ theme }) => ({
    marginRight: 20
}));

const Option = styled.Text(({ theme }) => ({
    fontSize: 19,
    marginLeft: 20,
    marginBottom: 20
}));

const Title = styled.Text(({ theme }) => ({
    fontSize: 22,
    color: '#ffffff'
}));