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

exports.getPost = function(req, res){
	var title = req.params.title.split("-").join(" ");
	Post.find({title: title}, function(err, post){
		if(err){
			res.send(err);
		}
		res.json(post);
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

exports.putPost = function(req, res){
	var updatedPost = {
		isActive: req.body.isActive,
		isPost: req.body.isPosted,
		preview: req.body.preview,
		postBody: req.body.postBody,
		imagePath: req.body.imagePath,
		tags: req.body.tags
	};
	var title = req.params.title.split("-").join(" ");
	Post.update({title: title}, updatedPost, function(err, post){
		if(err){
			res.send(err);
		}
		res.json({message: 'Post updated', data: post});
	});
};