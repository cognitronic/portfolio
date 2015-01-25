/**
 * Created by Danny Schreiber on 1/20/2015.
 */

(function(){ 'use strict';
    var LoginService = function(RestService, $state, $q){
        var _authenticateUser = function(user){
            var response = {};
            var deferred  = $q.defer();
            RestService.postData('/api/login', null, null, {username: user.username, password: user.password}, {showLoader: true})
                .then(function(data){
                    deferred.resolve(data);
            }, function(reason){
                    deferred.reject(reason);
                });
            return deferred.promise;
        };

        return {
            authenticateUser: _authenticateUser
        };
    };
    angular.module('danny').factory('LoginService', ['RestService', '$state', '$q', LoginService]);
})();