const express = new require('express');
const auth = new require('../middlewares/auth');
const multer = new require('../helpers/multer');
const userControl = new require('../controllers/userController');
const articleControl = new require('../controllers/articleController');
const gifControl = new require('../controllers/gifController');
const commentControl = new require('../controllers/commentController');
const feedControl = new require('../controllers/feedController');

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).send({'message': 'Congratulations! Your first endpoint is working'});
});

//create a single user account
router.post('/create-user', auth.verify, userControl.createUser);	//completed

//Sign in into a user account
router.post('/signin', userControl.userSignin);					//completed

//create a new article
router.post('/articles', auth.verify, articleControl.createArticle);	//completed


//create a new gif
router.post('/gifs', multer.any(), auth.verify, gifControl.createGif);				//completed

//update article
router.patch('/articles/:id', auth.verify, articleControl.updateArticle);			//completed

//delete a single article
router.delete('/articles/:id', auth.verify, articleControl.deleteArticle);		//completed

//delete a gif
router.delete('/gifs/:id', auth.verify, gifControl.deleteGif);			//completed

//create a comment for article
router.post('/articles/:id/comments/', auth.verify, commentControl.createComment);

//create a comment for gifs
router.post('/gifs/:id/comments/', auth.verify, commentControl.createComment);

//view all articles
router.get('/feeds/', feedControl.viewArticles);		//completed

//view single articles
router.get('/articles/:id', articleControl.viewSingleArticle);		//completed

module.exports = router;