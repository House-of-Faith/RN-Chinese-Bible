import React from 'react';
import PropTypes from 'prop-types';

import BookTitle from 'components/Drawer/BookTitle';

export default function BookList({ books, onSelectBook }) {
  return books?.map((book, i) => (
    <BookTitle
      key={book}
      book={book}
      onPress={() => onSelectBook(i)}
    />
  ));
}

BookList.propTypes = {
  books: PropTypes.array,
  onSelectBook: PropTypes.func
};
