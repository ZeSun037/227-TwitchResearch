import axios from "axios";
import config from "./data/config.json";



function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
for (let i = 0; i < 2; i++) {

    let postData = {
        "broadcaster_id": config.channel_id,
        "sender_id": config.channel_base_id,
        "message": `"Hello, World! Hey Guys. ${i}"`
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
    await sleep(2000);
}




