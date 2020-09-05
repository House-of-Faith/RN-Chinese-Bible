import React  from 'react';
import PropTypes from 'prop-types';
import { Text as RNText } from 'react-native';
import { useSelector } from 'react-redux';

import { selectors } from 'store';
import simplified from 'translations/simplified.json';
import traditional from 'translations/traditional.json';

const TEXT = { traditional, simplified };

function TranslatedText({ translate, children, style, ...restOfProps }) {
  const language = useSelector(selectors.language);

  const text = translate ? getTranslation(language, children) : children;

  return <RNText style={style} {...restOfProps}>{text}</RNText>;
}

function areEqual(prev, next) {
  if (prev.translate !== next.translate) return false;
  if (prev.children !== next.children) return false;
  if (prev.style !== next.style) return false;
  return true;
}

export default React.memo(TranslatedText, areEqual);

function getTranslation(language, children) {
  if ('english' === language) return children;
  
  const key = `${children}`?.trim()?.toLowerCase();
  let newText = TEXT[language][key];
  newText = !newText ? children : newText;
  return newText;
}

TranslatedText.defaultProps = {
  translate: true,
  children: '',
  style: {},
};

TranslatedText.propTypes = {
  translate: PropTypes.bool,
  children: PropTypes.node,
  style: RNText.propTypes.style,
  theme: PropTypes.string,
  fontSize: PropTypes.string,
};