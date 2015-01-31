/**
 * Created by Danny Schreiber on 1/31/2015.
 */

angular.module('danny.ui.services', [
	'danny.ui.utility.service',
	'danny.ui.post.service'
]);
/**
 * Created by Danny Schreiber on 1/31/2015.
 */
(function(){ 'use strict';
    var UtilityService = function(){
	    var _formatStringForURL = function(str){
		    return str.split(' ').join('-');
	    };

	    return {
		    formatStringForURL: _formatStringForURL
	    };
    };
	angular.module('danny.ui.utility.service', []).factory('UtilityService', [UtilityService]);
})();
/**
 * Created by Danny Schreiber on 1/28/2015.
 */
(function(){ 'use strict';
    var PostService = function(RestService, Constants, $q){

	    var _formatStringForUrl = function(str){
		    return str.split(' ').join('-');
	    };

	    var _formatTagsForSaving = function(tags){
		    return tags.split(',');
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

		    post.tags = _formatTagsForSaving(post.tags);
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

	angular.module('danny.ui.post.service', []).factory('PostService', ['RestService', 'Constants', '$q', PostService]);
})();