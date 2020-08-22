
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'emotion-theming'
import styled from '@emotion/native';
import { AntDesign as Icon } from '@expo/vector-icons';
import bible from '../bible.json';

const Drawer = ({ navigation }) => {
    const [sectionSelected, setSectionSelected] = useState('oldTestament');
    const [bookSelected, setBookSelected] = useState(null);
    const [chapters, setChapters] = useState(null);
    const books = bible[sectionSelected].map(obj => obj.book);

    useEffect(() => {
        if (bookSelected) {
            const bookObj = bible[sectionSelected].filter(obj => obj.book === bookSelected);
            if (bookObj.length < 1) setChapters(null);
            else {
                const chapters = bookObj[0].chapters.map(obj => obj.chapter);
                setChapters(chapters);
            }
        }
    }, [bookSelected, sectionSelected]);

    return (
        <ThemeProvider theme={{ color: 'blue' }}>
            <View style={{ marginTop: 50, marginHorizontal: 20 }}>
                <Header>
                    <TitleContainer selected={sectionSelected === 'oldTestament'} onPress={() => { setBookSelected(null); setSectionSelected('oldTestament') }}><Title selected={sectionSelected === 'oldTestament'}>Old T.</Title></TitleContainer>
                    <TitleContainer selected={sectionSelected === 'newTestament'} onPress={() => { setBookSelected(null); setSectionSelected('newTestament') }}><Title selected={sectionSelected === 'newTestament'}>New T.</Title></TitleContainer>
                </Header>
                {bookSelected ? (
                    <BookSelected>
                        <BookTitleContainer
                            onPress={() => setBookSelected(null)}
                        >
                            <BookTitle>{bookSelected}</BookTitle>
                            <Icon name="up" size={13} style={{ marginTop: 5 }} />
                        </BookTitleContainer>
                        {chapters && chapters.map(chapter => {
                            return (
                                <ChapterBox
                                    onPress={() => {
                                        navigation.setParams({ book: bookSelected, chapter });
                                        navigation.closeDrawer();
                                        setBookSelected(null);
                                    }}
                                >
                                    <ChapterText>{chapter}</ChapterText>
                                </ChapterBox>
                            )
                        })}
                        <ReturnContainer onPress={() => {
                            navigation.closeDrawer();
                            setBookSelected(null);
                        }}>
                            <Icon name="left" size={14} color="grey" />
                            <ReturnText>Return</ReturnText>
                        </ReturnContainer>
                    </BookSelected>) : (
                        books && books.map(book => (
                            <BookTitleContainer
                                onPress={() => setBookSelected(book)}
                            >
                                <BookTitle>{book}</BookTitle>
                                <Icon name="down" size={13} style={{ marginTop: 5 }} />
                            </BookTitleContainer>
                        ))
                    )}
            </View>
        </ThemeProvider>
    )
};

export default Drawer;

const BookSelected = styled.View(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
}));

const Header = styled.View(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 10
}));

const TitleContainer = styled.TouchableOpacity(({ theme, selected }) => {
    if (!selected) return {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    }
}, ({
    marginHorizontal: 7
}));

const Title = styled.Text(({ theme, selected }) => ({
    color: selected ? 'black' : 'grey',
    fontSize: 22,
}));

const BookTitleContainer = styled.TouchableOpacity(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 7,
    marginVertical: 5,
    width: '93%',
}));

const BookTitle = styled.Text(({ theme }) => ({
    fontSize: 21
}));

const ChapterBox = styled.TouchableOpacity(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    width: 52,
    height: 52,
    backgroundColor: '#f1f1f1'
}));

const ChapterText = styled.Text(({ theme }) => ({
    fontSize: 16
}));

const ReturnContainer = styled.TouchableOpacity(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 13,
    width: '92%',
}));

const ReturnText = styled.Text(({ theme }) => ({
    fontSize: 17,
    color: 'grey',
    marginLeft: 5
}));