/**
 * Created by Danny Schreiber on 1/28/2015.
 */
(function(){ 'use strict';
    var PostService = function(RestService, Constants, $q){
		var _getPosts = function(){
			var deferred = $q.defer();
			RestService.getData(Constants.ROUTES.GET_POSTS, null, null, {showLoader: true})
				.then(function(data){
					deferred.resolve(data);
				}, function(reason){
					deferred.reject(reason);
				});
			return deferred.promise;
		};

		return {
			getPosts: _getPosts
		};
    };

	angular.module('danny').factory('PostService', ['RestService', 'Constants', '$q', PostService]);
})();