/**
 * Created by Danny Schreiber on 1/28/2015.
 */
(function(){ 'use strict';
    var PostService = function(RestService, Constants, $q){

	    var _getPosts = function(){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};
			RestService.getData(Constants.ROUTES.POSTS, null, null, _success, '', _error, {showLoader: true});
			return deferred.promise;
		};

	    var _savePost = function(post){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.postData(Constants.ROUTES.POSTS, null, null, post, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };

	    var _deletePost = function(post){

	    };

		return {
			getPosts: _getPosts,
			savePost: _savePost,
			deletePost: _deletePost
		};
    };

	angular.module('danny').factory('PostService', ['RestService', 'Constants', '$q', PostService]);
})();