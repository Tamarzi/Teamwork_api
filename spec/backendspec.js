const request = require('request');
const {createGif, deleteGif} = require('../app/controllers/gifController')


describe( 'Controller Test', () => {

	let server;
	beforeAll(() => {
		server = require('../server');
	});

	afterAll(() => {
		server.close();
	});

	describe('Post /api/v1/gifs/:id', () => {

		const req = {
				user: {
					id: 'b439942a-a447-4dca-9e80-04c09c0bdf25'
				},
				body: {
					title: 'The man with a eye',
					category: 'Computer Literature',
					url: 'cloudinary.com/susan/merkles'
				}
		};
		let data = {};

/*		beforeAll(() => {
			request.get('http://localhost:3000/api/v1/gifs/:id', (err, res, body) => {
				data.status = res.statusCode,
				data.body = res.body
			});
		});*/

		it('send data into createGif', async(done) => {
			const result = await createGif(req);
			console.log( result);
		});

	});

});
 