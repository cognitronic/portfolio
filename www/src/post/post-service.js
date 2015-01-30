/**
 * Created by Danny Schreiber on 1/28/2015.
 */
(function(){ 'use strict';
    var PostService = function(RestService, Constants, $q, $state){
		var _getPosts = function(){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};
			RestService.getData(Constants.ROUTES.GET_POSTS, null, null, _success, '', _error, {showLoader: true});
			return deferred.promise;
		};

	    var _addPost = function(id){
		    $state.go('post.detail', {id: id});
	    };

		return {
			getPosts: _getPosts,
			addPost: _addPost
		};
    };

	angular.module('danny').factory('PostService', ['RestService', 'Constants', '$q', '$state', PostService]);
})();