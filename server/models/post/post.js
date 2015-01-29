/**
 * Created by Danny Schreiber on 1/28/2015.
 */
var mongoose = require('mongoose');

var Post = new mongoose.Schema({
	isActive: Boolean,
	isPosted: Boolean,
	title: String,
	preview: String,
	postBody: String,
	dateCreated: {type: Date, default: Date.now},
	author: String,
	tags: [String],
	imagePath: String,
	comments: [{name: String, body: String, email: String, dateCreated: {type: Date, default: Date.now}}]
});

module.exports = mongoose.model('Post', Post);