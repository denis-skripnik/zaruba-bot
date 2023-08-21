const conf = require('./config.json');
const bdb = require("./databases/blocksdb");
const udb = require("./databases/usersdb");
const del = require("./decimal");
const helpers = require('./helpers');
const { default: Axios } = require('axios');
const LONG_DELAY = 12000;
const SHORT_DELAY = 3000;
const SUPER_LONG_DELAY = 1000 * 60 * 15;

// Обработка блока.
async function processBlock(bn) {
    let ok_ops_count = 0;
    const transactions = await del.getBlockData(bn);
if (transactions && transactions.length > 0) {
    for (let transaction of transactions) {
                    if (transaction.type === 'send_coin') {
                        // data.
                    }
    } // end if working types.
                } // End for transactions.
}                 else {
    ok_ops_count = 0;
}
return ok_ops_count;
    }

    // Работа с текущими и прошлыми блоками.
    let PROPS = null;
let bn = 0;
let last_bn = 0;
let delay = SHORT_DELAY;
async function getBlocks() {
    PROPS = await del.getBlockNum();
            const block_n = await bdb.getBlock(PROPS);
bn = block_n.last_block;

delay = SHORT_DELAY;
while (true) {
    try {
        if (bn > PROPS) {
            // console.log("wait for next blocks" + delay / 1000);
            await helpers.sleep(delay);
            PROPS = await del.getBlockNum();
        } else {
            if(0 < await processBlock(bn)) {
                delay = SHORT_DELAY;
            } else {
                delay = LONG_DELAY;
            }
            bn++;
            await bdb.updateBlock(bn);
        }
    } catch (e) {
        console.log(e);
        await helpers.sleep(1000);
        }
    }
}

setInterval(() => {
    if(last_bn == bn) {

        try {
                process.exit(1);
        } catch(e) {
            process.exit(1);
        }
    }
    last_bn = bn;
}, SUPER_LONG_DELAY);

module.exports.getBlocks = getBlocks;