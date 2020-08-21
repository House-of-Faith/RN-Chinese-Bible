
import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Button } from 'react-native';
import Constants from 'expo-constants';
import bible from '../bible.json';

const Main = ({ book, chapter }) => {
    const bibleJoined = [...bible.oldTestament, ...bible.newTestament];
    const bookObj = bibleJoined.filter(obj => obj.book === book);
    const verses = bookObj[0].chapters.filter(obj => obj.chapter === chapter)[0].verses;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {verses.map(obj => {
                    return (
                        <Text key={obj.verse} style={styles.text}>{obj.verse}: {obj.text}</Text>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    text: {
        marginVertical: 5
    },
});

export default Main;