const tmi = require("tmi.js");
const config = require("./data/config.json");

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
        console.log(message);
        return;
    };

    const cmd = message.trim()
    .toLowerCase()
    .split(" ");

    if (cmd.length == 1) {
        if (cmd[0] == "!help") {
            await client.say(CHANNEL,
                `To test AutoMod, call !analyze and then call !run #<language abbreviation>. To run in English, use !run. To export data, use !analyze.`
            );
        }
        else if (cmd[0] == "!run") {
            // Default
        }
        else if (cmd[0] == "!analyze") {
            console.log("Analyze");
            await client.say(CHANNEL, "Analyzing!");
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
