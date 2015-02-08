/**
 * Created by Danny Schreiber on 1/11/2015.
 */
var post = require('../controllers/post');
var profile = require('../controllers/profile');
var portfolio = require('../controllers/portfolio');
var resume = require('../controllers/resume');
var emailer = require('../controllers/email');
var auth = require('../controllers/auth');
var index = require('../controllers/index');
var express = require('express');

module.exports = function(app){

	app.use(function(req, res, next){
		var err = req.session.error;
		var msg = req.session.success;
		delete req.session.error;
		delete req.session.success;
		res.locals.message = '';
		if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
		if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
		next();
	});

	function restrict(req, res, next) {
		if (req.session.user) {
			next();
		} else {
			req.session.error = 'Access denied!';
			res.json({isAuthenticated: false});
		}
	}

    var _router = express.Router();

    _router.use(function(req, res, next){
       console.log(req.method, req.url);

        next();
    });

    _router.get('/', function(req, res){
        res.json({message: 'There is nothing here to see'});
    });



    /**
     * Auth Routes
     */
    _router.route('/login')
        .post(auth.authenticate);


    /**
     * Post Routes
     */
    _router.route('/posts')
        .get(restrict, post.getPosts);

	_router.route('/posts')
		.post(restrict, post.postPost);

	_router.route('/post/:title')
		.get(restrict, post.getPost);

	_router.route('/post/:title')
		.put(restrict, post.putPost);


	/**
	 * Profile Routes
	 */

	_router.route('/profile')
		.get(restrict, profile.getProfile);


	/**
	 * Portfolio Routes
	 */

	_router.route('/portfolio')
		.get(restrict, portfolio.getPortfolio);

	_router.route('/portfolio/:title')
		.get(restrict, portfolio.getPortfolioByTitle);

	_router.route('/portfolio/:title')
		.put(restrict, portfolio.putPortfolio);

	/**
	 * Resume Routes
	 */

	_router.route('/resume')
		.get(restrict, resume.getResume);

	_router.route('/resume')
		.put(restrict, resume.putResume);


	/**
	 * Email routes
	 */

	_router.route('/email')
		.post(restrict, emailer.sendEmail);








    // catch 404 and forwarding to error handler
    _router.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });


    /// error handlers

    // development error handler
    // will print stacktrace
    if (_router.get('env') === 'development') {
        _router.use(function(err, req, res, next) {
            res.send('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    _router.use(function(err, req, res, next) {
        res.send('error', {
            message: err.message,
            error: {}
        });
    });

    //applys the above routes to the app
    app.use('/api', _router);
    //gets all of the public routes and passes them to Angular

	app.all('/*', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
		next();
	});
    app.get('*', index.index);
};



