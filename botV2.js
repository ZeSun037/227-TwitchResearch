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

const es_words = DATA.filter(data => data.language == "es");
console.log(DB);

for (let i = 0; i < es_words.length; i++) {

    let postData = {
        "broadcaster_id": config.channel_id,
        "sender_id": config.channel_base_id,
        "message": `${es_words[i].text}`
    };

    var {data} = await axios.post(config.url, 
        postData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.accessToken}`,
                "Client-Id": `${config.client_id}`
            }
    });

    console.log(JSON.stringify(data));
    await sleep(1500);
}




