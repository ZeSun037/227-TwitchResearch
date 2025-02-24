const fs = require("fs");
const csvParser = require("csv-parser")

const DATA = [];
const LANG = new Set();

const get_data = (file) => {
    let fileReadStream = fs.createReadStream(file, 'utf8');
    fileReadStream
    .pipe(csvParser())
    .on("data", data => {
        DATA.push(data);
        LANG.add(data.language);
    })
    .on("end", () => {
        console.log("Completed Data loading.");
    });
}

get_data("./data/bad_words_langs.csv");
get_data("./data/processed_bad_words.csv");

module.exports = {DATA, LANG};