
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import bible from '../bible.json';

const Drawer = ({ navigation }) => {
    const books = bible.map(obj => obj.book);

    return (
        <View style={{ marginTop: 100 }}>
            {books && books.map((book, index) => {
                return (
                    <TouchableOpacity onPress={() => {
                        // add chapters to pick from
                        navigation.setParams({ book, chapter: '2' })
                        navigation.closeDrawer();
                    }}><Text key={index}>{book}</Text></TouchableOpacity>
                )
            })}
        </View>
    )
};

export default Drawer;