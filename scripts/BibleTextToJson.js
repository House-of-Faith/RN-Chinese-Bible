/////////////////////////////////////////////////////////////////////////////
//
// Format:
//
// {
//   "Old Testament": [
//     [
//        []
//      ]
//    ],
//   "New Testament": [
//      [
//        []
//      ]
//    ]
// }
//
/////////////////////////////////////////////////////////////////////////////

const { readFileSync, writeFileSync } = require('fs')


const content = readFileSync(__dirname + '/simp.txt').toString()


const oldTestLength = 39;
const newTestLength = 27;

const OLD_TESTAMENT = "Old Testament";
const NEW_TESTAMENT = "New Testament";

const json = {
  [OLD_TESTAMENT]: [],
  [NEW_TESTAMENT]: [],
}

let currentBookIndex = -1;
let currentTestament = OLD_TESTAMENT

function isInOldTestament(){
  return currentBookIndex < oldTestLength;
}

function testamentBookIndex() {
  if (isInOldTestament()) return currentBookIndex;
  return currentBookIndex - oldTestLength;
}


let prevBook = null;

content.split('\n').forEach((line, i) => {
  const matches = line.match(/^(\w+)\s(\d+):(\d+)\s(.*)$/)
    
  if (matches) {
    const [, book, chapter, verse, content] = matches

    if (book !== prevBook) {
      currentBookIndex += 1;
      prevBook = book;
      currentTestament = isInOldTestament() ? OLD_TESTAMENT : NEW_TESTAMENT
    }
    const bookIndex = testamentBookIndex()
    const chapterIndex = +chapter - 1
    const verseIndex = +verse - 1
    // console.log(json[currentTestament].length)
    // console.log(bookIndex)

    if (json[currentTestament].length <= bookIndex) {
      json[currentTestament].push([])
    }
    // console.log(json[currentTestament])
      
    if (json[currentTestament][bookIndex].length <= chapterIndex) {
      json[currentTestament][bookIndex].push([])
    }
    
    // console.table({ bookIndex: bookIndex, chapterIndex, verseIndex, content })

    json[currentTestament][bookIndex][chapterIndex].push(content)

  }
})

writeFileSync(__dirname + '/simp.json', JSON.stringify(json, null, 2))

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

