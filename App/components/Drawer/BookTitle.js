import React from 'react';
import { useTheme } from 'emotion-theming';
import styled from '@emotion/native';
import { AntDesign as Icon } from '@expo/vector-icons';

export default function BookList({ book, onPress, isSelected = false }) {
  const { text } = useTheme();
	
  return (
    <BookTitleContainer onPress={onPress}>
      <BookTitle>{book}</BookTitle>
      <Icon
        name={isSelected ? 'up' : 'down'}
        size={13}
        style={{ marginTop: 5 }}
        color={text.reading}
      />
    </BookTitleContainer>
  );
}

const BookTitleContainer = styled.TouchableOpacity(({ theme }) => ({
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