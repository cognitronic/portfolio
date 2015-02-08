/**
 * Created by Danny Schreiber on 1/11/2015.
 */

var express = require('express');
var path = require('path');
var passport = require('passport');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
//var redisClient;
//var url = require('url');
var RedisStore = require('connect-redis')(session);

module.exports = function(app, config){


	var redis = require('redis');
	var url = require('url');
	var redisURL = url.parse(process.env.REDISCLOUD_URL || 'redis://rediscloud:6qndd7D0pK0zfVc0@pub-redis-18506.us-east-1-3.4.ec2.garantiadata.com:18506');
	var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
	client.auth(redisURL.auth.split(":")[1]);

	app.use(session({
		secret: 'code fighter fuh life',
		resave: false,
		store: new RedisStore({client: client}),
		saveUninitialized: true
	}));
    app.use(express.static(path.join(config.rootPath, '/www')));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(logger('dev'));
	app.use(cors());
};