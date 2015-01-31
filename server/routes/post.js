/**
 * Created by Danny Schreiber on 1/28/2015.
 */

var Post = require('../models/post/post');

exports.getPosts = function(req, res){
	Post.find({}).exec(function(err, posts){
		if(err){
			res.send('error', {
				status: 500
			});
		} else {
			res.json(posts);
		}
	});
};

exports.postPost = function(req, res){
	var post = new Post();
	post.author = req.body.author;
	post.postBody = req.body.postBody;
	post.isActive = req.body.isActive;
	post.isPosted = req.body.isPosted;
	post.title = req.body.title;
	post.preview = req.body.preview;
	post.tags = req.body.tags;
	post.imagePath = req.body.imagePath;

	post.save(function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'Post saved!', data: post});
	});
};