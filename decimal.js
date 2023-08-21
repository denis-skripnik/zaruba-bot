const conf = require('./config.json');
const {Wallet, Decimal} = require('decimal-js-sdk/dist/decimal-sdk-node');
const wallet = new Wallet(conf.seed);
const options = {
    gateURL: conf.decimal_api,
    wallet,
    feeCoin: 'DEL', // The coin that pays commission
    mode: 'sync', // broadcast mode {sync | async | block}
 }
 const decimal = new Decimal(options);
const axios = require('axios');
axios.defaults.baseURL = conf.decimal_api;

async function getTransaction(txHash) {
    try {
    let response = await axios.get('/tx/' + txHash);
if (response.data.result.status === 'Success') {
    return true;
} else {
    return false;
}
    } catch(e) {
        console.log(JSON.stringify(e));
    return false;
    }
}

async function getNFTData(id) {
    try {
    let response = await axios.get('/nfts/' + id);
let data = response.data.result
let nft_data = data;
let owners = '';
let all_owners = {};
for (let owner of data.owners) {
if (owner.amount !== "0") {
    if (!all_owners[owner.address]) all_owners[owner.address] = 0;
    all_owners[owner.address] += parseFloat(owner.amount);
}
}


for (let owner of data.nftReserve) {
    if (owner.reserve !== "0" && owner.validatorId) {
if (!all_owners[owner.address]) all_owners[owner.address] = 0;
all_owners[owner.address] += 1;
}
}

if (Object.keys(all_owners).length > 0) {
    for (let address in all_owners) {
    owners += `<a href="https://explorer.decimalchain.com/address/${address}">${address}</a>: ${all_owners[address]}
`;
}
}
nft_data.owners = owners;
nft_data.startReserve = parseFloat(data.startReserve) / (10 ** 18);
nft_data.totalReserve = parseFloat(data.totalReserve) / (10 ** 18);
nft_data.asset = conf.decimal_explorer + data.asset;
return nft_data;
} catch(e) {
        console.log(JSON.stringify(e));
    return false;
    }
}

async function getBlockNum() {
    try {
    let response = await axios.get('blocks?limit=1&offset=0');
      return parseInt(response.data.result.blocks[0].height);
    } catch(e) {
        console.log(JSON.stringify(e));
    return false;
    }
}

async function getBlockData(number) {
    try {
    let response = await axios.get('/block/' + number + '/txs');
      let res = response.data.result.txs;
          return res;
    } catch(e) {
        throw `Ошибка: ${JSON.stringify(e)}`;
    }
}

async function getBalance(address) {
    try {
        let response = await axios.get('/address/' + address);
        let balances = {};
        for (let token in response.data.result.address.balance) {
            let balance = parseFloat(response.data.result.address.balance[token]) / (10 ** 18);
            balance = balance.toFixed(2)
            balances[token] = balance;
          }
let nfts = [];
for (let nft of response.data.result.address.balanceNft) {
    let nftId = nft.nftId;
    let nft_data = await getNFTData(nftId);
    if (nft_data !== false) {
        nfts.push(nft_data.headline);
    }
}
          return {address, balances, nfts};
    } catch(e) {
        console.log(e);
    return false;
    }
}

async function delToZaruba(amount) {
    const coinTicker = 'ZARUBA'
let res = await decimal.getCoin(coinTicker);
try {
amount *= parseFloat(res.volume) / parseFloat(res.reserve);
} catch(e) {
    console.error(e);
    return await delToZaruba(amount)
}
}

async function multisend(data) {
    try {
    if (data.length <= 100) {
        await decimal.multisendCoins(data, options);
    } else {
        let n = 1;
    let lists = [];
    lists[0] = [];
    let key = 0;
    for (let el of data) {
    if (n % 100 == 0) {
    key++;
    lists[key] = [];
    }
    lists[key].push(el);
    n++;
    }
    
    for (let list of lists) {
        await decimal.multisendCoins(list, options);
        await helpers.sleep(1000);
    }
    }
} catch(e) {
    console.error(e, JSON.stringify(e));
}
}

module.exports.getTransaction = getTransaction;
module.exports.getNFTData = getNFTData;
module.exports.getBlockNum = getBlockNum;
module.exports.getBlockData = getBlockData;
module.exports.getBalance = getBalance;
module.exports.delToZaruba = delToZaruba;
module.exports.multisend = multisend;