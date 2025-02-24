const tmi = require("tmi.js");
const config = require("./data/config.json");
const {DATA, LANG} = require("./reader");
const { timeout } = require("tmi.js/lib/commands");

const TOKEN = config.token;
const CHANNEL = config.channel;
const USER = config.username;
const opt = {
    identity: {
        username: USER,
        password: TOKEN,
    }, 
    channels: [CHANNEL]
}

const client = tmi.client(opt);

client.connect();

client.on("connected", () => {
    console.log(`Connected to ${CHANNEL}`);
    client.say(CHANNEL, "Hi, bot connected!");
});

client.on("message", async (channel, _, message, self) => {
    if (self || !message.trim().startsWith("!")) {
        // console.log(message);
        return;
    };

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
            for (let i = 0; i < eo_words.length; i++) {
                await client.say(CHANNEL, eo_words[i].text);
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
});
