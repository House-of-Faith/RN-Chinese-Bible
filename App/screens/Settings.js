import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/native';

import SettingsOption from 'components/Settings/SettingsOption';
import { selectors } from 'store';
import { useI18n } from 'lib/hooks';

export default function Settings() {
  const { i18n } = useI18n();
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
        <SubTitle>{i18n('theme').toUpperCase()}</SubTitle>
        <SettingsOption
          label={i18n('light')}
          selected={theme === 'light'}
          onPress={() => dispatch({ type: 'LIGHT_THEME' })}
        />
        <SettingsOption
          label={i18n('dark')}
          selected={theme === 'dark'}
          onPress={() => dispatch({ type: 'DARK_THEME' })}
        />
      </SubContainer>

      <SubContainer borderBottom>
        <SubTitle>{i18n('language').toUpperCase()}</SubTitle>
        <SettingsOption
          label={i18n('traditional_chinese')}
          selected={language === 'traditional'}
          onPress={() => setLanguage('traditional')}
        />
        <SettingsOption
          label={i18n('simplified_chinese')}
          selected={language === 'simplified'}
          onPress={() => setLanguage('simplified')}
        />
        <SettingsOption
          label={i18n('english')}
          selected={language === 'english'}
          onPress={() => setLanguage('english')}
        />
      </SubContainer>

      <SubContainer borderBottom>
        <SubTitle>{i18n('font_size').toUpperCase()}</SubTitle>
        <SettingsOption
          fontSize={fontSize}
          label={i18n('small')}
          selected={fontSize === 'small'}
          onPress={() => setFontSize('small')}
        />
        <SettingsOption
          fontSize={fontSize}
          label={i18n('medium')}
          selected={fontSize === 'medium'}
          onPress={() => setFontSize('medium')}
        />
        <SettingsOption
          fontSize={fontSize}
          label={i18n('large')}
          selected={fontSize === 'large'}
          onPress={() => setFontSize('large')}
        />
      </SubContainer>

      <SubContainer>
        <SubTitle>{i18n('additional_info')}</SubTitle>
        <SettingsOption label={i18n('about_us')} selected={false} onPress={() => {}} />
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
