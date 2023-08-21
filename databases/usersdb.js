const pool = require('./@db.js')

async function getUserByRefererCode(referer_code) {

	let client = await pool.getClient()
	if (!client) {
		return;
	}

	try {

		const db = client.db("zaruba_bot");

		let collection = db.collection('users');

        let res = await collection.findOne({referer_code});

return res;
} catch (err) {

    console.log(err);
    return err;
} finally {

}
}

async function getUser(id) {

	let client = await pool.getClient()
	if (!client) {
		return;
	}

	try {

		const db = client.db("zaruba_bot");

		let collection = db.collection('users');

        let res = await collection.findOne({id});

return res;
} catch (err) {

    console.log(err);
    return err;
} finally {

}
}

async function addUser(id, lng, prev_status, status, wallet, bid, auction_bid, referers, referer_code, ref_balance) {

	let client = await pool.getClient()
	if (!client) {
		return;
	}

	try {

		const db = client.db("zaruba_bot");

		let collection = db.collection('users');

        let res = await collection.insertOne({id, lng, prev_status, status, wallet, referers, referer_code, ref_balance});

return res;

} catch (err) {

    console.log(err);
    return err;
} finally {

}
}

async function updateUser(id, lng, prev_status, status, wallet, bid, auction_bid, referers, referer_code, ref_balance) {

	let client = await pool.getClient()
	if (!client) {
		return;
	}

	try {

		const db = client.db("zaruba_bot");

		let collection = db.collection('users');

      let res = await collection.updateOne({id}, {$set: {id, lng, prev_status, status, wallet, bid, auction_bid, referers, referer_code, ref_balance}}, {});

return res;

} catch (err) {

    console.log(err);
    return err;
} finally {

}
}

async function updateAllUsers(query) {

	let client = await pool.getClient()
	if (!client) {
		return;
	}

	try {

		const db = client.db("zaruba_bot");

		let collection = db.collection('users');

      let res = await collection.updateMany({}, {$set: query});

return res;

} catch (err) {

    console.log(err);
    return err;
} finally {

}
}

async function findAllUsers(bid) {
    
	let client = await pool.getClient()
	if (!client) {
		return;
	}

	try {

		const db = client.db("zaruba_bot");

		let collection = db.collection('users');

		let query = {};
		if (typeof bid !== 'undefined') query = {bid};
		const res = [];
      let cursor = await collection.find(query).limit(500);
      let doc = null;
      while(null != (doc = await cursor.next())) {
          res.push(doc);
      }
  return res;
} catch (err) {

    console.log(err);
    return err;
} finally {

}
}

async function findReferals(referers) {
    
	let client = await pool.getClient()
	if (!client) {
		return;
	}

	try {

		const db = client.db("zaruba_bot");

		let collection = db.collection('users');

		let query = {referers};
		const res = [];
      let cursor = await collection.find(query).limit(500);
      let doc = null;
      while(null != (doc = await cursor.next())) {
          res.push(doc);
      }
  return res;
} catch (err) {

    console.log(err);
    return err;
} finally {

}
}

async function removeUser(id) {

	let client = await pool.getClient()
	if (!client) {
		return;
	}

	try {

		const db = client.db("zaruba_bot");

		let collection = db.collection('users');

		let res = await collection.deleteOne({
			id
		});

		return res;

	} catch (err) {

		console.log(err);
		return err;
	} finally {

	}
}

module.exports.getUserByRefererCode = getUserByRefererCode;
module.exports.getUser = getUser;
module.exports.addUser = addUser;
module.exports.updateUser = updateUser;
module.exports.updateAllUsers = updateAllUsers;
module.exports.findAllUsers = findAllUsers;
module.exports.findReferals = findReferals;
module.exports.removeUser = removeUser;