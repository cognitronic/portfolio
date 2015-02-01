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