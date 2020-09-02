import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/native';
import GestureRecognizer from 'react-native-swipe-gestures';

import { selectors } from 'store';
import { useBible, useIsMounted } from 'lib/hooks';
import Chapter from 'components/Bible/Chapter';

export default function Main() {
  const ref = useRef(null);

  const isMounted = useIsMounted();
  const dispatch = useDispatch();
  const {
    testament: testGlobal,
    book: bookGlobal,
    chapter: chapterGlobal,
  } = useSelector(selectors.currentScripture);
  const {
    testament, // old/new
    setTestament,
    book, // index
    setBook,
    chapter, // index
    setChapter,
    verses, // array of verses
    nextChapter,
    prevChapter,
  } = useBible({ testament: testGlobal, book: bookGlobal, chapter: chapterGlobal });

  useEffect(() => {
    if (testament === testGlobal) return;
    setTestament(testGlobal);
  }, [testGlobal]);
    
  useEffect(() => {
    if (book === bookGlobal) return;
    setBook(bookGlobal);
  }, [bookGlobal]);

  useEffect(() => {
    if (chapter === chapterGlobal) return;
    setChapter(chapterGlobal);
  }, [chapterGlobal]);

  useEffect(() => {
    if (!isMounted) return;
    setCurrentScripture({ testament, book, chapter });
  }, [testament, book, chapter]);

  function setCurrentScripture({ testament = testament, book = book, chapter = chapter}) {
    dispatch({ type: 'SET_CURRENT_SCRIPTURE', payload: { testament, book, chapter }});
  }
		
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 100,
  };

  useEffect(() => {
    if (ref?.current) ref.current.scrollTo({ y: 0 });
  }, [verses]);

  return (
    <SafeArea>
      <Container ref={ref}>
        <GestureRecognizer
          onSwipeLeft={nextChapter}
          onSwipeRight={prevChapter}
          config={config}
        >
          <Spacer />
          <Chapter verses={verses} />
        </GestureRecognizer>
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled.SafeAreaView(({ theme }) => ({
  backgroundColor: theme.background.reading,
}));

const Container = styled.ScrollView(({ theme }) => ({
  paddingHorizontal: 32,
}));

const Spacer = styled.View({ height: 30 });
