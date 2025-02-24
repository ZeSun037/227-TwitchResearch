const tmi = require("tmi.js");

const TOKEN = "1wqg237iernmyw0gvwaiid8dk4g8na";
const CHANNEL = "neolskywalker"; //Use Raymond's channel likely

const opt = {
    identity: {
        username: "neolskywalker",
        password: TOKEN,
    }, 
    channels: [CHANNEL]
}

const client = tmi.client(opt);

client.on("message", async (channel, _, message, self) => {
    if (self || !message.trim().startsWith("!")) {
        console.log(message);
        return;
    };

    const cmd = message.trim()
    .toLowerCase()
    .split(" ");

    if (cmd.length == 1) {
        switch (cmd[0]) {
            case "!help":
                client.say(channel,
                    `To test AutoMod, call !analyze and then call !run #<language abbreviation>. To run in English, use !run. To export data, use !analyze.`
                );
                break;
            case "!run":
                // Run default swear test in English
                break;
            case "!analyze":
                // Connect with Rammya's code to start data profiling
                // This is expected to be called first.
                break;
            default:
                await client.say("Illegal command. Please try again.")
        }
    } else if (cmd.length == 2) {
        const lang = cmd[1];
        const lang_db = new Map();
        if (lang_db.has(lang)) {
            // If the language is in the database, stream the swear lexicons to the stream channel.
        } else {
            client.say(`${lang} is, unfortunately, unsupported at the moment.`);
        }
    }
});

client.join(CHANNEL);