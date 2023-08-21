const udb = require("../databases/usersdb");
const conf = require('../config.json');
const TeleBot = require('telebot');
const bot = new TeleBot(conf.bot_api_key);
bot.start();
const i = require("./interface");

async function ids(uid) {
    if (conf.admins.indexOf(uid) > -1) {
        return {status: 2, id: uid};
    } else {
        return {status: 1, id: uid};
    }
}

async function keybord(btn_list) {
    let replyMarkup = bot.keyboard(btn_list, {resize: true});
    var buttons = {
        parseMode: 'Html',
        replyMarkup};
        return buttons;
    }

async function sendMSG(userId, text, buttons) {
try {
    let options = await keybord(buttons);
        await bot.sendMessage(userId, text, options);
} catch(error) {
    if (error.error_code !== 403 && error.description === "Forbidden: bot was blocked by the user") {
        await udb.removeUser(userId);
                }
}
    }

    async function forwardMSG(userId, from_chat, msg_id) {
        try {
                await bot.forwardMessage(userId, from_chat, msg_id, {});
        } catch(error) {
            console.error(error, JSON.stringify(error));
            if (error.error_code !== 403 && error.description === "Forbidden: bot was blocked by the user") {
                await udb.removeUser(userId);
                        }
        }
            }

async function sendMSGToChats(userId, text) {
    var buttons = {
        parseMode: 'Html'};
    await bot.sendMessage(userId, text, buttons);
}

async function sendMSGWithPhoto(userId, photo, text) {
    await bot.sendPhoto(userId, photo, {
        caption: text,
        fileName: 'photo.jpg',
        serverDownload: true,
        parseMode: 'Html'
    });
}

async function allCommands() {
    try {
        bot.on('text', async (msg) => {
            var uid = await ids(msg.from.id);
            var name = '';
            if (msg.from.first_name) name += msg.from.first_name;
            if (msg.from.last_name) name += ' ' + msg.from.last_name;
            await i.main(uid.id, msg.text, uid.status, name);
    });
    } catch(er) {
        console.log(JSON.stringify(er));
    }
}

async function checkSubscribes(uid) {
    var chats = [];
    try {
let ids = conf.chats;
        let counter = 1;
for (let id of ids) {
    let chat = await bot.getChatMember(id, uid);
    if (chat.user.id === uid && chat.status === 'member' || chat.user.id === uid && chat.status === 'creator') chats.push(counter);
counter++;
        }
} catch (e) {
console.log(JSON.stringify(e));
    }
return chats;
}

async function sendChatsMSG(text) {
    try {
    let chats = conf.chats;
for (let chat of chats) {
    await sendMSGToChats(chat, text);
}
    } catch(e) {
        console.log(JSON.stringify(e));
    }
}

module.exports.sendMSG = sendMSG;
module.exports.forwardMSG = forwardMSG;
module.exports.sendMSGWithPhoto = sendMSGWithPhoto;
module.exports.ids = ids;
module.exports.allCommands = allCommands;
module.exports.checkSubscribes = checkSubscribes;
module.exports.sendChatsMSG = sendChatsMSG;