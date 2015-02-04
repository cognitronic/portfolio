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