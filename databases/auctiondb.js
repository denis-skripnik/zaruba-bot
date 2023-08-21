const { get } = require('http');
const pool = require('./@db.js')

async function getFighter() {
    let client = await pool.getClient()

    if (!client) {
        return;
    }

    try {

        const db = client.db("zaruba_bot");

        let collection = db.collection('fighter_cards_auction');

        let query = {}

        let res = await collection.findOne(query);

  return res;
    } catch (err) {
        return err;
    } finally {


    }
}

async function updateFighter(post, id, amount) {

    let client = await pool.getClient()

    if (!client) {
        return;
    }

    try {

        const db = client.db("zaruba_bot");

        let collection = db.collection('fighter_cards_auction');

        let res = await collection.updateOne({post}, {
            $set: {
                post, id, amount
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

async function finishAuction() {

	let client = await pool.getClient()
	if (!client) {
		return;
	}

	try {

		const db = client.db("zaruba_bot");

		let collection = db.collection('fighter_cards_auction');

		let res = await collection.drop();

		return res;

	} catch (err) {

		console.log(err);
		return err;
	} finally {

	}
}

module.exports.getFighter = getFighter;
module.exports.updateFighter = updateFighter;
module.exports.finishAuction = finishAuction;