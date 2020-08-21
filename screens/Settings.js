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
                        <View style={styles.subContainer}>
                            <Text style={styles.title}>THEME</Text>
                            <TouchableOpacity><Text style={styles.option}>Light Theme</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={styles.option}>Dark Theme</Text></TouchableOpacity>
                        </View>
                        <View style={styles.subContainer}>
                            <Text style={styles.title}>LANGUAGE</Text>
                            <TouchableOpacity><Text style={styles.option}>Traditional Chinese</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={styles.option}>Simplified Chinese</Text></TouchableOpacity>
                        </View>
                        <View style={styles.subContainer}>
                            <Text style={styles.title}>ADDITIONAL INFO</Text>
                            <TouchableOpacity><Text style={styles.option}>About Us</Text></TouchableOpacity>
                        </View>
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
        marginLeft: 20
    },
    subContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    option: {
        marginLeft: 20
    }
});

export default Settings;