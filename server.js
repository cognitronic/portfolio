/**
 * Created by Danny Schreiber on 1/6/2015.
 */

// set up ======================================================================
var express  = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
var app      = express();
var bodyParser = require('body-parser');
var routes = require('./server/routes');
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/models/user/user');

require('./server/config/passport')();

var authRouter = express.Router();
var authController = require('./server/routes/auth');
authRouter.route('/login')
    .post(authController.authenticate);

require('./server/config/routes')(app, routes);


authRouter.use(function(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
});

app.use('/api', authRouter);

app.listen(config.port);
console.log("App listening on port " + config.port);