/**
 * Created by Danny Schreiber on 1/11/2015.
 */

var path = require('path');
var express = require('express');
var rootPath = path.normalize(__dirname  + '../../../');

module.exports = {
    development: {
        rootPath: rootPath,
	    baseUrl: 'http://localhost:3000',
	    db: 'mongodb://heroku_app33803161:hf0ai7fhuiroib66egrflg7h28@ds041851.mongolab.com:41851/heroku_app33803161',
	    dba: 'mongodb://localhost/ravenartmedia',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
	    baseUrl: 'http://admin.abracadaniel.net',
        db: 'mongodb://heroku_app33803161:hf0ai7fhuiroib66egrflg7h28@ds041851.mongolab.com:41851/heroku_app33803161',
        port: process.env.PORT || 80
    }
};