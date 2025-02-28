const tmi = require("tmi.js");
const config = require("./data/config.json");
const http = require("http");
const { loadData } = require("./reader");
const { timeout } = require("tmi.js/lib/commands");

const TOKEN = config.accessToken;
const CHANNEL = config.channel_base;
const USER = config.username;
let CURR;

const opt = {
    identity: {
        username: USER,
        password: TOKEN,
    }, 
    channels: [CHANNEL]
}

const DB = loadData(config.paths);
const DATA = DB.data;
const LANG = DB.languages;

const client = tmi.client(opt);

client.on("chat", async (channel, _, message, self) => {
    if (message.trim().startsWith("!")) {
        const cmd = message.trim()
        .toLowerCase()
        .split(" ");

        if (cmd.length == 1) {
            if (cmd[0] == "!help") {
                await client.say(channel,
                    `To test AutoMod, call !analyze and then call !run #<language abbreviation>. To run in English, use !run. To export data, use !analyze.`
                );
            }
            else if (cmd[0] == "!run") {
                const eo_words = DATA.filter(data => data.language == "eo");
                console.log(eo_words.length);
                for (let i = 0; i < eo_words.length; i++) {
                    await client.say(channel, eo_words[i].text);
                }
                // Default
            }
            else if (cmd[0] == "!analyze") {
                console.log("Analyze");
                await client.say(channel, "Analyzing!");
            }
            else if (cmd[0] == "!list") {
                await client.say(channel, "Below are currently supported languages in attack set:");
                for (let lang of LANG) {
                    const status = await client.say(channel, `${lang.toUpperCase()}`);
                    console.log(status);
                }
            } 
            else {
                await client.say("Illegal command. Please try again.");
            }
        } else if (cmd.length == 2 && cmd[0] === "!run") {
            const lang = cmd[1];
            const lang_db = new Map();
            if (lang_db.has(lang)) {
                // If the language is in the database, stream the swear lexicons to the stream channel.
            } else {
                client.say(`${lang} is, unfortunately, unsupported at the moment.`);
            }
        }
    }
});

// client.on("connected", async () => {
//     await client.say(config.channel, CURR);
//     console.log(CURR);
// })

// for (let lang of LANG) {
//     let words = DATA.filter(data => data.language === land);
//     for (let word of words) {
//         CURR = word.text;
//         await client.connect();
//         await client.disconnect();
//     }
//     console.log(lang);
// }

