const bcrypt = require('bcrypt');
const uuid = require('uuid');
const {query} = require('../helpers/query');
const auth = require('../middlewares/auth');
const moment = require('moment');
/*
const connectionString = 'postgres://postgres:82ma72ku76@localhost:5432/Team_work';

const pool = new Pool({
	connectionString: connectionString
});*/

const createUser = async( req, res, next) => {

	if(!req.body.gender || !req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.department)
		return res.status(401).send('Missing input fields');

	if( req.user.is_admin === false)
		return res.status(401).send('You are not authorized to carry out this operation');

	const hash = await bcrypt.hash( req.body.password, 10);

	const newUser = {
		id: uuid.v4(),
		gender: req.body.gender,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: hash,
		department: req.body.department,
	}

	const{id, gender, firstname, lastname, email, password, department} = newUser;

	//This line is meant to check if email entered already exists?
	let queryText = 'SELECT email FROM employee WHERE employee.email = $1';
	let queryValues = [email];

	const idCheck = await query( queryText, queryValues);

	const dbEmail = ( idCheck.rows.length > 0 ? idCheck.rows[0].email : null);	//To avoid undefined value of array.
	if( email == dbEmail){
		res.status( 512).send('User with similar email already exists, try another email');
	}else{
		queryText = 'INSERT INTO Employee ( id, gender, firstname, lastname, email, password, department, timecreated) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8)';
		queryValues = [ id, gender, firstname, lastname, email, password, department, moment( new Date())];

		await query( queryText, queryValues);
		res.status(201).send(`New employee added by ` + req.user.id);
	}

	next();
}

const userSignin = async( req, res, next) => {

	const {email, password} = req.body;

	if(!email || !password)
		res.status( 401).send('Please enter your email or password');

	let queryText = 'SELECT id, email, is_admin, password FROM employee WHERE employee.email = $1';
	const results = await query( queryText, [email]);
//	console.log(results.rows[0].password);

	if( results.rows.length < 0)
		res.status(401).send('User does not exist!!');

	const valid = bcrypt.compare( password, results.rows[0].password);

	if( !valid)
		res.status(401).send('Invalid Password');
	else{
		const {id, email, is_admin} = results.rows[0];	//Check this line very well
		const token = auth.generate( id, email, is_admin);
		res.status( 201).send('User logged in with token' + '\n' + token);
	}

	next();
}

module.exports = {
	createUser,
	userSignin
};