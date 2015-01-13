/**
 * Created by Danny Schreiber on 1/11/2015.
 */

var passport = require('passport');


exports.authenticate = function(req, res, next){
    var auth = passport.authenticate('local', function(err, user){
        console.log('user: ' + user);
        if(err){
            return next(err);
        }
        if(!user){
            res.send({success: false});
        }
        req.logIn(user, function(err){
            if(err){
                return next(err);
            }
            res.send({success:true, user: user});
        });
    });

    auth(req, res, next);
};