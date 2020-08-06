
import * as React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Button } from 'react-native';
import Constants from 'expo-constants';
import bible from '../bible.json';

const Main = ({ route }) => {
    // TODO: get params here
    const book = route.params && route.params.book || bible[0].book;
    const chapter = route.params && router.params.chapter || '1';
    const bookObj = bible.filter(obj => obj.book === book);
    const verses = bookObj[0].chapters.filter(obj => obj.chapter === chapter)[0].verses;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {verses.map(obj => {
                    return (
                        <Text>{obj.verse}: {obj.text}</Text>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
});

export default Main;