const fs = require("fs");
const csvParser = require("csv-parser")

const PATH1 = './data/bad_words_langs.csv';
const PATH2 = './data/processed_bad_words.csv';

const loadData = (paths) => {
    let dict = new Set();
    let db = [];
    for (let file of paths) {
        let fileReadStream = fs.createReadStream(file, 'utf8');
        fileReadStream
        .pipe(csvParser())
        .on("data", data => {
            db.push(data);
            dict.add(data.language);
        })
        .on("end", () => {
            console.log(`Completed Data loading for ${file.split("/")[2]}.`);
        });
    };
    return {
        data: db,
        languages: dict
    };
}

module.exports = {loadData, PATH1, PATH2};