/**
 * Created by Danny Schreiber on 1/31/2015.
 */

angular.module('danny.ui.services', [
	'danny.ui.utility.service',
	'danny.ui.post.service',
	'danny.ui.profile.service',
	'danny.ui.portfolio.service',
	'danny.ui.resume.service',
	'danny.ui.email.service'
]);
/**
 * Created by Danny Schreiber on 2/6/2015.
 */

(function(){ 'use strict';
    var EmailService = function(RestService, Constants, $q){

	    var _sendMail = function(email){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.postData(Constants.ROUTES.SENDMAIL, null, null, email, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };



	    return {
		    sendMail: _sendMail
	    };
    };
    angular.module('danny.ui.email.service', []).factory('EmailService', ['RestService', 'Constants', '$q', EmailService]);
})();

/**
 * Created by Danny Schreiber on 1/31/2015.
 */

(function(){ 'use strict';
    var ProfileService = function(RestService, Constants, $q){

	    var _getProfile = function(){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.getData(Constants.ROUTES.PROFILE, null, null, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };

	    return {
		    getProfile: _getProfile
	    };
    };

	angular.module('danny.ui.profile.service', []).factory('ProfileService', ['RestService', 'Constants', '$q', ProfileService]);
})();
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
 * Created by Danny Schreiber on 2/2/2015.
 */

(function(){ 'use strict';
	var PortfolioService = function(RestService, Constants, $q){

		var _formatStringForUrl = function(str){
			return str.split(' ').join('-');
		};

		var _formatTagsForSaving = function(tags){
			return tags.split(',');
		};

		var _getPortfolio = function(){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};
			RestService.getData(Constants.ROUTES.PORTFOLIO, null, null, _success, '', _error, {showLoader: true});
			return deferred.promise;
		};

		var _getPortfolioByTitle = function(title){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};
			RestService.getData(Constants.ROUTES.PORTFOLIO + '/' + _formatStringForUrl(title), null, null, _success, '', _error, {showLoader: true});
			return deferred.promise;
		};

		var _savePortfolio = function(portfolio, title){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};

			portfolio.technologies = _formatTagsForSaving(portfolio.technologies);
			portfolio.imagePaths = _formatTagsForSaving(portfolio.imagePaths);
			if(title === 'new'){
				RestService.postData(Constants.ROUTES.PORTFOLIO, null, null, portfolio, _success, '', _error, {showLoader: true});
			} else {
				RestService.putPostData(Constants.ROUTES.PORTFOLIO + '/' + _formatStringForUrl(title), null, null, portfolio, _success, '', _error, {showLoader: true});
			}
			return deferred.promise;
		};

		var _deletePortfolio = function(post){

		};

		return {
			getPortfolio: _getPortfolio,
			getPortfolioByTitle: _getPortfolioByTitle,
			savePortfolio: _savePortfolio,
			deletePortfolio: _deletePortfolio
		};
	};

	angular.module('danny.ui.portfolio.service', []).factory('PortfolioService', ['RestService', 'Constants', '$q', PortfolioService]);
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
/**
 * Created by Danny Schreiber on 2/4/2015.
 */

(function(){ 'use strict';
    var ResumeService = function(RestService, Constants, $q){

	    var _getResume = function(title){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.getData(Constants.ROUTES.RESUME, null, null, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };

	    var _saveResume = function(post, title){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.postData(Constants.ROUTES.RESUME, null, null, post, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };

	    return {
		    getResume: _getResume,
		    saveResume: _saveResume
	    };
    };

	angular.module('danny.ui.resume.service', []).factory('ResumeService', ['RestService', 'Constants', '$q', ResumeService]);
})();