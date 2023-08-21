async function sleep(ms) {
    await new Promise(r => setTimeout(r, ms));
    }

    async function unixTime(time){
if (time) {
	return parseInt(new Date(time).getTime()/1000)
} else {
	return parseInt(new Date().getTime()/1000)
}
        }
    
function compareDate(a, b)
{
	if(a.unixtime > b.unixtime)
	{
		return -1;
	}
else{
		return 1;
	}
}

	async function objectSearch(object, value) {
		let results = -1;
        for (let key in object) {
if (object[key] === value) {
    results += 1;
}
}
return results;
}

function adaptiveFixed(num, needNonZero) {
	let res = Math.trunc(num);
	let frac = Math.abs(num - res);
	if (frac === 0)
	  return res;
	res += '.';
	let numNonZero = 0;
	while (frac !== 0 && numNonZero < needNonZero) {
	  frac *= 10;
	  const cur = Math.floor(frac);
	  res += cur;
	  frac -= cur;
	  if (cur !== 0)
		numNonZero++;
	}
	return res;
  }

  async function stringToHash(string) {
	string += 'user_id_zaruba_bot';
	                var hash = 0;
	                if (string.length == 0) return hash;
	                for (i = 0; i < string.length; i++) {
	                    char = string.charCodeAt(i);
	                    hash = ((hash << 5) - hash) + char;
	                    hash = hash & hash;
	                }
	                return hash;
	            }

module.exports.unixTime = unixTime;
module.exports.sleep = sleep;
module.exports.compareDate = compareDate;
module.exports.objectSearch = objectSearch;
module.exports.adaptiveFixed = adaptiveFixed;
module.exports.stringToHash = stringToHash;