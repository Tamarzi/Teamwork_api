const {Pool} = require('pg');

const connectionString = 'postgres://postgres:82ma72ku76@localhost:5432/Team_work';

const pool = new Pool({
	connectionString: connectionString
});

exports.query = ( queryText, queryValue) => {

	return new Promise(( resolve, reject) => {
		
		pool.query( queryText, queryValue)
		.then((res) => {
				resolve(res)
			})
		.catch((err) => {
			reject(err)
		})
	});
}