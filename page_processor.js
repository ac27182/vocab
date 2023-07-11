const data = require('./processed.json')
const fs = require('fs')

const SIZE = 100

const pages = new Array(data.length / SIZE).fill([])

/** 
 * @param {string} body 
 * @returns {string}
 */
const fillTemplate = (body) => `
<!DOCTYPE html>
<html lang="en">
<head><link rel="stylesheet" href="../index.css"></head>
<body>${body}</body>
</html>
`

/**
 * 
 * @param {*} records 
 * @returns {string}
 */
const makeTableRows = (records) =>
  records
    .map(record => {
      return `<tr><td>${record.word}</td><td>${record.hiragana}</td><td>${record.translation}</td></tr>`
    })

const makeTable = (rows) =>
  `<table>${rows.join("")}</table>`

const partitions =
  pages
    .map((_,index) => {

      const lowerBound = index * SIZE
      const upperBound = index * SIZE + (SIZE)
      const records = data.slice(lowerBound,upperBound)

      return records
    })

const writeToFolder = (data,index) =>
  fs.writeFileSync(`./parts/part_${index + 1}.html`,data,)

partitions
  .map(makeTableRows)
  .map(makeTable)
  .map(fillTemplate)
  .forEach((data,index) => writeToFolder(data,index))
