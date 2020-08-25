
import React, { useState, useEffect, useRef } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import styled from '@emotion/native';
import GestureRecognizer from 'react-native-swipe-gestures';
import bible from '../bible.json';

const Main = ({ book, chapter, swipeLeft, swipeRight }) => {
    const ref = useRef(null);
    const bibleJoined = [...bible.oldTestament, ...bible.newTestament];
    const bookObj = bibleJoined.filter(obj => obj.book === book);
    const verses = bookObj[0].chapters.filter(obj => obj.chapter === chapter)[0].verses;

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 100
    };

    useEffect(() => {
        if (ref && ref.current) ref.current.scrollTo({ y: 0 })
    }, [book, chapter])

    return (
        <SafeArea>
            <Container
                ref={ref}
            >
                <GestureRecognizer
                    onSwipeLeft={swipeLeft}
                    onSwipeRight={swipeRight}
                    config={config}
                >
                    <Spacer />
                    {verses.map(obj => {
                        return (
                            <Verse key={obj.verse}>{obj.verse} {obj.text}</Verse>
                        )
                    })}
                </GestureRecognizer>
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

const Title = styled.Text(({ theme }) => ({
    fontSize: 22,
    color: '#ffffff'
}));