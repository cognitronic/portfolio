/**
 * Created by Danny Schreiber on 1/20/2015.
 */

(function(){ 'use strict';
    var LoginService = function(RestService, CacheService, Constants, $state){

        var _authenticateUser = function(user) {

	        var _success = function (data) {
		        if (data.user) {
			        CacheService.setItem(Constants.CACHE.CURRENT_USER, data.user);
			        $state.go('posts');
		        } else {
			        CacheService.getItem(Constants.CACHE.CURRENT_USER);
			        //TODO: implement toastr or something to display error.
		        }
	        };

	        var _error = function (data) {
		        console.log(data);
	        };

	        RestService.postData('/api/login', null, null, {
		        username: user.username,
		        password: user.password
	        }, _success, '', _error, {showLoader: true});
        };

        return {
            authenticateUser: _authenticateUser
        };
    };
    angular.module('danny').factory('LoginService', ['RestService', 'CacheService', 'Constants', '$state', LoginService]);
})();