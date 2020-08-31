import React from "react";
import { useDispatch } from "react-redux";
import {
    ScrollView,
    SafeAreaView,
} from "react-native";
import { useTheme } from "emotion-theming";
import styled from "@emotion/native";
import { AntDesign as Icon } from "@expo/vector-icons";

import DrawerHeader from "components/Drawer/DrawerHeader";
import BookList from "components/Drawer/BookList";
import BookTitle from "components/Drawer/BookTitle";
import ChapterList from "components/Drawer/ChapterList";
import { useBible } from "lib/hooks";

export default function Drawer({ navigation }) {
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
								<DrawerHeader
								    testament={testament}
										onPress={(newTest) => {
											setBook(null);
											setTestament(newTest);
									}}
								/>
                {book !== null ? (
                    <BookSelected>
											  <BookTitle
														onPress={() => setBook(null)}
														book={books[book]}
														isSelected
												/>
												<ChapterList
														chapters={chapters}
														onSelectChapter={(selected) => {
															dispatch({
																type: "SET_CURRENT_SCRIPTURE",
																payload: { testament, book, chapter: selected },
															})
															navigation.closeDrawer();
															// setBook(null);
														}}
												/>
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
										<BookList
												books={books}
												onSelectBook={(selected) => setBook(selected)}
										/>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const BookSelected = styled.View(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
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
