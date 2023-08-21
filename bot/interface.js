const conf = require('../config.json');
let lng = {};
lng['Русский'] = require('./languages/ru.js');
lng['English'] = require('./languages/en.js');
const botjs = require("./bot");
const udb = require("../databases/usersdb");
const edb = require("../databases/eventdb");
const adb = require("../databases/auctiondb");
const cdb = require("../databases/cardsdb");
const helpers = require("../helpers");
const del = require("../decimal");
const axios = require('axios');
const { METHODS } = require('http');

// Клавиатура
async function keybord(lang, variant) {
    var buttons = [];
    if (variant === 'lng') {
        buttons = [["English", "Русский"]];
    } else if (variant.indexOf('home') > -1) {
        buttons = [[lng[lang].info, lng[lang].my_wallet, lng[lang].bid], [lng[lang].buy_number, lng[lang].settings]];
    } else if (variant.indexOf('info') > -1) {
        buttons = [[lng[lang].instructions, lng[lang].roadmap], [lng[lang].support, lng[lang].back]];
    }     else if (variant === 'settings') {
        buttons = [[lng[lang].change_wallet, lng[lang].lang, lng[lang].back]];
    } else if (variant === 'fighters') {
        buttons = [[lng[lang].number1, lng[lang].number2, lng[lang].all_numbers, lng[lang].back]];
        } else if (variant === 'auction') {
        buttons = [[lng[lang].bn_price, lng[lang].back]];
    } else if (variant.indexOf('admin_buttons') > -1) {
        let event_status = variant.split('|')[1];
        let event_button = lng[lang].event_on;
        if (event_status === "true") event_button = lng[lang].event_finish;
        let bn_status = variant.split('|')[2];
        let bn_button = lng[lang].bn_on;
        if (bn_status === "true") bn_button = lng[lang].bn_finish;
        buttons = [[event_button, bn_button, lng[lang].active_cards, lng[lang].back]];
    } else if (variant.indexOf('ref_deposit') > -1) {
        buttons = [[lng[lang].bn_ref_deposit, lng[lang].bn_ref_cancel], [lng[lang].back]];        
    } else if (variant === 'fighter_action') {
        buttons = [[lng[lang].winn_fighter, lng[lang].lost_fighter, lng[lang].draw_fighter, lng[lang].back]];
    }     else if (variant === 'conferm') {
        buttons = [[lng[lang].conferm, lng[lang].cancel]];
    } else if (variant.indexOf('ref_withdraw') > -1) {
        buttons = [[lng[lang].ref_withdraw, lng[lang].back]];        
    } else if (variant.indexOf('custom') > -1) {
        buttons = JSON.parse(variant.split('custom')[1]);
    }     else if (variant === 'back') {
    buttons = [[lng[lang].back]];
}     else if (variant === 'cancel') {
        buttons = [[lng[lang].cancel]];
    }     else if (variant === 'no') {
        buttons = [];
    }
return buttons;
}

