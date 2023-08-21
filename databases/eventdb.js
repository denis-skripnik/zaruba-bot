const { get } = require('http');
const pool = require('./@db.js')

async function getEvent() {
    let client = await pool.getClient()

    if (!client) {
        return;
    }

    try {

        const db = client.db("zaruba_bot");

        let collection = db.collection('event');

        let query = {}

        let res = await collection.findOne(query);

  return res;
    } catch (err) {
        return err;
    } finally {


    }
}

async function updateEvent(status) {

    let client = await pool.getClient()

    if (!client) {
        return;
    }

    try {

        const db = client.db("zaruba_bot");

        let collection = db.collection('event');

        let res = await collection.updateOne({}, {
            $set: {
                status
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

module.exports.getEvent = getEvent;
module.exports.updateEvent = updateEvent;