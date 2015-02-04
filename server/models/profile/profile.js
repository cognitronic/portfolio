/**
 * Created by Danny Schreiber on 1/11/2015.
 */

var mongoose = require('mongoose');

var Profile = new mongoose.Schema({
    tagLines: [String],
    bannerImages: [String],
    email: String,
    name: String,
    phone: String,
	reading: [{name: String, icon: String}],
	listening: [{name: String, icon: String}],
    socialAccounts: [{twitter: {accountId: String, handle: String, url: String}, google: {accountId: String, handle: String, url: String}, facebook: {accountId: String, handle: String, url: String}, github: {accountId: String, handle: String, url: String}, stackOverflow: {accountId: String, handle: String, url: String}}]
}, {collection: 'profile'});

module.exports = mongoose.model('Profile', Profile);