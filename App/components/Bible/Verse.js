import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/native';
import { useSelector } from 'react-redux';
import { selectors } from 'store';
import { useIsMounted } from 'lib/hooks';

export default function Verse({ number, text }) {
  const size = useSelector(selectors.fontSize);
  const isEnglish = useSelector(selectors.language) === 'english';

  const isMounted = useIsMounted();

  const [verseParts, setVerseParts] = useState(breakVerseIntoParts());
  const [startsWithItalics, setStartsWithItalics] = useState(doesItStartWithItalics());

  useEffect(() => {
    if (!isMounted) return;
    if (!isEnglish) return;
    setVerseParts(breakVerseIntoParts());
    setStartsWithItalics(doesItStartWithItalics());
  }, [isEnglish, text, size]);

  function breakVerseIntoParts() {
    if (!isEnglish) return [];
    return text.split(/\[|\]/);
  }

  function doesItStartWithItalics() {
    if (!isEnglish) return;
    return text.startsWith('[');
  }

  function isItalicized(i) {
    return i % 2 === (startsWithItalics ? 0 : 1);
  }

  if (!isEnglish)
    return (
      <VerseContainer size={size}>
        <Text size={size}>
          {number} {text}
        </Text>
      </VerseContainer>
    );

  return (
    <VerseContainer size={size}>
      <Text size={size}>
        {`${number} `}
        {verseParts.map((phrase, i) => {
          return (
            <Text key={phrase + i} size={size} italicized={isItalicized(i)}>
              {phrase}
            </Text>
          );
        })}
      </Text>
    </VerseContainer>
  );
}

const lineHeightMap = {
  small: 21,
  medium: 27,
  large: 32,
};

const marginBottomMap = {
  small: 13,
  medium: 17,
  large: 21,
};

const VerseContainer = styled.View(({ size }) => ({
  marginBottom: marginBottomMap[size],
}));

const Text = styled.Text(({ theme, size, italicized }) => ({
  fontSize: theme.fontSize[size],
  lineHeight: lineHeightMap[size],
  color: theme.text.reading,
  fontStyle: italicized ? 'italic' : 'normal',
  fontWeight: italicized ? '300' : '400',
}));

Verse.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};
