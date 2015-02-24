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
