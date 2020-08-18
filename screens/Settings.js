import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const Settings = ({ navigation }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerLeft: () => <Button
                        title="<"
                        onPress={() => {
                            navigation.navigate('Main');
                        }}
                    />,
                }}
            >
                <Stack.Screen name='Settings'>
                    {() => <View style={styles.container}>
                        <Text>Settings</Text>
                    </View>}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
};

Settings.navigationOptions = ({
    navigation,
}) => {
    return {
        headerLeft: () =>
            <TouchableOpacity onPress={() => navigation.pop()}><Text>back</Text></TouchableOpacity>,
        headerTitle: () =>
            <View><Text>Settings</Text></View>,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
    },
    text: {
        fontSize: 42,
    },
});

export default Settings;