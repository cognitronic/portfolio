/**
 * Created by Danny Schreiber on 1/28/2015.
 */

var Post = require('../models/post/post');

exports.getPost = function(req, res){
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