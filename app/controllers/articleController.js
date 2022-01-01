const uuid = require('uuid');
const {query} = require('../helpers/query');
const moment = require('moment');

const createArticle = async( req, res, next) => {

	const newArticle = {
		id: uuid.v4(),
		ownerid: req.user.id,
		title: req.body.title,
		category: req.body.category,
		content: req.body.content,
		timecreated: moment(new Date())
	}

	const {id, ownerid, title, category, content, timecreated} = newArticle;
	let queryText, queryValue;

	queryText = 'INSERT INTO post (id, title, ownerid, category, timecreated, content) VALUES ($1, $2, $3, $4, $5, $6) returning *';
	queryValue = [id, title, ownerid, category, timecreated, content];

	const result = await query( queryText, queryValue);
	const inserted = result.rows[0];
	res.status(201).send({
		status: 'success',
		data: {
			message: 'New articles added to database',
			inserted
		}
	});

	next();
}

const updateArticle = async( req, res, next) => {

	const pid = req.params.id;
//	const uid = req.user.id;

	if(!pid){
		res.status.send({
			error: 'parameter id missing'
		});
	}

	const{title, content} = req.body;
	let queryText, queryValue;

	let article = {};

	queryText = 'UPDATE post SET title = $1, content = $2 WHERE id = $3 returning *';
	queryValue = [title, content, pid];
	const updated = await query(queryText, queryValue);
	article = updated.rows[0];

	res.status(201).send({
		status: 'success',
		message: 'Article updated Successfully',
		article
	});

	next();
}

const deleteArticle = async(req, res, next) => {

	const pid = req.params.id;
	const uid = req.user.id;

	if(!uid){
		res.status(401).send({
			error: 'You are not authorized to perform this operation'
		});
	}

	if(!pid){
		res.status(401).send({
			error: 'No article id to delete not found'
		});
	}

	const queryText = 'DELETE FROM post WHERE id = $1 AND ownerid = $2';
	const queryValue = [pid, uid];

	await query( queryText, queryValue);
	res.status(201).send({
		status: 'success',
		data: {
			message: 'Article Successfully deleted from database',
		}
	});

	next();
}


const viewSingleArticle = async( req, res, next) => {

	const pid = req.params.id;

	if(!pid){
		res.status(401).send({
			error: "No parameter value found"
		});
	}

	let article = {};

	let queryText, queryValue;
	queryText = 'SELECT * FROM post WHERE id = $1';
	queryValue = [pid];

	const post =  await query(queryText, queryValue);
	article = post.rows[0];
	
	queryText = 'SELECT * FROM comment WHERE postid = $1';
	const comment = await query(queryText, queryValue);
	
	res.status(200).send({
		status: 'success',
		data: article,
		comment: comment.rows
	});

	next();
}

module.exports = {
	createArticle,
	updateArticle,
	deleteArticle,
	viewSingleArticle
}