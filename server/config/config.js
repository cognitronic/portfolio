/**
 * Created by Danny Schreiber on 1/11/2015.
 */

var path = require('path');
var express = require('express');
var rootPath = path.normalize(__dirname  + '../../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/ravenartmedia',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://dannyschreiber.net/ravenartmedia',
        port: process.env.PORT || 80
    }
}