// Команды
async function main(id, message, status, names) {

    let user = await udb.getUser(id);
    if (!user) {
        let id_hash = await helpers.stringToHash(id);
        if (message.indexOf('r') > -1) {
            let ref_id = parseInt(message.split(' r')[1]);
            let referer = await udb.getUserByRefererCode(ref_id);
        if (referer) {
            let text = lng[referer.lng].new_referal1 + `https://t.me/zarubbabot?start=r${ref_id}`;
            let btns = await keybord(referer.lng, 'home');
            await botjs.sendMSG(referer.id, text, btns, false);
            let refs = [ref_id];
            if (referer.referers.length > 0) {
    for (let n in referer.referers) {
        if (n >= 2) continue;
        let referer2 = await udb.getUserByRefererCode(referer.referers[n]);
        if (referer2) {
            let text2 = lng[referer.lng].new_referal2(n) + `https://t.me/zarubbabot?start=r${referer.referers[0]}`;
            let btns2 = await keybord(referer2.lng, 'home');
        await botjs.sendMSG(referer2.id, text2, btns2, false);
        refs.push(referer.referers[0])
    } // end yes referer2.
    } // end for referers.
} // end if referer length > 0.
await udb.addUser(id, 'Русский', '', 'start', '', -1, 0, refs, id_hash, 0);
} // end yes referer.
     else {
        await udb.addUser(id, 'Русский', '', 'start', '', -1, 0, [], id_hash, 0);
     } // end no referer.
} else { // end if no referer code in command.
    await udb.addUser(id, 'Русский', '', 'start', '', -1, 0, [], id_hash, 0);
    } // end if no referer in command.
    } // end if not user.
    else { // yes user.
            await udb.updateUser(id, user.lng, user.status, message, user.wallet, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
    } // end yes user.

            if (message.indexOf('start') > -1 || user && user.lng && message.indexOf(lng[user.lng].lang) > -1) {
let text = '';
let btns;
if (message.indexOf('start') > -1 && user && user.lng && user.lng !== '' || !user) {
    if (!user) {
       user = [];
       user.lng = 'Русский';
    }
    await main(id, lng[user.lng].home, status, names);
} else {
    text = `Select language: Выберите язык.`;
    btns = await keybord('', 'lng');
    await botjs.sendMSG(id, text, btns);
}
            } else if (user && user.lng && message === lng[user.lng].back || user && user.lng && message === lng[user.lng].home) {
                if (user.wallet === '') {
    await main(id, lng[user.lng].change_wallet, status, names);
} else {
    let referer;
    if (user.referers && user.referers.length > 0) {
            referer = user.referers[0];
            let ref = await udb.getUserByRefererCode(user.referers[0]);
            if (ref && Object.keys(ref).length > 0) referer += ` (<a href="tg://user?id=${ref.id}">${lng[user.lng].ref_contact}</a>)`;
            } else {
        if (user.lng === 'Русский') {
            referer = 'Не найден';
                } else {
                    referer = 'not found';
                }
    }
    
    let referals = await udb.findReferals(user.referer_code);
let ref_level1 = 0;
let ref_level2 = 0;
let ref_level3 = 0;
    if (referals && referals.length > 0) {
for(let referal of referals) {
    let referers = referal.referers;
    if (referers[0] === user.referer_code) ref_level1 += 1;
    if (referers[1] === user.referer_code) ref_level2 += 1;
    if (referers[2] === user.referer_code) ref_level3 += 1;
}
}
    let text = `${lng[user.lng].home_text}: ${referer}.
    ${lng[user.lng].referal_link}: https://t.me/zarubbabot?start=r${user.referer_code}

    ${lng[user.lng].all_referals}:
1 ${lng[user.lng].of_level}: ${ref_level1},
2 ${lng[user.lng].of_level}: ${ref_level2},
3 ${lng[user.lng].of_level}: ${ref_level3}`;
    let btns = await keybord(user.lng, 'home');
            await botjs.sendMSG(id, text, btns);    
        }
    } else if (user && user.lng && message.indexOf(lng[user.lng].settings) > -1) {
        let text = lng[user.lng].settings_text;
        let btns = await keybord(user.lng, 'settings');
        await botjs.sendMSG(id, text, btns, false);
    } else if (user && user.lng && message.indexOf(lng[user.lng].change_wallet) > -1) {
    let text = lng[user.lng].enter_wallet;
    let btns = await keybord(user.lng, 'cancel');
    await botjs.sendMSG(id, text, btns, false);
} else if (user && user.lng && message === lng[user.lng].info) {
                        let text = lng[user.lng].info_text;
                        let btns = await keybord(user.lng, 'info');
                                await botjs.sendMSG(id, text, btns);
                            } else if (user && user.lng && message === lng[user.lng].instructions) {
                                let text = lng[user.lng].instructions_text;
                                let btns = await keybord(user.lng, 'info');
                                        await botjs.sendMSG(id, text, btns);
                                        await udb.updateUser(id, user.lng, lng[user.lng].home, message, user.wallet, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
                                    } else if (user && user.lng && message === lng[user.lng].roadmap) {
                                        let photo = 'http://157.90.126.53/images/roadmap.jpg';
                                        await botjs.sendMSGWithPhoto(id, photo, 'Roadmap');
                                        await udb.updateUser(id, user.lng, lng[user.lng].home, message, user.wallet, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
                                    } else if (user && user.lng && message === lng[user.lng].support) {
                                        let text = lng[user.lng].support_text;
                                        let btns = await keybord(user.lng, 'info');
                                                await botjs.sendMSG(id, text, btns);
                                                await udb.updateUser(id, user.lng, lng[user.lng].home, message, user.wallet, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
                                            } else if (user && user.lng && message === lng[user.lng].my_wallet) {
let balances = '';
let nfts_list = '';
let acc = await del.getBalance(user.wallet);
if (acc !== false) {
    let b_arr = acc.balances;
    if (b_arr && Object.keys(b_arr).length > 0) {
for (let token in b_arr) {
    let balance = b_arr[token];
    balances += `
${balance} ${token}`;
}
    }

    let nft_arr = acc.nfts;
    if (nft_arr && nft_arr.length > 0) {
for (let nft of nft_arr) {
    nfts_list += `${nft}`;
}
    }
}
                                                let text = `${lng[user.lng].start_my_wallet_text}: <a href="explorer.decimalchain.com/address/${user.wallet}">${user.wallet}</a>.
${lng[user.lng].ref_balance(conf.min_withdraw)}: ${user.ref_balance};

${lng[user.lng].mw_balances}:
${balances}

${lng[user.lng].mw_nfts}:
${nfts_list}`;
                                                let btns = await keybord(user.lng, 'back');
                                                        if (user.ref_balance >= await del.delToZaruba(conf.min_withdraw)) {
                                                            btns = await keybord(user.lng, 'ref_withdraw');
                                                        }
                                                await botjs.sendMSG(id, text, btns);
                                            } else if (user && user.lng && message === lng[user.lng].ref_withdraw) {
                                                let text = lng[user.lng].no_min_ref_withdraw;
                                                if (user.ref_balance >= conf.min_withdraw) {
                                                    text = lng[user.lng].ref_withdrawing;
                                                    let text2 = lng[user.lng].ref_withdraw_order(user.id, user.wallet, user.ref_balance);
                                                    let btns2 = await keybord(user.lng, 'no');
                                                    await botjs.sendMSG(conf.admins[0], text2, btns2);
                                                }
                                                let btns = await keybord(user.lng, 'back');
                                                        await botjs.sendMSG(id, text, btns);
                                                        await udb.updateUser(id, user.lng, user.prev_status, user.status, user.wallet, user.bid, user.auction_bid, user.referers, user.referer_code, 0);
                                                    } else if (user && user.lng && message.indexOf(lng[user.lng].bn_ref_deposit) > -1 && status === 2) {
                                                        let res = await adb.getFighter();
                                                        if (res && typeof res != 'undefined' && Object.keys(res).length > 0 && res.id !== 0) {
                                                            let text = lng[user.lng].bn_ref_deposited;
                                                            let winner = await udb.getUser(res.id);
                                                            if (winner && Object.keys(winner).length > 0) {
let refs = winner.referers;
if (refs.length > 0) {
    let n = 1;
    for (let ref of refs) {
        let referer = await udb.getUserByRefererCode(ref);
        if (referer && Object.keys(referer).length > 0) {
            let ref_balance = referer.ref_balance;
            let add_amount = res.amount / 100 * conf.ref_levels[String(n)];
            ref_balance += await del.delToZaruba(add_amount);
            await udb.updateUser(referer.id, referer.lng, referer.prev_status, referer.status, referer.wallet, referer.bid, referer.auction_bid, referer.referers, referer.referer_code, ref_balance);
        } // end yes referer2.
    n++;
    } // end for referers.
} // end if referer length > 0.
                                                            } // end if yes winner.
                                                                                                                    let btns = await keybord(user.lng, 'back');
                                                            await botjs.sendMSG(id, text, btns, false);
                                                            await adb.finishAuction();
                                                        await cdb.updateCard(res.post.split('t.me/')[1], res.id);
                                                        await udb.updateUser(id, user.lng, '/admin', lng[user.lng].home, user.wallet, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
                                                    }
                                                    } else if (user && user.lng && message.indexOf(lng[user.lng].bn_ref_cancel) > -1 && status === 2) {
                                                            let text = lng[user.lng].bn_ref_canceled;
                                                                                                                    let btns = await keybord(user.lng, 'back');
                                                            await botjs.sendMSG(id, text, btns, false);
                                                            await adb.finishAuction();
                                                            await cdb.updateCard(res.post, res.id);
                                                            await udb.updateUser(id, user.lng, '/admin', lng[user.lng].home, user.wallet, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
                                                        } else if (user && user.lng && message.indexOf(lng[user.lng].bid) > -1) {
                                                        let text = lng[user.lng].bid_text;
                                                        let btns = await keybord(user.lng, 'fighters');
                                                                    let event = await edb.getEvent();
                                                                    if (!event || event && event.status == false) {
                                                                        text = lng[user.lng].not_active_event;
                                                                        btns = await keybord(user.lng, 'back');
                                                                    } else if (user.bid > -1) {
                                                                        text = lng[user.lng].you_selected_bid;
                                                                        btns = await keybord(user.lng, 'back');
                                                                    }
                                                        await botjs.sendMSG(id, text, btns);
                                                        await udb.updateUser(id, user.lng, lng[user.lng].home, message, user.wallet, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
                                                    } else if (user && user.lng && message.indexOf(lng[user.lng].buy_number) > -1) {
                                                        let text = lng[user.lng].bn_not;
                                                        let btns = await keybord(user.lng, 'back');
                                                                    let res = await adb.getFighter();
                                                                    if (res && typeof res != 'undefined' && Object.keys(res).length > 0) {
                                                                        let link = res.post.split('t.me/')[1];
                                                                        let link_arr = link.split('/');
                                                                        let channel = '@' + link_arr[0];
                                                                        let msg_id = parseInt(link_arr[1]);
                                                                      text = lng[user.lng].bn_data(user.auction_bid, res.amount);
                                                                        btns = await keybord(user.lng, 'auction');
                                                                        await botjs.sendMSG(id, text, btns);
                                                                    await helpers.sleep(1000);
                                                                    await botjs.forwardMSG(id, channel, msg_id)
                                                                    } else {
                                                                        await botjs.sendMSG(id, text, btns);
                                                                    }
                                                                    await udb.updateUser(id, user.lng, lng[user.lng].home, message, user.wallet, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
                                                                } else if (user && user.lng && message === lng[user.lng].bn_price && user.status.indexOf(lng[user.lng].buy_number) > -1) {
                                                                    let text = lng[user.lng].enter_bn;
                                                                    let btns = await keybord(user.lng, 'cancel');
                                                                    await botjs.sendMSG(id, text, btns, false);
                                                                } else if (user && user.lng && message === lng[user.lng].help) {
            let text = lng[user.lng].help_text;
            let btns = await keybord(user.lng, 'home');
                    await botjs.sendMSG(id, text, btns);
                } else if (user && user.lng && message.indexOf('/nft') > -1 && status === 2) {
let nft_id = message.split(' ')[1];
                    let token = await del.getNFTData(nft_id);
                    let collection = token['nftCollection'];
                    let startReserve = token['startReserve'];
                    let totalReserve = token['totalReserve'];
                    let allowMint = lng[user.lng].yes;
                    if (token['allowMint'] === false) allowMint = lng[user.lng].no;
let status = lng[user.lng].active;
if (token['status'] !== 'active') status = lng[user.lng].not_active;

                    let text = `${lng[user.lng].collection}: ${collection},
${lng[user.lng].creator}: <a href="https://explorer.decimalchain.com/address/${token['creator']}">${token['creator']}</a>,
${lng[user.lng].meta_data}: <a href="${token['tokenUri']}">${lng[user.lng].nft_link}</a>
                    
                    ${lng[user.lng].owners}:
${token.owners}
${lng[user.lng].quantity}: ${token['quantity']},
${lng[user.lng].start_reserve}: ${startReserve} DEL;
${lng[user.lng].total_reserve}: ${totalReserve} DEL;
${lng[user.lng].allow_mint}: ${allowMint};
${lng[user.lng].created}: ${token['createdAt']};
${lng[user.lng].updated}: ${token['updatedAt']};
${lng[user.lng].headline}: ${token['headline']};
${lng[user.lng].description}: ${token['description']};
${lng[user.lng].status}: ${status}.
${lng[user.lng].nft_transaction}: <a href="https://explorer.decimalchain.com/transactions/${token.txHash}">${token.txHash}</a>
`;
                                let btns = await keybord(user.lng, 'home');
                                await botjs.sendMSG(id, text, btns);    
} else if (typeof lng[message] !== "undefined") {
                        let text = lng[message].selected_language;
        let btns = await keybord(message, '');
                    await udb.updateUser(id, message, user.status, message, user.wallet, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
                    await botjs.sendMSG(id, text, btns);
                    await helpers.sleep(3000);
                    await main(id, lng[message].home, status, names);
                } else if (user && user.lng && message.indexOf('/admin') > -1 && status === 2) {
                    let event = await edb.getEvent();
                    let event_status = false;
if (event && event.status && event.status === true) event_status = true;
let buy_number = await adb.getFighter();
let bn_status = false;
if (buy_number&& buy_number.post) bn_status = true;                    
let text = lng[user.lng].admin_text;
                    let btns = await keybord(user.lng, `admin_buttons|${event_status}|${bn_status}`);
                                await botjs.sendMSG(id, text, btns);
                            } else if (user && user.lng && message.indexOf(lng[user.lng].active_cards) > -1 && status === 2) {
                                let page = 1;
                                let cards = await cdb.findCards(page);
            let text = `${lng[user.lng].active_cards_text}.`;
            let n = 1;
            let key = 0;
            let buttons = [];
if (cards && cards.length > 0) {
    for (let card of cards) {
        if (!buttons[key]) {
        buttons[key] = [];
        }
        buttons[key].push(card.post);
        if (n % 2 == 0) {
        key++;
        }
        n++;
        }
        key += 1;
        buttons[key] = [];
        buttons[key].push(`${lng[user.lng].to_page} ${page+1}`);
        buttons[key].push(`${lng[user.lng].back}`);
}
            let btns = await keybord(user.lng, 'custom' + JSON.stringify(buttons));
                                            await botjs.sendMSG(id, text, btns);
                                            await udb.updateUser(id, user.lng, user.status, lng[user.lng].active_cards, user.wallet, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
                                        } else if (user && user.lng && message.indexOf(lng[user.lng].to_page) > -1 && user.status && user.status.indexOf(lng[user.lng].active_cards) > -1 && status === 2) {
                                            let page = parseInt(message.split(' ')[1]);
                                            let cards = await cdb.findCards(page);
                        let text = `${lng[user.lng].active_cards_text}.`;
                        let n = 1;
                        let key = 0;
                        let buttons = [];
if (cards && cards.length > 0) {
    for (let card of cards) {
        if (!buttons[key]) {
        buttons[key] = [];
        }
        buttons[key].push(card.post);
        if (n % 2 == 0) {
        key++;
        }
        n++;
        }
        key += 1;
        buttons[key] = [];
        if (page > 1) {
            buttons[key].push(`${lng[user.lng].to_page} ${page-1}`);
            buttons[key].push(`${lng[user.lng].to_page} ${page+1}`);
            buttons[key].push(`${lng[user.lng].back}`);
        } else {
            buttons[key].push(`${lng[user.lng].to_page} ${page+1}`);
            buttons[key].push(`${lng[user.lng].back}`);
        }
} else {
    buttons[0] = [];
    buttons[0].push(`${lng[user.lng].back}`);
}
                        let btns = await keybord(user.lng, 'custom' + JSON.stringify(buttons));
                                                        await botjs.sendMSG(id, text, btns);
                                                        await udb.updateUser(id, user.lng, user.prev_status, lng[user.lng].active_cards, user.wallet, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
                                                                    } else if (user && user.lng && message.indexOf(lng[user.lng].event_on) > -1 && status === 2) {
                                let text = lng[user.lng].event_on_text;
                                let btns = await keybord(user.lng, 'conferm');
                                            await botjs.sendMSG(id, text, btns);
                                        } else if (user && user.lng && message.indexOf(lng[user.lng].event_finish) > -1 && status === 2) {
                                            let text = lng[user.lng].event_finish_text;
                                            let btns = await keybord(user.lng, 'fighters');
                                                        await botjs.sendMSG(id, text, btns);
                                                    } else if (user && user.lng && message.indexOf(lng[user.lng].bn_on) > -1 && status === 2) {
                                                        let text = lng[user.lng].bn_on_text;
                                                        let btns = await keybord(user.lng, 'cancel');
                                                                    await botjs.sendMSG(id, text, btns);
                                                                } else if (user && user.lng && message.indexOf(lng[user.lng].bn_finish) > -1 && status === 2) {
                                                                    let text = lng[user.lng].bn_finish_text;
                                                                    let btns = await keybord(user.lng, 'conferm');
                                                                                await botjs.sendMSG(id, text, btns);
                                                    } else if (user && user.lng && message.indexOf(lng[user.lng].conferm) > -1) {
if (user.status && user.status.indexOf(lng[user.lng].event_on) > -1 && status === 2) {
    let text = lng[user.lng].event_on_ok;
    let buy_number = await adb.getFighter();
let bn_status = false;
if (buy_number&& buy_number.post) bn_status = true;
let btns = await keybord(user.lng, 'admin_buttons|true|' + bn_status);
                await botjs.sendMSG(id, text, btns);
await edb.updateEvent(true);
}
else if (user.status && user.status.indexOf(lng[user.lng].bn_finish) > -1 && status === 2) {
    let text = lng[user.lng].bn_not_winners;
    let event = await edb.getEvent();
    let event_status = false;
if (event && event.status && event.status === true) event_status = true;
    let btns = await keybord(user.lng, 'admin_buttons|' + event_status + '|' + false);
    let res = await adb.getFighter();
    if (res && typeof res != 'undefined' && Object.keys(res).length > 0 && res.id !== 0) {
        text = `${lng[user.lng].bn_selected_winner}
        ${lng[user.lng].bn_winner_amount}: ${res.amount}
<a href="tg://user?id=${res.id}">${lng[user.lng].bn_contact}</a>`;
        btns = await keybord(user.lng, 'ref_deposit');
    }
    await botjs.sendMSG(id, text, btns);
}
                                                } else if (user && user.lng && message.indexOf(lng[user.lng].news) > -1) {
                    if (status === 2) {
                        let text = lng[user.lng].type_news;
                        let btns = await keybord(user.lng, 'cancel');
                                    await botjs.sendMSG(id, text, btns, false);
                    }                                                            
                } else if (user && user.lng && user.lng !== '' && message.indexOf(lng[user.lng].cancel) > -1) {
                    await main(id, user.prev_status, status, names);
                } else {
if (user.lng && lng[user.lng] && user.status.indexOf(lng[user.lng].news) > -1 && status === 2) {
    let btns = await keybord(user.lng, 'no');
let all_users = await udb.findAllUsers();
for (let one_user of all_users) {
try {
    await botjs.sendMSG(one_user.id, message, btns);
} catch(e) {
continue;
}
await helpers.sleep(1000);
}
} else if (user.lng && lng[user.lng] && user.status.indexOf(lng[user.lng].change_wallet) > -1) {
    let text = lng[user.lng].wallet_not_save;
    let acc = await del.getBalance(message);
    if (acc !== false) {
        await udb.updateUser(id, user.lng, user.prev_status, lng[user.lng].home, message, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
        text = lng[user.lng].wallet_saved;
    }
                    let btns = await keybord(user.lng, 'home');
    await botjs.sendMSG(id, text, btns, false);
if (acc === false) {
    await main(id, lng[user.lng].change_wallet, status, names);
}
} else if (user.lng && lng[user.lng] && user.status.indexOf(lng[user.lng].bid) > -1) {
    let text = lng[user.lng].bid_selected;
    let bid = user.bid;
    if (typeof bid == 'undefined') bid = -1;
    if (message === lng[user.lng].all_numbers) bid = 0;
    if (message === lng[user.lng].number1) bid = 1;
    if (message === lng[user.lng].number2) bid = 2;
    await udb.updateUser(id, user.lng, lng[user.lng].home, user.status, user.wallet, bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
    let btns = await keybord(user.lng, 'home');
    await botjs.sendMSG(id, text, btns, false);
} else if (user.lng && lng[user.lng] && user.status.indexOf(lng[user.lng].bn_on) > -1 && status === 2) {
    let text = lng[user.lng].bn_not_save;
    if (message.indexOf('t.me/') > -1 && message.indexOf(' ') === -1) {
        await adb.updateFighter(message, 0, 0);
        text = lng[user.lng].bn_on_ok;
await udb.updateAllUsers({auction_bid: 0});
    }
    let btns = await keybord(user.lng, 'home');
    await botjs.sendMSG(id, text, btns, false);
} else if (user.lng && lng[user.lng] && user.status.indexOf(lng[user.lng].bn_price) > -1) {
    let text = lng[user.lng].bn_not_save;
    let acc = await del.getBalance(user.wallet);
    let auction_bid = 0;
    if (acc !== false && !isNaN(message)) {
        if (parseFloat(message) % 10 == 0) {
            let b_arr = acc.balances;
            if (b_arr && Object.keys(b_arr).length > 0 && b_arr['del'] && b_arr['del'] >= parseFloat(message)) {
                auction_bid = parseFloat(message);
                let res = await adb.getFighter();
                if (res && typeof res != 'undefined' && Object.keys(res).length > 0 && auction_bid > res.amount) {
                text = lng[user.lng].bn_save;
                    await adb.updateFighter(res.post, id, auction_bid);
                    let users = await udb.findAllUsers();
                    if (users && users.length > 0) {
                        for (let one_user of users) {
    let text2 = lng[user.lng].new_bn_lider(auction_bid, names);
                            let btns2 = await keybord(user.lng, 'no');
                            await botjs.sendMSG(one_user.id, text2, btns2);
                        }
                    }
        } // end if bid > amount.
        else if (res && typeof res != 'undefined' && Object.keys(res).length > 0 && auction_bid <= res.amount) {
            text = lng[user.lng].bn_not_lider + res.amount + ' DEL';
        }
        }             // end balance.
    else             if (b_arr && Object.keys(b_arr).length > 0 && b_arr['del'] && b_arr['del'] < parseFloat(message)) {
        text = lng[user.lng].bn_not_balance;
    } // end if not balance.
        } // end if message % 10 == 0.
        else {
            text = lng[user.lng].bn_not_10;
        } // end if not % 10.
    } // end if acc.
    await udb.updateUser(id, user.lng, user.prev_status, lng[user.lng].home, user.wallet, user.bid, auction_bid, user.referers, user.referer_code, user.ref_balance);
        let btns = await keybord(user.lng, 'back');
    await botjs.sendMSG(id, text, btns, false);
} else if (user.lng && lng[user.lng] && user.status.indexOf(lng[user.lng].event_finish) > -1 && status === 2) {
    let text = lng[user.lng].not_selected_number;
    let winner = -1;
    if (message === lng[user.lng].all_numbers) winner = 0;
    if (message === lng[user.lng].number1) winner = 1;
    if (message === lng[user.lng].number2) winner = 2;
        if (winner > -1) {
text = lng[user.lng].winners_will_send;
let users = await udb.findAllUsers({$gt: -1});
let bids = [];
bids[0] = 0;
bids[1] = 0;
bids[2] = 0;
if (users && users.length > 0) {
    let data = [];
    for (let one_user of users) {
if (one_user.bid === winner) {
    data.push(    {
        to: one_user.wallet,
        coin: 'ZARUBA',
        amount: '1'
    });
    let text2 = lng[user.lng].you_winn;
    let btns2 = await keybord(one_user.lng, 'no');
                await botjs.sendMSG(one_user.id, text2, btns2);
                await helpers.sleep(500);
} // end if winner.
        bids[one_user.bid] += 1;
}
if (data && data.length > 0) {
    await del.multisend(data);
} // end if data.length > 0.
text += `
${lng[user.lng].bids_members_count}: ${users.length};
${lng[user.lng].number1}  ${bids[1]}
${lng[user.lng].number2}  ${bids[2]}
${lng[user.lng].all_numbers}  ${bids[0]}`;
await udb.updateAllUsers({bid: -1});
}
} else {
                        text = lng[user.lng].not_bid_winners;
                    }
        await edb.updateEvent(false)
                    let btns = await keybord(user.lng, 'home');
    await botjs.sendMSG(id, text, btns, false);
} else if (user.lng && lng[user.lng] && user.status.indexOf('battle_result|') > -1 && status === 2) {
    let text = lng[user.lng].not_selected_fighter_action;
    let add_amount = 500;
    let your_fighter = lng[user.lng].your_fighter_is_winn + add_amount + ' ZARUBA';
    if (message === lng[user.lng].draw_fighter) {
        add_amount = 250;
        your_fighter = lng[user.lng].your_fighter_is_draw + add_amount + ' ZARUBA';
    } else if (message === lng[user.lng].lost_fighter) {
        add_amount = 100;
        your_fighter = lng[user.lng].your_fighter_is_lost + add_amount + ' ZARUBA';
    }
let post = user.status.split('|')[1];
let card = await cdb.getCard(post);
if (card && Object.keys(card).length > 0) {
    let member = await udb.getUser(card.id);
    if (member && Object.keys(member).length > 0) {
        let ref_balance = member.ref_balance;
        ref_balance += add_amount;
        await udb.updateUser(member.id, member.lng, member.prev_status, member.status, member.wallet, member.bid, member.auction_bid, member.referers, member.referer_code, ref_balance);
        let refs = member.referers;
if (refs.length > 0) {
    let n = 1;
    for (let ref of refs) {
        let referer = await udb.getUserByRefererCode(ref);
        if (referer && Object.keys(referer).length > 0) {
            let ref_balance = referer.ref_balance;
            let ref_add_amount = add_amount / 100 * conf.ref_levels[String(n)];
            ref_balance += ref_add_amount;
            await udb.updateUser(referer.id, referer.lng, referer.prev_status, referer.status, referer.wallet, referer.bid, referer.auction_bid, referer.referers, referer.referer_code, ref_balance);
        } // end yes referer2.
    n++;
    } // end for referers.
} // end if referer length > 0.
        let text2 = your_fighter;
        let btns2 = await keybord(user.lng, 'no');
        await botjs.sendMSG(card.id, text2, btns2, false);    
    }
}
        let btns = await keybord(user.lng, 'back');
    await botjs.sendMSG(id, text, btns, false);
    await udb.updateUser(id, user.lng, lng[user.lng].home, '/admin', message, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
} else if (user.lng && lng[user.lng] && user.status.indexOf(lng[user.lng].active_cards) > -1 && message.indexOf(lng[user.lng].to_page) === -1 && status === 2) {
    let text = lng[user.lng].select_fighter_action;
    let btns = await keybord(user.lng, 'fighter_action');
    await botjs.sendMSG(id, text, btns, false);
    await udb.updateUser(id, user.lng, user.status, 'battle_result|' + message, message, user.bid, user.auction_bid, user.referers, user.referer_code, user.ref_balance);
}
                    }
                }

module.exports.main = main;