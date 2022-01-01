const {uuid} = require('uuidv4');
const bcrypt = require('bcrypt');

async function hashing(){
	const hash = await bcrypt.hash('Simon', 10);
	console.log( hash);
}

hashing();
console.log( uuid());

/*Two methods to use uuid is as follows:
const uuid = require('uuid');
console.log( uuid.v4());

OR

const {uuid} = require('uuidv4')
console.log( uuid());
*/