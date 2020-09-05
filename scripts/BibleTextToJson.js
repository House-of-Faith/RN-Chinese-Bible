/*///////////////////////////////////////// Description ////////////////////////////////////////////

  Creates a bible .json file from a .txt file

////////////////////////////////////////////// Usage ///////////////////////////////////////////////

  node BibleTextToJson.js [importFileName] [exportFileName]

  example 1 (no args - defaults to bible.txt/json):
    node BibleTextToJson.js

  example 2 (with args):
    node BibleTextToJson.js Chinese_Bible_Simplified.txt simplified.json

/////////////////////////////////////////// Input/Output ///////////////////////////////////////////

  The expected formats are as follows:

  The import .txt file should contain at least 31,102 seperate lines - 1 line per each verse in the
  bible.
    Each line should be in the format: book chapter:verse text, for example: Joh 11:35 Jesus wept.
    The book name may be abbreviated, but all lines must be in the correct order.
    Leading line whitespace will be ignored.
    Lines that do not follow the expected format will be ignored.

  The export .json will be a json object with two keys "Old/New Testament".
    Each testament object will contain an array of books
    Each book will contain an array of chapters
    Each chapter will contain an array of verses
    Each verse will be a single string

    {
      "old": [ [ [] ] ],
      "new": [ [ [] ] ]
    }

*/

const { readFileSync, writeFileSync } = require('fs');

const [, , ...args] = process.argv;
const importFile = args[1] ? args[0] : 'bible.txt';
const exportFile = args[1] || 'bible.json';

const content = readFileSync(__dirname + '/' + importFile).toString();

const oldTestLength = 39;

const OLD_TESTAMENT = 'old';
const NEW_TESTAMENT = 'new';

const json = {
  [OLD_TESTAMENT]: [],
  [NEW_TESTAMENT]: [],
};

let currentBookIndex = -1;
let currentTestament = OLD_TESTAMENT;

function isInOldTestament() {
  return currentBookIndex < oldTestLength;
}

function testamentBookIndex() {
  if (isInOldTestament()) return currentBookIndex;
  return currentBookIndex - oldTestLength;
}


let prevBook = null;

content.split('\n').forEach(line => {
  const matches = line.match(/^\s*(\w+)\s(\d+):(\d+)\s(.*)$/);

  if (matches) {
    const [, book, chapter, content] = matches;

    if (book !== prevBook) {
      currentBookIndex += 1;
      prevBook = book;
      currentTestament = isInOldTestament() ? OLD_TESTAMENT : NEW_TESTAMENT;
    }
    const bookIndex = testamentBookIndex();
    const chapterIndex = +chapter - 1;

    if (json[currentTestament].length <= bookIndex) {
      json[currentTestament].push([]);
    }

    if (json[currentTestament][bookIndex].length <= chapterIndex) {
      json[currentTestament][bookIndex].push([]);
    }

    json[currentTestament][bookIndex][chapterIndex].push(content);

  }
});

writeFileSync(__dirname + '/' + exportFile, JSON.stringify(json, null, 2));

// END //////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////
//
// Format:
//
// {
//    [book]: {
//      [chapter]: {
//        [verse]: text
//       }
//    }
// }
//
/////////////////////////////////////////////////////////////////////////////

// const { readFileSync, writeFileSync } = require('fs')
// const content = readFileSync(__dirname + '/simp.txt').toString()
// const json = {}

// content.split('\n').forEach((line, i) => {
//   const matches = line.match(/^(\w+)\s(\d+):(\d+)\s(.*)$/)

//   if (matches) {
//     const [, book, chapter, verse, content] = matches

//     if (!json[book]) {
//       json[book] = {}
//     }

//     if (!json[book][chapter]) {
//       json[book][chapter] = {}
//     }

//     json[book][chapter][verse] = content
//   }
// })

// writeFileSync(__dirname + '/simp.json', JSON.stringify(json, null, 2))

// END //////////////////////////////////////////////////////////////////////

