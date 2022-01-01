const {Pool}= require('pg');

const dotenv = require('dotenv');	// learn how to use the dotenv dependency
dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

pool.on('connect', ()=> {
	console.log('connected to database');
});

const createEmployeeTable = () => {
	const queryText = `CREATE TABLE IF NOT EXISTS
	Employee(
		id UUID PRIMARY KEY,
		gender VARCHAR(6) NOT NULL,
		firstname VARCHAR(32) NOT NULL,
		lastname VARCHAR(32) NOT NULL,
		department VARCHAR(32) NOT NULL,
		online BOOLEAN DEFAULT(false),
		timecreated TIMESTAMP NOT NULL,
		password VARCHAR(256) NOT NULL,
		email VARCHAR(64) UNIQUE NOT NULL,
		is_admin BOOLEAN DEFAULT(false),
	)`;

	pool.query(queryText)
	.then((res) => {
		console.log( res);
	})
	.catch((err) => {
		console.log( err);
		pool.end();
	}); 
}

const createPostTable = () => {

	const queryText = `CREATE TABLE IF NOT EXISTS
	Post(
		id UUID PRIMARY KEY,
		OwnerId UUID REFERENCES Employee(id),
		timecreated TIMESTAMP NOT NULL,
		title VARCHAR(160) NOT NULL,
		flagged BOOLEAN DEFAULT(false),
	)`;

	pool.query(queryText)
	.then((res) => {
		console.log( res);
	}).catch((err) => {
		console.log( err);
	});
}

const createArticleTable = () => {
	const queryText = `CREATE TABLE IF NOT EXISTS
	Article(
		id UUID REFERENCES Post(id) ON UPDATE CASCADE DELETE CASCADE,
		content VARCHAR(4096) NOT NULL,
		category VARCHAR(32) NOT NULL,
	)`;
	pool.query( queryText)
	.then(( res) => {
		console.log( res);
	}).
	catch(( err) => {
		console.log( err);
		pool.end();
	});
}

const createGifTable = () => {

	const queryText = `CREATE TABLE IF NOT EXISTS
	Gifs(
		id UUID REFERENCES Post(id) ON UPDATE CASCADE ON DELETE CASCADE,
		url VARCHAR(128) NOT NULL,
	)`;

	pool.query( queryText)
	.then((res) => {
		console.log(res);
	}).catch(( err) => {
		console.log(err);
		pool.end();
	});
}

const createCommentTable = () => {
	const queryText = `CREATE TABLE IF NOT EXISTS
	Comment(
		id UUID PRIMARY KEY,
		postId UUID REFERENCES Post(id),
		ownerId UUID REFERENCES Employee(id),
		timecreated TIMESTAMP NOT NULL,
		content VARCHAR(4096) NOT NULL,
	)`;

	pool.query( queryText)
	.then((res) => {
		console.log( res);
	})
	.catch(( err) => {
		console.log( err);
		pool.end();
	});
}

const createAllTable = () => {
	createEmployeeTable();
	createArticleTable();
	createPostTable();
	createGifTable();
	createCommentTable();
}

module.exports = {
	createAllTable,
}

require('make-runnable');		//decide if you want to have this runnable here.