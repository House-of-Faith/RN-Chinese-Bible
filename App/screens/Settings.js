import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/native';

import SettingsOption from 'components/Settings/SettingsOption';
import { selectors } from 'store';

export default function Settings() {
  const theme = useSelector(selectors.theme);
  const language = useSelector(selectors.language);
  const fontSize = useSelector(selectors.fontSize);

  const dispatch = useDispatch();

  function setLanguage(lang) {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  }

  function setFontSize(size) {
    dispatch({ type: 'SET_FONT_SIZE', payload: size });
  }

  return (
    <Container>
      <SubContainer borderBottom>
        <SubTitle>THEME</SubTitle>
        <SettingsOption
          label='Light Theme'
          selected={theme === 'light'}
          onPress={() => dispatch({ type: 'LIGHT_THEME' })}
        />
        <SettingsOption
          label='Dark Theme'
          selected={theme === 'dark'}
          onPress={() => dispatch({ type: 'DARK_THEME' })}
        />
      </SubContainer>

      <SubContainer borderBottom>
        <SubTitle>LANGUAGE</SubTitle>
        <SettingsOption
          label='English'
          selected={language === 'english'}
          onPress={() => setLanguage('english')}
        />
        <SettingsOption
          label='Traditional Chinese'
          selected={language === 'traditional'}
          onPress={() => setLanguage('traditional')}
        />
        <SettingsOption
          label='Simplified Chinese'
          selected={language === 'simplified'}
          onPress={() => setLanguage('simplified')}
        />
      </SubContainer>

      <SubContainer borderBottom>
        <SubTitle>FONT SIZE</SubTitle>
        <SettingsOption
          fontSize={fontSize}
          label='Small'
          selected={fontSize === 'small'}
          onPress={() => setFontSize('small')}
        />
        <SettingsOption
          fontSize={fontSize}
          label='Medium'
          selected={fontSize === 'medium'}
          onPress={() => setFontSize('medium')}
        />
        <SettingsOption
          fontSize={fontSize}
          label='Large'
          selected={fontSize === 'large'}
          onPress={() => setFontSize('large')}
        />
      </SubContainer>

      <SubContainer>
        <SubTitle>ADDITIONAL INFO</SubTitle>
        <SettingsOption label='About Us' selected={false} onPress={() => {}} />
      </SubContainer>
    </Container>
  );
}

const Container = styled.View(({ theme }) => ({
  backgroundColor: theme.background.menu,
  height: '100%',
  paddingVertical: 32,
  paddingHorizontal: 30,
}));

const SubContainer = styled.View(
  ({ theme, borderBottom }) => {
    if (borderBottom)
      return {
        borderBottomWidth: 1,
        borderBottomColor: theme.border.color,
      };
  },
  {
    marginBottom: 20,
  }
);

const SubTitle = styled.Text(({ theme }) => ({
  fontSize: 17,
  fontWeight: 'bold',
  marginBottom: 20,
  color: theme.text.menu,
}));
