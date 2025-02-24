const fs = require("fs");
const csvParser = require("csv-parser")

const get_data = (file) => {

    let fileReadStream = fs.createReadStream(file, 'utf8');

    let result = { };
    let cnt = 0;
    fileReadStream
    .pipe(csvParser())
    .on("data", data => {
        cnt += 1;
        if (cnt < 15) {
            result.push(data);
        }
    })
    .on("end", () => {
        console.log(result);
    })
}

get_data("./data/bad_words_langs.csv");