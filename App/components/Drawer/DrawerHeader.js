import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/native';

import TranslatedText from 'components/common/TranslatedText';

export default function DrawerHeader({ testament, onPress }) {
  return (
    <Header>
      <TitleContainer
        selected
        onPress={() => {}}
      >
        <Title selected>
          {testament === 'old' ? 'Old T.' : 'New T.'}
        </Title>
      </TitleContainer>
      <TitleContainer
        onPress={() => onPress(testament === 'old' ? 'new' : 'old')}
      >
        <Title>
          {testament === 'old' ? 'New T.' : 'Old T.'}
        </Title>
      </TitleContainer>
    </Header>
  );
}

DrawerHeader.propTypes = {
  testament: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const Header = styled.View(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 3,
  borderBottomWidth: 1,
  borderBottomColor: theme.border.color,
  paddingBottom: 10,
}));

const TitleContainer = styled.TouchableOpacity(
  ({ theme, selected = false }) => {
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

const Title = styled(TranslatedText)(({ theme, selected = false }) => ({
  color: selected ? theme.text.card : theme.text.secondary,
  fontSize: 22,
}));
