import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { selectors } from 'store';
import { useBible, useIsMounted } from 'lib/hooks';
import PageSwiper from 'components/Bible/PageSwiper';
import SettingsDropdown from 'components/Settings/SettingsDropdown';

export default function Bible({ navigation }) {
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
    nextChapter: moveNext,
    prevChapter: movePrev,
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

  return (
    <>
      <PageSwiper
        prev={prevVerses}
        curr={verses}
        next={nextVerses}
        onNext={moveNext}
        onPrev={movePrev}
      />
      <SettingsDropdown navigation={navigation} />
    </>
  );

}

Bible.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired
};
