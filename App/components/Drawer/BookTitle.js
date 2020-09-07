import React from 'react';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import styled from '@emotion/native';
import { AntDesign as Icon } from '@expo/vector-icons';

import { useI18n } from 'lib/hooks';

export default function BookList({ book, onPress, isSelected = false }) {
  const { i18n } = useI18n();
  const { text } = useTheme();

  return (
    <BookTitleContainer onPress={onPress}>
      <BookTitle>{i18n(book)}</BookTitle>
      <Icon
        name={isSelected ? 'up' : 'down'}
        size={13}
        style={{ marginTop: 5 }}
        color={text.reading}
      />
    </BookTitleContainer>
  );
}

BookList.propTypes = {
  book: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isSelected: PropTypes.bool
};

const BookTitleContainer = styled.TouchableOpacity(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 7,
  marginVertical: 5,
  width: '93%',
}));

const BookTitle = styled.Text(({ theme }) => ({
  fontSize: 21,
  color: theme.text.card,
}));
