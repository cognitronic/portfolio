/**
 * Created by Danny Schreiber on 1/11/2015.
 */

(function(){ 'use strict';
    var AuthenticationController = function($state, LoginService, $q){
        var auth = this;
        var _message = 'turd';
        var _user = {};

        var _onSubmit = function(user){
            var response = {};
            if(user){
                //LoginService.authenticateUser(user).then(function (data) {
                //    response.isAuthenticated = data.success;
                //    response.message = 'logged in successfully!';
                //    response.user = data.user;
                //    $state.go('post');
                //}, function (reason) {
                //    response.isAuthenticated = false;
                //    response.user = null;
                //    response.message = reason;
                //    // $state.go('login');
                //});
                return LoginService.authenticateUser(user);
            }
        };

        return {
            onSubmit: _onSubmit,
            message: _message,
            user: _user
        };
    };

    angular.module('danny').controller('AuthenticationController',['$state', 'LoginService', '$q',AuthenticationController]);
})();