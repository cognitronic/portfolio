/**
 * Created by Danny Schreiber on 1/6/2015.
 */

var mongoose = require('mongoose');

var User = new mongoose.Schema({
    firstName: String,
    lastname: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', User);