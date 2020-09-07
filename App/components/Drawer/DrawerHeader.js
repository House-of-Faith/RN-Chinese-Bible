import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/native';
import { useI18n } from 'lib/hooks';

export default function DrawerHeader({ testament, onPress }) {
  const { i18n } = useI18n();
  const isOld = 'old' === testament;

  return (
    <Header>
      <TitleContainer selected>
        <Title selected>
          {i18n(isOld ? 'old_t' : 'new_t')}
        </Title>
      </TitleContainer>
      <TitleContainer
        onPress={() => onPress(isOld ? 'new' :  'old')}
      >
        <Title>
          {i18n(isOld ? 'new_t' : 'old_t')}
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

const Title = styled.Text(({ theme, selected = false }) => ({
  color: selected ? theme.text.card : theme.text.secondary,
  fontSize: 22,
}));
