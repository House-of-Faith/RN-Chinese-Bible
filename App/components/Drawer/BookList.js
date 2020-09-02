import React from 'react';
import PropTypes from 'prop-types';

import BookTitle from 'components/Drawer/BookTitle';

export default function BookList({ books, onSelectBook }) {
  return books?.map((book, i) => (
    <BookTitle
      key={`${book}-${i}`}
      book={book}
      onPress={() => onSelectBook(i)}
    />
  ));
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectBook: PropTypes.func.isRequired
};
