/**
 * Created by Danny Schreiber on 2/4/2015.
 */
var mongoose = require('mongoose');

var Resume = new mongoose.Schema({
	workHistory: [{company: String, title: String, startDate: String, endDate: String, position: String}],
	devSkills: [{name: String, icon: String, level: String, url: String}],
	designSkills: [{name: String, icon: String, level: String, url: String}],
	envSkills: [{name: String, icon: String, level: String, url: String}],
	clients: [{name: String, icon: String, url: String}],
	pathToResume: String
}, {collection: 'resume'});

module.exports = mongoose.model('Resume', Resume);