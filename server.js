const http = require ('http');
const app = require ('./app/app');

const port = process.env.PORT || 4200;

const server = http.createServer( app);

server.listen(port).on('listening', () => {
	console.log('We are live on port', 4200);		//was using port 3000 but now 4200 because my frontend is using 3000
});

module.exports = server;