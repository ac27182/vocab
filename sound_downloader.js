const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const processed = require("./processed.json");


processed
  .forEach((value,index) => {
    const file =
      fs.createWriteStream(`./sound/${index}.mp3`)

    http
      .get(value.sounds,(response) => {
        response.pipe(file)
        file.on('finish',() => file.close())
        file.on('error',() => fs.unlink(`./sound/${index}.mp3`))

      })
  })