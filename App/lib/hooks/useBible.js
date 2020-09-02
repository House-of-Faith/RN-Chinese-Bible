import { useState } from 'react';
import { useSelector } from 'react-redux';

import english from 'assets/translations/english.json';
import traditional from 'assets/translations/traditional.json';
import simplified from 'assets/translations/simplified.json';

import { selectors } from 'store';

const languages = {
  english,
  traditional,
  simplified
};

const testMap = {
  old: 'Old Testament',
  new: 'New Testament',
};

const books = {
  old: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'],
  new: ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation']
};

const allBooks = [...books.old, ...books.new];

export default function useBible(initialState) {
  const language = useSelector(selectors.language);
  const bible = languages[language];

  const [testament, innerSetTestament] = useState(initialState?.testament || 'old'); // new
  const testKey = testMap[testament];
  const [book, innerSetBook] = useState(initialState?.book ?? null);
  const [chapter, innerSetChapter] = useState(initialState?.chapter ?? null);
  const verses = bible[testKey]?.[book]?.[chapter] || [];

  function nextChapter() {
    let nextChapter = chapter + 1;
    let nextBook = book;
    let nextTest = testament;

    // maybe advance book
    if (nextChapter >= bible[testKey]?.[book]?.length) {
      nextChapter = 0;
      nextBook += 1;
    }

    // maybe advance testament
    if (nextBook >= bible[testKey]?.length) {
      nextBook = 0;
      nextTest = nextTest === 'old' ? 'new' : null;
    }

    // did we reach the end of the bible?
    if (nextTest === null) return;

    if (nextChapter !== chapter) innerSetChapter(nextChapter);
    if (nextBook !== book) innerSetBook(nextBook);
    if (nextTest !== testament) innerSetTestament(nextTest);
  }

  function prevChapter() {
    let prevChapter = chapter - 1;
    let prevBook = book;
    let prevTest = testament;
    
    // maybe go to prev book
    if (prevChapter < 0) {
      prevBook -= 1;
      prevChapter = (bible[testKey][prevBook]?.length || 0) - 1;
    }
    
    // maybe go to prev testament
    if (prevBook < 0) {
      prevTest = prevTest === 'new' ? 'old' : null;
      prevBook = books.old.length - 1;
      prevChapter = bible[testMap.old][prevBook].length - 1;
    }

    // did we reach the beginning the bible?
    if (prevTest === null) return;

    if (prevChapter !== chapter) innerSetChapter(prevChapter);
    if (prevBook !== book) innerSetBook(prevBook);
    if (prevTest !== testament) innerSetTestament(prevTest);
  }

  function setTestament(payload) {
    // TODO: allow index 0/1
    const newVal = payload?.trim()?.toLowerCase();
    if (['old', 'old testament', 'oldTestament'].includes(newVal)) {
      innerSetTestament('old');
      return;
    }
    if (['new', 'new testament', 'newTestament'].includes(newVal)) {
      innerSetTestament('new');
      return;
    }
  }

  function setBook(payload) {
    // TODO: allow book names?
    if (payload === null || payload === undefined) {
      innerSetBook(null);
      innerSetChapter(null);
    }
    const isValid = (bible?.[testKey]?.[payload] || 0).length > 0;
    if (!isValid) return;
    innerSetBook(payload);
  }

  function setChapter(payload) {
    // TODO: allow book names
    if (payload === null || payload === undefined) {
      innerSetChapter(null);
    }
    const isValid = !!bible?.[testKey]?.[book]?.[payload];
    if (!isValid) return;
    innerSetChapter(payload);
  }

  return {
    testament, // old/new
    setTestament,
    book, // index
    books: books[testament], // array of book names
    setBook,
    chapter, // index
    chapters: bible[testKey][book]?.length || 0, // integer
    setChapter,
    verses, // array of verses
    nextChapter,
    prevChapter,
  };
}