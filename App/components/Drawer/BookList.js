import React from "react";

import BookTitle from "components/Drawer/BookTitle";

export default function BookList({ books, onSelectBook }) {
	
	return books?.map((book, i) => (
		<BookTitle
			key={book}
			book={book}
			onPress={() => onSelectBook(i)}
		/>
	));
}