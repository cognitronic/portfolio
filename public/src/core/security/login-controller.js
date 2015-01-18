/**
 * Created by Danny Schreiber on 1/11/2015.
 */

(function(){ 'use strict';
    var LoginController = function($scope, $state, RestService){
        var _user = {};
        var _message = 'hello';

        var _login = function(username, password){
            var _success = function(response){
                console.log(response.data);
                _message = response.data.success;
                _user = response.data.user;
                $state.go('blog');
            };

            var _error = function(response){
                console.log('error:');
                _message = response.data.success;
                console.log(response);
            };

            RestService.postData('/api/login', null, null, {username: username, password: password}, _success, 'Invalid login, please try again', _error, {showLoader: true});
        };

        $scope.model = {
            login: _login,
            user: _user,
            message: _message
        };
    };

    angular.module('danny').controller('LoginController',['$scope', '$state', 'RestService',LoginController]);
})();