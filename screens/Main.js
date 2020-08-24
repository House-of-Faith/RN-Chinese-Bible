
import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from '@emotion/native';
import Constants from 'expo-constants';
import bible from '../bible.json';

const Main = ({ book, chapter }) => {
    const bibleJoined = [...bible.oldTestament, ...bible.newTestament];
    const bookObj = bibleJoined.filter(obj => obj.book === book);
    const verses = bookObj[0].chapters.filter(obj => obj.chapter === chapter)[0].verses;

    return (
        <SafeArea>
            <Container>
                <Spacer />
                {verses.map(obj => {
                    return (
                        <Verse key={obj.verse}>{obj.verse} {obj.text}</Verse>
                    )
                })}
            </Container>
        </SafeArea>
    )
};

export default Main;

const SafeArea = styled.SafeAreaView(({ theme }) => ({
    backgroundColor: '#ffffff'
}));

const Container = styled.ScrollView(({ theme }) => ({
    marginHorizontal: 32,
}));

const Verse = styled.Text(({ theme }) => ({
    fontSize: 19,
    lineHeight: 27,
    marginBottom: 13
}));

const Spacer = styled.View({ height: 30 });