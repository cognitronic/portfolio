/**
 * Created by Danny Schreiber on 1/28/2015.
 */

var Post = require('../models/post/post');

exports.getPosts = function(req, res){
	Post.find({isPosted: {$ne: false}}).exec(function(err, posts){
		if(err){
			res.send('error', {
				status: 500
			});
		} else {
			res.json(posts);
		}
	});
};

exports.getAllPosts = function(req, res){
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
	post.seoKeywords = req.body.seoKeywords;
	post.seoDescription = req.body.seoDescription;
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
		isPosted: req.body.isPosted,
		preview: req.body.preview,
		seoKeywords: req.body.seoKeywords,
		seoDescription: req.body.seoDescription,
		postBody: req.body.postBody,
		imagePath: req.body.imagePath,
		tags: req.body.tags,
		title: req.body.title
	};

	var oId = req.body;
	var id = oId._id;
	delete oId._id;
	if(id){
		Post.update({_id: id}, updatedPost, {upsert: true}, function(err, post){
			if(err){
				res.send(err);
			}
			res.json({message: 'Post updated', data: post});
		});
	}


};