const fs = require("fs");
const csvParser = require("csv-parser")

const DATA = [];
const LANG = new Set();

const get_data = (file) => {
    let fileReadStream = fs.createReadStream(file, 'utf8');
    fileReadStream
    .pipe(csvParser())
    .on("data", data => {
        cnt += 1;
        if (cnt < 15) {
            DATA.push(data);
        }
    })
    .on("end", () => {
        console.log(DATA);
    });
}

get_data("./data/bad_words_langs.csv");