const { get } = require('http');
const pool = require('./@db.js')

async function getCard(post) {
    let client = await pool.getClient()

    if (!client) {
        return;
    }

    try {

        const db = client.db("zaruba_bot");

        let collection = db.collection('active_cards');

        let query = {post}

        let res = await collection.findOne(query);

  return res;
    } catch (err) {
        return err;
    } finally {


    }
}

async function findCards(page) {
    let client = await pool.getClient()

    if (!client) {
        return;
    }

    try {

        const db = client.db("zaruba_bot");

        let collection = db.collection('active_cards');

        const query = {}
        let skip = page * 16 - 16;

        collection.createIndex({}, function (err) {
            if (err) {
                console.error(JSON.stringify(err));
            }
              });

        const res = [];
        let cursor = await collection.find(query).skip(skip).limit(16);
        let doc = null;
        while(null != (doc = await cursor.next())) {
            res.push(doc);
        }
    return res;
    } catch (err) {
        return err;
    } finally {


    }
}

async function updateCard(post, id) {

    let client = await pool.getClient()

    if (!client) {
        return;
    }

    try {

        const db = client.db("zaruba_bot");

        let collection = db.collection('active_cards');

        let res = await collection.updateOne({post}, {
            $set: {
                post, id
            }
        }, {
            upsert: true
        });

        return res;
    } catch (err) {

        console.log(err);
        return err;
    } finally {

    }
}

module.exports.getCard = getCard;
module.exports.findCards = findCards;
module.exports.updateCard = updateCard;