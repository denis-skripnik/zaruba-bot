require("./databases/@db.js").initialize({
    url: 'mongodb://localhost:27017',
    poolSize: 15
});

// const blockchain = require("./blockchain");
const botjs = require("./bot/bot");

async function run() {
    await botjs.allCommands();
// await blockchain.getBlocks();
}
run();