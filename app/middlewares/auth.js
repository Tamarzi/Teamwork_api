const jwt = require('jsonwebtoken');

const generate = ( id, email, is_admin) => {
	const token = jwt.sign(
		{id, email, is_admin},
		'secret',	//change to process.env.SECRET for deployment environment.
		{ expiresIn: '200s'}
		);
	return token;
};

const verify = ( req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	if(!token)
		res.status(401).send('Token not found');

	try{
		const tokenData = jwt.verify( token, 'secret');

		req.user = {
			id: tokenData.id,
			email: tokenData.email,
			is_admin: tokenData.is_admin
		};
		next();		//hopefully this works

	}catch( error){
		res.status(404).send(error + '\n' + token);
	}
};

module.exports = {
	generate,
	verify
}