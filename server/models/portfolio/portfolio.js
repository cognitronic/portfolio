/**
 * Created by Danny Schreiber on 2/2/2015.
 */

var mongoose = require('mongoose');

var Portfolio = new mongoose.Schema({
	isActive: Boolean,
	title: String,
	description: String,
	client: String,
	url: String,
	technologies: [String],
	imagePaths: [String]
}, {collection: 'portfolio'});

module.exports = mongoose.model('Portfolio', Portfolio);