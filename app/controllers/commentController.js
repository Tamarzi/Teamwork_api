const uuid = require('uuid');
const {query} = require('../helpers/query');
const moment = require('moment');
/*
const connectionString = 'postgres://postgres:82ma72ku76@localhost:5432/Team_work';

const pool = new Pool({
	connectionString: connectionString
});*/

const createComment = async( req, res, next) => {

	const details = {
		id: uuid.v4(),
		content: req.body.content,
		uid: req.user.id,
		pid: req.params.id,
		timecreated: moment(new Date())
	};

	const {id, content, uid, pid, timecreated} = details

	const queryText = 'INSERT INTO comment ( id, content, ownerid, postid, timecreated) VALUES ( $1, $2, $3, $4, $5) returning *';
	const queryValue = [ id, content, uid, pid, timecreated];

	const result = await query(queryText, queryValue);
	res.status(200).send({
		status: 'success',
		data: result.rows[0]
	});

	next();
}

module.exports = {
	createComment
}