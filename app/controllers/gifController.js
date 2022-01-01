const uuid = require('uuid');
const moment = require('moment');
const {query} = require('../helpers/query');
const cloudinary = require('../helpers/cloudinary');

const createGif = async( req, res, next) => {
	
	const imageId = uuid.v4();
	try{
		const cloud = await cloudinary.uploads(req.files[0].path, {public_id: imageId});
		
		const newGif = {
			id: imageId,
			ownerid: req.user.id,
			title: req.body.title,
			category: req.body.category,
			content: cloud.secure_url,
			timecreated: moment( new Date())
		}

		const {id, ownerid, title, category, content, timecreated} = newGif;
		let queryText, queryValue;

		queryText = 'INSERT INTO post (id, title, ownerid, category, content, timecreated) VALUES ($1, $2, $3, $4, $5, $6)';
		queryValue = [id, title, ownerid, category, content, timecreated];

		await query( queryText, queryValue);

		res.status(201).send({
			status: 'success',
			data: {
				message: 'Gif Successfully added to database',
			}
		});
	}
	catch( err){
		res.status(400).send(err);
	}

/*	const newGif = {
		id: cloud.public_id,
		ownerid: req.user.id,
		title: req.body.title,
		category: req.body.category,
		content: cloud.url,
		timecreated: moment( new Date())
	}

	const {id, ownerid, title, category, content, timecreated} = newGif;
	let queryText, queryValue;

	queryText = 'INSERT INTO post (id, title, ownerid, category, content, timecreated) VALUES ($1, $2, $3, $4, $5, $6)';
	queryValue = [id, title, ownerid, category, content, timecreated];

	await query( queryText, queryValue);

	res.status(201).send({
		status: 'success',
		data: {
			message: 'Gif Successfully added to database',
		}
	});
*/
	next(); //good and working
}

const deleteGif = async( req, res, next) => {
	
	const pid = req.params.id;
	const uid = req.user.id;

	if(!pid){
		res.status(400).json({
			error: "id to be deleted not found"
		});
	}
	if(!uid){
		res.status(400).json({
			error: "you are not authorized to carry out operation"
		});
	}

	const queryText = 'DELETE FROM post WHERE id = $1 AND ownerid = $2';
	const queryValue = [pid, uid];

	await query( queryText, queryValue);
	res.status(201).send({
		status: 'success',
		data: {
			message: 'gif post successfully deleted',
		}
	});
	next();
}

module.exports = {
	createGif,
	deleteGif
}