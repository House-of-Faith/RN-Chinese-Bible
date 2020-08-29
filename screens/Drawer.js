import React from "react";
import { useDispatch } from 'react-redux';
import {
    ScrollView,
    SafeAreaView,
} from "react-native";
import { useTheme } from "emotion-theming";
import styled from "@emotion/native";
import { AntDesign as Icon } from "@expo/vector-icons";

import { useBible } from 'lib/hooks';

const Drawer = ({ navigation }) => {
    const dispatch = useDispatch()
    const { background, text } = useTheme();
    const {
      testament, // old/new
      setTestament,
      book, // index
      books, // array of book names
      setBook,
      chapters, // integer
    } = useBible({ book: null, chapter: null });

    return (
        <SafeAreaView
            style={{ height: "100%", backgroundColor: background.menu }}
        >
            <ScrollView
                style={{
                    marginTop: 7,
                    marginHorizontal: 20,
                }}
            >
                <Header>
                    <TitleContainer
                        selected={testament === "old"}
                        onPress={() => {
                            setBook(null);
                            setTestament("old");
                        }}
                    >
                        <Title selected={testament === "old"}>
                            Old T.
                        </Title>
                    </TitleContainer>
                    <TitleContainer
                        selected={testament === "new"}
                        onPress={() => {
                            setBook(null);
                            setTestament("new");
                        }}
                    >
                        <Title selected={testament === "new"}>
                            New T.
                        </Title>
                    </TitleContainer>
                </Header>
                {book !== null ? (
                    <BookSelected>
                        <BookTitleContainer
                            onPress={() => setBook(null)}
                        >
                            <BookTitle>{books[book]}</BookTitle>
                            <Icon
                                name="up"
                                size={13}
                                style={{ marginTop: 5 }}
                                color={text.reading}
                            />
                        </BookTitleContainer>
                        {[...Array(chapters)]?.map((x, i) => {
                            return (
                                <ChapterBox
                                    key={i}
                                    onPress={() => {
                                        dispatch({
                                          type: "SET_CURRENT_SCRIPTURE",
                                          payload: { testament, book, chapter: i },
                                        })
                                        navigation.closeDrawer();
                                        // setBook(null);
                                    }}
                                >
                                    <ChapterText>{i + 1}</ChapterText>
                                </ChapterBox>
                            );
                        })}
                        <ReturnContainer
                            onPress={() => {
                                navigation.closeDrawer();
                                setBook(null);
                            }}
                        >
                            <Icon
                                name="left"
                                size={14}
                                color={text.secondary}
                            />
                            <ReturnText>Return</ReturnText>
                        </ReturnContainer>
                    </BookSelected>
                ) : (
                    books?.map((book, i) => (
                        <BookTitleContainer
                            key={book}
                            onPress={() => setBook(i)}
                        >
                            <BookTitle>{book}</BookTitle>
                            <Icon
                                name="down"
                                size={13}
                                style={{ marginTop: 5 }}
                                color={text.reading}
                            />
                        </BookTitleContainer>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Drawer;

const BookSelected = styled.View(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
}));

const Header = styled.View(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: theme.border.color,
    paddingBottom: 10,
}));

const TitleContainer = styled.TouchableOpacity(
    ({ theme, selected }) => {
        if (!selected)
            return {
                borderBottomWidth: 1,
                borderBottomColor: theme.border.color,
            };
    },
    {
        marginHorizontal: 7,
    }
);

const Title = styled.Text(({ theme, selected }) => ({
    color: selected ? theme.text.card : theme.text.secondary,
    fontSize: 22,
}));

const BookTitleContainer = styled.TouchableOpacity(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 7,
    marginVertical: 5,
    width: "93%",
}));

const BookTitle = styled.Text(({ theme }) => ({
    fontSize: 21,
    color: theme.text.card,
}));

const ChapterBox = styled.TouchableOpacity(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 5,
    width: 52,
    height: 52,
    backgroundColor: theme.background.card,
}));

const ChapterText = styled.Text(({ theme }) => ({
    fontSize: 16,
    color: theme.text.card,
}));

const ReturnContainer = styled.TouchableOpacity(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 13,
    width: "92%",
}));

const ReturnText = styled.Text(({ theme }) => ({
    fontSize: 17,
    color: theme.text.secondary,
    marginLeft: 5,
}));
