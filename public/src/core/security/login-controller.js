/**
 * Created by Danny Schreiber on 1/11/2015.
 */

(function(){ 'use strict';
    var LoginController = function($scope, $http){
        var _user = {};

        var _login = function(){
            console.log($scope.model.user);
            $http.post('/api/login', {username: $scope.model.user.email, password: $scope.model.user.password}).then(function(response){
                console.log(response);
                if(response.data.success){
                    console.log('logged in!');
                } else {
                    console.log('log in failed');
                }
            });
        };

        $scope.model = {
            login: _login,
            user: _user
        };
    };

    angular.module('danny').controller('LoginController',['$scope', '$http',LoginController]);
})();