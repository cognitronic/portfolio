/**
 * Created by Danny Schreiber on 1/11/2015.
 */

var mongoose = require('mongoose');
var Profile = new mongoose.Schema({
    displayName: String,
    title: String,
    seoDescription: String,
    seoKeywords: String,
    profileImages: [String],
    socialAccounts: [{twitter: {accountId: String, handle: String}}]
});

module.exports = mongoose.model('Profile', Profile);