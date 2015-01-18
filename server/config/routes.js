/**
 * Created by Danny Schreiber on 1/11/2015.
 */

var auth = require('../routes/auth');
var express = require('express');
var router = express.Router();

module.exports = function(app, routes){
    var authRouter = express.Router();
    authRouter.route('/login')
        .post(auth.authenticate);


//authRouter.use(function(err, req, res, next) {
//    res.status(500);
//    res.render('error', { error: err });
//});

    authRouter.get('/', function(req, res){
        res.json({message: 'There is nothing here to see'});
    });

    app.use('/api', authRouter);
//authRouter.use('*', function(err, req, res, next){
//    res.sendfile('./public/src/index.html');
//});
    app.get('*', routes.index);
};