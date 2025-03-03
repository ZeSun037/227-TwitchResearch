import axios from "axios";
import config from "./data/config.json";
import { loadData } from "./reader";

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const DB = await loadData(config.paths);
await sleep(2000);

const LANG = DB.languages; // 12 languages
const DATA = {};

for (let lang of LANG) {
    DATA[lang] = DB.data.filter(e => e.language == lang);
    console.log(lang);
}

await sleep(1000);
for (let lang of LANG) {
    var {data} = await axios.post(config.url, 
        {
            "broadcaster_id": config.channel_id,
            "sender_id": config.channel_base_id,
            "message": `${lang.toUpperCase()}`
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.accessToken}`,
                "Client-Id": `${config.client_id}`
            }
    });

    console.log(JSON.stringify(data));
    await sleep(1500);
    for (let i = 0; i < DATA[lang].length; i ++) {
        if (i >= 5) {
            continue;
        }
        var {data} = await axios.post(config.url, 
            {
                "broadcaster_id": config.channel_id,
                "sender_id": config.channel_base_id,
                "message": `${DATA[lang][i].text}`
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${config.accessToken}`,
                    "Client-Id": `${config.client_id}`
                }
        });
    
        console.log(JSON.stringify(data));
        await sleep(1500);
    }
}


// let subset = DATA.filter(data => ( data.language == 'da' || data.language == 'cs'
//     || data.language == 'de'
// ));

// let curr_lang = '';

// for (let i = 0; i < subset.length; i++) {

//     let postData = {
//         "broadcaster_id": config.channel_id,
//         "sender_id": config.channel_base_id,
//         "message": `${subset[i].text}`
//     };
//     if (subset[i].language != curr_lang) {
//         await axios.post(config.url, 
//             {
//                 "broadcaster_id": config.channel_id,
//                 "sender_id": config.channel_base_id,
//                 "message": `${subset[i].language}`
//             }, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${config.accessToken}`,
//                     "Client-Id": `${config.client_id}`
//                 }
//         });
//         curr_lang = subset[i].language;
//         await sleep(1500);
//     }
//     var {data} = await axios.post(config.url, 
//         postData, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${config.accessToken}`,
//                 "Client-Id": `${config.client_id}`
//             }
//     });

//     console.log(JSON.stringify(data));
//     await sleep(1500);
// }




