const {query} = require('../helpers/query');

const viewArticles = async( req, res, next) => {

	const queryText = 'SELECT * FROM post ORDER BY timecreated DESC';

	const result = await query(queryText);
	res.status(200).send( result.rows);

	next();
}

module.exports = {
	viewArticles
}