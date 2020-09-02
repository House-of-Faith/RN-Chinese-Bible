import React from 'react';
import styled from '@emotion/native';

export default function ChapterList({ chapters, onSelectChapter }) {
  return [...Array(chapters)]?.map((x, i) => (
    <ChapterBox
      key={i}
      onPress={() => onSelectChapter(i)}
    >
      <ChapterText>{i + 1}</ChapterText>
    </ChapterBox>
  ));
}

const ChapterBox = styled.TouchableOpacity(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 5,
  marginVertical: 5,
  width: 52,
  height: 52,
  backgroundColor: theme.background.card,
}));

const ChapterText = styled.Text(({ theme }) => ({
  fontSize: 16,
  color: theme.text.card,
}));
