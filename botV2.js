import axios from "axios";
import config from "./data/config.json";
import { loadData } from "./reader";

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const DB = await loadData(config.paths);
await sleep(2000);

const DATA = DB.data;
const LANG = DB.languages;

let ar = DATA.filter( data => data.language == 'ar');

for (let i = 0; i < 5; i ++) {
    var {data} = await axios.post(config.url, 
        {
            "broadcaster_id": config.channel_id,
            "sender_id": config.channel_base_id,
            "message": `${ar[i].text}`
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




