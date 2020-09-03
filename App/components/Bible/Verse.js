import React from 'react';
import styled from '@emotion/native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectors } from 'store';

export default function Verse({ number, text }) {
  // TODO: Account for italics in english
  const fontSize = useSelector(selectors.fontSize);
  return (
    <Text fontSize={fontSize}>
      {number} {text}
    </Text>
  );
}

const Text = styled.Text(({ theme, fontSize }) => ({
  fontSize: theme.fontSize[fontSize],
  lineHeight: 27,
  marginBottom: 13,
  color: theme.text.reading,
}));

Verse.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};
