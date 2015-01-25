/**
 * Created by Danny Schreiber on 1/11/2015.
 */

(function(){ 'use strict';
    var LoginController = function($scope, $state, LoginService){
        var _user;
        var _message;

        var _login = function login(user){
            var response = {};
            LoginService.authenticateUser(user).then(function(data){
                response.isAuthenticated = data.success;
                response.message = 'logged in successfully!';
                response.user = data.user;
                $state.go('blog');
            }, function(reason){
                response.isAuthenticated = false;
                response.user = null;
                response.message = reason;
                $state.go('login');
            });
        };

        $scope.model = {
            login: _login,
            user: _user,
            message: _message
        };
    };

    angular.module('danny').controller('LoginController',['$scope', '$state', 'LoginService',LoginController]);
})();