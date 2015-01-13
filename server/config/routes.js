/**
 * Created by Danny Schreiber on 1/11/2015.
 */

var auth = require('../routes/auth');
var express = require('express');
var router = express.Router();

module.exports = function(app, routes){
    app.get('*', routes.index);
};