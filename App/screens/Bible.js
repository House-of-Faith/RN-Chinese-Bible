import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/native';
import Swiper from 'react-native-swiper';

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
    nextVerses,
    prevVerses,
    // nextChapter: moveNext,
    // prevChapter: movePrev,
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

  function setCurrentScripture({ testament = testament, book = book, chapter = chapter }) {
    dispatch({ type: 'SET_CURRENT_SCRIPTURE', payload: { testament, book, chapter } });
  }

  useEffect(() => {
    if (ref?.current) ref.current.scrollTo({ y: 0 });
  }, [verses]);

  return (
    <Swiper showsPagination={false} loop={false} onIndexChanged={() => {
      // TODO: figure out how to manage the swipe index
      // moveNext();
    }}>
      <SafeArea>
        <Container ref={ref}>
          <Spacer />
          <Chapter verses={verses} />
        </Container>
      </SafeArea>
      {nextVerses.length > 0 && <SafeArea>
        <Container ref={ref}>
          <Spacer />
          <Chapter verses={nextVerses} />
        </Container>
      </SafeArea>}
      {prevVerses.length > 0 && <SafeArea>
        <Container ref={ref}>
          <Spacer />
          <Chapter verses={prevVerses} />
        </Container>
      </SafeArea>}
    </Swiper>
  );

}


const SafeArea = styled.SafeAreaView(({ theme }) => ({
  backgroundColor: theme.background.reading,
}));

const Container = styled.ScrollView(() => ({
  paddingHorizontal: 32,
}));

const Spacer = styled.View({ height: 30 });
