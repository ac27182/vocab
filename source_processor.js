const fs = require('fs')


const files = fs.readdirSync('./vocab')
const records =
  files
    .map(path => JSON.parse(fs.readFileSync(`./vocab/${path}`,'utf8')))
    .map(record => record.goal_items)
    .flat(1)


const processed =
  records.map(record => {
    return {
      word: record.item.cue.text,
      part_of_speech: record.item.cue.part_of_speech,
      hiragana: record.item.cue.transliterations.Hira,
      translation: record.item.response.text,
      sounds: record.sound
    }
  })

fs.writeFileSync("processed.json",JSON.stringify(processed,undefined,2))