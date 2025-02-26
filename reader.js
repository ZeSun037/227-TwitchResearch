const fs = require("fs");
const csvParser = require("csv-parser")

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
        
        fileReadStream.close();
    };
    return {
        data: db,
        languages: dict
    };
}

module.exports = {loadData};