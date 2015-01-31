/**
 * Created by Danny Schreiber on 1/11/2015.
 */

(function(){ 'use strict';
    var AuthenticationController = function(LoginService){
        var auth = this;
        var _message = 'turd';
        var _user = {};

        var _onSubmit = function(user){
            if(user){
	            LoginService.authenticateUser(user);
            }
        };

        return {
            onSubmit: _onSubmit,
            message: _message,
            user: _user
        };
    };

    angular.module('danny').controller('AuthenticationController',['LoginService',AuthenticationController]);
})();