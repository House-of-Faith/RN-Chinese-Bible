
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
        <View style={{ marginTop: 100, marginHorizontal: 15 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => { setBookSelected(null); setSectionSelected('oldTestament') }}><Text>Old Testament</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setBookSelected(null); setSectionSelected('newTestament') }}><Text>New Testament</Text></TouchableOpacity>
            </View>
            {bookSelected ? (
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <TouchableOpacity
                        onPress={() => setBookSelected(null)}
                    >
                        <Text>{bookSelected}</Text>
                    </TouchableOpacity>
                    {chapters && chapters.map(chapter => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.setParams({ bookSelected, chapter });
                                    navigation.closeDrawer();
                                    setBookSelected(null);
                                }}
                                style={{ marginHorizontal: 10, marginVertical: 10, width: 30, height: 30, borderWidth: 1, borderColor: 'grey' }}
                            >
                                <Text>{chapter}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    <TouchableOpacity onPress={() => {
                        navigation.closeDrawer();
                        setBookSelected(null);
                    }}><Text>Return</Text></TouchableOpacity>
                </View>) : (
                    books && books.map(book => (
                        <TouchableOpacity
                            onPress={() => setBookSelected(book)}
                            style={{ marginBottom: 10, width: '100%', borderColor: 'blue', borderWidth: 1 }}
                        >
                            <Text>{book}</Text>
                        </TouchableOpacity>
                    ))
                )}
        </View>
    )
};

export default Drawer;