const cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: 'trmrskie',
	api_key: '927683213354762',
	api_secret: 'ZmyqQ3dH8ua74M9ZbZ8-6qBUjV8' 
});

exports.uploads = (file, filedetail) => {
	return new Promise((resolve, reject) => {

		cloudinary.uploader.upload( file, filedetail)
		.then((res) => {
			resolve(res);
		})
		.catch((err) => {
			reject(err);
		});
	});
}