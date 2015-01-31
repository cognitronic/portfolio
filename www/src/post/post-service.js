/**
 * Created by Danny Schreiber on 1/28/2015.
 */
(function(){ 'use strict';
    var PostService = function(RestService, Constants, $q){

	    var _formatStringForUrl = function(str){
		    return str.split(' ').join('-');
	    };
	    var _getPosts = function(){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};
			RestService.getData(Constants.ROUTES.POSTS, null, null, _success, '', _error, {showLoader: true});
			return deferred.promise;
		};

	    var _getPost = function(title){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.getData(Constants.ROUTES.POST + _formatStringForUrl(title), null, null, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };

	    var _savePost = function(post, title){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    if(title === 'new'){
			    RestService.postData(Constants.ROUTES.POSTS, null, null, post, _success, '', _error, {showLoader: true});
		    } else {
			    console.log('title: ', title);
			    RestService.putPostData(Constants.ROUTES.POST + _formatStringForUrl(title), null, null, post, _success, '', _error, {showLoader: true});
		    }
		    return deferred.promise;
	    };

	    var _deletePost = function(post){

	    };

		return {
			getPosts: _getPosts,
			getPost: _getPost,
			savePost: _savePost,
			deletePost: _deletePost
		};
    };

	angular.module('danny').factory('PostService', ['RestService', 'Constants', '$q', PostService]);
})();