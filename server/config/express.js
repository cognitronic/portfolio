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

module.exports = function(app, config){
    app.set('views', config.rootPath + 'server/views');
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        secret: 'code fighter fuh life',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(config.rootPath, '/public')));
};