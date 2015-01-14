/**
 * Created by Danny Schreiber on 1/12/2015.
 */
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

module.exports = function(){

    passport.use('local', new LocalStrategy(
        function(username, password, done){
            console.log('inside passport');
            User.findOne({email: username}).exec(function(err, user){
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            });
        }
    ));

    passport.serializeUser(function(user, done){
        if(user){
            done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done){
        User.findOne({_id: id}).exec(function(err, user){
            if(user){
                return done(null, user);
            }
            return done(null, false);
        });
    });
};